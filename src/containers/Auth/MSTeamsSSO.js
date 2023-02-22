import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { app } from '@microsoft/teams-js';
import config from 'config';
import Logo from './Logo';
import './style.scss';

function MSTeamsSSO() {
  const [userContext, setUserContext] = useState(null);
  const [error, setError] = useState(null);

  // Get app context and auth token
  useEffect(() => {
    app.initialize().then(() => {
      app.getContext().then((response) => {
        setUserContext(response);
      });
    });
  }, []);

  // Launch sso
  useEffect(() => {
    if (userContext === null) return;

    if (userContext.user.loginHint.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null) {
      // If you ever see this error, then you might need to implement full
      // authentication with the graph api to fetch the full user profile
      // This was implemented before using nodejs but when moving to the
      // php sdk in the backend, it was decided to use just the context
      setError('Login hint provided by context is not a valid email address');
      return;
    }

    const params = {
      email: userContext.user.loginHint,
      first_name: userContext.user.userPrincipalName,
      last_name: userContext.user.userPrincipalName,
      lti_client_id: config.teamsClientId,
      tool_platform: 'msteams',
      guid: '',
    };
    const query = new URLSearchParams(params).toString();
    window.location = `https://${window.location.host}/canvas-lti-sso?sso_info=${btoa(query)}`;
  }, [userContext]);

  return (
    <div className="auth-page">
      <Logo />
      <div className="auth-container">
        <h1 className="auth-title">Welcome To CurrikiStudio</h1>
        {error && <Alert className="mt-3" variant="danger">{error}</Alert>}
      </div>
    </div>
  );
}

export default withRouter(MSTeamsSSO);
