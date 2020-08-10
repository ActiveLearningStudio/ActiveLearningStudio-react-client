import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

import logo from 'assets/images/logo.svg';
import dotsloader from 'assets/images/dotsloader.gif';
import { confirmRegistration, hubspotConfirmation } from 'store/actions/auth';

function Confirm(props) {
  const { history, match } = props;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const result = confirmRegistration(match.params.confirmationId);
    result
      .then((res) => {
        setLoading(false);
        if (res.data.status === 'success') {
          hubspotConfirmation();
        }
      })
      .catch((err) => {
        Swal.fire({
          text: err.response.data.message,
          icon: 'warning',
        }).then(() => {
          history.push('/');
        });
      });
  }, [history, match.params.confirmationId]);

  return (
    <div className="auth-page">
      <img className="auth-header-logo" src={logo} alt="" />

      <div className="auth-container">
        <div className="login-left">
          {loading ? (
            <img className="loader" src={dotsloader} alt="" />
          ) : (
            <>
              <h2>Thanks for joining. Your Email has been Confirmed!</h2>
              <h3>
                Please check your mail. We just sent you a CurrikiStudio password.
              </h3>
              <Link to="/login">
                Please click here when you are ready to Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

Confirm.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default Confirm;
