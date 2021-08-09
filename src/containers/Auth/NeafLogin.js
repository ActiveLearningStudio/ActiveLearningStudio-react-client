/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import bg from 'assets/images/loginbg.png';
import bg1 from 'assets/images/loginbg2.png';
import logo from 'assets/images/neaf.png';
import loader from 'assets/images/loader.svg';
import { loginAction, googleLoginAction } from 'store/actions/auth';
import { getErrors } from 'utils';
import Error from './Error';

import './style.scss';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      rememberMe: false,
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
      const { history, login } = this.props;

      if (!validator.isEmail(email.trim())) {
        this.setState({
          error: 'Please input valid email.',
        });

        return;
      }

      this.setState({
        error: null,
      });

      await login({
        email: email.trim(),
        password: password.trim(),
      });

      history.push('/studio');
    } catch (err) {
      this.setState({
        error: getErrors(err),
      });
    }
  };

  onGoogleLoginSuccess = (response) => {
    const { googleLogin } = this.props;
    googleLogin(response);
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
    history.push('/studio/neaf-register');
  };

  render() {
    const {
      email,
      password,
      rememberMe,
      error,
    } = this.state;
    const { isLoading } = this.props;

    return (
      <div className="auth-page">
        <img className="auth-header-logo" src={logo} alt="" />

        <div className="auth-container">
          <div className="d-flex align-items-center justify-content-between">
            <h1 className="auth-title mb-0">Login to CurrikiStudio</h1>

            <strong>OR</strong>

            <button
              type="button"
              className="btn btn-outline-primary text-uppercase"
              onClick={this.goToRegister}
            >
              Sign Up
            </button>
          </div>

          <h2 className="auth-subtitle">Powering the creation of the world’s Most Immersive Learning Experience</h2>

          <h3 className="auth-description">
            CurrikiStudio is changing the way learning experiences are
            designed, created, and delivered to a new generation of learners.
          </h3>

          <form
            onSubmit={this.onSubmit}
            autoComplete="off"
            className="auth-form"
          >
            <div className="form-group">
              <FontAwesomeIcon icon="envelope" />
              <input
                autoFocus
                className="input-box"
                // type="email"
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

            <div className="form-group remember-me">
              <label>
                <input
                  type="checkbox"
                  name="rememberMe"
                  value={rememberMe}
                  onChange={this.onChangeField}
                />
                Remember Me
              </label>
              <div className="forgot-password-box">
                <Link to="/studio/forgot-password">Forgot Password ?</Link>
              </div>
            </div>

            <Error error={error} />

            <div className="form-group">
              <button
                type="submit"
                className="btn btn-primary submit"
                disabled={isLoading || this.isDisabled()}
              >
                {isLoading ? (
                  <img src={loader} alt="" />
                ) : (
                  'Login'
                )}
              </button>
            </div>
          </form>
        </div>

        <img src={bg} className="bg1" alt="" />
        <img src={bg1} className="bg2" alt="" />
      </div>
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  googleLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  login: (data) => dispatch(loginAction(data)),
  googleLogin: (data) => dispatch(googleLoginAction(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginPage),
);
