import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';

import organization from 'services/organizations.services';
import loader from 'assets/images/dotsloader.gif';

export default function AddAdmin(props) {
  const {
    setAllUsersAdded,
    allUsersAdded,
    setFieldValueProps,
    setToggleAdminDropdown,
    method,
  } = props;
  const stateOrg = useSelector((state) => state.organization);
  const [stateOrgUsers, setStateOrgUsers] = useState([]);
  const [loaderImgUser, setLoaderImgUser] = useState(false);
  const [roleUser, setRoleUser] = useState();
  useEffect(() => {
    setRoleUser(stateOrg.roles?.filter((role) => role.name === 'admin'));
  }, [stateOrg.roles]);
  return (
    <div className="add-user-organization">
      <Formik
        initialValues={{
          name: '',
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
            setFieldValueProps('admin_id', [...allUsersAdded, combine]);
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
              <h3>Search Admin</h3>
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
                    console.log(data);
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
            {/* <div className="form-group-create">
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
                {stateOrg.roles.map((role) => (
                  role.name === 'admin' && (
                    <option
                      selected
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
            </div> */}
            <div className="btn-group">
              <button className="submit-create" type="submit" onClick={() => setToggleAdminDropdown(false)}>
                Add Admin
              </button>
              <Dropdown.Item>
                <button className="cancel-create" type="button" onClick={() => setToggleAdminDropdown(false)}>
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

AddAdmin.propTypes = {
  setAllUsersAdded: PropTypes.func.isRequired,
  allUsersAdded: PropTypes.array.isRequired,
  setFieldValueProps: PropTypes.func.isRequired,
  method: PropTypes.string.isRequired,
  setToggleAdminDropdown: PropTypes.func.isRequired,
};
