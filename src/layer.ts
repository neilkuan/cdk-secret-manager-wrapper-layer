import * as path from 'path';
import { DockerImage, RemovalPolicy, Annotations } from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export interface SecretManagerWrapperLayerProps {
  /**
   * The architecture for the Lambda function that will use this layer
   */
  readonly lambdaArchitecture?: lambda.Architecture;
}
export class SecretManagerWrapperLayer extends Construct {
  // public static getOrCreate(scope: Construct): SecretManagerWrapperLayer {
  //   const stack = Stack.of(scope);
  //   const id = 'SecretManagerWrapperLayer';
  //   const existing = stack.node.tryFindChild(id);
  //   return (existing as SecretManagerWrapperLayer) || new SecretManagerWrapperLayer(stack, id, );
  // }
  public readonly layerVersion: lambda.ILayerVersion;
  constructor(scope: Construct, id: string, props?: SecretManagerWrapperLayerProps) {
    super(scope, id);
    const image = DockerImage.fromBuild(path.join(__dirname, '../layer'), {
      platform: props?.lambdaArchitecture! == lambda.Architecture.ARM_64 ? 'linux/arm64' : 'linux/amd64',
      file: 'Dockerfile',
    });
    image.cp('/layer.zip', path.join(__dirname));

    const layerVersionProps: lambda.LayerVersionProps = {
      removalPolicy: RemovalPolicy.DESTROY,
      code: lambda.Code.fromAsset(path.join(__dirname, 'layer.zip')),
      description: 'this layer has wrapper script help you setting secret manager json string into lambda runtime',
    };

    if (!props?.lambdaArchitecture) {
      Annotations.of(this).addWarning(
        'The Lambda Function that uses this layer will need to have a runtime that supports X86_64 linux/amd64.',
      );
    }

    this.layerVersion = new lambda.LayerVersion(this, 'SecretManagerWrapperLayer', layerVersionProps);
  }
}