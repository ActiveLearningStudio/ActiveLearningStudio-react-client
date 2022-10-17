/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import validator from 'validator';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GoogleLogin } from 'react-google-login';
import { Tabs, Tab } from 'react-bootstrap';
// import bg from 'assets/images/loginbg.png';
// import bg1 from 'assets/images/loginbg2.png';
import loader from 'assets/images/loader.svg';
import googleIcon from 'assets/images/google.svg';
import emailIcon from 'assets/images/email.png';
import stemuliIcon from 'assets/images/stemuli_logo.png';
import { loginAction, googleLoginAction } from 'store/actions/auth';
import { getErrors } from 'utils';
import eye from 'assets/images/eye.svg';
import Error from './Error';
import Logo from './Logo';
import './style.scss';
import PreviewSmSvg from 'iconLibrary/dropDown/PreviewSmSvg';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberMe: false,
      clicked: true,
      error: null,
      emailError: null,
      activeTab: 'Log in',
      showPassword: false,
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

      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,4}$/i.test(email?.trim()) || email === '') {
        this.setState({
          emailError: 'Please enter a valid email address.',
          error: null,
        });

        return;
      }

      this.setState({
        error: null,
        emailError: null,
      });

      const result = await login({
        email: email.trim(),
        password: password.trim(),
        domain: domain?.domain || 'currikistudio',
      });
      console.log(result);
      history.push(`/org/${domain?.domain}`);
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
    const { history, domain } = this.props;
    if (domain) {
      history.push(`/register/${domain?.domain}`);
    } else {
      history.push('register');
    }
  };

  render() {
    const { email, password, rememberMe, error, clicked, activeTab, showPassword } = this.state;
    const { isLoading, domain } = this.props;

    if (window.location.host.includes('my.currikistudio.org')) {
      if (window.location.pathname === '/login/' || window.location.pathname === '/login') {
        window.location.replace('https://currikistudio.org');
      }
    }

    return (
      <div className="auth-page">
        <Logo />
        {!clicked ? (
          <div className="auth-container">
            <div className="d-flex align-items-center justify-content-between">
              <h1 className="auth-title ">Welcome to {window.__RUNTIME_CONFIG__.REACT_APP_INSTANT_NAME || 'Curriki'}</h1>

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
            <p className="auth-Pdescrip">Sign Up and start making a difference in the way learning experiences are created.</p>
            <form onSubmit={this.onSubmit} autoComplete="off" className="auth-form">
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
                  cookiePolicy="single_host_origin"
                />
              </div>
              {window.__RUNTIME_CONFIG__.REACT_APP_STEMULI === 'true' && (
                <div className="form-group text-center mb-4">
                  <button
                    type="button"
                    className="email-button"
                    onClick={() => {
                      window.location.href = `${window.__RUNTIME_CONFIG__.REACT_APP_API_URL}/oauth/stemuli/redirect`;
                    }}
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
                  onClick={() =>
                    this.setState({
                      clicked: true,
                    })
                  }
                >
                  <img src={emailIcon} alt="email icon" style={{ float: 'left', paddingRight: '19.23px' }} />
                  <span>Continue with Email</span>
                </button>
              </div>
            </form>
            <p className="auth-description">
              New to Curriki?&nbsp;
              <a onClick={this.goToRegister}>Sign up</a>
            </p>
            <p className="auth-p2-descrip">
              By clicking the Sign Up button, you are creating a CurrikiStudio account, and you agree to Currikis&nbsp;
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
              <h1 className="auth-title">Welcome to {window.__RUNTIME_CONFIG__.REACT_APP_INSTANT_NAME || 'Curriki'}</h1>
            </div>
            {/* <p className='auth-Pdescrip'>Start making a difference in the way learning experiences are created.</p> */}
            <p className="auth-Pdescrip"></p>
            <div className="content-section">
              <Tabs
                defaultActiveKey={activeTab}
                activeKey={activeTab}
                id="uncontrolled-tab-example"
                onSelect={(key) => {
                  this.setState({ activeTab: key });
                  if (key === 'Sign up') this.goToRegister();
                }}
              >
                <Tab eventKey="Log in" title="Log In">
                  <div className="module-content">
                    <form onSubmit={this.onSubmit} autoComplete="off" className="auth-form">
                      <div className="form-group" id={this.state.emailError && 'email_error_input_field_div'}>
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
                          style={{ border: this.state.emailError ? '1px solid #FF403B' : '', borderColor: this.state.emailError && '#FF403B' }}
                        />
                        {this.state.emailError && <span className="email-error">{this.state.emailError}</span>}
                      </div>

                      <div className="form-group">
                        {/* <FontAwesomeIcon icon="lock" /> */}
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
                          placeholder="*************"
                          required
                          value={password}
                          onChange={this.onChangeField}
                        />
                      </div>

                      <div className="form-group remember-me">
                        <label>
                          <input type="checkbox" name="rememberMe" value={rememberMe} onChange={this.onChangeField} />
                          Keep me Logged In
                        </label>
                        <div className="forgot-password-box">
                          <Link to="/forgot-password">Forgot Your Password?</Link>
                        </div>
                      </div>
                      <div className="form-group">
                        <Error error={error} />
                      </div>
                      <div className="form-button">
                        <button type="submit" className="btn btn-primary submit" disabled={isLoading || this.isDisabled()}>
                          {isLoading ? <img src={loader} alt="" style={{ marginTop: '-10px' }} /> : 'Log In'}
                        </button>
                      </div>
                      <div className="login-separator-box">
                        <div className="login-separator"></div>
                        <div className="text-separator">or</div>
                        <div className="login-separator"></div>
                      </div>
                      {true ? (
                        <>
                          {/* <div className="vertical-line">
                            <div className="line" />
                            <p className="line-or">or</p>
                            <div className="line" />
                          </div> */}

                          {/* <p className="auth-description text-center">
                            New to Curriki?&nbsp;
                            <a onClick={this.goToRegister}>
                              Sign up
                            </a>
                          </p> */}

                          <div className="form-group text-center mb-5">
                            <GoogleLogin
                              clientId={global.config.gapiClientId}
                              theme="dark"
                              render={(renderProps) => (
                                <button type="button" className="google-button" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                  <img src={googleIcon} alt="googleIcon" />
                                  <div>Log in with Google</div>
                                </button>
                              )}
                              onSuccess={this.onGoogleLoginSuccess}
                              onFailure={this.onGoogleLoginFailure}
                              cookiePolicy="single_host_origin"
                            />
                          </div>
                        </>
                      ) : null}
                      <div className="termsandcondition">
                        By logging in, you agree to Curriki's{' '}
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
                    </form>
                  </div>
                </Tab>
                {domain?.self_registration === true && <Tab eventKey="Sign up" title="Register Here!" />}
              </Tabs>
            </div>
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
  domain: state?.organization?.currentOrganization,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));
