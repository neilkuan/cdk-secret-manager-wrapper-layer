import * as assertions from 'aws-cdk-lib/assertions';
import * as cdk from 'aws-cdk-lib/core';
import { SecretManagerWrapperLayer } from '../src';

test('Create the Runner', () => {
  const stack = new cdk.Stack();
  new SecretManagerWrapperLayer(stack, 'testing');
  assertions.Template.fromStack(stack).findResources('AWS::Lambda::LayerVersion');
});