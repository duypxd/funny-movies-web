import { createAsyncThunk } from '@reduxjs/toolkit';
import { TInitialValue } from '../../components/LoginForm';

import http from '../../api/http';
import * as AuthApis from '../../api/auth';

const SignUp: any = createAsyncThunk(
  'auth/SignUp',
  async (data: TInitialValue, { rejectWithValue }) => {
    try {
      const response = await AuthApis.signUp(data);
      http.setAuthorizationHeader(response.data.user.token);
      return response?.data;
    } catch (err: any) {
      if (!err) {
        throw err;
      }
      return rejectWithValue(err);
    }
  },
);

export default SignUp;
