import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { changeChannelId } from '../../slices/channelsSlice';

export const ChanelUser = ({ name, id, handleShow, setModalVariant }) => {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.channels.activeChannelId);

  const changeChannel = () => dispatch(changeChannelId({ activeChannelId: id }));
  const renameChannel = () => {
    setModalVariant('editChannel');
    handleShow();
  }
  const removeChannel$ = () => {
    setModalVariant('removeChannel');
    handleShow();
  }

  return (
    <li className='nav-item w-100'>
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
            Удалить/Переименовать
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={removeChannel$}>
            Удалить
          </Dropdown.Item>
          <Dropdown.Item onClick={renameChannel}>
            Изменить
          </Dropdown.Item>
        </Dropdown.Menu>

      </Dropdown>
    </li>
  )
}