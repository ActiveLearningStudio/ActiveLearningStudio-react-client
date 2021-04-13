import React, { useState } from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';

import organization from 'services/organizations.services';
import loader from 'assets/images/dotsloader.gif';

export default function AddUser(props) {
  const {
    setAllUsersAdded,
    allUsersAdded,
    setFieldValueProps,
    method,
  } = props;
  const stateOrg = useSelector((state) => state.organization);
  const [stateOrgUsers, setStateOrgUsers] = useState([]);
  const [loaderImgUser, setLoaderImgUser] = useState(false);
  const [roleUser, setRoleUser] = useState();
  return (
    <div className="add-user-organization">
      <Formik
        initialValues={{
          name: '',
          role: '',
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
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.role) {
            errors.role = 'Required';
          }
          return errors;
        }}
        onSubmit={(values) => {
          const combine = {
            value: values,
            role: roleUser,
          };
          console.log(allUsersAdded);
          const duplicateTest = allUsersAdded.filter((dataall) => dataall.value?.userInfo?.email === values.email);
          if (duplicateTest.length === 0) {
            setAllUsersAdded([...allUsersAdded, combine]);
            setFieldValueProps('inviteUser', [...allUsersAdded, combine]);
          }
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
                  setFieldValue('name', e.target.value);
                  setFieldValue('email', '');
                  setLoaderImgUser(true);
                  const result = organization.getAllUsers(stateOrg.activeOrganization?.id, e.target.value, method);
                  result.then((data) => {
                    setLoaderImgUser(false);
                    setStateOrgUsers(data['member-options']);
                  });
                }}
                onBlur={handleBlur}
                value={values.name}
              />
              {loaderImgUser && <img src={loader} alt="" className="loader" />}
              {stateOrgUsers?.length > 0 && (
                <ul className="all-users-list">
                  {stateOrgUsers?.map((user) => (
                    <li
                      value={user}
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
                name="role"
                onChange={(e) => {
                  console.log(e.target.value);
                  setFieldValue('role', e.target.value);
                  setRoleUser(JSON.parse(e.target.value));
                }}
                onBlur={handleBlur}
                value={values.role.name}
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
  setAllUsersAdded: PropTypes.func.isRequired,
  allUsersAdded: PropTypes.array.isRequired,
  setFieldValueProps: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
};
