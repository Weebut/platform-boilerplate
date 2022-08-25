import { firebaseAuth } from '@libs/firebase/client';
import axios from 'axios';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signOut } from './sign-out';

export async function signIn(email: string, password: string) {
  await signOut();

  const credential = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password,
  );

  const idToken = await credential.user.getIdToken();

  await axios.post(
    '/api/auth/sign-in',
    { idToken },
    { headers: { 'content-type': 'application/json' } },
  );
}
