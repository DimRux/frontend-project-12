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
    dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      const index = draft.findIndex((channel) => channel.id === payload.id);
      if (index !== -1) {
        draft.splice(index, 1);
      }
    }));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      draft.forEach((item) => {
        console.log(payload.id === item.id);
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
