import { handlerSwitcher, HttpHandlers } from '@libs/api/handler-switcher';
import { withSessionRoute } from '@libs/iron-session/iron-session';
import { NextApiHandler } from 'next';

export function ApiAuthGuard(handlers: HttpHandlers): NextApiHandler {
  return withSessionRoute(async (req, res) => {
    if (!req.session.idToken) {
      res.status(401).end();
    } else {
      const handler = handlerSwitcher(req?.method ?? '', handlers);
      await handler(req, res);
    }
  });
}
