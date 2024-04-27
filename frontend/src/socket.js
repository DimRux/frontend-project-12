import { io } from 'socket.io-client';
import store from './slices/index.js';
import messageApi from './slices/messageApi.js';
import channelsApi from './slices/channelsApi.js';
import { changeChannelId } from './slices/uiStateSlice.js';

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
    dispatch(changeChannelId({ delChannelId: String(payload.id) }));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (draft) => {
      const channel = draft.find((item) => item.id === payload.id);
      channel.name = payload.name;
    }));
  });

  return socket;
};

export default initSocket;
