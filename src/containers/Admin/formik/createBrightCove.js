/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { removeActiveAdminForm } from 'store/actions/admin';
import { addBrightCove, editBrightCove } from 'store/actions/videos';
import Swal from 'sweetalert2';
import authapi from '../../../services/auth.service';
import docAvatar from 'assets/images/upload-files.png';
import pcIcon from 'assets/images/pc-icon.png';
import loader from 'assets/images/dotsloader.gif';
import adminapi from '../../../services/videos.services';

export default function CreateBrightCove({ editMode, clone }) {
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const { id } = useSelector((state) => state.auth.user);
  const { activeEdit, activeOrganization } = organization;
  const [fileActive, setFileActive] = useState(null);
  const [loaderlmsImgUser, setLoaderlmsImgUser] = useState(false);
  const fileUpload = useRef();
  const [stateOrgUsers, setStateOrgUsers] = useState([]);
  // const [checked, setChecked] = useState(false);
  useEffect(() => {
    if (editMode) {
      setFileActive(activeEdit?.css_path);
    } else {
      setFileActive(null);
    }
  }, [activeEdit, editMode]);

  return (
    <div className="create-form lms-admin-form">
      <Formik
        initialValues={{
          organization_id: editMode ? activeEdit?.organization_id : clone ? activeEdit?.organization_id : activeOrganization.id,
          user_id: editMode ? activeEdit?.user_id : '',
          account_id: editMode ? activeEdit?.account_id : clone ? activeEdit?.account_id : '',
          account_name: editMode ? activeEdit?.account_name : clone ? activeEdit?.account_name : '',
          account_email: editMode ? activeEdit?.account_email : clone ? activeEdit?.account_email : '',
          client_id: editMode ? activeEdit?.client_id : clone ? activeEdit?.client_id : '',
          client_secret: editMode ? activeEdit?.client_secret : clone ? activeEdit?.client_secret : '',
          description: editMode ? activeEdit?.description : clone ? activeEdit?.description : '',
          css_path: editMode ? activeEdit?.css_path : clone ? activeEdit?.css_path : undefined,
          name: editMode ? activeEdit?.user?.name : '',
        }}
        enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.organization_id) {
            errors.organization_id = 'required';
          }
          if (!values.account_id) {
            errors.account_id = 'required';
          }
          if (!values.account_id) {
            errors.account_id = 'required';
          }
          if (!values.account_name) {
            errors.account_name = 'required';
          }
          if (!values.account_email) {
            errors.account_email = 'required';
          }

          if (!values.client_id) {
            errors.client_id = 'required';
          }
          if (!values.client_secret) {
            errors.client_secret = 'required';
          }

          if (!values.description) {
            errors.description = 'Required';
          }
          if (!values.user_id) {
            errors.user_id = 'Required';
          }

          return errors;
        }}
        onSubmit={async (values) => {
          if (editMode) {
            Swal.fire({
              icon: 'info',
              text: 'Updating BrightCove  Settings...',
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const result = await dispatch(editBrightCove(organization?.activeOrganization?.id, activeEdit?.id, values));
            if (result?.data) {
              dispatch(removeActiveAdminForm());
              Swal.fire({
                icon: 'success',
                text: 'BrightCove settings updated successfully',
                confirmButtonText: 'Close',
                customClass: {
                  confirmButton: 'confirmation-close-btn',
                },
              });
            }
          } else {
            Swal.fire({
              icon: 'info',
              text: 'Creating new Setting...',

              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const result = await dispatch(addBrightCove(organization?.activeOrganization?.id, values));

            if (result?.data) {
              dispatch(removeActiveAdminForm());
              Swal.fire({
                icon: 'success',
                text: 'BrightCove settings created successfully',
                confirmButtonText: 'Close',
                customClass: {
                  confirmButton: 'confirmation-close-btn',
                },
              });
            }
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
              <h2 style={{ marginBottom: '45px' }}>{editMode ? 'Edit BrightCove entry' : 'Add new BrightCove entry'}</h2>

              <div className="create-form-inputs-group">
                {/* Left container */}
                <div style={{ marginRight: '64px' }}>
                  <div className="form-group-create">
                    <h3>Account ID</h3>
                    <input type="text" name="account_id" onChange={handleChange} onBlur={handleBlur} value={values.account_id} />
                    <div className="error">{errors.account_id && touched.account_id && errors.account_id}</div>
                  </div>

                  <div className="form-group-create">
                    <h3>BrightCove email ID</h3>
                    <input type="email" name="account_email" onChange={handleChange} onBlur={handleBlur} value={values.account_email} />
                    <div className="error">{errors.account_email && touched.account_email && errors.account_email}</div>
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
                    <input type="text" name="client_id" onChange={handleChange} onBlur={handleBlur} value={values.client_id} />
                    <div className="error">{errors.client_id && touched.client_id && errors.client_id}</div>
                  </div>
                  <div className="form-group-create">
                    <h3> Secret</h3>
                    <input type="text" name="client_secret" onChange={handleChange} onBlur={handleBlur} value={values.client_secret} />
                    <div className="error">{errors.client_secret && touched.client_secret && errors.client_secret}</div>
                  </div>
                  <div className="form-group-create">
                    <h3>
                      User{' '}
                      <div>
                        <small>Search users from dropdown list only</small>
                      </div>
                    </h3>
                    <input
                      type="text"
                      name="name"
                      autoComplete="off"
                      onChange={async (e) => {
                        setFieldValue('name', e.target.value);
                        // eslint-disable-next-line eqeqeq
                        if (e.target.value == '') {
                          setStateOrgUsers([]);
                          return;
                        }
                        setLoaderlmsImgUser(true);
                        const lmsApi = authapi.searchUsers(e.target.value);
                        lmsApi.then((data) => {
                          setLoaderlmsImgUser(false);

                          setStateOrgUsers(data?.users);
                        });
                      }}
                      onBlur={handleBlur}
                      value={values.name}
                    />
                    {loaderlmsImgUser && <img src={loader} alt="" style={{ width: '25px' }} className="loader" />}
                    {stateOrgUsers?.length > 0 && (
                      <ul className="all-users-list">
                        {stateOrgUsers?.map((user) => (
                          <li
                            value={user}
                            onClick={() => {
                              setFieldValue('user_id', user.id);
                              setFieldValue('name', user.first_name);
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
                    <div className="error">{errors.user_id && touched.user_id && errors.user_id}</div>
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
                          if (!e.target.files[0].type.includes('css')) {
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
                              const fileurl = adminapi.uploadCSSFile(formData);
                              fileurl.then((file) => {
                                console.log(file);
                                setFileActive(file.file);
                                setFieldValue('css_path', file.file);
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
                            <p className="text-center">{fileActive?.replace(/^.*[\\/]/, '')}</p>
                          </div>
                          <div className="update-img">Update File</div>
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
                    <span onClick={() => fileUpload.current.click()} className="upload-btn">
                      <img src={pcIcon} alt="" />
                      My device
                    </span>
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

CreateBrightCove.propTypes = {
  editMode: PropTypes.bool,
};

CreateBrightCove.defaultProps = { editMode: false };
