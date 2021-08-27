import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';

import organization from 'services/organizations.services';
import loader from 'assets/images/dotsloader.gif';
import Swal from 'sweetalert2';
import { inviteUserOutside } from 'store/actions/organization';
import { alphaNumeric } from 'utils';

export default function AddUser(props) {
  const {
    // setAllUsersAdded,
    // allUsersAdded,
    // setFieldValueProps,
    method,
  } = props;
  const stateOrg = useSelector((state) => state.organization);
  const { activeOrganization } = stateOrg;
  const resetvalue = useRef();
  const dispatch = useDispatch();
  const [stateOrgUsers, setStateOrgUsers] = useState([]);
  const [loaderImgUser, setLoaderImgUser] = useState(false);
  // const [roleUser, setRoleUser] = useState();
  return (
    <div className="add-user-organization">
      <Formik
        enableReinitialize
        initialValues={{
          name: '',
          role_id: '',
          email: '',
          userInfo: {},
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.role_id) {
            errors.role_id = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          Swal.fire({
            title: 'Please Wait !',
            html: 'Sending Invite ...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          });
          const { id } = JSON.parse(values.role_id);
          const summary = {
            email: values.email,
            role_id: id,
          };
          const result = dispatch(inviteUserOutside(activeOrganization.id, summary));
            result.then((res) => {
              if (res) {
                Swal.fire({
                  icon: 'success',
                  text: 'Invitation sent',
                });
              }
              resetvalue.current.selectedIndex = '0';
              resetForm();
            }).catch(() => {
              resetvalue.current.selectedIndex = '0';
              resetForm();
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
          setFieldValue,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="form-group-create">
              <h3>Search Users</h3>
              <input
                type="text"
                name="name"
                autoComplete="off"
                onChange={async (e) => {
                  if (alphaNumeric(e.target.value)) {
                    setFieldValue('name', e.target.value);
                    setFieldValue('email', '');
                    setLoaderImgUser(true);
                  }
                  if (e.target.value && alphaNumeric(e.target.value)) {
                    const result = organization.getAllUsers(stateOrg.activeOrganization?.id, e.target.value, method);
                    result.then((data) => {
                      setLoaderImgUser(false);
                      setStateOrgUsers(data['member-options']);
                    }).catch(() => {
                      setLoaderImgUser(false);
                      setStateOrgUsers([]);
                    });
                  } else if (e.target.value === '') {
                    setLoaderImgUser(false);
                    setStateOrgUsers([]);
                  }
                }}
                onBlur={handleBlur}
                value={values.name}
              />
              {loaderImgUser && <img src={loader} alt="" className="loader" />}
              {stateOrgUsers?.length > 0 && values.name && (
                <ul className="all-users-list">
                  {stateOrgUsers?.map((user) => (
                    <li
                      value={user}
                      key={user.email}
                      onClick={() => {
                        setFieldValue('name', user.first_name);
                        setFieldValue('email', user.email);
                        setFieldValue('userInfo', user);
                        setStateOrgUsers([]);
                      }}
                    >
                      {user.first_name}
                      <p>
                        Email:
                        &nbsp;
                        {user.email}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <div className="error">
                {errors.name && touched.name && errors.name}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Email</h3>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                disabled
                style={{ backgroundColor: '#ccc' }}
              />
              <div className="error">
                {errors.email && touched.email && errors.email}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Role</h3>
              <select
                type="text"
                name="role_id"
                onChange={(e) => {
                  setFieldValue('role_id', e.target.value);
                  // setRoleUser(JSON.parse(e.target.value));
                }}
                onBlur={handleBlur}
                value={values.role_id.name}
                ref={resetvalue}
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
                {errors.role_id && touched.role_id && errors.role_id}
              </div>
            </div>
            <div className="btn-group">
              <button className="submit-create" type="submit">
                Add User
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
  );
}

AddUser.propTypes = {
  // setAllUsersAdded: PropTypes.func.isRequired,
  // allUsersAdded: PropTypes.array.isRequired,
  // setFieldValueProps: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
};
