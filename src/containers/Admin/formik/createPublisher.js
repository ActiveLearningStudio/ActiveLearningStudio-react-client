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
    <div className="create-form lms-admin-form">
      <Formik
        initialValues={{
          c2e_name: "",
          c2e_publisher_url: "",
          c2e_api_secret: "",

          activity_visibility: false,
          playlist_visibility: false,
          projectr_visibility: false,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.c2e_name) {
            errors.c2e_name = "required";
          }
          if (!values.c2e_publisher_url) {
            errors.c2e_publisher_url = "required";
          }
          if (!values.c2e_api_secret) {
            errors.c2e_api_secret = "required";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (editMode && !clone) {
            Swal.fire({
              title: "Users",
              icon: "info",
              text: "Updating User Publisher Config Key...",
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });

            const result = adminapi.updateLmsProject(
              organization?.activeOrganization?.id,
              activeEdit?.id,
              values
            );
            result.then((res) => {
              Swal.fire({
                icon: "success",
                text: "Publisher's Config key edited successfully",
                confirmButtonText: "Close",
                customClass: {
                  confirmButton: "confirmation-close-btn",
                },
              });
            });
          } else {
            Swal.fire({
              title: "Users",
              icon: "info",
              text: "Creating new user...",

              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const result = adminapi.createLmsProject(
              organization?.activeOrganization?.id,
              values
            );
            result.then((res) => {
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
            <div className="lms-form">
              <h2 style={{ marginBottom: "45px" }}>
                {editMode ? (clone ? "Add " : "Edit ") : "Add "}
                Publisher's Config Key
              </h2>

              <div className="create-form-inputs-group">
                {/* Left container */}
                <div>
                  <div className="form-group-create">
                    <h3>Name</h3>
                    <input
                      type="c2e_name"
                      name="c2e_name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.c2e_name}
                    />
                    <div className="error">
                      {errors.c2e_name &&
                        touched.c2e_name &&
                        errors.c2e_name}
                    </div>
                  </div>
                  <div className="form-group-create">
                    <h3>Publisher URL</h3>
                    <input
                      type="c2e_publisher_url"
                      name="c2e_publisher_url"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.c2e_publisher_url}
                    />
                    <div className="error">
                      {errors.c2e_publisher_url &&
                        touched.c2e_publisher_url &&
                        errors.c2e_publisher_url}
                    </div>
                  </div>

                  <div className="form-group-create">
                    <h3>API Secret </h3>
                    <input
                      type="c2e_api_secret"
                      name="c2e_api_secret"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.c2e_api_secret}
                    />
                    <div className="error">
                      {errors.c2e_api_secret &&
                        touched.c2e_api_secret &&
                        errors.c2e_api_secret}
                    </div>
                  </div>

                  <div className="form-group-create">
                    <h3>Visibility</h3>
                    <div className="create-form-inputs-toggles">
                      <div
                        className="custom-toggle-button"
                        id="custom-toggle-button-id-br-style"
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
                          className="react-switch"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          offColor="#888"
                          onColor={primaryColor}
                          onHandleColor={primaryColor}
                          offHandleColor="#666"
                        />
                        <h3>Activity</h3>
                      </div>
                      <div
                        className="custom-toggle-button"
                        id="custom-toggle-button-id-br-style"
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
                          className="react-switch"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          offColor="#888"
                          onColor={primaryColor}
                          onHandleColor={primaryColor}
                          offHandleColor="#666"
                        />
                        <h3>Playlist</h3>
                      </div>
                      <div
                        className="custom-toggle-button"
                        id="custom-toggle-button-id-br-style"
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
                          className="react-switch"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                          offColor="#888"
                          onColor={primaryColor}
                          onHandleColor={primaryColor}
                          offHandleColor="#666"
                        />
                        <h3>Project</h3>
                      </div>
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

CreatePublisher.propTypes = {};
