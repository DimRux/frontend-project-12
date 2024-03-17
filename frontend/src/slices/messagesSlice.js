import { createSlice } from '@reduxjs/toolkit';

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
});

export const { initMessages, addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;