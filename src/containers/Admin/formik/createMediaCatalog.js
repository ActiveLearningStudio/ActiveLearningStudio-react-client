/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { removeActiveAdminForm } from "store/actions/admin";
import Swal from "sweetalert2";
import Switch from "react-switch";
import adminapi from "../../../services/admin.service";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

export default function CreateMediaCatalog(prop) {
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
          name: editMode ? activeEdit?.name : "",
          url: editMode ? activeEdit?.url : "",
          email: editMode ? activeEdit?.email : "",
          description: editMode ? activeEdit?.description : "",
          media_source_id: editMode
            ? activeEdit?.media_source_id
            : "",
          api_setting_id: editMode ? activeEdit?.api_setting_id : "",
          client_key: editMode ? activeEdit?.client_key : "",
          secret_key: editMode ? activeEdit?.secret_key : "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = "required";
          }
          if (!values.url) {
            errors.url = "required";
          }
          if (!values.description) {
            errors.description = "required";
          }
          if (!values.media_source_id) {
            errors.media_source_id = "required";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (editMode && !clone) {
            Swal.fire({
              title: "MediaCatalog",
              icon: "info",
              text: "Updating Media Catalog...",
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });

            const result = adminapi.updateMediaCatalog(
              organization?.activeOrganization?.id,
              activeEdit?.id,
              values
            );
            result.then((res) => {
              if (res) {
                dispatch({
                  type: "UPDATE_MEDIA_CATALOG",
                  payload: res?.data,
                });
                dispatch(removeActiveAdminForm());
                Swal.fire({
                  icon: "success",
                  text: res?.message,
                  confirmButtonText: "Close",
                  customClass: {
                    confirmButton: "confirmation-close-btn",
                  },
                });
              }
            });
          } else {
            Swal.fire({
              title: "MediaCatalog",
              icon: "info",
              text: "Creating new Media Catalog...",

              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const result = adminapi.createMediaCatalog(
              organization?.activeOrganization?.id,
              {
                ...values,
                "organization id":
                  organization?.activeOrganization?.id,
              }
            );
            result.then((res) => {
              if (res) {
                dispatch({
                  type: "ADD_MEDIA_CATALOG",
                  payload: res?.data || {},
                });
                dispatch(removeActiveAdminForm());
                Swal.fire({
                  icon: "success",
                  text: res?.message,
                  confirmButtonText: "Close",
                  customClass: {
                    confirmButton: "confirmation-close-btn",
                  },
                });
              }
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
                C2E Media Catalog
              </h2>

              <div className="create-form-inputs-group">
                {/* Left container */}
                <div>
                  <div className="form-group-create">
                    <h3>Name</h3>
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
                  <div className="form-group-create">
                    <h3>URL</h3>
                    <input
                      type="url"
                      name="url"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.url}
                    />
                    <div className="error">
                      {errors.url && touched.url && errors.url}
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
                  <div className="form-group-create">
                    <h3>API Setting Id</h3>
                    <input
                      type="text"
                      name="api_setting_id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.api_setting_id}
                    />
                    <div className="error">
                      {errors.api_setting_id &&
                        touched.api_setting_id &&
                        errors.api_setting_id}
                    </div>
                  </div>
                  <div className="form-group-create">
                    <h3>Client Key</h3>
                    <input
                      type="text"
                      name="client_key"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.client_key}
                    />
                    <div className="error">
                      {errors.client_key &&
                        touched.client_key &&
                        errors.client_key}
                    </div>
                  </div>
                  <div className="form-group-create">
                    <h3>Secret Key</h3>
                    <input
                      type="text"
                      name="secret_key"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.secret_key}
                    />
                    <div className="error">
                      {errors.secret_key &&
                        touched.secret_key &&
                        errors.secret_key}
                    </div>
                  </div>
                  <div className="form-group-create">
                    <h3>Media Source Id</h3>
                    <input
                      type="media_source_id"
                      name="media_source_id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.media_source_id}
                    />
                    <div className="error">
                      {errors.media_source_id &&
                        touched.media_source_id &&
                        errors.media_source_id}
                    </div>
                  </div>

                  <div className="form-group-create">
                    <h3>Description </h3>
                    <input
                      type="description"
                      name="description"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.description}
                    />
                    <div className="error">
                      {errors.description &&
                        touched.description &&
                        errors.description}
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

CreateMediaCatalog.propTypes = {};
