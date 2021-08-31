import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

import bg from 'assets/images/loginbg.png';
import bg1 from 'assets/images/loginbg2.png';
import loader from 'assets/images/loader.svg';
import { forgotPasswordAction } from 'store/actions/auth';
import { getErrors } from 'utils';
import Error from './Error';
import Logo from './Logo';

import './style.scss';

function ForgotPasswordPage(props) {
  const { isLoading, forgotPassword } = props;

  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value.trim());
  }, [setEmail]);

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      if (!validator.isEmail(email)) {
        setError('Please input valid email.');
        return;
      }

      setError(null);

      await forgotPassword({ email });

      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Password reset email has been sent. Please follow the instructions.',
      });
    } catch (err) {
      setError(getErrors(err));
    }
  }, [email, forgotPassword]);

  const isDisabled = validator.isEmpty(email);

  return (
    <div className="auth-page">
      <Logo />

      <div className="auth-container">
        <h1 className="auth-title">Reset Password</h1>
        <h3 className="auth-description">
          Please enter your CurrikiStudio account&apos;s email and click the button below,
          then check your email for instructions on how to reset your password.
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
              // type="email"
              name="email"
              placeholder="Email*"
              required
              value={email}
              onChange={onChangeEmail}
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
                'Send Reset Password Link'
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

ForgotPasswordPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  forgotPassword: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  forgotPassword: (email) => dispatch(forgotPasswordAction(email)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage),
);
