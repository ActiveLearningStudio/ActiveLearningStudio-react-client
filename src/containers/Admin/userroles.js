/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Card, Alert, Tab, Row, Col, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { updateRole, getAllPermissionId, roleDetail } from 'store/actions/organization';
import updateImg from '../../assets/images/update.svg';

function UserRoles() {
  const dispatch = useDispatch();
  const { permission, activeOrganization, activePermission, permissionsId, roles } = useSelector((state) => state.organization);

  const [checkRoles, setCheckRoles] = useState('');
  // author
  const [teamsAuthoring, setTeamsAuthoring] = useState([]);
  const [projectAuthoring, setProjectAuthoring] = useState([]);
  const [playlistAuthoring, setPlaylistAuthoring] = useState([]);
  const [activityAuthoring, setActivityAuthoring] = useState([]);
  const [allActivePermission, setAllActivePermission] = useState([]);

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

  const AdminList = ['Organization', 'Project', 'Activity', 'SSO', 'User'];
  useEffect(() => {
    const extractPermission = [];
    const extractPermissionNames = [];
    if (activePermission) {
      activePermission?.[0]?.permissions?.map((data) => {
        extractPermission.push(String(data.id));
        extractPermissionNames.push(data.name);
      });
    }
    setCheckRoles(extractPermission);
    setAllActivePermission(extractPermissionNames);
  }, [activePermission]);

  useEffect(() => {
    //clear all
    setTeamsAuthoring([]);
    setActivityAuthoring([]);
    setTeamsAuthoring([]);
    setActivityAuthoring([]);

    // populate authoring
    setTeamsAuthoring(permissionsId?.Team.filter((data) => !teamViewDate.includes(data.name)));
    setProjectAuthoring(permissionsId?.Project.filter((data) => !projectViewDate.includes(data.name)));
    setActivityAuthoring(permissionsId?.Activity.filter((data) => !activityViewDate.includes(data.name)));
    setPlaylistAuthoring(permissionsId?.Playlist.filter((data) => !playlistViewDate.includes(data.name)));
  }, [activePermission]);

  useEffect(() => {
    dispatch(getAllPermissionId(activeOrganization?.id));
    if (!!roles) {
      if (roles?.length !== 0) dispatch(roleDetail(activeOrganization.id, roles[0]?.id));
    }
  }, []);

  return (
    <div className="user-roles">
      {/* <h2>Roles Permissions</h2> */}
      {true ? (
        <div className="box-group">
          <Formik
            initialValues={{
              role_id: activePermission?.[0]?.id,
              permissions: checkRoles,
            }}
            enableReinitialize
            onSubmit={async (values) => {
              dispatch(updateRole(activeOrganization.id, values));
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
                <div className="form-group-create dynamic-roles">
                  {permission?.Organization?.includes('organization:edit-role') && (
                    <div className="dynamic-roles-title-btn">
                      <div>
                        <h2>Edit “{activePermission && activePermission[0]?.display_name}” permissions</h2>
                      </div>
                      <div
                        className="button-group"
                        style={{ marginTop: '17px' }}
                        // style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button type="submit" className="update-permission">
                          <img src={updateImg} alt="update" />
                          <h5> Update permissions</h5>
                        </button>
                      </div>
                    </div>
                  )}

                  <Tab.Container id="left-tabs-example" defaultActiveKey="manual-3">
                    <Row className="roles-permission-tab-row">
                      <Col className="roles-permission-tab" sm={2}>
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
                            <Card.Body
                              style={{
                                // background: '#f7faff',
                                margin: '32px',
                              }}
                            >
                              <div className="permission">
                                <h6>Organiziation</h6>
                                <div className="permission-about">
                                  {permissionsId?.['Organization']?.map((val) => {
                                    if (orgOrgList.includes(val.name)) {
                                      return <DropdownSelect setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />;
                                    }
                                  })}
                                </div>
                              </div>
                              <div className="permission">
                                <h6>Project</h6>
                                <div className="permission-about">
                                  {permissionsId?.['Organization'].map((val) => {
                                    if (orgProjectList.includes(val.name)) {
                                      return <DropdownSelect setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />;
                                    }
                                  })}
                                </div>
                              </div>
                              <div className="permission">
                                <h6>Activity</h6>
                                <div className="permission-about">
                                  {permissionsId?.['Organization']?.map((val) => {
                                    if (orgActivityList.includes(val.name)) {
                                      return <DropdownSelect setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />;
                                    }
                                  })}
                                </div>
                              </div>
                              <div className="permission">
                                <h6>SSO</h6>
                                <div className="permission-about">
                                  {permissionsId?.['Organization']?.map((val) => {
                                    if (orgSSOList.includes(val.name)) {
                                      return <DropdownSelect setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />;
                                    }
                                  })}
                                </div>
                              </div>
                              <div className="permission">
                                <h6>User</h6>
                                <div className="permission-about">
                                  {permissionsId?.['Organization']?.map((val) => {
                                    if (orgUserList.includes(val.name)) {
                                      return <DropdownSelect setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />;
                                    }
                                  })}
                                </div>
                              </div>
                              <div className="permission">
                                <h6>Authoring</h6>

                                <Authoring
                                  setFieldValue={setFieldValue}
                                  type="Project"
                                  dataAuthoring={projectAuthoring}
                                  values={values}
                                  permissionsId={permissionsId}
                                  viewData={projectViewDate}
                                  allActivePermission={allActivePermission}
                                />
                                <Authoring
                                  setFieldValue={setFieldValue}
                                  type="Playlist"
                                  dataAuthoring={playlistAuthoring}
                                  values={values}
                                  permissionsId={permissionsId}
                                  viewData={playlistViewDate}
                                  allActivePermission={allActivePermission}
                                />
                                <Authoring
                                  setFieldValue={setFieldValue}
                                  type="Activity"
                                  dataAuthoring={activityAuthoring}
                                  values={values}
                                  permissionsId={permissionsId}
                                  viewData={activityViewDate}
                                  allActivePermission={allActivePermission}
                                />
                                <Authoring
                                  setFieldValue={setFieldValue}
                                  type="Team"
                                  dataAuthoring={teamsAuthoring}
                                  values={values}
                                  permissionsId={permissionsId}
                                  viewData={teamViewDate}
                                  allActivePermission={allActivePermission}
                                />
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
                              <div className="for-authoring">
                                <Authoring
                                  setFieldValue={setFieldValue}
                                  type="Project"
                                  dataAuthoring={projectAuthoring}
                                  values={values}
                                  permissionsId={permissionsId}
                                  viewData={projectViewDate}
                                  allActivePermission={allActivePermission}
                                />
                                <Authoring
                                  setFieldValue={setFieldValue}
                                  type="Playlist"
                                  dataAuthoring={playlistAuthoring}
                                  values={values}
                                  permissionsId={permissionsId}
                                  viewData={playlistViewDate}
                                  allActivePermission={allActivePermission}
                                />
                                <Authoring
                                  setFieldValue={setFieldValue}
                                  type="Activity"
                                  dataAuthoring={activityAuthoring}
                                  values={values}
                                  permissionsId={permissionsId}
                                  viewData={activityViewDate}
                                  allActivePermission={allActivePermission}
                                />
                                <Authoring
                                  setFieldValue={setFieldValue}
                                  type="Team"
                                  dataAuthoring={teamsAuthoring}
                                  values={values}
                                  permissionsId={permissionsId}
                                  viewData={teamViewDate}
                                  allActivePermission={allActivePermission}
                                />
                              </div>
                            </Card.Body>
                          </Tab.Pane>

                          {!!permissionsId &&
                            Object.keys(permissionsId)?.map((data, counter) => {
                              if (typeof permissionsId[data] === 'object' && data == 'Organization') {
                                return (
                                  <Tab.Pane eventKey="0">
                                    <Card.Body
                                      style={{
                                        background: '#f7faff',
                                        margin: '32px',
                                      }}
                                    >
                                      {permissionsId[data]?.map((val) => {
                                        if (orgOrgList.includes(val.name)) {
                                          return (
                                            <DropdownSelect setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
                                          );
                                        }
                                      })}
                                    </Card.Body>
                                  </Tab.Pane>
                                );
                              }
                            })}

                          {/* For Project List */}
                          {!!permissionsId &&
                            Object.keys(permissionsId)?.map((data, counter) => {
                              if (typeof permissionsId[data] === 'object' && data == 'Organization') {
                                return (
                                  <Tab.Pane eventKey="1">
                                    <Card.Body
                                      style={{
                                        background: '#f7faff',
                                        margin: '32px',
                                      }}
                                    >
                                      {permissionsId[data]?.map((val) => {
                                        if (orgProjectList.includes(val.name)) {
                                          return (
                                            <DropdownSelect setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
                                          );
                                        }
                                      })}
                                    </Card.Body>
                                  </Tab.Pane>
                                );
                              }
                            })}

                          {/* For Activity List */}
                          {!!permissionsId &&
                            Object.keys(permissionsId)?.map((data, counter) => {
                              if (typeof permissionsId[data] === 'object' && data == 'Organization') {
                                return (
                                  <Tab.Pane eventKey="2">
                                    <Card.Body
                                      style={{
                                        background: '#f7faff',
                                        margin: '32px',
                                      }}
                                    >
                                      {permissionsId[data]?.map((val) => {
                                        if (orgActivityList.includes(val.name)) {
                                          return (
                                            <DropdownSelect setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
                                          );
                                        }
                                      })}
                                    </Card.Body>
                                  </Tab.Pane>
                                );
                              }
                            })}

                          {/* For SSO List */}
                          {!!permissionsId &&
                            Object.keys(permissionsId)?.map((data, counter) => {
                              if (typeof permissionsId[data] === 'object' && data == 'Organization') {
                                return (
                                  <Tab.Pane eventKey="3">
                                    <Card.Body
                                      style={{
                                        background: '#f7faff',
                                        margin: '32px',
                                      }}
                                    >
                                      {permissionsId[data]?.map((val) => {
                                        if (orgSSOList.includes(val.name)) {
                                          return (
                                            <DropdownSelect setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
                                          );
                                        }
                                      })}
                                    </Card.Body>
                                  </Tab.Pane>
                                );
                              }
                            })}

                          {/* For User */}
                          {!!permissionsId &&
                            Object.keys(permissionsId)?.map((data, counter) => {
                              if (typeof permissionsId[data] === 'object' && data == 'Organization') {
                                return (
                                  <Tab.Pane eventKey="4">
                                    <Card.Body
                                      style={{
                                        background: '#f7faff',
                                        margin: '32px',
                                      }}
                                    >
                                      {permissionsId[data]?.map((val) => {
                                        if (orgUserList.includes(val.name)) {
                                          return (
                                            <DropdownSelect setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
                                          );
                                        }
                                      })}
                                    </Card.Body>
                                  </Tab.Pane>
                                );
                              }
                            })}

                          {/* New Added END */}
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                  {/*  */}
                  <div className="error">{errors.title && touched.title && errors.title}</div>
                </div>
              </form>
            )}
          </Formik>
        </div>
      ) : (
        <>
          <br />
          <Alert variant="danger">Not authorized to access this.</Alert>
        </>
      )}
    </div>
  );
}

