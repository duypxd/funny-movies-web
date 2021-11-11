import { createSlice } from '@reduxjs/toolkit';
import signIn from './signIn.operations';
import signUp from './SignUp.operations';
import getMe from './getMe.operations';

const initialState: any = {
  accessToken: null,
  user: null,
  isSignIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state: any, { payload }) => {
      state.user = payload.user;
    },
    signOut: (state: any) => {
      state.user = null;
      state.accessToken = null;
      localStorage.clear();
    }
  },
  extraReducers: {
    [signIn?.pending]: (state) => {
      state.isSignIn = true;
    },
    [signIn?.fulfilled]: (state, { payload }) => {
      localStorage.setItem('token', payload.user.token);
      state.user = payload?.user;
      state.isSignIn = false;
    },
    [signIn?.rejected]: (state) => {
      state.isSignIn = false;
    },
    [signUp?.pending]: (state) => {
      state.isSignIn = true;
    },
    [signUp?.fulfilled]: (state, { payload }) => {
      localStorage.setItem('token', payload.user.token);
      state.user = payload?.user;
      state.isSignIn = false;
    },
    [signUp?.rejected]: (state) => {
      state.isSignIn = false;
    },
    [getMe?.fulfilled]: (state, { payload }) => {
      state.user = payload?.user;
    },
  },
});

export const { reducer, actions } = authSlice;
export default reducer;
