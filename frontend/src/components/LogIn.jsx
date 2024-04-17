import { Formik } from 'formik';
import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import AuthorizationContext from '../context/AuthorizationContext';
import routes from '../routes';
import imageLogin from '../images/page-login1.jpg';

const LogIn = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setToken } = useContext(AuthorizationContext);
  const [error, setError] = useState('');
  const [isDisabled, setDisabled] = useState(false);

  const signupSchema = Yup.object().shape({
    username: Yup.string().required(),
    password: Yup.string().required(),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={imageLogin}
                  className="rounded-circle"
                  alt={t('logIn.imgAlt')}
                />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                }}
                validationSchema={signupSchema}
                onSubmit={async (values) => {
                  try {
                    setDisabled(true);
                    const { username, password } = values;
                    const response = await axios.post('/api/v1/login', { username, password });
                    setToken(response.data);
                    setError('');
                    navigate(routes.chatPagePath);
                  } catch (e) {
                    setError(t('errors.singUp.confirmPassword'));
                  }
                  setDisabled(false);
                }}
              >
                {({
                  errors,
                  touched,
                  values,
                  handleSubmit,
                  handleChange,
                }) => (
                  <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">{t('logIn.h1')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        name="username"
                        id="username"
                        autoComplete="username"
                        placeholder={t('logIn.name')}
                        className="form-control"
                        value={values.username}
                        onChange={handleChange}
                        isValid={touched.username && !errors.username}
                        isInvalid={error !== ''}
                      />
                      <Form.Label htmlFor="username">{t('logIn.name')}</Form.Label>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="password"
                        placeholder={t('logIn.password')}
                        className="form-control"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={error !== ''}
                      />
                      <Form.Label htmlFor="password">{t('logIn.password')}</Form.Label>
                      {error && <Form.Control.Feedback type="invalid">{t('errors.logIn')}</Form.Control.Feedback>}
                    </Form.Group>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="w-100 mb-3"
                      disabled={isDisabled}
                    >
                      {t('logIn.button')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>{t('logIn.footer.span')}</span>
                <Link to={routes.signUpPagePath}>{t('logIn.footer.a')}</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
