import {prop, Ref, Typegoose} from "typegoose";
import { User } from "./UserModel";

export enum Decision {
  APPROVE = 'approve',
  DISAPPROVE = 'disapprove',
  ABSTAIN = 'abstain'
}

export class Vote extends Typegoose {

  @prop({ required: true })
  public userAddress: string;

  @prop({ enum: Decision })
  public decision: Decision;

  @prop({ })
  public sig: string;
}

const VoteModel = new Vote().getModelForClass(Vote);

export default VoteModel;