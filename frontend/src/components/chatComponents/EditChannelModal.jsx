import { Formik } from 'formik';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import filter from 'leo-profanity';
import { useSelector } from 'react-redux';
import { Form, Button, Modal } from 'react-bootstrap';
import toastify from '../../toastify';
import { useGetChannelsQuery, useEditChannelMutation } from '../../slices/channelsApi';

const EditChannelModal = ({ show, handleClose }) => {
  const [editChannel] = useEditChannelMutation();
  const { data: channels } = useGetChannelsQuery();
  const { t } = useTranslation();
  const channelId = useSelector((state) => state.channels.activeChannelId);
  const currentChannel = channels.filter(({ id }) => id === channelId);
  const [isDisabled, setDisabled] = useState(false);

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
          initialValues={{ name: `${currentChannel[0].name}` }}
          validationSchema={signupSchema}
          onSubmit={async (values) => {
            try {
              setDisabled(true);
              const name = { name: filter.clean(values.name) };
              await editChannel({ name, id: channelId });
              handleClose();
              toastify(t('editChannelModal.postFeedback'), 'success');
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
                  id="name"
                  className="mb-2"
                  autoFocus
                  value={values.name}
                  onChange={handleChange}
                  isInvalid={errors.name}
                />
                <Form.Label className="visually-hidden" htmlFor="name">{t('editChannelModal.name')}</Form.Label>
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
