import {prop, Typegoose} from "typegoose";

export class Vote extends Typegoose {

  @prop({ required: true })
  public userAddress: string;

  @prop({ })
  public isAbstained: boolean;

  @prop({ })
  public decision: string;

  @prop({ })
  public sig: string;
}

const VoteModel = new Vote().getModelForClass(Vote);

export default VoteModel;
