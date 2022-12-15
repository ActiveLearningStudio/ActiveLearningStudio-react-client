/* eslint-disable */
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Card, Alert, Tab, Row, Col, Nav } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { roleDetail, updateAllDynamicPermisison } from 'store/actions/organization';
import { gettAllDynamicPermisison } from 'store/actions/admin';
import updateImg from '../../assets/images/update.svg';

function UserRoles() {
  const dispatch = useDispatch();
  const { activeOrganization, activePermission, currentOrganization, roles } = useSelector((state) => state.organization);
  const { dynamicPermission } = useSelector((state) => state.admin);

  const [allActivePermission, setAllActivePermission] = useState([]);

  useEffect(() => {
    const activeIds = [];
    dynamicPermission?.map((data) => data.ui_sub_modules?.map((sub) => sub.ui_module_permissions?.map((mod) => mod.selected && activeIds.push(mod.id)))),
      setAllActivePermission(activeIds);
  }, [dynamicPermission]);

  useMemo(() => {
    dispatch(roleDetail(activeOrganization.id, roles[0]?.id));
  }, [activeOrganization]);

  useMemo(() => {
    if (activePermission?.[0]?.id) {
      dispatch(gettAllDynamicPermisison(activeOrganization?.id, activePermission?.[0]?.id));
    }
  }, [activeOrganization, activePermission?.[0]?.id]);

  return (
    <div className="user-roles">
      {/* <h2>Roles Permissions</h2> */}
      {true ? (
        <div className="box-group">
          <Formik
            initialValues={{
              role_id: activePermission?.[0]?.id,
              permissions: allActivePermission,
            }}
            enableReinitialize
            onSubmit={async (values) => {
              dispatch(updateAllDynamicPermisison(activeOrganization.id, { role_id: activePermission?.[0]?.id, permissions: allActivePermission }, currentOrganization.id));
            }}
          >
            {({
              errors,
              touched,

              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                {!dynamicPermission && <Alert variant="primary">Loading</Alert>}
                <div className="form-group-create dynamic-roles">
                  {true && (
                    <div className="dynamic-roles-title-btn">
                      <div>
                        <h2>Edit “{activePermission && activePermission[0]?.display_name}” permissions</h2>
                      </div>
                      <div className="button-group">
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
                            <Nav.Item>
                              <Nav.Link eventKey="manual-3">
                                All Permissions
                                <img className="image-tag" />
                              </Nav.Link>
                            </Nav.Item>
                          </div>
                          {dynamicPermission?.map((data, counter) => {
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
                              {dynamicPermission?.map((data, counter) => {
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
                                          dynamicPermission={dynamicPermission}
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
                                            dynamicPermission={dynamicPermission}
                                          />
                                        ))}
                                    </div>
                                  </div>
                                );
                              })}
                            </Card.Body>
                          </Tab.Pane>

                          {dynamicPermission?.map((data, counter) => {
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
                                        dynamicPermission={dynamicPermission}
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
                                          dynamicPermission={dynamicPermission}
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

export const DynamicEdit = ({ parent, subData, title, bold, allActivePermission, setAllActivePermission, dynamicPermission, dispatch }) => {
  const changeColor = useRef();
  return (
    <div className="form-group custom-select-style-for-sub">
      <select
        onChange={(e) => {
          // console.log(e.target);
          // if (e.target.value === 'None' || e.target.value === '3') {
          //   e.target.classList.add('disableselect');
          // } else {
          //   e.target.classList.remove('disableselect');
          // }
          if (e.target.value === 'View' || e.target.value === 'Edit' || e.target.value === 'None') {
            dispatch({
              type: 'SET_ALL_PERMISSION',
              payload: dynamicPermission.map((data) => {
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
              type: 'SET_ALL_PERMISSION',
              payload: dynamicPermission.map((data) => {
                if (data.title === parent) {
                  const updateGeneric = data.ui_sub_modules.map((mod) => {
                    return mod.ui_module_permissions.map((per) => {
                      if (mod.title === title || mod.title === 'Organization') {
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
                          if (mod.title === title || mod.title === 'Organization') {
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
        className={subData?.filter((data) => data.title === 'None')[0]?.selected ? 'activeNone' : ''}
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

export default UserRoles;
