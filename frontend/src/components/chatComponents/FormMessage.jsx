import { Formik } from 'formik';
import { useContext, useState } from 'react';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form, Button, InputGroup } from 'react-bootstrap';
import filterText from 'leo-profanity';
import AuthorizationContext from '../../context/AuthorizationContext';
import toastify from '../../toastify';
import { useAddMessageMutation } from '../../slices/messageApi';

const FormMessage = () => {
  const [addMessage] = useAddMessageMutation();
  const { t } = useTranslation();
  const { getToken, getUsername } = useContext(AuthorizationContext);
  const channelId = useSelector((state) => state.channels.activeChannelId);
  const [isDisabled, setDisabled] = useState(false);
  const token = getToken();

  return (
    <Formik
      initialValues={{ body: '' }}
      onSubmit={async ({ body }, { resetForm }) => {
        try {
          setDisabled(true);
          const newMessage = { body: filterText.clean(body), channelId, username: getUsername() };
          await addMessage({ token, newMessage });
          resetForm();
        } catch (e) {
          toastify(t('errors.network'), 'error');
        }
        setDisabled(false);
      }}
    >
      {({
        values,
        handleSubmit,
        handleChange,
      }) => (
        <Form noValidate className="py-1 rounded-2" onSubmit={handleSubmit}>
          <InputGroup className="mb-3">
            <Form.Control
              name="body"
              id="body"
              autoComplete="body"
              placeholder={t('formMessage.input')}
              aria-label={t('formMessage.message')}
              value={values.body}
              onChange={handleChange}
              autoFocus
            />

            <Button
              type="submit"
              variant="group-vertical"
              disabled={isDisabled}
            >
              <ArrowRightSquare size={20} />
              <span className="visually-hidden">{t('formMessage.button')}</span>
            </Button>
          </InputGroup>
        </Form>
      )}
    </Formik>
  );
};

export default FormMessage;
