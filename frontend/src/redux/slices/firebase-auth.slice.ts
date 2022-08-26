import { FirebaseUser } from '@custom-types/firebase-user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FirebaseAuthState {
  user: FirebaseUser | null;
  isPending: boolean;
}

const initialState: FirebaseAuthState = {
  user: null,
  isPending: true,
};

const firebaseAuthSlice = createSlice({
  name: 'firebaseAuth',
  initialState,
  reducers: {
    makePending(state) {
      state.user = null;
      state.isPending = true;
    },
    saveUser(state, action: PayloadAction<FirebaseUser>) {
      state.user = action.payload ?? null;
      state.isPending = false;
    },
    flushUser(state) {
      state.user = null;
      state.isPending = false;
    },
  },
});

export const { makePending, saveUser, flushUser } = firebaseAuthSlice.actions;

export const firebaseAuthReducer = firebaseAuthSlice.reducer;

export default firebaseAuthSlice;
