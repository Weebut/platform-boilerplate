import { HomeContainer } from '@containers/home';
import { Box } from '@mui/material';
import Head from 'next/head';

export default function HomePage() {
  return (
    <Box>
      <Head>
        <title>Title</title>
      </Head>
      <HomeContainer />
    </Box>
  );
}
