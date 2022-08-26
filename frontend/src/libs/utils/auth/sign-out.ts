import { firebaseAuth } from '@libs/firebase/client';
import axios from 'axios';
import { signOut as signOutFromFirebase } from 'firebase/auth';

export async function signOut() {
  await signOutFromFirebase(firebaseAuth);

  await axios.post('/api/auth/sign-out', {
    headers: { 'content-type': 'application/json' },
  });
}
