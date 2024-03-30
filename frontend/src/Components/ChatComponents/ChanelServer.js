import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { changeChannelId } from '../../slices/channelsSlice';

const ChanelServer = ({ name, id }) => {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.channels.activeChannelId);

  const changeChannel = () => dispatch(changeChannelId({ activeChannelId: id }));

  return (
    <li className="nav-item w-100">
      <Button
        onClick={changeChannel}
        type="button"
        className="w-100 rounded-0 text-start btn"
        variant={id === channelId ? 'secondary' : null}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
    </li>
  );
};

export default ChanelServer;
