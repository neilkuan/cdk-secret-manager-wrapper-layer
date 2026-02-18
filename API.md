# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### SecretManagerWrapperLayer <a name="SecretManagerWrapperLayer" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer"></a>

#### Initializers <a name="Initializers" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer"></a>

```typescript
import { SecretManagerWrapperLayer } from 'cdk-secret-manager-wrapper-layer'

new SecretManagerWrapperLayer(scope: Construct, id: string, props?: SecretManagerWrapperLayerProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer.parameter.props">props</a></code> | <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayerProps">SecretManagerWrapperLayerProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Optional</sup> <a name="props" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.Initializer.parameter.props"></a>

- *Type:* <a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayerProps">SecretManagerWrapperLayerProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.toString">toString</a></code> | Returns a string representation of this construct. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.with">with</a></code> | Applies one or more mixins to this construct. |

---

##### `toString` <a name="toString" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

##### `with` <a name="with" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.with"></a>

```typescript
public with(mixins: ...IMixin[]): IConstruct
```

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.
Use multiple `with()` calls if subsequent mixins should apply to added
constructs.

###### `mixins`<sup>Required</sup> <a name="mixins" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.with.parameter.mixins"></a>

- *Type:* ...constructs.IMixin[]

The mixins to apply.

---

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### `isConstruct` <a name="isConstruct" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isConstruct"></a>

```typescript
import { SecretManagerWrapperLayer } from 'cdk-secret-manager-wrapper-layer'

SecretManagerWrapperLayer.isConstruct(x: any)
```

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

###### `x`<sup>Required</sup> <a name="x" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.layerVersion">layerVersion</a></code> | <code>aws-cdk-lib.aws_lambda.ILayerVersion</code> | *No description.* |

---

##### `node`<sup>Required</sup> <a name="node" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---

##### `layerVersion`<sup>Required</sup> <a name="layerVersion" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayer.property.layerVersion"></a>

```typescript
public readonly layerVersion: ILayerVersion;
```

- *Type:* aws-cdk-lib.aws_lambda.ILayerVersion

---


## Structs <a name="Structs" id="Structs"></a>

### SecretManagerWrapperLayerProps <a name="SecretManagerWrapperLayerProps" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayerProps"></a>

#### Initializer <a name="Initializer" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayerProps.Initializer"></a>

```typescript
import { SecretManagerWrapperLayerProps } from 'cdk-secret-manager-wrapper-layer'

const secretManagerWrapperLayerProps: SecretManagerWrapperLayerProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayerProps.property.lambdaArchitecture">lambdaArchitecture</a></code> | <code>aws-cdk-lib.aws_lambda.Architecture</code> | The architecture for the Lambda function that will use this layer. |

---

##### `lambdaArchitecture`<sup>Optional</sup> <a name="lambdaArchitecture" id="cdk-secret-manager-wrapper-layer.SecretManagerWrapperLayerProps.property.lambdaArchitecture"></a>

```typescript
public readonly lambdaArchitecture: Architecture;
```

- *Type:* aws-cdk-lib.aws_lambda.Architecture

The architecture for the Lambda function that will use this layer.

---



