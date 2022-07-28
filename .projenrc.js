const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  cdkVersion: '1.165.0',
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
  /**
    * we also release the cdkv1 branch with major version 1.
    */
  releaseBranches: {
    cdkv1: { npmDistTag: 'cdkv1', majorVersion: 1 },
  },
  autoDetectBin: false,
  depsUpgradeOptions: {
    ignoreProjen: false,
    workflowOptions: {
      labels: ['auto-approve', 'auto-merge'],
    },
  },
  autoApproveOptions: {
    secret: 'GITHUB_TOKEN',
    allowedUsernames: ['neilkuan'],
  },
  publishToPypi: {
    distName: 'cdk-secret-manager-wrapper-layer',
    module: 'cdk_secret_manager_wrapper_layer',
  },
  workflowNodeVersion: '^14.17.0',
  devDeps: [
    'typescript@4.6',
    'mock-fs',
    '@types/mock-fs',
  ],
  typescriptVersion: '4.6',
  cdkDependencies: [
    '@aws-cdk/aws-iam',
    '@aws-cdk/aws-secretsmanager',
    '@aws-cdk/aws-lambda',
    '@aws-cdk/core',
    '@aws-cdk/assertions',
  ],
});

const common_exclude = ['cdk.out', 'cdk.context.json', 'yarn-error.log', 'coverage', 'venv'];
project.gitignore.exclude(...common_exclude, 'src/layer.zip');

project.npmignore.exclude(...common_exclude, 'image');
project.synth();