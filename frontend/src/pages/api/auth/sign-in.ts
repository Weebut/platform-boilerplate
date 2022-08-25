import { firebaseAuth } from '@libs/firebase/server';
import { withSessionRoute } from '@libs/iron-session/iron-session';
import { NextApiRequest, NextApiResponse } from 'next';

export default withSessionRoute(
  async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
    if (req.method !== 'POST') {
      res.status(405).end();
      return;
    }

    const { idToken } = req.body;
    if (!idToken) {
      res.status(401);
      throw new Error('no valid idToken');
    }

    await firebaseAuth.verifyIdToken(idToken);
    req.session.idToken = idToken;
    await req.session.save();
    res.status(201).end();
  },
);
