/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {mtCode} from "store/actions/msTeams";
import gifloader from 'assets/images/dotsloader.gif';
import { Alert } from 'react-bootstrap';
import MsTeamsService from 'services/msTeams.service';
import { app, authentication } from '@microsoft/teams-js';

const MsTeamsCallBack = () => {
  const params = new URLSearchParams(useLocation().search);
  const code = params.get('code');
  const state = params.get('state');
  const [error, setError] = useState(null);

  // Get app context and auth token
  useEffect(() => {
    MsTeamsService.msTeamsToken(code)
      .then((response) => {
        localStorage.setItem('msteams_token', response.access_token);
        localStorage.setItem('msteams_refresh_token', response.refresh_token);
        localStorage.setItem('msteams_token_timestamp', new Date().toString());
        window.location.replace(state);
        app.initialize().then(() => {
          authentication.notifySuccess('success');
        }).catch((e) => {
          console.log('failed to initialize msteams sdk', e);
        });
      }).catch((e) => {
        console.log('Error getting msteams token: ', e);
        setError('Failed to authenticate with Microsoft Teams');
        localStorage.removeItem('msteams_token');
        localStorage.removeItem('msteams_refresh_token');
      });
  }, []);

  return (
    <div className="loader_gif">
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
};

export default MsTeamsCallBack;