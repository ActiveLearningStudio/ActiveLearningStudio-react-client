import React, { useRef, useMemo, useState } from 'react';
import { Formik } from 'formik';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

import {
  updatePreviousScreen,
  uploadImage,
  updateOrganization,
  updateOrganizationScreen,
  updateFeedbackScreen,
} from 'store/actions/organization';
import imgAvatar from 'assets/images/img-avatar.png';

import AddUser from './addUser';

export default function EditOrganization() {
  const dispatch = useDispatch();
  const allListState = useSelector((state) => state.organization);
  const { editOrganization } = allListState;
  const [imageActive, setImgActive] = useState(editOrganization?.image);
  useMemo(() => {
    dispatch(updatePreviousScreen('all-list'));
  }, []);
  const imgUpload = useRef();
  return (
    <div className="create-organizations">
      <h2>Edit Organization</h2>
      <Formik
        initialValues={{
          name: editOrganization?.name,
          description: editOrganization?.description,
          inviteUser: ['qamar'],
          image: editOrganization?.image,
          authority: false,
          domain: editOrganization?.domain,
          admin_id: 1,
          parent_id: editOrganization?.id,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          if (!values.description) {
            errors.description = 'Required';
          }
          if (!values.admin_id) {
            errors.admin_id = 'Required';
          }
          if (values.inviteUser.length === 0) {
            errors.inviteUser = 'Required';
          }
          if (!values.image) {
            errors.image = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          Swal.fire({
            title: 'Please Wait !',
            html: 'Updating Organization ...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          });
          const result = await dispatch(updateOrganization(values, editOrganization.id));
          Swal.close();
          if (result) {
            dispatch(updateOrganizationScreen('feedback'));
            dispatch(updateFeedbackScreen('update'));
            dispatch(updatePreviousScreen('create-org'));
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
          isSubmitting,
          setFieldValue,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="inital-form">
            <div className="img-upload-form">
              <input
                type="file"
                name="image"
                onChange={(e) => {
                  if (!(e.target.files[0].type.includes('png') || e.target.files[0].type.includes('jpg')
                  || e.target.files[0].type.includes('gif') || e.target.files[0].type.includes('jpeg'))) {
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
                      const imgurl = dispatch(uploadImage(allListState.currentOrganization?.id, formData));
                      imgurl.then((img) => {
                        setImgActive(img.data?.thumbUrl);
                        setFieldValue('image', img.data?.thumbUrl);
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
              {imageActive ? (
                <>
                  <div
                    className="playimg"
                    style={{
                      backgroundImage: `url(${global.config.resourceUrl}${imageActive})`,
                    }}
                  />
                  <div className="update-img" onClick={() => imgUpload.current.click()}>
                    Update Image
                  </div>
                </>
              ) : (
                <>
                  <img src={imgAvatar} alt="" onClick={() => imgUpload.current.click()} />
                  <p>Upload Image</p>
                </>
              )}
              <div className="error">
                {errors.image && touched.image && errors.image}
              </div>
            </div>
            <div className="data-input">
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
                <h3>Description</h3>
                <textarea
                  type="description"
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
                <h3>Assign Admin</h3>
                <input
                  type="text"
                  name="adadmin_idmin"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.admin_id}
                />
                <div className="error">
                  {errors.admin_id && touched.admin_id && errors.admin_id}
                </div>
              </div>
              <div className="form-group-create">
                <h3>Invite User</h3>
                <div className="add-user-btn">
                  <input
                    type="text"
                    name="inviteUser"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.inviteUser}
                    disabled
                  />
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      Add new User
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <AddUser />
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="error">
                  {errors.inviteUser && touched.inviteUser && errors.inviteUser}
                </div>
              </div>
              <div className="form-group-create radio-create">
                <p>Will you manage and create projects, users, groups and teams in this organization?</p>
                <div className="form-grp-rad">
                  <label>
                    <input
                      type="radio"
                      name="authority"
                      value={values.authority}
                      checked={values.authority === true}
                      onChange={() => setFieldValue('authority', true)}
                    />
                    Yes, I will
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="authority"
                      value={values.authority}
                      checked={values.authority === false}
                      onChange={() => setFieldValue('authority', false)}
                    />
                    No, I’ll assign those capabilities to organization Admin
                  </label>
                </div>
              </div>
              <div className="btn-group">
                <button className="submit-create" type="submit" disabled={isSubmitting}>
                  UPDATE ORGANIZATION
                </button>
                <button className="cancel-create" type="button" disabled={isSubmitting}>
                  CANCEL
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
