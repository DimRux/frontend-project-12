import { useFormik } from 'formik';
import { useContext } from "react";
import axios from 'axios';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { AuthorizationContext } from '../../context/AuthorizationContext';

export const FormMessage = () => {
  const { getToken, getUsername } = useContext(AuthorizationContext);
  const channelId = useSelector((state) => state.channels.activeChannelId);

  const formik = useFormik({
    initialValues: { body: '' },
    onSubmit: async ({ body }) => {
      const newMessage = { body, channelId, username: getUsername() };
      await axios.post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
    },
  });

  return (
    <Form noValidate className="py-1 rounded-2" onSubmit={formik.handleSubmit}>
      <InputGroup className="mb-3">
        <Form.Control
          name="body"
          onChange={formik.handleChange}
          value={formik.values.body}
          placeholder="Введите сообщение..."
          aria-label="Введите сообщение"
        />
        <Button variant="group-vertical" type="submit">
          <ArrowRightSquare size={20} />
          <span className="visually-hidden" />
        </Button>
      </InputGroup>
    </Form>
  )
}