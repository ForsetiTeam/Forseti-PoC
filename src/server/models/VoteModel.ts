import {prop, Ref, Typegoose} from "typegoose";
import { User } from "./UserModel";

export class Vote extends Typegoose {

  @prop({ required: true })
  public user: Ref<User>;

  @prop({ })
  public decision: string;

  @prop({ })
  public sign: string;
}

const VoteModel = new Vote().getModelForClass(Vote);

export default VoteModel;
