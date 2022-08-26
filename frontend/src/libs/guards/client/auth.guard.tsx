import { useFirebaseUser } from '@hooks/firebase-user';
import { useAppDispatch } from '@redux/hooks';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';

interface ClientSideAuthGuardProps {
  children: ReactNode;
}

export function ClientSideAuthGuard({ children }: ClientSideAuthGuardProps) {
  const dispatch = useAppDispatch();

  const router = useRouter();
  const currentPath = router.asPath;

  const {
    user: firebaseUser,
    isLoading: isFirebaseLoading,
    error: firebaseError,
  } = useFirebaseUser();

  // Followings only care fully loaded situation
  const isUnauthenticated = !firebaseUser && firebaseError;

  useEffect(() => {
    if (isFirebaseLoading) {
    } else if (isUnauthenticated) {
      if (currentPath !== '/sign-in') {
        router.push('/sign-in');
      }
    } else {
      if (currentPath === '/sign-in') {
        router.push('/');
      }
    }
  }, [isUnauthenticated, router, currentPath, dispatch, isFirebaseLoading]);

  return <>{children}</>;
}
