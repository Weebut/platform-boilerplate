import { firebaseAuth } from '@libs/firebase/client';
import axios from 'axios';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export async function signUp(email: string, password: string) {
  const credential = await createUserWithEmailAndPassword(
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
