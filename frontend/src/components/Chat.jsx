import { useEffect, useContext } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { initChannels } from '../slices/channelsSlice';
import AuthorizationContext from '../context/AuthorizationContext';
import Nav from './Nav';
import MessagesBox from './chatComponents/MessagesBox';
import ChannelsBox from './chatComponents/ChannelsBox';

const Chat = () => {
  const dispatch = useDispatch();
  const { getToken } = useContext(AuthorizationContext);
  const token = getToken();

  useEffect(() => {
    const requestData = async () => {
      const data = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newChannels = { channels: data.data, activeChannelId: data.data[0].id };
      dispatch(initChannels(newChannels));
    };
    if (token) {
      requestData();
    }
  }, [token, dispatch]);

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="d-flex flex-column h-100">
          <Nav button="yes" />
          <div className="container h-100 my-4 overflow-hidden rounded shadow">
            <div className="row h-100 bg-white flex-md-row">
              <ChannelsBox />
              <MessagesBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
