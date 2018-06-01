import {instanceMethod, InstanceType, prop, staticMethod, Typegoose} from "typegoose";
import UserModel, {User} from "./UserModel";

export class Community extends Typegoose {

  @prop({ required: true, unique: true })
  public poolAddress: string;

  @prop({ required: true })
  public poolMasterAddress: string;

  @prop({ required: true, unique: true })
  public name: string;

  @prop({ })
  public title: string;

  @prop({ })
  public description: string;

  @prop({ })
  public icon: string;

  @prop({ })
  public disputesSolved: number;

  @staticMethod
  static async getUsers(communityId: string) {
    return await UserModel.find({communities: communityId});
  }

  @instanceMethod
  getExportJSON(this) {

    return {
      id: this._id,
      poolAddress: this.poolAddress,
      name: this.name,
      title: this.title,
      description: this.description,
      icon: this.icon,
      disputesSolved: this.disputesSolved,
    }
  }
}

const CommunityModel = new Community().getModelForClass(Community);

export default CommunityModel;
