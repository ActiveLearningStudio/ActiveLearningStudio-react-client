import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Modal, Button, Alert } from 'react-bootstrap';
import { cancelRemoveUser } from 'store/actions/admin';
import adminService from 'services/admin.service';
import userErrorImg from 'assets/images/svg/user_error.svg';
import floppyImg from 'assets/images/svg/floppy.svg';
import warningImg from 'assets/images/svg/warning.svg';
import './style.scss';

const RemoveUser = (props) => {
  const { user, currentOrg } = props;
  const dispatch = useDispatch();
  const [step, setStep] = useState('select-mode');
  const [mode, setMode] = useState('remove-projects');
  const [outcome, setOutcome] = useState(null);
  const [error, setError] = useState(null);

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const doRemove = () => {
    const preserve = (mode !== 'remove-projects');
    adminService.removeUser(currentOrg.id, user.id, preserve)
      .then(() => {
        setOutcome('success');
        setStep('outcome');
      })
      .catch((e) => {
        setError(e.errors[0]);
        setOutcome('error');
        setStep('outcome');
      });
  };

  return (
    <Modal className="text-center remove-user-modal" show onHide={() => dispatch(cancelRemoveUser())}>
      <Modal.Header className="remove-user-modal-header" closeButton />
      <Modal.Body>
        {step === 'select-mode' && (
          <div className="container">
            <div className="row">
              <div className="col">
                <img src={floppyImg} alt="floppy disk icon" />
                <h1 className="mt-4">Do you want to keep the user&apos;s projects?</h1>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input className="m-2" type="radio" name="mode" value="remove-projects" checked={(mode === 'remove-projects')} onChange={(e) => setMode(e.target.value)} />
                <label className="mr-4">No, remove projects</label>
                <input className="ml-4 m-2" type="radio" name="mode" value="keep-projects" checked={(mode === 'keep-projects')} onChange={(e) => setMode(e.target.value)} />
                <label className="m-2">Yes, I want to keep them</label>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <Button variant="primary" className="remove-primary" onClick={() => setStep('confirm-remove')}>Continue</Button>
              </div>
            </div>
          </div>
        )}
        {step === 'confirm-remove' && (
          <div className="container">
            <div className="row">
              <div className="col">
                <img src={warningImg} alt="exclamation sign icon" />
                <h1 className="mt-4">Are you sure you want to remove this user?</h1>
                <p>You won&apos;t be able to revert this!</p>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Button variant="secondary" className="remove-secondary m-2" onClick={() => dispatch(cancelRemoveUser())}>Cancel</Button>
                <Button variant="primary" className="remove-primary m-2" onClick={doRemove}>Remove</Button>
              </div>
            </div>
          </div>
        )}
        {step === 'outcome' && (
          <div className="container">
            <div className="row">
              <div className="col">
                <img src={userErrorImg} alt="user deleted icon" />
                <h1>
                  {outcome === 'success' && 'User removed!'}
                  {outcome === 'error' && 'User could not be removed'}
                </h1>
                {error && (
                  <Alert variant="danger">
                    {error}
                  </Alert>
                )}
                <p>
                  <strong>User: </strong>
                  {`${user.last_name}, ${user.first_name} (${user.email})`}
                  <br />
                  <strong>Organization: </strong>
                  {currentOrg.name}
                </p>
                {outcome === 'success' && mode === 'remove-projects' && (
                  <h1>User&apos;s projects removed</h1>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Button className="remove-primary mt-2" variant="primary" onClick={() => dispatch(cancelRemoveUser())}>OK</Button>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

RemoveUser.propTypes = {
  currentOrg: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  currentOrg: state.organization.activeOrganization,
  user: state.admin.removeUser,
});

export default withRouter(connect(mapStateToProps)(RemoveUser));
