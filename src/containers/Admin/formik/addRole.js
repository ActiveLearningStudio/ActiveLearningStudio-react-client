/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Card, Alert, Tab, Row, Col, Nav } from "react-bootstrap";
import { removeActiveAdminForm } from "store/actions/admin";
import { addRole, getAllPermissionId } from "store/actions/organization";
import { Authoring, DropdownSelect } from "../userroles"
export default function AddRole(props) {
  const dispatch = useDispatch();
  const [teamsAuthoring, setTeamsAuthoring] = useState([]);
  const [projectAuthoring, setProjectAuthoring] = useState([]);
  const [playlistAuthoring, setPlaylistAuthoring] = useState([]);
  const [activityAuthoring, setActivityAuthoring] = useState([]);
  const [allActivePermission, setAllActivePermission] = useState([])
  const { permissionsId, activeOrganization, permission, roles, activePermission } = useSelector(
    (state) => state.organization
  );

  useEffect(() => {
    dispatch(getAllPermissionId(activeOrganization?.id));
  }, []);
  // hardcoded
  const projectViewDate = [
    "project:edit",
    "project:delete",
    "project:create",
    "project:upload-thumb",
  ];
  const activityViewDate = [
    "activity:edit",
    "activity:delete",
    "activity:create",
    "activity:upload",
  ];
  const playlistViewDate = [
    "playlist:edit",
    "playlist:delete",
    "playlist:create",
  ];
  const teamViewDate = ["team:create", "team:edit", "team:delete"];

  const orgUserList = [
    "organization:invite-members",
    "organization:add-admin",
    "organization:delete-admin",
    "organization:add-user",
    "organization:update-user",
    "organization:delete-user",
    "organization:remove-user",
    "organization:view-user",
    "organization:add-role",
    "organization:edit-role",
  ];
  const orgOrgList = [

    "organization:edit",
    "organization:delete",
    "organization:view",
    "organization:create",
    "organization:upload-thumb",
  ];
  const orgProjectList = [
    "organization:edit-project",
    "organization:delete-project",
    "organization:export-project",
    "organization:import-project",
    "organization:download-project",
    "organization:view-library-request-project",
    "organization:review-library-request-project",
  ];

  const orgActivityList = [
    "organization:edit-activity",
    "organization:delete-activity",
    "organization:view-activity",
    "organization:create-activity",
  ];
  const orgSSOList = [
    "organization:create-default-sso",
    "organization:view-default-sso",
    "organization:update-default-sso",
    "organization:delete-default-sso",
    "organization:delete-default-sso",
  ];

  const AdminList = ["Organization", "Project", "Activity", "SSO", "User"];
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
          name: "",
          display_name: "",
          permissions: [],
        }}
        validate={(values) => {
          const errors = {};
          if (!values.display_name) {
            errors.display_name = "Required";
          }
          if (values.permissions.length < 1) {
            errors.permissions = "please select atleast one permission";
          }

          return errors;
        }}
        onSubmit={async (values) => {
          const result = dispatch(addRole(activeOrganization.id, values));
          result.then((res) => {
            dispatch(removeActiveAdminForm());
            dispatch({
              type: "ALL_ROLES",
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
                  setFieldValue("display_name", e.target.value);
                  setFieldValue("name", e.target.value?.split(" ").join("_"));
                }}
                onBlur={handleBlur}
                value={values.display_name}
              />
              <div className="error">
                {errors.display_name &&
                  touched.display_name &&
                  errors.display_name}
              </div>
            </div>
            <div className="form-group-create dynamic-roles ">
              <h3>Assign Permissions</h3>


              <Tab.Container id="left-tabs-example" defaultActiveKey="manual-3">
                <Row className="roles-permission-tab-row">
                  <Col className="roles-permission-tab" sm={2}>
                    <Nav variant="pills" className="flex-column">
                      <div
                        className="role-permission-tab-name"
                        id="role-permission-tab-id"
                      >
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
                            <div
                              className="role-permission-tab-name"
                              id="role-permission-tab-id"
                            >
                              <Nav.Item>
                                <Nav.Link eventKey={String(counter)}>
                                  {data}

                                  <img className="image-tag" />
                                </Nav.Link>
                              </Nav.Item>
                            </div>
                          );
                        })}
                      <div
                        className="role-permission-tab-name"
                        id="role-permission-tab-id"
                      >
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
                            background: "#f7faff",
                            margin: "32px",
                          }}
                        >

                          <h6>Organiziation</h6>
                          {permissionsId?.['Organization']?.map((val) => {
                            if (orgOrgList.includes(val.name)) {
                              return (
                                <DropdownSelect addRole setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
                              );
                            }
                          })}

                          <h6>Project</h6>
                          {permissionsId?.['Organization'].map((val) => {
                            if (orgProjectList.includes(val.name)) {
                              return (
                                <DropdownSelect addRole setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
                              );
                            }
                          })}




                          <h6>Activity</h6>
                          {permissionsId?.['Organization']?.map((val) => {
                            if (orgActivityList.includes(val.name)) {
                              return (
                                <DropdownSelect addRole setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
                              );
                            }
                          })}


                          <h6>SSO</h6>
                          {permissionsId?.['Organization']?.map((val) => {
                            if (orgSSOList.includes(val.name)) {
                              return (
                                <DropdownSelect addRole setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
                              );
                            }
                          })}

                          <h6>User</h6>
                          {permissionsId?.['Organization']?.map((val) => {
                            if (orgUserList.includes(val.name)) {
                              return (
                                <DropdownSelect addRole setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
                              );
                            }
                          })}
                          <h6>Authoring</h6>
                          <Authoring addRole setFieldValue={setFieldValue} type="Project" dataAuthoring={projectAuthoring} values={values} permissionsId={permissionsId} viewData={projectViewDate} allActivePermission={allActivePermission} />
                          <Authoring addRole setFieldValue={setFieldValue} type="Playlist" dataAuthoring={playlistAuthoring} values={values} permissionsId={permissionsId} viewData={playlistViewDate} allActivePermission={allActivePermission} />
                          <Authoring addRole setFieldValue={setFieldValue} type="Activity" dataAuthoring={activityAuthoring} values={values} permissionsId={permissionsId} viewData={activityViewDate} allActivePermission={allActivePermission} />
                          <Authoring addRole setFieldValue={setFieldValue} type="Team" dataAuthoring={teamsAuthoring} values={values} permissionsId={permissionsId} viewData={teamViewDate} allActivePermission={allActivePermission} />




                        </Card.Body>
                      </Tab.Pane>
                      <Tab.Pane eventKey="manual-2">
                        <Card.Body
                          style={{
                            background: "#f7faff",
                            margin: "32px",
                          }}
                        >
                          <div className="for-authoring">
                            <Authoring addRole setFieldValue={setFieldValue} type="Project" dataAuthoring={projectAuthoring} values={values} permissionsId={permissionsId} viewData={projectViewDate} allActivePermission={allActivePermission} />
                            <Authoring addRole setFieldValue={setFieldValue} type="Playlist" dataAuthoring={playlistAuthoring} values={values} permissionsId={permissionsId} viewData={playlistViewDate} allActivePermission={allActivePermission} />
                            <Authoring addRole setFieldValue={setFieldValue} type="Activity" dataAuthoring={activityAuthoring} values={values} permissionsId={permissionsId} viewData={activityViewDate} allActivePermission={allActivePermission} />
                            <Authoring addRole setFieldValue={setFieldValue} type="Team" dataAuthoring={teamsAuthoring} values={values} permissionsId={permissionsId} viewData={teamViewDate} allActivePermission={allActivePermission} />
                          </div>
                        </Card.Body>
                      </Tab.Pane>

                      {!!permissionsId &&
                        Object.keys(permissionsId)?.map((data, counter) => {
                          if (
                            typeof permissionsId[data] === "object" &&
                            data == "Organization"
                          ) {
                            return (
                              <Tab.Pane eventKey="0">
                                <Card.Body
                                  style={{
                                    background: "#f7faff",
                                    margin: "32px",
                                  }}
                                >
                                  {permissionsId[data]?.map((val) => {
                                    if (orgOrgList.includes(val.name)) {
                                      return (
                                        <DropdownSelect addRole setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
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
                          if (
                            typeof permissionsId[data] === "object" &&
                            data == "Organization"
                          ) {
                            return (
                              <Tab.Pane eventKey="1">
                                <Card.Body
                                  style={{
                                    background: "#f7faff",
                                    margin: "32px",
                                  }}
                                >
                                  {permissionsId[data]?.map((val) => {
                                    if (orgProjectList.includes(val.name)) {
                                      return (
                                        <DropdownSelect addRole setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
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
                          if (
                            typeof permissionsId[data] === "object" &&
                            data == "Organization"
                          ) {
                            return (
                              <Tab.Pane eventKey="2">
                                <Card.Body
                                  style={{
                                    background: "#f7faff",
                                    margin: "32px",
                                  }}
                                >
                                  {permissionsId[data]?.map((val) => {
                                    if (
                                      orgActivityList.includes(val.name)
                                    ) {
                                      return (
                                        <DropdownSelect addRole setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
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
                          if (
                            typeof permissionsId[data] === "object" &&
                            data == "Organization"
                          ) {
                            return (
                              <Tab.Pane eventKey="3">
                                <Card.Body
                                  style={{
                                    background: "#f7faff",
                                    margin: "32px",
                                  }}
                                >
                                  {permissionsId[data]?.map((val) => {
                                    if (orgSSOList.includes(val.name)) {
                                      return (
                                        <DropdownSelect addRole setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
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
                          if (
                            typeof permissionsId[data] === "object" &&
                            data == "Organization"
                          ) {
                            return (
                              <Tab.Pane eventKey="4">
                                <Card.Body
                                  style={{
                                    background: "#f7faff",
                                    margin: "32px",
                                  }}
                                >
                                  {permissionsId[data]?.map((val) => {
                                    if (orgUserList.includes(val.name)) {
                                      return (
                                        <DropdownSelect addRole setFieldValue={setFieldValue} val={val} values={values} handleBlur={handleBlur} activePermission={activePermission} />
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
              <div className="error">
                {errors.permissions &&
                  touched.permissions &&
                  errors.permissions}
              </div>
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

AddRole.propTypes = {};
