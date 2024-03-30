import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { changeChannelId } from '../../slices/channelsSlice';

const ChanelUser = ({
  name,
  id,
  handleShow,
  setModalVariant,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.channels.activeChannelId);

  const changeChannel = () => dispatch(changeChannelId({ activeChannelId: id }));
  const renameChannel = () => {
    setModalVariant('editChannel');
    handleShow();
  };
  const removeChannel$ = () => {
    setModalVariant('removeChannel');
    handleShow();
  };

  return (
    <li className="nav-item w-100">
      <Dropdown as={ButtonGroup} className="d-flex" onClick={changeChannel}>
        <Button
          type="button"
          className="w-100 rounded-0 text-start text-truncate btn"
          variant={id === channelId ? 'secondary' : null}
        >
          <span className="me-1">#</span>
          {name}
        </Button>

        <Dropdown.Toggle
          split
          className="flex-grow-0"
          variant={id === channelId ? 'secondary' : null}
        >
          <span className="visually-hidden">
            {t('channelUser.delEdit')}
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={removeChannel$}>
            {t('channelUser.del')}
          </Dropdown.Item>
          <Dropdown.Item onClick={renameChannel}>
            {t('channelUser.edit')}
          </Dropdown.Item>
        </Dropdown.Menu>

      </Dropdown>
    </li>
  );
};

export default ChanelUser;
