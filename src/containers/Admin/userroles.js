/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Accordion, Card, Alert } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Field } from 'formik';
import { updateRole, getAllPermissionId, roleDetail } from 'store/actions/organization'
import Swal from 'sweetalert2';

function UserRoles({permissionRender}) {

  const dispatch = useDispatch();
  const { permission, activeOrganization, activePermission, permissionsId, roles } = useSelector((state) => state.organization);
  const [checkRoles, setCheckRoles] = useState('');
  useEffect(() => {
    const extractPermission = [];
    if (activePermission) {
      activePermission?.[0]?.permissions?.map((data) => extractPermission.push(String(data.id)));
    }
    console.log(extractPermission)
    setCheckRoles(extractPermission)
  }, [activePermission]);

  useEffect(() => {
    dispatch(getAllPermissionId(activeOrganization?.id));
    if(!!roles) {
    if (roles?.length !== 0) dispatch(roleDetail(activeOrganization.id, roles[0]?.id));
    }
  }, []);

  return (
    <div className="user-roles">
      <h2>Roles Permissions</h2>
      {true ?
      <div className="box-group">
        <Formik
          initialValues={{
            role_id: activePermission?.[0]?.id,
            permissions: checkRoles,
          }}
          enableReinitialize

          onSubmit={async (values) => {
            dispatch(updateRole(activeOrganization.id, values))
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


              <div className="form-group-create dynamic-roles ">
              {permission?.Organization?.includes('organization:edit-role') && (

                <div className="button-group" style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button type="submit" className="curriki-white-button">
                    Update Role
                  </button>

                </div>
              )}

                <Accordion defaultActiveKey="0">
                  {!!permissionsId && Object.keys(permissionsId)?.map((data, counter) => {

                    if (typeof (permissionsId[data]) === 'object') {
                      return <Card>
                        <Accordion.Toggle as={Card.Header} eventKey={String(counter)}>
                          {data}
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={String(counter)}>
                          <Card.Body>

                            {permissionsId[data]?.map((val) => (

                              <div className="form-grouper" role="group" aria-labelledby="checkbox-group">
                                <label>
                                  <Field type="checkbox" name="permissions" value={String(val.id)} />&nbsp;&nbsp;
                                  {val.name}
                                </label>


                              </div>
                            ))}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    }

                  })}


                </Accordion>
                <div className="error">
                  {errors.title && touched.title && errors.title}
                </div>
              </div>

            </form>
          )}
        </Formik>
      </div> : <><br /><Alert variant="danger">Not authorized to access this.</Alert></>}
    </div>
  );
}

UserRoles.propTypes = {
  // manage: PropTypes.object.isRequired,
  // type:PropTypes.string.isRequired,
};

export default UserRoles;
