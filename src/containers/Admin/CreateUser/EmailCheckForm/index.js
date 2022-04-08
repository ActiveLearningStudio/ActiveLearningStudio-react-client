import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import adminService from 'services/admin.service';
import { removeActiveAdminForm } from 'store/actions/admin';
import PropTypes from 'prop-types';
import './style.scss';

const EmailCheckForm = (props) => {
  const { currentOrg, handleEmailChecked, roles } = props;
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [existingUser, setExistingUser] = useState(null);
  const [selectedRole, setSelectedRole] = useState(roles[0].id);

  const doCheck = async () => {
    setError(null);
    const response = await adminService.checkUserEmail(currentOrg.id, email);
    if (response?.message && response?.user) {
      // User exists and belongs to currentOrg
      setError(response.message);
      return;
    }

    if (response?.user) {
      // User exists but doesn't belong to currentOrg
      setExistingUser(response.user);
      return;
    }

    if (response?.message) {
      // User does not exist
      handleEmailChecked('new-user', email);
    }
  };

  const doAddToOrg = async () => {
    const result = await adminService.addUserToOrg(currentOrg.id, existingUser.id, selectedRole);
    if (!result?.errors) {
      handleEmailChecked('added-to-org');
    }
  };

  return (
    <div className="container email-check-form">
      <label>Email</label>
      <div className="row">
        <div className="col">
          <div className="form-group-create">
            <input className="form-control" type="email" name="email" onChange={(e) => setEmail(e.target.value)} />
            {error && (
              <div className="error">
                {error}
              </div>
            )}
          </div>
        </div>
        <div className="col text-right">
          <button type="button" className="btn btn-primary addButton" onClick={doCheck}>
            Add User
          </button>
        </div>
      </div>
      {existingUser && (
        <div className="row">
          <div className="col">
            <Alert variant="warning mt-4">
              <div className="row">
                <div className="col button-group">
                  <h1 className="mb-2">
                    <FontAwesomeIcon icon="exclamation-circle" className="mr-2" />
                    Do you want to add the user to this org? Select a role:
                  </h1>
                  <select className="form-control" name="role" onChange={(e) => setSelectedRole(e.target.value)} defaultValue={selectedRole}>
                    {roles.map((role) => <option value={role.id} key={role.id}>{role.display_name}</option>)}
                  </select>
                </div>

                <div className="col text-right">
                  <button type="button" className="btn btn-primary m-2" onClick={doAddToOrg}>
                    <FontAwesomeIcon icon="check-circle" className="mr-2" />
                    Yes
                  </button>
                  <button type="button" className="btn btn-danger m-2" onClick={() => dispatch(removeActiveAdminForm())}>
                    <FontAwesomeIcon icon="times-circle" className="mr-2" />
                    No, cancel
                  </button>
                </div>
              </div>
            </Alert>
          </div>
        </div>
      )}
    </div>
  );
};

EmailCheckForm.propTypes = {
  currentOrg: PropTypes.object.isRequired,
  roles: PropTypes.object.isRequired,
  handleEmailChecked: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentOrg: state.organization.activeOrganization,
  roles: state.organization.roles,
});

export default withRouter(connect(mapStateToProps)(EmailCheckForm));
