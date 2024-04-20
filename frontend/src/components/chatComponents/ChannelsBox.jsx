import { useTranslation } from 'react-i18next';
import { PlusSquare } from 'react-bootstrap-icons';
import { Button } from 'react-bootstrap';
import { useGetChannelsQuery } from '../../slices/channelsApi';
import Spinner from './Spinner';
import Channels from './Channels';

const ChannelsBox = ({ setModalVariant, handleShow }) => {
  const { data, isLoading } = useGetChannelsQuery();

  const { t } = useTranslation();

  if (isLoading) {
    return <Spinner />;
  }

  const addNewChannel = () => {
    setModalVariant('addChannel');
    handleShow();
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
        {data.map(({ name, removable, id }) => (
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
