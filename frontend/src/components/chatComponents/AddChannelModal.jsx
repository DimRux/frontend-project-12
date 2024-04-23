import { Formik } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import filterText from 'leo-profanity';
import { Form, Button, Modal } from 'react-bootstrap';
import Spinner from './Spinner';
import toastify from '../../toastify';
import { useGetChannelsQuery, useAddChannelMutation } from '../../slices/channelsApi';

const AddChannelModal = ({ show, handleClose }) => {
  const { data: channels, isLoading } = useGetChannelsQuery();

  const [addChannel] = useAddChannelMutation();
  const { t } = useTranslation();
  const [isDisabled, setDisabled] = useState(false);
  if (isLoading) {
    return <Spinner />;
  }

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
              setDisabled(true);
              const name = { name: filterText.clean(values.name) };
              await addChannel({ name });
              handleClose();
              toastify(t('addChannelModal.postFeedback'), 'success');
            } catch {
              toastify(t('errors.network'), 'error');
            }
            setDisabled(false);
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
                  autoFocus
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={errors.name}
                  id="name"
                />
                <Form.Label className="visually-hidden" htmlFor="name">{t('addChannelModal.name')}</Form.Label>
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
                  disabled={isDisabled}
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
