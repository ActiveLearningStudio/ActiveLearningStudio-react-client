import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

import loader from 'assets/images/loader.svg';
import { getErrors } from 'utils';
import { updatePasswordAction } from 'store/actions/auth';
// import Header from 'components/Header';
import Footer from 'components/Footer';
// import Sidebar from 'components/Sidebar';
import Error from '../Auth/Error';

import './style.scss';

function ChangePasswordPage(props) {
  const {
    isLoading,
    updatePassword,
  } = props;

  const [error, setError] = useState(null);
  const [state, setState] = useState({
    currentPassword: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onChangeField = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const {
    currentPassword,
    password,
    confirmPassword,
  } = state;

  const onSubmit = useCallback(async (e) => {
    e.preventDefault();

    try {
      setError(null);

      const message = await updatePassword({
        current_password: currentPassword.trim(),
        password: password.trim(),
        password_confirmation: confirmPassword.trim(),
      });

      Swal.fire({
        icon: 'success',
        title: message,
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
        allowOutsideClick: false,
      });

      setState({
        currentPassword: '',
        password: '',
        confirmPassword: '',
      });
    } catch (err) {
      setError(getErrors(err));
    }
  }, [currentPassword, password, confirmPassword, updatePassword]);

  const isDisabled = validator.isEmpty(currentPassword.trim())
    || validator.isEmpty(password.trim())
    || validator.isEmpty(confirmPassword.trim());

  return (
    <>
      <div className="account-page">
        <div className="content-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <h1 className="title">Change Password</h1>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-12">
                <form
                  className="auth-form"
                  onSubmit={onSubmit}
                  autoComplete="off"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="current-password">Current Password</label>
                        <FontAwesomeIcon icon="lock" />
                        <input
                          className="input-box"
                          type="password"
                          id="current-password"
                          name="currentPassword"
                          placeholder="Current Password*"
                          required
                          value={currentPassword}
                          onChange={onChangeField}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="password">New Password</label>
                        <FontAwesomeIcon icon="lock" />
                        <input
                          className="input-box"
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Password*"
                          required
                          value={password}
                          onChange={onChangeField}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <FontAwesomeIcon icon="lock" />
                        <input
                          className="input-box"
                          type="password"
                          id="confirm-password"
                          name="confirmPassword"
                          placeholder="Confirm Password*"
                          required
                          value={confirmPassword}
                          onChange={onChangeField}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <Error error={error} />
                    </div>
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary submit"
                      disabled={isLoading || isDisabled}
                    >
                      {isLoading ? (
                        <img src={loader} alt="" />
                      ) : (
                        'Update Password'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

ChangePasswordPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  // user: PropTypes.object,
  updatePassword: PropTypes.func.isRequired,
};

// ChangePasswordPage.defaultProps = {
//   user: null,
// };

const mapDispatchToProps = (dispatch) => ({
  updatePassword: (data) => dispatch(updatePasswordAction(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  // user: state.auth.user,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage);
