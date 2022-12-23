/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Alert } from 'react-bootstrap';
import { PublicClientApplication } from '@azure/msal-browser';
import config from 'config';
import lmsService from 'services/genericLMS.service';
import Activity from 'containers/LMS/MsTeams/MsTeamsActivity';
import logo from 'assets/images/logo.svg';
import msTeamLogo from 'assets/images/msTeamLogin.svg';
import './styles.scss';

function MsTeamActivityLaunch({ match }) {
  const { activityId } = match.params;
  const [activeOrg, setActiveOrg] = useState(null);
  const [msAuthData, setMsAuthData] = useState(null);
  const [error, setError] = useState(null);
  const [client, setClient] = useState(null);

  useEffect(() => {
    lmsService.loadH5PSettings(activityId)
    .then((activityData) => {
      console.log('activity data', activityData);
      if (!activityData) {
        setError('Activity not found.');
        return;
      }

      setActiveOrg(activityData.organization);
    });
  }, []);

  useEffect(() => {
    if (!activeOrg) return;

    if (!activeOrg.msteam_client_id || !activeOrg.msteam_tenant_id) {
      setError('MS Teams details missing.');
      return;
    }

    const client = new PublicClientApplication({
      auth: {
        clientId: activeOrg.msteam_client_id,
        redirectUri: `${config.domainUrl}org/currikistudio`,
        authority: `https://login.microsoftonline.com/${activeOrg.msteam_tenant_id}`,
      },
      cache: {
        cacheLocation: 'sessionStorage',
        storeAuthStateInCookie: true,
      },
    });
    setClient(client);
  }, [activeOrg]);

  useEffect(() => {
    if (!msAuthData) return;

    lmsService.getMsTeamsClassMembers(classId, msAuthData.accessToken)
    .then((response) => {
      var found = false;
      for (var i = 0; i < response.value.length; i++) {
        if (response.value[i].id === msAuthData.uniqueId) {
          found = true;
          break;
        }
      }

      if (!found) setError('User is not a member of this class');
    });

    lmsService.getMsTeamsClassTeachers(classId, msAuthData.accessToken)
    .then((response) => {
      var found = false;
      for (var i = 0; i < response.value.length; i++) {
        if (response.value[i].id === msAuthData.uniqueId) {
          found = true;
          break;
        }
      }

      if (found) setError('User is a teacher in this class and is not authorized to take the activity');
    });
  }, [msAuthData]);

  const openMicrsoftTeamLogin = () => {
    client.loginPopup({
      scopes: ['user.read'],
      prompt: 'select_account',
    }).then((data) => setMsAuthData(data))
    .catch((e) => {
      console.log('login error', e)
      setError('Failed to login to MS Teams');
    });
  };  

  return (
    <>
      <div className="gclass-activity-container">
        <section className="main-page-content preview iframe-height-resource-shared defaultcontainer">
          <Helmet>
            <script src="https://dev.currikistudio.org/api/storage/h5p/h5p-core/js/h5p-resizer.js" charset="UTF-8" />
          </Helmet>
          <div className="flex-container previews">
            <div className="activity-bg left-vdo">
              <div className="main-item-wrapper desktop-view">
                <div className="item-container">
                  <Activity activityId={activityId} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

MsTeamsActivityPage.defaultProps = {
};

MsTeamsActivityPage.propTypes = {
};

const mapStateToProps = (state) => ({
  activeOrg: state.organization,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MsTeamActivityLaunch);