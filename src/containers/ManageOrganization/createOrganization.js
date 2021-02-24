import React, { useRef } from 'react';
import { Formik } from 'formik';
import { Dropdown } from 'react-bootstrap';

import imgAvatar from 'assets/images/img-avatar.png';

import AddUser from './addUser';

export default function CreateOrganization() {
  const imgUpload = useRef();
  return (
    <div className="create-organizations">
      <h2>Create Organization</h2>
      <Formik
        initialValues={{
          name: '',
          description: '',
          admin: '',
          inviteUser: [],
          img: '',
          authority: false,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) {
            errors.name = 'Required';
          }
          if (!values.description) {
            errors.description = 'Required';
          }
          if (!values.admin) {
            errors.admin = 'Required';
          }
          if (values.inviteUser.length === 0) {
            errors.inviteUser = 'Required';
          }
          if (values.img) {
            errors.img = 'Required';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
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
                name="img"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.img}
                ref={imgUpload}
                style={{ display: 'none' }}
              />
              <img src={imgAvatar} alt="" onClick={() => imgUpload.current.click()} />
              <p>Upload Image</p>
              {errors.name && touched.name && errors.name}
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
                {errors.name && touched.name && errors.name}
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
                {errors.description && touched.description && errors.description}
              </div>
              <div className="form-group-create">
                <h3>Assign Admin</h3>
                <input
                  type="text"
                  name="admin"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.admin}
                />
                {errors.admin && touched.admin && errors.admin}
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
                {errors.inviteUser && touched.inviteUser && errors.inviteUser}
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
                  {errors.inviteUser && touched.inviteUser && errors.inviteUser}
                </div>
              </div>
              <div className="btn-group">
                <button className="submit-create" type="submit" disabled={isSubmitting}>
                  CREATE ORGANIZATION
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
