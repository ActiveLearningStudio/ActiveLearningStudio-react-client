import React, { useState } from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import organization from 'services/organizations.services';

export default function AddUser() {
  const stateOrg = useSelector((state) => state.organization);
  const [stateOrgUsers, setStateOrgUSers] = useState([]);
  console.log(stateOrg);
  return (
    <div className="add-user-organization">
      <Formik
        initialValues={{
          name: {},
          email: '',
          role: {},
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
          setFieldValue,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group-create">
              <h3>Name</h3>
              <input
                type="text"
                name="name"
                onChange={async (e) => {
                  setFieldValue(e.target.value);
                  const result = organization.getAllUsers(stateOrg.activeOrganization?.id, e.target.value);
                  console.log(result);
                  setStateOrgUSers();
                }}
                onBlur={handleBlur}
                value={values.name.name}
                id="allusers"
              />
              <datalist id="allusers">
                {stateOrgUsers?.map((user) => (
                  <option value={user}>{user.name}</option>
                ))}
              </datalist>
              {errors.name && touched.name && errors.name}
            </div>
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
              {errors.email && touched.email && errors.email}
            </div>
            <div className="form-group-create">
              <h3>Role</h3>
              <select
                type="text"
                name="admin"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.role}
              >
                <option>--Select role--</option>
                {stateOrg.roles.map((role) => (
                  <option value={role}>{role.name}</option>
                ))}
              </select>
              {errors.role && touched.role && errors.role}
            </div>
            <div className="btn-group">
              <button className="submit-create" type="submit" disabled={isSubmitting}>
                Add User
              </button>
              <button className="cancel-create" type="button" disabled={isSubmitting}>
                CANCEL
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
