import {instanceMethod, InstanceType, prop, Ref, Typegoose} from "typegoose";

import UserModel from "./UserModel";
import CommunityModel from './CommunityModel';
import DocumentModel from './DocumentModel';

enum Status {
  OPEN = 'open',
  CLOSED = 'closed',
}
export class Dispute extends Typegoose {

  @prop({ required: true })
  public author: Ref<UserModel>;

  @prop({ required: true })
  public title: string;

  @prop({default: ''})
  public description: string;

  @prop({ required: true })
  public community: Ref<CommunityModel>;

  @prop({ enum: Status, default: Status.OPEN })
  public status: Status;

  @prop({ required: true })
  public arbitersNeed?: number;

  @prop({ })
  public document?: Ref<DocumentModel>;

  @prop({ required: true })
  public ethAddress: string;

  @instanceMethod
  getExportJSON(this: InstanceType<Dispute>) {
    const document = this.document ? this.document.toJSON() : null;
    const fileName = document && document.metadata ? document.metadata.fileName : null;
    return {
      id: this._id,
      author: this.author,
      title: this.title,
      description: this.description,
      community: this.community.name,
      status: this.status,
      arbitersNeed: this.arbitersNeed,
      document: fileName
    }
  }
}

const DisputeModel = new Dispute().getModelForClass(Dispute);

export function populateDispute(query) {
  return query
    .populate({path: 'community', model: CommunityModel})
    .populate({path: 'document', model: DocumentModel});
  //.populate({path: 'author', model: UserModel});
}

export default DisputeModel;
