import { Link, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';

export default function NotFoundContainer() {
  return (
    <Stack
      spacing={8}
      flex="col"
      height="100vh"
      width="100vw"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h1" fontWeight="bold">
        404
      </Typography>
      <Stack spacing={2} flex="col" textAlign="center">
        <Typography variant="h5">{`페이지를 찾을 수 없어요 :(`}</Typography>
        <NextLink href="/" passHref>
          <Link
            sx={{
              textDecoration: 'none',
              '&:hover': { textDecoration: 'underline' },
            }}
          >
            홈으로 돌아갑니다
          </Link>
        </NextLink>
      </Stack>
    </Stack>
  );
}
