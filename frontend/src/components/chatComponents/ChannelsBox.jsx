import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import AddChannelModal from './AddChannelModal';
import EditChannelModal from './EditChannelModal';
import RemoveChannelModal from './RemoveChannelModal';
import Spinner from './Spinner';
import Channels from './Channels';

const ChannelsBox = () => {
  const { t } = useTranslation();
  const [modalVariant, setModalVariant] = useState('addChannel');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const addNewChannel = () => {
    setModalVariant('addChannel');
    handleShow();
  };

  const allChannels = useSelector((state) => state.channels);
  const [activeChannel] = allChannels.channels
    .filter(({ id }) => id === allChannels.activeChannelId);
  if (!activeChannel) {
    return <Spinner />;
  }

  const modalFactory = (modalV) => {
    switch (modalV) {
      case 'addChannel':
        return AddChannelModal;
      case 'editChannel':
        return EditChannelModal;
      case 'removeChannel':
        return RemoveChannelModal;
      default:
        return null;
    }
  };

  const renderModal = () => {
    const ModalComponent = modalFactory(modalVariant);

    if (ModalComponent) {
      return <ModalComponent show={show} handleClose={handleClose} />;
    }

    return null;
  };

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
      {renderModal()}
    </div>
  );
};

export default ChannelsBox;
