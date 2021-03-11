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
    teacher,
    outcome,
    summaryError,
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
              {teacher && (
                <>
                  <h2>
                    {`Oops! It looks like the submission for ${student.name} is not available at ${window.location.hostname}.`}
                  </h2>
                  <p>
                    {`You can return the assignment without a grade in the google classroom interface, so that ${student.name} can resume the assignment.`}
                  </p>
                  <p>
                    {`Consider sending a message to ${student.name} about resubmitting the assignment.`}
                  </p>
                  <p>
                    For further assistance use our support channels.
                  </p>
                </>
              )}
              {!teacher && (
                <>
                  <h2>
                    {`Oops! It looks like your submission isn't available at ${window.location.hostname}.`}
                  </h2>
                  <p>
                    To resubmit your assigment follow these steps:
                    <ul>
                      <li>Unsubmit the assignment in Google Classroom.</li>
                      <li>Resume your assignment as usual.</li>
                      <li>If the problem persists, please contact your teacher or one of our support channels.</li>
                    </ul>
                  </p>
                  <p>
                    {`Consider sending a message to ${student.name} about resubmitting the assignment.`}
                  </p>
                  <p>
                    For further assistance use our support channels.
                  </p>
                </>
              )}
            </Alert>
            {summaryError && (
              <Alert variant="danger">
                {summaryError}
              </Alert>
            )}
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
                {`${outcome.totalAnswered} Responses`}
              </h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {outcome.nonScoring && outcome.nonScoring.length > 0 && (
                <Tabs defaultActiveKey="answers" id="summary-tabs">
                  <Tab eventKey="summary" title="Summary">
                    <table className="table table-dark">
                      <thead>
                        <tr>
                          <th>Responses</th>
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
                  <Tab eventKey="answers" title="Responses">
                    <table className="table table-dark answers-table">
                      <thead>
                        <tr>
                          <th>Question</th>
                          <th>Response</th>
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
                      <th>Responses</th>
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
  teacher: PropTypes.object.isRequired,
  outcome: PropTypes.object.isRequired,
  summaryError: PropTypes.string.isRequired,
  settings: PropTypes.object.isRequired,
  getOutcomeSummary: PropTypes.func.isRequired,
  loadH5pSettings: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.gapi.summaryAuth.student,
  teacher: state.gapi.summaryAuth.teacher,
  outcome: state.gapi.outcomeSummary,
  summaryError: state.gapi.summaryError,
  settings: state.gapi.h5pSettings,
});

const mapDispatchToProps = (dispatch) => ({
  getOutcomeSummary: (studentId, activityId) => dispatch(getOutcomeSummaryAction(studentId, activityId)),
  loadH5pSettings: (activityId) => dispatch(loadH5pResourceSettings(activityId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activity));
