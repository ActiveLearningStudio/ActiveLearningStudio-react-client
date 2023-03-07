/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import MsTeamActivityLaunchScreen from 'containers/LMS/MsTeams/MsTeamActivityLaunchScreen';
import MsTeamActivityTabLaunchScreen from 'containers/LMS/MsTeams/MsTeamActivityTabLaunchScreen';
import MTService from 'services/msTeams.service';
import { useLocation } from "react-router-dom";
import { app } from '@microsoft/teams-js';

import './styles.scss';

function MsTeamActivityLaunch({match}) {
  const { activityId, assignmentId } = match.params;
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const [isTeacher, setIsTeacher] = useState('teacher');
  const [msContext, setMsContext] = useState(null);
  const [mtStatus, setMtStatus] = useState(null);
  const mt_code_obj = JSON.parse(localStorage.getItem('mt_code_obj'));

  const code_timestamp = mt_code_obj?.timestamp;
  const current_timestamp = (new Date()).toJSON();
  const diffMs = (new Date((new Date(current_timestamp)) - (new Date(code_timestamp))));
  const code_issuance_minutes = Math.round(((diffMs % 86400000) % 3600000) / 60000);

  const getAssignmentDetailsFromGraphApi = async(code, submissionId, assignmentId, classId) => {
    try {
      const result = await MTService.msTeamsToken(code, msContext.user.tenant.id, submissionId, assignmentId, classId);
      setMtStatus(result.assignment_submission.status);
      localStorage.setItem('mt_code_utilized', true);
      localStorage.setItem('mt_token', result.access_token);
      localStorage.setItem('refresh_token', result.refresh_token);
    } catch (e) {
      console.log(e);
    }
  };

  // Get app context and auth token
  useEffect(() => {
    app.initialize().then(async () => {
      await app.getContext().then((response) => {
        setMsContext(response);
      });
    });
  }, []);

  useEffect(()=>{
    if (msContext === null) return;

    if(queryParams.get("submissionId") !== '' && localStorage.getItem('mt_code_utilized') == 'false'){
      getAssignmentDetailsFromGraphApi(mt_code_obj?.code, queryParams.get("submissionId"), queryParams.get("assignmentId"), queryParams.get("classId"));
    }
  }, [msContext]);
 
   useEffect(() => {
    if (msContext === null) return;

    if(queryParams.get("userRole") == 'student'){
      localStorage.setItem('mt_activityId', activityId);
      localStorage.setItem('mt_assignmentId', queryParams.get('assignmentId'));
      localStorage.setItem('mt_classId', queryParams.get('classId'));
      localStorage.setItem('mt_userRole', queryParams.get('userRole'));
      localStorage.setItem('mt_view', queryParams.get('view'));
      localStorage.setItem('mt_submissionId', queryParams.get('submissionId'));

      //validate code issuance time
      if(mt_code_obj == null || code_issuance_minutes > 10 == true || localStorage.getItem('mt_code_utilized') == 'true'){
        window.location.replace(`https://login.microsoftonline.com/${msContext.user.tenant.id}/oauth2/authorize?client_id=${config.teamsClientId}&response_type=code&Scope=offline_access%20user.read%20mail.read`);
        return;
      }
    }

    setIsTeacher(queryParams.get("userRole"));
  }, [msContext]);
  
  const params = {
    assignmentId: queryParams.get("assignmentId"),
    classId: queryParams.get("classId"),
    view: queryParams.get("view"),
    userRole: queryParams.get("userRole"),
    submissionId: queryParams.has('submissionId') ? queryParams.get("submissionId") : 'preview',
    mtAssignmentStatus: mtStatus,
  };
 
  return (
    <>
      <div className="gclass-activity-container">
        <section className="main-page-content preview iframe-height-resource-shared defaultcontainer msteams-padding">
          <Helmet>
            <script src="https://dev.currikistudio.org/api/storage/h5p/h5p-core/js/h5p-resizer.js" charset="UTF-8" />
          </Helmet>
          <div className="flex-container previews">
            <div className="activity-bg left-vdo msteams-width">
              <div className="main-item-wrapper desktop-view">
                <div className="item-container">
                  {msContext && queryParams.get("userRole") == 'teacher' && <MsTeamActivityLaunchScreen activityId={activityId} context={msContext} paramObj={params} />}
                  {msContext && queryParams.get("userRole") == 'student' && mtStatus && <MsTeamActivityLaunchScreen activityId={activityId} context={msContext} paramObj={params} />}
                  {msContext && queryParams.get("userRole") == null && <MsTeamActivityTabLaunchScreen activityId={activityId} context={msContext} />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

MsTeamActivityLaunch.defaultProps = {
};

MsTeamActivityLaunch.propTypes = {
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MsTeamActivityLaunch);
