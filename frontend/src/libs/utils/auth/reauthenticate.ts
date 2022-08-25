import { firebaseAuth } from '@libs/firebase/client';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

export async function reauthenticate(email: string, password: string) {
  const user = firebaseAuth.currentUser;
  if (!user) {
    throw new Error('Unauthorized');
  }

  const credential = EmailAuthProvider.credential(email, password);

  try {
    await reauthenticateWithCredential(user, credential);
  } catch (error) {
    // TODO
  }
}
