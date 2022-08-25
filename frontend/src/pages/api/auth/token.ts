import { production } from '@libs/constants/node';
import { withSessionRoute } from '@libs/iron-session/iron-session';
import type { NextApiRequest, NextApiResponse } from 'next';

export default withSessionRoute(
  async (req: NextApiRequest, res: NextApiResponse<any>) => {
    if (process.env.NODE_ENV !== production) {
      const token = req.session.idToken;

      if (!token) {
        res.status(401).end();
      }

      res.status(200).send(token);
    } else {
      res.status(404).end();
    }
  },
);
