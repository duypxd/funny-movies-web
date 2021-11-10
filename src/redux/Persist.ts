import storage from 'redux-persist/lib/storage';

const persist: any = {
  key: 'root',
  storage,
  timeout: null,
  version: 1,
  whitelist: ['auth'],
  blacklist: ['nav'],
};

export default persist;
