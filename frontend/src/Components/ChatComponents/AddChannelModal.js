import { Formik } from 'formik';
import { useContext } from "react";
import axios from 'axios';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { addChannel } from '../../slices/channelsSlice';
import { Form, Button, Modal } from 'react-bootstrap';
import { AuthorizationContext } from '../../context/AuthorizationContext';
import { toastify } from "../../Toastify";

export const AddChannelModal = ({ show, handleClose }) => {
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  const { getToken } = useContext(AuthorizationContext);
  const token = getToken();

  const signupSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required('Обязательное поле')
      .min(3, 'от 3 до 20 символов')
      .max(20, 'от 3 до 20 символов')
      .notOneOf(channels.map(({ name }) => name), 'Должно быть уникальным'),
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
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
              const { name } = values;
              const response = await axios.post('/api/v1/channels', { name }, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              const newChannel = { channel: response.data, activeChannelId: response.data.id };
              dispatch(addChannel(newChannel))
              handleClose();
              toastify('Канал добавлен', 'success');
            } catch {
              toastify('Ошибка сети', 'error');
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
                <label className="visually-hidden" htmlFor="name">
                  Имя канала
                </label>
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
                  Отменить
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                >
                  Отправить
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </Modal.Body>
    </Modal>
  );
}