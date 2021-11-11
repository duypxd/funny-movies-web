import { createAsyncThunk } from '@reduxjs/toolkit';
import { TItemVideo } from '../../views/Videos';

import * as videoApis from '../../api/video';

const postVideo: any = createAsyncThunk(
  'video/postVideo',
  async (data: TItemVideo, { rejectWithValue }) => {
    try {
      const response = await videoApis.postVideo(data);
      return response?.data;
    } catch (err: any) {
      if (!err) {
        throw err;
      }
      return rejectWithValue(err);
    }
  },
);

export default postVideo;
