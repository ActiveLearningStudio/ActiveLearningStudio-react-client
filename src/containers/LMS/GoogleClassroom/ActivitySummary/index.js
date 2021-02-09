import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Alert,
  Badge,
  Tabs,
  Tab,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getOutcomeSummaryAction, loadH5pResourceSettings } from 'store/actions/gapi';
import gifloader from 'assets/images/dotsloader.gif';
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
    <div className="outcome-summary-container p-4">
      {outcome === null && (
        <div className="loader_gif">
          <img style={{ width: '50px' }} src={gifloader} alt="" />
        </div>
      )}

      {outcome === false && (
        <div className="row m-4">
          <div className="col text-center">
            <Alert variant="warning">
              Outcome summary not available.
            </Alert>
          </div>
        </div>
      )}

      {outcome && (
        <div>
          <div className="row">
            <div className="col">
              {settings && (
                <h2>{settings.activity.title}</h2>
              )}
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <h2>
                <FontAwesomeIcon icon="star" />
                {`${outcome.totalAnswered} Question(s) Answered`}
              </h2>
              {outcome.totalSkipped > 0 && (
                <p className="ml-4">
                  {`You skipped ${outcome.totalSkipped} activities.`}
                </p>
              )}
              {outcome.totalAttempted > 0 && (
                <p className="ml-4">
                  {`You attempted ${outcome.totalAttempted} activities.`}
                </p>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col">
              {outcome.nonScoring && outcome.nonScoring.length > 0 && (
                <Tabs defaultActiveKey="summary" id="summary-tabs">
                  <Tab eventKey="summary" title="Summary">
                    <table className="table table-dark">
                      <thead>
                        <tr>
                          <th>Answered Questions</th>
                          <th>Score</th>
                        </tr>
                      </thead>
                      <tbody>
                        {outcome.summary.map((question) => (
                          <tr>
                            <td>
                              {question.verb === 'skipped' && (
                                <>
                                  <Badge className="skipped-badge" variant="warning">Skipped</Badge>
                                  {` - ${question.name}`}
                                </>
                              )}
                              {question.verb === 'attempted' && (
                                <>
                                  <Badge className="skipped-badge" variant="warning">Attempted</Badge>
                                  {` - ${question.name}`}
                                </>
                              )}
                              {question.verb !== 'attempted' && question.verb !== 'skipped' && (
                                `${question.duration} - ${question.name}`
                              )}
                            </td>
                            <td>{`${question.score.raw}/${question.score.max}`}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Tab>
                  <Tab eventKey="answers" title="Answers">
                    <table className="table table-dark answers-table">
                      <thead>
                        <tr>
                          <th>Question</th>
                          <th>Answer</th>
                        </tr>
                      </thead>
                      <tbody>
                        {outcome.nonScoring.map((question) => (
                          <tr>
                            <td>
                              <p dangerouslySetInnerHTML={{ __html: ` - ${question.description}` }} />
                            </td>
                            <td>
                              {Array.isArray(question.response) && question.response.map((response) => (
                                <p dangerouslySetInnerHTML={{ __html: ` - ${response}` }} />
                              ))}
                              {typeof question.response === 'string' && (
                                <p dangerouslySetInnerHTML={{ __html: ` - ${question.response}` }} />
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Tab>
                </Tabs>
              )}
              {(outcome.nonScoring === undefined || outcome.nonScoring.length === 0) && (
                <table className="table table-dark">
                  <thead>
                    <tr>
                      <th>Answered Questions</th>
                      <th>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {outcome.summary.map((question) => (
                      <tr>
                        <td>
                          {question.verb === 'skipped' && (
                            <>
                              <Badge className="skipped-badge" variant="warning">Skipped</Badge>
                              <span dangerouslySetInnerHTML={{ __html: ` - ${question.name}` }} />
                            </>
                          )}
                          {question.verb === 'attempted' && (
                            <>
                              <Badge className="skipped-badge" variant="warning">Attempted</Badge>
                              <span dangerouslySetInnerHTML={{ __html: ` - ${question.name}` }} />
                            </>
                          )}
                          {question.verb !== 'attempted' && question.verb !== 'skipped' && (
                            <span dangerouslySetInnerHTML={{ __html: `${question.duration} - ${question.name}` }} />
                          )}
                        </td>
                        <td>{`${question.score.raw}/${question.score.max}`}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
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
