import { RootState } from '@redux/store';

export const selectFirebaseUser = (state: RootState) => state.firebaseAuth.user;
export const selectIsFirebaseUserPending = (state: RootState) =>
  state.firebaseAuth.isPending;
