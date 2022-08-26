import { Box, Link, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';

export function NotFoundContainer() {
  return (
    <Stack
      spacing={8}
      className="flex h-screen w-screen flex-col items-center justify-center"
    >
      <Typography className="text-6xl font-bold">404</Typography>
      <Stack spacing={2} className="flex flex-col text-center">
        <Typography className="text-xl">{`페이지를 찾을 수 없어요 :(`}</Typography>
        <NextLink href="/" passHref>
          <Link className="text-primary text-opacity-90 hover:text-opacity-100 hover:underline">
            홈으로 돌아갑니다
          </Link>
        </NextLink>
      </Stack>
    </Stack>
  );
}
