import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import QueryString from 'query-string';

import logo from 'assets/images/studio_new_logo.png';
import dotsloader from 'assets/images/dotsloader.gif';
import bg from 'assets/images/loginbg.png';
import bg1 from 'assets/images/loginbg2.png';
import { confirmEmailAction } from 'store/actions/auth';

import './style.scss';

function ConfirmEmailPage(props) {
  const {
    history,
    location,
    isLoading,
    confirmEmail,
  } = props;

  const query = QueryString.parse(location.search);
  if (!query.id || !query.hash) {
    history.push('/studio/login');
  }

  useEffect(() => {
    confirmEmail(query).catch(() => {
      history.push('/studio/login');
    });
  }, [confirmEmail, history]);

  return (
    <div className="auth-page">
      <img className="auth-header-logo" src={logo} alt="" />

      <div className="auth-container">
        <div className="login-left">
          {isLoading ? (
            <img className="loader" src={dotsloader} alt="" />
          ) : (
            <>
              <h1 className="auth-title">Congratulations.</h1>
              <h3 className="auth-description">Thanks for joining. Your Email has been Confirmed!</h3>
              <div className="mt-5 text-center">
                <Link to="/studio/login">
                  Please click here when you are ready to Sign In
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <img src={bg} className="bg1" alt="" />
      <img src={bg1} className="bg2" alt="" />
    </div>
  );
}

ConfirmEmailPage.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  confirmEmail: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  confirmEmail: (data) => dispatch(confirmEmailAction(data)),
});

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ConfirmEmailPage),
);
