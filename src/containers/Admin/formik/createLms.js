/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "store/actionTypes";

import {
  getLmsProject,
  removeActiveAdminForm,
} from "store/actions/admin";
import Swal from "sweetalert2";
import loader from "assets/images/dotsloader.gif";
import Switch from "react-switch";
import { integratedLMS } from "components/ResourceCard/AddResource/dropdownData";
import authapi from "../../../services/auth.service";
import adminapi from "../../../services/admin.service";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

export default function CreateUser(prop) {
  const { editMode, clone } = prop;
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const { activeEdit } = organization;
  const [loaderlmsImgUser, setLoaderlmsImgUser] = useState(false);
  const [stateOrgUsers, setStateOrgUsers] = useState([]);
  // const [checked, setChecked] = useState(false);
  const [checkedActivity, setCheckedActivty] = useState(false);
  const [checkedPlaylist, setCheckedPlaylist] = useState(false);
  const [checkedProject, setCheckedProject] = useState(false);
  useEffect(() => {
    if (editMode && !clone) {
      // setChecked(activeEdit?.published);
      setCheckedActivty(activeEdit?.activity_visibility);
      setCheckedPlaylist(activeEdit?.playlist_visibility);
      setCheckedProject(activeEdit?.project_visibility);
    }
  }, [activeEdit, editMode]);
  console.log("activeEdit", activeEdit);
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <div className="create-form lms-admin-form">
      <Formik
        initialValues={{
          lms_url: editMode ? activeEdit?.lms_url : "",
          lms_access_token: editMode
            ? activeEdit?.lms_access_token
            : "",
          site_name: editMode ? activeEdit?.site_name : "",
          user_id: editMode
            ? clone
              ? ""
              : activeEdit?.user?.id
            : "",
          lti_client_id: editMode ? activeEdit?.lti_client_id : "",
          // moodle: editMode ? activeEdit?.moodle : '',
          // canvas: editMode ? activeEdit?.canvas : '',
          lms_name: editMode
            ? activeEdit?.lms_name || "moodle"
            : "moodle",
          lms_access_key: editMode ? activeEdit?.lms_access_key : "",
          lms_access_secret: editMode
            ? activeEdit?.lms_access_secret
            : "",
          description: editMode ? activeEdit?.description : "",
          name: editMode
            ? clone
              ? ""
              : activeEdit?.user?.first_name +
                " " +
                activeEdit?.user?.last_name
            : "",
          lms_login_id: editMode ? activeEdit?.lms_login_id : "",
          // published: editMode ? (clone ? false : activeEdit?.published) : false,
          organization_id: organization?.activeOrganization?.id,
          activity_visibility: editMode
            ? clone
              ? false
              : activeEdit?.activity_visibility
            : false,
          playlist_visibility: editMode
            ? clone
              ? false
              : activeEdit?.playlist_visibility
            : false,
          project_visibility: editMode
            ? clone
              ? false
              : activeEdit?.project_visibility
            : false,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.lms_url) {
            errors.lms_url = "required";
          }
          if (!values.lms_access_token) {
            errors.lms_access_token = "required";
          }
          if (!values.lms_access_token) {
            errors.lms_access_token = "required";
          }
          if (!values.site_name) {
            errors.site_name = "required";
          }
          if (!values.lti_client_id) {
            errors.lti_client_id = "required";
          }

          if (!values.lms_name) {
            errors.lms_name = "required";
          }

          // if (!values.canvas) {
          //   errors.canvas = 'Required';
          // }
          // if (!values.access_key) {
          //   errors.access_key = 'Required';
          // }
          // if (!values.secret_key) {
          //   errors.secret_key = 'Required';
          // }
          // if (!values.description) {
          //   errors.description = 'Required';
          // }
          if (!values.user_id) {
            errors.user_id = "Required";
          }
          if (!values.lms_login_id) {
            errors.lms_login_id = "required";
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (editMode && !clone) {
            Swal.fire({
              title: "Users",
              icon: "info",
              text: "Updating User LMS Settings...",
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
                text: "LMS settings edited successfully",
                confirmButtonText: "Close",
                customClass: {
                  confirmButton: "confirmation-close-btn",
                },
              });
              // dispatch(getLmsProject(organization?.activeOrganization?.id));
              dispatch(removeActiveAdminForm());
              dispatch({
                type: actionTypes.NEWLY_EDIT_RESOURCE,
                payload: res?.data,
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
                text: "LMS settings added successfully",
                confirmButtonText: "Close",
                customClass: {
                  confirmButton: "confirmation-close-btn",
                },
              });
              // dispatch(getLmsProject(organization?.activeOrganization?.id));
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
              <h2 style={{ marginBottom: "45px" }}>
                {editMode ? (clone ? "Add " : "Edit ") : "Add "}
                LMS settings
              </h2>

              <div className="create-form-inputs-group">
                {/* Left container */}
                <div>
                  <div className="form-group-create">
                    <h3>LMS URL</h3>
                    <input
                      type="text"
                      name="lms_url"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lms_url}
                    />
                    <div className="error">
                      {errors.lms_url &&
                        touched.lms_url &&
                        errors.lms_url}
                    </div>
                  </div>

                  <div className="form-group-create">
                    <h3>LMS access token</h3>
                    <input
                      type="text"
                      name="lms_access_token"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lms_access_token}
                    />
                    <div className="error">
                      {errors.lms_access_token &&
                        touched.lms_access_token &&
                        errors.lms_access_token}
                    </div>
                  </div>

                  <div className="form-group-create">
                    <h3>Site name</h3>
                    <input
                      type="site_name"
                      name="site_name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.site_name}
                    />
                    <div className="error">
                      {errors.site_name &&
                        touched.site_name &&
                        errors.site_name}
                    </div>
                  </div>

                  <div className="form-group-create">
                    <h3>LTI client ID</h3>
                    <input
                      type="lti_client_id"
                      name="lti_client_id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lti_client_id}
                    />
                    <div className="error">
                      {errors.lti_client_id &&
                        touched.lti_client_id &&
                        errors.lti_client_id}
                    </div>
                  </div>

                  <div className="form-group-create">
                    <h3>LMS name</h3>
                    {/* <input
                  type="text"
                  name="role"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.role}
                /> */}
                    <select
                      className="lms-option"
                      name="lms_name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lms_name}
                    >
                      {integratedLMS.map((data) => (
                        <option key={data.value} value={data.value}>
                          {data.name}
                        </option>
                      ))}
                    </select>
                    <div className="error">
                      {errors.lms_name &&
                        touched.lms_name &&
                        errors.lms_name}
                    </div>
                  </div>

                  <div className="form-group-create">
                    <h3>Access key</h3>
                    <input
                      type="text"
                      name="lms_access_key"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lms_access_key}
                    />
                    <div className="error">
                      {errors.lms_access_key &&
                        touched.lms_access_key &&
                        errors.lms_access_key}
                    </div>
                  </div>

                  <div className="form-group-create">
                    <h3>Secret key</h3>
                    <input
                      type="text"
                      name="lms_access_secret"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lms_access_secret}
                    />
                    <div className="error">
                      {errors.lms_access_secret &&
                        touched.lms_access_secret &&
                        errors.lms_access_secret}
                    </div>
                  </div>

                  <div className="form-group-create">
                    <h3>Description</h3>
                    <input
                      type="text"
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

                  <div className="form-group-create">
                    <h3>LMS login ID</h3>
                    <input
                      type="text"
                      name="lms_login_id"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.lms_login_id}
                    />
                    <div className="error">
                      {errors.lms_login_id &&
                        touched.lms_login_id &&
                        errors.lms_login_id}
                    </div>
                  </div>

                  <div
                    className="form-group-create"
                    // style={{ marginBottom: "0px" }}
                  >
                    <h3>
                      User{" "}
                      <div>
                        <small>
                          Search users from dropdown list only
                        </small>
                      </div>
                    </h3>
                    <input
                      type="text"
                      name="name"
                      autoComplete="off"
                      onChange={async (e) => {
                        setFieldValue("name", e.target.value);
                        // eslint-disable-next-line eqeqeq
                        if (e.target.value == "") {
                          setStateOrgUsers([]);
                          return;
                        }
                        setLoaderlmsImgUser(true);
                        const lmsApi = authapi.searchUsers(
                          e.target.value
                        );
                        lmsApi.then((data) => {
                          setLoaderlmsImgUser(false);

                          setStateOrgUsers(data?.users);
                        });
                      }}
                      onBlur={handleBlur}
                      value={values.name}
                    />

                    {stateOrgUsers?.length > 0 && (
                      <ul className="all-users-list">
                        {stateOrgUsers?.map((user) => (
                          <li
                            value={user}
                            onClick={() => {
                              setFieldValue("user_id", user.id);
                              setFieldValue("name", user.first_name);
                              setStateOrgUsers([]);
                            }}
                          >
                            {user.first_name}
                            <p>
                              Email: &nbsp;
                              {user.email}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="error">
                      {errors.user_id &&
                        touched.user_id &&
                        errors.user_id}
                    </div>
                  </div>
                  {loaderlmsImgUser && (
                    <img
                      src={loader}
                      alt=""
                      style={{ width: "25px" }}
                      className="loader mb-3"
                    />
                  )}

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
                <button type="submit">
                  {editMode
                    ? clone
                      ? "Save"
                      : "Edit LMS setting "
                    : "Save "}
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
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

CreateUser.propTypes = {};
