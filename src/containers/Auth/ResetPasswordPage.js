import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from 'assets/images/logo.svg';
import loader from 'assets/images/loader.svg';
import bg from 'assets/images/loginbg.png';
import bg1 from 'assets/images/loginbg2.png';
import { resetPasswordAction } from 'store/actions/auth';
import storageService from 'services/storage.service';
import { getQueryVariable } from 'utils';
import Error from './Error';

function ResetPasswordPage(props) {
  const {
    history,
    isLoading,
    error,
    resetPassword,
  } = props;

  const token = getQueryVariable('token');
  if (!token) {
    history.push('/login');
  }

  const [state, setState] = useState({
    email: storageService.getItem('forgotPasswordEmail') || '',
    password: '',
    confirmPassword: '',
  });

  const onChangeField = useCallback((e) => {
    e.persist();
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, [setState]);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      await resetPassword({
        token,
        email: state.email,
        password: state.password,
        password_confirmation: state.confirmPassword,
      });

      Swal({
        icon: 'success',
        title: 'Success',
        text: 'Password has been reset successfully.',
      });
    } catch (err) {
      // console.log(err);
    }
  }, [token, state, resetPassword]);

  const isDisabled = !state.email || !state.password || !state.confirmPassword
    || !validator.isEmail(state.email)
    || (state.password !== state.confirmPassword);

  return (
    <div className="auth-page">
      <img className="auth-header-logo" src={logo} alt="" />

      <div className="auth-container">
        <h1 className="auth-title">Reset Password</h1>
        <h3 className="auth-description">Input your new password</h3>

        <form
          onSubmit={onSubmit}
          autoComplete="off"
          className="auth-form"
        >
          <div className="form-group">
            <FontAwesomeIcon icon="envelope" />
            <input
              className="input-box"
              type="email"
              name="email"
              placeholder="Email*"
              value={state.email}
              onChange={onChangeField}
            />
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon="lock" />
            <input
              autoFocus
              className="input-box"
              type="password"
              name="password"
              placeholder="Password*"
              value={state.password}
              onChange={onChangeField}
            />
          </div>

          <div className="form-group">
            <FontAwesomeIcon icon="lock" />
            <input
              className="input-box"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password*"
              value={state.confirmPassword}
              onChange={onChangeField}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="btn btn-primary login-submit"
              disabled={isLoading || isDisabled}
            >
              {isLoading ? (
                <img src={loader} alt="" />
              ) : (
                'Reset Password'
              )}
            </button>
          </div>

          <Error error={error} />

          <div className="form-group text-center">
            <Link to="/login">Back to Login</Link>
          </div>
        </form>
      </div>

      <img src={bg} className="bg1" alt="" />
      <img src={bg1} className="bg2" alt="" />
    </div>
  );
}

ResetPasswordPage.propTypes = {
  history: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  resetPassword: PropTypes.func.isRequired,
};

ResetPasswordPage.defaultProps = {
  error: null,
};

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (email) => dispatch(resetPasswordAction(email)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage),
);
