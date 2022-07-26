const { awscdk } = require("projen");
const project = new awscdk.AwsCdkConstructLibrary({
  author: "Neil Kuan",
  authorAddress: "guan840912@gmail.com",
  cdkVersion: "2.1.0",
  defaultReleaseBranch: "main",
  name: "cdk-secret-manager-wrapper-layer",
  repositoryUrl: "https://github.com/guan840912/cdk-secret-manager-wrapper-layer.git",

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();