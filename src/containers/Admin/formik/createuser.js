/* eslint-disable */
import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Dropdown } from 'react-bootstrap';
import { addUserInOrganization, editUserInOrganization, removeActiveAdminForm } from 'store/actions/admin';
import Swal from 'sweetalert2';
import { loadOrganizationTypesAction } from 'store/actions/auth';
import { getOrgUsers } from 'store/actions/organization';
import checkImg from 'assets/images/svg/check.svg';
import warningSVG from 'assets/images/svg/warning.svg';
import './createuser.scss';

export default function CreateUser(prop) {
  const { editMode, checkedEmail, existingUser } = prop;
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const organizationTypes = useSelector((state) => state.auth.organizationTypes);
  const { roles } = organization;
  const adminState = useSelector((state) => state.admin);
  const { currentUser } = adminState;
  useEffect(() => {
    dispatch(loadOrganizationTypesAction());
  }, []);
  const validatePassword = (pwd) => {
    // eslint-disable-next-line quotes
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    return regex.test(pwd);
  };
  return (
    <div className="create-form">
      <Formik
        initialValues={{
          first_name: editMode || existingUser ? currentUser?.first_name : '',
          last_name: editMode || existingUser ? currentUser?.last_name : '',
          user_id: editMode || existingUser ? currentUser?.id : '',
          organization_type: editMode || existingUser ? currentUser?.organization_type : '',
          organization_name: editMode || existingUser ? currentUser?.organization_name : '',
          job_title: editMode || existingUser ? currentUser?.job_title : '',
          role_id: editMode || existingUser ? currentUser?.organization_role_id : '',
          email: editMode || existingUser ? currentUser?.email : checkedEmail,
          send_email: false,
          message: '',
          password: undefined,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.first_name || values.first_name.trim() === '' || values.first_name.length > 255) {
            errors.first_name = values.first_name.length > 255 ? 'Length must be 255 characters or less ' : 'Required';
          }
          if (!values.last_name || values.last_name.trim() === '' || values.last_name.length > 255) {
            errors.last_name = values.last_name.length > 255 ? 'Length must be 255 characters or less ' : 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.password && !editMode && !existingUser) {
            errors.password = 'Required';
          }
          if (values.password) {
            if (!validatePassword(values.password)) {
              errors.password = 'Password must be more than 8 characters long, should contain at-least 1 Uppercase, 1 Lowercase and 1 Numeric character.';
            }
          }
          if (!values.role_id) {
            errors.role_id = 'Required';
          }
          if (!values.organization_type) {
            errors.organization_type = 'Required';
          }
          if (!values.organization_name || values.organization_name.trim() === '' || values.organization_name.length > 255) {
            errors.organization_name = values.organization_name.length > 255 ? 'Length must be 255 characters or less ' : 'Required';
          }
          if (!values.job_title || values.job_title.trim() === '' || values.job_title.length > 255) {
            errors.job_title = values.job_title.length > 255 ? 'Length must be 255 characters or less ' : 'Required';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (editMode) {
            Swal.fire({
              title: 'Users',
              icon: 'info',
              text: 'Updating User...',
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const response = await dispatch(editUserInOrganization(values));
            if (response) {
              Swal.fire({
                text: 'User edited successfully',
                title: `<img src="${checkImg}" />`,
                showCancelButton: false,
                confirmButtonText: 'Close',
                customClass: {
                  confirmButton: 'create-user-confirm-btn',
                  content: 'create-user-confirm-modal-content',
                  htmlContainer: 'create-user-confirm-modal-content',
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(getOrgUsers(organization?.activeOrganization?.id, organization?.activePage, organization?.activeRole));
                  dispatch(removeActiveAdminForm());
                }
              });
            }
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
            const response = await dispatch(addUserInOrganization(values));
            if (response) {
              Swal.fire({
                text: 'User added successfully',
                // icon: 'success',
                title: `<img src="${checkImg}" />`,
                showCancelButton: false,
                confirmButtonText: 'Close',
                customClass: {
                  confirmButton: 'create-user-confirm-btn',
                  content: 'create-user-confirm-modal-content',
                  htmlContainer: 'create-user-confirm-modal-content',
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(getOrgUsers(organization?.activeOrganization?.id, organization?.activePage, organization?.activeRole));
                  dispatch(removeActiveAdminForm());
                }
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
          <form onSubmit={handleSubmit} autoComplete="off">
            <h2>{editMode ? 'Edit ' : 'Add '} user</h2>
            <div className="row">
              <div className="col">
                <div className="form-group-create">
                  <h3>First name</h3>
                  <input type="text" name="first_name" onChange={handleChange} onBlur={handleBlur} value={values.first_name} />
                  <div className="error">{errors.first_name && touched.first_name && errors.first_name}</div>
                </div>
                <div className="form-group-create">
                  <h3>Last name</h3>
                  <input type="text" name="last_name" onChange={handleChange} onBlur={handleBlur} value={values.last_name} />
                  <div className="error">{errors.last_name && touched.last_name && errors.last_name}</div>
                </div>
                <div className="form-group-create">
                  <h3>Email</h3>
                  <input type="email" name="email" onChange={handleChange} autoComplete="nope" onBlur={handleBlur} value={values.email} readOnly={!editMode} />
                  <div className="error">{errors.email && touched.email && errors.email}</div>
                </div>
                <div className="form-group-create">
                  <h3>Password</h3>
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder={editMode || existingUser ? 'Leave blank for unchanged' : 'Password'}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <div className="error">{errors.password && touched.password && errors.password}</div>
                </div>
                <div className="form-group-create">
                  <h3>Role</h3>
                  <div className="filter-dropdown-user" id="filter-dropdown-user-id-style">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">{roles?.length > 0 && roles?.find((role) => role.id === values.role_id)?.display_name}</Dropdown.Toggle>
                      <Dropdown.Menu>
                        {roles?.length > 0 &&
                          roles?.map((role) => (
                            <Dropdown.Item key={role?.id} onClick={() => setFieldValue('role_id', role.id)}>
                              {role?.display_name}
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="error">{errors.role_id && touched.role_id && errors.role_id}</div>
                </div>
                <div className="form-group-create">
                  <h3>Organization type</h3>
                  <div className="filter-dropdown-user" id="filter-dropdown-user-id-style">
                    <Dropdown>
                      <Dropdown.Toggle id="dropdown-basic">
                        {organizationTypes?.length > 0 && organizationTypes?.find((type) => type.label === values.organization_type)?.label}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {organizationTypes?.length > 0 &&
                          organizationTypes?.map((type) => (
                            <Dropdown.Item key={type?.label} onClick={() => setFieldValue('organization_type', type.label)}>
                              {type?.label}
                            </Dropdown.Item>
                          ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="error">{errors.organization_type && touched.organization_type && errors.organization_type}</div>
                </div>
                <div className="form-group-create">
                  <h3>Organization name</h3>
                  <input type="text" name="organization_name" onChange={handleChange} onBlur={handleBlur} value={values.organization_name} />
                  <div className="error">{errors.organization_name && touched.organization_name && errors.organization_name}</div>
                </div>
                <div className="form-group-create">
                  <h3>Job title</h3>
                  <input type="text" name="job_title" onChange={handleChange} onBlur={handleBlur} value={values.job_title} />
                  <div className="error">{errors.job_title && touched.job_title && errors.job_title}</div>
                </div>
                {!editMode && (
                  <>
                    <div className="form-group-create">
                      <h3>Message</h3>
                      <textarea name="message" onChange={handleChange} onBlur={handleBlur} value={values.message} />
                    </div>
                    <div className="form-group-create row-checkbox">
                      <input type="checkbox" value={values.send_email} onChange={handleChange} name="send_email" />
                      <div>Send email to user</div>
                    </div>
                  </>
                )}
                {existingUser && (
                  <div className="form-group-create">
                    <Alert variant="warning">
                      <img className="warning-img" src={warningSVG} alt="warning" />
                      This user already exists in another organization.
                      <br />
                      Do you want to add the user to this org?
                    </Alert>
                  </div>
                )}
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
          </form>
        )}
      </Formik>
    </div>
  );
}

CreateUser.propTypes = {};
