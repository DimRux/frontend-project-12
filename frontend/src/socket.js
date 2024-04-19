import { io } from 'socket.io-client';
import store from './slices/index.js';
import messageApi from './slices/messageApi.js';
import channelsApi from './slices/channelsApi.js';

const { dispatch } = store;

const initSocket = () => {
  const socket = io();

  socket.on('newMessage', (newMessage) => {
    dispatch(messageApi.util.updateQueryData('getMessages', undefined, (draft) => {
      draft.push(newMessage);
    }));
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      draft.push(payload);
    }));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(channelsApi.util.updateQueryData('deleteChannel', undefined, (draft) => {
      draft.push(payload);
    }));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      draft.map((item) => {
        if (payload.id === item.id) {
          return payload;
        }
        return item;
      });
    }));
  });

  return socket;
};

export default initSocket;
