/* eslint-disable */
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
import leftArrow from 'assets/images/left-arrow.svg';
import { GoogleLogin } from 'react-google-login';
import googleIcon from 'assets/images/google.svg';
import { registerAction, loadOrganizationTypesAction, googleLoginAction } from 'store/actions/auth';
import authService from 'services/auth.service';
import { getErrors } from 'utils';
import { Tabs, Tab } from 'react-bootstrap';
import Error from './Error';
import Logo from './Logo';
import eye from 'assets/images/eye.svg';

import './style.scss';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { validLowerCase, validNumber, validUpperCase } from './Regex';
import PasswordValidImage from '../../assets/images/svg/password_valid.svg';
import PasswordInValidImage from '../../assets/images/svg/password_invalid.svg';
import PreviewSmSvg from 'iconLibrary/dropDown/PreviewSmSvg';
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
      organization_name: '',
      organization_type: '',
      job_title: '',
      clicked: '',
      error: null,
      googleResponse: null,
      activeTab: 'Sign up',
      stepper: false,
      showPassword: false,
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

  getSnapshotBeforeUpdate() {
    const { domain, history } = this.props;
    if (!domain?.self_registration) {
      if (domain) {
        history.push(`/login/${domain?.domain}`);
      } else {
        history.push('/login');
      }
    }
  }

  onChangeField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });

    // Password Validation check

    if (e.target.name == 'password') {
      if (e.target.value?.length >= 8) {
        this.setState({
          passChar: true,
        });
      }
      if (e.target.value?.length < 8) {
        this.setState({
          passChar: false,
        });
      }
      if (validUpperCase.test(e.target.value)) {
        this.setState({
          passUpperChar: true,
        });
      }
      if (!validUpperCase.test(e.target.value)) {
        this.setState({
          passUpperChar: false,
        });
      }
      if (validLowerCase.test(e.target.value)) {
        this.setState({
          passLowerChar: true,
        });
      }
      if (!validLowerCase.test(e.target.value)) {
        this.setState({
          passLowerChar: false,
        });
      }
      if (validNumber.test(e.target.value)) {
        this.setState({
          passNumberChar: true,
        });
      }
      if (!validNumber.test(e.target.value)) {
        this.setState({
          passNumberChar: false,
        });
      }
      if (validUpperCase.test(e.target.value) && validLowerCase.test(e.target.value) && validNumber.test(e.target.value)) {
        this.setState({
          allPassValid: true,
        });
      } else {
        this.setState({
          allPassValid: false,
        });
      }
    }
  };

  onSubmit = async (e) => {
    e.preventDefault();
    const { googleResponse } = this.state;
    try {
      if (googleResponse) {
        this.onGoogleLoginSuccess(googleResponse);
      } else {
        const { firstName, lastName, email, password, organization_name, organization_type, job_title } = this.state;
        const { history, register } = this.props;
        const { domain } = this.props;
        const data = {
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          password: password.trim(),
          organization_name: organization_name.trim(),
          organization_type: organization_type.trim(),
          job_title: job_title.trim(),
          domain: domain?.domain,
        };
        const message = await register(data);

        Swal.fire({
          icon: 'success',
          title: 'YOU ARE REGISTERED!',
          html: message,
          showConfirmButton: true,
          confirmButtonText: 'Login to CurrikiStudio',
        }).then((result) => {
          if (result.isConfirmed) {
            history.push(`/login/${domain?.domain}`);
          }
        });
      }
      // history.push('/login');
    } catch (err) {
      this.setState({
        error: getErrors(err),
      });
    }
  };

  isDisabledSignUp = () => {
    const { firstName, lastName, email, password } = this.state;

    return validator.isEmpty(firstName.trim()) || validator.isEmpty(lastName.trim()) || validator.isEmpty(email.trim()) || validator.isEmpty(password.trim());
  };

  isDisabled = () => {
    const { firstName, lastName, email, password, organization_name, job_title, organization_type } = this.state;

    return (
      validator.isEmpty(firstName.trim()) ||
      validator.isEmpty(lastName.trim()) ||
      validator.isEmpty(email.trim()) ||
      validator.isEmpty(password.trim()) ||
      validator.isEmpty(organization_name.trim()) ||
      validator.isEmpty(job_title.trim()) ||
      validator.isEmpty(organization_type.trim())
    );
  };

  isDisabledGoogle = () => {
    const { organization_name, job_title, organization_type } = this.state;

    return validator.isEmpty(organization_name.trim()) || validator.isEmpty(job_title.trim()) || validator.isEmpty(organization_type.trim());
  };

  onGoogleLoginSuccess = (response) => {
    const { organization_name, job_title, organization_type } = this.state;
    const { googleLogin } = this.props;
    if (organization_name && job_title && organization_type) {
      const result = googleLogin({
        ...response,
        organization_name,
        job_title,
        organization_type,
      });
      result.catch((err) => {
        this.setState({
          error: getErrors(err),
        });
      });
    }
  };

  onGoogleLoginFailure = (response) => {
    console.log(response);
  };

  goToLogin = () => {
    const { history, domain } = this.props;
    if (domain) {
      history.push(`/login/${domain?.domain}`);
    } else {
      history.push('/login');
    }
  };

  validatePassword = (pwd) => {
    // eslint-disable-next-line quotes
    const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$');
    return regex.test(pwd);
  };

  render() {
    const { firstName, lastName, email, password, organization_name, job_title, error, organization_type, clicked, activeTab, stepper, googleResponse, showPassword } = this.state;
    const { isLoading, organizationTypes, domain } = this.props;

    return (
      <>
        {domain?.self_registration === true && (
          <div className="auth-page">
            <Logo />

            <div className="auth-container">
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="auth-title mb2 mb-5">
                  Welcome
                  {!clicked ? ` to ${window.__RUNTIME_CONFIG__.REACT_APP_INSTANT_NAME || 'Curriki'}` : `, ${firstName}`}
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

              {/* <p className="auth-Pdescrip text-left">
                {!clicked
                  ? 'Start making a difference in the way learning experiences are created.'
                  : 'Before start creating awesome content, please let us know the usage your are giving to Curriki. '}
              </p> */}
              <div className="content-section">
                <Tabs
                  defaultActiveKey={activeTab}
                  activeKey={activeTab}
                  id="uncontrolled-tab-example"
                  style={{ display: stepper ? 'none' : 'flex' }}
                  onSelect={(key) => {
                    this.setState({ activeTab: key });
                    if (key === 'Log in') this.goToLogin();
                  }}
                >
                  <Tab eventKey="Log in" title="Log In" />
                  <Tab eventKey="Sign up" title="Register Here!" style={{ display: stepper ? 'none' : 'flex' }}>
                    <form onSubmit={this.onSubmit} autoComplete="off" className="auth-form">
                      {!clicked && (
                        <>
                          <div className="form-group d-flex">
                            <div className="input-wrapper">
                              <span>Name</span>
                              <input autoFocus className="input-box" name="firstName" required maxLength="50" value={firstName} onChange={this.onChangeField} />
                            </div>

                            <div className="input-wrapper">
                              <span>Last name</span>
                              <input className="input-box" name="lastName" required maxLength="50" value={lastName} onChange={this.onChangeField} />
                            </div>
                          </div>

                          <div className="form-group" id={this.state.emailError && 'email_error_input_field_div'}>
                            <span>Email</span>
                            <input
                              className="input-box "
                              // type="email"

                              name="email"
                              required
                              maxLength="250"
                              disabled={query?.email && true}
                              value={email}
                              onChange={this.onChangeField}
                            />
                            {this.state.emailError && <span className="email-error">{this.state.emailError}</span>}
                          </div>

                          <div className="form-group">
                            <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                              Password
                              <div className="show-password" onClick={() => this.setState({ showPassword: !showPassword })}>
                                {/* <img src={eye} alt="show-password" /> */}
                                <PreviewSmSvg primaryColor={'#515151'} />
                                Show Password
                              </div>
                            </span>
                            <input
                              className="password-box"
                              type={showPassword ? 'text' : 'password'}
                              name="password"
                              required
                              maxLength="250"
                              value={password}
                              placeholder="********"
                              onChange={this.onChangeField}
                            />
                          </div>
                          <div className="password_detail">
                            <div className="password_icon_detial_div">
                              <img className="icon_check" src={this.state.passChar ? PasswordValidImage : PasswordInValidImage} />
                              {/* <FontAwesomeIcon icon={faCheck} size="sm" className="icon_check" color={this.state.passChar ? '#34e369' : '#515151'} /> */}
                              <span>At least 8 characters long</span>
                            </div>
                            <div>
                              <img className="icon_check" src={this.state.allPassValid ? PasswordValidImage : PasswordInValidImage} />
                              {/* <FontAwesomeIcon icon={faCheck} size="sm" className="icon_check" color={this.state.allPassValid ? '#34e369' : '#515151'} /> */}
                              <span>Should contain at least:</span>
                            </div>

                            <ul>
                              <li>
                                <img className="icon_check" src={this.state.passUpperChar ? PasswordValidImage : PasswordInValidImage} />1 uppercase letter
                              </li>
                              <li>
                                {' '}
                                <img className="icon_check" src={this.state.passLowerChar ? PasswordValidImage : PasswordInValidImage} />1 lowercase letter
                              </li>
                              <li>
                                {' '}
                                <img className="icon_check" src={this.state.passNumberChar ? PasswordValidImage : PasswordInValidImage} />1 number
                              </li>
                            </ul>
                          </div>
                          <div className="form-group">{/* <Error error={error} /> */}</div>
                          <div className="form-group mb-3" style={{ marginTop: '48px' }}>
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
                                    stepper: true,
                                    emailError: null,
                                  });
                                }
                                if (!passwordValidator) {
                                  this.setState({
                                    error: 'Password must be 8 or more characters long,should contain at least 1 Uppercase, 1 Lowercase and 1 Numeric character.',
                                  });
                                }
                                if (!emailValidator) {
                                  this.setState({
                                    error: 'Please input valid email.',
                                    emailError: 'Please enter a valid email address.',
                                  });
                                } else {
                                  this.setState({
                                    emailError: null,
                                  });
                                }
                              }}
                              disabled={isLoading || this.isDisabledSignUp()}
                            >
                              {isLoading ? <img src={loader} alt="" /> : 'Sign Up with Email'}
                            </button>
                          </div>
                          {/* <div className="vertical-line">
                              <div className="line" />
                              <p className="line-or">or</p>
                              <div className="line" />
                            </div> */}
                          {/* <p className="auth-description text-center">
                              Back to Curriki?&nbsp;
                              <a onClick={this.goToLogin}>
                                Login
                              </a>
                            </p> */}
                          <div className="login-separator-box">
                            <div className="login-separator"></div>
                            <div className="text-separator">or</div>
                            <div className="login-separator"></div>
                          </div>
                          <div className="form-group text-center mb-5">
                            <GoogleLogin
                              clientId={global.config.gapiClientId}
                              theme="dark"
                              render={(renderProps) => (
                                <button type="button" className="google-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                  <img src={googleIcon} alt="googleIcon" />
                                  <div>Sign Up with Google</div>
                                </button>
                              )}
                              onSuccess={async (response) => {
                                const emailCheckResponse = await authService.checkEmail(response.profileObj.email);
                                if (emailCheckResponse?.exists === true) return this.setState({ error: emailCheckResponse.message });

                                return this.setState({ stepper: true, googleResponse: response });
                                // this.onGoogleLoginSuccess(response);
                              }}
                              onFailure={this.onGoogleLoginFailure}
                              cookiePolicy="single_host_origin"
                            />
                          </div>
                          <div className="termsandcondition">
                            By clicking the &quot;Sign Up&quot; button, you are creating a CurrikiStudio account, and you agree to Curriki&apos;s{' '}
                            <a
                              target="_blank"
                              href={domain?.tos_type == 'URL' || domain?.tos_url != null ? domain?.tos_url : `/org/${domain?.domain}/terms-policy-content/tos_content`}
                            >
                              Terms of Use
                            </a>{' '}
                            and{' '}
                            <a
                              target="_blank"
                              href={
                                domain?.privacy_policy_type == 'URL' || domain?.privacy_policy_url != null
                                  ? domain?.privacy_policy_url
                                  : `/org/${domain?.domain}/terms-policy-content/privacy_policy_content`
                              }
                            >
                              Privacy Policy.
                            </a>
                          </div>
                        </>
                      )}
                    </form>
                  </Tab>
                </Tabs>
              </div>
              {stepper && (
                <>
                  <div className="form-group">
                    <div className="bkbtn" onClick={() => this.setState({ clicked: false, stepper: false })}>
                      {/* <button type="button" onClick={() => this.setState({ clicked: false, stepper: false })}> */}
                      <img src={leftArrow} alt="arrow-left" />
                      <a> Back </a>
                      {/* </button> */}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="using-curriki">
                      <div className="curriki-line">You are using Curriki for:</div>
                      {/* <div className="line-horizontal" /> */}
                    </div>
                  </div>
                  <div className="form-group ">
                    <select
                      className="input-box organization-type"
                      name="organization_type"
                      placeholder="Organization Type*"
                      value={organization_type}
                      onChange={this.onChangeField}
                    >
                      <option selected value="">
                        Select an Organization Type
                      </option>

                      {organizationTypes.map((type) => (
                        <option value={type.label}>{type.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <span>Organization name</span>
                    <input className="input-box" name="organization_name" maxLength="50" value={organization_name} onChange={this.onChangeField} />
                  </div>
                  <div className="form-group">
                    <span>Job title</span>
                    <input className="input-box" name="job_title" maxLength="50" value={job_title} onChange={this.onChangeField} />
                  </div>
                  <div className="form-group">
                    <Error error={error} />
                  </div>
                  <div className="form-group mb-0" style={{ marginTop: '50px' }}>
                    <button
                      type="submit"
                      className="btn-primary submit get-started-btn mb-5"
                      onClick={(e) => {
                        this.setState({ clicked: true });
                        this.onSubmit(e);
                      }}
                      disabled={isLoading || (googleResponse ? this.isDisabledGoogle() : this.isDisabled())}
                    >
                      {isLoading ? <img src={loader} alt="" /> : 'Complete Registration'}
                    </button>
                  </div>
                  <div className="termsandcondition">
                    By clicking the &quot;Sign Up&quot; button, you are creating a CurrikiStudio account, and you agree to Curriki&apos;s{' '}
                    <a target="_blank" href={domain?.tos_type == 'URL' || domain?.tos_url != null ? domain?.tos_url : `/org/${domain?.domain}/terms-policy-content/tos_content`}>
                      Terms of Use
                    </a>{' '}
                    and{' '}
                    <a
                      target="_blank"
                      href={
                        domain?.privacy_policy_type == 'URL' || domain?.privacy_policy_url != null
                          ? domain?.privacy_policy_url
                          : `/org/${domain?.domain}/terms-policy-content/privacy_policy_content`
                      }
                    >
                      Privacy Policy.
                    </a>
                  </div>
                </>
              )}
            </div>

            <img src={bg} className="bg1" alt="" />
            <img src={bg1} className="bg2" alt="" />
          </div>
        )}
      </>
    );
  }
}

RegisterPage.propTypes = {
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  organizationTypes: PropTypes.array.isRequired,
  register: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
  loadOrganizationTypes: PropTypes.func.isRequired,
  domain: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  register: (data) => dispatch(registerAction(data)),
  loadOrganizationTypes: () => dispatch(loadOrganizationTypesAction()),
  googleLogin: (data) => dispatch(googleLoginAction(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  organizationTypes: state.auth.organizationTypes,
  domain: state?.organization?.currentOrganization,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage));
