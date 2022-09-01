import { Layout } from '@components/layouts/layout.component';
import { Strip } from '@components/strips/strip.component';
import { sendPasswordResetEmail } from '@libs/utils/auth/send-password-reset-email';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function ResetPasswordContainer() {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');

  return (
    <Layout>
      <Strip>
        <Stack spacing={4} className="flex w-full flex-col">
          <Box className="flex justify-center py-12">
            <Typography className="text-3xl font-bold">
              비밀번호 재설정
            </Typography>
          </Box>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              try {
                await sendPasswordResetEmail(email);
                alert(`이메일이 전송되었습니다.\n로그인 화면으로 돌아갑니다.`);
                router.push('/sign-in');
              } catch (error: any) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(error);
                alert(
                  `전송에 실패했습니다. 관리자에게 문의해주세요.\n\n에러 코드 : ${errorCode}\n에러 메시지 : ${errorMessage}`,
                );
              }
            }}
            className="flex flex-col space-y-4"
          >
            <TextField
              label="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
            />

            <Button
              disabled={!email}
              fullWidth
              variant="contained"
              type="submit"
            >
              비밀번호 재설정
            </Button>
          </form>
          <Box className="flex w-full justify-end">
            <NextLink href="/sign-in" passHref>
              <Link className="text-grey text-sm hover:underline">
                계정이 있으신가요?
              </Link>
            </NextLink>
          </Box>
        </Stack>
      </Strip>
    </Layout>
  );
}
