/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "store/actionTypes";
import { removeActiveAdminForm } from "store/actions/admin";
import Swal from "sweetalert2";
import Switch from "react-switch";
import adminapi from "../../../services/admin.service";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import { action } from "@storybook/addon-actions";

export default function CreatePublisher(prop) {
  const { editMode, clone } = prop;
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const { activeEdit } = organization;

  const [checkedActivity, setCheckedActivty] = useState(false);
  const [checkedPlaylist, setCheckedPlaylist] = useState(false);
  const [checkedProject, setCheckedProject] = useState(false);

  useEffect(() => {
    if (editMode && !clone) {
      setCheckedActivty(activeEdit?.activity_visibility);
      setCheckedPlaylist(activeEdit?.playlist_visibility);
      setCheckedProject(activeEdit?.project_visibility);
    }
  }, [activeEdit, editMode]);

  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <div className='create-form lms-admin-form'>
      <Formik
        initialValues={{
          name: editMode ? activeEdit?.name : "",
          url: editMode ? activeEdit?.url : "",
          key: editMode ? activeEdit?.key : "",

          activity_visibility: false,
          playlist_visibility: false,
          projectr_visibility: false,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "required";
          }
          if (!values.url) {
            errors.url = "required";
          }
          if (!values.key) {
            errors.key = "required";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (editMode && !clone) {
            Swal.fire({
              title: "Publishers",
              icon: "info",
              text: "Updating C2E Publisher Config Key...",
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });

            const result = adminapi.updatePublisherList(
              organization?.activeOrganization?.id,
              activeEdit?.id,
              values
            );
            result.then((res) => {
              dispatch({
                type: "UPDATE_C2E_PUBLISHER",
                payload: res?.data,
              });
              dispatch(removeActiveAdminForm());
              Swal.fire({
                icon: "success",
                text: "C2E's Config key edited successfully",
                confirmButtonText: "Close",
                customClass: {
                  confirmButton: "confirmation-close-btn",
                },
              });
            });
          } else {
            Swal.fire({
              title: "Publishers",
              icon: "info",
              text: "Creating new C2E Publisher...",

              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const result = adminapi.createPublisherList(
              organization?.activeOrganization?.id,
              {
                ...values,
                "organization id":
                  organization?.activeOrganization?.id,
              }
            );
            result.then((res) => {
              dispatch({
                type: "ADD_C2E_PUBLISHER",
                payload: res?.data || {},
              });
              dispatch(removeActiveAdminForm());
              Swal.fire({
                icon: "success",
                text: "Publisher's Config key added successfully",
                confirmButtonText: "Close",
                customClass: {
                  confirmButton: "confirmation-close-btn",
                },
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
            <div className='lms-form'>
              <h2 style={{ marginBottom: "45px" }}>
                {editMode ? (clone ? "Add " : "Edit ") : "Add "}
                Publisher's Config Key
              </h2>

              <div className='create-form-inputs-group'>
                {/* Left container */}
                <div>
                  <div className='form-group-create'>
                    <h3>Name</h3>
                    <input
                      type='text'
                      name='name'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    <div className='error'>
                      {errors.name && touched.name && errors.name}
                    </div>
                  </div>
                  <div className='form-group-create'>
                    <h3>Publisher URL</h3>
                    <input
                      type='url'
                      name='url'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.url}
                    />
                    <div className='error'>
                      {errors.url && touched.url && errors.url}
                    </div>
                  </div>

                  <div className='form-group-create'>
                    <h3>API Secret </h3>
                    <input
                      type='key'
                      name='key'
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.key}
                    />
                    <div className='error'>
                      {errors.key && touched.key && errors.key}
                    </div>
                  </div>

                  <div className='form-group-create'>
                    <h3>Visibility</h3>
                    <div className='create-form-inputs-toggles'>
                      <div
                        className='custom-toggle-button'
                        id='custom-toggle-button-id-br-style'
                      >
                        <Switch
                          checked={checkedActivity}
                          onChange={() => {
                            setCheckedActivty(!checkedActivity);
                            setFieldValue(
                              "activity_visibility",
                              !checkedActivity
                            );
                          }}
                          className='react-switch'
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          offColor='#888'
                          onColor={primaryColor}
                          onHandleColor={primaryColor}
                          offHandleColor='#666'
                        />
                        <h3>Activity</h3>
                      </div>
                      <div
                        className='custom-toggle-button'
                        id='custom-toggle-button-id-br-style'
                      >
                        <Switch
                          checked={checkedPlaylist}
                          onChange={() => {
                            setCheckedPlaylist(!checkedPlaylist);
                            setFieldValue(
                              "playlist_visibility",
                              !checkedPlaylist
                            );
                          }}
                          className='react-switch'
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          offColor='#888'
                          onColor={primaryColor}
                          onHandleColor={primaryColor}
                          offHandleColor='#666'
                        />
                        <h3>Playlist</h3>
                      </div>
                      <div
                        className='custom-toggle-button'
                        id='custom-toggle-button-id-br-style'
                      >
                        <Switch
                          checked={checkedProject}
                          onChange={() => {
                            setCheckedProject(!checkedProject);
                            setFieldValue(
                              "project_visibility",
                              !checkedProject
                            );
                          }}
                          className='react-switch'
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          offColor='#888'
                          onColor={primaryColor}
                          onHandleColor={primaryColor}
                          offHandleColor='#666'
                        />
                        <h3>Project</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='button-group'>
                <button type='submit'>Save</button>
                <button
                  type='button'
                  className='cancel'
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

CreatePublisher.propTypes = {};
