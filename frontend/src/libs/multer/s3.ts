import { S3Client } from '@aws-sdk/client-s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import path from 'path';

const s3 = new S3Client({ region: 'ap-northeast-2' });

const storage = multerS3({
  s3: s3,
  bucket: process.env.AWS_S3_BUCKET ?? '',
  acl: 'public-read',
  metadata: function (req, file, cb) {
    cb(null, { fieldName: file.fieldname });
  },
  key: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

export const multerUploadAtS3 = multer({ storage });
