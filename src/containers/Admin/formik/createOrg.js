/* eslint-disable */
import React, { useState, useRef } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { removeActiveAdminForm } from 'store/actions/admin';

export default function CreateOrg() {
  const [activityImage, setActivityImage] =  useState('')
  const imgref  = useRef();
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const { activeForm } = adminState;
  return (
    <div className="create-form">
      <Formik
        initialValues={{
          title: '',
          image: '',
          order: '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.title) {
            errors.title = 'Required';
          }
          if (!values.image) {
            errors.image = 'Required';
          }
          if (!values.order) {
            errors.order = 'Required';
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
            <h2>Create Organization</h2>
            <div className="form-group-create">
              <h3>Title</h3>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
              />
              <div className="error">
                {errors.title && touched.title && errors.title}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Image</h3>
              <div className="imgupload">
              <input
                type="text"
                name="image"
                onChange={handleChange}
                onBlur={handleBlur}
                disabled
              />
              <button onClick={() => imgref.current.click()}>
                Browse
              </button>
              <input 
                style={{ display: 'none'}}
                type="file"
                ref={imgref}
                onChange={(e) => {
                  console.log(e.target.file);
                }}
              />
              </div>
              <div className="error">
                {errors.title && touched.title && errors.title}
              </div>
            </div>
            {activityImage && <img className="selected-img" src={activityImage} alt="" />}
            <div className="form-group-create">
              <h3>Order</h3>
              <input
                type="number"
                name="order"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.order}
              />
              <div className="error">
                {errors.order && touched.order && errors.order}
              </div>
            </div>
            <div className="button-group">
              <button type="submit">
                Add Activity Type
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

CreateOrg.propTypes = {

};
