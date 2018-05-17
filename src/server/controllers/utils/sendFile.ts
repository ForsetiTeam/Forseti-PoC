import * as mongoose from 'mongoose';
import {Request, Response} from '../../types/ExpressExtended';
const Grid = require('gridfs-stream');

export default function sendFile(res : Response, fileData, fileName : String) {
  const gfs = Grid(mongoose.connection.db, mongoose.mongo);

  const readstream = gfs.createReadStream({
    _id: fileData._id,
    root: 'fs'
  });

  res.set('Content-Type', 'application/octet-stream');
  res.header('Content-Disposition', `attachment; filename="${fileName}"`);
  readstream.on('error', () => res.responses.requestError('Error read document', null));
  readstream.pipe(res);
}
