import Layout from '@components/layouts/layout.component';
import Strip from '@components/strips/strip.component';
import { signUp } from '@libs/utils/auth/sign-up';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function SignUpContainer() {
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
        <Stack spacing={4} flex="col" width="100%">
          <Box display="flex" justifyContent="center" py={12}>
            <Typography variant="h4" fontWeight="bold">
              회원가입
            </Typography>
          </Box>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              handleSignUp();
            }}
          >
            <Stack direction="column" spacing={4}>
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
            </Stack>
          </form>
          <Box display="flex" width="100%" justifyContent="end">
            <NextLink href="/sign-in" passHref>
              <Link
                sx={{
                  color: 'gray',
                }}
              >
                계정이 있으신가요?
              </Link>
            </NextLink>
          </Box>
        </Stack>
      </Strip>
    </Layout>
  );
}
