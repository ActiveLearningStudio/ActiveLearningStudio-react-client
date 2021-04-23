import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import QueryString from 'query-string';
import { withRouter } from 'react-router-dom';

import { SSOLoginAction } from 'store/actions/auth';
import Logo from './Logo';
import './style.scss';

function LtiSSO(props) {
  const { history } = props;
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const query = QueryString.parse(window.location.search);
      const result = await dispatch(SSOLoginAction({ sso_info: query.sso_info }));
      console.log(result);
      history.push('/org/currikistudio');
    })();
  }, []);
  return (
    <div className="auth-page">
      <Logo />
      <div className="auth-container">
        <h1 className="auth-title">Redirecting To CurrikiStudio</h1>
        <h3 className="auth-description">
          Loading ....  please wait
        </h3>
      </div>
    </div>
  );
}

LtiSSO.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(LtiSSO);
