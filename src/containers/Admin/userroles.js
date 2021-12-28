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
  // console.log("activePermission:", activePermission);
  // console.log("permissionsId:", permissionsId);
  console.log("permission:permission:", permission);
  const [checkRoles, setCheckRoles] = useState("");
  const [projectView, setProjectView] = useState([]);
  const [playlistsView, setPlaylistsView] = useState([]);
  const [activitiesView, setActivitiesView] = useState([]);
  const [organizationView, setOrganizationView] = useState([]);
  const [teamsView, setTeamsView] = useState([]);
  const [selectPlaylistsEV, setSelectPlaylistsEV] = useState([]);
  const [selectActivitiesEV, setSelectActivitiesEV] = useState([]);
  const [selectTeamsEV, setSelectTeamsEV] = useState([]);
  const projectEditDate = "ALL";
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
  useEffect(() => {
    const extractPermission = [];
    if (activePermission) {
      activePermission?.[0]?.permissions?.map((data) =>
        extractPermission.push(String(data.id))
      );
    }
    console.log("extractPermission:", extractPermission);
    setCheckRoles(extractPermission);
  }, [activePermission]);

  useEffect(() => {
    setTeamsView([]);
    setSelectTeamsEV([]);
    setActivitiesView([]);
    setSelectPlaylistsEV([]);
    {
      !!permissionsId &&
        Object.keys(permissionsId)?.map((data, counter) => {
          if (typeof permissionsId[data] === "object") {
            if (data == "Project") {
              permissionsId[data]?.map((val) => {
                if (projectViewDate.includes(val.name)) {
                  // console.log("VAL View:", val.id);
                  setProjectView((prevItems) => [...prevItems, String(val.id)]);
                }
              });
            }
            if (data == "Activity") {
              permissionsId[data]?.map((val) => {
                if (activityViewDate.includes(val.name)) {
                  setActivitiesView((prevItems) => [
                    ...prevItems,
                    String(val.id),
                  ]);
                }
              });

              permission.Activity.map((val) => {
                if (activityViewDate.includes(val)) {
                  setSelectActivitiesEV((prevItems) => [...prevItems, val]);
                }
              });
            }
            if (data == "Playlist") {
              permissionsId[data]?.map((val) => {
                if (playlistViewDate.includes(val.name)) {
                  setPlaylistsView((prevItems) => [
                    ...prevItems,
                    String(val.id),
                  ]);
                }
              });

              permission.Playlist.map((val) => {
                if (playlistViewDate.includes(val)) {
                  setSelectPlaylistsEV((prevItems) => [...prevItems, val]);
                }
              });
            }
            if (data == "Team") {
              permissionsId[data]?.map((val) => {
                if (teamViewDate.includes(val.name)) {
                  setTeamsView((prevItems) => [...prevItems, String(val.id)]);
                }
              });

              permission.Team.map((val) => {
                if (teamViewDate.includes(val)) {
                  setSelectTeamsEV((prevItems) => [...prevItems, val]);
                }
              });
            }
            // if (data == "Organization") {
            //   permissionsId[data]?.map((val) => {
            //     if (organizationViewData.includes(val.name)) {
            //       setOrganizationView((prevItems) => [
            //         ...prevItems,
            //         String(val.id),
            //       ]);
            //     }
            //   });
            // }
          }
        });
    }
  }, [permissionsId]);
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
  // const checkingAdminSelectionStatus = (
  //   organization,
  //   activities,
  //   teams,
  //   projects,
  //   users,
  //   integrations
  // ) => {
  //   if (
  //     organization == "edit" &&
  //     activities == "edit" &&
  //     teams == "edit" &&
  //     projects == "edit" &&
  //     users == "edit" &&
  //     integrations == "edit"
  //   ) {
  //     return "edit";
  //   } else if (
  //     organization == "view" &&
  //     activities == "view" &&
  //     teams == "view" &&
  //     projects == "view" &&
  //     users == "view" &&
  //     integrations == "view"
  //   ) {
  //     return "view";
  //   } else {
  //     return "---";
  //   }
  // };

  console.log("permissionsId:", permissionsId);
  // Hard Code
  // const Administration = [
  //   "Organization",
  //   "Project",
  //   "Activity",
  //   "User",
  //   "Team",
  //   "Integration",
  // ];
  const Administration = ["Organization"];
  const Authoring = [
    "Project",
    "Playlist",
    "Activitie",
    "Team",
    "Search",
    "Export",
    "Import",
  ];

  Administration.map((data) => {
    console.log("Data:", data);
  });

  // const AdministrationFilter = permissionsId?.filter((data) => {
  //   Administration.map((adminData) => {
  //     return data == adminData;
  //   });
  // });
  // console.log("AdministrationFilter:", AdministrationFilter);
  return (
    <div className="user-roles">
      {/* <h2>Roles Permissions</h2> */}
      {true ? (
        <div className="box-group">
          <Formik
            initialValues={{
              role_id: activePermission?.[0]?.id,
              permissions: checkRoles,
              projectStatus: "edit",
              activityStatus: selectActivitiesEV.length > 0 ? "edit" : "view",
              playlistStatus: selectPlaylistsEV.length > 0 ? "edit" : "view",
              teamStatus: selectTeamsEV.length > 0 ? "edit" : "view",
            }}
            enableReinitialize
            onSubmit={async (values) => {
              console.log("values-Role-Update:", values);

              // if (values.projectStatus == "view") {
              //   values.permissions = values.permissions.filter((data) => {
              //     return (
              //       data !=
              //       projectView.find((permissionData) => permissionData == data)
              //     );
              //   });
              // }
              // if (values.activityStatus == "view") {
              //   values.permissions = values.permissions.filter((data) => {
              //     return (
              //       data !=
              //       activitiesView.find(
              //         (permissionData) => permissionData == data
              //       )
              //     );
              //   });
              // }
              // if (values.playlistStatus == "view") {
              //   values.permissions = values.permissions.filter((data) => {
              //     return (
              //       data !=
              //       playlistsView.find(
              //         (permissionData) => permissionData == data
              //       )
              //     );
              //   });
              // }
              // if (values.teamStatus == "view") {
              //   values.permissions = values.permissions.filter((data) => {
              //     return (
              //       data !=
              //       teamsView.find((permissionData) => permissionData == data)
              //     );
              //   });
              // }
              // console.log("values-Role-Update  after:", values);
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
                  {/* <button type="submit" className="curriki-white-button">
                    Update Role
                  </button> */}

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
                          {/* <div
                            className="role-permission-tab-name"
                            id="role-permission-tab-id"
                          >
                            {!!permissionsId && (
                              <Nav.Item>
                                <Nav.Link eventKey="manual-1">
                                  All permissions
                                  <img className="image-tag" />
                                </Nav.Link>
                              </Nav.Item>
                            )}
                          </div> */}
                          {!!permissionsId &&
                            Object.keys(permissionsId)?.map((data, counter) => {
                              if (typeof permissionsId[data] === "object") {
                                if (Administration.includes(data)) {
                                  return (
                                    <div
                                      className="role-permission-tab-name"
                                      id="role-permission-tab-id"
                                    >
                                      <Nav.Item>
                                        <Nav.Link eventKey={String(counter)}>
                                          {/* {data} */}
                                          Admin Panel
                                          <img className="image-tag" />
                                        </Nav.Link>
                                      </Nav.Item>
                                    </div>
                                  );
                                }
                              }
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
                          {/* For All Permission */}
                          {/* <Tab.Pane eventKey="manual-1">
                            {!!permissionsId &&
                              Object.keys(permissionsId)?.map(
                                (data, counter) => {
                                  if (typeof permissionsId[data] === "object") {
                                    if (data == "Project") {
                                      return (
                                        <>
                                        <Card.Body
                                          style={{
                                            background: "#f7faff",
                                            margin: "32px",
                                          }}
                                        >
                                          <div className="all-permission-tab-data">
                                            <div className="permission-tab-title">
                                              <div>
                                                <div className="form-group custom-select-style">
                                                  <select
                                                    name=""
                                                    onChange={(e) => {}}
                                                    onBlur={handleBlur}
                                                    // value={values.admin}
                                                  >
                                                    <option value="edit">
                                                      Edit
                                                    </option>
                                                    <option value="view">
                                                      View
                                                    </option>
                                                  </select>
                                                  <p
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    {" "}
                                                    {data}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="permission-tab-data">
                                              {permissionsId[data]?.map(
                                                (val) => (
                                                  <div
                                                    className="form-grouper"
                                                    role="group"
                                                    aria-labelledby="checkbox-group"
                                                  >
                                                    <div>
                                                      <div className="form-group custom-select-style-for-sub">
                                                        <select
                                                          name=""
                                                          onChange={(e) => {
                                                            if (
                                                              e.target.value ==
                                                              "view"
                                                            ) {
                                                              values.permissions = values.permissions.filter(
                                                                (data) => {
                                                                  return (
                                                                    data !=
                                                                    String(
                                                                      val.id
                                                                    )
                                                                  );
                                                                }
                                                              );
                                                            } else {
                                                              !values.permissions.includes(
                                                                String(val.id)
                                                              ) &&
                                                                values.permissions.push(
                                                                  String(val.id)
                                                                );
                                                            }
                                                          }}
                                                          onBlur={handleBlur}
                                                        >
                                                          <option
                                                            // selected={permission.Organization.includes(
                                                            //   val.name
                                                            // )}
                                                            selected={permission.Organization.includes(
                                                              val.name
                                                            )}
                                                            value="edit"
                                                          >
                                                            Edit
                                                          </option>
                                                          <option
                                                            value="view"
                                                            selected={
                                                              !permission.Organization.includes(
                                                                val.name
                                                              )
                                                            }
                                                          >
                                                            View
                                                          </option>
                                                        </select>
                                                        <p> {val.name}</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        </Card.Body>
                                        </>
                                      );
                                    } else {
                                      return (
                                        <Card.Body
                                          style={{
                                            background: "#f7faff",
                                            margin: "32px",
                                          }}
                                        >
                                          <div className="all-permission-tab-data">
                                            <div className="permission-tab-title">
                                              <div>
                                                <div className="form-group custom-select-style">
                                                  <select
                                                    name=""
                                                    onChange={(e) => {}}
                                                    onBlur={handleBlur}
                                                    // value={values.admin}
                                                  >
                                                    <option value="edit">
                                                      Edit
                                                    </option>
                                                    <option value="view">
                                                      View
                                                    </option>
                                                  </select>
                                                  <p
                                                    style={{
                                                      fontWeight: "bold",
                                                    }}
                                                  >
                                                    {" "}
                                                    {data}
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="permission-tab-data">
                                              {permissionsId[data]?.map(
                                                (val) => (
                                                  <div
                                                    className="form-grouper"
                                                    role="group"
                                                    aria-labelledby="checkbox-group"
                                                  >
                                                    <div>
                                                      <div className="form-group custom-select-style-for-sub">
                                                        <select
                                                          name=""
                                                          onChange={(e) => {
                                                            if (
                                                              e.target.value ==
                                                              "view"
                                                            ) {
                                                              values.permissions = values.permissions.filter(
                                                                (data) => {
                                                                  return (
                                                                    data !=
                                                                    String(
                                                                      val.id
                                                                    )
                                                                  );
                                                                }
                                                              );
                                                            } else {
                                                              !values.permissions.includes(
                                                                String(val.id)
                                                              ) &&
                                                                values.permissions.push(
                                                                  String(val.id)
                                                                );
                                                            }
                                                          }}
                                                          onBlur={handleBlur}
                                                        >
                                                          <option
                                                            selected={permission.Organization.includes(
                                                              val.name
                                                            )}
                                                            value="edit"
                                                          >
                                                            Edit
                                                          </option>
                                                          <option
                                                            value="view"
                                                            selected={
                                                              !permission.Organization.includes(
                                                                val.name
                                                              )
                                                            }
                                                          >
                                                            View
                                                          </option>
                                                        </select>
                                                        <p> {val.name}</p>
                                                      </div>
                                                    </div>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        </Card.Body>
                                      );
                                    }
                                  }
                                }
                              )}
                          </Tab.Pane> */}
                          {/* For Authoring */}
                          <Tab.Pane eventKey="manual-2">
                            <Card.Body
                              style={{
                                background: "#f7faff",
                                margin: "32px",
                              }}
                            >
                              <div className="for-authoring">
                                <div className="form-group custom-select-style-for-authoring">
                                  <select
                                    name="projectStatus"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.projectStatus}
                                  >
                                    <option value="edit">Edit</option>
                                    <option value="view">View</option>
                                  </select>
                                  <p> Projects</p>
                                </div>

                                <div className="form-group custom-select-style-for-authoring">
                                  <select
                                    name="playlistStatus"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.playlistStatus}
                                  >
                                    <option value="edit">Edit</option>
                                    <option value="view">View</option>
                                  </select>
                                  <p> Playlists</p>
                                </div>

                                <div className="form-group custom-select-style-for-authoring">
                                  <select
                                    name="activityStatus"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.activityStatus}
                                  >
                                    <option value="edit">Edit</option>
                                    <option value="view">View</option>
                                  </select>
                                  <p> Activities</p>
                                </div>

                                <div className="form-group custom-select-style-for-authoring">
                                  <select
                                    name="teamStatus"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.teamStatus}
                                  >
                                    <option value="edit">Edit</option>
                                    <option value="view">View</option>

                                    {/* <option
                                      
                                      selected={permission.Team.includes(
                                        permission.Team.filter((data) => {
                                          return (
                                            data.id ==
                                            teamsView.find(
                                              (permissionData) =>
                                                permissionData == data.id
                                            )
                                          );
                                        })
                                      )}
                                      value="edit"
                                    >
                                      Edit
                                    </option>
                                    <option
                                      value="view"
                                      selected={
                                        !permission.Team.includes(teamViewDate)
                                      }
                                    >
                                      View
                                    </option> */}
                                  </select>
                                  <p> Teams</p>
                                </div>
                              </div>
                            </Card.Body>
                          </Tab.Pane>

                          {!!permissionsId &&
                            Object.keys(permissionsId)?.map((data, counter) => {
                              if (typeof permissionsId[data] === "object") {
                                if (data == "Project") {
                                  return (
                                    <Tab.Pane eventKey={String(counter)}>
                                      {/* <Card.Body
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
                                      </Card.Body> */}
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
                                            <div>
                                              <div className="form-group custom-select-style-for-sub">
                                                <select
                                                  name=""
                                                  onChange={(e) => {
                                                    if (
                                                      e.target.value == "view"
                                                    ) {
                                                      values.permissions = values.permissions.filter(
                                                        (data) => {
                                                          return (
                                                            data !=
                                                            String(val.id)
                                                          );
                                                        }
                                                      );
                                                    } else {
                                                      !values.permissions.includes(
                                                        String(val.id)
                                                      ) &&
                                                        values.permissions.push(
                                                          String(val.id)
                                                        );
                                                    }
                                                  }}
                                                  onBlur={handleBlur}
                                                >
                                                  <option
                                                    selected={permission.Organization.includes(
                                                      val.name
                                                    )}
                                                    value="edit"
                                                  >
                                                    Edit
                                                  </option>
                                                  <option
                                                    value="view"
                                                    selected={
                                                      !permission.Organization.includes(
                                                        val.name
                                                      )
                                                    }
                                                  >
                                                    View
                                                  </option>
                                                </select>
                                                <p> {val.name}</p>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </Card.Body>
                                    </Tab.Pane>
                                  );
                                } else {
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
                                            <div>
                                              <div className="form-group custom-select-style-for-sub">
                                                <select
                                                  name=""
                                                  onChange={(e) => {
                                                    if (
                                                      e.target.value == "view"
                                                    ) {
                                                      values.permissions = values.permissions.filter(
                                                        (data) => {
                                                          return (
                                                            data !=
                                                            String(val.id)
                                                          );
                                                        }
                                                      );
                                                    } else {
                                                      !values.permissions.includes(
                                                        String(val.id)
                                                      ) &&
                                                        values.permissions.push(
                                                          String(val.id)
                                                        );
                                                    }
                                                  }}
                                                  onBlur={handleBlur}
                                                >
                                                  <option
                                                    selected={permission.Organization.includes(
                                                      val.name
                                                    )}
                                                    value="edit"
                                                  >
                                                    Edit
                                                  </option>
                                                  <option
                                                    value="view"
                                                    selected={
                                                      !permission.Organization.includes(
                                                        val.name
                                                      )
                                                    }
                                                  >
                                                    View
                                                  </option>
                                                </select>
                                                <p> {val.name}</p>
                                              </div>
                                            </div>
                                          </div>
                                        ))}
                                      </Card.Body>
                                    </Tab.Pane>
                                  );
                                }
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
