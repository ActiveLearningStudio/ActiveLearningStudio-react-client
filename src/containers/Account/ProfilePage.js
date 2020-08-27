import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import loader from 'assets/images/loader.svg';
import { updateProfileAction } from 'store/actions/auth';
import Header from 'components/Header';
import Error from '../Auth/Error';

import './style.scss';

function ProfilePage(props) {
  const {
    isLoading,
    error,
    user,
    updateProfile,
  } = props;

  const [state, setState] = useState({
    firstName: (user && user.first_name) || '',
    lastName: (user && user.last_name) || '',
    organizationName: (user && user.organization_name) || '',
    organizationType: (user && user.organization_type) || '',
    website: (user && user.website) || '',
    jobTitle: (user && user.job_title) || '',
    address: (user && user.address) || '',
    phoneNumber: (user && user.phone_number) || '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setState({
      firstName: (user && user.first_name) || '',
      lastName: (user && user.last_name) || '',
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

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile({
        id: user.id,
        first_name: state.firstName,
        last_name: state.lastName,
        organization_name: state.organizationName,
        organization_type: state.organizationType,
        website: state.website,
        job_title: state.jobTitle,
        address: state.address,
        phone_number: state.phoneNumber,
      });
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <Header {...props} />

      <div className="account-page main-content-wrapper">
        <div className="content-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <h1 className="title">My Profile</h1>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-8">
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
                          type="text"
                          id="first-name"
                          name="firstName"
                          placeholder="First Name*"
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
                          type="text"
                          id="last-name"
                          name="lastName"
                          placeholder="Last Name*"
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
                        <label htmlFor="organization-name">Organization Name</label>
                        <FontAwesomeIcon icon="user" />
                        <input
                          className="input-box"
                          type="text"
                          id="organization-name"
                          name="organizationName"
                          placeholder="Organization Name*"
                          required
                          value={state.organizationName}
                          onChange={onChangeField}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="organization-type">Organization Type</label>
                        <FontAwesomeIcon icon="user" />
                        <input
                          className="input-box"
                          type="text"
                          id="organization-type"
                          name="organizationType"
                          placeholder="Organization Type*"
                          value={state.organizationType}
                          onChange={onChangeField}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="website">Website</label>
                        <FontAwesomeIcon icon="user" />
                        <input
                          className="input-box"
                          type="text"
                          id="website"
                          name="website"
                          placeholder="Website"
                          value={state.website}
                          onChange={onChangeField}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="job-title">Job Title</label>
                        <FontAwesomeIcon icon="user" />
                        <input
                          className="input-box"
                          type="text"
                          id="job-title"
                          name="jobTitle"
                          placeholder="Job Title*"
                          required
                          value={state.jobTitle}
                          onChange={onChangeField}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <FontAwesomeIcon icon="home" />
                        <input
                          className="input-box"
                          type="text"
                          id="address"
                          name="address"
                          placeholder="Address"
                          value={state.address}
                          onChange={onChangeField}
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="phone-number">Phone Number</label>
                        <FontAwesomeIcon icon="phone" />
                        <input
                          className="input-box"
                          type="text"
                          id="phone-number"
                          name="phoneNumber"
                          placeholder="Phone Number"
                          value={state.phoneNumber}
                          onChange={onChangeField}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <img src={loader} alt="" />
                      ) : (
                        'Update Profile'
                      )}
                    </button>
                  </div>

                  <Error error={error} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ProfilePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  updateProfile: PropTypes.func.isRequired,
};

ProfilePage.defaultProps = {
  user: null,
  error: null,
};

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (data) => dispatch(updateProfileAction(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  user: state.auth.user,
  error: state.auth.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
