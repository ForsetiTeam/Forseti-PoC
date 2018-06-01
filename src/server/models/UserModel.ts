import { prop, arrayProp, instanceMethod, staticMethod, Typegoose, ModelType, InstanceType, Ref } from "typegoose";

import CommunityModel, { Community } from './CommunityModel';

export class User extends Typegoose {

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true, unique: true })
  public account: string;

  @prop({ required: true })
  public sig: string;

  @instanceMethod
  getExportJSON(this: InstanceType<User>) {
    return UserModel.getExportJSON(this);
  }

  @staticMethod
  static getExportJSON(user) {
    return {
      id: user._id,
      email: user.email,
      account: user.account,
      communities: user.communities//.map(community => community.name)
    }
  }
}

const UserModel = new User().getModelForClass(User);

export default UserModel;

export function populateUser(query) {
  return query
    //.populate({path: 'communities', model: CommunityModel});
}
