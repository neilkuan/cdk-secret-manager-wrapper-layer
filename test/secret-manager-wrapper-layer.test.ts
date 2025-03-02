import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { DockerImage, Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import mock from 'mock-fs';
import { SecretManagerWrapperLayer } from '../src';

describe('Layer', () => {
  let dockerImageMock: jest.SpyInstance<DockerImage>;

  beforeAll(() => {
    dockerImageMock = jest.spyOn(DockerImage, 'fromBuild');
    dockerImageMock.mockImplementation((image: string) => {
      return {
        image: image,
        toJSON: jest.fn(),
        cp: () => {
          // 直接返回空值，不實際寫入文件
          return '';
        },
        run: jest.fn(),
      };
    });
  });

  afterAll(() => {
    dockerImageMock.mockRestore();
  });

  beforeEach(() => {
    // 確保測試不使用模擬文件系統
    mock.restore();

    // 直接在實際文件系統上創建測試所需的文件
    const srcDir = path.join(__dirname, '../src');
    const zipPath = path.join(srcDir, 'layer.zip');

    // 確保 src 目錄存在
    if (!fs.existsSync(srcDir)) {
      fs.mkdirSync(srcDir, { recursive: true });
    }

    // 創建一個最小的有效 ZIP 文件
    fs.writeFileSync(zipPath, Buffer.from('PK\x03\x04\x14\x00\x00\x00\x08\x00dummy zip content'));
  });

  afterEach(() => {
    // 清理測試建立的實際文件
    const zipPath = path.join(__dirname, '../src/layer.zip');
    if (fs.existsSync(zipPath)) {
      try {
        fs.unlinkSync(zipPath);
      } catch (e) {
        console.warn('Could not delete test zip file:', e);
      }
    }

    // 刪除臨時目錄中的 CDK 合成文件
    const tempDirs = fs.readdirSync(os.tmpdir());
    for (const dir of tempDirs) {
      if (dir.startsWith('cdk-test-app')) {
        try {
          const fullPath = path.join(os.tmpdir(), dir);
          // 注意我們不進行過多的清理，因為這可能會導致潛在的問題
          // 只刪除我們認為安全的文件
          const templateFile = path.join(fullPath, 'Default.template.json');
          if (fs.existsSync(templateFile)) {
            fs.unlinkSync(templateFile);
          }
        } catch (e) {
          console.warn(`Could not clean up CDK temp files: ${e}`);
        }
      }
    }
  });

  it('should synthesize to a layer version', () => {
    // Given
    const stack = new Stack();

    // 定義不會影響測試環境的環境變數
    process.env.CDK_DISABLE_STACK_TRACE = '1';

    // 檢查 zip 文件是否存在
    const zipPath = path.join(__dirname, '../src/layer.zip');
    expect(fs.existsSync(zipPath)).toBe(true);

    // When
    const layer = new SecretManagerWrapperLayer(stack, 'Layer');
    expect(layer).toBeDefined();

    // 修改 DockerImage.cp 模擬的行為，確保它被調用
    expect(dockerImageMock).toHaveBeenCalled();

    // Then
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Lambda::LayerVersion', {
      Description: 'this layer has wrapper script help you setting secret manager json string into lambda runtime',
    });

    // 清理環境變數
    delete process.env.CDK_DISABLE_STACK_TRACE;
  });
});