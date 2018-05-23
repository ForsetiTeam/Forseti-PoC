import {prop, Ref, Typegoose} from "typegoose";
import User from "./UserModel";

export class Vote extends Typegoose {

  @prop({ required: true })
  public user: Ref<User>;

  @prop({ required: true })
  public decision: string;
}

const VoteModel = new Vote().getModelForClass(Vote);

export default VoteModel;
