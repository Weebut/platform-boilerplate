import { SignInContainer } from '@containers/sign-in';
import Head from 'next/head';

export default function SignInPage() {
  return (
    <div>
      <Head>
        <title>Sign In</title>
      </Head>
      <SignInContainer />
    </div>
  );
}
