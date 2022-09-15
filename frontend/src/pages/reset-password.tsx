import ResetPasswordContainer from '@containers/reset-password';
import { Box } from '@mui/material';
import Head from 'next/head';

export default function ResetPasswordPage() {
  return (
    <Box>
      <Head>
        <title>비밀번호 재설정 | iN!T</title>
      </Head>
      <ResetPasswordContainer />
    </Box>
  );
}
