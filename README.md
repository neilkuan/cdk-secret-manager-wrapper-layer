# `cdk-secret-manager-wrapper-layer` 
that Lambda layer uses a wrapper script to fetch information from Secrets Manager and create environmental variables.
> idea from [source](https://github.com/aws-samples/aws-lambda-environmental-variables-from-aws-secrets-manager)

## Updates

**2025-03-02: v2.1.0**
- Added architecture parameter support for Lambda Layer
- Updated Python runtime from 3.9 to 3.13
- Fixed handler name in example code
- Improved layer initialization and referencing patterns
- Enhanced compatibility with AWS Lambda ARM64 architecture

## Example
```ts
import { App, Stack, CfnOutput, Duration } from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Function, Runtime, Code, FunctionUrlAuthType, Architecture } from 'aws-cdk-lib/aws-lambda';
import { CfnSecret } from 'aws-cdk-lib/aws-secretsmanager';
import { SecretManagerWrapperLayer } from 'cdk-secret-manager-wrapper-layer';
const env = {
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT,
};
const app = new App();
const stack = new Stack(app, 'testing-stack', { env });

/**
 * Example create an Secret for testing.
 */
const secret = new CfnSecret(stack, 'MySecret', {
  secretString: JSON.stringify({
    KEY1: 'VALUE1',
    KEY2: 'VALUE2',
    KEY3: 'VALUE3',
  }),
});

const lambdaArchitecture = Architecture.X86_64;

const layer = new SecretManagerWrapperLayer(stack, 'SecretManagerWrapperLayer', {
  lambdaArchitecture,
});

const lambda = new Function(stack, 'fn', {
  runtime: Runtime.PYTHON_3_13,
  code: Code.fromInline(`
import os
def handler(events, contexts):
    env = {}
    env['KEY1'] = os.environ.get('KEY1', 'Not Found')
    env['KEY2'] = os.environ.get('KEY2', 'Not Found')
    env['KEY3'] = os.environ.get('KEY3', 'Not Found')
    return env
    `),
  handler: 'index.handler',
  layers: [layer.layerVersion],
  timeout: Duration.minutes(1),
  /**
   * you need to define this 4 environment various.
   */
  environment: {
    AWS_LAMBDA_EXEC_WRAPPER: '/opt/get-secrets-layer',
    SECRET_REGION: stack.region,
    SECRET_ARN: secret.ref,
    API_TIMEOUT: '5000',
  },
  architecture: lambdaArchitecture,
});

/**
 * Add Permission for lambda get secret value from secret manager.
 */
lambda.role!.addToPrincipalPolicy(
  new PolicyStatement({
    effect: Effect.ALLOW,
    actions: ['secretsmanager:GetSecretValue'],
    // Also you can use find from context.
    resources: [secret.ref],
  }),
);

/**
 * For Testing.
 */
const FnUrl = lambda.addFunctionUrl({
  authType: FunctionUrlAuthType.NONE,
});

new CfnOutput(stack, 'FnUrl', {
  value: FnUrl.url,
});
```

## Testing 
```bash
# ex: curl https://sdfghjklertyuioxcvbnmghj.lambda-url.us-east-1.on.aws/
curl ${FnUrl}
{"KEY2":"VALUE2","KEY1":"VALUE1","KEY3":"VALUE3"}
```