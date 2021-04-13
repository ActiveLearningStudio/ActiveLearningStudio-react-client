import React from 'react';
import { Formik } from 'formik';

function CreateUser() {
  return (
    <>
      <div className="add-user-organization">
        <Formik
          initialValues={{
            name: '',
            email: '',
            organization: '',
            role: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Required';
            }
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.role) {
              errors.role = 'Required';
            }
            if (!values.organization) {
              errors.organization = 'Required';
            }
            return errors;
          }}
          onSubmit={(values) => {
            console.log(values, 'i got values');
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            // setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <div className="form-group-create">
                <h3>Name</h3>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.name}
                />
                <div className="error">
                  {errors.name && touched.name && errors.name}
                </div>
              </div>
              <div className="form-group-create">
                <h3>Email</h3>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.email}
                />
                <div className="error">
                  {errors.name && touched.name && errors.name}
                </div>
              </div>
              <div className="form-group-create">
                <h3>Organization</h3>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.organization}
                />
                <div className="error">
                  {errors.name && touched.name && errors.name}
                </div>
              </div>
              <div className="form-group-create">
                <h3>Role</h3>
                <input
                  type="text"
                  name="name"
                  onChange={handleChange}
                  handleBlur={handleBlur}
                  value={values.role}
                />
                <div className="error">
                  {errors.name && touched.name && errors.name}
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
}
export default CreateUser;
