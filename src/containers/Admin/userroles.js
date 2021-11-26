/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Accordion, Card, Alert, Tab, Row, Col, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Formik, Field } from "formik";
import {
  updateRole,
  getAllPermissionId,
  roleDetail,
} from "store/actions/organization";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleRight,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";

function UserRoles({ permissionRender }) {
  const dispatch = useDispatch();
  const {
    permission,
    activeOrganization,
    activePermission,
    permissionsId,
    roles,
  } = useSelector((state) => state.organization);
  console.log("activePermission:", activePermission);
  console.log("permissionsId:", permissionsId);
  const [checkRoles, setCheckRoles] = useState("");
  useEffect(() => {
    const extractPermission = [];
    if (activePermission) {
      activePermission?.[0]?.permissions?.map((data) =>
        extractPermission.push(String(data.id))
      );
    }
    console.log(extractPermission);
    setCheckRoles(extractPermission);
  }, [activePermission]);

  useEffect(() => {
    dispatch(getAllPermissionId(activeOrganization?.id));
    if (!!roles) {
      if (roles?.length !== 0)
        dispatch(roleDetail(activeOrganization.id, roles[0]?.id));
    }
  }, []);

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
  const checkingAdminSelectionStatus = (
    organization,
    activities,
    teams,
    projects,
    users,
    integrations
  ) => {
    if (
      organization == "edit" &&
      activities == "edit" &&
      teams == "edit" &&
      projects == "edit" &&
      users == "edit" &&
      integrations == "edit"
    ) {
      return "edit";
    } else if (
      organization == "view" &&
      activities == "view" &&
      teams == "view" &&
      projects == "view" &&
      users == "view" &&
      integrations == "view"
    ) {
      return "view";
    } else {
      return "---";
    }
  };
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
                  {permission?.Organization?.includes(
                    "organization:edit-role"
                  ) && (
                    <div className="dynamic-roles-title-btn">
                      <div>
                        <h2>
                          Edit “
                          {activePermission &&
                            activePermission[0]?.display_name}
                          ” permissions
                        </h2>
                      </div>
                      <div
                        className="button-group"
                        style={{ marginTop: "17px" }}
                        // style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <button type="submit" className="curriki-white-button">
                          Update Role
                        </button>
                      </div>
                    </div>
                  )}

                  {/* <Accordion defaultActiveKey="0">
                    {!!permissionsId &&
                      Object.keys(permissionsId)?.map((data, counter) => {
                        if (typeof permissionsId[data] === "object") {
                          return (
                            <Card>
                              <Accordion.Toggle
                                as={Card.Header}
                                eventKey={String(counter)}
                              >
                                {data}
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey={String(counter)}>
                                <Card.Body>
                                  {permissionsId[data]?.map((val) => (
                                    <div
                                      className="form-grouper"
                                      role="group"
                                      aria-labelledby="checkbox-group"
                                    >
                                      <label>
                                        <Field
                                          type="checkbox"
                                          name="permissions"
                                          value={String(val.id)}
                                        />
                                        &nbsp;&nbsp;
                                        {val.name}
                                      </label>
                                    </div>
                                  ))}
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          );
                        }
                      })}
                  </Accordion> */}
                  {/*  */}
                  <Tab.Container id="left-tabs-example" defaultActiveKey="0">
                    <Row className="roles-permission-tab-row">
                      <Col className="roles-permission-tab" sm={2}>
                        <Nav variant="pills" className="flex-column">
                          <div
                            className="role-permission-tab-name"
                            id="role-permission-tab-id"
                          >
                            <Nav.Item>
                              <Nav.Link eventKey="manual-1">
                                All permissions
                                <img className="image-tag" />
                              </Nav.Link>
                            </Nav.Item>
                          </div>
                          <div
                            className="role-permission-tab-name"
                            id="role-permission-tab-id"
                          >
                            <Nav.Item>
                              <Nav.Link eventKey="manual-2">
                                Admin panel
                                <img className="image-tag" />
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="manual-3">
                                User
                                <img className="image-tag" />
                              </Nav.Link>
                            </Nav.Item>
                          </div>
                          {!!permissionsId &&
                            Object.keys(permissionsId)?.map((data, counter) => {
                              if (typeof permissionsId[data] === "object") {
                                return (
                                  <div
                                    className="role-permission-tab-name"
                                    id="role-permission-tab-id"
                                  >
                                    <Nav.Item>
                                      <Nav.Link eventKey={String(counter)}>
                                        {data}
                                        {/* <FontAwesomeIcon
                                          className="role-permission-icon"
                                          icon={faAngleRight}
                                        /> */}
                                        <img className="image-tag" />
                                      </Nav.Link>
                                    </Nav.Item>
                                  </div>
                                );
                              }
                            })}
                        </Nav>
                      </Col>
                      <Col className="detail-permission-tab" sm={10}>
                        <Tab.Content>
                          {/* For All Permission */}
                          <Tab.Pane eventKey="manual-1">
                            {!!permissionsId &&
                              Object.keys(permissionsId)?.map(
                                (data, counter) => {
                                  if (typeof permissionsId[data] === "object") {
                                    return (
                                      <Card.Body
                                        style={{
                                          background: "#f7faff",
                                          margin: "32px",
                                        }}
                                      >
                                        <div className="all-permission-tab-data">
                                          <div className="permission-tab-title">
                                            <label className="checkbox_section">
                                              <input
                                                type="checkbox"
                                                name="permissions"
                                              />
                                              <span></span>
                                              <p>{data}</p>
                                            </label>
                                            {/* {data} */}
                                          </div>
                                          <div className="permission-tab-data">
                                            {permissionsId[data]?.map((val) => (
                                              <div
                                                className="form-grouper"
                                                role="group"
                                                aria-labelledby="checkbox-group"
                                              >
                                                <label className="checkbox_section_custom">
                                                  <Field
                                                    type="checkbox"
                                                    name="permissions"
                                                    value={String(val.id)}
                                                    component={MySpecialField}
                                                  />
                                                  &nbsp;&nbsp;
                                                  {val.name}
                                                </label>
                                              </div>
                                            ))}
                                          </div>
                                        </div>
                                      </Card.Body>
                                    );
                                  }
                                }
                              )}
                          </Tab.Pane>

                          {/* For Admin */}
                          <Tab.Pane eventKey="manual-2">
                            <Card.Body
                              style={{
                                background: "#f7faff",
                                margin: "32px",
                              }}
                            >
                              <div>
                                <Formik
                                  initialValues={{
                                    admin: "edit",
                                    organization: "edit",
                                    activities: "edit",
                                    teams: "edit",
                                    projects: "edit",
                                    users: "edit",
                                    integrations: "edit",
                                  }}
                                  // validate={(values) => {

                                  // }}
                                  onSubmit={(values) => {
                                    alert("OnSubmit Call");
                                  }}
                                >
                                  {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                  }) => (
                                    <form onSubmit={handleSubmit}>
                                      <div>
                                        <div>
                                          <div className="form-group custom-select-style">
                                            <select
                                              name="admin"
                                              placeholder="Admin"
                                              onChange={(e) => {
                                                handleChange(e);
                                                let adminValue = e.target.value;
                                                if (e.target.value == "edit") {
                                                  alert(e.target.value);
                                                  values.organization = "edit";
                                                  values.activities = "edit";
                                                  values.teams = "edit";
                                                  values.projects = "edit";
                                                  values.users = "edit";
                                                  values.integrations = "edit";
                                                } else if (
                                                  e.target.value == "view"
                                                ) {
                                                  alert(e.target.value);
                                                  values.organization = "view";
                                                  values.activities = "view";
                                                  values.teams = "view";
                                                  values.projects = "view";
                                                  values.users = "view";
                                                  values.integrations = "view";
                                                }
                                              }}
                                              onBlur={handleBlur}
                                              value={values.admin}
                                            >
                                              <option value="---">---</option>
                                              <option value="edit">Edit</option>
                                              <option value="view">View</option>
                                            </select>
                                            <p style={{ fontWeight: "bold" }}>
                                              {" "}
                                              Admin panel
                                            </p>
                                          </div>
                                        </div>
                                        <div className="admin-panel-child-selection">
                                          <div className="form-group custom-select-style">
                                            <select
                                              name="organization"
                                              placeholder="organization"
                                              onChange={(e) => {
                                                handleChange(e);
                                                values.admin = checkingAdminSelectionStatus(
                                                  e.target.value,
                                                  values.activities,
                                                  values.teams,
                                                  values.projects,
                                                  values.users,
                                                  values.integrations
                                                );

                                                let updatedValue =
                                                  e.target.value;
                                              }}
                                              onBlur={handleBlur}
                                              value={values.organization}
                                            >
                                              <option value="edit">Edit</option>
                                              <option value="view">View</option>
                                            </select>
                                            <p>Organization</p>
                                          </div>
                                          <div className="form-group custom-select-style">
                                            <select
                                              name="activities"
                                              placeholder="activities"
                                              onChange={(e) => {
                                                values.admin = checkingAdminSelectionStatus(
                                                  values.organization,
                                                  e.target.value,
                                                  values.teams,
                                                  values.projects,
                                                  values.users,
                                                  values.integrations
                                                );
                                                handleChange(e);
                                                let updatedValue =
                                                  e.target.value;
                                              }}
                                              onBlur={handleBlur}
                                              value={values.activities}
                                            >
                                              <option value="edit">Edit</option>
                                              <option value="view">View</option>
                                            </select>
                                            <p>Activities</p>
                                          </div>
                                          <div className="form-group custom-select-style">
                                            <select
                                              name="teams"
                                              placeholder="teams"
                                              onChange={(e) => {
                                                values.admin = checkingAdminSelectionStatus(
                                                  values.organization,
                                                  values.activities,
                                                  e.target.value,
                                                  values.projects,
                                                  values.users,
                                                  values.integrations
                                                );
                                                handleChange(e);
                                                let updatedValue =
                                                  e.target.value;
                                              }}
                                              onBlur={handleBlur}
                                              value={values.teams}
                                            >
                                              <option value="edit">Edit</option>
                                              <option value="view">View</option>
                                            </select>
                                            <p>Teams</p>
                                          </div>
                                          <div className="form-group custom-select-style">
                                            <select
                                              name="teams"
                                              placeholder="teams"
                                              onChange={(e) => {
                                                values.admin = checkingAdminSelectionStatus(
                                                  values.organization,
                                                  values.activities,
                                                  e.target.value,
                                                  values.projects,
                                                  values.users,
                                                  values.integrations
                                                );
                                                handleChange(e);
                                                let updatedValue =
                                                  e.target.value;
                                              }}
                                              onBlur={handleBlur}
                                              value={values.teams}
                                            >
                                              <option value="edit">Edit</option>
                                              <option value="view">View</option>
                                            </select>
                                            <p>Teams</p>
                                          </div>
                                          <div className="form-group custom-select-style">
                                            <select
                                              name="projects"
                                              placeholder="projects"
                                              onChange={(e) => {
                                                values.admin = checkingAdminSelectionStatus(
                                                  values.organization,
                                                  values.activities,
                                                  values.teams,
                                                  e.target.value,
                                                  values.users,
                                                  values.integrations
                                                );
                                                handleChange(e);
                                                let updatedValue =
                                                  e.target.value;
                                              }}
                                              onBlur={handleBlur}
                                              value={values.projects}
                                            >
                                              <option value="edit">Edit</option>
                                              <option value="view">View</option>
                                            </select>
                                            <p>Projects</p>
                                          </div>
                                          <div className="form-group custom-select-style">
                                            <select
                                              name="users"
                                              placeholder="users"
                                              onChange={(e) => {
                                                values.admin = checkingAdminSelectionStatus(
                                                  values.organization,
                                                  values.activities,
                                                  values.teams,
                                                  values.projects,
                                                  e.target.value,
                                                  values.integrations
                                                );
                                                handleChange(e);
                                                let updatedValue =
                                                  e.target.value;
                                              }}
                                              onBlur={handleBlur}
                                              value={values.users}
                                            >
                                              <option value="edit">Edit</option>
                                              <option value="view">View</option>
                                            </select>
                                            <p>Users</p>
                                          </div>
                                          <div className="form-group custom-select-style">
                                            <select
                                              name="integrations"
                                              placeholder="integrations"
                                              onChange={(e) => {
                                                values.admin = checkingAdminSelectionStatus(
                                                  values.organization,
                                                  values.activities,
                                                  values.teams,
                                                  values.projects,
                                                  values.users,
                                                  e.target.value
                                                );
                                                handleChange(e);
                                                let updatedValue =
                                                  e.target.value;
                                              }}
                                              onBlur={handleBlur}
                                              value={values.integrations}
                                            >
                                              <option value="edit">Edit</option>
                                              <option value="view">View</option>
                                            </select>
                                            <p>Integrations</p>
                                          </div>
                                          <div className="form-group custom-select-style">
                                            <select
                                              name="integrations"
                                              placeholder="integrations"
                                              onChange={(e) => {
                                                values.admin = checkingAdminSelectionStatus(
                                                  values.organization,
                                                  values.activities,
                                                  values.teams,
                                                  values.projects,
                                                  values.users,
                                                  e.target.value
                                                );
                                                handleChange(e);
                                                let updatedValue =
                                                  e.target.value;
                                              }}
                                              onBlur={handleBlur}
                                              value={values.integrations}
                                            >
                                              <option value="edit">Edit</option>
                                              <option value="view">View</option>
                                            </select>
                                            <p>Integrations</p>
                                          </div>
                                        </div>
                                      </div>
                                    </form>
                                  )}
                                </Formik>
                              </div>
                            </Card.Body>
                          </Tab.Pane>
                          {/* For User */}
                          <Tab.Pane eventKey="manual-3">
                            <Card.Body
                              style={{
                                background: "#f7faff",
                                margin: "32px",
                              }}
                            >
                              User
                            </Card.Body>
                          </Tab.Pane>

                          {!!permissionsId &&
                            Object.keys(permissionsId)?.map((data, counter) => {
                              if (typeof permissionsId[data] === "object") {
                                return (
                                  <Tab.Pane eventKey={String(counter)}>
                                    <Card.Body
                                      style={{
                                        background: "#f7faff",
                                        margin: "32px",
                                      }}
                                    >
                                      {permissionsId[data]?.map((val) => (
                                        <div
                                          className="form-grouper"
                                          role="group"
                                          aria-labelledby="checkbox-group"
                                        >
                                          {/* <label className="checkbox_section">
                                            <input
                                              type="checkbox"
                                              name="permissions"
                                              value={String(val.id)}
                                            />
                                            <span></span>
                                            <p>{val.name}</p>
                                          </label> */}

                                          <label className="checkbox_section_custom">
                                            <Field
                                              type="checkbox"
                                              name="permissions"
                                              value={String(val.id)}
                                              component={MySpecialField}
                                            />
                                            &nbsp;&nbsp;
                                            {val.name}
                                          </label>
                                        </div>
                                      ))}
                                    </Card.Body>
                                  </Tab.Pane>
                                );
                              }
                            })}
                        </Tab.Content>
                      </Col>
                    </Row>
                  </Tab.Container>
                  {/*  */}
                  <div className="error">
                    {errors.title && touched.title && errors.title}
                  </div>
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

UserRoles.propTypes = {
  // manage: PropTypes.object.isRequired,
  // type:PropTypes.string.isRequired,
};

export default UserRoles;
