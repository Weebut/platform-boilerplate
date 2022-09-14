import { multerUploadAtLocal } from '@libs/multer/local';
import { NextApiRequestWithFile } from '@libs/multer/type';
import { NextApiResponse } from 'next';
import nc from 'next-connect';

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadFile = multerUploadAtLocal.single('file');

const handler = nc();
handler.use(uploadFile);
// Handle POST request
handler.post<NextApiRequestWithFile, NextApiResponse>(async (req, res) => {
  res.status(201).end();
});

export default handler;
