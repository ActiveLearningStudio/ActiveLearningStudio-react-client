/* eslint-disable */
import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { removeActiveAdminForm } from 'store/actions/admin';

export default function AddRole(props) {

  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const [childCat, setChildCat] =  useState(['view', 'update', 'upload', 'create', 'edit','publish']);
  return (
    <div className="create-form">
      <Formik
        initialValues={{
          name: '',
          permission: [],
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          if (!values.permission.length) {
            errors.permission = 'Required';
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
            <h2>Add Role</h2>
            <div className="form-group-create">
              <h3>Role Name</h3>
              <input
                type="text"
                name="name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <div className="error">
                {errors.name && touched.name && errors.name}
              </div>
            </div>
            <div className="form-group-create ">
              <h3>Assign Permissions</h3>
                <div className="permissions">
                  {childCat?.map((data) => (
                    <div className="form-grouper">
                      <input type="checkbox" name="" />
                      <label>{data}</label>
                    </div>
                  ))}
                </div>
              <div className="error">
                {errors.title && touched.title && errors.title}
              </div>
            </div>
            <div className="button-group">
              <button type="submit">
                Add Role
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

AddRole.propTypes = {

};
