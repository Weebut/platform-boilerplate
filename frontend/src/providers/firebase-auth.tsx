import { FirebaseUser } from '@custom-types/firebase-user';
import { firebaseAuth } from '@libs/firebase/client';
import { useAppDispatch } from '@redux/hooks';
import { flushUser, saveUser } from '@redux/slices/firebase-auth.slice';
import { ReactNode, useEffect } from 'react';

interface FirebaseAuthProviderProps {
  children: ReactNode;
}

export function FirebaseAuthProvider({
  children,
}: FirebaseAuthProviderProps): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        const idToken = await user.getIdToken();

        if (!idToken) {
          return;
        }

        await fetch('/api/auth/sign-in', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });

        const payload: FirebaseUser = {
          id: user.uid,
          email: user.email ?? '',
          emailVerified: user.emailVerified,
          isAnonymous: user.isAnonymous,
        };

        dispatch(saveUser(payload));
      } else {
        await fetch('/api/auth/sign-out', { method: 'POST' });

        dispatch(flushUser());
      }
    });
  }, [dispatch]);

  return <>{children}</>;
}
