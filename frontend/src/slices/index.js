import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';
import channelsApi from './channelsApi.js';

export default configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelsApi.middleware),
});
