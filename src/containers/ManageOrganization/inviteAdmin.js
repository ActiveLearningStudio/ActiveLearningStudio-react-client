import React, { useMemo } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { Dropdown } from 'react-bootstrap';

import { getRoles, inviteUserOutside } from 'store/actions/organization';

export default function AddUser() {
  const stateOrg = useSelector((state) => state.organization);
  const { activeOrganization } = stateOrg;
  const dispatch = useDispatch();
  useMemo(() => {
    dispatch(getRoles());
  }, []);
  return (
    <div className="create-organizations invite-admin">
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
              errors.role = 'Required';
            }
            return errors;
          }}
          onSubmit={async (values) => {
            Swal.fire({
              title: 'Please Wait !',
              html: 'Sending Invite ...',
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
            });
            const { id } = JSON.parse(values.role);
            const summary = {
              email: values.email,
              role_id: id,
            };
            const result = dispatch(inviteUserOutside(activeOrganization.id, summary));
            result.then(() => {
              Swal.fire({
                icon: 'success',
                text: 'Invitation sent',
              });
            }).catch((err) => {
              try {
                Object.keys(err.errors).map((errors, index) => {
                  if (index < 1) {
                    Swal.fire({
                      icon: 'error',
                      text: err.errors[errors],
                    });
                  }
                  return true;
                });
              } catch {
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong!',
                });
              }
            });
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
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.emial}
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
                  onChange={handleChange}
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
                  {errors.role && touched.role && errors.role}
                </div>
              </div>
              <div className="btn-group">
                <button className="submit-create" type="submit" disabled={isSubmitting}>
                  Send Invitation
                </button>
                <Dropdown.Item>
                  <button className="cancel-create" type="button">
                    CANCEL
                  </button>
                </Dropdown.Item>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}
