import { prop, Typegoose, ModelType, InstanceType } from "typegoose";

export class User extends Typegoose {
  @prop({ required: true })
  public name: string;

  @prop()
  public surname: string;

  @prop({ required: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  @prop({ default: false })
  public emailConfirmed: boolean;

  @prop()
  public ethAddress: string;

  @prop()
  public confirmationToken: string;

  @prop()
  public confirmationLastDate: number;

  @prop()
  public passwordRecoverToken: string;

  @prop()
  public passwordRecoverLastDate: number;

  @prop()
  public emailChangeToken: string;

  @prop()
  public emailChangeLastDate: number;

  @prop()
  public passwordChangeToken: string;

  @prop()
  public passwordChangeLastDate: number;

  @prop()
  public emailChangeValue: string;

  @prop()
  public passwordChangeValue: string;
}

const UserModel = new User().getModelForClass(User);

export default UserModel;
