import {arrayProp, instanceMethod, InstanceType, prop, Ref, Typegoose} from "typegoose";

import config from '../config';

import UserModel, { User } from "./UserModel";
import CommunityModel, { Community } from './CommunityModel';
import VoteModel, { Vote, Decision } from './VoteModel';

import getPoolActiveArbiters from '../ethereum/pool/getPoolActiveArbiters';
import selectArbiters from '../lib/selectArbiters';

export class Dispute extends Typegoose {

  @prop({ required: true })
  public author: Ref<User>;

  @prop({ required: true })
  public title: string;

  @prop({default: ''})
  public description: string;

  @prop({ required: true })
  public community: Ref<Community>;

  @prop({ required: true })
  public arbitersNeed?: number;

  @prop({ })
  public eth: number;

  @prop({ })
  public document: string;

  @prop({ })
  public ethAddress: string;

  @arrayProp({ items: Vote, default: [] })
  public arbiters: Vote[];

  @instanceMethod
  getUserVote(this: InstanceType<Dispute>, userAddress: string) {
    return this.arbiters.find(vote => vote.userAddress == userAddress);
  }

  @instanceMethod
  addVote(this: InstanceType<Dispute>, userId: string, decision: string) {
    this.arbiters.push(new VoteModel({user: userId, decision}));
    this.markModified('arbiters');
  }

  @instanceMethod
  setArbiters(this) {
    return UserModel.findById(this.author)
      .then(author => Promise.all([
        author,
        getPoolActiveArbiters(this.community.poolAddress)
      ]))
      .then(([author, users]) => {
        //remove author from users list
        users = users.filter(user => user.address.toLowerCase() !== author.account.toLowerCase());

        //select arbiters from users list
        if (!config.get('accessToAllPoolArbiters')) {
          users = selectArbiters(users, this._id, this.arbitersNeed);
          if (!users) return Promise.reject('Not enough arbiters in the pool');
        }

        this.arbiters = users.map(user => new VoteModel({userAddress: user.address.toLowerCase()}));
        return this;
      })
  }

  @instanceMethod
  calcResult(this) {
    const {approve, disapprove} = this.arbiters.reduce((summary, vote) => {
      if (vote.decision === Decision.APPROVE) summary.approve++;
      if (vote.decision === Decision.DISAPPROVE) summary.disapprove++;
      return summary;
    }, {approve: 0, disapprove: 0});

    if (this.arbitersNeed > approve + disapprove) return Decision.ABSTAIN;

    return approve > disapprove ? Decision.APPROVE : Decision.DISAPPROVE;
  }

  @instanceMethod
  getExportJSON(this, user) {
    let exportData = {
      id: this._id,
      author: this.author._id,
      authorAddress: this.author.account,
      title: this.title,
      description: this.description,
      communityName: this.community.name,
      isClosed: this.isClosed,
      result: this.result,
      eth: this.eth,
      arbitersNeed: this.arbitersNeed,
      document: this.document,
      ethAddress: this.ethAddress,

      poolAddress: this.community.poolAddress
    };

    if (this.author._id.toString() === user._id.toString()) {
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
      const vote = this.getUserVote(user.account);
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
    .populate({path: 'author', model: UserModel});
}