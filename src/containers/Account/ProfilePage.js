import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import loader from 'assets/images/loader.svg';
import { updateProfileAction } from 'store/actions/auth';
import Header from 'components/Header';
import Error from '../Auth/Error';

import './style.scss';

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: props.user.first_name || '',
      lastName: props.user.last_name || '',
      organizationName: props.user.organization_name || '',
      organizationType: props.user.organization_type || '',
      website: props.user.website || '',
      jobTitle: props.user.job_title || '',
      address: props.user.address || '',
      phoneNumber: props.user.phone_number || '',
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  onChangeField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    try {
      const {
        firstName,
        lastName,
        organizationName,
        organizationType,
        website,
        jobTitle,
        address,
        phoneNumber,
      } = this.state;
      const { user, updateProfile } = this.props;

      await updateProfile({
        id: user.id,
        first_name: firstName,
        last_name: lastName,
        organization_name: organizationName,
        organization_type: organizationType,
        website,
        job_title: jobTitle,
        address,
        phone_number: phoneNumber,
      });
    } catch (err) {
      // console.log(err);
    }
  };

  render() {
    const {
      firstName,
      lastName,
      organizationName,
      organizationType,
      website,
      jobTitle,
      address,
      phoneNumber,
    } = this.state;

    const { isLoading, error } = this.props;

    return (
      <>
        <Header {...this.props} />

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
                    onSubmit={this.onSubmit}
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
                            value={firstName}
                            onChange={this.onChangeField}
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
                            value={lastName}
                            onChange={this.onChangeField}
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
                            value={organizationName}
                            onChange={this.onChangeField}
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
                            value={organizationType}
                            onChange={this.onChangeField}
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
                            value={website}
                            onChange={this.onChangeField}
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
                            value={jobTitle}
                            onChange={this.onChangeField}
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
                            value={address}
                            onChange={this.onChangeField}
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
                            value={phoneNumber}
                            onChange={this.onChangeField}
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
}

ProfilePage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  updateProfile: PropTypes.func.isRequired,
};

ProfilePage.defaultProps = {
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
