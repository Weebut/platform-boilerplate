import { homeReducer } from '@containers/home/reducer';
import { production } from '@libs/constants/node';
import { configureStore } from '@reduxjs/toolkit';
import { firebaseAuthReducer } from './slices/firebase-auth.slice';

const store = configureStore({
  reducer: {
    firebaseAuth: firebaseAuthReducer,
    home: homeReducer,
  },
  devTools: process.env.NODE_ENV !== production,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
