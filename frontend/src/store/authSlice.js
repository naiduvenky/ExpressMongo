// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: null },
  reducers: {
    setUserToken: (state, action) => {
      state.token = action.payload;
    },
    logoutUser: (state) => {
      state.token = null;
    },
  },
});

export const { setUserToken, logoutUser } = authSlice.actions;
export default authSlice.reducer;
