import { createSlice } from '@reduxjs/toolkit';
import channelsApi from './channelsApi';

const initialState = {
  activeChannelId: '1',
};

const uiStateSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeChannelId: (state, { payload }) => {
      if (payload?.delChannelId) {
        return { ...state, activeChannelId: '1' };
      }
      const { activeChannelId } = payload;
      return { ...state, activeChannelId };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      channelsApi.endpoints.addChannel.matchFulfilled,
      (state, action) => {
        const { payload } = action;
        const { id } = payload;
        return { ...state, activeChannelId: id };
      },
    );
  },
});

export const { changeChannelId } = uiStateSlice.actions;

export default uiStateSlice.reducer;
