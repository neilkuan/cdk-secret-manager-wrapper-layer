const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  cdkVersion: '2.181.0',
  defaultReleaseBranch: 'main',
  repository: 'https://github.com/neilkuan/cdk-secret-manager-wrapper-layer.git',
  authorName: 'Neil Kuan',
  authorEmail: 'guan840912@gmail.com',
  name: 'cdk-secret-manager-wrapper-layer',
  keywords: ['aws', 'cdk', 'secret-manager', 'lambda', 'layer'],
  catalog: {
    twitter: 'neil_kuan',
    announce: false,
  },
  compat: true,
  stability: 'experimental',
  /**
   * we default release the main branch(cdkv2) with major version 2.
   */
  majorVersion: 2,
  defaultReleaseBranch: 'main',
  autoDetectBin: false,
  depsUpgradeOptions: {
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
    },
    exclude: ['mock-fs'],
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['neilkuan'],
  },
  publishToPypi: {
    distName: 'cdk-secret-manager-wrapper-layer',
    module: 'cdk_secret_manager_wrapper_layer',
  },
  workflowNodeVersion: '^20',
  devDeps: [
    'typescript@4.6',
    'mock-fs@5.1.2',
    '@types/mock-fs',
    'ts-node',
  ],
  typescriptVersion: '^4.9',
});


const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log', 'coverage', 'venv'];
project.gitignore.exclude(...common_exclude, 'src/layer.zip');

project.npmignore.exclude(...common_exclude, 'image');
project.synth();