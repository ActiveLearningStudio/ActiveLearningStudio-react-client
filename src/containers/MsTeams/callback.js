/* eslint-disable */
import React, { useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import logo from 'assets/images/studio_new_logo_small.png';
import './callbackStyle.scss';

const MsTeamsCallBack = () => {
  const params = new URLSearchParams(useLocation().search);
  const error = params.get('error');
  const errorSubCode = params.get('error_subcode');
  const errorDescription = params.get('error_description');
  const state = params.get('state');
  const admin_consent = params.get('admin_consent');

  useEffect(() => {
    if (state !== 'link' && !error) {
      window.close();
      return;
    }
  }, []);

  return (
    <div className="msteams-callback">
      <img src={logo} />
      {admin_consent && !error && <Alert variant="info">Admin consent granted successfully. You may close this window.</Alert>}
      {error && <Alert variant="danger">
        {error === 'access_denied' && <p>You have declined to consent access to the app. Curriki Studio needs these permissions in order to function properly. Please review the authorization once again to move forward.</p>}
        <p>{error}: {errorSubCode} {errorDescription}</p>
      </Alert>}
    </div>
  );
};

export default MsTeamsCallBack;