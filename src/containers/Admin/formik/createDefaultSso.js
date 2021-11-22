/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from 'store/actionTypes';

import { removeActiveAdminForm } from 'store/actions/admin';
import Swal from 'sweetalert2';
import authapi from '../../../services/auth.service';
import adminapi from '../../../services/admin.service';
import loader from 'assets/images/dotsloader.gif';
import Switch from 'react-switch';
import organizationsServices from 'services/organizations.services';

export default function CreateDefaultSso(prop) {
  const { editMode, method, clone } = prop;
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const { activeEdit } = organization;
  const [loaderlmsImgUser, setLoaderlmsImgUser] = useState(false);
  const [stateOrgSearch, setStateOrgSearch] = useState([]);
  const [checked, setChecked] = useState(false);
  const [organizationRole, setOrganizationRole] = useState([]);
  useEffect(() => {
    if (editMode && !clone) {
      setChecked(activeEdit?.published);
    }
  }, [activeEdit, editMode]);

  const getOrganazationRoles = (orgId) => {
    const result = organizationsServices.getRoles(orgId);
    result.then((role) => {
      setOrganizationRole(role.data);
    });
  }
  return (
    <div className="create-form">
      <Formik
        initialValues={{
          lms_url: editMode ? activeEdit?.lms_url : '',
          lms_access_token: editMode ? activeEdit?.lms_access_token : '',
          site_name: editMode ? activeEdit?.site_name : '',
          organization_id: editMode ? activeEdit?.organization_id : '',
          lti_client_id: editMode ? activeEdit?.lti_client_id : '',
          lms_name: editMode ? activeEdit?.lms_name || 'moodle' : 'moodle',
          lms_access_key: editMode ? activeEdit?.lms_access_key : '',
          lms_access_secret: editMode ? activeEdit?.lms_access_secret : '',
          description: editMode ? activeEdit?.description : '',
          name: editMode ? (clone ? '' : activeEdit?.organization?.name) : '',
          lti_client_id: editMode ? activeEdit?.lti_client_id : '',
          published: editMode ? (clone ? false : activeEdit?.published) : false,
          role_id: editMode ? activeEdit?.role_id : '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.lms_url) {
            errors.lms_url = 'required';
          }
          if (!values.lms_access_token) {
            errors.lms_access_token = 'required';
          }
          if (!values.lms_access_token) {
            errors.lms_access_token = 'required';
          }
          if (!values.site_name) {
            errors.site_name = 'required';
          }
          if (!values.lti_client_id) {
            errors.lti_client_id = 'required';
          }

          if (!values.lms_name) {
            errors.lms_name = 'required';
          }

          if (!values.organization_id) {
            errors.organization_id = 'required';
          }
          
          if (!values.role_id) {
            errors.role_id = 'required';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (editMode && !clone) {
            Swal.fire({
              title: 'Users',
              icon: 'info',
              text: 'Updating Default SSO ...',
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });

            const result = adminapi.updateDefaultSso(organization?.activeOrganization?.id, activeEdit?.id, values);
            result.then((res) => {
              Swal.fire({
                icon: 'success',
                text: res?.message,
              });
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
              text: 'Creating new SSO Integration...',

              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const result = adminapi.createDefaultSso(organization?.activeOrganization?.id, values);
            result.then((res) => {
              Swal.fire({
                icon: 'success',
                text: res?.message,
              });
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
            <h2>{editMode ? (clone ? 'Create ' : 'Edit ') : 'Create '}SSO Integration</h2>
            <div className="form-group-create">
              <h3>LMS URL</h3>
              <input type="text" name="lms_url" onChange={handleChange} onBlur={handleBlur} value={values.lms_url} />
              <div className="error">{errors.lms_url && touched.lms_url && errors.lms_url}</div>
            </div>
            <div className="form-group-create">
              <h3>LMS Access Token</h3>
              <input type="text" name="lms_access_token" onChange={handleChange} onBlur={handleBlur} value={values.lms_access_token} />
              <div className="error">{errors.lms_access_token && touched.lms_access_token && errors.lms_access_token}</div>
            </div>
            <div className="form-group-create">
              <h3>Site Name</h3>
              <input type="site_name" name="site_name" onChange={handleChange} onBlur={handleBlur} value={values.site_name} />
              <div className="error">{errors.site_name && touched.site_name && errors.site_name}</div>
            </div>
            {/* {!editMode ? */}
            <div className="form-group-create">
              <h3>LTI Client ID</h3>
              <input type="lti_client_id" name="lti_client_id" onChange={handleChange} onBlur={handleBlur} value={values.lti_client_id} />
              <div className="error">{errors.lti_client_id && touched.lti_client_id && errors.lti_client_id}</div>
            </div>
            {/* //   : null
                  // } */}
            <div className="form-group-create">
              <h3>LMS Name</h3>
              {/* <input
                      type="text"
                      name="role"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.role}
                    /> */}
              <select name="lms_name" onChange={handleChange} onBlur={handleBlur} value={values.lms_name}>
                <option defaultValue="moodle" value="moodle">
                  Moodle
                </option>
                <option value="canvas">Canvas</option>
                <option value="safarimontage">Safari Montage</option>
              </select>
              <div className="error">{errors.lms_name && touched.lms_name && errors.lms_name}</div>
            </div>
            <div className="form-group-create">
              <h3>Access Key</h3>
              <input type="text" name="lms_access_key" onChange={handleChange} onBlur={handleBlur} value={values.lms_access_key} />
              <div className="error">{errors.lms_access_key && touched.lms_access_key && errors.lms_access_key}</div>
            </div>
            <div className="form-group-create">
              <h3>Secret Key</h3>
              <input type="text" name="lms_access_secret" onChange={handleChange} onBlur={handleBlur} value={values.lms_access_secret} />
              <div className="error">{errors.lms_access_secret && touched.lms_access_secret && errors.lms_access_secret}</div>
            </div>
            <div className="form-group-create">
              <h3>Description</h3>
              <textarea type="text" name="description" onChange={handleChange} onBlur={handleBlur} value={values.description} />
              <div className="error">{errors.description && touched.description && errors.description}</div>
            </div>
            <div className="form-group-create">
              <h3>Published</h3>
              <Switch
                checked={checked}
                onChange={() => {
                  setChecked(!checked);
                  setFieldValue('published', !checked);
                }}
              />
            </div>
            <div className="form-group-create" style={{ position: 'relative' }}>
              <h3>Organization &nbsp; (search organization from dropdown list only)</h3>
              <input
                type="text"
                name="organization_id"
                autoComplete="off"
                onChange={async (e) => {
                  setFieldValue('name', e.target.value);
                  if (e.target.value == '') {
                    setStateOrgSearch([]);
                    return;
                  }
                  setLoaderlmsImgUser(true);
                  const orgApi = organizationsServices.searchOrganization(e.target.value);
                  orgApi.then((data) => {
                    setLoaderlmsImgUser(false);
                    setStateOrgSearch(data?.organization);
                  });
                }}
                onBlur={handleBlur}
                value={values.name}
              />

              {loaderlmsImgUser && <img src={loader} alt="" style={{ width: '25px' }} className="loader" />}
              {stateOrgSearch?.length > 0 && (
                <ul className="all-users-list">
                  {stateOrgSearch?.map((org) => (
                    <li
                      value={org}
                      onClick={() => {
                        setFieldValue('organization_id', org.id);
                        setFieldValue('name', org.name);
                        setStateOrgSearch([]);
                        getOrganazationRoles(org.id);
                      }}
                      key={org.id}
                    >
                      {org.name}
                      <p>
                        Domain: &nbsp;
                        {org.domain}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <div className="error">{errors.organization_id && touched.organization_id && errors.organization_id}</div>
            </div>
            {organizationRole.length > 0 && (
              <div className="form-group-create">
                <h3>Select Role</h3>
                <select name="role_id" onChange={handleChange} onBlur={handleBlur} value={values.role_id}>
                <option defaultValue="">Nothing selected</option>
                  {organizationRole.length > 0 && (
                    organizationRole?.map((role) => (
                      <option value={role.id} key={role.id}>{role.display_name}</option>
                    ))
                  )}
                </select>
                <div className="error">{errors.lms_name && touched.lms_name && errors.lms_name}</div>
              </div>
            )}
            <div className="button-group">
              <button type="submit">{editMode ? (clone ? 'Create ' : 'Edit ') : 'Create '}SSO Integration</button>
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

CreateDefaultSso.propTypes = {};
