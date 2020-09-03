import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import loader from 'assets/images/loader.svg';
import { updateProfileAction } from 'store/actions/auth';
import Header from 'components/Header';
import Error from '../Auth/Error';

import './style.scss';

function ChangePasswordPage(props) {
  const {
    isLoading,
    error,
    user,
    updateProfile,
  } = props;

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

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProfile({
        id: user.id,
        currentPassword: state.currentPassword,
        password: state.password,
        confirm_password: state.confirmPassword,
      });
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <Header {...props} />

      <div className="account-page main-content-wrapper">
        <div className="content-wrapper">
          <div className="content">
            <div className="row">
              <div className="col-md-12">
                <h1 className="title">Change Password</h1>
              </div>
            </div>

            <div className="row justify-content-center">
              <div className="col-md-8">
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
                          type="text"
                          id="current-password"
                          name="currentPassword"
                          placeholder="Current Password*"
                          required
                          value={state.currentPassword}
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
                          type="text"
                          id="password"
                          name="password"
                          placeholder="Password*"
                          required
                          value={state.password}
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
                          type="text"
                          id="confirm-password"
                          name="confirmPassword"
                          placeholder="Confirm Password*"
                          required
                          value={state.confirmPassword}
                          onChange={onChangeField}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-primary submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <img src={loader} alt="" />
                      ) : (
                        'Update Password'
                      )}
                    </button>
                  </div>

                  <Error error={error} />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

ChangePasswordPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  user: PropTypes.object,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  updateProfile: PropTypes.func.isRequired,
};

ChangePasswordPage.defaultProps = {
  user: null,
  error: null,
};

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (data) => dispatch(updateProfileAction(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  user: state.auth.user,
  error: state.auth.error,
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordPage);
