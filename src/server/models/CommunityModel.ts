import { prop, Typegoose } from "typegoose";

export class Community extends Typegoose {
  @prop({ required: true, unique: true })
  public name: string;

  @prop({ })
  public title: string;

  @prop({ })
  public description: string;

  @prop({ })
  public icon: string;

  @prop({ })
  public disputesSolved: number;

  @prop({ })
  public membersActive: number;
}

const CommunityModel = new Community().getModelForClass(Community);

export default CommunityModel;
