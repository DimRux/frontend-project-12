import { configureStore } from '@reduxjs/toolkit';
import uiStateReducer from './channelsSlice.js';
import channelsApi from './channelsApi.js';
import messageApi from './messageApi.js';

export default configureStore({
  reducer: {
    channels: uiStateReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messageApi.middleware),
});
