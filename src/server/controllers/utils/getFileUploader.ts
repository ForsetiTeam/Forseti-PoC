const multer  = require('multer');
const GridFsStorage = require('multer-gridfs-storage');

import config from '../../config';

export default function getFileUploader() {
  const storage = GridFsStorage({
    url: config.get('db.uri'),
    file: (req, file) => ({ metadata: { fileName: file.originalname } })
  });

  return multer({ storage });
}
