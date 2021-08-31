/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { addUserInOrganization,editUserInOrganization, removeActiveAdminForm } from 'store/actions/admin';
import Swal from 'sweetalert2';
import { loadOrganizationTypesAction } from 'store/actions/auth';
import { getOrgUsers } from 'store/actions/organization';

export default function CreateUser(prop) {
  const { editMode } = prop;
  const [activityImage, setActivityImage] =  useState('')
  const imgref  = useRef();
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const organizationTypes = useSelector((state) => state.auth.organizationTypes);
  const { roles } = organization;
  const adminState = useSelector((state) => state.admin);
  const { activeForm, currentUser } = adminState;
  useEffect(() => {
    dispatch(loadOrganizationTypesAction());
  }, [])
  const validatePassword=(pwd) => {
    // eslint-disable-next-line quotes
    const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
    console.log(regex.test(pwd));
    return regex.test(pwd);
  };
  return (
    <div className="create-form">
      <Formik
        initialValues={{
          first_name: editMode ? currentUser?.first_name : '',
          last_name: editMode ? currentUser?.last_name : '',
          user_id: editMode ? currentUser?.id : '',
          organization_type:editMode ? currentUser?.organization_type : '',
          organization_name:editMode ? currentUser?.organization_name :'',
          job_title:editMode ? currentUser?.job_title :"",
          role_id:editMode ? currentUser?.organization_role_id : '',
          email:editMode ? currentUser?.email :'',
          password:'',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.first_name || values.first_name.trim() === '' || values.first_name.length > 255) {
            errors.first_name = values.first_name.length > 255 ? 'Length must be 255 characters or less ' : 'Required';
          }
          if (!values.last_name || values.last_name.trim() === '' || values.last_name.length > 255) {
            errors.last_name = values.last_name.length > 255 ? 'Length must be 255 characters or less ' : 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
          }
          if (!values.password && !editMode) {
            errors.password = 'Required';
          }
          if (values.password) {
            if(!validatePassword(values.password)) {
              errors.password = 'Password must be more than 8 characters long, should contain at-least 1 Uppercase, 1 Lowercase and 1 Numeric character.';
            }
          }
          if (!values.role_id) {
            errors.role_id = 'Required';
          }
          if (!values.organization_type) {
            errors.organization_type = 'Required';
          }
          if (!values.organization_name || values.organization_name.trim() === '' || values.organization_name.length > 255) {
            errors.organization_name = values.organization_name.length > 255 ? 'Length must be 255 characters or less ' : 'Required';;
          }
          if (!values.job_title || values.job_title.trim() === '' || values.job_title.length > 255) {
            errors.job_title = values.job_title.length > 255 ? 'Length must be 255 characters or less ' : 'Required';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (editMode) {
            Swal.fire({
              title: 'Users',
              icon: 'info',
              text: 'Updating User...',
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const response = await dispatch(editUserInOrganization(values));
            if (response) {
              Swal.fire({
                text: 'You have successfully updated the user!',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#084892',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(getOrgUsers(organization?.activeOrganization?.id, organization?.activePage, organization?.activeRole));
                  dispatch(removeActiveAdminForm());
                }
              });
            }
          } else {
            Swal.fire({
              title: 'Users',
              icon: 'info',
              text: 'Creating new user...',

              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const response = await dispatch(addUserInOrganization(values));
            if (response) {
              Swal.fire({
                text: 'You have successfully created the user!',
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#084892',
                confirmButtonText: 'OK',
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(getOrgUsers(organization?.activeOrganization?.id, organization?.activePage, organization?.activeRole));
                  dispatch(removeActiveAdminForm());
                }
              });
            }
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
          <form onSubmit={handleSubmit} autoComplete="off">
            <h2>{editMode ? 'Edit ' : 'Add '} User</h2>
            <div className="form-group-create">
              <h3>First Name</h3>
              <input
                type="text"
                name="first_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.first_name}
              />
              <div className="error">
                {errors.first_name && touched.first_name && errors.first_name}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Last Name</h3>
              <input
                type="text"
                name="last_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.last_name}
              />
              <div className="error">
                {errors.last_name && touched.last_name && errors.last_name}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Email</h3>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                autoComplete="nope"
                onBlur={handleBlur}
                value={values.email}
              />
              <div className="error">
                {errors.email && touched.email && errors.email}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Password</h3>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder={editMode ? 'Leave blank for unchanged' : 'Password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                />
              <div className="error">
                {errors.password && touched.password && errors.password}
              </div>
              </div>
            <div className="form-group-create">
              <h3>Role</h3>
              {/* <input
                type="text"
                name="role"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.role}
              /> */}
              <select name="role_id" onChange={handleChange} onBlur={handleBlur} value={values.role_id}>
                <option value="">{'---Select a role---'}</option>
                {roles?.length > 0 && roles?.map((role)=>(
                  <option value={role?.id} key={role?.id}>{role?.display_name}</option>
                ))}
              </select>
              <div className="error">
                {errors.role_id && touched.role_id && errors.role_id}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Organization Type</h3>
              <select name="organization_type" onChange={handleChange} onBlur={handleBlur} value={values.organization_type}>
                <option value="">{'---Select an organization type---'}</option>
                {organizationTypes?.length > 0 && organizationTypes?.map((type) => (
                  <option value={type?.label} key={type?.label}>{type?.label}</option>
                ))}
              </select>
              <div className="error">
                {errors.organization_type && touched.organization_type && errors.organization_type}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Organization Name</h3>
              <input
                type="text"
                name="organization_name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.organization_name}
              />
              <div className="error">
                {errors.organization_name && touched.organization_name && errors.organization_name}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Job Title</h3>
              <input
                type="text"
                name="job_title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.job_title}
              />
              <div className="error">
                {errors.job_title && touched.job_title && errors.job_title}
              </div>
            </div>
            <div className="button-group">
              <button type="submit">
                {editMode ? 'Edit ' : 'Add '} User
              </button>
              <button
                type="button"
                className="cancel"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

CreateUser.propTypes = {

};
