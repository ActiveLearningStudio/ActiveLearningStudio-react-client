/* eslint-disable */
import React, { useState, useMemo, useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Tab, Row, Col, Nav } from 'react-bootstrap';
import { removeActiveAdminForm } from 'store/actions/admin';
import { addRole } from 'store/actions/organization';
import { gettAllDynamicPermisison } from 'store/actions/admin';
export default function AddRole() {
  const dispatch = useDispatch();
  const { activeOrganization, roles } = useSelector((state) => state.organization);
  const { roleAddDynamicPermission } = useSelector((state) => state.admin);

  const [allActivePermission, setAllActivePermission] = useState([]);
  useEffect(() => {
    const activeIds = [];
    roleAddDynamicPermission?.map((data) => data.ui_sub_modules?.map((sub) => sub.ui_module_permissions?.map((mod) => mod.selected && activeIds.push(mod.id)))),
      setAllActivePermission(activeIds);
  }, [roleAddDynamicPermission]);

  useMemo(() => {
    dispatch(gettAllDynamicPermisison(1, 1, true));
  }, []);

  return (
    <div className="create-form add-role-form">
      <Formik
        initialValues={{
          name: '',
          display_name: '',
          permissions: allActivePermission,
        }}
        // enableReinitialize
        validate={(values) => {
          const errors = {};
          if (!values.display_name) {
            errors.display_name = 'Required';
          }
          // if (values.permissions.length < 1) {
          //   errors.permissions = 'please select atleast one permission';
          // }

          return errors;
        }}
        onSubmit={async (values) => {
          const result = dispatch(addRole(activeOrganization.id, { ...values, permissions: allActivePermission }));
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
                        <Nav.Item>
                          <Nav.Link eventKey="manual-3">
                            All Permissions
                            <img className="image-tag" />
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                      {roleAddDynamicPermission?.map((data, counter) => {
                        return (
                          <div className="role-permission-tab-name" id="role-permission-tab-id">
                            <Nav.Item>
                              <Nav.Link eventKey={String(counter)}>
                                {data.title}

                                <img className="image-tag" />
                              </Nav.Link>
                            </Nav.Item>
                          </div>
                        );
                      })}
                    </Nav>
                  </Col>
                  <Col className="detail-permission-tab" sm={10}>
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
                          {roleAddDynamicPermission?.map((data, counter) => {
                            return (
                              <div className="permission">
                                <div className="selection-tab-custom">
                                  <div className="form-group custom-select-style-for-sub">
                                    <DynamicEdit
                                      bold
                                      subData={
                                        (data.ui_sub_modules?.length === 1 && data.ui_sub_modules[0].ui_module_permissions) || [
                                          { id: '', title: '', selected: true },
                                          {
                                            id: 'View',
                                            title: 'View',
                                            selected: data.general === 'View' ? true : false,
                                          },
                                          { id: 'Edit', title: 'Edit', selected: data.general === 'Edit' ? true : false },
                                          { id: 'None', title: 'None', selected: data.general === 'None' ? true : false },
                                        ]
                                      }
                                      title={data.title}
                                      allActivePermission={allActivePermission}
                                      setAllActivePermission={setAllActivePermission}
                                      roleAddDynamicPermission={roleAddDynamicPermission}
                                      dispatch={dispatch}
                                      parent={data.title}
                                    />
                                  </div>
                                </div>
                                <div className="permission-about">
                                  {data.ui_sub_modules?.length > 1 &&
                                    data.ui_sub_modules?.map((sub, countersub) => (
                                      <DynamicEdit
                                        key={countersub}
                                        subData={sub.ui_module_permissions}
                                        title={sub.title}
                                        parent={data.title}
                                        allActivePermission={allActivePermission}
                                        setAllActivePermission={setAllActivePermission}
                                        dispatch={dispatch}
                                        roleAddDynamicPermission={roleAddDynamicPermission}
                                      />
                                    ))}
                                </div>
                              </div>
                            );
                          })}
                        </Card.Body>
                      </Tab.Pane>

                      {roleAddDynamicPermission?.map((data, counter) => {
                        return (
                          <Tab.Pane eventKey={counter}>
                            <Card.Body
                              className="flex-column"
                              style={{
                                background: '#f7faff',
                                margin: '32px',
                              }}
                            >
                              <div className="selection-tab-custom">
                                <div className="form-group custom-select-style-for-sub">
                                  <DynamicEdit
                                    bold
                                    subData={
                                      (data.ui_sub_modules?.length === 1 && data.ui_sub_modules[0].ui_module_permissions) || [
                                        { id: '', title: '', selected: true },
                                        {
                                          id: 'View',
                                          title: 'View',
                                          selected: data.general === 'View' ? true : false,
                                        },
                                        { id: 'Edit', title: 'Edit', selected: data.general === 'Edit' ? true : false },
                                        { id: 'None', title: 'None', selected: data.general === 'None' ? true : false },
                                      ]
                                    }
                                    title={data.title}
                                    allActivePermission={allActivePermission}
                                    setAllActivePermission={setAllActivePermission}
                                    roleAddDynamicPermission={roleAddDynamicPermission}
                                    dispatch={dispatch}
                                    parent={data.title}
                                  />
                                </div>
                              </div>
                              <div className="permission-about d-flex flex-wrap">
                                {data.ui_sub_modules?.length > 1 &&
                                  data.ui_sub_modules?.map((sub, countersub) => (
                                    <DynamicEdit
                                      key={countersub}
                                      subData={sub.ui_module_permissions}
                                      title={sub.title}
                                      allActivePermission={allActivePermission}
                                      setAllActivePermission={setAllActivePermission}
                                      dispatch={dispatch}
                                      roleAddDynamicPermission={roleAddDynamicPermission}
                                      parent={data.title}
                                    />
                                  ))}
                              </div>
                            </Card.Body>
                          </Tab.Pane>
                        );
                      })}
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

export const DynamicEdit = ({ parent, subData, title, bold, allActivePermission, setAllActivePermission, roleAddDynamicPermission, dispatch }) => {
  return (
    <div className="form-group custom-select-style-for-sub">
      <select
        onChange={(e) => {
          if (e.target.value === 'View' || e.target.value === 'Edit' || e.target.value === 'None') {
            dispatch({
              type: 'SET_ALL_DEFAULT_PERMISSION',
              payload: roleAddDynamicPermission.map((data) => {
                if (data.title === title) {
                  return {
                    ...data,
                    ui_sub_modules: data.ui_sub_modules.map((mod) => {
                      return {
                        ...mod,
                        ui_module_permissions: mod.ui_module_permissions.map((per) => {
                          if (per.title === e.target.value) {
                            return { ...per, selected: true };
                          } else {
                            return { ...per, selected: false };
                          }
                        }),
                      };
                    }),
                  };
                } else {
                  return data;
                }
              }),
            });
          } else {
            dispatch({
              type: 'SET_ALL_DEFAULT_PERMISSION',
              payload: roleAddDynamicPermission.map((data) => {
                if (data.title === parent) {
                  const updateGeneric = data.ui_sub_modules.map((mod) => {
                    return mod.ui_module_permissions.map((per) => {
                      if (mod.title === title || mod.title === 'Organiziation') {
                        if (String(per.id) === String(e.target.value)) {
                          return { ...per, selected: true };
                        }
                      } else {
                        if (per.selected) {
                          return per;
                        }
                      }
                    });
                  });
                  return {
                    ...data,
                    general: [].concat
                      .apply([], updateGeneric)
                      .filter((data) => data !== undefined)
                      .map((data) => data.title)
                      .every((val, i, arr) => val === arr[0])
                      ? [].concat
                          .apply([], updateGeneric)
                          .filter((data) => data !== undefined)
                          .map((data) => data.title)?.[0]
                      : '',
                    ui_sub_modules: data.ui_sub_modules.map((mod) => {
                      return {
                        ...mod,
                        ui_module_permissions: mod.ui_module_permissions.map((per) => {
                          console.log(mod.title, title);
                          if (mod.title === title || mod.title === 'Organiziation') {
                            console.log(String(per.id), String(e.target.value));
                            if (String(per.id) === String(e.target.value)) {
                              return { ...per, selected: true };
                            } else {
                              return { ...per, selected: false };
                            }
                          } else {
                            return per;
                          }
                        }),
                      };
                    }),
                  };
                } else {
                  return data;
                }
              }),
            });
          }
        }}
      >
        {subData?.map((subData, counter) => {
          return (
            <option key={counter} selected={subData.selected} value={subData.id}>
              {subData.title}
            </option>
          );
        })}
      </select>
      {bold ? <h6>{title}</h6> : <p> {title}</p>}
    </div>
  );
};

AddRole.propTypes = {};
