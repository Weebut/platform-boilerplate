import { Layout } from '@components/layouts/layout.component';
import { Strip } from '@components/strips/strip.component';
import { signUp } from '@libs/utils/auth/sign-up';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function SignUpContainer() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [retyped, setRetyped] = useState<string>('');

  async function handleSignUp() {
    setIsLoading(true);

    try {
      await signUp(email, password);
      alert('회원가입이 완료되었습니다.');
      router.push('/');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        alert('아이디가 이미 사용 중입니다.');
        return;
      } else {
        console.error(err);
        alert(`실패했습니다.\n에러 코드 : ${err.code}`);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <Strip>
        <Stack spacing={4} className="flex w-full flex-col">
          <Box className="flex justify-center py-12">
            <Typography className="text-3xl font-bold">회원가입</Typography>
          </Box>
          <form
            className="flex flex-col space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              handleSignUp();
            }}
          >
            <TextField
              label="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              disabled={isLoading}
            />
            <TextField
              label="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              required
              disabled={isLoading}
            />
            <TextField
              label="비밀번호 재입력"
              value={retyped}
              onChange={(e) => setRetyped(e.target.value)}
              type="password"
              required
              disabled={isLoading}
            />
            <Button
              disabled={
                isLoading || !(email && password) || password !== retyped
              }
              fullWidth
              variant="contained"
              type="submit"
            >
              회원가입
            </Button>
          </form>
          <Box className="flex w-full justify-end">
            <Link href="/sign-in">
              <a className="text-grey text-sm hover:underline">
                계정이 있으신가요?
              </a>
            </Link>
          </Box>
        </Stack>
      </Strip>
    </Layout>
  );
}
