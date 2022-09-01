import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
import { stringify } from 'querystring';

const baseUrl = process.env.NEXT_PUBLIC_MOVIE_API_BASE_URL ?? '';
const url = baseUrl + process.env.NEXT_PUBLIC_MOVIE_API_NOW_PLAYING_URL;
const apiKey = process.env.NEXT_PUBLIC_MOVIE_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const query = req.query;
  const page = query.page ? parseInt(query.page as string) : 1;

  const { status, data } = await axios
    .get(url + `?${stringify({ api_key: apiKey, page })}`)
    .catch(({ reason }) => reason);

  res.status(status).json(data);
}
