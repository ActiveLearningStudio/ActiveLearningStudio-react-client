import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

import loader from 'assets/images/loader.svg';
import { updateProfileAction } from 'store/actions/auth';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import Error from '../Auth/Error';

import './style.scss';

function ProfilePage(props) {
  const {
    isLoading,
    user,
    updateProfile,
  } = props;

  const [error, setError] = useState(null);
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

      Swal.fire({
        icon: 'success',
        title: 'Profile has been updated successfully.',
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
        allowOutsideClick: false,
      });
      setError(null);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      <Header {...props} />

      <div className="account-page main-content-wrapper">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>

        <div className="content-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <h1 className="pl-0 title">My Account</h1>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-12">
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
                          type="text"
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
                        <label htmlFor="organization-name">Organization Name</label>
                        <FontAwesomeIcon icon="building" />
                        <input
                          className="input-box"
                          type="text"
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
                        <input
                          className="input-box"
                          type="text"
                          id="organization-type"
                          name="organizationType"
                          placeholder="Organization Type"
                          maxLength="250"
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
                        <FontAwesomeIcon icon="star" />
                        <input
                          className="input-box"
                          type="text"
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
                          type="text"
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
                          maxLength="250"
                          value={state.phoneNumber}
                          onChange={onChangeField}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-right ml-5">
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
                  </div>
                  <div className="row">
                    <div className="col">
                      <Error error={error} />
                    </div>
                  </div>
                </form>
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
  updateProfile: PropTypes.func.isRequired,
};

ProfilePage.defaultProps = {
  user: null,
};

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (data) => dispatch(updateProfileAction(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
