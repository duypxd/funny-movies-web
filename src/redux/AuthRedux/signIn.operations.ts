import { createAsyncThunk } from '@reduxjs/toolkit';
import { TInitialValue } from '../../components/LoginForm';

import * as AuthApis from '../../api/auth';
import http from '../../api/http';

const signIn: any = createAsyncThunk(
  'auth/signIn',
  async (data: TInitialValue, { rejectWithValue }) => {
    try {
      const response = await AuthApis.signIn(data);
      http.setAuthorizationHeader(response.data.token);
      return response?.data;
    } catch (err: any) {
      if (!err.data) {
        throw err;
      }
      return rejectWithValue(err.data);
    }
  },
);

export default signIn;
