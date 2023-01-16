/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getOutcomeSummaryAction, loadH5pResourceSettings } from 'store/actions/gapi';
import SummaryOutcome from 'containers/LMS/MsTeams/ActivitySummary/SummaryOutcome';
import logo from 'assets/images/studio_new_logo_small.png';
import './style.scss';
import { app } from '@microsoft/teams-js';

const Activity = (props) => {
  const {
    match,
    // student,
    outcome,
    settings,
    getOutcomeSummary,
    loadH5pSettings,
  } = props;
  const { activityId, submissionId } = match.params;
  const [msContext, setMsContext] = useState(null);
  const [isTeacher, setIsTeacher] = useState(false);

     // Get app context of login user
     useEffect(() => {
      app.initialize().then(async () => {
        await app.getContext().then((response) => {
          setIsTeacher(response.user.licenseType == 'Teacher' ? true : false);
          setMsContext(response);
          console.log('my context', response);
        });
      });
    }, []);


  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    const activity = `${window.location.origin}/activity/${activityId}/submission/${submissionId}`;
    getOutcomeSummary('msteams-speedgrader', activity); // get outcome based on submission id only
    loadH5pSettings(activityId);
  }, [activityId, submissionId, msContext]);

  return (
    <div className="outcome-summary-container">
      {outcome === null && (
        <div className="loading">
          <div className="loading_image">
            <img src={logo} alt="Curriki Studio logo" />
          </div>
          <div className="loading-message">Please wait while retrieving your data ...</div>
        </div>
      )}

      {outcome && (
        <div>
          <div className="row">
            <div className="col">
              {settings && (
                <div className="title-container">
                  <div className="title-label">
                    ACTIVITY SUMMARY
                  </div>
                  <div className="title-spacer">
                    <div />
                  </div>
                  <div className="title-content">
                    {settings.activity.title}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="row m-4">
            <div className="col">
              <SummaryOutcome outcome={outcome} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Activity.propTypes = {
  match: PropTypes.object.isRequired,
  // student: PropTypes.object.isRequired,
  outcome: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  getOutcomeSummary: PropTypes.func.isRequired,
  loadH5pSettings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.gapi.summaryAuth.student,
  outcome: state.gapi.outcomeSummary,
  settings: state.gapi.h5pSettings,
});

const mapDispatchToProps = (dispatch) => ({
  getOutcomeSummary: (studentId, activityId) => dispatch(getOutcomeSummaryAction(studentId, activityId)),
  loadH5pSettings: (activityId) => dispatch(loadH5pResourceSettings(activityId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activity));
