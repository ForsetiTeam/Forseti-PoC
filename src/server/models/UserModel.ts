import { prop, arrayProp, instanceMethod, Typegoose, ModelType, InstanceType, Ref } from "typegoose";

import Community from './CommunityModel';

export class User extends Typegoose {
  /*@prop({ required: false })
  public name: string;*/

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true, unique: true })
  public account: string;

  @prop({ required: true })
  public sign: string;

  @arrayProp({ itemsRef: Community })
  public communities: Ref<Community>[];

  @instanceMethod
  getExportJSON(this: InstanceType<User>) {
    return {
      email: this.email,
      account: this.account,
      communities: this.communities.map(community => community.name)
    }
  }
}

const UserModel = new User().getModelForClass(User);

export default UserModel;
