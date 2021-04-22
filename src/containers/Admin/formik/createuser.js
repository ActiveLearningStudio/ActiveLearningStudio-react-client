/* eslint-disable */
import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { removeActiveAdminForm } from 'store/actions/admin';

export default function CreateUser(prop) {
  const { editMode } = prop;
  const [activityImage, setActivityImage] =  useState('')
  const imgref  = useRef();
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const { activeForm, currentUser } = adminState;
  return (
    <div className="create-form">
      <Formik
        initialValues={{
          firstName: editMode ? currentUser?.first_name : '',
          lastName: editMode ? currentUser?.last_name : '',
          organizationType:editMode ? currentUser?.organization_type : '',
          organizationName:editMode ? currentUser?.organization_name :'',
          jobTitle:editMode ? currentUser?.job_title :"",
          role:editMode ? currentUser?.organization_role :"",
          email:editMode ? currentUser?.email :'',
          password:'',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.firstName) {
            errors.firstName = 'Required';
          }
          if (!values.lastName) {
            errors.lastName = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          if (!values.role) {
            errors.role = 'Required';
          }
          if (!values.organizationType) {
            errors.organizationType = 'Required';
          }
          if (!values.organizationName) {
            errors.organizationName = 'Required';
          }
          if (!values.jobTitle) {
            errors.jobTitle = 'Required';
          }
          return errors;
        }}
        onSubmit={(values) => {

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
                name="firstName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
              />
              <div className="error">
                {errors.firstName && touched.firstName && errors.firstName}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Last Name</h3>
              <input
                type="text"
                name="lastName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.lastName}
              />
              <div className="error">
                {errors.lastName && touched.lastName && errors.lastName}
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
              <input
                type="text"
                name="role"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.role}
              />
              <div className="error">
                {errors.role && touched.role && errors.role}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Organization Type</h3>
              <input
                type="text"
                name="organizationType"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.organizationType}
              />
              <div className="error">
                {errors.organizationType && touched.organizationType && errors.organizationType}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Organization Name</h3>
              <input
                type="text"
                name="organizationName"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.organizationName}
              />
              <div className="error">
                {errors.organizationName && touched.organizationName && errors.organizationName}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Job Title</h3>
              <input
                type="text"
                name="jobTitle"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.jobTitle}
              />
              <div className="error">
                {errors.jobTitle && touched.jobTitle && errors.jobTitle}
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
