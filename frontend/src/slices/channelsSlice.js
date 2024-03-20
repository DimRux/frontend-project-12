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
    changeChannelId: (state, { payload }) => {
      const { activeChannelId } = payload;
      state.activeChannelId = activeChannelId;
    },
    addChannel: (state, { payload }) => {
      const { channel, activeChannelId } = payload;
      state.channels.push(channel);
      state.activeChannelId = activeChannelId;
    },
    editChannel: (state, { payload }) => {
      const { name, id } = payload;
      const channel = state.channels.find(
        (channelItem) => channelItem.id === id,
      );
      channel.name = name;
    },
    removeChannel: (state, { payload }) => {
      const { id } = payload;
      const channels = state.channels.filter(
        (channelItem) => channelItem.id !== id,
      );
      state.channels = channels;
      state.activeChannelId = channels[0].id;
    },
  },
});

export const { initChannels, changeChannelId, addChannel, editChannel, removeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;