import React from 'react';
import { Formik } from 'formik';
import studiologo from '../../assets/images/studio_new_logo.png';
import imgelogo from '../../assets/images/interface.svg';
import './style.scss';

const LoginPageOne = () => (
  <div className="main-login">
    <div className="loginpageone">
      <div className="login-imge-section">
        <img src={studiologo} alt="studio-logo" />
        <div className="imge-logo">
          <img src={imgelogo} alt="imge-logo" />
        </div>
      </div>
      <div className="login-form">
        <div className="form-text">
          <h2>Welcome to Curriki</h2>
          <p>Sign up and start making a difference in the way learning experiences are created.</p>
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Required';
            } else if (values.name.length > 5) {
              errors.name = 'small name';
            }
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 3000);
            }}
          >
            {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          /* and other goodies */
          }) => (
            <form onSubmit={handleSubmit}>
              <input
                type="name"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              {errors.name && touched.name && errors.name}
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              {errors.email && touched.email && errors.email}
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
              />
              {errors.password && touched.password && errors.password}
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  </div>
);

export default LoginPageOne;
