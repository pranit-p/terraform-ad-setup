import { Construct } from "constructs";
import { App, TerraformStack, TerraformOutput } from "cdktf";
import {
  AzureadProvider,
  Group,
  DataAzureadUser,
  DataAzureadGroup,
  GroupMember,
} from "./.gen/providers/azuread";

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string) {
    super(scope, name);

    new AzureadProvider(this, "azur", {
      tenantId: "36135c2e-af2e-41d8-985f-9682a94ab509",
    });

    const group = new DataAzureadGroup(this, "developer", {
      displayName: "Developers",
      securityEnabled: true,
    });

    const users = new DataAzureadUser(this, "user-1", {
      userPrincipalName: "pranit.pawar@medlytest.onmicrosoft.com",
    });

    const pranit = new GroupMember(this, "assignment", {
      groupObjectId: group.objectId,
      memberObjectId: users.id,
    });

    new TerraformOutput(this, "group_id", {
      value: group.objectId,
    });
    new TerraformOutput(this, "user_id", {
      value: users.id,
    });
  }
}

const app = new App();
new MyStack(app, "terraform-user-assignment-module");
app.synth();
