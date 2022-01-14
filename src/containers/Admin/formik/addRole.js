/* eslint-disable */
import React, { useState, useRef, useEffect } from 'react';
import { Formik, Field } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Card, Alert, Tab, Row, Col, Nav } from 'react-bootstrap';
import { removeActiveAdminForm } from 'store/actions/admin';
import { addRole, getAllPermissionId } from 'store/actions/organization';
import { Authoring, DropdownSelect } from '../userroles';
export default function AddRole(props) {
  const dispatch = useDispatch();

  const [projectEdit, setProjectEdit] = useState([12, 39, 309, 310, 314, 315]);
  const [projectView, setProjectView] = useState([]);

  const [projectExportView, setprojectExportView] = useState([311, 312, 313]);
  const [projectExportEdit, setProjectExportEdit] = useState([]);

  const [userEdit, setUserEdit] = useState([5, 6, 7, 8, 10, 11, 66]);
  const [userView, setUserView] = useState([9]);

  const [userRolesEdit, setUserRolesEdit] = useState([63, 149]);
  const [userRoleView, setUserRoleView] = useState([]);

  const [orgEdit, setOrgEdit] = useState([1, 2, 4]);
  const [orgView, setOrgView] = useState([3]);
  const AdminList = ['Organization', 'Project', 'Activity', 'SSO', 'User'];

  const [activityEdit, setActivityEdit] = useState([316, 317, 319]);
  const [activityView, setActivityView] = useState([318]);

  const [ssoEdit, setssoEdit] = useState([257, 256, 254]);
  const [ssoView, setssoView] = useState([255]);

  const [teamEdit, setTeamEdit] = useState([40, 301, 302]);
  const [teamView, setTeamView] = useState([39]);

  const [AuthorProjectEdit, setAuthorProjectEdit] = useState([13, 14, 16, 19, 20, 21, 22, 23]);
  const [AuthorProjectView, setAuthorProjectView] = useState([15, 17, 18]);

  const [AuthorplayListEdit, setAuthorPlayListEdit] = useState([24, 25, 27]);
  const [AuthorplayListView, setAuthorplayListView] = useState([26, 29, 28]);
  const [allActivePermission, setAllActivePermission] = useState([]);
  const [authorActivityEdit, setAuthorActivityEdit] = useState([30, 31, 33, 34]);
  const [authorActivityView, setAuthorActivityView] = useState([32, 35, 36]);

  const { permissionsId, activeOrganization, permission, roles, activePermission } = useSelector((state) => state.organization);

  useEffect(() => {
    dispatch(getAllPermissionId(activeOrganization?.id));
  }, []);
  // hardcoded
  const projectViewDate = ['project:edit', 'project:delete', 'project:create', 'project:upload-thumb'];
  const activityViewDate = ['activity:edit', 'activity:delete', 'activity:create', 'activity:upload'];
  const playlistViewDate = ['playlist:edit', 'playlist:delete', 'playlist:create'];
  const teamViewDate = ['team:create', 'team:edit', 'team:delete'];

  const orgUserList = [
    'organization:invite-members',
    'organization:add-admin',
    'organization:delete-admin',
    'organization:add-user',
    'organization:update-user',
    'organization:delete-user',
    'organization:remove-user',
    'organization:view-user',
    'organization:add-role',
    'organization:edit-role',
  ];
  const orgOrgList = ['organization:edit', 'organization:delete', 'organization:view', 'organization:create', 'organization:upload-thumb'];
  const orgProjectList = [
    'organization:edit-project',
    'organization:delete-project',
    'organization:export-project',
    'organization:import-project',
    'organization:download-project',
    'organization:view-library-request-project',
    'organization:review-library-request-project',
  ];

  const orgActivityList = ['organization:edit-activity', 'organization:delete-activity', 'organization:view-activity', 'organization:create-activity'];
  const orgSSOList = [
    'organization:create-default-sso',
    'organization:view-default-sso',
    'organization:update-default-sso',
    'organization:delete-default-sso',
    'organization:delete-default-sso',
  ];

  const MySpecialField = ({ field }) => {
    return (
      <>
        <label className="checkbox_section">
          <input type="checkbox" {...field} />
          <span></span>
        </label>
      </>
    );
  };
  return (
    <div className="create-form add-role-form">
      <Formik
        initialValues={{
          name: '',
          display_name: '',
          permissions: [],
        }}
        validate={(values) => {
          const errors = {};
          if (!values.display_name) {
            errors.display_name = 'Required';
          }
          if (values.permissions.length < 1) {
            errors.permissions = 'please select atleast one permission';
          }

          return errors;
        }}
        onSubmit={async (values) => {
          const result = dispatch(addRole(activeOrganization.id, values));
          result.then((res) => {
            dispatch(removeActiveAdminForm());
            dispatch({
              type: 'ALL_ROLES',
              payload: [...roles, res.data],
            });
          });
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
            <h2>Add Role</h2>
            <div className="form-group-create">
              <h3>Role Name</h3>
              <input
                type="text"
                name="display_name"
                onChange={(e) => {
                  setFieldValue('display_name', e.target.value);
                  setFieldValue('name', e.target.value?.split(' ').join('_'));
                }}
                onBlur={handleBlur}
                value={values.display_name}
              />
              <div className="error">{errors.display_name && touched.display_name && errors.display_name}</div>
            </div>
            <div className="form-group-create dynamic-roles ">
              <h3>Assign Permissions</h3>

              <Tab.Container id="left-tabs-example" defaultActiveKey="manual-3">
                <Row className="roles-permission-tab-row" style={{flexWrap: 'inherit'}}>
                  <Col className="roles-permission-tab"  sm={2} style={{maxWidth: '25.66667% ',}}>
                    <Nav variant="pills" className="flex-column">
                      <div className="role-permission-tab-name" id="role-permission-tab-id">
                        {!!permissionsId && (
                          <Nav.Item>
                            <Nav.Link eventKey="manual-3">
                              All Permissions
                              <img className="image-tag" />
                            </Nav.Link>
                          </Nav.Item>
                        )}
                      </div>
                      {!!permissionsId &&
                        AdminList.map((data, counter) => {
                          return (
                            <div className="role-permission-tab-name" id="role-permission-tab-id">
                              <Nav.Item>
                                <Nav.Link eventKey={String(counter)}>
                                  {data}

                                  <img className="image-tag" />
                                </Nav.Link>
                              </Nav.Item>
                            </div>
                          );
                        })}

                      <div className="role-permission-tab-name" id="role-permission-tab-id">
                        {!!permissionsId && (
                          <Nav.Item>
                            <Nav.Link eventKey="manual-2">
                              Authoring
                              <img className="image-tag" />
                            </Nav.Link>
                          </Nav.Item>
                        )}
                      </div>
                    </Nav>
                  </Col>
                  <Col className="detail-permission-tab" sm={10}>
                    <Tab.Content>
                      <Tab.Pane eventKey="manual-3">
                        <div className="all-permission-heading">
                          <h6>All permissions</h6>
                        </div>

                        <Card.Body
                          style={{
                            // background: '#f7faff',
                            margin: '8px 32px 32px 10px',
                          }}
                        >
                          <div className="permission">
                            <NewEdit
                              setFieldValue={setFieldValue}
                              type={'Organiziation'}
                              permissions={values.permissions}
                              currentFeatureView={orgView}
                              currentFeatureEdit={orgEdit}
                            />
                          </div>
                          <div className="permission">
                            <div className="selection-tab-custom">
                              <div className="form-group custom-select-style-for-sub">
                                <select name="">
                                  <option value="----">----</option>
                                  <option value="edit">Edit</option>
                                  <option value="view">View</option>
                                </select>
                                <h6> Project</h6>
                              </div>
                            </div>
                            {/* <h6>Project</h6> */}
                            <div className="permission-about">
                              <NewEdit
                                setFieldValue={setFieldValue}
                                type={'Project'}
                                permissions={values.permissions}
                                currentFeatureView={projectView}
                                currentFeatureEdit={projectEdit}
                              />
                              <NewEdit
                                setFieldValue={setFieldValue}
                                type={'import/export Projects'}
                                permissions={values.permissions}
                                currentFeatureView={projectExportView}
                                currentFeatureEdit={projectExportEdit}
                              />
                            </div>
                          </div>
                          <div className="permission">
                            {/* <h6>Activity</h6> */}
                            <div className="permission-about">
                              <NewEdit
                                setFieldValue={setFieldValue}
                                type={'Activity'}
                                permissions={values.permissions}
                                currentFeatureView={activityView}
                                currentFeatureEdit={activityEdit}
                              />
                            </div>
                          </div>

                          <div className="permission">
                            <div className="selection-tab-custom">
                              <div className="form-group custom-select-style-for-sub">
                                <select name="">
                                  <option value="----">----</option>
                                  <option value="edit">Edit</option>
                                  <option value="view">View</option>
                                </select>
                                <h6> User</h6>
                              </div>
                            </div>
                            {/* <h6>User</h6> */}
                            <div className="permission-about">
                              <NewEdit setFieldValue={setFieldValue} type={'User'} permissions={values.permissions} currentFeatureView={userView} currentFeatureEdit={userEdit} />
                              <NewEdit
                                setFieldValue={setFieldValue}
                                type={'Roles'}
                                permissions={values.permissions}
                                currentFeatureView={userRoleView}
                                currentFeatureEdit={userRolesEdit}
                              />
                            </div>
                          </div>

                          <div className="permission">
                            <div className="selection-tab-custom">
                              <div className="form-group custom-select-style-for-sub">
                                <select name="">
                                  <option value="----">----</option>
                                  <option value="edit">Edit</option>
                                  <option value="view">View</option>
                                </select>
                                <h6> Integrations</h6>
                              </div>
                            </div>

                            <div className="permission-about">
                              <NewEdit
                                setFieldValue={setFieldValue}
                                type={'Default SSO'}
                                permissions={values.permissions}
                                currentFeatureView={ssoView}
                                currentFeatureEdit={ssoEdit}
                              />
                            </div>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="manual-2">
                        <Card.Body
                          style={{
                            background: '#f7faff',
                            margin: '32px',
                          }}
                        >
                          <div className="selection-tab-custom">
                            <div className="form-group custom-select-style-for-sub">
                              <select name="">
                                <option value="----">----</option>
                                <option value="edit">Edit</option>
                                <option value="view">View</option>
                              </select>
                              <h6> Authoring</h6>
                            </div>
                          </div>
                          <div className="for-authoring">
                            <NewEdit
                              setFieldValue={setFieldValue}
                              type={'Project'}
                              permissions={values.permissions}
                              currentFeatureView={AuthorProjectView}
                              currentFeatureEdit={AuthorProjectEdit}
                            />
                            <br />
                            <NewEdit
                              setFieldValue={setFieldValue}
                              type={'Playlist'}
                              permissions={values.permissions}
                              currentFeatureView={AuthorplayListView}
                              currentFeatureEdit={AuthorplayListEdit}
                            />
                            <br />
                            <NewEdit
                              setFieldValue={setFieldValue}
                              type={'Activities'}
                              permissions={values.permissions}
                              currentFeatureView={authorActivityView}
                              currentFeatureEdit={authorActivityEdit}
                            />
                            <br />
                            <NewEdit setFieldValue={setFieldValue} type={'Teams'} permissions={values.permissions} currentFeatureView={teamView} currentFeatureEdit={teamEdit} />
                          </div>
                        </Card.Body>
                      </Tab.Pane>

                      <Tab.Pane eventKey="0">
                      <Card.Body
                          style={{
                            background: '#f7faff',
                            margin: '32px',
                          }}
                        >
                        <NewEdit setFieldValue={setFieldValue} type={'Organiziation'} permissions={values.permissions} currentFeatureView={orgView} currentFeatureEdit={orgEdit} />
                      </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="1">
                      <Card.Body
                          style={{
                            background: '#f7faff',
                            margin: '32px',
                          }}
                        >
                        <NewEdit
                          setFieldValue={setFieldValue}
                          type={'Project'}
                          permissions={values.permissions}
                          currentFeatureView={projectView}
                          currentFeatureEdit={projectEdit}
                        />
                         <br />
                        <NewEdit
                          setFieldValue={setFieldValue}
                          type={'import/export Projects'}
                          permissions={values.permissions}
                          currentFeatureView={projectExportView}
                          currentFeatureEdit={projectExportEdit}
                        />
                       
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="2">
                      <Card.Body
                          style={{
                            background: '#f7faff',
                            margin: '32px',
                          }}
                        >
                        <NewEdit
                          setFieldValue={setFieldValue}
                          type={'Activity'}
                          permissions={values.permissions}
                          currentFeatureView={activityView}
                          currentFeatureEdit={activityEdit}
                        />
                       
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="3">
                      <Card.Body
                          style={{
                            background: '#f7faff',
                            margin: '32px',
                          }}
                        >
                        <NewEdit setFieldValue={setFieldValue} type={'Default SSO'} permissions={values.permissions} currentFeatureView={ssoView} currentFeatureEdit={ssoEdit} />
                       
                     </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="4">
                      <Card.Body
                          style={{
                            background: '#f7faff',
                            margin: '32px',
                          }}
                        >
                       
                        <NewEdit setFieldValue={setFieldValue} type={'User'} permissions={values.permissions} currentFeatureView={userView} currentFeatureEdit={userEdit} />
                        <br />
                        <NewEdit
                          setFieldValue={setFieldValue}
                          type={'Roles'}
                          permissions={values.permissions}
                          currentFeatureView={userRoleView}
                          currentFeatureEdit={userRolesEdit}
                        />
                        
                        </Card.Body>
                      </Tab.Pane>
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
              <div className="error">{errors.permissions && touched.permissions && errors.permissions}</div>
            </div>
            <div className="button-group">
              <button type="submit">Add Role</button>
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
export const NewEdit = ({ type, permissions, setFieldValue, currentFeatureEdit, currentFeatureView }) => {
  return (
    <>
    <div className="form-group custom-select-style-for-sub">
      <select
        onChange={(e) => {
          if (e.target.value == 'view') {
            setFieldValue(
              'permissions',
              permissions.filter((data) => {
                if (currentFeatureEdit.includes(parseInt(data))) {
                  return false;
                } else {
                  return true;
                }
              })
            );
          } else if (e.target.value == '----') {
            const specialView = [...currentFeatureView, ...currentFeatureEdit];

            if (specialView?.length) {
              const newViewArray = permissions.filter((data) => {
                if (specialView.includes(parseInt(data))) {
                  return false;
                } else {
                  return true;
                }
              });
              setFieldValue('permissions', newViewArray);
            }
          } else {
            setFieldValue('permissions', [...permissions, ...currentFeatureEdit.map((e) => String(e)), ...currentFeatureView.map((e) => String(e))]);
          }
        }}
      >
        <option value="view" selected={currentFeatureView.some((i) => permissions.includes(String(i)))}>
          View
        </option>
        <option selected={currentFeatureEdit.some((i) => permissions.includes(String(i)))} value="edit">
          Edit
        </option>
        <option value="----" selected={!currentFeatureEdit.some((i) => permissions.includes(String(i))) && !currentFeatureView.some((i) => permissions.includes(String(i)))}>
          ----
        </option>
      </select>
      <p> {type}</p>
    </div>
   
    </>
  );
};
AddRole.propTypes = {};
