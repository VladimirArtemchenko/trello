import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddUserName } from './action-types';

const userNameSlice = createSlice({
  name: 'userName',
  initialState: { userName: '' },
  reducers: {
    addUserName(state, action: PayloadAction<AddUserName>) {
      state.userName = action.payload.userName;
    },
  },
});

export const { addUserName } = userNameSlice.actions;

export default userNameSlice.reducer;
