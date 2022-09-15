import { NextApiRequest } from 'next';

interface File {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}

export interface NextApiRequestWithFile extends NextApiRequest {
  file: File;
}
