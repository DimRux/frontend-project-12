import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import channelsApi from './channelsApi.js';
import messageApi from './messageApi.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messageApi.reducerPath]: messageApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(channelsApi.middleware, messageApi.middleware),
});
