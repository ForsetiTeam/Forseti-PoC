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
  public sig: string;

  @arrayProp({ itemsRef: Community })
  public communities: Ref<Community>[];

  @instanceMethod
  getExportJSON(this: InstanceType<User>) {
    return UserModel.getExportJSON(this);
  }
}

const UserModel = new User().getModelForClass(User);

UserModel.getExportJSON = function(user: InstanceType<User>) {
  return {
    id: user._id,
    email: user.email,
    account: user.account,
    communities: user.communities.map(community => community.name)
  }
};

export default UserModel;
