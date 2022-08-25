import { production } from '@libs/constants/node';
import { withIronSessionApiRoute, withIronSessionSsr } from 'iron-session/next';
import {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  NextApiHandler,
} from 'next';

const ttl = 2 * 7 * 24 * 60 * 60; // 50 minutes

const sessionOptions = {
  password: {
    1: process.env.SECRET_COOKIE_PASSWORD_1 as string,
    2: process.env.SECRET_COOKIE_PASSWORD_2 as string,
  },
  cookieName: 'iron-session-cookie',
  ttl,
  cookieOptions: {
    secure: process.env.NODE_ENV === production,
  },
};

// Wrapper for api route
export function withSessionRoute(handler: NextApiHandler) {
  return withIronSessionApiRoute(handler, sessionOptions);
}

// Wrapper for SSR
export function withSessionSsr<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
>(
  handler: (
    context: GetServerSidePropsContext,
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>,
) {
  return withIronSessionSsr(handler, sessionOptions);
}

// Specify the typings of req.session.*
declare module 'iron-session' {
  interface IronSessionData {
    idToken?: string;
  }
}
