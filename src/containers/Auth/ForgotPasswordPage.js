import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert';

import bg from 'assets/images/loginbg.png';
import bg1 from 'assets/images/loginbg2.png';
import logo from 'assets/images/logo.svg';
import loader from 'assets/images/loader.svg';
import { forgotPasswordAction } from 'store/actions/auth';
import Error from './Error';

import './style.scss';

function ForgotPasswordPage(props) {
  const { isLoading, forgotPassword, error } = props;

  const [email, setEmail] = useState('');

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, [setEmail]);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      await forgotPassword({ email });

      Swal({
        icon: 'success',
        title: 'Success',
        text: 'Password reset email has been sent. Please follow the instructions.',
      });
    } catch (err) {
      // console.log(err);
    }
  }, [email, forgotPassword]);

  const isDisabled = !validator.isEmail(email);

  return (
    <div className="auth-page">
      <img className="auth-header-logo" src={logo} alt="" />

      <div className="auth-container">
        <h1 className="auth-title">Reset Password</h1>
        <h3 className="auth-description">
          We will send reset password link to your email.
        </h3>

        <form
          onSubmit={onSubmit}
          autoComplete="off"
          className="auth-form"
        >
          <div className="form-group">
            <FontAwesomeIcon icon="envelope" />
            <input
              autoFocus
              className="input-box"
              type="email"
              name="email"
              placeholder="Email*"
              value={email}
              onChange={onChangeEmail}
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
                'Send Reset Password Link'
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

ForgotPasswordPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  forgotPassword: PropTypes.func.isRequired,
};

ForgotPasswordPage.defaultProps = {
  error: null,
};

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: (email) => dispatch(forgotPasswordAction(email)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage),
);
