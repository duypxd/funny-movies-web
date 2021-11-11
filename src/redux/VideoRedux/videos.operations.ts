import { createAsyncThunk } from '@reduxjs/toolkit';

import * as videoApis from '../../api/video';

const getAllVideo: any = createAsyncThunk(
  'video/getAllVideo',
  async (__, { rejectWithValue }) => {
    try {
      const response = await videoApis.getAllVideos();
      return response?.data;
    } catch (err: any) {
      if (!err) {
        throw err;
      }
      return rejectWithValue(err);
    }
  },
);

export default getAllVideo;
