import { app } from '@microsoft/teams-js';
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import logo from 'assets/images/login_logo.svg';
import './style.scss';

const MsTeams = () => {
  const [msContext, setMsContext] = useState(null);
  const [error, setError] = useState(null);
  const lmsUrl = 'https%3A%2F%2Fteams.microsoft.com';
  const [ltiClientId, setLtiClientId] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null);
  const [showLanding, setShowLanding] = useState(false);

  // Get app context and auth token
  useEffect(() => {
    app.initialize().then(async () => {
      await app.getContext().then((response) => {
        setMsContext(response);
      });
    });
  }, []);

  useEffect(() => {
    if (msContext === null) return;

    if (msContext.user.userPrincipalName.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null) {
      setError('Login Email provided by context is not a valid email address');
      return;
    }

    // When subPageId is empty, we're not creating an assignment so we
    if (msContext.page.frameContext === 'settings' && msContext.page.subPageId === '') {
      setShowLanding(true);
      return;
    }

    setLtiClientId(msContext?.user.tenant.id);
    const params = {
      user_email: msContext.user.userPrincipalName,
      lti_client_id: msContext.user.tenant.id,
      api_domain_url: 'teams.microsoft.com',
      course_name: msContext.team.displayName,
      course_id: msContext.team.groupId,
      platform: 'MS Teams',
    };
    setRedirectUrl(new URLSearchParams(params).toString());
  }, [msContext]);

  const handleAddTabButton = () => {
    setLtiClientId(msContext?.user.tenant.id);
    const params = {
      user_email: msContext.user.userPrincipalName,
      lti_client_id: msContext.user.tenant.id,
      api_domain_url: 'teams.microsoft.com',
      course_name: msContext.team.displayName,
      course_id: msContext.team.groupId,
      platform: 'MS Teams',
    };
    setRedirectUrl(new URLSearchParams(params).toString());
  };

  return (
    <>
      {msContext && redirectUrl !== null && (
        <Redirect
          to={{
            pathname: `/lti/content/${lmsUrl}/${ltiClientId}/${msContext.team.groupId}`,
            search: `?${redirectUrl}`,
          }}
        />
      )}

      {error && (
        <Alert className="alert" variant="danger">
          {error}
        </Alert>
      )}

      {showLanding && (
        <div className="after-install-message">
          <img src={logo} alt="Curriki Studio Logo" />
          <h2>You have successfully installed CurrikiStudio.</h2>
          <p>You can continue to add a team tab or close this dialog and proceed to assignment creation.</p>
          <button type="button" className="btn btn-primary" onClick={handleAddTabButton}>Add Tab</button>
        </div>
      )}
    </>
  );
};

export default MsTeams;
