import AddChannelModal from './AddChannelModal';
import EditChannelModal from './EditChannelModal';
import RemoveChannelModal from './RemoveChannelModal';

const ModalsBox = ({ modalVariant, show, handleClose }) => {
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
  const ModalComponent = modalFactory(modalVariant);

  if (ModalComponent) {
    return <ModalComponent show={show} handleClose={handleClose} />;
  }

  return null;
};

export default ModalsBox;
