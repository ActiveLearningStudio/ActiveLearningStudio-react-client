import React, {
  useRef,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { Formik } from 'formik';
import { Dropdown, Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  updatePreviousScreen,
  uploadImage,
  updateOrganization,
  updateOrganizationScreen,
  updateFeedbackScreen,
  getRoles,
  getOrgUsers,
  setActiveOrganization,
} from 'store/actions/organization';
import imgAvatar from 'assets/images/img-avatar.png';

import AddUser from './addUser';
import AddAdmin from './addAdmin';

export default function EditOrganization() {
  const dispatch = useDispatch();
  const allListState = useSelector((state) => state.organization);
  const {
    editOrganization,
    activeOrganization,
    history,
    permission,
  } = allListState;
  const [imageActive, setImgActive] = useState(null);
  const [allUsersAdded, setAllUsersAdded] = useState([]);
  const [allAdminAdded, setAllAdminAdded] = useState([]);
  useMemo(() => {
    dispatch(updatePreviousScreen('all-list'));
    dispatch(getRoles());
    const resultUsers = dispatch(getOrgUsers(activeOrganization.id, 1));
    resultUsers.then((data) => {
      const allUsers = [];
      data.data?.map((adm) => {
        if (adm.organization_role !== 'Administrator') {
          const result = {
            value: {
              userInfo: adm,
            },
            role: {
              name: adm.organization_role,
              id: adm.organization_role_id,
            },
          };
          allUsers.push(result);
        }
        return true;
      });
      setAllUsersAdded(allUsers);
    });
  }, []);

  useEffect(() => {
    if (editOrganization) {
      const alladminList = [];
      editOrganization?.admins?.map((adm) => {
        const result = {
          value: {
            userInfo: adm,
          },
        };
        alladminList.push(result);
        return true;
      });
      setAllAdminAdded(alladminList);
      setImgActive(editOrganization.image);
    }
  }, [editOrganization]);

  const imgUpload = useRef();
  return (
    <div className="create-organizations">
      <h2>Edit Organization</h2>
      {permission?.Organization?.includes('organization:edit') ? (
        <Formik
          initialValues={{
            inviteUser: allUsersAdded,
            admin_id: editOrganization?.admins,
            name: editOrganization?.name,
            description: editOrganization?.description,
            image: editOrganization?.image,
            authority: false,
            parent_id: editOrganization?.parent?.id,
          }}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = 'Required';
            }
            if (!values.description) {
              errors.description = 'Required';
            }
            if (allAdminAdded.length === 0) {
              errors.admin_id = 'Required';
            }
            if (allUsersAdded.length === 0) {
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
            const result = await dispatch(updateOrganization(activeOrganization.id, values, allUsersAdded, allAdminAdded));
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
                    {permission?.Organization?.includes('organization:add-admin') && (
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Add new Admin
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <AddAdmin
                            setAllUsersAdded={setAllAdminAdded}
                            allUsersAdded={allAdminAdded}
                            setFieldValueProps={setFieldValue}
                            method="update"
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
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
                      autoComplete="off"
                      // value={values.inviteUser}
                      disabled
                    />
                    {permission?.Organization?.includes('organization:add-user') && (
                      <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                          Add new User
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <AddUser
                            setAllUsersAdded={setAllUsersAdded}
                            allUsersAdded={allUsersAdded}
                            method="update"
                          />
                        </Dropdown.Menu>
                      </Dropdown>
                    )}
                  </div>
                  <div className="error">
                    {errors.inviteUser && touched.inviteUser && errors.inviteUser}
                  </div>
                </div>
                <div className="btn-group">
                  <button className="submit-create" type="submit">
                    UPDATE ORGANIZATION
                  </button>
                  <button
                    className="cancel-create"
                    type="button"
                    onClick={() => {
                      if (history) {
                        dispatch(setActiveOrganization(history));
                      }
                      dispatch(updateOrganizationScreen('all-list'));
                    }}
                  >
                    CANCEL
                  </button>
                </div>
              </div>
              <div className="all-users-list">
                {allAdminAdded.length > 0 && (
                  <h2>
                    ALL ADMINS
                    {/* <span>
                      {allAdminAdded.length}
                    </span> */}
                  </h2>
                )}
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
                    {permission?.Organization?.includes('organization:delete-admin') && (
                      <p
                        onClick={() => {
                          setAllAdminAdded(allAdminAdded.filter((dataall) => dataall.value?.userInfo?.email !== data.value?.userInfo?.email));
                        }}
                      >
                        <FontAwesomeIcon icon="trash" />
                      </p>
                    )}
                  </div>
                ))}
                {allUsersAdded.length > 0 && (
                  <h2>
                    ALL USERS
                    {/* <span>
                      {allUsersAdded.length - allAdminAdded?.length}
                    </span> */}
                  </h2>
                )}
                {allUsersAdded.map((data) => (
                  data.role?.name !== 'Administrator' && (
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
                      {permission?.Organization?.includes('organization:delete-user') && (
                        <p
                          onClick={() => {
                            setAllUsersAdded(allUsersAdded.filter((dataall) => dataall.value?.userInfo?.email !== data.value?.userInfo?.email));
                          }}
                        >
                          <FontAwesomeIcon icon="trash" />
                        </p>
                      )}
                    </div>
                  )
                ))}
              </div>
            </form>
          )}
        </Formik>
      ) : <Alert variant="danger">You are not authorized to edit this Organization.</Alert>}
    </div>
  );
}
