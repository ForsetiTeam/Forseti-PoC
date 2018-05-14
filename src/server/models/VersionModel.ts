import { prop, Typegoose, ModelType, InstanceType } from "typegoose";

export class Version extends Typegoose {
  @prop({ required: true })
  public version: string;

  @prop({})
  public description: string;
}

const VersionModel = new Version().getModelForClass(Version);

export default VersionModel;
