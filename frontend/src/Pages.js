import { Field , Form , Formik } from 'formik';
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';
import { Button } from 'react-bootstrap';

export const Page404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    console.log(isAuthenticated)
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  return <div>Hellow World!</div>
}

export const LogIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

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
              <h1 className="text-center mb-4">Войти</h1>
                <Formik
                  initialValues={{
                    name: '',
                    password: '',
                  }}
                  validationSchema={signupSchema}
                  onSubmit={ async (values) => {
                    try {
                    const { name, password } = values;
                    await axios.post('/api/v1/login', { username: name, password });
                    localStorage.setItem('isAuthenticated', true);
                    setError('');
                    navigate('/');
                    } catch (e) {
                    setError('Неверное имя пользователя или пароль');
                    } 
                  }}
                >
                  {({ errors, touched }) => (
                    <Form>
                      <Field name="name" type="name" placeholder="Ваш ник" />
                      {errors.name && touched.name ? <div>Заполните это поле</div> : null}
                      <Field name="password" type="password" placeholder="Пароль" />
                      {errors.password && touched.password ? <div>Заполните это поле</div> : null}
                      {error && <div>{error}</div>}
                      <Button type="submit">Войти</Button>
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
