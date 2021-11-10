import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import reducers from './Reducers';
import persist from './Persist';

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      ignoredActionPaths: [],
    },
  }),
];

const persistWrapperReducer = persistReducer(persist, reducers);

export const store = configureStore({
  reducer: persistWrapperReducer,
  middleware,
});
