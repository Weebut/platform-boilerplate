import { Layout } from '@components/layouts/layout.component';
import { Strip } from '@components/strips/strip.component';
import { signIn } from '@libs/utils/auth/sign-in';
import { signInWithGithub } from '@libs/utils/auth/sign-in-with-github';
import { signInWithGoogle } from '@libs/utils/auth/sign-in-with-google';
import { Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '@redux/hooks';
import { makePending } from '@redux/slices/firebase-auth.slice';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export function SignInContainer() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  async function handleSignIn() {
    dispatch(makePending());
    setIsLoading(true);
    try {
      await signIn(email, password);
      router.push('/');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        alert('존재하지 않는 이메일입니다.');
      } else if (err.code === 'auth/wrong-password') {
        alert('비밀번호가 틀렸습니다.');
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
            <Typography className="text-3xl font-bold">로그인</Typography>
          </Box>
          <form
            className="flex flex-col space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              handleSignIn();
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
            <Button
              disabled={isLoading || !(email && password)}
              fullWidth
              variant="contained"
              type="submit"
            >
              로그인
            </Button>
          </form>
          <Button onClick={signInWithGoogle}>Sign in with Google</Button>
          <Button onClick={signInWithGithub}>Sign in with Github</Button>
          <Box className="flex w-full items-center">
            <NextLink href="/reset-password" passHref>
              <Link className="text-grey text-sm hover:underline">
                비밀번호가 기억나지 않나요?
              </Link>
            </NextLink>
            <Box className="flex-auto" />
            <NextLink href="/sign-up" passHref>
              <Link className="text-grey text-sm hover:underline">
                계정이 없으신가요?
              </Link>
            </NextLink>
          </Box>
        </Stack>
      </Strip>
    </Layout>
  );
}
