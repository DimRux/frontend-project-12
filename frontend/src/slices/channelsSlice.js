import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannelId: null,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    initChannels: (state, { payload }) => {
      const { channels, activeChannelId } = payload;
      state.channels = channels;
      state.activeChannelId = activeChannelId;
    },
  },
});

export const { initChannels } = channelsSlice.actions;

export default channelsSlice.reducer;