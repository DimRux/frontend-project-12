import { createSlice } from '@reduxjs/toolkit';
import { removeChannel } from './channelsSlice';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    initMessages: (state, { payload }) => {
      state.messages = [...payload];
    },
    addMessage: (state, { payload }) => {
      state.messages.push(payload);
    }
  },
  extraReducers: (builder) => {
    builder.addCase(removeChannel, (state, action) => {
      const { id } = action.payload;
      console.log('before', state)
      state.messages = state.messages.filter(
        (message) => message.channelId !== id
      );
      console.log('after', state.messages)
    });
  },
});

export const { initMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;