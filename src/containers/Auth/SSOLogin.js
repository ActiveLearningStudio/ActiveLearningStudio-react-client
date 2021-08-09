import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleSsoLoginAction } from 'store/actions/auth';
import { withRouter } from 'react-router-dom';

function SSOLogin(props) {
  const {
    match,
    user,
    handleSsoLogin,
  } = props;

  // Init
  useEffect(() => {
    if (user !== null) {
      window.location.replace('/studio');
    } else {
      handleSsoLogin(JSON.parse(atob(match.params.ssodata)));
    }
  }, [user]);

  return (
    <div className="row">
      <div className="col">
        Redirecting...
      </div>
    </div>
  );
}

SSOLogin.propTypes = {
  match: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  handleSsoLogin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  handleSsoLogin: (params) => dispatch(handleSsoLoginAction(params)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SSOLogin));
