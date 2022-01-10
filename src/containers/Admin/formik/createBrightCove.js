/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from 'store/actionTypes';
import PropTypes from 'prop-types';
import { getLmsProject, removeActiveAdminForm } from 'store/actions/admin';
import Swal from 'sweetalert2';
import authapi from '../../../services/auth.service';
import adminapi from '../../../services/admin.service';
import docAvatar from 'assets/images/upload-files.png';
import pcIcon from 'assets/images/pc-icon.png';
import loader from 'assets/images/dotsloader.gif';
import Switch from 'react-switch';

export default function CreateBrightCove(prop) {
  const { editMode, method, clone } = prop;
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const selectedType = useSelector((state) => state.resource.selectedType);
  const { activeEdit } = organization;
  const [loaderlmsImgUser, setLoaderlmsImgUser] = useState(false);
  const [stateOrgUsers, setStateOrgUsers] = useState([]);
  const [fileActive, setFileActive] = useState(null);

  const fileUpload = useRef();
  // const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (editMode) {
      setFileActive(selectedType?.css_path);
    } else {
      setFileActive(null);
    }
  }, [activeEdit, editMode]);
  return (
    <div className="create-form lms-admin-form">
      <Formik
        initialValues={{
          account_name: editMode ? activeEdit?.account_name : '',
          account_id: editMode ? activeEdit?.account_id : '',
          email: editMode ? activeEdit?.email : '',
          // user_id: editMode ? (clone ? '' : activeEdit?.user?.id) : '',
          studio_org_id: editMode ? activeEdit?.studio_org_id : '',
          secret: editMode ? activeEdit?.secret : '',
          access_key: editMode ? activeEdit?.access_key : '',
          description: editMode ? activeEdit?.description : '',
          name: editMode ? (clone ? '' : activeEdit?.user?.name) : '',
          lms_login_id: editMode ? activeEdit?.lms_login_id : '',
          file: editMode ? selectedType?.css_path : '',
          organization_id: organization?.activeOrganization?.id,
          activity_visibility: editMode ? (clone ? false : activeEdit?.activity_visibility) : false,
          playlist_visibility: editMode ? (clone ? false : activeEdit?.playlist_visibility) : false,
          project_visibility: editMode ? (clone ? false : activeEdit?.project_visibility) : false,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.account_name) {
            errors.account_name = 'required';
          }
          if (!values.account_id) {
            errors.account_id = 'required';
          }
          if (!values.account_id) {
            errors.account_id = 'required';
          }
          if (!values.email) {
            errors.email = 'required';
          }
          if (!values.studio_org_id) {
            errors.studio_org_id = 'required';
          }

          if (!values.lms_name) {
            errors.lms_name = 'required';
          }
          if (!values.secret) {
            errors.secret = 'required';
          }
          // if (!values.canvas) {
          //   errors.canvas = 'Required';
          // }
          if (!values.access_key) {
            errors.access_key = 'Required';
          }
          // if (!values.secret_key) {
          //   errors.secret_key = 'Required';
          // }
          // if (!values.description) {
          //   errors.description = 'Required';
          // }
          if (!values.user_id) {
            errors.user_id = 'Required';
          }
          if (!values.lms_login_id) {
            errors.lms_login_id = 'required';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (editMode && !clone) {
            Swal.fire({
              title: 'Users',
              icon: 'info',
              text: 'Updating User LMS Settings...',
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });

            const result = adminapi.updateLmsProject(organization?.activeOrganization?.id, activeEdit?.id, values);
            result.then((res) => {
              Swal.fire({
                icon: 'success',
                text: 'LMS settings edited successfully',
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
              title: 'Users',
              icon: 'info',
              text: 'Creating new user...',

              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const result = adminapi.createLmsProject(organization?.activeOrganization?.id, values);
            result.then((res) => {
              Swal.fire({
                icon: 'success',
                text: 'LMS settings added successfully',
              });
              dispatch(getLmsProject(organization?.activeOrganization?.id));
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
              <h2 style={{ marginBottom: '45px' }}>{editMode ? 'Add ' : 'Edit '} a new CSS</h2>

              <div className="create-form-inputs-group">
                {/* Left container */}
                <div style={{ marginRight: '64px' }}>
                  <div className="form-group-create">
                    <h3>Studio org ID</h3>
                    <input type="studio_org_id" name="studio_org_id" onChange={handleChange} onBlur={handleBlur} value={values.studio_org_id} />
                    <div className="error">{errors.studio_org_id && touched.studio_org_id && errors.studio_org_id}</div>
                  </div>
                  <div className="form-group-create">
                    <h3>Account ID</h3>
                    <input type="text" name="account_id" onChange={handleChange} onBlur={handleBlur} value={values.account_id} />
                    <div className="error">{errors.account_id && touched.account_id && errors.account_id}</div>
                  </div>

                  <div className="form-group-create">
                    <h3>BrightCove email ID</h3>
                    <input type="email" name="email" onChange={handleChange} onBlur={handleBlur} value={values.email} />
                    <div className="error">{errors.email && touched.email && errors.email}</div>
                  </div>

                  <div className="form-group-create">
                    <h3>Account name</h3>
                    <input type="text" name="account_name" onChange={handleChange} onBlur={handleBlur} value={values.account_name} />
                    <div className="error">{errors.account_name && touched.account_name && errors.account_name}</div>
                  </div>
                  <div className="form-group-create">
                    <h3>Description</h3>
                    <input type="text" name="description" onChange={handleChange} onBlur={handleBlur} value={values.description} />
                    <div className="error">{errors.description && touched.description && errors.description}</div>
                  </div>
                  <div className="form-group-create">
                    <h3> Key</h3>
                    <input type="text" name="access_key" onChange={handleChange} onBlur={handleBlur} value={values.access_key} />
                    <div className="error">{errors.access_key && touched.access_key && errors.access_key}</div>
                  </div>
                  <div className="form-group-create">
                    <h3> Secret</h3>
                    <input type="text" name="secret" onChange={handleChange} onBlur={handleBlur} value={values.secret} />
                    <div className="error">{errors.secret && touched.secret && errors.secret}</div>
                  </div>
                </div>
                {/* Right Container */}
                <div>
                  <div className="form-group-create">
                    <h3>Upload CSS file</h3>
                    <div className="img-upload-form file-upload">
                      <input
                        type="file"
                        name="file"
                        accept=".css"
                        onChange={(e) => {
                          if (!(e.target.files[0].type.includes('css') || e.target.files[0].type.includes('scss'))) {
                            Swal.fire({
                              icon: 'error',
                              title: 'Error',
                              text: 'Invalid file selected.',
                            });
                          } else if (e.target.files[0].size > 100000000) {
                            Swal.fire({
                              icon: 'error',
                              title: 'Error',
                              text: 'Selected file size should be less then 100MB.',
                            });
                          } else {
                            const formData = new FormData();
                            try {
                              formData.append('file', e.target.files[0]);
                              formData.append('fileName', e.target.files[0].name);
                              formData.append('typeName', values.title);
                              const fileurl = dispatch(uploadActivityTypeFileAction(formData));
                              fileurl.then((file) => {
                                setFileActive(file);
                                setFieldValue('css_path', file);
                              });
                            } catch (err) {
                              Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'File upload failed, kindly try again.',
                              });
                            }
                          }
                        }}
                        onBlur={handleBlur}
                        ref={fileUpload}
                        style={{ display: 'none' }}
                      />
                      {fileActive ? (
                        <>
                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                            }}
                          >
                            <img src={docAvatar} alt="" height="34" />
                            <p className="text-center">{fileActive.replace(/^.*[\\\/]/, '')}</p>
                          </div>
                          <div className="update-img" onClick={() => fileUpload.current.click()}>
                            Update File
                          </div>
                        </>
                      ) : (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                          }}
                          onClick={() => fileUpload.current.click()}
                        >
                          <img src={docAvatar} alt="" height="34" />
                          <p> Upload CSS file </p>
                        </div>
                      )}
                    </div>
                    <span className="upload-btn">
                      <img src={pcIcon} alt="" />
                      My device
                    </span>
                  </div>
                </div>
              </div>

              <div className="button-group">
                <button type="submit">{editMode ? 'Add ' : 'Edit '} CSS</button>
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

CreateBrightCove.propTypes = { editMode: false };

CreateBrightCove.propTypes = {
  editMode: PropTypes.bool,
};
