import { combineReducers } from '@reduxjs/toolkit';
import { reducer as appReducer } from './AuthRedux';
import { reducer as listenerReducer } from './ListenerRedux';

const reducers = combineReducers({
  auth: appReducer,
  listener: listenerReducer,
});

export default reducers;
