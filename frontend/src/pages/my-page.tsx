import { MyPageContainer } from '@containers/my-page';
import { ClientSideAuthGuard } from '@libs/guards/client/auth.guard';
import { authGuard } from '@libs/guards/server/auth.guard';
import { withSessionSsr } from '@libs/iron-session/iron-session';
import { Box } from '@mui/material';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';

export default function MyPage() {
  return (
    <ClientSideAuthGuard>
      <Box>
        <Head>
          <title>마이 페이지</title>
        </Head>
        <MyPageContainer />
      </Box>
    </ClientSideAuthGuard>
  );
}

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps(context: GetServerSidePropsContext) {
    const { props, redirect } = authGuard(context);

    if (redirect) {
      return {
        redirect,
      };
    }

    return { props };
  },
);
