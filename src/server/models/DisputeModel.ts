import {arrayProp, instanceMethod, InstanceType, prop, Ref, Typegoose} from "typegoose";

import { User } from "./UserModel";
import CommunityModel, { Community } from './CommunityModel';
import DocumentModel, { Document } from './DocumentModel';
import VoteModel, { Vote } from './VoteModel';

import selectArbiters from '../lib/selectArbiters';

enum Status {
  OPEN = 'open',
  CLOSED = 'closed',
}

export class Dispute extends Typegoose {

  @prop({ required: true })
  public author: Ref<User>;

  @prop({ required: true })
  public title: string;

  @prop({default: ''})
  public description: string;

  @prop({ required: true })
  public community: Ref<Community>;

  @prop({ enum: Status, default: Status.OPEN })
  public status: Status;

  @prop({ required: true })
  public arbitersNeed?: number;

  @prop({ })
  public document?: Ref<Document>;

  @prop({ required: true })
  public ethAddress: string;

  @arrayProp({ items: Vote, default: [] })
  public arbiters: Vote[];

  @instanceMethod
  getUserVote(this: InstanceType<Dispute>, userId: string) {
    return this.arbiters.find(vote => vote.user.toString() == userId);
  }

  @instanceMethod
  addVote(this: InstanceType<Dispute>, userId: string, decision: string) {
    this.arbiters.push(new VoteModel({user: userId, decision}));
    this.markModified('arbiters');
  }

  @instanceMethod
  async setArbiters(this) {
    //select all users assigned with community
    let users = await CommunityModel.getUsers(this.community.toString());
    //remove author from users list
    users = users.filter(user => user._id.toString() !== this.author._id);
    console.log('setArbiters3', users);
    //make user array with id's
    const userIds = users.map(user => user._id);
    //select arbiters from users list
    console.log('setArbiters5',userIds);
    const selected = selectArbiters(userIds, this._id, this.arbitersNeed);
    if (!selected) return false;

    const arbiters = selected.map(userId => new VoteModel({user: userId}));
    this.arbiters = arbiters;

    await this.save();
    return true;
  }

  @instanceMethod
  getExportJSON(this, userId: string) {
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

      userIsArbiter: !!vote,
      userDecision: vote ? vote.decision : null
    }
  }
}

const DisputeModel = new Dispute().getModelForClass(Dispute);

export default DisputeModel;

export function populateDispute(query) {
  return query
    .populate({path: 'community', model: CommunityModel})
    .populate({path: 'document', model: DocumentModel});
  //.populate({path: 'author', model: UserModel});
}