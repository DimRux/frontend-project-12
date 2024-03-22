import { useContext } from "react";
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import { AuthorizationContext } from "../../context/AuthorizationContext";
import { removeChannel } from "../../slices/channelsSlice";
import { toastify } from "../../Toastify";

export const RemoveChannelModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const channelId = useSelector((state) => state.channels.activeChannelId);
  const { getToken } = useContext(AuthorizationContext);
  const token = getToken();

  const handleRemove = async () => {
    try {
      const response = await axios.delete(`/api/v1/channels/${channelId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(removeChannel(response.data));
      handleClose();
      toastify('Канал удален', 'success');
    } catch {
      toastify('Ошибка сети', 'error');
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          Удалить канал
        </Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
          >
            Отменить
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
          >
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}