import { MoviesContainer } from '@containers/movies';
import { Box } from '@mui/material';
import Head from 'next/head';

export default function MoviesScrollPage() {
  return (
    <Box>
      <Head>
        <title>Movies</title>
      </Head>
      <MoviesContainer />
    </Box>
  );
}
