/* eslint-disable */
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
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';

const RemoveUser = (props) => {
  const { user, currentOrg, users, setUsers } = props;
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
    const preserve = mode !== 'remove-projects';
    adminService
      .removeUser(currentOrg.id, user.id, preserve)
      .then(() => {
        setOutcome('success');
        setStep('outcome');
        setUsers({ ...users, data: users.data.filter((data) => data.id != user.id) });
      })
      .catch((e) => {
        setError(e.errors[0]);
        setOutcome('error');
        setStep('outcome');
      });
  };
  const secondaryColor = getGlobalColor('--main-secondary-color');
  return (
    <Modal className="text-center remove-user-modal" show onHide={() => dispatch(cancelRemoveUser())}>
      <Modal.Header className="remove-user-modal-header" closeButton />
      <Modal.Body>
        {step === 'select-mode' && (
          <div className="container">
            <div className="row">
              <div className="col">
                {/*<img src={floppyImg} alt="floppy disk icon" />*/}
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none" css-inspector-installed="true">
                    <path
                      d="M9.93388 2H7.33333C4.38781 2 2 4.38781 2 7.33333V36.6667C2 39.6122 4.38781 42 7.33333 42H9.93388M9.93388 2V8.23692C9.93388 11.1824 12.3217 13.5702 15.2672 13.5702H25.4711M9.93388 2H25.4711M30.4298 2H30.5347C31.9491 2 33.3057 2.5619 34.3059 3.5621L40.4379 9.6941C41.4381 10.6943 42 12.0509 42 13.4653V36.6667C42 39.6122 39.6122 42 36.6667 42H30.4298M30.4298 2V8.61157C30.4298 11.3502 28.2097 13.5702 25.4711 13.5702V13.5702M30.4298 2H25.4711M9.93388 42H30.4298M9.93388 42V28.4463M30.4298 42V28.4463M30.4298 28.4463V28.4463C30.4298 25.5251 28.0617 23.157 25.1405 23.157H15.2231C12.302 23.157 9.93388 25.5251 9.93388 28.4463V28.4463M30.4298 28.4463H9.93388M25.4711 13.5702V2"
                      stroke={secondaryColor}
                      stroke-width="2.66667"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <h1 className="mt-4">Do you want to keep the user&apos;s projects?</h1>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <input className="m-2" type="radio" name="mode" value="remove-projects" checked={mode === 'remove-projects'} onChange={(e) => setMode(e.target.value)} />
                <label className="mr-4">No, remove projects</label>
                <input className="ml-4 m-2" type="radio" name="mode" value="keep-projects" checked={mode === 'keep-projects'} onChange={(e) => setMode(e.target.value)} />
                <label className="m-2">Yes, I want to keep them</label>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col">
                <Button variant="primary" className="remove-primary" onClick={() => setStep('confirm-remove')}>
                  Continue
                </Button>
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
                <Button variant="secondary" className="remove-secondary m-2" onClick={() => dispatch(cancelRemoveUser())}>
                  Cancel
                </Button>
                <Button variant="primary" className="remove-primary m-2" onClick={doRemove}>
                  Remove
                </Button>
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
                {error && <Alert variant="danger">{error}</Alert>}
                <p>
                  <strong>User: </strong>
                  {`${user.last_name}, ${user.first_name} (${user.email})`}
                  <br />
                  <strong>Organization: </strong>
                  {currentOrg.name}
                </p>
                <h1>User’s projects added to your library</h1>
                {outcome === 'success' && mode === 'remove-projects' && <h1>User&apos;s projects removed</h1>}
              </div>
            </div>
            <div className="row">
              <div className="col">
                <Button className="remove-primary mt-2" variant="primary" onClick={() => dispatch(cancelRemoveUser())}>
                  OK
                </Button>
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
