/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import validator from 'validator';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleLogin } from 'react-google-login';

// import bg from 'assets/images/loginbg.png';
// import bg1 from 'assets/images/loginbg2.png';
import loader from 'assets/images/loader.svg';
import googleIcon from 'assets/images/google.png';
import emailIcon from 'assets/images/email.png';
import stemuliIcon from 'assets/images/stemuli_logo.png';
import { loginAction, googleLoginAction } from 'store/actions/auth';
import { getErrors } from 'utils';
import Error from './Error';
import Logo from './Logo';

import './style.scss';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      clicked: true,
      error: null,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    document.body.classList.remove('mobile-responsive');
  }

  onChangeField = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    try {
      const { email, password } = this.state;
      const { history, login, domain } = this.props;

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,4}$/i.test(email?.trim())) {
        this.setState({
          error: 'Please input valid email.',
        });

        return;
      }

      this.setState({
        error: null,
      });

      const result = await login({
        email: email.trim(),
        password: password.trim(),
        domain: domain?.domain || 'currikistudio',
      });
      console.log(result);
      history.push(`/studio/org/${domain?.domain}`);
    } catch (err) {
      this.setState({
        error: getErrors(err),
      });
    }
  };

  onGoogleLoginSuccess = (response) => {
    const { googleLogin } = this.props;
    const result = googleLogin(response);
    result.catch((err) => {
      this.setState({
        error: getErrors(err),
      });
    });
  };

  onGoogleLoginFailure = (response) => {
    console.log(response);
  };

  isDisabled = () => {
    const { email, password } = this.state;
    return validator.isEmpty(email.trim()) || validator.isEmpty(password.trim());
  };

  goToRegister = () => {
    const { history } = this.props;
    history.push('/studio/register');
  };

  render() {
    const {
      email,
      password,
      rememberMe,
      error,
      clicked,
    } = this.state;
    const { isLoading } = this.props;

    return (
      <div className="auth-page">
        <Logo />
        {!clicked ? (
          <div className="auth-container">
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="auth-title ">Welcome to Curriki</h1>

              {/* <strong>OR</strong> */}

              {/* <button
                type="button"
                className="btn btn-outline-primary text-uppercase"
                onClick={this.goToRegister}
              >
                Sign Up
              </button> */}
            </div>
            {/* <h2 className="auth-subtitle">Powering the creation of the world’s Most Immersive Learning Experience</h2> */}
            <p className="auth-Pdescrip">
              Sign Up and start making a difference in the way learning experiences are created.
            </p>
            <form
              onSubmit={this.onSubmit}
              autoComplete="off"
              className="auth-form"
            >
              <div className="form-group text-center mb-0">
                <GoogleLogin
                  clientId={global.config.gapiClientId}
                  theme="dark"
                  render={(renderProps) => (
                    <button type="button" className="google-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      <img src={googleIcon} alt="googleIcon" style={{ float: 'left', paddingRight: '19.23px' }} />
                      Continue with Google
                    </button>
                  )}
                  onSuccess={this.onGoogleLoginSuccess}
                  onFailure={this.onGoogleLoginFailure}
                  scope="https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.coursework.students"
                  cookiePolicy="single_host_origin"
                />

              </div>
              {process.env.REACT_APP_STEMULI === 'true' && (
                <div className="form-group text-center mb-4">
                  <button
                    type="button"
                    className="email-button"
                    onClick={() => { window.location.href = `${process.env.REACT_APP_API_URL}/oauth/stemuli/redirect`; }}
                  >
                    <img src={stemuliIcon} alt="stemuli icon" style={{ float: 'left', paddingRight: '19.23px' }} />
                    <span>Continue with Stemuli</span>
                  </button>
                </div>
              )}
              <div className="form-group text-center mb-0">
                <button
                  type="button"
                  className="email-button"
                  onClick={() => this.setState({
                    clicked: true,
                  })}
                >
                  <img src={emailIcon} alt="email icon" style={{ float: 'left', paddingRight: '19.23px' }} />
                  <span>Continue with Email</span>
                </button>
              </div>
            </form>
            <p className="auth-description">
              New to Curriki?&nbsp;
              <a onClick={this.goToRegister}>
                Sign up
              </a>
            </p>
            <p className="auth-p2-descrip">
              By clicking the Sign Up button, you are creating a CurrikiStudio  account, and you agree to Currikis&nbsp;
              <a href="/" target="_blank">
                Terms of Use&nbsp;
              </a>
              and&nbsp;
              <a href="/" target="_blank">
                Privacy Policy.
              </a>
            </p>
          </div>
        ) : (
          <div className="auth-container">
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="auth-title mb-2">Welcome to Curriki</h1>

              {/* <strong>OR</strong> */}

              {/* <button
                type="button"
                className="btn btn-outline-primary text-uppercase"
                onClick={this.goToRegister}
              >
                Sign Up
              </button> */}
            </div>

            {/* <h2 className="auth-subtitle">Powering the creation of the world’s Most Immersive Learning Experience</h2> */}

            <p className="auth-Pdescrip">
              Sign Up and start making a difference in the way learning experiences are created.
            </p>

            <form
              onSubmit={this.onSubmit}
              autoComplete="off"
              className="auth-form"
            >
              {/* <div className="form-group">
                <button type="button" className="back-button" onClick={() => this.setState({ clicked: false })}>
                  Back
                </button>
              </div> */}
              <div className="form-group">
                {/* <FontAwesomeIcon icon="envelope" /> */}
                <span>Email</span>
                <input
                  autoFocus
                  className="input-box"
                  // type="email"
                  name="email"
                  required
                  value={email}
                  onChange={this.onChangeField}
                />
              </div>

              <div className="form-group">
                {/* <FontAwesomeIcon icon="lock" /> */}
                <span>Password</span>
                <input
                  className="password-box"
                  type="password"
                  name="password"
                  required
                  value={password}
                  onChange={this.onChangeField}
                />
              </div>

              <div className="form-group remember-me">
                <label>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    value={rememberMe}
                    onChange={this.onChangeField}
                  />
                  Keep me logged in.
                </label>
                <div className="forgot-password-box">
                  <Link to="/studio/forgot-password">Forgot Password ?</Link>
                </div>
              </div>

              <Error error={error} />

              <div className="form-button">
                <button
                  type="submit"
                  className="btn btn-primary submit"
                  disabled={isLoading || this.isDisabled()}
                >
                  {isLoading ? (
                    <img src={loader} alt="" />
                  ) : (
                    'LOG IN'
                  )}
                </button>
              </div>
              <div className="vertical-line">
                <div className="line" />
                <p className="line-or">or</p>
                <div className="line" />
              </div>

              <p className="auth-description text-center">
                New to Curriki?&nbsp;
                <a onClick={this.goToRegister}>
                  Sign up
                </a>
              </p>

              <div className="form-group text-center mb-0">
                <GoogleLogin
                  clientId={global.config.gapiClientId}
                  theme="dark"
                  render={(renderProps) => (
                    <button type="button" className="google-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                      <img src={googleIcon} alt="googleIcon" style={{ float: 'left', paddingRight: '19.23px' }} />
                      Sign Up with Google
                    </button>
                  )}
                  onSuccess={this.onGoogleLoginSuccess}
                  onFailure={this.onGoogleLoginFailure}
                  scope="https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.coursework.students"
                  cookiePolicy="single_host_origin"
                />

              </div>

              <div className="termsandcondition">
                By clicking the &quot;Sign Up&quot; button, you are creating a CurrikiStudio  account, and you agree to Curriki&apos; s
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

              {/* <div className="form-group text-center mb-0">
                <GoogleLogin
                  clientId={global.config.gapiClientId}
                  theme="dark"
                  onSuccess={this.onGoogleLoginSuccess}
                  onFailure={this.onGoogleLoginFailure}
                  scope="https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.coursework.students"
                  cookiePolicy="single_host_origin"
                >
                  <span>Login with Google</span>
                </GoogleLogin>
              </div> */}
            </form>
          </div>
        )}

        {/* <img src={bg} className="bg1" alt="" /> */}
        {/* <img src={bg1} className="bg2" alt="" /> */}
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
  domain: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(loginAction(data)),
  googleLogin: (data) => dispatch(googleLoginAction(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  domain: state.organization.currentOrganization,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage),
);
