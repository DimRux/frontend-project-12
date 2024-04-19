import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Button, Modal } from 'react-bootstrap';
import toastify from '../../toastify';
import { useDeleteChannelMutation } from '../../slices/channelsApi';

const RemoveChannelModal = ({ show, handleClose }) => {
  const [deleteChannel] = useDeleteChannelMutation();
  const { t } = useTranslation();
  const channelId = useSelector((state) => state.channels.activeChannelId);
  const [isDisabled, setDisabled] = useState(false);

  const handleRemove = async () => {
    try {
      setDisabled(true);
      await deleteChannel({ id: channelId });
      handleClose();
      toastify(t('removeChannelModal.postFeedback'), 'success');
    } catch {
      toastify(t('errors.network'), 'error');
    }
    setDisabled(false);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>
          {t('removeChannelModal.title')}
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
        <p className="lead">{t('removeChannelModal.p')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            variant="secondary"
            type="button"
            onClick={handleClose}
          >
            {t('removeChannelModal.buttonClose')}
          </Button>
          <Button
            variant="danger"
            type="button"
            onClick={handleRemove}
            disabled={isDisabled}
          >
            {t('removeChannelModal.buttonAdd')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannelModal;
