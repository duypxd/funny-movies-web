import { combineReducers } from '@reduxjs/toolkit';
import { reducer as appReducer } from './AuthRedux';

const reducers = combineReducers({
  auth: appReducer,
});

export default reducers;
