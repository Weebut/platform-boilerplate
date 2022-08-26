import { GetServerSidePropsContext, Redirect } from 'next';

interface GuardResponse {
  props?: any;
  redirect?: Redirect;
}

export function authGuard({ req }: GetServerSidePropsContext): GuardResponse {
  const token = req.session.idToken;

  if (!token) {
    return {
      redirect: { destination: '/sign-in', permanent: false },
    };
  } else {
    return { props: { token } };
  }
}
