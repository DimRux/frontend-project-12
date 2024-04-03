import { Formik } from 'formik';
import { useContext } from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useTranslation } from 'react-i18next';
import filter from 'leo-profanity';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Modal } from 'react-bootstrap';
import AuthorizationContext from '../../context/AuthorizationContext';
import toastify from '../../toastify';
import { changeChannelId } from '../../slices/channelsSlice';

const AddChannelModal = ({ show, handleClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const { getToken } = useContext(AuthorizationContext);
  const token = getToken();

  const signupSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(t('errors.addChannelModal.name.req'))
      .min(3, t('errors.addChannelModal.name.minMax'))
      .max(20, t('errors.addChannelModal.name.minMax'))
      .notOneOf(channels.map(({ name }) => name), t('errors.addChannelModal.name.uniq')),
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{t('addChannelModal.title')}</Modal.Title>
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
              const name = filter.clean(values.name);
              const response = await axios.post('/api/v1/channels', { name }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const { id } = response.data;
              dispatch(changeChannelId({ activeChannelId: id }));
              handleClose();
              toastify(t('addChannelModal.postFeedback'), 'success');
            } catch {
              toastify(t('errors.network'), 'error');
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
                  id="name"
                />
                <Form.Label className="visually-hidden">{t('addChannelModal.name')}</Form.Label>
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
                  {t('addChannelModal.buttonClose')}
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                >
                  {t('addChannelModal.buttonAdd')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannelModal;
