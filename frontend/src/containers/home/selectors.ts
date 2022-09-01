import { RootState } from '@redux/store';

export const selectHomeValue = (state: RootState) => state.home.value;
