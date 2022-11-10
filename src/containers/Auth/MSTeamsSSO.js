import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { app, authentication } from '@microsoft/teams-js';
import Logo from './Logo';
import './style.scss';

function MSTeamsSSO() {
  const [userContext, setUserContext] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [error, setError] = useState(null);

  // Get app context and auth token
  useEffect(() => {
    app.initialize().then(() => {
      app.getContext().then((response) => {
        setUserContext(response);
      });

      authentication.getAuthToken({
        successCallback: (result) => {
          setAuthToken(result);
          setError(null);
        },
        failureCallback: (e) => {
          console.log('msteamsapp authentication error', e);
          setAuthToken(null);
          setError('Failed to authenticate.');
        },
      });
    });
  }, []);

  // Get user profile from graph api
  useEffect(() => {
    if (authToken === null || userContext === null) return;

    axios.post(
      `https://${window.location.host}/msteamsapi/getProfileOnBehalfOf`,
      {
        tid: userContext.user.tenant.id,
        token: authToken,
      },
    ).then((response) => {
      setUserProfile(response.data);
    });
  }, [authToken, userContext]);

  // Launch sso
  useEffect(() => {
    if (userProfile === null) return;

    const params = {
      email: userProfile.mail,
      first_name: userProfile.givenName,
      last_name: userProfile.surname,
      lti_client_id: userContext.user.tenant.id,
      tool_platform: 'msteams',
      guid: '',
    };
    const query = new URLSearchParams(params).toString();
    window.location = `https://${window.location.host}/canvas-lti-sso?sso_info=${btoa(query)}`;
  }, [userProfile]);

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
