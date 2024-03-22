import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PlusSquare } from 'react-bootstrap-icons';
import { useSelector, useDispatch } from 'react-redux';
import { initChannels } from "../slices/channelsSlice";
import { Button } from 'react-bootstrap';
import { AuthorizationContext } from "../context/AuthorizationContext";
import { AddChannelModal } from "./ChatComponents/AddChannelModal";
import { EditChannelModal } from "./ChatComponents/EditChannelModal";
import { RemoveChannelModal } from "./ChatComponents/RemoveChannelModal";
import { ChanelServer } from "./ChatComponents/ChanelServer";
import { ChanelUser } from "./ChatComponents/ChannelUser";
import { Messages } from "./ChatComponents/Messages";
import { FormMessage } from "./ChatComponents/FormMessage";
import { Spinner } from "./ChatComponents/Spinner";

export const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getToken } = useContext(AuthorizationContext);
  const token = getToken();
  const [modalVariant, setModalVariant] = useState('addChannel');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addNewChannel = () => {
    setModalVariant('addChannel');
    handleShow();
  }



  useEffect(() => {
    const isAuthenticated = getToken();
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [getToken, navigate]);

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

  const allChannels = useSelector((state) => state.channels);
  const allMessages = useSelector((state) => state.messages);
  const [activeChannel] = allChannels.channels.filter(({ id }) => id === allChannels.activeChannelId);
  if (!activeChannel) {
    return <Spinner />
  }
  const messagesCount = allMessages.messages.filter(({ channelId }) => channelId === activeChannel.id).length;
  const channelActive = activeChannel.name;
  const headChatMessage = `# ${channelActive}`;

  const renderModal = () => {
    if (modalVariant === 'addChannel') {
      return <AddChannelModal show={show} handleClose={handleClose} />;
    }
    if (modalVariant === 'editChannel') {
      return <EditChannelModal show={show} handleClose={handleClose} />;
    }
    if (modalVariant === 'removeChannel') {
      return <RemoveChannelModal show={show} handleClose={handleClose} />;
    }
  };

  const logOut = () => {
    localStorage.removeItem('user');
    navigate("/login")
  }

  return (
    <div className='h-100'>
      <div className='h-100' id="chat">
        <div className='d-flex flex-column h-100'>
          <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
            <div className='container'>
              <a className='navbar-brand' href='/'>Hexlet Chat</a>
              <Button type="button" onClick={logOut}>Выйти</Button>
            </div>
          </nav>
          <div className='container h-100 my-4 overflow-hidden rounded shadow'>
            <div className='row h-100 bg-white flex-md-row'>
              <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
                <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
                  <b>Каналы</b>
                  <Button
                    type="button"
                    variant="group-vertical"
                    className="p-0 text-primary"
                    onClick={addNewChannel}
                  >
                    <PlusSquare size={20} />
                    <span className="visually-hidden">+</span>
                  </Button>
                </div>
                <ul className='nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block' id='channels-box'>
                  {allChannels.channels.map(({ name, removable, id }) => removable ? <ChanelUser name={name} id={id} key={id} handleShow={handleShow} setModalVariant={setModalVariant} />
                    :
                    <ChanelServer name={name} id={id} key={id} setModalVariant={setModalVariant} />)}
                </ul>
              </div>
              <div className='col p-0 h-100'>
                <div className='d-flex flex-column h-100'>
                  <div className='bg-light mb-4 p-3 shadow-sm small'>
                    <p className='m-0'>
                      <b>{headChatMessage}</b>
                    </p>
                    <span className='text-muted'>{messagesCount} сообщения</span>
                  </div>
                  <div id='message-box' className='chat-messages overflow-auto px-5'>
                    <Messages />
                  </div>
                  <div className='mt-auto px-5 py-3'>
                    <FormMessage />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {renderModal()}
      <ToastContainer />
    </div>
  )
}