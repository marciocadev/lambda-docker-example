import { join } from 'path';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { DockerImageCode, DockerImageFunction } from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const dockerfile = join(__dirname, './lambda-fns');

    new DockerImageFunction(this, 'Function', {
      code: DockerImageCode.fromImageAsset(dockerfile),
    });
  }
}

// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'lambda-docker-example', { env: devEnv });
// new MyStack(app, 'my-stack-prod', { env: prodEnv });

app.synth();