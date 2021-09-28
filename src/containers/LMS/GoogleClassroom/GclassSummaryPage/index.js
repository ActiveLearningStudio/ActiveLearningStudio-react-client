import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { GoogleLogin } from 'react-google-login';
import { Alert } from 'react-bootstrap';
import logo from 'assets/images/logo.svg';
import {
  getSummaryAuthAction,
} from 'store/actions/gapi';
import ActivitySummary from 'containers/LMS/GoogleClassroom/ActivitySummary';
import './styles.scss';

function GclassSummaryPage(props) {
  const {
    match,
    student,
    teacher,
    errors,
    summaryError,
    getSummaryAuth,
  } = props;
  const studentName = (student) ? student.name : 'your student';

  const handleLogin = (data) => {
    getSummaryAuth(data, match.params.courseId, match.params.gClassworkId, match.params.submissionId);
  };

  return (
    <div className="gclass-activity-container">
      <section className="main-page-content preview iframe-height-resource-shared">
        <Helmet>
          <script
            src="https://dev.currikistudio.org/api/storage/h5p/h5p-core/js/h5p-resizer.js"
            charset="UTF-8"
          />
        </Helmet>

        <div className="container">
          <div className="row">
            <div className="col">
              {student && !errors && <ActivitySummary /> }

              {(!student || errors || summaryError) && (
                <div className="auth-container">
                  <div className="row">
                    <div className="col text-center">
                      <img className="curriki-logo" src={logo} alt="" />
                    </div>
                  </div>

                  {errors && errors[0].code !== 3 && (
                    <div className="row m-4">
                      <div className="col text-center">
                        <Alert variant="warning">
                          <p>
                            {errors[0].msg}
                          </p>
                        </Alert>
                      </div>
                    </div>
                  )}

                  {summaryError && (
                    <div className="row m-4">
                      <div className="col text-center">
                        <Alert variant="warning">
                          <p>
                            {summaryError}
                          </p>
                        </Alert>
                      </div>
                    </div>
                  )}

                  {errors && errors[0].code === 3 && teacher === false && (
                    <div className="row m-4">
                      <div className="col text-center">
                        <Alert variant="warning">
                          <h4>
                            {`Oops! It looks like your submission isn't available at ${window.location.hostname}.`}
                          </h4>
                          <p>
                            To resubmit your assigment follow these steps:
                            <ul>
                              <li>Unsubmit the assignment in Google Classroom.</li>
                              <li>Resume your assignment as usual.</li>
                              <li>If the problem persists, please contact your teacher or one of our support channels.</li>
                            </ul>
                          </p>
                        </Alert>
                      </div>
                    </div>
                  )}

                  {errors && errors[0].code === 3 && teacher && (
                    <div className="row m-4">
                      <div className="col text-center">
                        <Alert variant="warning">
                          <h4>
                            {`Oops! It looks like the submission for ${studentName} is not available at ${window.location.hostname}.`}
                          </h4>
                          <p>
                            {`You can return the assignment without a grade in the google classroom interface, so that ${studentName} can resume the assignment.`}
                          </p>
                          <p>
                            {`Consider sending a message to ${studentName} about resubmitting the assignment.`}
                          </p>
                          <p>
                            For further assistance use our support channels.
                          </p>
                        </Alert>
                      </div>
                    </div>
                  )}

                  <div className="row m-4">
                    <div className="col text-center">
                      <h2>Please log in to view this summary.</h2>
                      <GoogleLogin
                        clientId={global.config.gapiClientId}
                        buttonText="Login"
                        onSuccess={handleLogin}
                        onFailure={handleLogin}
                        scope="
                          https://www.googleapis.com/auth/classroom.courses.readonly
                          https://www.googleapis.com/auth/classroom.courses
                          https://www.googleapis.com/auth/classroom.topics
                          https://www.googleapis.com/auth/classroom.coursework.me
                          https://www.googleapis.com/auth/classroom.coursework.students
                          https://www.googleapis.com/auth/classroom.rosters.readonly
                        "
                        cookiePolicy="single_host_origin"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

GclassSummaryPage.propTypes = {
  match: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  teacher: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  summaryError: PropTypes.object.isRequired,
  getSummaryAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.gapi.summaryAuth.student,
  teacher: state.gapi.summaryAuth.teacher,
  errors: state.gapi.summaryAuth.errors,
  summaryError: state.gapi.summaryError,
});

const mapDispatchToProps = (dispatch) => ({
  getSummaryAuth: (auth, courseId, classworkId, submissionId) => dispatch(getSummaryAuthAction(auth, courseId, classworkId, submissionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GclassSummaryPage);
