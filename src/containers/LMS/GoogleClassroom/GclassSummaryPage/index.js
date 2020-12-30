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
  const { match, student, getSummaryAuth } = props;

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
              {student && <ActivitySummary /> }

              {!student && (
                <div className="auth-container">
                  <div className="row">
                    <div className="col text-center">
                      <img className="curriki-logo" src={logo} alt="" />
                    </div>
                  </div>

                  {student === false && (
                    <div className="row m-4">
                      <div className="col text-center">
                        <Alert variant="warning">
                          The summary page is unavailable or the assignment is not turned in.
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
  getSummaryAuth: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.gapi.summaryAuth,
});

const mapDispatchToProps = (dispatch) => ({
  getSummaryAuth: (auth, courseId, classworkId, submissionId) => dispatch(getSummaryAuthAction(auth, courseId, classworkId, submissionId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GclassSummaryPage);
