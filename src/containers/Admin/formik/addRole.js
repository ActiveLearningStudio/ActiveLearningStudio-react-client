/* eslint-disable */
import React, { useState, useRef, useEffect } from "react";
import { Formik, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Card, Alert, Tab, Row, Col, Nav } from "react-bootstrap";
import { removeActiveAdminForm } from "store/actions/admin";
import { addRole, getAllPermissionId } from "store/actions/organization";

export default function AddRole(props) {
  const dispatch = useDispatch();
  const { permissionsId, activeOrganization, permission, roles } = useSelector(
    (state) => state.organization
  );

  useEffect(() => {
    dispatch(getAllPermissionId(activeOrganization?.id));
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
    <div className="create-form">
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
              {/* Update */}

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
