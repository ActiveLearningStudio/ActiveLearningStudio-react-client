import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { Table, Alert } from 'react-bootstrap';

import loader from 'assets/images/loader.svg';
import { getErrors } from 'utils';
import { updateProfileAction, loadOrganizationTypesAction } from 'store/actions/auth';
import { getUserLmsSettingsAction } from 'store/actions/account';
// import Header from 'components/Header';
import Footer from 'components/Footer';
// import Sidebar from 'components/Sidebar';
import Error from '../Auth/Error';

import './style.scss';

function ProfilePage(props) {
  const {
    isLoading,
    user,
    updateProfile,
    userLmsSettings,
    getUserLmsSettings,
    loadOrganizationTypes,
  } = props;

  const organizationTypes = useSelector((state) => state.auth.organizationTypes);

  const [error, setError] = useState(null);
  const [state, setState] = useState({
    firstName: (user && user.first_name) || '',
    lastName: (user && user.last_name) || '',
    email: (user && user.email) || '',
    organizationName: (user && user.organization_name) || '',
    organizationType: (user && user.organization_type) || '',
    website: (user && user.website) || '',
    jobTitle: (user && user.job_title) || '',
    address: (user && user.address) || '',
    phoneNumber: (user && user.phone_number) || '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserLmsSettings();
    loadOrganizationTypes();
  }, [getUserLmsSettings, loadOrganizationTypes]);

  useEffect(() => {
    setState({
      firstName: (user && user.first_name) || '',
      lastName: (user && user.last_name) || '',
      email: (user && user.email) || '',
      organizationName: (user && user.organization_name) || '',
      organizationType: (user && user.organization_type) || '',
      website: (user && user.website) || '',
      jobTitle: (user && user.job_title) || '',
      address: (user && user.address) || '',
      phoneNumber: (user && user.phone_number) || '',
    });
  }, [user]);

  const onChangeField = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      organizationName,
      organizationType,
      website,
      jobTitle,
      address,
      phoneNumber,
    } = state;

    try {
      if (website.trim() && !validator.isURL(website.trim())) {
        setError('Please input valid website url.');

        return;
      }

      if (!validator.isMobilePhone(phoneNumber) || !validator.isNumeric(phoneNumber)) {
        setError('Please input valid phone number.');

        return;
      }

      setError(null);

      const data = {
        id: user.id,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        organization_name: organizationName.trim() ? organizationName.trim() : null,
        organization_type: organizationType.trim() ? organizationType.trim() : null,
        website: website.trim() ? website.trim() : null,
        job_title: jobTitle.trim() ? jobTitle.trim() : null,
        address: address.trim() ? address.trim() : null,
        phone_number: phoneNumber.trim() ? phoneNumber.trim() : null,
      };

      await updateProfile(data);

      Swal.fire({
        icon: 'success',
        title: 'Profile has been updated successfully.',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
        allowOutsideClick: false,
      });
    } catch (err) {
      setError(getErrors(err));
    }
  }, [user, state, updateProfile]);

  const isDisabled = validator.isEmpty(state.firstName.trim()) || validator.isEmpty(state.lastName.trim());

  return (
    <>
      <div className="account-page">
        <div className="content-wrapper">
          <div className="content">
            <div className="row">
              <div className="col">
                <h1 className="title">My Account</h1>
              </div>
            </div>

            <div className="row justify-content-center account-panel m-1">
              <div className="col">
                <div className="row account-panel-header-row">
                  <div className="col">
                    <h1 className="panel-title">
                      Account Details
                    </h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <form
                      className="auth-form"
                      onSubmit={onSubmit}
                      autoComplete="off"
                    >
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="first-name">First Name</label>
                            <FontAwesomeIcon icon="user" />
                            <input
                              className="input-box"
                              id="first-name"
                              name="firstName"
                              placeholder="First Name*"
                              maxLength="250"
                              required
                              value={state.firstName}
                              onChange={onChangeField}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="last-name">Last Name</label>
                            <FontAwesomeIcon icon="user" />
                            <input
                              className="input-box"
                              id="last-name"
                              name="lastName"
                              placeholder="Last Name*"
                              maxLength="250"
                              required
                              value={state.lastName}
                              onChange={onChangeField}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <FontAwesomeIcon icon="envelope" />
                            <input
                              className="input-box"
                              id="email"
                              name="email"
                              placeholder="Email"
                              maxLength="250"
                              disabled
                              value={state.email}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="phone-number">Phone Number</label>
                            <FontAwesomeIcon icon="phone" />
                            <input
                              className="input-box"
                              id="phone-number"
                              name="phoneNumber"
                              placeholder="Phone Number"
                              maxLength="250"
                              value={state.phoneNumber}
                              onChange={onChangeField}
                            />
                          </div>
                        </div>
                      </div>
                      {!(state.organizationName === 'NEAF' || state.organizationName === 'vivensity') && (
                        <div className="row">
                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="organization-name">Organization Name</label>
                              <FontAwesomeIcon icon="building" />
                              <input
                                className="input-box"
                                id="organization-name"
                                name="organizationName"
                                placeholder="Organization Name"
                                maxLength="250"
                                value={state.organizationName}
                                onChange={onChangeField}
                              />
                            </div>
                          </div>

                          <div className="col-md-6">
                            <div className="form-group">
                              <label htmlFor="organization-type">Organization Type</label>
                              <FontAwesomeIcon icon="building" />
                              <select
                                className="input-box organization-type"
                                name="organizationType"
                                placeholder="Organization Type*"
                                value={state.organizationType}
                                onChange={onChangeField}
                              >
                                {organizationTypes.map((type) => (
                                  <option selected={type.label === state.organizationType} value={type.label}>{type.label}</option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="website">Website</label>
                            <FontAwesomeIcon icon="star" />
                            <input
                              className="input-box"
                              id="website"
                              name="website"
                              placeholder="Website"
                              maxLength="250"
                              value={state.website}
                              onChange={onChangeField}
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="form-group">
                            <label htmlFor="job-title">Job Title</label>
                            <FontAwesomeIcon icon="briefcase" />
                            <input
                              className="input-box"
                              id="job-title"
                              name="jobTitle"
                              placeholder="Job Title"
                              maxLength="250"
                              value={state.jobTitle}
                              onChange={onChangeField}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col">
                          <Error error={error} />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col text-right ml-5">
                          <button
                            type="submit"
                            className="btn btn-primary submit"
                            disabled={isLoading || isDisabled}
                          >
                            {isLoading ? (
                              <img src={loader} alt="" />
                            ) : (
                              'Update Profile'
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="row account-panel m-1 mt-4 mb-4">
              <div className="col">
                <div className="row account-panel-header-row">
                  <div className="col">
                    <h1 className="panel-title">
                      LMS Publishing
                    </h1>
                  </div>
                </div>
                <div className="row mt-2 mb-2">
                  <div className="col">
                    {userLmsSettings?.length === 0 && (
                      <Alert variant="info">No LMS publishing options have been configured for your account.</Alert>
                    )}

                    {userLmsSettings?.length > 0 && (
                      <>
                        <Alert variant="info">LMS publishing options available to your account.</Alert>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Name</th>
                              <th>Description</th>
                              <th>URL</th>
                            </tr>
                          </thead>
                          <tbody>
                            {userLmsSettings.map((lms) => (
                              <tr>
                                <td>{lms.site_name}</td>
                                <td>{lms.description}</td>
                                <td>{lms.lms_url}</td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

ProfilePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  userLmsSettings: PropTypes.array.isRequired,
  updateProfile: PropTypes.func.isRequired,
  getUserLmsSettings: PropTypes.func.isRequired,
  loadOrganizationTypes: PropTypes.func.isRequired,
};

ProfilePage.defaultProps = {
  user: null,
};

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (data) => dispatch(updateProfileAction(data)),
  getUserLmsSettings: () => dispatch(getUserLmsSettingsAction()),
  loadOrganizationTypes: () => dispatch(loadOrganizationTypesAction()),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  user: state.auth.user,
  userLmsSettings: (state.account) ? state.account.userLmsSettings : [],
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
