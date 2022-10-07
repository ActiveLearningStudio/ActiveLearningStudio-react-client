import React, { useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import adminService from 'services/admin.service';
import { setCurrentUser, removeActiveAdminForm } from 'store/actions/admin';
import PropTypes from 'prop-types';
import './style.scss';

const EmailCheckForm = (props) => {
  const { currentOrg, handleEmailChecked } = props;
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const doCheck = async () => {
    setError(null);
    const response = await adminService.checkUserEmail(currentOrg.id, email);
    console.log(response);
    if (response?.message && response?.user) {
      // User exists and belongs to currentOrg
      setError(response.message);
      return;
    }

    if (response?.user) {
      // User exists but doesn't belong to currentOrg
      dispatch(setCurrentUser(response.user));
      handleEmailChecked('existing-user', response?.user?.email);
      return;
    }

    if (response?.message) {
      // User does not exist
      handleEmailChecked('new-user', email);
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
          {error ? (
            <button type="button" className="btn btn-primary addButton" onClick={() => dispatch(removeActiveAdminForm())}>Ok</button>
          ) : (
            <button type="button" className="btn btn-primary addButton" onClick={doCheck}>
              Add User
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

EmailCheckForm.propTypes = {
  currentOrg: PropTypes.object.isRequired,
  handleEmailChecked: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  currentOrg: state.organization.activeOrganization,
});

export default withRouter(connect(mapStateToProps)(EmailCheckForm));
