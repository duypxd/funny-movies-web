import { createSlice } from '@reduxjs/toolkit';

interface IState {
  title: string;
  isShow: boolean;
  status?: 'success' | 'error' | 'warning' | '';
  message: string;
}

const initialState: IState = {
  isShow: false,
  status: '',
  title: '',
  message: ''
};

const ListenerSlice = createSlice({
  name: 'listener',
  initialState,
  reducers: {
    setMessageGlobal: (state: IState, { payload }) => {
      state.title = payload.title || '';
      state.status = payload.status || '';
      state.isShow = payload.isShow;
      state.message = payload.message || '';
    },
  },
  extraReducers: {},
});

export const { reducer, actions } = ListenerSlice;
export default reducer;