export const DropdownSelect = ({ addRole, setFieldValue, values, activePermission, val }) => {
  return (
    <div className="form-grouper" role="group" aria-labelledby="checkbox-group">
      <div>
        <div className="form-group custom-select-style-for-sub">
          <select
            name=""
            onChange={(e) => {
              if (e.target.value == 'view') {
                setFieldValue(
                  'permissions',
                  values.permissions.filter((data) => {
                    return data != String(val.id);
                  })
                );
              } else {
                !values.permissions.includes(String(val.id)) && setFieldValue('permissions', [...values.permissions, String(val.id)]);
              }
            }}
          >
            <option selected={values.permissions?.includes(String(val.id))} value="edit">
              Edit
            </option>
            <option value="view" selected={!values.permissions?.includes(String(val.id))}>
              View
            </option>
          </select>
          <p> {val.display_name}</p>
        </div>
      </div>
    </div>
  );
};

export const Authoring = ({ addRole, setFieldValue, dataAuthoring, values, permissionsId, viewData, allActivePermission, type }) => {
  return (
    <div className="form-group custom-select-style-for-authoring">
      <select
        onChange={(e) => {
          if (e.target.value == 'view') {
            var ids = [];
            var viewIds = [];
            dataAuthoring?.map((data) => ids.push(data.id));
            ids = ids.join(',').split(',');

            ids = permissionsId?.[type].filter((data) => !ids?.includes(String(data.id)));
            ids?.map((data) => viewIds.push(data.id));
            viewIds = viewIds.join(',').split(',');

            setFieldValue(
              'permissions',
              values.permissions.filter((data) => {
                if (viewIds.includes(data)) {
                  return false;
                } else {
                  return true;
                }
              })
            );
          } else {
            const ids = [];
            permissionsId?.[type].map((data) => ids.push(data.id));
            setFieldValue('permissions', [...values.permissions, ...ids?.join(',').split(',')]);
          }
        }}
      >
        {addRole ? (
          <>
            <option value="edit">Edit</option>
            <option value="view" selected>
              View
            </option>
          </>
        ) : (
          <>
            <option value="edit" selected={viewData?.filter((data) => allActivePermission.includes(data)).length ? true : false}>
              Edit
            </option>
            <option value="view" selected={viewData?.filter((data) => allActivePermission.includes(data)).length ? false : true}>
              View
            </option>
          </>
        )}
      </select>
      <p> {type}</p>
    </div>
  );
};

UserRoles.propTypes = {
  // manage: PropTypes.object.isRequired,
  // type:PropTypes.string.isRequired,
};

export default UserRoles;
