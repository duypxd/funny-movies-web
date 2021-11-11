import { createAsyncThunk } from '@reduxjs/toolkit';

import * as videoApis from '../../api/video';

const putVoteVideo: any = createAsyncThunk(
  'video/putVoteVideo',
  async (data: videoApis.IVote, { rejectWithValue }) => {
    try {
      const response = await videoApis.putVoteVideo(data);
      return response?.data;
    } catch (err: any) {
      if (!err) {
        throw err;
      }
      return rejectWithValue(err);
    }
  },
);

export default putVoteVideo;
