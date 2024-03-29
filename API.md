# `cdk-secret-manager-wrapper-layer`
that Lambda layer uses a wrapper script to fetch information from Secrets Manager and create environmental variables.
> idea from [source](https://github.com/aws-samples/aws-lambda-environmental-variables-from-aws-secrets-manager)

## Example
```ts
import { App, Stack, CfnOutput, Duration } from 'aws-cdk-lib';
import { Effect, PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { Function, Runtime, Code, FunctionUrlAuthType } from 'aws-cdk-lib/aws-lambda';
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
const secret = new CfnSecret(stack, 'Mysecret', {
  secretString: JSON.stringify({
    KEY1: 'VALUE1',
    KEY2: 'VALUE2',
    KEY3: 'VALUE3',
  }),
});

const layer = new SecretManagerWrapperLayer(stack, 'SecretManagerWrapperLayer');

const lambda = new Function(stack, 'fn', {
  runtime: Runtime.PYTHON_3_9,
  code: Code.fromInline(`
import os
def hander(events, contexts):
    env = {}
    env['KEY1'] = os.environ.get('KEY1', 'Not Found')
    env['KEY2'] = os.environ.get('KEY2', 'Not Found')
    env['KEY3'] = os.environ.get('KEY3', 'Not Found')
    return env
    `),
  handler: 'index.hander',
  layers: [layer],
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
# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### SecretManagerWrapperLayer <a name="SecretManagerWrapperLayer" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer"></a>

An AWS SecretManager Wrapper layer that includes the AWS CLI, jq etc...

#### Initializers <a name="Initializers" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer"></a>

```typescript
import { SecretManagerWrapperLayer } from 'cdk-secret-manager-wrapper-layer'

new SecretManagerWrapperLayer(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer.parameter.id"></a>

- *Type:* string

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.applyRemovalPolicy">applyRemovalPolicy</a></code> | Apply the given removal policy to this resource. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.addPermission">addPermission</a></code> | Add permission for this layer version to specific entities. |

---

##### `toString` <a name="toString" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `applyRemovalPolicy` <a name="applyRemovalPolicy" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.applyRemovalPolicy"></a>

```typescript
public applyRemovalPolicy(policy: RemovalPolicy): void
```

Apply the given removal policy to this resource.

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

###### `policy`<sup>Required</sup> <a name="policy" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.applyRemovalPolicy.parameter.policy"></a>

- *Type:* aws-cdk-lib.RemovalPolicy

---

##### `addPermission` <a name="addPermission" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.addPermission"></a>

```typescript
public addPermission(id: string, permission: LayerVersionPermission): void
```

Add permission for this layer version to specific entities.

Usage within
the same account where the layer is defined is always allowed and does not
require calling this method. Note that the principal that creates the
Lambda function using the layer (for example, a CloudFormation changeset
execution role) also needs to have the ``lambda:GetLayerVersion``
permission on the layer version.

###### `id`<sup>Required</sup> <a name="id" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.addPermission.parameter.id"></a>

- *Type:* string

---

###### `permission`<sup>Required</sup> <a name="permission" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.addPermission.parameter.permission"></a>

- *Type:* aws-cdk-lib.aws_lambda.LayerVersionPermission

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isOwnedResource">isOwnedResource</a></code> | Returns true if the construct was created by CDK, and false otherwise. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.fromLayerVersionArn">fromLayerVersionArn</a></code> | Imports a layer version by ARN. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.fromLayerVersionAttributes">fromLayerVersionAttributes</a></code> | Imports a Layer that has been defined externally. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.getOrCreate">getOrCreate</a></code> | *No description.* |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isConstruct"></a>

```typescript
import { SecretManagerWrapperLayer } from 'cdk-secret-manager-wrapper-layer'

SecretManagerWrapperLayer.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

##### `isOwnedResource` <a name="isOwnedResource" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isOwnedResource"></a>

```typescript
import { SecretManagerWrapperLayer } from 'cdk-secret-manager-wrapper-layer'

SecretManagerWrapperLayer.isOwnedResource(construct: IConstruct)
```

Returns true if the construct was created by CDK, and false otherwise.

###### `construct`<sup>Required</sup> <a name="construct" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isOwnedResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `isResource` <a name="isResource" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isResource"></a>

```typescript
import { SecretManagerWrapperLayer } from 'cdk-secret-manager-wrapper-layer'

SecretManagerWrapperLayer.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isResource.parameter.construct"></a>

- *Type:* constructs.IConstruct

---

##### `fromLayerVersionArn` <a name="fromLayerVersionArn" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.fromLayerVersionArn"></a>

```typescript
import { SecretManagerWrapperLayer } from 'cdk-secret-manager-wrapper-layer'

SecretManagerWrapperLayer.fromLayerVersionArn(scope: Construct, id: string, layerVersionArn: string)
```

Imports a layer version by ARN.

Assumes it is compatible with all Lambda runtimes.

###### `scope`<sup>Required</sup> <a name="scope" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.fromLayerVersionArn.parameter.scope"></a>

- *Type:* constructs.Construct

---

###### `id`<sup>Required</sup> <a name="id" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.fromLayerVersionArn.parameter.id"></a>

- *Type:* string

---

###### `layerVersionArn`<sup>Required</sup> <a name="layerVersionArn" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.fromLayerVersionArn.parameter.layerVersionArn"></a>

- *Type:* string

---

##### `fromLayerVersionAttributes` <a name="fromLayerVersionAttributes" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.fromLayerVersionAttributes"></a>

```typescript
import { SecretManagerWrapperLayer } from 'cdk-secret-manager-wrapper-layer'

SecretManagerWrapperLayer.fromLayerVersionAttributes(scope: Construct, id: string, attrs: LayerVersionAttributes)
```

Imports a Layer that has been defined externally.

###### `scope`<sup>Required</sup> <a name="scope" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.fromLayerVersionAttributes.parameter.scope"></a>

- *Type:* constructs.Construct

the parent Construct that will use the imported layer.

---

###### `id`<sup>Required</sup> <a name="id" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.fromLayerVersionAttributes.parameter.id"></a>

- *Type:* string

the id of the imported layer in the construct tree.

---

###### `attrs`<sup>Required</sup> <a name="attrs" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.fromLayerVersionAttributes.parameter.attrs"></a>

- *Type:* aws-cdk-lib.aws_lambda.LayerVersionAttributes

the properties of the imported layer.

---

##### `getOrCreate` <a name="getOrCreate" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.getOrCreate"></a>

```typescript
import { SecretManagerWrapperLayer } from 'cdk-secret-manager-wrapper-layer'

SecretManagerWrapperLayer.getOrCreate(scope: Construct)
```

###### `scope`<sup>Required</sup> <a name="scope" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.getOrCreate.parameter.scope"></a>

- *Type:* constructs.Construct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.env">env</a></code> | <code>aws-cdk-lib.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.stack">stack</a></code> | <code>aws-cdk-lib.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.layerVersionArn">layerVersionArn</a></code> | <code>string</code> | The ARN of the Lambda Layer version that this Layer defines. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.compatibleRuntimes">compatibleRuntimes</a></code> | <code>aws-cdk-lib.aws_lambda.Runtime[]</code> | The runtimes compatible with this Layer. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `env`<sup>Required</sup> <a name="env" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* aws-cdk-lib.ResourceEnvironment

The environment this resource belongs to.

For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

---

##### `stack`<sup>Required</sup> <a name="stack" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.stack"></a>

```typescript
public readonly stack: Stack;
```

- *Type:* aws-cdk-lib.Stack

The stack in which this resource is defined.

---

##### `layerVersionArn`<sup>Required</sup> <a name="layerVersionArn" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.layerVersionArn"></a>

```typescript
public readonly layerVersionArn: string;
```

- *Type:* string

The ARN of the Lambda Layer version that this Layer defines.

---

##### `compatibleRuntimes`<sup>Optional</sup> <a name="compatibleRuntimes" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.compatibleRuntimes"></a>

```typescript
public readonly compatibleRuntimes: Runtime[];
```

- *Type:* aws-cdk-lib.aws_lambda.Runtime[]

The runtimes compatible with this Layer.

---





