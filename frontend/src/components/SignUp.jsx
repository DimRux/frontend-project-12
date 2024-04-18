import { Formik } from 'formik';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import * as Yup from 'yup';
import { Form, Button } from 'react-bootstrap';
import imageSingUp from '../images/page-singup.jpg';
import toastify from '../toastify';
import AuthorizationContext from '../context/AuthorizationContext';
import routes from '../routes';

const SignUp = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { setToken } = useContext(AuthorizationContext);
  const [error, setError] = useState('');
  const [isDisabled, setDisabled] = useState(false);

  const signupSchema = Yup.object().shape({
    username: Yup.string().required().min(3, t('errors.singUp.username')),
    password: Yup.string().required().min(6, t('errors.singUp.password')),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], t('errors.singUp.confirmPassword')),
  });

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={imageSingUp}
                  className="rounded-circle"
                  alt={t('singUp.imgAlt')}
                />
              </div>
              <Formik
                initialValues={{
                  username: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={signupSchema}
                onSubmit={async (values) => {
                  try {
                    setDisabled(true);
                    const { username, password } = values;
                    const response = await axios.post(routes.signUpApiPath, { username, password });
                    setToken(response.data);
                    setError('');
                    navigate(routes.chatPagePath);
                  } catch (err) {
                    if (!err.response) {
                      toastify(t('errors.network'), 'error');
                    } else setError(t('errors.singUp.axios'), 'error');
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
                    <h1 className="text-center mb-4">{t('singUp.h1')}</h1>
                    <Form.Group className="form-floating mb-3">
                      <Form.Control
                        name="username"
                        id="username"
                        autoComplete="username"
                        placeholder={t('singUp.username')}
                        className="form-control"
                        value={values.username}
                        onChange={handleChange}
                        isValid={touched.username && !errors.username}
                        isInvalid={error !== '' || (errors.username && touched.username)}
                      />
                      <Form.Label htmlFor="username">{t('singUp.username')}</Form.Label>
                      <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="password"
                        placeholder={t('singUp.password')}
                        className="form-control"
                        value={values.password}
                        onChange={handleChange}
                        isValid={touched.password && !errors.password}
                        isInvalid={error !== '' || (touched.password && errors.password)}
                      />
                      <Form.Label htmlFor="password">{t('singUp.password')}</Form.Label>
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="form-floating mb-4">
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete="confirmPassword"
                        placeholder={t('singUp.confirmPassword')}
                        className="form-control"
                        value={values.confirmPassword}
                        onChange={handleChange}
                        isValid={touched.confirmPassword && !errors.confirmPassword}
                        isInvalid={error !== '' || errors.confirmPassword}
                      />
                      <Form.Label htmlFor="confirmPassword">{t('singUp.confirmPassword')}</Form.Label>
                      <Form.Control.Feedback type="invalid">{error !== '' ? error : errors.confirmPassword}</Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="w-100 mb-3"
                      disabled={isDisabled}
                    >
                      {t('singUp.button')}
                    </Button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
