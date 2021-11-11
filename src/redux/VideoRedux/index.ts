import { createSlice } from '@reduxjs/toolkit';
import Video from './videos.operations';
import PostVideo from './post.video.operations';
import PutVoteVideo from './vote.operations';
import { TItemVideo } from '../../api/video';

const initialState: any = {
  loading: false,
  isShareMovie: false,
  data: []
};

const authSlice = createSlice({
  name: 'video',
  initialState,
  reducers: {},
  extraReducers: {
    [Video?.pending]: (state) => {
      state.loading = true;
    },
    [Video?.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.data = payload.data;
    },
    [Video?.rejected]: (state) => {
      state.loading = false;
    },

    [PostVideo?.pending]: (state) => {
      state.isShareMovie = true;
    },
    [PostVideo?.fulfilled]: (state, { payload }) => {
      state.isShareMovie = false;
      state.data = [payload.result, ...state.data];
    },
    [PostVideo?.rejected]: (state) => {
      state.isShareMovie = false;
    },

    [PutVoteVideo?.fulfilled]: (state, { payload }) => {
      state.data = state.data.map((m: TItemVideo) => {
        if (m._id === payload.result._id) {
          return { ...m, ...payload.result }
        }
        return m;
      })
    },
  },
});

export const { reducer, actions } = authSlice;
export default reducer;
