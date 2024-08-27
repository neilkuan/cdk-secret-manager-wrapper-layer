# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### SecretManagerWrapperLayer <a name="SecretManagerWrapperLayer" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer"></a>

An AWS SecretManager Wrapper layer.

#### Initializers <a name="Initializers" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer"></a>

```typescript
import { SecretManagerWrapperLayer } from 'cdk-secret-manager-wrapper-layer'

new SecretManagerWrapperLayer(scope: Construct, id: string)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer.parameter.scope">scope</a></code> | <code>@aws-cdk/core.Construct</code> | *No description.* |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer.parameter.scope"></a>

- *Type:* @aws-cdk/core.Construct

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

- *Type:* @aws-cdk/core.RemovalPolicy

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

- *Type:* @aws-cdk/aws-lambda.LayerVersionPermission

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isConstruct">isConstruct</a></code> | Return whether the given object is a Construct. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isResource">isResource</a></code> | Check whether the given construct is a Resource. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.fromLayerVersionArn">fromLayerVersionArn</a></code> | Imports a layer version by ARN. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.fromLayerVersionAttributes">fromLayerVersionAttributes</a></code> | Imports a Layer that has been defined externally. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.getOrCreate">getOrCreate</a></code> | *No description.* |

---

##### `isConstruct` <a name="isConstruct" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isConstruct"></a>

```typescript
import { SecretManagerWrapperLayer } from 'cdk-secret-manager-wrapper-layer'

SecretManagerWrapperLayer.isConstruct(x: any)
```

Return whether the given object is a Construct.

###### `x`<sup>Required</sup> <a name="x" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isConstruct.parameter.x"></a>

- *Type:* any

---

##### `isResource` <a name="isResource" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isResource"></a>

```typescript
import { SecretManagerWrapperLayer } from 'cdk-secret-manager-wrapper-layer'

SecretManagerWrapperLayer.isResource(construct: IConstruct)
```

Check whether the given construct is a Resource.

###### `construct`<sup>Required</sup> <a name="construct" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isResource.parameter.construct"></a>

- *Type:* @aws-cdk/core.IConstruct

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

- *Type:* @aws-cdk/aws-lambda.LayerVersionAttributes

the properties of the imported layer.

---

##### `getOrCreate` <a name="getOrCreate" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.getOrCreate"></a>

```typescript
import { SecretManagerWrapperLayer } from 'cdk-secret-manager-wrapper-layer'

SecretManagerWrapperLayer.getOrCreate(scope: Construct)
```

###### `scope`<sup>Required</sup> <a name="scope" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.getOrCreate.parameter.scope"></a>

- *Type:* @aws-cdk/core.Construct

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.node">node</a></code> | <code>@aws-cdk/core.ConstructNode</code> | The construct tree node associated with this construct. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.env">env</a></code> | <code>@aws-cdk/core.ResourceEnvironment</code> | The environment this resource belongs to. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.stack">stack</a></code> | <code>@aws-cdk/core.Stack</code> | The stack in which this resource is defined. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.layerVersionArn">layerVersionArn</a></code> | <code>string</code> | The ARN of the Lambda Layer version that this Layer defines. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.compatibleRuntimes">compatibleRuntimes</a></code> | <code>@aws-cdk/aws-lambda.Runtime[]</code> | The runtimes compatible with this Layer. |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.node"></a>

```typescript
public readonly node: ConstructNode;
```

- *Type:* @aws-cdk/core.ConstructNode

The construct tree node associated with this construct.

---

##### `env`<sup>Required</sup> <a name="env" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.env"></a>

```typescript
public readonly env: ResourceEnvironment;
```

- *Type:* @aws-cdk/core.ResourceEnvironment

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

- *Type:* @aws-cdk/core.Stack

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

- *Type:* @aws-cdk/aws-lambda.Runtime[]

The runtimes compatible with this Layer.

---





