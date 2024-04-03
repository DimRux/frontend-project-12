import { io } from 'socket.io-client';
import store from './slices/index.js';
import { addMessage } from './slices/messagesSlice.js';
import { addChannel, removeChannel, editChannel } from './slices/channelsSlice.js';

const { dispatch } = store;

const initSocket = () => {
  const socket = io();

  socket.on('newMessage', (newMessage) => {
    dispatch(addMessage(newMessage));
  });

  socket.on('newChannel', (payload) => {
    dispatch(addChannel(addChannel(payload)));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(removeChannel(payload));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(editChannel(addChannel({ ...payload, activeChannelId: payload.id })));
  });

  return socket;
};

export default initSocket;
