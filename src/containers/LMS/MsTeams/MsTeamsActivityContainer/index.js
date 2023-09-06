/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import MsTeamActivityLaunchScreen from 'containers/LMS/MsTeams/MsTeamActivityLaunchScreen';
import AdminGrantMessage from './AdminGrantMessage';
import MsTeamsService from 'services/msTeams.service';
import { useLocation } from "react-router-dom";
import { Alert } from 'react-bootstrap';
import { app, authentication } from '@microsoft/teams-js';
import logo from 'assets/images/studio_new_logo_small.png';
import './style.scss';

function MsTeamsActivityContainer({ match, history }) {
  const { activityId, tenantId } = match.params;
  const queryParams = new URLSearchParams(useLocation().search);
  const classId = queryParams.get('classId');
  const assignmentId = queryParams.get('assignmentId');
  const submissionId = queryParams.get('submissionId');
  const view = queryParams.get('view');
  const userRole = queryParams.get('userRole');
  const tokenTimestamp = localStorage.getItem('msteams_token_timestamp');
  const [token, setToken] = useState(localStorage.getItem('msteams_token'));
  const [freshToken, setFreshToken] = useState((token && ((new Date() - new Date(tokenTimestamp)) / 1000) / 60 < 15));
  const [error, setError] = useState(null);
  const [activityParams, setActivityParams] = useState(null);
  const [showOAuth, setShowOAuth] = useState(false);
  const popupWindowCheckInterval = useRef(null);
  const adminUrl = new URL(`https://login.microsoftonline.com/${tenantId}/adminconsent`);
  const adminUrlParams = new URLSearchParams();
  adminUrlParams.append('client_id', config.teamsClientId);
  adminUrlParams.append('redirect_uri', `https://${window.location.hostname}/msteams/callback`);
  adminUrlParams.append('state', 'link');
  adminUrl.search = adminUrlParams.toString();



  // Getting the microsoft auth code that will allow us to request a token on the callback and redirect back here
  useEffect(() => {
    if (freshToken) return;

    const authRequest = {
      successCallback: (response) => {
        MsTeamsService.msTeamsTokenObo(response).then((response) => {
          localStorage.setItem('msteams_token', response.access_token);
          localStorage.setItem('msteams_refresh_token', response.refresh_token);  
          localStorage.setItem('msteams_token_timestamp', new Date().toString());
          setToken(response.access_token);
          setFreshToken(true);
        }).catch((e) => {
          console.log('token error:', e);

          // No permission grant from user or admin. Going into oauth flow
          if (e.errors === 'invalid_grant') {
            setShowOAuth(true);
          } else {
            setError('There was a problem initializing the application. Please contact your Teams administrator. E003');
          }
        });
      },
      failureCallback: (response) => { 
        console.log('failure:', response);
        setError('There was a problem initializing the application. Please contact your Teams administrator. E002');
      },
    };

    app.initialize().then(() => {
      authentication.getAuthToken(authRequest);
    }).catch(() => {
      setError('There was a problem initializing the application. Please contact your Teams administrator. E001');
    });
  }, []);

  useEffect(() => {
    if (!freshToken) return;

    if (!view) { // If we don't have any view info, must be in tab view
      setActivityParams({
        assignmentId: 'noassignment',
        classId: 'noclass',
        view: 'tab',
        userRole: 'tabuser',
        submissionId: 'preview',
        mtAssignmentStatus: 'preview',
        userId: 'tabuser',
      });
      return;
    }

    if (view === 'SpeedGrader') {
      // Redirecting teacher to summary view
      history.push(`/msteam/summary/${classId}/${activityId}/${submissionId}`);
      return;
    }

    if (userRole === 'teacher') { // Activity viewed in preview mode by a teacher
      setActivityParams({
        assignmentId,
        classId,
        view,
        userRole,
        submissionId: 'preview',
        mtAssignmentStatus: 'preview',
        userId: 'teacher',
      });
      return;
    }

    MsTeamsService.getSubmissionStatus(token, submissionId, assignmentId, classId)
      .then((response) => {
        setActivityParams({
          assignmentId,
          classId,
          view,
          userRole,
          submissionId,
          mtAssignmentStatus: response.submission.status,
          userId: response.submission.submittedBy.user.id,
        });
      }).catch((e) => {
        console.log('Error fetching submission status', e);
        setError('Error fetching submission status');
      });
  }, [freshToken]);

  const doLogin = () => {
    const url = new URL(`https://login.microsoftonline.com/${tenantId}/adminconsent`);
    const params = new URLSearchParams();
    params.append('client_id', config.teamsClientId);
    params.append('redirect_uri', `https://${window.location.hostname}/msteams/callback`);
    params.append('state', 'authorize');
    url.search = params.toString();
    const win = window.open(url, "", "width=400,height=600");
    
    popupWindowCheckInterval.current = setInterval(() => {
      if (win.closed) {
        clearInterval(popupWindowCheckInterval.current);
        window.location.reload();
      }
    }, 500);
  };
 
  return (
    <>
      {showOAuth ? <AdminGrantMessage adminUrl={adminUrl} doLogin={doLogin} /> : (
        <div className="gclass-activity-container">
          <section className="main-page-content preview iframe-height-resource-shared defaultcontainer msteams-padding">
            <Helmet>
              <script src={`https://${window.location.hostname}/api/storage/h5p/h5p-core/js/h5p-resizer.js`} charset="UTF-8" />
            </Helmet>
            <div className="flex-container previews">
              <div className="activity-bg left-vdo msteams-width">
                <div className="main-item-wrapper desktop-view">
                  <div className="item-container">
                    {error && (
                      <div className="outcome-summary-container">
                        <div className="loading">
                          <div className="loading_image">
                            <img src={logo} alt="Curriki Studio logo" />
                          </div>
                          <div className="loading-message">{error}</div>
                        </div>
                      </div>
                    )}
                    {!error && activityParams && <MsTeamActivityLaunchScreen activityId={activityId} paramObj={activityParams} />}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

MsTeamsActivityContainer.defaultProps = {
};

MsTeamsActivityContainer.propTypes = {
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MsTeamsActivityContainer);
