/* eslint-disable */
import React from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from 'store/actionTypes';

import { getSubjects, removeActiveAdminForm } from 'store/actions/admin';
import Swal from 'sweetalert2';
import adminapi from '../../../services/admin.service';

export default function CreateSubject(props) {
  const { editMode } = props;
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const { activeEdit } = organization;

  return (
    <div className="create-form lms-admin-form">
      <Formik
      initialValues={{
        name: editMode ? activeEdit?.name : '',
        order: editMode ? activeEdit?.order : '',
      }}
      validate={(values) => {
        const errors = {};
        if (!values.name) {
          errors.name = 'Name is required';
        }
        if (!values.order) {
          errors.order = 'Order is required';
        }
        return errors;
      }}
      onSubmit={async (values) => {
        if (editMode) {
          Swal.fire({
            title: 'Subject',
            icon: 'info',
            text: 'Updating Subject ...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
            button: false,
          });

          const result = adminapi.updateSubject(activeEdit?.id, values);
          result.then((res) => {
            Swal.fire({
              icon: 'success',
              text: "Subject edited successfully",
              confirmButtonText: 'Close',
              customClass: {
                confirmButton: 'confirmation-close-btn',               
              }
            });
            dispatch(getSubjects(1));
            dispatch(removeActiveAdminForm());
            dispatch({
              type: actionTypes.NEWLY_EDIT_RESOURCE,
              payload: res?.data,
            });
          });
        } else {
          Swal.fire({
            title: 'Subject',
            icon: 'info',
            text: 'Creating new Subject...',

            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
            button: false,
          });
          const result = adminapi.createSubject(values);
          result.then((res) => {
            Swal.fire({
              icon: 'success',
              text: 'Subject added successfully',
              confirmButtonText: 'Close',
              customClass: {
                confirmButton: 'confirmation-close-btn',               
              }
            });
            dispatch(getSubjects(1));
            dispatch(removeActiveAdminForm());
            dispatch({
              type: actionTypes.NEWLY_CREATED_RESOURCE,
              payload: res?.data,
            });
          });
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
            <div className="lms-form">
              <h2>{editMode ? 'Edit ': 'Add '}Subject</h2>

              <div className="create-form-inputs-group">
                {/* Left container */}
                <div>
                  <div className="form-group-create">
                    <h3>Name</h3>
                    <input type="text" name="name" onChange={handleChange} onBlur={handleBlur} value={values.name} />
                    <div className="error">{errors.name && touched.name && errors.name}</div>
                  </div>

                  <div className="form-group-create">
                    <h3>Order</h3>
                    <input type="number" name="order" onChange={handleChange} onBlur={handleBlur} value={values.order} />
                    <div className="error">{errors.order && touched.order && errors.order}</div>
                  </div>
                </div>
              </div>
              
              <div className="button-group">
                <button type="submit">{editMode ? 'Edit ' : 'Add '}Subject</button>
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
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}