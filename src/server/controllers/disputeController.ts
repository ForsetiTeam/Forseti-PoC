import * as express from "express";
import * as passport from "passport";
import config from "../config";

import {NextFunction, Request, Response} from "../types/ExpressExtended";

import DisputeModel from "../models/DisputeModel"

const router = express.Router();

//uploadFile;
import DocumentModel from "../models/DocumentModel";
import * as mongoose from "mongoose";
const multer  = require('multer');
let Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const storage = GridFsStorage({
  url: config.get("db.uri"),
  file: (req, file) => {
    return {metadata: { fileName: file.originalname } }
  }
});
const upload = multer({storage: storage});

async function getList(req: Request, res: Response, next: NextFunction) {
  const params = req.query;
  const filter = {};
  if (params.owner) {
    filter.author = req.user._id;
  }
  if (params.status) {
    filter.status = params.status;
  }

  let list = await DisputeModel.populateAll(DisputeModel.find(filter)).exec();
  console.log(list)
  res.json(list.map(item => item.getExportJSON()));
}

async function get(req: Request, res: Response, next: NextFunction) {
  const disputeId = req.params.id;
  return DisputeModel.populateAll(DisputeModel.findById(disputeId)).exec()
    .then(dispute => res.json(dispute.getExportJSON()))
    .catch(() => res.responses.notFoundResource("Dispute not found"));
}

async function create(req: Request, res: Response, next: NextFunction) {
  upload.single('document');
  const disputeRaw = req.body;
  const dispute = new DisputeModel({
    author: req.user._id,
    title: disputeRaw.title,
    description: disputeRaw.description,
    community: disputeRaw.community,
    arbitersNeed: disputeRaw.arbitersNeed,
    document: req.file.id,
  });

  return dispute.save()
    .then(dispute => res.json(dispute.getExportJSON()))
    .catch(err => res.responses.requestError("Can't save dispute", null));
}

async function getDocument(req: Request, res: Response, next: NextFunction) {
  //get dispute and document name
  const disputeId = req.params.id;
  DisputeModel.findById(disputeId).populate({path: 'document', model: DocumentModel}).exec()
    .then(dispute => {
      if (!dispute.document) return res.responses.notFoundResource("Document not found");

      const docData = dispute.document.toJSON();
      const fileName = docData.metadata && docData.metadata.fileName || 'undefined';

      const gfs = Grid(mongoose.connection.db, mongoose.mongo);
      //заплатка из-за несовместимости gridfs-stream и mongoose v5
      //eval(`Grid.prototype.findOne = ${Grid.prototype.findOne.toString().replace('nextObject', 'next')}`);

      const readstream = gfs.createReadStream({
        _id: docData._id,
        root: 'fs'
      });

      res.set("Content-Type", "application/octet-stream");
      res.header('Content-Disposition', `attachment; filename="${fileName}"`);
      readstream.on('error', err => res.responses.requestError("Error read document", null));
      readstream.pipe(res);
    })
    .catch(() => res.responses.notFoundResource("Dispute not found"));
}


console.log('INIT ROUTES');
router.get("/", passport.authenticate("jwt", { session: false }), getList);
router.get("/:id/document", getDocument);
router.get("/:id", passport.authenticate("jwt", { session: false }), get);
router.post("/", passport.authenticate("jwt", { session: false }), upload.single('document'), create);

export default router;
