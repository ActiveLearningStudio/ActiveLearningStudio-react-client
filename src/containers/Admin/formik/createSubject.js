/* eslint-disable */
import React from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "store/actionTypes";

import { getSubjects, removeActiveAdminForm } from "store/actions/admin";
import Swal from "sweetalert2";
import adminapi from "../../../services/admin.service";

export default function CreateSubject(props) {
  const { editMode } = props;
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const { activeEdit, activePage } = organization;

  return (
    <div className="create-form lms-admin-form">
      <Formik
        initialValues={{
          name: editMode ? activeEdit?.name : "",
          order: editMode ? activeEdit?.order : "",
          organization_id: organization?.activeOrganization?.id,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "Name is required";
          }
          if (!values.order) {
            errors.order = "Order is required";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (editMode) {
            Swal.fire({
              title: "Subject",
              icon: "info",
              text: "Updating Subject ...",
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });

            const result = adminapi.updateSubject(
              organization?.activeOrganization?.id,
              activeEdit?.id,
              values
            );
            result.then((res) => {
              Swal.fire({
                icon: "success",
                text: "Subject edited successfully",
                confirmButtonText: "Close",
                customClass: {
                  confirmButton: "confirmation-close-btn",
                },
              });
              dispatch(
                getSubjects(organization?.activeOrganization?.id, activePage)
              );
              dispatch(removeActiveAdminForm());
              dispatch({
                type: actionTypes.NEWLY_EDIT_RESOURCE,
                payload: res?.data,
              });
            });
          } else {
            Swal.fire({
              title: "Subject",
              icon: "info",
              text: "Creating new Subject...",

              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const result = adminapi.createSubject(
              organization?.activeOrganization?.id,
              values
            );
            result.then((res) => {
              Swal.fire({
                icon: "success",
                text: "Subject added successfully",
                confirmButtonText: "Close",
                customClass: {
                  confirmButton: "confirmation-close-btn",
                },
              });
              dispatch(getSubjects(organization?.activeOrganization?.id, 1));
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
              <h2>{editMode ? "Edit " : "Add "}Subject</h2>

              <div className="create-form-inputs-group">
                {/* Left container */}
                <div>
                  <div className="form-group-create">
                    <h3>Name</h3>
                    <input
                      type="text"
                      name="name"
                      placeholder="New subject name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <div className="error">
                      {errors.name && touched.name && errors.name}
                    </div>
                  </div>

                  <div className="form-group-create">
                    <h3>Order</h3>
                    <input
                      type="number"
                      min="0"
                      name="order"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.order}
                    />
                    <div className="error">
                      {errors.order && touched.order && errors.order}
                    </div>
                  </div>
                </div>
              </div>

              <div className="button-group">
                <button type="submit">Save</button>
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
