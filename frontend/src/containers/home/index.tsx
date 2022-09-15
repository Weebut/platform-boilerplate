import Layout from '@components/layouts/layout.component';
import FullWidthStrip, {
  FullWidthStripBackgroundColorEnums,
} from '@components/strips/full-width-strip.component';
import Strip from '@components/strips/strip.component';
import { Box, Button, Stack, Typography } from '@mui/material';
import Link from 'next/link';

export default function HomeContainer() {
  return (
    <Layout>
      <FullWidthStrip bgColor={FullWidthStripBackgroundColorEnums.PRIMARY}>
        <Box flex="col" py={32} justifyContent="center" alignItems="center">
          <Stack
            display="flex"
            textAlign="center"
            fontWeight="bold"
            color="white"
            spacing={3}
          >
            <Typography variant="h3">Title</Typography>
            <Typography variant="h6">Sub Title</Typography>
          </Stack>
        </Box>
      </FullWidthStrip>
      <Strip>
        <Box display="flex" alignItems="center" justifyContent="center" py={12}>
          <Link href={{ pathname: '/movies' }} passHref>
            <Button
              size="large"
              variant="contained"
              sx={{
                fontWeight: 'bold',
              }}
            >
              Go to /movies
            </Button>
          </Link>
        </Box>
      </Strip>
      <Strip>
        <Box display="flex" alignItems="center" justifyContent="center" py={12}>
          <Link href={{ pathname: '/file-upload' }} passHref>
            <Button
              size="large"
              variant="contained"
              sx={{
                fontWeight: 'bold',
              }}
            >
              Go to /file-upload
            </Button>
          </Link>
        </Box>
      </Strip>
      <FullWidthStrip bgColor={FullWidthStripBackgroundColorEnums.BLACK}>
        <Link href={{ pathname: '/movies' }} passHref>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            py={32}
            color="white"
            sx={{
              cursor: 'pointer',
            }}
          >
            <Typography fontWeight="bold">
              Sign up and get your favorite movies!
            </Typography>
          </Box>
        </Link>
      </FullWidthStrip>
    </Layout>
  );
}
