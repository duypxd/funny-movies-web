import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: {},
});

export const { reducer, actions } = authSlice;
export default reducer;
