import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getOutcomeSummaryAction, loadH5pResourceSettings } from 'store/actions/gapi';
import SummaryOutcome from 'containers/LMS/GoogleClassroom/ActivitySummary/SummaryOutcome';
import logo from 'assets/images/studio_new_logo_small.png';
import './style.scss';

const Activity = (props) => {
  const {
    match,
    student,
    outcome,
    settings,
    getOutcomeSummary,
    loadH5pSettings,
  } = props;
  const { activityId, submissionId } = match.params;
  const studentId = student.id;

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    const actor = {
      account: {
        homePage: 'https://classroom.google.com',
        name: studentId,
      },
    };
    const activity = `${window.location.origin}/activity/${activityId}/submission/${submissionId}`;
    getOutcomeSummary(JSON.stringify(actor), activity);
    loadH5pSettings(activityId);
  }, [activityId, submissionId, studentId]);

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
  student: PropTypes.object.isRequired,
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
