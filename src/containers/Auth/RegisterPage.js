import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import bg from 'assets/images/loginbg.png';
import bg1 from 'assets/images/loginbg2.png';
import logo from 'assets/images/logo.svg';
import loader from 'assets/images/loader.svg';
import { registerAction } from 'store/actions/auth';
import { getErrors } from 'utils';
import Error from './Error';

import './style.scss';

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      name: '',
      email: '',
      password: '',
      organizationName: '',
      jobTitle: '',
      error: null,
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
        name,
        email,
        password,
        organizationName,
        jobTitle,
      } = this.state;
      const { history, register } = this.props;

      this.setState({
        error: null,
      });

      await register({
        first_name: firstName,
        last_name: lastName,
        name,
        email,
        password,
        organization_name: organizationName,
        job_title: jobTitle,
      });

      history.push('/login');
    } catch (err) {
      this.setState({
        error: getErrors(err),
      });
    }
  };

  isDisabled = () => {
    const {
      firstName,
      lastName,
      name,
      email,
      password,
      organizationName,
      jobTitle,
    } = this.state;

    return validator.isEmpty(firstName)
      || validator.isEmpty(lastName)
      || validator.isEmpty(name)
      || !validator.isEmail(email)
      || validator.isEmpty(password)
      || validator.isEmpty(organizationName)
      || validator.isEmpty(jobTitle);
  }

  render() {
    const {
      firstName,
      lastName,
      name,
      email,
      password,
      organizationName,
      jobTitle,
      error,
    } = this.state;
    const { isLoading } = this.props;

    return (
      <div className="auth-page">
        <img className="auth-header-logo" src={logo} alt="" />

        <div className="auth-container">
          <h1 className="auth-title">Register to Curriki Studio</h1>
          <h2 className="auth-subtitle">Powering the creation of the world’s most immersive learn experiences</h2>
          <h3 className="auth-description">
            CurrikiStudio is changing the way learning experiences are
            designed, created, and delivered to a new generation of learners.
          </h3>

          <form
            onSubmit={this.onSubmit}
            autoComplete="off"
            className="auth-form"
          >
            <div className="form-group d-flex">
              <div className="input-wrapper">
                <FontAwesomeIcon icon="user" />
                <input
                  autoFocus
                  className="input-box"
                  type="text"
                  name="firstName"
                  placeholder="First Name*"
                  required
                  value={firstName}
                  onChange={this.onChangeField}
                />
              </div>

              <div className="input-wrapper">
                <FontAwesomeIcon icon="user" />
                <input
                  autoFocus
                  className="input-box"
                  type="text"
                  name="lastName"
                  placeholder="Last Name*"
                  required
                  value={lastName}
                  onChange={this.onChangeField}
                />
              </div>
            </div>

            <div className="form-group">
              <FontAwesomeIcon icon="user" />
              <input
                autoFocus
                className="input-box"
                type="text"
                name="name"
                placeholder="Username*"
                required
                value={name}
                onChange={this.onChangeField}
              />
            </div>

            <div className="form-group">
              <FontAwesomeIcon icon="envelope" />
              <input
                autoFocus
                className="input-box"
                type="email"
                name="email"
                placeholder="Email*"
                required
                value={email}
                onChange={this.onChangeField}
              />
            </div>

            <div className="form-group">
              <FontAwesomeIcon icon="lock" />
              <input
                className="password-box"
                type="password"
                name="password"
                placeholder="Password*"
                required
                value={password}
                onChange={this.onChangeField}
              />
            </div>

            <div className="form-group d-flex">
              <div className="input-wrapper">
                <FontAwesomeIcon icon="user" />
                <input
                  autoFocus
                  className="input-box"
                  type="text"
                  name="organizationName"
                  placeholder="Organization Name*"
                  required
                  value={organizationName}
                  onChange={this.onChangeField}
                />
              </div>

              <div className="input-wrapper">
                <FontAwesomeIcon icon="user" />
                <input
                  autoFocus
                  className="input-box"
                  type="text"
                  name="jobTitle"
                  placeholder="Job Title*"
                  required
                  value={jobTitle}
                  onChange={this.onChangeField}
                />
              </div>
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary submit"
                disabled={isLoading || this.isDisabled()}
              >
                {isLoading ? (
                  <img src={loader} alt="" />
                ) : (
                  'Register'
                )}
              </button>
            </div>

            <Error error={error} />

            <div className="form-group text-center">
              Already have an account?
              {' '}
              <Link to="/login">Login</Link>
            </div>
          </form>
        </div>

        <img src={bg} className="bg1" alt="" />
        <img src={bg1} className="bg2" alt="" />
      </div>
    );
  }
}

RegisterPage.propTypes = {
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(registerAction(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterPage),
);
