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
        cp: jest.fn(),
        run: jest.fn(),
      };
    });
  });

  afterAll(() => {
    dockerImageMock.mockRestore();
  });

  beforeEach(() => {
    mock({
      [path.join(__dirname, '../src/layer.zip')]: '',
    });
  });

  afterEach(() => {
    mock.restore();
  });

  it('should synthesize to a layer version', () => {
    // Given
    const stack = new Stack();

    // When
    new SecretManagerWrapperLayer(stack, 'Layer');

    // Then
    Template.fromStack(stack).hasResourceProperties('AWS::Lambda::LayerVersion', {
      Description: 'this layer has wrapper script help you setting secret manager json string into lambda runtime',
    });
  });
});