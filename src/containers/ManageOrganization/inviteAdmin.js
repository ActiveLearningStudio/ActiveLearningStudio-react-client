import React, { useMemo } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { getRoles } from 'store/actions/organization';

export default function AddUser() {
  const stateOrg = useSelector((state) => state.organization);
  const dispatch = useDispatch();
  useMemo(() => {
    dispatch(getRoles());
  }, []);
  return (
    <div className="create-organizations">
      <div className="add-user-organization">
        <Formik
          initialValues={{
            email: '',
            role: '',
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = 'Required';
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            if (!values.role) {
              errors.email = 'Required';
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
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
              <div className="form-group-create">
                <h3>Email</h3>
                <input
                  type="email"
                  name="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emial}
                  disabled
                />
                <div className="error">
                  {errors.email && touched.email && errors.email}
                </div>
              </div>
              <div className="form-group-create">
                <h3>Role</h3>
                <select
                  type="text"
                  name="role"
                  onChange={handleBlur}
                  onBlur={handleBlur}
                  value={values.role?.name}
                >
                  <option value="">Select Role</option>
                  {stateOrg.roles.map((role) => (
                    role.name !== 'admin' && (
                      <option
                        value={JSON.stringify(role)}
                        name={role}
                      >
                        {role.name}
                      </option>
                    )
                  ))}
                </select>
                <div className="error">
                  <div className="error">
                    {errors.role && touched.role && errors.role}
                  </div>
                </div>
              </div>
              <div className="btn-group">
                <button className="submit-create" type="submit" disabled={isSubmitting}>
                  Send Invitation
                </button>
                <button className="cancel-create" type="button" disabled={isSubmitting}>
                  CANCEL
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
