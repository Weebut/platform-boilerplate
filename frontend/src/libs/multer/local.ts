import multer from 'multer';
import path from 'path';

const storageLocal = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname),
    );
  },
});

export const multerUploadAtLocal = multer({
  storage: storageLocal,
});
