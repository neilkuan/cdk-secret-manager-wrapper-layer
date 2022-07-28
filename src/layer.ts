import * as path from 'path';
import * as lambda from '@aws-cdk/aws-lambda';
import { DockerImage, RemovalPolicy, Stack, Construct } from '@aws-cdk/core';


/**
 * An AWS SecretManager Wrapper layer
 */
export class SecretManagerWrapperLayer extends lambda.LayerVersion {
  public static getOrCreate(scope: Construct): SecretManagerWrapperLayer {
    const stack = Stack.of(scope);
    const id = 'SecretManagerWrapperLayer';
    const existing = stack.node.tryFindChild(id);
    return (existing as SecretManagerWrapperLayer) || new SecretManagerWrapperLayer(stack, id);
  }
  constructor(scope: Construct, id: string) {

    const image = DockerImage.fromBuild(path.join(__dirname, '../layer'));
    image.cp('/layer.zip', path.join(__dirname));

    const props: lambda.LayerVersionProps = {
      removalPolicy: RemovalPolicy.DESTROY,
      code: lambda.Code.fromAsset(path.join(__dirname, 'layer.zip')),
      description: 'this layer has wrapper script help you setting secret manager json string into lambda runtime',
    };

    super(scope, id, props);

  }
}