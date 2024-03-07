import { Formik, Form, Field } from 'formik';

export const Page404 = () => <div>404 Not Found or Found</div>
export const LogIn = () => (
  <>
    <h1>Войти</h1>
    <Formik
      initialValues={{ name: "", password: "" }}
      onSubmit={({ setSubmitting }) => {
        console.log("Form is validated! Submitting the form...");
        setSubmitting(false);
      }}
    >
    {() => (
      <Form>
        <div className="form-group">
          <label htmlFor="name">Ваш ник</label>
          <Field
            type="name"
            name="name"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <Field
            type="password"
            name="password"
            className="form-control"
          />
        </div>
        <button type="submit">Войти</button>
      </Form>
    )}
    </Formik>
  </>
)
