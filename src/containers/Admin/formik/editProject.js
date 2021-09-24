import React, { useEffect, useState, useRef } from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { removeActiveAdminForm } from 'store/actions/admin';
import { updateProjectAction, visibilityTypes, uploadProjectThumbnailAction } from 'store/actions/project';
import imgAvatar from 'assets/images/img-avatar.png';
import loader from 'assets/images/dotsloader.gif';
import Swal from 'sweetalert2';

import Switch from 'react-switch';
import authapi from '../../../services/auth.service';

export default function EditProject(props) {
  const { setAllProjectTab, allProjectTab } = props;
  const dispatch = useDispatch();
  // image Ref
  const imgUpload = useRef();
  // Visibility Dropdown
  const [visibilityTypeArray, setVisibilityTypeArray] = useState([]);
  // User Search variables
  const [loaderlmsImgUser, setLoaderlmsImgUser] = useState(false);
  const [stateOrgUsers, setStateOrgUsers] = useState([]);
  // General State to use
  const adminState = useSelector((state) => state.admin);
  const { currentProject } = adminState;
  useEffect(() => {
    (async () => {
      const { data } = await dispatch(visibilityTypes());
      setVisibilityTypeArray(data.data);
    })();
  }, [dispatch]);
  return (
    <div className="create-form">
      <Formik
        initialValues={{
          name: currentProject.name,
          description: currentProject?.description,
          thumb_url: currentProject.thumb_url,
          organization_visibility_type_id: currentProject.organization_visibility_type_id,
          username: currentProject?.users?.[0]?.name,
          user_id: currentProject?.users?.[0]?.id,
          shared: currentProject.shared,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name || values.name.length > 255) {
            errors.name = values.name.length > 255 ? 'Length must be 255 characters or less ' : 'Required';
          }
          if (!values.description || values.description.length > 255) {
            errors.description = values.description.length > 255 ? 'Length must be 255 characters or less ' : 'Required';
          }
          if (!values.organization_visibility_type_id) {
            errors.organization_visibility_type_id = 'Required';
          }
          if (!values.username) {
            errors.username = 'Required';
          }
          if (!values.thumb_url) {
            errors.thumb_url = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          Swal.fire({
            title: 'Projects',
            icon: 'info',
            text: 'Updating Project...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
            button: false,
          });
          // eslint-disable-next-line no-param-reassign
          delete values.username;
          const response = await dispatch(updateProjectAction(currentProject.id, values));
          if (!response.errors) {
            Swal.fire({
              text: 'You have successfully updated the project!',
              icon: 'success',
              showCancelButton: false,
              confirmButtonColor: '#084892',
              confirmButtonText: 'OK',
            }).then(async (result) => {
              if (result.isConfirmed) {
                setAllProjectTab({
                  ...allProjectTab,
                  data: allProjectTab.data.map((eachProject) => {
                    if (eachProject.id === response.id) {
                      return response;
                    }
                    return eachProject;
                   }),
                });
                dispatch(removeActiveAdminForm());
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
          <form onSubmit={handleSubmit} autoComplete="off">
            <h2>
              Edit Project
            </h2>
            <div className="form-group-create">
              <h3>Project Name</h3>
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
              <h3>Project Image</h3>
              <div
                className="img-upload-form"
                onClick={() => imgUpload.current.click()}
              >
                <input
                  type="file"
                  name="thumb_url"
                  onChange={(e) => {
                    if (
                      !(
                        e.target.files[0].type.includes('png')
                        || e.target.files[0].type.includes('jpg')
                        || e.target.files[0].type.includes('gif')
                        || e.target.files[0].type.includes('jpeg')
                      )
                    ) {
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
                      // try {
                        formData.append('thumb', e.target.files[0]);
                        const result = dispatch(uploadProjectThumbnailAction(formData));
                        result.then((img) => {
                          setFieldValue('thumb_url', img);
                        });
                    }
                  }}
                  onBlur={handleBlur}
                  ref={imgUpload}
                  style={{ display: 'none' }}
                />
                {values.thumb_url ? (
                  <>
                    <div
                      className="playimg"
                      style={{
                        backgroundImage: `${values.thumb_url.includes('pexels') ? `url(${values.thumb_url})` : `url(${global.config.resourceUrl}${values.thumb_url})` }`,
                      }}
                    />
                    <div
                      className="update-img"
                      // onClick={() => imgUpload.current.click()}
                    >
                      Update Image
                    </div>
                  </>
                ) : (
                  <>
                    <img src={imgAvatar} alt="" />
                    <p>Upload Image</p>
                  </>
                )}
                <div className="error">
                  {errors.thumb_url && touched.thumb_url && errors.thumb_url}
                </div>
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
                {errors.description && touched.description && errors.description}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Project Visibility Type</h3>
              <select name="organization_visibility_type_id" onChange={handleChange} onBlur={handleBlur} value={values.organization_visibility_type_id}>
                {visibilityTypeArray?.length > 0 && visibilityTypeArray?.map((vT) => (
                  <option value={vT?.id} key={vT?.id}>{vT?.display_name}</option>
                ))}
              </select>
              <div className="error">
                {errors.organization_visibility_type_id && touched.organization_visibility_type_id && errors.organization_visibility_type_id}
              </div>
            </div>
            <div className="form-group-create" style={{ position: 'relative' }}>
              <h3>Ownership&nbsp; (search users from dropdown list only)</h3>
              <input
                type="text"
                name="username"
                autoComplete="off"
                onChange={async (e) => {
                  setFieldValue('username', e.target.value);
                  if (e.target.value === '') {
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
                value={values.username}
              />
              {loaderlmsImgUser && <img src={loader} alt="" style={{ width: '25px' }} className="loader" />}
              {stateOrgUsers?.length > 0 && (
                <ul className="all-users-list">
                  {stateOrgUsers?.map((user) => (
                    <li
                      value={user}
                      onClick={() => {
                        setFieldValue('user_id', user.id);
                        setFieldValue('username', user.first_name);
                        setStateOrgUsers([]);
                      }}
                    >
                      {user.first_name}
                      <p>
                        Email:
                        &nbsp;
                        {user.email}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <div className="error">
                {errors.username && touched.username && errors.username}
              </div>
            </div>
            <div className="form-group-create">
              <h3>Shared</h3>
              <Switch
                checked={values.shared}
                onChange={() => {
                    setFieldValue('shared', !values.shared);
                }}
              />
            </div>
            <div className="button-group">
              <button type="submit">
                Save Changes
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

EditProject.propTypes = {
  setAllProjectTab: PropTypes.func.isRequired,
  allProjectTab: PropTypes.object.isRequired,
};
