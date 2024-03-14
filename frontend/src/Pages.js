import { Formik } from 'formik';
import { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector, useDispatch } from 'react-redux';
import { initChannels } from './slices/channelsSlice';
import { Form, Button } from 'react-bootstrap';
import imageLogin from './images/page-login1.jpg';
import { AuthorizationContext } from './context/AuthorizationContext';

export const Page404 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels);
  const { user } = useContext(AuthorizationContext);
  const { token } = JSON.parse(user);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const requestData = async () => {
      const data = await axios.get('/api/v1/channels', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newChannels = { channels: data.data, activeChannelId: 0 };
      dispatch(initChannels(newChannels));
    };
    requestData();
  }, [token, dispatch]);

  return <div>Hellow World!</div>
}

export const LogIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { setUser } = useContext(AuthorizationContext);

  const signupSchema = Yup.object().shape({
    name: Yup.string().required(),
    password: Yup.string().required()
  });

  return  (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
            <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img
                  src={imageLogin}
                  className="rounded-circle"
                  alt="Войти"
                />
              </div>
                <Formik
                  initialValues={{
                    name: '',
                    password: '',
                  }}
                  validationSchema={signupSchema}
                  onSubmit={ async (values) => {
                    try {
                    const { name, password } = values;
                    const response = await axios.post('/api/v1/login', { username: name, password });
                    setUser(JSON.stringify(response.data));
                    localStorage.setItem('isAuthenticated', true);
                    setError('');
                    navigate('/');
                    } catch (e) {
                    setError('Неверное имя пользователя или пароль');
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
                        placeholder="Ваш ник"
                        className="form-control"
                        value={values.name}
                        onChange={handleChange}
                        isValid={touched.name && !errors.name}
                        isInvalid={error !== ''}
                      />
                      <label className="form-label" htmlFor="name">Ваш ник</label>
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
                        isInvalid={error !== ''}
                      />
                      {error && <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>}
                      <label className="form-label" htmlFor="password">Пароль</label>
                    </Form.Group>
                    <Button
                      type="submit"
                      variant="outline-primary"
                      className="w-100 mb-3"
                    >
                      Войти
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
}
