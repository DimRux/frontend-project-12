import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import axios from 'axios';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import AuthorizationContext from '../../context/AuthorizationContext';

const FormMessage = () => {
  const { t } = useTranslation();
  const { getToken, getUsername } = useContext(AuthorizationContext);
  const channelId = useSelector((state) => state.channels.activeChannelId);
  const [isDisabled, setDisabled] = useState(false);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async ({ body }) => {
      try {
        setDisabled(true);
        const newMessage = { body, channelId, username: getUsername() };
        await axios.post('/api/v1/messages', newMessage, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });
        setDisabled(false);
      } catch {
        setDisabled(false);
      }
    },
  });

  return (
    <Form noValidate className="py-1 rounded-2" onSubmit={formik.handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          name="body"
          onChange={formik.handleChange}
          value={formik.values.body}
          placeholder={t('formMessage')}
          aria-label="Новое сообщение"
        />
        <Button variant="group-vertical" type="submit" disabled={isDisabled}>
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default FormMessage;
