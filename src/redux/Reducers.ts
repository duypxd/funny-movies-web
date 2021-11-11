import { combineReducers } from '@reduxjs/toolkit';
import { reducer as appReducer } from './AuthRedux';
import { reducer as listenerReducer } from './ListenerRedux';
import { reducer as videoReducer } from './VideoRedux';

const reducers = combineReducers({
  auth: appReducer,
  listener: listenerReducer,
  video: videoReducer,
});

export default reducers;
