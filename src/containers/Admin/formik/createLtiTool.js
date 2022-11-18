/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as actionTypes from 'store/actionTypes';
import { Dropdown } from 'react-bootstrap';
import { removeActiveAdminForm } from 'store/actions/admin';
import Swal from 'sweetalert2';
import loader from 'assets/images/dotsloader.gif';
import { toolTypeArray } from 'utils';
import authapi from '../../../services/auth.service';
import adminapi from '../../../services/admin.service';
import './createuser.scss';

export default function CreateLtiTool(prop) {
  const { editMode, clone } = prop;
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const loggedUser = useSelector((state) => state.auth.user);
  const { activeEdit } = organization;
  const [loaderlmsImgUser, setLoaderlmsImgUser] = useState(false);
  const [stateOrgUsers, setStateOrgUsers] = useState([]);
  const [ltiToolTypeGroup, setLtiToolTypesGroup] = useState([]);
  const { ltiToolsTypes, orgMediaSources } = useSelector((state) => state.admin);
  useEffect(() => {
    const filterLTIdata = orgMediaSources?.mediaSources?.filter((t) => t.name !== 'My device');
    setLtiToolTypesGroup(filterLTIdata?.filter((t) => t.pivot.lti_tool_settings_status === true));
    // console.log('ltiToolsTypes', ltiToolsTypes);
    // setLtiToolTypesGroup(
    //   ltiToolsTypes.filter((type) => {
    //     if (type.name !== 'My device' && type.name !== 'BrightCove') {
    //       return type;
    //     }
    //   }),
    // );
    if (editMode && activeEdit?.media_source_id) {
      console.log('ltiToolsTypes', ltiToolsTypes);

      // Old-code
      // const editmodeLti = ltiToolsTypes
      //   .filter((type) => {
      //     // if (type.name !== 'My device' && type.name !== 'BrightCove' && type.id !== activeEdit?.media_source_id) {
      //     //   return type;
      //     // }
      //     if (type.id !== activeEdit?.media_source_id) {
      //       return type;
      //     }
      //   })
      //   ?.concat(activeEdit?.media_sources);
      // setLtiToolTypesGroup(editmodeLti);

      // New Updpate
      const filterdata = orgMediaSources?.mediaSources?.filter((t) => t.name !== 'My device');
      setLtiToolTypesGroup(filterdata?.filter((t) => t.pivot.lti_tool_settings_status === true));
      // setLtiToolTypesGroup(ltiToolsTypes);
    }
  }, [ltiToolsTypes, editMode]);
  return (
    <div className="create-form lms-admin-form">
      <Formik
        initialValues={{
          tool_name: editMode ? activeEdit?.tool_name : '',
          tool_custom_parameter: editMode ? activeEdit?.tool_custom_parameter : '',
          tool_url: editMode ? activeEdit?.tool_url : '',
          tool_content_selection_url: editMode ? activeEdit?.tool_content_selection_url : '',
          lti_version: editMode ? activeEdit?.lti_version || 'LTI-1p0' : 'LTI-1p0',
          tool_consumer_key: editMode ? activeEdit?.tool_consumer_key : '',
          tool_description: editMode ? activeEdit?.tool_description : '',
          // tool_type: editMode ? activeEdit?.tool_type : '',media_source_id

          // media_source_id: editMode
          //   ? activeEdit?.media_source_id
          //   : ltiToolsTypes.filter((type) => type.name !== 'My device' && type.name !== 'BrightCove').map((x) => x).length > 0
          //   ? ltiToolsTypes.filter((type) => type.name !== 'My device' && type.name !== 'BrightCove').map((x) => x)['0'].id
          //   : '',

          media_source_id: editMode ? activeEdit?.media_source_id : ltiToolsTypes.length > 0 ? ltiToolsTypes?.['0']?.id : '',

          tool_secret_key: editMode ? activeEdit?.tool_secret_key : '',
          organization_id: organization?.activeOrganization?.id,
          user_id: loggedUser.id,
          // user_id: editMode ? (clone ? '' : activeEdit?.user?.id) : '',
          // name: editMode ? (clone ? '' : activeEdit?.user?.name) : '',
        }}
        validate={(values) => {
          const errors = {};
          if (!values.tool_name) {
            errors.tool_name = 'required';
          }
          if (!values.tool_url) {
            errors.tool_url = 'required';
          }
          if (!values.lti_version) {
            errors.lti_version = 'required';
          }
          if (!values.user_id) {
            errors.user_id = 'Required';
          }
          return errors;
        }}
        onSubmit={async (values) => {
          if (editMode && !clone) {
            Swal.fire({
              title: 'Lti tool',
              icon: 'info',
              text: 'Updating LTI Tool ...',
              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });

            const result = adminapi.updateLtiTool(organization?.activeOrganization?.id, activeEdit?.id, values);
            result.then((res) => {
              Swal.fire({
                icon: 'success',
                text: 'LTI tool edited successfully',
                confirmButtonText: 'Close',
                customClass: {
                  confirmButton: 'confirmation-close-btn',
                },
              });
              // dispatch(getLtiTools(organization?.activeOrganization?.id));
              dispatch(removeActiveAdminForm());
              // dispatch({
              //   type: actionTypes.NEWLY_EDIT_RESOURCE,
              //   payload: res?.data,
              // });
              dispatch({
                type: actionTypes.LTI_TOOLS_ADD_EDIT,
                payload: res?.data,
              });
              console.log('values.media_source_id', values.media_source_id);
              dispatch({
                type: actionTypes.LTI_TOOLS_PAGINATION_UPDATE,
                payload: 'DECREMENT_TYPE_CHANGED',
                ltitoolType: values.media_source_id,
              });
            });
          } else {
            Swal.fire({
              title: 'Lti tool',
              icon: 'info',
              text: 'Creating new LTI Tool...',

              allowOutsideClick: false,
              onBeforeOpen: () => {
                Swal.showLoading();
              },
              button: false,
            });
            const result = adminapi.createLtiTool(organization?.activeOrganization?.id, values);
            result.then((res) => {
              Swal.fire({
                icon: 'success',
                text: 'LTI tool added successfully',
                confirmButtonText: 'Close',
                customClass: {
                  confirmButton: 'confirmation-close-btn',
                },
              });
              // dispatch(getLtiTools(organization?.activeOrganization?.id));

              dispatch({
                type: actionTypes.LTI_TOOLS_PAGINATION_UPDATE,
                payload: 'INCREMENT',
                ltitoolType: values.media_source_id,
              });
              dispatch(removeActiveAdminForm());
              dispatch({
                type: actionTypes.LTI_TOOLS_ADD_NEW,
                payload: res?.data,
              });
              // dispatch({
              //   type: actionTypes.NEWLY_CREATED_RESOURCE,
              //   payload: res?.data,
              // });
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
              <h2>
                {editMode ? (clone ? 'Add ' : 'Edit ') : 'Add '}
                LTI tool
              </h2>

              <div className="create-form-inputs-group">
                {/* Left container */}
                <div>
                  <div className="form-group-create">
                    <h3>Tool name</h3>
                    <input type="text" name="tool_name" onChange={handleChange} onBlur={handleBlur} value={values.tool_name} />
                    <div className="error">{errors.tool_name && touched.tool_name && errors.tool_name}</div>
                  </div>

                  <div className="form-group-create">
                    <h3>Tool URL</h3>
                    <input type="text" name="tool_url" onChange={handleChange} onBlur={handleBlur} value={values.tool_url} />
                    <div className="error">{errors.tool_url && touched.tool_url && errors.tool_url}</div>
                  </div>

                  <div className="form-group-create">
                    <h3>Tool Description</h3>
                    <textarea type="text" name="tool_description" onChange={handleChange} onBlur={handleBlur} value={values.tool_description} />
                    <div className="error">{errors.tool_description && touched.tool_description && errors.tool_description}</div>
                  </div>

                  {/* <div className="form-group-create">
                    <h3>Tool type</h3>
                    <div className="filter-dropdown-tooltype">
                      <Dropdown>
                        <Dropdown.Toggle id="dropdown-basic">{ltiToolTypes?.filter((type) => type.id === values.media_source_id)[0]?.name}</Dropdown.Toggle>

                        <Dropdown.Menu>
                          {ltiToolTypes.map((type) => {
                            if (type.name !== 'My device' && type.name !== 'BrightCove') {
                              return (
                                <>
                                  <Dropdown.Item
                                    key={type.id}
                                    onClick={() => {
                                      setFieldValue('media_source_id', type.id);
                                    }}
                                  >
                                    {type.name}
                                  </Dropdown.Item>
                                </>
                              );
                            }
                          })}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div> */}
                  {/* Tool Type Update Start */}
                  <div className="form-group-create">
                    <h3>Tool type</h3>
                    <select name="media_source_id" onChange={handleChange} onBlur={handleBlur} value={values.media_source_id}>
                      {/* {values.media_source_id === '' && (
                        <option selected value={null}>
                          Select
                        </option>
                      )} */}
                      {ltiToolTypeGroup.map((type) => (
                        <>
                          <option value={type.id}>{type.name}</option>
                        </>
                      ))}
                      {/* {ltiToolTypeGroup.map((type) => {
                        if (type.name !== 'My device' && type.name !== 'BrightCove') {
                          return (
                            <>
                              <option value={type.id}>{type.name}</option>
                            </>
                          );
                        }
                      })} */}
                    </select>
                    <div className="error">{errors.lti_version && touched.lti_version && errors.lti_version}</div>
                  </div>
                  {/* Tool Type Update End */}

                  <div className="form-group-create">
                    <h3>LTI version</h3>
                    <select name="lti_version" onChange={handleChange} onBlur={handleBlur} value={values.lti_version}>
                      <option defaultValue="LTI-1p0" value="LTI-1p0">
                        LTI-1p0
                      </option>
                      <option value="LTI-1p3">LTI-1p3</option>
                    </select>
                    <div className="error">{errors.lti_version && touched.lti_version && errors.lti_version}</div>
                  </div>

                  <div className="form-group-create">
                    <h3>Consumer Key</h3>
                    <input type="text" name="tool_consumer_key" onChange={handleChange} onBlur={handleBlur} value={values.tool_consumer_key} />
                    <div className="error">{errors.tool_consumer_key && touched.tool_consumer_key && errors.tool_consumer_key}</div>
                  </div>

                  <div className="form-group-create">
                    <h3>Access Key</h3>
                    <input type="text" name="tool_secret_key" onChange={handleChange} onBlur={handleBlur} value={values.tool_secret_key} />
                    <div className="error">{errors.tool_secret_key && touched.tool_secret_key && errors.tool_secret_key}</div>
                  </div>

                  <div className="form-group-create">
                    <h3>Custom parameters</h3>
                    <input type="text" name="tool_custom_parameter" onChange={handleChange} onBlur={handleBlur} value={values.tool_custom_parameter} />
                    <div className="error">{errors.tool_custom_parameter && touched.tool_custom_parameter && errors.tool_custom_parameter}</div>
                  </div>

                  <div className="form-group-create">
                    <h3>Content selection URL</h3>
                    <input type="text" name="tool_content_selection_url" onChange={handleChange} onBlur={handleBlur} value={values.tool_content_selection_url} />
                    <div className="error">{errors.tool_content_selection_url && touched.tool_content_selection_url && errors.tool_content_selection_url}</div>
                  </div>

                  {/* <div className="form-group-create">
                    <h3>User &nbsp; (search users from dropdown list only)</h3>
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
                              setFieldValue('name', user.name);
                              setStateOrgUsers([]);
                            }}
                          >
                            {user.name}
                            <p>
                              Email: &nbsp;
                              {user.email}
                            </p>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="error">{errors.user_id && touched.user_id && errors.user_id}</div>
                  </div> */}
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

CreateLtiTool.propTypes = {};
