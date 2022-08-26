import { createSlice } from '@reduxjs/toolkit';

interface HomeState {
  value: number;
}

const initialState: HomeState = {
  value: 0,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

export const { increment, decrement } = homeSlice.actions;

export const homeReducer = homeSlice.reducer;

export default homeSlice;
