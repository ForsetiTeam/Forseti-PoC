import { prop, Typegoose, ModelType, InstanceType, Ref } from "typegoose";

import Community from './CommunityModel';

export class User extends Typegoose {
  /*@prop({ required: false })
  public name: string;*/

  @prop({ required: true, unique: true })
  public email: string;

  @prop({ required: true, unique: true })
  public account: string;

  @prop({ required: true })
  public sign: string;

  @prop()
  public communities: Ref<Community>[]
}

const UserModel = new User().getModelForClass(User);

export default UserModel;
