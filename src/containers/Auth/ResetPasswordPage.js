import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Swal from 'sweetalert2';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QueryString from 'query-string';

import loader from 'assets/images/loader.svg';
import bg from 'assets/images/loginbg.png';
import bg1 from 'assets/images/loginbg2.png';
import { resetPasswordAction } from 'store/actions/auth';
import storageService from 'services/storage.service';
import { getErrors } from 'utils';
import Error from './Error';
import Logo from './Logo';

import './style.scss';

function ResetPasswordPage(props) {
  const {
    history,
    location,
    isLoading,
    resetPassword,
  } = props;

  const query = QueryString.parse(location.search);
  if (!query.token) {
    history.push('/studio/login');
  }

  const [state, setState] = useState({
    email: storageService.getItem('forgotPasswordEmail') || '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);

  const onChangeField = useCallback((e) => {
    e.persist();

    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }, [setState]);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    const email = state.email.trim();
    const password = state.password.trim();
    const confirmPassword = state.confirmPassword.trim();

    try {
      if (!validator.isEmail(email)) {
        setError('Please input valid email.');
        return;
      }

      if (password !== confirmPassword) {
        setError('Password does not match.');
        return;
      }

      setError(null);

      await resetPassword({
        token: query.token,
        email,
        password,
        password_confirmation: confirmPassword,
      });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password has been reset successfully.',
      });
    } catch (err) {
      setError(getErrors(err));
    }
  }, [query.token, state, resetPassword]);

  const isDisabled = validator.isEmpty(state.email.trim())
    || validator.isEmpty(state.password.trim())
    || validator.isEmpty(state.confirmPassword.trim());

  return (
    <div className="auth-page">
      <Logo />

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
              // type="email"
              name="email"
              placeholder="Email*"
              required
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
              required
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
              required
              value={state.confirmPassword}
              onChange={onChangeField}
            />
          </div>

          <Error error={error} />

          <div className="form-group">
            <button
              type="submit"
              className="signUp-btn submit"
              disabled={isLoading || isDisabled}
            >
              {isLoading ? (
                <img src={loader} alt="" />
              ) : (
                'Reset Password'
              )}
            </button>
          </div>

          <div className="form-group text-center">
            <Link to="/studio/login">Back to Login</Link>
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
  location: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  resetPassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  resetPassword: (email) => dispatch(resetPasswordAction(email)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage),
);
