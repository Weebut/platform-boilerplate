import { withSessionRoute } from '@libs/iron-session/iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

export default withSessionRoute(signOutRoute);

async function signOutRoute(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }

  req.session.destroy();
  res.status(201).end();
}
