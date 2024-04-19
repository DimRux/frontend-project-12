import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetChannelsQuery } from '../slices/channelsApi';
import Spinner from './chatComponents/Spinner';
import MessagesBox from './chatComponents/MessagesBox';
import ChannelsBox from './chatComponents/ChannelsBox';
import ModalsBox from './chatComponents/ModalsBox';
import { changeChannelId } from '../slices/channelsSlice';

const Chat = () => {
  const dispatch = useDispatch();
  const [modalVariant, setModalVariant] = useState('addChannel');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { data, isLoading } = useGetChannelsQuery();

  useEffect(() => {
    if (data) {
      dispatch(changeChannelId({ activeChannelId: data[0].id }));
    }
  }, []);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="h-100">
      <div className="h-100" id="chat">
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <ChannelsBox setModalVariant={setModalVariant} handleShow={handleShow} />
            <MessagesBox />
          </div>
        </div>
      </div>
      <ModalsBox modalVariant={modalVariant} show={show} handleClose={handleClose} />
    </div>
  );
};

export default Chat;
