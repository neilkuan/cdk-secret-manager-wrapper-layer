import * as path from 'path';
import { DockerImage, RemovalPolicy, Stack } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';


/**
 * An AWS SecretManager Wrapper layer that includes the AWS CLI, jq etc...
 */
export class SecretManagerWrapperLayer extends lambda.LayerVersion {
  public static getOrCreate(scope: Construct): SecretManagerWrapperLayer {
    const stack = Stack.of(scope);
    const id = 'DenoLayer';
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