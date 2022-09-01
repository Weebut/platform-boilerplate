import { FirebaseUser } from '@custom-types/firebase-user';
import { useAppSelector } from '@redux/hooks';
import {
  selectFirebaseUser,
  selectIsFirebaseUserPending,
} from '@redux/selectors/firebase-auth.selector';

interface useFirebaseUserResponse {
  user?: FirebaseUser;
  isLoading: boolean;
  error: any;
}

export function useFirebaseUser(): useFirebaseUserResponse {
  const user = useAppSelector(selectFirebaseUser);
  const isPending = useAppSelector(selectIsFirebaseUserPending);

  return {
    user: user ?? undefined,
    isLoading: isPending,
    error: !isPending && !user,
  };
}
