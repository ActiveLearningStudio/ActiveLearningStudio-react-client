/* eslint-disable */
import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { addUserInOrganization,editUserInOrganization, removeActiveAdminForm } from 'store/actions/admin';
import Swal from 'sweetalert2';

export default function CreateUser(prop) {
  const { editMode } = prop;
  const [activityImage, setActivityImage] =  useState('')
  const imgref  = useRef();
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const { roles } = organization;
  const adminState = useSelector((state) => state.admin);
  const { activeForm, currentUser } = adminState;
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
          if (!values.first_name) {
            errors.first_name = 'Required';
          }
          if (!values.last_name) {
            errors.last_name = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.password && !editMode) {
            errors.password = 'Required';
          }
          if (!values.role_id) {
            errors.role_id = 'Required';
          }
          if (!values.organization_type) {
            errors.organization_type = 'Required';
          }
          if (!values.organization_name) {
            errors.organization_name = 'Required';
          }
          if (!values.job_title) {
            errors.job_title = 'Required';
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
            await dispatch(editUserInOrganization(values));
            Swal.close();
            dispatch(removeActiveAdminForm());

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
            await dispatch(addUserInOrganization(values));
            Swal.close();
            dispatch(removeActiveAdminForm());

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
                onBlur={handleBlur}
                value={values.email}
              />
              <div className="error">
                {errors.email && touched.email && errors.email}
              </div>
            </div>
            {!editMode ?
            <div className="form-group-create">
              <h3>Password</h3>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                />
              <div className="error">
                {errors.password && touched.password && errors.password}
              </div>
              </div>
              : null
            }
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
                <option value="">{''}</option>
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
              <input
                type="text"
                name="organization_type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.organization_type}
              />
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
