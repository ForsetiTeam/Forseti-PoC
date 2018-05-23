import {arrayProp, instanceMethod, InstanceType, prop, Ref, Typegoose} from "typegoose";

import UserModel from "./UserModel";
import CommunityModel from './CommunityModel';
import DocumentModel from './DocumentModel';
import VoteModel, {Vote} from './VoteModel';

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

  @arrayProp({ items: VoteModel, default: [] })
  public arbiters: VoteModel[];

  @instanceMethod
  getUserVote(this: InstanceType<Dispute>, userId: string) {
    console.log('GET USER VOTE', userId, this.arbiters);
    this.arbiters.find(vote => {
      console.log('CHECK', typeof(vote.user), typeof(userId));
      return vote.user == userId
    });
    return this.arbiters.find(vote => vote.user.toString() == userId);
  }

  @instanceMethod
  addVote(this: InstanceType<Dispute>, userId: string, decision: string) {
    this.arbiters.push(new VoteModel({user: userId, decision}));
    this.markModified('arbiters');
  }

  @instanceMethod
  getExportJSON(this: InstanceType<Dispute>, userId: string) {
    const document = this.document ? this.document.toJSON() : null;
    const fileName = document && document.metadata ? document.metadata.fileName : null;
    const vote = this.getUserVote(userId);

    return {
      id: this._id,
      author: this.author,
      title: this.title,
      description: this.description,
      community: this.community.name,
      status: this.status,
      arbitersNeed: this.arbitersNeed,
      document: fileName,
      userDecision: vote ? vote.decision : null
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
