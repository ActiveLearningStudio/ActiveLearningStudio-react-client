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
  const { permissionsId, activeOrganization, roles } = useSelector((state) => state.organization);
  const AdminList = ['Organization', 'Projects', 'Reference tables', 'Integrations', 'Users', 'Ind. activities'];

  // organization all projects
  const projectEditName = [
    'organization:upload-thumb',
    'organization:edit-project',
    'organization:delete-project',
    'organization:view-library-request-project',
    'organization:review-library-request-project',
  ];
  const projectViewName = ['organization:view-all-project'];
  const [projectEdit, setProjectEdit] = useState([12, 309, 310, 314, 315]);
  const [projectView, setProjectView] = useState([371]);

  // organization import/export project
  const projectexportEditName = ['organization:export-project', 'organization:import-project', 'organization:download-project'];
  const projectexportViewName = ['organization:view-exported-project'];
  const [projectExportEdit, setProjectExportEdit] = useState([311, 312, 313]);
  const [projectExportView, setProjectExportView] = useState([332]);

  // organization Independent activities
  const independentactivitiesEditName = [
    'independent-activity:create',
    'independent-activity:edit',
    'independent-activity:delete',
    'independent-activity:share',
    'independent-activity:duplicate',
  ];
  const independentactivitiesViewName = ['independent-activity:view'];

  const independentactivitiesExportEditName = ['independent-activity:export', 'independent-activity:import'];
  const independentactivitiesExportViewName = ['independent-activity:view-export'];
  const [independentactivitiesEdit, setIndependentactivitiesEdit] = useState([]);
  const [independentactivitiesView, setIndependentactivitiesView] = useState([]);

  const [independentactivitiesExportEdit, setIndependentactivitiesExportEdit] = useState([]);
  const [independentactivitiesExportView, setIndependentactivitiesExportView] = useState([]);

  // organization user
  const userEditName = [
    'organization:add-user',
    'organization:invite-members',
    'organization:update-user',
    'organization:delete-user',
    'organization:add-admin',
    'organization:delete-admin',
    'organization:remove-user',
  ];
  const userViewName = ['organization:view-user'];
  const [userEdit, setUserEdit] = useState([]);
  const [userView, setUserView] = useState([]);

  // organization manage roles
  const userRoleEditName = ['organization:add-role', 'organization:edit-role'];
  const userRoleViewName = ['organization:view-role'];
  const [userRolesEdit, setUserRolesEdit] = useState([]);
  const [userRoleView, setUserRoleView] = useState([]);

  // org org
  const orgEditName = ['organization:edit', 'organization:delete', 'organization:create'];
  const orgViewName = ['organization:view'];
  const [orgEdit, setOrgEdit] = useState([]);
  const [orgView, setOrgView] = useState([]);

  // org activity item
  const orgActivityItemEditName = ['organization:create-activity-item', 'organization:delete-activity-item', 'organization:edit-activity-item'];
  const orgActivityItemViewName = ['organization:view-activity-item'];
  const [activityItemEdit, setActivityItemEdit] = useState([]);
  const [activityItemView, setActivityItemView] = useState([]);

  // org activity type
  const orgActivityTypeEditName = ['organization:create-activity-type', 'organization:delete-activity-type', 'organization:edit-activity-type'];
  const orgActivityTypeViewName = ['organization:view-activity-type'];
  const [activityTypeEdit, setActivityTypeEdit] = useState([]);
  const [activityTypeView, setActivityTypeView] = useState([]);

  // org  lms type
  const orglmsEditName = ['organization:create-lms-setting', 'organization:delete-lms-setting', 'organization:edit-lms-setting'];
  const orglmsViewName = ['organization:view-lms-setting'];
  const [lmsSettingEdit, setlmsSettingEdit] = useState([]);
  const [lmsSettingView, setLmsSettingView] = useState([]);

  // org all lti type
  const orgltiEditName = ['organization:create-all-setting', 'organization:delete-all-setting', 'organization:edit-all-setting'];
  const orgltiViewName = ['organization:view-all-setting'];
  const [ltiSettingEdit, setltiSettingEdit] = useState([]);
  const [ltiSettingView, setLtiSettingView] = useState([]);

  // org brightcove
  const orgBrightCoveEditName = ['organization:create-brightcove-setting', 'organization:delete-brightcove-setting', 'organization:edit-brightcove-setting'];
  const orgBrightCoveViewName = ['organization:view-brightcove-setting'];
  const [orgBrightCoveEdit, setOrgBrightCoveEdit] = useState([]);
  const [orgBrightCoveView, setOrgBrightCoveView] = useState([]);

  // author ind activity
  const authorIndActivityEditName = ['independent-activity:edit-author'];
  const authorIndActivityViewName = ['independent-activity:view-author'];
  const [authorIndActivityEdit, setAuthorIndActivityEdit] = useState([]);
  const [authorIndActivityView, setAuthorIndActivityView] = useState([]);

  // author team
  const authorteamEditName = ['team:create', 'team:edit', 'team:delete'];
  const authorteamViewName = ['team:view'];
  const [teamEdit, setTeamEdit] = useState([]);
  const [teamView, setTeamView] = useState([]);

  // author project
  const authorProjectEditName = [
    'project:edit',
    'project:delete',
    'project:create',
    'project:request-indexing',
    'project:favorite',
    'project:publish',
    'project:upload-thumb',
    'project:recent',
  ];
  const authorProjectViewName = ['project:view', 'project:share', 'project:clone'];
  const [AuthorProjectEdit, setAuthorProjectEdit] = useState([]);
  const [AuthorProjectView, setAuthorProjectView] = useState([]);

  // author playlist
  const authorPlaylistEditName = ['playlist:edit', 'playlist:delete', 'playlist:create'];
  const authorPlaylistViewName = ['playlist:view', 'playlist:publish', 'playlist:duplicate'];
  const [AuthorplayListEdit, setAuthorPlayListEdit] = useState([]);
  const [AuthorplayListView, setAuthorplayListView] = useState([]);

  // author activity
  const authorActivityEditName = ['activity:edit', 'activity:delete', 'activity:create', 'activity:upload'];
  const authorActivityViewName = ['activity:view', 'activity:share', 'activity:duplicate'];
  const [authorActivityEdit, setAuthorActivityEdit] = useState([]);
  const [authorActivityView, setAuthorActivityView] = useState([]);

  // author video
  const authorVideoEditName = [];
  const authorVideoViewName = ['video:view'];
  const [authorVideoEdit, setauthorVideoEdit] = useState([]);
  const [authorVideoView, setauthorVideoView] = useState([331]);

  useEffect(() => {
    dispatch(getAllPermissionId(activeOrganization?.id));
  }, []);

  useEffect(() => {
    var permissionIdArray = [];
    permissionsId?.Organization.filter((data) => projectEditName.includes(data.name) && permissionIdArray.push(data.id));
    setProjectEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Organization.filter((data) => projectViewName.includes(data.name) && permissionIdArray.push(data.id));
    setProjectView(permissionIdArray);
    permissionIdArray = [];

    permissionsId?.Organization.filter((data) => projectexportEditName.includes(data.name) && permissionIdArray.push(data.id));
    setProjectExportEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Organization.filter((data) => projectexportViewName.includes(data.name) && permissionIdArray.push(data.id));
    setProjectExportView(permissionIdArray);
    permissionIdArray = [];

    // organization user project
    permissionsId?.Organization.filter((data) => userEditName.includes(data.name) && permissionIdArray.push(data.id));
    setUserEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Organization.filter((data) => userViewName.includes(data.name) && permissionIdArray.push(data.id));
    setUserView(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Organization.filter((data) => userRoleEditName.includes(data.name) && permissionIdArray.push(data.id));
    setUserRolesEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Organization.filter((data) => userRoleViewName.includes(data.name) && permissionIdArray.push(data.id));
    setUserRoleView(permissionIdArray);
    permissionIdArray = [];

    // org org
    permissionsId?.Organization.filter((data) => orgEditName.includes(data.name) && permissionIdArray.push(data.id));
    setOrgEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Organization.filter((data) => orgViewName.includes(data.name) && permissionIdArray.push(data.id));
    setOrgView(permissionIdArray);
    permissionIdArray = [];

    // organization activity
    permissionsId?.Organization.filter((data) => orgActivityTypeEditName.includes(data.name) && permissionIdArray.push(data.id));
    setActivityTypeEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Organization.filter((data) => orgActivityTypeViewName.includes(data.name) && permissionIdArray.push(data.id));
    setActivityTypeView(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Organization.filter((data) => orgActivityItemEditName.includes(data.name) && permissionIdArray.push(data.id));
    setActivityItemEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Organization.filter((data) => orgActivityItemViewName.includes(data.name) && permissionIdArray.push(data.id));
    setActivityItemView(permissionIdArray);
    permissionIdArray = [];

    // indpendent activtiies
    if (permissionsId) {
      permissionsId['Independent Activity']?.filter((data) => independentactivitiesEditName.includes(data.name) && permissionIdArray.push(data.id));
      setIndependentactivitiesEdit(permissionIdArray);
      permissionIdArray = [];
      permissionsId['Independent Activity']?.filter((data) => independentactivitiesExportEditName.includes(data.name) && permissionIdArray.push(data.id));
      setIndependentactivitiesExportEdit(permissionIdArray);
      permissionIdArray = [];
      permissionsId['Independent Activity'].filter((data) => independentactivitiesViewName.includes(data.name) && permissionIdArray.push(data.id));
      setIndependentactivitiesView(permissionIdArray);
      permissionIdArray = [];
      permissionsId['Independent Activity'].filter((data) => independentactivitiesExportViewName.includes(data.name) && permissionIdArray.push(data.id));
      setIndependentactivitiesExportView(permissionIdArray);
      permissionIdArray = [];
    }

    // org lms
    permissionsId?.Organization.filter((data) => orglmsEditName.includes(data.name) && permissionIdArray.push(data.id));
    setlmsSettingEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Organization.filter((data) => orglmsViewName.includes(data.name) && permissionIdArray.push(data.id));
    setLmsSettingView(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Organization.filter((data) => orgltiEditName.includes(data.name) && permissionIdArray.push(data.id));
    setltiSettingEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Organization.filter((data) => orgltiViewName.includes(data.name) && permissionIdArray.push(data.id));
    setLtiSettingView(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Organization.filter((data) => orgBrightCoveEditName.includes(data.name) && permissionIdArray.push(data.id));
    setOrgBrightCoveEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Organization.filter((data) => orgBrightCoveViewName.includes(data.name) && permissionIdArray.push(data.id));
    setOrgBrightCoveView(permissionIdArray);
    permissionIdArray = [];

    // author project
    permissionsId?.Project.filter((data) => authorProjectEditName.includes(data.name) && permissionIdArray.push(data.id));
    setAuthorProjectEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Project.filter((data) => authorProjectViewName.includes(data.name) && permissionIdArray.push(data.id));
    setAuthorProjectView(permissionIdArray);
    permissionIdArray = [];

    // author ind activity
    permissionsId?.['Independent Activity'].filter((data) => authorIndActivityEditName.includes(data.name) && permissionIdArray.push(data.id));
    setAuthorIndActivityEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.['Independent Activity'].filter((data) => authorIndActivityViewName.includes(data.name) && permissionIdArray.push(data.id));
    setAuthorIndActivityView(permissionIdArray);
    permissionIdArray = [];

    // author Playlist
    permissionsId?.Playlist.filter((data) => authorPlaylistEditName.includes(data.name) && permissionIdArray.push(data.id));
    setAuthorPlayListEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Playlist.filter((data) => authorPlaylistViewName.includes(data.name) && permissionIdArray.push(data.id));
    setAuthorplayListView(permissionIdArray);
    permissionIdArray = [];

    // author activity
    permissionsId?.Activity.filter((data) => authorActivityEditName.includes(data.name) && permissionIdArray.push(data.id));
    setAuthorActivityEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Activity.filter((data) => authorActivityViewName.includes(data.name) && permissionIdArray.push(data.id));
    setAuthorActivityView(permissionIdArray);
    permissionIdArray = [];
    // author ind activity
    permissionsId?.Team.filter((data) => authorIndActivityEditName.includes(data.name) && permissionIdArray.push(data.id));
    setAuthorIndActivityEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Team.filter((data) => authorIndActivityViewName.includes(data.name) && permissionIdArray.push(data.id));
    setAuthorIndActivityView(permissionIdArray);
    permissionIdArray = [];

    // author team
    permissionsId?.Team.filter((data) => authorteamEditName.includes(data.name) && permissionIdArray.push(data.id));
    setTeamEdit(permissionIdArray);
    permissionIdArray = [];
    permissionsId?.Team.filter((data) => authorteamViewName.includes(data.name) && permissionIdArray.push(data.id));
    setTeamView(permissionIdArray);
    permissionIdArray = [];

    // video team
    permissionsId?.Video.filter((data) => authorVideoViewName.includes(data.name) && permissionIdArray.push(data.id));
    setauthorVideoView(permissionIdArray);
    permissionIdArray = [];
  }, [permissionsId]);

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
                  <Col className="detail-permission-tab" style={{ width: '700px' }} sm={10}>
                    <Tab.Content>
                      <Tab.Pane eventKey="manual-3">
                        <div className="all-permission-heading">
                          <h6>All permissions</h6>
                        </div>

                        <Card.Body
                          className="flex-column"
                          style={{
                            // background: '#f7faff',
                            margin: '8px 32px 32px 10px',
                          }}
                        >
                          <div className="permission">
                            <div className="selection-tab-custom">
                              <div className="form-group custom-select-style-for-sub">
                                <NewEdit
                                  setFieldValue={setFieldValue}
                                  type={'Organization'}
                                  permissions={values.permissions}
                                  currentFeatureView={orgView}
                                  currentFeatureEdit={orgEdit}
                                  bold
                                />
                              </div>
                            </div>
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
                                  type={'Independent activities'}
                                  permissions={values.permissions}
                                  currentFeatureView={[...independentactivitiesView, ...independentactivitiesExportView]}
                                  currentFeatureEdit={[...independentactivitiesEdit, ...independentactivitiesExportEdit]}
                                  bold
                                />
                              </div>
                            </div>
                            {/* <h6>Project</h6> */}
                            <div className="permission-about">
                              <NewEdit
                                setFieldValue={setFieldValue}
                                type={'All independent activities'}
                                permissions={values.permissions}
                                currentFeatureView={independentactivitiesView}
                                currentFeatureEdit={independentactivitiesEdit}
                              />
                              <NewEdit
                                setFieldValue={setFieldValue}
                                type={'Export / Import activities'}
                                permissions={values.permissions}
                                currentFeatureView={independentactivitiesExportView}
                                currentFeatureEdit={independentactivitiesExportEdit}
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
                              <NewEdit setFieldValue={setFieldValue} type={'Users'} permissions={values.permissions} currentFeatureView={userView} currentFeatureEdit={userEdit} />
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
                                  currentFeatureView={[...lmsSettingView, ...ltiSettingView, ...orgBrightCoveView]}
                                  currentFeatureEdit={[...lmsSettingEdit, ...ltiSettingEdit, ...orgBrightCoveEdit]}
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
                              <div className="mt-3">
                                <NewEdit
                                  setFieldValue={setFieldValue}
                                  type={'BrightCove'}
                                  permissions={values.permissions}
                                  currentFeatureView={orgBrightCoveView}
                                  currentFeatureEdit={orgBrightCoveEdit}
                                />
                              </div>
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
                              <NewEdit setFieldValue={setFieldValue} type={'Teams'} permissions={values.permissions} currentFeatureView={teamView} currentFeatureEdit={teamEdit} />
                              <br />
                              <NewEdit
                                setFieldValue={setFieldValue}
                                type={'Independent activities'}
                                permissions={values.permissions}
                                currentFeatureView={authorIndActivityView}
                                currentFeatureEdit={authorIndActivityEdit}
                              />
                              <br />
                              <NewEdit
                                setFieldValue={setFieldValue}
                                type={'My interactive video'}
                                permissions={values.permissions}
                                currentFeatureView={authorVideoView}
                                currentFeatureEdit={authorVideoEdit}
                                hideEdit
                              />
                            </div>
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="manual-2">
                        <Card.Body
                          className="flex-column"
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
                            <NewEdit setFieldValue={setFieldValue} type={'Teams'} permissions={values.permissions} currentFeatureView={teamView} currentFeatureEdit={teamEdit} />
                            <br />
                            <NewEdit
                              setFieldValue={setFieldValue}
                              type={'Independent activities'}
                              permissions={values.permissions}
                              currentFeatureView={authorIndActivityView}
                              currentFeatureEdit={authorIndActivityEdit}
                            />
                            <br />
                            <NewEdit
                              setFieldValue={setFieldValue}
                              type={'My interactive video'}
                              permissions={values.permissions}
                              currentFeatureView={authorVideoView}
                              currentFeatureEdit={authorVideoEdit}
                              hideEdit
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
                            type={'Organization'}
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
                                type={'Reference tables'}
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
                                currentFeatureView={[...lmsSettingView, ...ltiSettingView, ...orgBrightCoveView]}
                                currentFeatureEdit={[...lmsSettingEdit, ...ltiSettingEdit, ...orgBrightCoveEdit]}
                                bold
                              />
                            </div>
                          </div>

                          <div className="permission-about d-flex flex-wrap">
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
                            <div className="mt-3">
                              <NewEdit
                                setFieldValue={setFieldValue}
                                type={'BrightCove'}
                                permissions={values.permissions}
                                currentFeatureView={orgBrightCoveView}
                                currentFeatureEdit={orgBrightCoveEdit}
                              />
                            </div>
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
                            <NewEdit setFieldValue={setFieldValue} type={'Users'} permissions={values.permissions} currentFeatureView={userView} currentFeatureEdit={userEdit} />
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
                      {/* Independent activities start */}
                      <Tab.Pane eventKey="5">
                        <Card.Body
                          className="flex-column"
                          style={{
                            background: '#f7faff',
                            margin: '32px',
                          }}
                        >
                          <div className="selection-tab-custom">
                            <div className="form-group custom-select-style-for-sub">
                              <NewEdit
                                setFieldValue={setFieldValue}
                                type={'Independent activities'}
                                permissions={values.permissions}
                                currentFeatureView={[...independentactivitiesView, ...independentactivitiesExportView]}
                                currentFeatureEdit={[...independentactivitiesEdit, ...independentactivitiesExportEdit]}
                                bold
                              />
                            </div>
                          </div>
                          {/* <h6>User</h6> */}
                          <div className="permission-about d-flex">
                            <NewEdit
                              setFieldValue={setFieldValue}
                              type={'All independent activities'}
                              permissions={values.permissions}
                              currentFeatureView={independentactivitiesView}
                              currentFeatureEdit={independentactivitiesEdit}
                            />
                            <NewEdit
                              setFieldValue={setFieldValue}
                              type={'Export / Import activities'}
                              permissions={values.permissions}
                              currentFeatureView={independentactivitiesExportView}
                              currentFeatureEdit={independentactivitiesExportEdit}
                            />
                          </div>
                        </Card.Body>
                      </Tab.Pane>
                      {/* Independent activities end */}
                    </Tab.Content>
                  </Col>
                </Row>
              </Tab.Container>
              <div className="error">{errors.permissions && touched.permissions && errors.permissions}</div>
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

export const NewEdit = ({ type, permissions, setFieldValue, currentFeatureEdit, currentFeatureView, bold, hideEdit }) => {
  // const [viewOption, setViewOption] = useState(false);
  // const [editOption, setEditOption] = useState(false);
  // const [noneOption, setnoneOption] = useState(false);
  // useEffect(() => {
  //   console.log(type);
  //   setViewOption(currentFeatureView.some((i) => permissions.includes(String(i))));
  //   console.log(currentFeatureView.some((i) => permissions.includes(String(i))));
  //   setEditOption(currentFeatureEdit.some((i) => permissions.includes(String(i))));
  //   console.log(currentFeatureEdit.some((i) => permissions.includes(String(i))));
  //   setnoneOption(!currentFeatureEdit.some((i) => permissions.includes(String(i))) && !currentFeatureView.some((i) => permissions.includes(String(i))));
  //   console.log(!currentFeatureEdit.some((i) => permissions.includes(String(i))) && !currentFeatureView.some((i) => permissions.includes(String(i))));
  // }, [currentFeatureEdit, currentFeatureView]);

  return (
    <>
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
            } else if (e.target.value == 'none') {
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

            if (!bold) {
              const parentControler = e.target.parentNode.parentElement.previousElementSibling.getElementsByTagName('select')[0];
              const sibling = e.target.parentNode.parentElement.getElementsByTagName('select');
              const checkAllValuesInSibling = [];
              for (var i = 0; i < sibling.length; i++) {
                checkAllValuesInSibling.push(sibling[i]?.value);
              }
              const removeDuplicate = new Set(checkAllValuesInSibling);
              if (removeDuplicate.size > 1) {
                parentControler.value = '---';
                console.log('values are not same', parentControler.value);
              } else {
                console.log('values are same', parentControler.value);
                console.log(Array.from(removeDuplicate)[0]);
                parentControler.value = Array.from(removeDuplicate)[0];
              }
              console.log(checkAllValuesInSibling);
            } else {
              const sibling = e.target.parentElement.parentElement.parentElement.nextElementSibling?.getElementsByTagName('select');

              for (var i = 0; i < sibling?.length; i++) {
                console.log(sibling[i].value, e.target.value);
                sibling[i].value = e.target.value;
              }
            }
          }}
        >
          <option value="view" selected={currentFeatureView.some((i) => permissions.includes(String(i)))}>
            View
          </option>
          {!hideEdit && (
            <option selected={currentFeatureEdit.some((i) => permissions.includes(String(i)))} value="edit">
              Edit
            </option>
          )}

          <option value="none" selected={!currentFeatureEdit.some((i) => permissions.includes(String(i))) && !currentFeatureView.some((i) => permissions.includes(String(i)))}>
            none
          </option>
        </select>
        {bold ? <h6>{type}</h6> : <p> {type}</p>}
      </div>
    </>
  );
};
AddRole.propTypes = {};
