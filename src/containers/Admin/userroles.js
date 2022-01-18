/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Card, Alert, Tab, Row, Col, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { updateRole, getAllPermissionId, roleDetail } from 'store/actions/organization';
import updateImg from '../../assets/images/update.svg';

function UserRoles() {
  const dispatch = useDispatch();
  const { permission, activeOrganization, activePermission, permissionsId, roles } = useSelector((state) => state.organization);

  const [projectEdit, setProjectEdit] = useState([12, 39, 309, 310, 314, 315, 314, 315]);
  const [projectView, setProjectView] = useState([]);

  const [projectExportEdit, setProjectExportEdit] = useState([311, 312, 313]);
  const [projectExportView, setprojectExportView] = useState([332]);

  const [userEdit, setUserEdit] = useState([5, 6, 7, 8, 10, 11, 66]);
  const [userView, setUserView] = useState([9]);

  const [userRolesEdit, setUserRolesEdit] = useState([63, 149]);
  const [userRoleView, setUserRoleView] = useState([]);

  const [orgEdit, setOrgEdit] = useState([1, 2, 4]);
  const [orgView, setOrgView] = useState([3]);
  const AdminList = ['Organization', 'Projects', 'Activities', 'Integrations', 'Users'];

  const [activityEdit, setActivityEdit] = useState([316, 317, 319]);
  const [activityView, setActivityView] = useState([318]);

  const [activityItemEdit, setActivityItemEdit] = useState([341, 339, 338]);
  const [activityItemView, setActivityItemView] = useState([340]);

  const [activityTypeEdit, setActivityTypeEdit] = useState([337, 335, 334]);
  const [activityTypeView, setActivityTypeView] = useState([336]);

  const [lmsSettingEdit, setlmsSettingEdit] = useState([350, 348, 347]);
  const [lmsSettingView, setLmsSettingView] = useState([349]);

  const [ltiSettingEdit, setltiSettingEdit] = useState([346, 344, 343]);
  const [ltiSettingView, setLtiSettingView] = useState([345]);

  const [teamEdit, setTeamEdit] = useState([40, 301, 302]);
  const [teamView, setTeamView] = useState([39]);

  const [AuthorProjectEdit, setAuthorProjectEdit] = useState([13, 14, 16, 19, 20, 21, 22, 23]);
  const [AuthorProjectView, setAuthorProjectView] = useState([15, 17, 18]);

  const [AuthorplayListEdit, setAuthorPlayListEdit] = useState([24, 25, 27]);
  const [AuthorplayListView, setAuthorplayListView] = useState([26, 29, 28]);
  const [allActivePermission, setAllActivePermission] = useState([]);
  const [authorActivityEdit, setAuthorActivityEdit] = useState([30, 31, 33, 34]);
  const [authorActivityView, setAuthorActivityView] = useState([32, 35, 36]);

  const [authorVideoEdit, setauthorVideoEdit] = useState([]);
  const [authorVideoView, setauthorVideoView] = useState([331]);

  const [checkRoles, setCheckRoles] = useState('');

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
                                  bold
                                />
                              </div>
                              <div className="permission">
                                <div className="selection-tab-custom">
                                  <div className="form-group custom-select-style-for-sub">
                                    <NewEdit
                                      setFieldValue={setFieldValue}
                                      type={'Projects'}
                                      permissions={values.permissions}
                                      currentFeatureView={[...projectView, ...projectExportView]}
                                      currentFeatureEdit={[...projectEdit, ...projectExportEdit]}
                                      bold
                                    />
                                  </div>
                                </div>
                                {/* <h6>Project</h6> */}
                                <div className="permission-about">
                                  <NewEdit
                                    setFieldValue={setFieldValue}
                                    type={'All Project'}
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
                                <div className="selection-tab-custom">
                                  <div className="form-group custom-select-style-for-sub">
                                    <NewEdit
                                      setFieldValue={setFieldValue}
                                      type={'Activities'}
                                      permissions={values.permissions}
                                      currentFeatureView={[...activityTypeView, ...activityItemView]}
                                      currentFeatureEdit={[...activityTypeEdit, ...activityItemEdit]}
                                      bold
                                    />
                                  </div>
                                </div>
                                <div className="permission-about">
                                  <NewEdit
                                    setFieldValue={setFieldValue}
                                    type={'Activity types'}
                                    permissions={values.permissions}
                                    currentFeatureView={activityTypeView}
                                    currentFeatureEdit={activityTypeEdit}
                                  />

                                  <NewEdit
                                    setFieldValue={setFieldValue}
                                    type={'Activity Items'}
                                    permissions={values.permissions}
                                    currentFeatureView={activityItemView}
                                    currentFeatureEdit={activityItemEdit}
                                  />
                                </div>
                              </div>

                              <div className="permission">
                                <div className="selection-tab-custom">
                                  <div className="form-group custom-select-style-for-sub">
                                    <NewEdit
                                      setFieldValue={setFieldValue}
                                      type={'Users'}
                                      permissions={values.permissions}
                                      currentFeatureView={[...userView, ...userRoleView]}
                                      currentFeatureEdit={[...userEdit, ...userRolesEdit]}
                                      bold
                                    />
                                  </div>
                                </div>
                                {/* <h6>User</h6> */}
                                <div className="permission-about">
                                  <NewEdit
                                    setFieldValue={setFieldValue}
                                    type={'Users'}
                                    permissions={values.permissions}
                                    currentFeatureView={userView}
                                    currentFeatureEdit={userEdit}
                                  />
                                  <NewEdit
                                    setFieldValue={setFieldValue}
                                    type={'Manage Roles'}
                                    permissions={values.permissions}
                                    currentFeatureView={userRoleView}
                                    currentFeatureEdit={userRolesEdit}
                                  />
                                </div>
                              </div>

                              <div className="permission">
                                <div className="selection-tab-custom">
                                  <div className="form-group custom-select-style-for-sub">
                                    <NewEdit
                                      setFieldValue={setFieldValue}
                                      type={'Integrations'}
                                      permissions={values.permissions}
                                      currentFeatureView={[...lmsSettingView, ...ltiSettingView]}
                                      currentFeatureEdit={[...lmsSettingEdit, ...ltiSettingEdit]}
                                      bold
                                    />
                                  </div>
                                </div>

                                <div className="permission-about">
                                  <NewEdit
                                    setFieldValue={setFieldValue}
                                    type={'LMS Settings'}
                                    permissions={values.permissions}
                                    currentFeatureView={lmsSettingView}
                                    currentFeatureEdit={lmsSettingEdit}
                                  />
                                  <NewEdit
                                    setFieldValue={setFieldValue}
                                    type={'LTI Tools'}
                                    permissions={values.permissions}
                                    currentFeatureView={ltiSettingView}
                                    currentFeatureEdit={ltiSettingEdit}
                                  />
                                </div>
                              </div>
                              <div className="permission">
                                <div className="selection-tab-custom">
                                  <div className="form-group custom-select-style-for-sub">
                                    <NewEdit
                                      setFieldValue={setFieldValue}
                                      type={'Authoring'}
                                      bold
                                      permissions={values.permissions}
                                      currentFeatureView={[...AuthorProjectView, ...AuthorplayListView, ...authorActivityView, ...teamView]}
                                      currentFeatureEdit={[...AuthorProjectEdit, ...AuthorplayListEdit, ...authorActivityEdit, ...teamEdit]}
                                    />
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
                                  <NewEdit
                                    setFieldValue={setFieldValue}
                                    type={'Teams'}
                                    permissions={values.permissions}
                                    currentFeatureView={teamView}
                                    currentFeatureEdit={teamEdit}
                                  />
                                  <NewEdit
                                    setFieldValue={setFieldValue}
                                    type={'My interactive video'}
                                    permissions={values.permissions}
                                    currentFeatureView={authorVideoView}
                                    currentFeatureEdit={authorVideoEdit}
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
                                  <NewEdit
                                    setFieldValue={setFieldValue}
                                    type={'Authoring'}
                                    bold
                                    permissions={values.permissions}
                                    currentFeatureView={[...AuthorProjectView, ...AuthorplayListView, ...authorActivityView, ...teamView]}
                                    currentFeatureEdit={[...AuthorProjectEdit, ...AuthorplayListEdit, ...authorActivityEdit, ...teamEdit]}
                                  />
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
                                <NewEdit
                                  setFieldValue={setFieldValue}
                                  type={'Teams'}
                                  permissions={values.permissions}
                                  currentFeatureView={teamView}
                                  currentFeatureEdit={teamEdit}
                                />
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
                              <NewEdit
                                setFieldValue={setFieldValue}
                                type={'Organiziation'}
                                permissions={values.permissions}
                                currentFeatureView={orgView}
                                currentFeatureEdit={orgEdit}
                                bold
                              />
                            </Card.Body>
                          </Tab.Pane>
                          <Tab.Pane eventKey="1">
                            <Card.Body
                              style={{
                                background: '#f7faff',
                                margin: '32px',
                              }}
                            >
                              <div className="selection-tab-custom">
                                <div className="form-group custom-select-style-for-sub">
                                  <NewEdit
                                    setFieldValue={setFieldValue}
                                    type={'Projects'}
                                    permissions={values.permissions}
                                    currentFeatureView={[...projectView, ...projectExportView]}
                                    currentFeatureEdit={[...projectEdit, ...projectExportEdit]}
                                    bold
                                  />
                                </div>
                              </div>

                              <div className="permission-about d-flex">
                                <NewEdit
                                  setFieldValue={setFieldValue}
                                  type={'All Project'}
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
                            </Card.Body>
                          </Tab.Pane>
                          <Tab.Pane eventKey="2">
                            <Card.Body
                              style={{
                                background: '#f7faff',
                                margin: '32px',
                              }}
                            >
                              <div className="selection-tab-custom">
                                <div className="form-group custom-select-style-for-sub">
                                  <NewEdit
                                    setFieldValue={setFieldValue}
                                    type={'Activities'}
                                    permissions={values.permissions}
                                    currentFeatureView={[...activityTypeView, ...activityItemView]}
                                    currentFeatureEdit={[...activityTypeEdit, ...activityItemEdit]}
                                    bold
                                  />
                                </div>
                              </div>
                              <div className="permission-about d-flex">
                                <NewEdit
                                  setFieldValue={setFieldValue}
                                  type={'Activity types'}
                                  permissions={values.permissions}
                                  currentFeatureView={activityTypeView}
                                  currentFeatureEdit={activityTypeEdit}
                                />

                                <NewEdit
                                  setFieldValue={setFieldValue}
                                  type={'Activity Items'}
                                  permissions={values.permissions}
                                  currentFeatureView={activityItemView}
                                  currentFeatureEdit={activityItemEdit}
                                />
                              </div>
                            </Card.Body>
                          </Tab.Pane>
                          <Tab.Pane eventKey="3">
                            <Card.Body
                              style={{
                                background: '#f7faff',
                                margin: '32px',
                              }}
                            >
                              <div className="selection-tab-custom">
                                <div className="form-group custom-select-style-for-sub">
                                  <NewEdit
                                    setFieldValue={setFieldValue}
                                    type={'Integrations'}
                                    permissions={values.permissions}
                                    currentFeatureView={[...lmsSettingView, ...ltiSettingView]}
                                    currentFeatureEdit={[...lmsSettingEdit, ...ltiSettingEdit]}
                                    bold
                                  />
                                </div>
                              </div>

                              <div className="permission-about d-flex">
                                <NewEdit
                                  setFieldValue={setFieldValue}
                                  type={'LMS Settings'}
                                  permissions={values.permissions}
                                  currentFeatureView={lmsSettingView}
                                  currentFeatureEdit={lmsSettingEdit}
                                />
                                <NewEdit
                                  setFieldValue={setFieldValue}
                                  type={'LTI Tools'}
                                  permissions={values.permissions}
                                  currentFeatureView={ltiSettingView}
                                  currentFeatureEdit={ltiSettingEdit}
                                />
                              </div>
                            </Card.Body>
                          </Tab.Pane>
                          <Tab.Pane eventKey="4">
                            <Card.Body
                              style={{
                                background: '#f7faff',
                                margin: '32px',
                              }}
                            >
                              <div className="selection-tab-custom">
                                <div className="form-group custom-select-style-for-sub">
                                  <NewEdit
                                    setFieldValue={setFieldValue}
                                    type={'Users'}
                                    permissions={values.permissions}
                                    currentFeatureView={[...userView, ...userRoleView]}
                                    currentFeatureEdit={[...userEdit, ...userRolesEdit]}
                                    bold
                                  />
                                </div>
                              </div>
                              {/* <h6>User</h6> */}
                              <div className="permission-about d-flex">
                                <NewEdit
                                  setFieldValue={setFieldValue}
                                  type={'Users'}
                                  permissions={values.permissions}
                                  currentFeatureView={userView}
                                  currentFeatureEdit={userEdit}
                                />
                                <NewEdit
                                  setFieldValue={setFieldValue}
                                  type={'Manage Roles'}
                                  permissions={values.permissions}
                                  currentFeatureView={userRoleView}
                                  currentFeatureEdit={userRolesEdit}
                                />
                              </div>
                            </Card.Body>
                          </Tab.Pane>
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

export const NewEdit = ({ type, permissions, setFieldValue, currentFeatureEdit, currentFeatureView, bold }) => {
  return (
    <div className="form-group custom-select-style-for-sub">
      <select
        onChange={(e) => {
          if (e.target.value == 'view') {
            setFieldValue('permissions', [
              ...permissions.filter((data) => {
                if (currentFeatureEdit.includes(parseInt(data))) {
                  return false;
                } else {
                  return true;
                }
              }),
              ...currentFeatureView.map((e) => String(e)),
            ]);
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
      {bold ? <h6>{type}</h6> : <p> {type}</p>}
    </div>
  );
};

export default UserRoles;
