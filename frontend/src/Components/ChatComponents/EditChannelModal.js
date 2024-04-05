import { Formik } from 'formik';
import { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import filter from 'leo-profanity';
import { useSelector } from 'react-redux';
import { Form, Button, Modal } from 'react-bootstrap';
import AuthorizationContext from '../../context/AuthorizationContext';
import toastify from '../../toastify';

const EditChannelModal = ({ show, handleClose }) => {
  const { t } = useTranslation();
  const channelId = useSelector((state) => state.channels.activeChannelId);
  const channels = useSelector((state) => state.channels.channels);
  const { getToken } = useContext(AuthorizationContext);
  const [isDisabled, setDisabled] = useState(false);
  const token = getToken();

  const signupSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(t('errors.editChannelModal.name.req'))
      .min(3, t('errors.editChannelModal.name.minMax'))
      .max(20, t('errors.editChannelModal.name.minMax'))
      .notOneOf(channels.map(({ name }) => name), t('errors.editChannelModal.name.uniq')),
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{t('editChannelModal.title')}</Modal.Title>
        <Button
          variant="close"
          type="button"
          onClick={handleClose}
          aria-label="Close"
          data-bs-dismiss="modal"
        />
      </Modal.Header>
      <Modal.Body>
        <Formik
          initialValues={{ name: '' }}
          validationSchema={signupSchema}
          onSubmit={async (values) => {
            try {
              setDisabled(true);
              const name = filter.clean(values.name);
              await axios.patch(`/api/v1/channels/${channelId}`, { name }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              handleClose();
              toastify(t('editChannelModal.postFeedback'), 'success');
              setDisabled(false);
            } catch {
              toastify(t('errors.network'), 'error');
              setDisabled(false);
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            values,
            errors,
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  type="text"
                  name="name"
                  className="mb-2"
                  autoFocus="true"
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={errors.name}
                />
                <Form.Label className="visually-hidden">{t('editChannelModal.name')}</Form.Label>
                {errors.name ? (
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                ) : null}
              </Form.Group>
              <div className="d-flex justify-content-end">
                <Button
                  className="me-2"
                  variant="secondary"
                  type="button"
                  onClick={handleClose}
                >
                  {t('editChannelModal.buttonClose')}
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  disabled={isDisabled}
                >
                  {t('editChannelModal.buttonAdd')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default EditChannelModal;
