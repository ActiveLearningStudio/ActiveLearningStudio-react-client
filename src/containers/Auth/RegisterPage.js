import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import QueryString from 'query-string';
import bg from 'assets/images/loginbg.png';
import bg1 from 'assets/images/loginbg2.png';
import loader from 'assets/images/loader.svg';
import { registerAction, loadOrganizationTypesAction } from 'store/actions/auth';
import { getErrors } from 'utils';
import Error from './Error';
import Logo from './Logo';

import './style.scss';
// eslint-disable-next-line no-restricted-globals
const query = QueryString.parse(location.search);

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      organizationName: '',
      organizationType: '',
      jobTitle: '',
      clicked: '',
      error: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const { loadOrganizationTypes } = this.props;
    loadOrganizationTypes();
    if (query?.email) {
      // eslint-disable-next-line no-unused-expressions
      validator.isEmail(query.email) && this.setState({ email: query?.email });
    }
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
        email,
        password,
        organizationName,
        organizationType,
        jobTitle,
      } = this.state;
      const { history, register } = this.props;
      const { domain } = this.props;
      const data = {
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password: password.trim(),
        organization_name: organizationName.trim(),
        organization_type: organizationType.trim(),
        job_title: jobTitle.trim(),
        domain: domain?.domain,
      };

      const message = await register(data);

      Swal.fire({
        icon: 'success',
        title: 'YOU ARE REGISTERED!',
        html: message,
        showConfirmButton: true,
        confirmButtonText: 'Login to CurrikiStudio',
      })
        .then((result) => {
          if (result.isConfirmed) {
            history.push(`/studio/login/${domain?.domain}`);
          }
        });
      // history.push('/login');
    } catch (err) {
      this.setState({
        error: getErrors(err),
      });
    }
  };

  isDisabledSignUp = () => {
    const {
      firstName,
      lastName,
      email,
      password,
    } = this.state;

    return validator.isEmpty(firstName.trim())
      || validator.isEmpty(lastName.trim())
      || validator.isEmpty(email.trim())
      || validator.isEmpty(password.trim());
  };

  isDisabled = () => {
    const {
      firstName,
      lastName,
      email,
      password,
      organizationName,
      jobTitle,
      organizationType,
    } = this.state;

    return validator.isEmpty(firstName.trim())
      || validator.isEmpty(lastName.trim())
      || validator.isEmpty(email.trim())
      || validator.isEmpty(password.trim())
      || validator.isEmpty(organizationName.trim())
      || validator.isEmpty(jobTitle.trim())
      || validator.isEmpty(organizationType.trim());
  };

  goToLogin = () => {
    const { history } = this.props;
    history.push('/studio/login');
  };

  validatePassword=(pwd) => {
    // eslint-disable-next-line quotes
    const regex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
    return regex.test(pwd);
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      password,
      organizationName,
      jobTitle,
      error,
      organizationType,
      clicked,
    } = this.state;
    const { isLoading, organizationTypes } = this.props;

    return (
      <div className="auth-page">
        <Logo />

        <div className="auth-container">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="auth-title ">
              Welcome
              {!clicked ? ' to Curriki' : `, ${firstName}`}
            </h1>

            {/* <strong>OR</strong> */}

            {/* <button
              type="button"
              className="btn btn-outline-primary text-uppercase"
              onClick={this.goToLogin}
            >
              Login
            </button> */}
          </div>

          <h3 className="auth-description text-left">
            {!clicked
              ? 'Sign up and start making a difference in the way learning experiences are created.'
              : 'Before start creating awesome content, please let us know the usage your are giving to Curriki. '}
          </h3>
          <form
            onSubmit={this.onSubmit}
            autoComplete="off"
            className="auth-form"
          >
            {!clicked
            ? (
              <>
                <div className="form-group d-flex">
                  <div className="input-wrapper">
                    <FontAwesomeIcon icon="user" />
                    <input
                      autoFocus
                      className="input-box"
                      name="firstName"
                      placeholder="First Name*"
                      required
                      maxLength="250"
                      value={firstName}
                      onChange={this.onChangeField}
                    />
                  </div>

                  <div className="input-wrapper">
                    <FontAwesomeIcon icon="user" />
                    <input
                      className="input-box"
                      name="lastName"
                      placeholder="Last Name*"
                      required
                      maxLength="250"
                      value={lastName}
                      onChange={this.onChangeField}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <FontAwesomeIcon icon="envelope" />
                  <input
                    className="input-box"
                    // type="email"
                    name="email"
                    placeholder="Email*"
                    required
                    maxLength="250"
                    disabled={query?.email && true}
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
                    maxLength="250"
                    value={password}
                    onChange={this.onChangeField}
                  />
                  <p>8 characters minimum. Use a number, one uppercase & one lowercase at least</p>
                </div>
                <Error error={error} />
                <div className="form-group mb-0">
                  <button
                    type="button"
                    className="signUp-btn submit"
                    onClick={() => {
                      const passwordValidator = this.validatePassword(password);
                      const emailValidator = validator.isEmail(email.trim());
                      if (passwordValidator && emailValidator) {
                        this.setState({
                          clicked: true,
                          error: null,
                        });
                      } else if (!passwordValidator) {
                          this.setState({
                            error: 'Password must be 8 or more characters long, should contain at-least 1 Uppercase, 1 Lowercase and 1 Numeric character.',
                          });
                      } else if (!emailValidator) {
                        this.setState({
                          error: 'Please input valid email.',
                        });
                      }
                    }}
                    disabled={isLoading || this.isDisabledSignUp()}
                  >
                    {isLoading ? (
                      <img src={loader} alt="" />
                    ) : (
                      'Sign Up'
                    )}
                  </button>
                </div>
                <div className="vertical-line">
                  <div className="line" />
                  <p className="line-or">or</p>
                  <div className="line" />
                </div>

                <p className="auth-description text-center">
                  Back to Curriki?&nbsp;
                  <a onClick={this.goToLogin}>
                    Login
                  </a>
                </p>

                <div className="termsandcondition">
                  By clicking the &quot;Sign Up&quot; button, you are creating a CurrikiStudio  account, and you agree to Curriki&apos;s
                  {' '}
                  <a href="https://www.curriki.org/terms-of-service/">
                    Terms of Use
                  </a>
                  {' '}
                  and
                  {' '}
                  <a href="https://www.curriki.org/privacy-policy/">
                    Privacy Policy.
                  </a>
                </div>

              </>
              ) : (
                <>
                  <div className="form-group">
                    <button type="button" className="back-button" onClick={() => this.setState({ clicked: false })}>
                      Back
                    </button>
                  </div>
                  <div className="form-group ">
                    <FontAwesomeIcon icon="building" />
                    <select
                      className="input-box organization-type"
                      name="organizationType"
                      placeholder="Organization Type*"
                      value={organizationType}
                      onChange={this.onChangeField}
                    >
                      <option selected value=""> -- Select an Organization Type -- </option>

                      {organizationTypes.map((type) => (
                        <option value={type.label}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <FontAwesomeIcon icon="building" />
                    <input
                      className="input-box"
                      name="organizationName"
                      placeholder="Organization Name*"
                      maxLength="250"
                      value={organizationName}
                      onChange={this.onChangeField}
                    />
                  </div>
                  <div className="form-group">
                    <FontAwesomeIcon icon="briefcase" />
                    <input
                      className="input-box"
                      name="jobTitle"
                      placeholder="Job Title*"
                      maxLength="250"
                      value={jobTitle}
                      onChange={this.onChangeField}
                    />
                  </div>
                  <div className="form-group mb-0">
                    <button
                      type="submit"
                      className="btn btn-primary submit get-started-btn"
                      onClick={() => this.setState({
                        clicked: true,
                      })}
                      disabled={isLoading || this.isDisabled()}
                    >
                      {isLoading ? (
                        <img src={loader} alt="" />
                      ) : (
                        'Let’s get started! '
                      )}
                    </button>
                  </div>
                </>
              )}
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
  organizationTypes: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired,
  loadOrganizationTypes: PropTypes.func.isRequired,
  domain: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(registerAction(data)),
  loadOrganizationTypes: () => dispatch(loadOrganizationTypesAction()),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  organizationTypes: state.auth.organizationTypes,
  domain: state.organization.currentOrganization,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RegisterPage),
);
