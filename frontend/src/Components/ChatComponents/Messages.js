import { useEffect, useContext } from "react";
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { AuthorizationContext } from "../../context/AuthorizationContext";
import { addMessage, initMessages } from "../../slices/messagesSlice";

export const Messages = () => {
  const dispatch = useDispatch();
  const { getToken, socket } = useContext(AuthorizationContext);
  const token = getToken();
  const activeChannel = useSelector((state) => state.channels.activeChannelId);
  const allMessages = useSelector((state) => state.messages);
  const messages = allMessages.messages.filter(({ channelId }) => channelId === activeChannel);

  useEffect(() => {
    const requestData = async () => {
      const data = await axios.get('/api/v1/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(initMessages(data.data));
    };
    if (token) {
      requestData();
    }
  }, []);

  const handleNewMessage = (message) => {
    const existingMessage = allMessages.messages.find((m) => m.id === message.id);
    if (!existingMessage) {
      dispatch(addMessage(message));
    }
  };

  useEffect(() => {
    socket.on('newMessage', handleNewMessage);
    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket, allMessages]);

  return (
    messages.map(({ body, username, id }) => (
      <div key={id} className='text-breack mb-2'>
        <b>{username}</b>
        {': '}
        {body}
      </div>
    ))
  );
}