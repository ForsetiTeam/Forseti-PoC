import {Typegoose} from "typegoose";

export class Document extends Typegoose {

}

const DisputeModel = new Document().getModelForClass(Document, {
  schemaOptions: { collection: 'fs.files' }
});

export default DisputeModel;
