/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
import { app } from '@microsoft/teams-js';
import React, { useState, useEffect } from 'react';
import SearchPage from 'containers/LMS/Canvas/DeepLinking/SearchPage';
import { Redirect } from 'react-router-dom';

const MsTeams = () => {
  const [msContext, setMsContext] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [authToken, setAuthToken] = useState(null);
  const [error, setError] = useState(null);
  // const lmsUrl = 'https%3A%2F%2Fcurriki.instructure.com';
  const lmsUrl = 'https%3A%2F%2Fteams.microsoft.com'; 
  const [ltiClientId, setLtiClientId] = useState(null);
  const [redirectUrl, setRedirectUrl] = useState(null);

  // Get app context and auth token
  useEffect(() => {
    app.initialize().then(async () => {
      await app.getContext().then((response) => {
        setMsContext(response);
      });
    });
  }, []);

    // Launch sso
  useEffect(() => {
    if (msContext === null) return;

    if (msContext.user.userPrincipalName.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) === null) {
      setError('Login Email provided by context is not a valid email address');
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
    console.log('context: ', msContext);
  }, [msContext]);

  // eslint-disable-next-line react/react-in-jsx-scope
  return (
    // eslint-disable-next-line object-curly-newline
    msContext && redirectUrl !== null && (
      <Redirect
        to={{
          pathname: `/lti/content/${lmsUrl}/${ltiClientId}/${redirectUrl}`,
          search: `?${redirectUrl}`,
        }}
      />
    )
  );
};

export default MsTeams;
