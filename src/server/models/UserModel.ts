import { prop, arrayProp, instanceMethod, staticMethod, Typegoose, ModelType, InstanceType, Ref } from "typegoose";

import CommunityModel, { Community } from './CommunityModel';

export class User extends Typegoose {

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true, unique: true })
  public account: string;

  @prop({ required: true })
  public sig: string;

  @arrayProp({ itemsRef: Community })
  public communities: Ref<Community>[];

  @instanceMethod
  async toggleCommunity(this: InstanceType<User>, communityId: string) {
    console.log()
    const pos = this.communities.findIndex(community => community.toString() === communityId.toString());
    if (pos != -1) {
      this.communities.splice(pos, 1);
    } else {
      this.communities.push(communityId);
    }
    await this.save();
    return await CommunityModel.updateUserCount(communityId);
  }

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
