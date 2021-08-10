import React, { useEffect, useState, useRef } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { removeActiveAdminForm } from 'store/actions/admin';
import { visibilityTypes } from 'store/actions/project';
import imgAvatar from 'assets/images/img-avatar.png';
import loader from 'assets/images/dotsloader.gif';
import Swal from 'sweetalert2';
import { uploadThumb } from 'containers/Projects/CreateProjectPopup';
import Switch from 'react-switch';
import authapi from '../../../services/auth.service';

export default function EditProject() {
  const dispatch = useDispatch();
  // image Ref
  const imgUpload = useRef();
  const allListState = useSelector((state) => state.organization);
  // Visibility Dropdown
  const [visibilityTypeArray, setVisibilityTypeArray] = useState([]);
  // User Search variables
  const [loaderlmsImgUser, setLoaderlmsImgUser] = useState(false);
  const [stateOrgUsers, setStateOrgUsers] = useState([]);
  // General State to use
  const adminState = useSelector((state) => state.admin);
  const { currentProject } = adminState;
  console.log(currentProject);
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
          users: currentProject?.users[0],
          shared: currentProject.shared,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name || values.name.length > 255) {
            errors.name = values.name.length > 255 ? 'Length must be 255 characters or less ' : 'Required';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          console.log(values);
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
              <h3>Organization Name</h3>
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
              <h3>Organization Image</h3>
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
                      try {
                        formData.append('thumb', e.target.files[0]);
                        const imgurl = dispatch(
                          uploadThumb(
                            allListState.currentOrganization?.id,
                            formData,
                          ),
                        );
                        imgurl.then((img) => {
                          setFieldValue('thumb_url', img.data?.thumbUrl);
                        });
                      } catch (err) {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Image upload failed, kindly try again.',
                        });
                      }
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
                        backgroundImage: `url(${global.config.resourceUrl}${values.thumb_url})`,
                      }}
                    />
                    <div
                      className="update-img"
                      onClick={() => imgUpload.current.click()}
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
                  {errors.image && touched.image && errors.image}
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
              <h3>Organization Visibility Type</h3>
              <select name="organization_visibility_type_id" onChange={handleChange} onBlur={handleBlur} value={values.organization_visibility_type_id}>
                <option value="">---Select a visibility type---</option>
                {visibilityTypeArray?.length > 0 && visibilityTypeArray?.map((vT) => (
                  <option value={vT?.id} key={vT?.id}>{vT?.display_name}</option>
                ))}
              </select>
              <div className="error">
                {errors.role_id && touched.role_id && errors.role_id}
              </div>
            </div>
            <div className="form-group-create" style={{ position: 'relative' }}>
              <h3>Ownership&nbsp; (search users from dropdown list only)</h3>
              <input
                type="text"
                name="users"
                autoComplete="off"
                onChange={async (e) => {
                  setFieldValue('users', e.target.value);
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
                value={values.users.name}
              />
              {loaderlmsImgUser && <img src={loader} alt="" style={{ width: '25px' }} className="loader" />}
              {stateOrgUsers?.length > 0 && (
                <ul className="all-users-list">
                  {stateOrgUsers?.map((user) => (
                    <li
                      value={user}
                      onClick={() => {
                        setFieldValue('users', user);
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
                {errors.users && touched.users && errors.users}
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

};
