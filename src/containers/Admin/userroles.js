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
  console.log("activePermission:", activePermission[0]?.display_name);
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
                          Edit “{activePermission[0]?.display_name}” permissions
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
