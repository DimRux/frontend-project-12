import { useEffect, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { initChannels } from '../../slices/channelsSlice';
import AuthorizationContext from '../../context/AuthorizationContext';
import Spinner from './Spinner';
import Channels from './Channels';
import routes from '../../routes';

const ChannelsBox = ({ setModalVariant, handleShow }) => {
  const dispatch = useDispatch();
  const { getToken } = useContext(AuthorizationContext);
  const token = getToken();
  const { t } = useTranslation();

  const addNewChannel = () => {
    setModalVariant('addChannel');
    handleShow();
  };

  useEffect(() => {
    const requestData = async () => {
      const data = await axios.get(routes.channelsApiPath, {
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
  const [activeChannel] = allChannels.channels
    .filter(({ id }) => id === allChannels.activeChannelId);
  if (!activeChannel) {
    return <Spinner />;
  }

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('chat.channels')}</b>
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
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block" id="channels-box">
        {allChannels.channels.map(({ name, removable, id }) => (
          <Channels
            name={name}
            id={id}
            key={id}
            removable={removable}
            handleShow={handleShow}
            setModalVariant={setModalVariant}
          />
        ))}
      </ul>
    </div>
  );
};

export default ChannelsBox;
