import {instanceMethod, InstanceType, prop, Ref, Typegoose} from "typegoose";

import UserModel, {User} from "./UserModel";
import CommunityModel from './CommunityModel';

enum Status {
  OPEN = 'open',
  CLOSED = 'closed',
}
export class Dispute extends Typegoose {

  @prop({ required: true, autopopulate: true })
  public author: Ref<UserModel>;

  @prop({ required: true })
  public title: string;

  @prop({})
  public description: string;

  @prop({ required: true, autopopulate: true })
  public community: Ref<CommunityModel>;

  @prop({enum: Status, default: Status.OPEN})
  public status: Status;

  @instanceMethod
  getExportJSON(this: InstanceType<Dispute>) {
    return {
      id: this._id,
      author: this.author,
      title: this.title,
      description: this.description,
      community: this.community.name,
      status: this.status
    }
  }
}


const DisputeModel = new Dispute().getModelForClass(Dispute);

DisputeModel.populateAll = function(query) {
  query
    .populate({path: 'community', model: CommunityModel})
    //.populate({path: 'author', model: UserModel});
  return query;
};

export default DisputeModel;
