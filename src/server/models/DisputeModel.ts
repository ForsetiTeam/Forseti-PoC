import {arrayProp, instanceMethod, InstanceType, prop, Ref, Typegoose} from "typegoose";

import { User } from "./UserModel";
import CommunityModel, { Community } from './CommunityModel';
import DocumentModel, { Document } from './DocumentModel';
import VoteModel, { Vote, Decision } from './VoteModel';

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

  @prop({ })
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
    let users = await CommunityModel.getUsers(this.community._id.toString());

    //remove author from users list
    users = users.filter(user => user._id.toString() !== this.author.toString());

    //make user array with id's
    const userIds = users.map(user => user._id);

    //select arbiters from users list
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

    let exportData = {
      id: this._id,
      author: this.author,
      title: this.title,
      description: this.description,
      communityName: this.community.name,
      status: this.status,
      arbitersNeed: this.arbitersNeed,
      document: fileName,
      ethAddress: this.ethAddress,

      poolAddress: this.community.poolAddress,
    };

    if (this.author.toString() === userId.toString()) {
      //author or pool-master
      exportData = Object.assign(exportData,
        this.arbiters.reduce((summary, arbiter) => {
          if (arbiter.decision === Decision.ABSTAIN) summary.usersRejected++;
          if (arbiter.decision === Decision.APPROVE || arbiter.decision === Decision.DISAPPROVE) summary.usersVoted++;
          return summary;
        }, { usersRejected: 0, usersVoted: 0 })
      );
    } else {
      //other
      const vote = this.getUserVote(userId);

      exportData = Object.assign(exportData, {
        userIsArbiter: !!vote,
        userDecision: vote ? vote.decision : null
      })
    }

    return exportData;
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