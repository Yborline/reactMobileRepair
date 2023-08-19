import {
  configureStore,
  getDefaultMiddleware,
  combineReducers,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  PAUSE,
  REHYDRATE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// import logger from "redux-logger";
import authReducer from './auth/auth-reducer';
import storageReducer from './storage/storage-reducer';
import phonesReducer from './telephones/phones-reducer';
import devToolsEnhancer from 'remote-redux-devtools';

// import { number } from "prop-types";

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, REHYDRATE, PERSIST, PURGE, REGISTER],
    },
  }),
  //   logger,
];

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: [`token`],
};

export const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    // auth: persistReducer(authPersistConfig, authReducer),
    storage: storageReducer,
    phones: phonesReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
});

export const persistor = persistStore(store);
