import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  activeChannelId: 1,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    initChannels: (state, { payload }) => {
      const { channels, activeChannelId } = payload;
      return { ...state, channels, activeChannelId };
    },
    changeChannelId: (state, { payload }) => {
      const { activeChannelId } = payload;
      return { ...state, activeChannelId };
    },
    addChannel: (state, { payload }) => (
      { ...state, channels: [...state.channels, payload] }),
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
      return { ...state, channels, activeChannelId: channels[0].id };
    },
  },
});

export const {
  initChannels,
  changeChannelId,
  addChannel,
  editChannel,
  removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
