import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeChannelId: '1',
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    changeChannelId: (state, { payload }) => {
      const { activeChannelId } = payload;
      return { ...state, activeChannelId };
    },
  },
});

export const { changeChannelId } = channelsSlice.actions;

export default channelsSlice.reducer;
