import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getLtiSummaryAction, getLtiSummaryActivityInfoAction } from 'store/actions/canvas';
import SummaryOutcome from 'containers/LMS/GoogleClassroom/ActivitySummary/SummaryOutcome';
import logo from 'assets/images/studio_new_logo_small.png';
import { Alert } from 'react-bootstrap';
import './style.scss';

const CanvasSummaryPage = (props) => {
  const {
    match,
    summary,
    activityInfo,
    summaryError,
    getLtiSummary,
    getLtiActivityInfo,
  } = props;
  const encodedParams = new URLSearchParams(window.location.search).get('submission');
  const params = new URLSearchParams(atob(encodedParams));
  const activityId = params.get('activity_id');
  const resultId = params.get('result_id');
  const userId = params.get('user_id');
  const referrer = params.get('referrer');

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    const actor = JSON.stringify({
      account: {
        homePage: referrer,
        name: userId,
      },
    });
    const activity = `${window.location.origin}/activity/${activityId}/submission/${resultId}`;
    getLtiActivityInfo(activityId);
    getLtiSummary(actor, activity);
  }, [match]);

  useEffect(() => {
    console.log(summary);
    console.log(summaryError);
  }, [summaryError, summary, activityInfo]);

  return (
    <div className="outcome-summary-container">
      {summary === null && summaryError === null && (
        <div className="loading">
          <div className="loading_image">
            <img src={logo} alt="Curriki Studio logo" />
          </div>
          <div className="loading-message">Please wait while retrieving your data ...</div>
        </div>
      )}
      {summaryError && (
        <div className="row m-4">
          <div className="col text-center">
            <Alert variant="warning">
              <p>An error has occurred:</p>
              <p>
                {summaryError}
              </p>
            </Alert>
          </div>
        </div>
      )}
      {summary && activityInfo && (
        <>
          <div className="row">
            <div className="col">
              <div className="title-container">
                <div className="title-label">
                  ACTIVITY SUMMARY
                </div>
                <div className="title-spacer">
                  <div />
                </div>
                <div className="title-content">
                  {activityInfo.title}
                </div>
              </div>
            </div>
          </div>
          <div className="row m-4">
            <div className="col">
              <SummaryOutcome outcome={summary} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

CanvasSummaryPage.propTypes = {
  match: PropTypes.object.isRequired,
  summary: PropTypes.array.isRequired,
  activityInfo: PropTypes.object.isRequired,
  summaryError: PropTypes.object.isRequired,
  getLtiSummary: PropTypes.func.isRequired,
  getLtiActivityInfo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  summary: state.canvas.summary,
  activityInfo: state.canvas.summaryActivityInfo,
  summaryError: state.canvas.summaryError,
});

const mapDispatchToProps = (dispatch) => ({
  getLtiSummary: (actor, activityId) => dispatch(getLtiSummaryAction(actor, activityId)),
  getLtiActivityInfo: (actor, activityId) => dispatch(getLtiSummaryActivityInfoAction(actor, activityId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CanvasSummaryPage));
