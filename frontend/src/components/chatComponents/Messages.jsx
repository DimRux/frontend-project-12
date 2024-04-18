import { useEffect, useContext } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import AuthorizationContext from '../../context/AuthorizationContext';
import { initMessages } from '../../slices/messagesSlice';
import routes from '../../routes';

const Messages = () => {
  const dispatch = useDispatch();
  const { getToken } = useContext(AuthorizationContext);
  const token = getToken();
  const activeChannel = useSelector((state) => state.channels.activeChannelId);
  const allMessages = useSelector((state) => state.messages);
  const messages = allMessages.messages.filter(({ channelId }) => channelId === activeChannel);

  useEffect(() => {
    const requestData = async () => {
      const data = await axios.get(routes.messagesApiPath, {
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

  return (
    messages.map(({ body, username, id }) => (
      <div key={id} className="text-breack mb-2">
        <b>{username}</b>
        {': '}
        {body}
      </div>
    ))
  );
};

export default Messages;
