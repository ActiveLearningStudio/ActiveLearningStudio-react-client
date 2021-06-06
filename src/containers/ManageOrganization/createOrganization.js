import React, { useRef, useMemo, useState } from 'react';
import { Formik } from 'formik';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  updatePreviousScreen,
  uploadImage,
  createOrganizationNew,
  updateOrganizationScreen,
  updateFeedbackScreen,
  checkBranding,
  getRoles,
  setActiveOrganization,
} from 'store/actions/organization';
import imgAvatar from 'assets/images/img-avatar.png';
import loader from 'assets/images/dotsloader.gif';

import AddUser from './addUser';
import AddAdmin from './addAdmin';

export default function CreateOrganization() {
  const dispatch = useDispatch();
  const allListState = useSelector((state) => state.organization);
  const [toggleAdminDropdown, setToggleAdminDropdown] = useState(false);
  const [toggleUserDropdown, setToggleUserDropdown] = useState(false);
  const [imageActive, setImgActive] = useState(null);
  const [loaderImg, setLoaderImg] = useState(false);
  const [allUsersAdded, setAllUsersAdded] = useState([]);
  const [allAdminAdded, setAllAdminAdded] = useState([]);
  const { history } = allListState;
  useMemo(() => {
    dispatch(updatePreviousScreen('all-list'));
    dispatch(getRoles());
  }, []);
  const imgUpload = useRef();
  return (
    <div className="create-organizations">
      <h2>Create Organization</h2>
      <Formik
        initialValues={{
          name: '',
          description: '',
          inviteUser: allUsersAdded,
          image: '',
          domain: '',
          admin_id: allAdminAdded,
          parent_id: allListState.activeOrganization.id,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          if (!values.description) {
            errors.description = 'Required';
          }
          if (values.admin_id.length === 0) {
            errors.admin_id = 'Required';
          }
          if (values.inviteUser.length === 0) {
            errors.inviteUser = 'Required';
          }
          if (!values.image) {
            errors.image = 'Required';
          }
          if (!values.domain) {
            errors.domain = 'Required';
          } else if (values.domain?.length < 2) {
            errors.domain = 'Character limit should be greater then one';
          } else if (values.domain === true) {
            errors.domain = 'Domain already taken, Kindly try again.';
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          Swal.fire({
            title: 'Please Wait !',
            html: 'Creating Organization ...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
              Swal.showLoading();
            },
          });
          const result = await dispatch(createOrganizationNew(values, allUsersAdded, allAdminAdded));
          Swal.close();
          if (result) {
            dispatch(updateOrganizationScreen('feedback'));
            dispatch(updateFeedbackScreen('create'));
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
          setFieldValue,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit} className="inital-form">
            <div className="img-upload-form" onClick={() => imgUpload.current.click()}>
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
                  <img src={imgAvatar} alt="" />
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
                  autoComplete="off"
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
                  autoComplete="off"
                />
                <div className="error">
                  {errors.description && touched.description && errors.description}
                </div>
              </div>
              <div className="form-group-create">
                <h3>Assign Admin</h3>
                <div className="add-user-btn">
                  <input
                    type="text"
                    name="admin_id"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    // value={values.admin_id}
                    disabled
                    autoComplete="off"
                  />
                  <Dropdown show={toggleAdminDropdown}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={() => setToggleAdminDropdown(!toggleAdminDropdown)}>
                      Add new Admin
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <AddAdmin
                        setAllUsersAdded={setAllAdminAdded}
                        allUsersAdded={allAdminAdded}
                        setToggleAdminDropdown={setToggleAdminDropdown}
                        setFieldValueProps={setFieldValue}
                        method="create"
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="error">
                  {errors.admin_id && touched.admin_id && errors.admin_id}
                </div>
              </div>
              <div className="form-group-create">
                <h3>Domain</h3>
                <input
                  type="text"
                  name="domain"
                  autoComplete="off"
                  onChange={(e) => {
                    if (e.target.value.length > 1) {
                      const inputValue = e.target.value;
                      setLoaderImg(true);
                      const result = dispatch(checkBranding(e.target.value));
                      result.then(() => {
                        setLoaderImg(false);
                        setFieldValue('domain', true);
                      }).catch((err) => {
                        if (err.errors) {
                          setLoaderImg(false);
                          setFieldValue('domain', inputValue);
                        }
                      });
                    } else {
                      setFieldValue('domain', e.target?.value);
                    }
                  }}
                  onBlur={handleBlur}
                  // value={values.admin}
                />
                {loaderImg && <img src={loader} alt="" className="loader" />}
                <div className="error">
                  {errors.domain && touched.domain && errors.domain}
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
                    autoComplete="off"
                    // value={values.inviteUser}
                    disabled
                  />
                  <Dropdown show={toggleUserDropdown}>
                    <Dropdown.Toggle variant="success" id="dropdown-basic" onClick={() => setToggleUserDropdown(!toggleUserDropdown)}>
                      Add new User
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <AddUser
                        setAllUsersAdded={setAllUsersAdded}
                        allUsersAdded={allUsersAdded}
                        allAdminAdded={allAdminAdded}
                        setToggleUserDropdown={setToggleUserDropdown}
                        setFieldValueProps={setFieldValue}
                        method="create"
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
                <div className="error">
                  {errors.inviteUser && touched.inviteUser && errors.inviteUser}
                </div>
              </div>
              <div className="btn-group">
                <button className="submit-create" type="submit">
                  CREATE ORGANIZATION
                </button>
                <button
                  className="cancel-create"
                  type="button"
                  onClick={() => {
                    if (history) {
                      dispatch(setActiveOrganization(history));
                      dispatch(updateOrganizationScreen('all-list'));
                    } else {
                      dispatch(updateOrganizationScreen('intro'));
                    }
                  }}
                >
                  CANCEL
                </button>
              </div>
            </div>
            <div className="all-users-list">
              {allAdminAdded.length > 0 && <h2>ALL ADMINS</h2>}
              {allAdminAdded.map((data) => (
                <div className="box-adder">
                  <h5>
                    <p>Name </p>
                    {data.value?.userInfo?.first_name}
                  </h5>
                  <h5>
                    <p>Email </p>
                    {data.value?.userInfo?.email}
                  </h5>
                  <h5>
                    <p>Role </p>
                    Administrator
                  </h5>
                  <p
                    onClick={() => {
                      setAllAdminAdded(allAdminAdded.filter((dataall) => dataall.value?.userInfo?.email !== data.value?.userInfo?.email));
                    }}
                  >
                    <FontAwesomeIcon icon="trash" />
                  </p>
                </div>
              ))}
              {allUsersAdded.length > 0 && <h2>ALL USERS</h2>}
              {allUsersAdded.map((data) => (
                <div className="box-adder">
                  <h5>
                    <p>Name </p>
                    {data.value?.userInfo?.first_name}
                  </h5>
                  <h5>
                    <p>Email </p>
                    {data.value?.userInfo?.email}
                  </h5>
                  <h5>
                    <p>Role </p>
                    {data.role?.name}
                  </h5>
                  <p
                    onClick={() => {
                      setAllUsersAdded(allUsersAdded.filter((dataall) => dataall.value?.userInfo?.email !== data.value?.userInfo?.email));
                    }}
                  >
                    <FontAwesomeIcon icon="trash" />
                  </p>
                </div>
              ))}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}
