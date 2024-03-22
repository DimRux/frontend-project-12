import { Formik } from 'formik';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import imageSingUp from '../images/page-singup.jpg';
import { Form, Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastify } from '../Toastify';

export const SignUp = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const signupSchema = Yup.object().shape({
    name: Yup.string().required().min(3, 'от 3 до 20 символов'),
    password: Yup.string().required().min(6, 'не менее 6 символов'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли должны совпадать'),
  });

  return (
    <div className='d-flex flex-column h-100'>
      <nav className='shadow-sm navbar navbar-expand-lg navbar-light bg-white'>
        <div className='container'>
          <a className='navbar-brand' href='/'>Hexlet Chat</a>
        </div>
      </nav>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={imageSingUp}
                    className="rounded-circle"
                    alt="Зарегистрироваться"
                  />
                </div>
                <Formik
                  initialValues={{
                    name: '',
                    password: '',
                    confirmPassword: '',
                  }}
                  validationSchema={signupSchema}
                  onSubmit={async (values) => {
                    try {
                      const { name, password } = values;
                      const response = await axios.post('/api/v1/signup', { username: name, password });
                      localStorage.setItem('user', JSON.stringify(response.data));
                      setError('');
                      navigate('/');
                    } catch (err) {
                      if (err.response.status !== 409) {
                        toastify('Ошибка сети', 'error');
                      } else setError('Такой пользователь уже существует');
                    }
                  }}
                >
                  {({ errors, touched, values, handleSubmit, handleChange }) => (
                    <Form className="col-12 col-md-6 mt-3 mt-mb-0" onSubmit={handleSubmit}>
                      <h1 className="text-center mb-4">Войти</h1>
                      <Form.Group className="form-floating mb-3">
                        <Form.Control
                          name="name"
                          id="name"
                          autoComplete="name"
                          placeholder="Имя пользователя"
                          className="form-control"
                          value={values.name}
                          onChange={handleChange}
                          isValid={touched.name && !errors.name}
                          isInvalid={error !== '' || errors.name}
                        />
                        <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                        <label className="form-label" htmlFor="name">Имя пользователя</label>
                      </Form.Group>

                      <Form.Group className="form-floating mb-4">
                        <Form.Control
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="password"
                          placeholder="Пароль"
                          className="form-control"
                          value={values.password}
                          onChange={handleChange}
                          isValid={touched.password && !errors.password}
                          isInvalid={error !== '' || errors.password}
                        />
                        <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                        <label className="form-label" htmlFor="password">Пароль</label>
                      </Form.Group>

                      <Form.Group className="form-floating mb-4">
                        <Form.Control
                          type="confirmPassword"
                          name="confirmPassword"
                          id="confirmPassword"
                          autoComplete="confirmPassword"
                          placeholder="Подтвердите пароль"
                          className="form-control"
                          value={values.confirmPassword}
                          onChange={handleChange}
                          isValid={touched.confirmPassword && !errors.confirmPassword}
                          isInvalid={error !== '' || errors.confirmPassword}
                        />
                        <Form.Control.Feedback type="invalid">{error !== '' ? error : errors.confirmPassword}</Form.Control.Feedback>
                        <label className="form-label" htmlFor="password">Подтвердите пароль</label>
                      </Form.Group>

                      <Button
                        type="submit"
                        variant="outline-primary"
                        className="w-100 mb-3"
                      >
                        Зарегистрироваться
                      </Button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}