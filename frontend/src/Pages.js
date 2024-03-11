import { useFormik } from 'formik';
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import * as Yup from 'yup';

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
  const formik = useFormik({
    initialValues: { name: "", password: "" },
    onSubmit: async (values) => {
      const { name, password } = values;
      const responce = await axios.post('/api/v1/login', { username: name, password });
      if (responce.status !== 200) throw new Error('Неверное имя пользователя или пароль');
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      password: Yup.string().required(),
    }),
  });

  return (
    <div>
      <h1>Войти</h1>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="name"
          name="name"
          type="name"
          onChange={formik.handleChange}
          value={formik.values.name}
          placeholder="Ваш ник"
        />
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
          placeholder="Пароль"
        />
        {formik.errors.name || formik.errors.password ? <div>Неверное имя пользователя или пароль</div> : null}

        <button type="submit">Войти</button>
    </form>
    </div>
  );
}
