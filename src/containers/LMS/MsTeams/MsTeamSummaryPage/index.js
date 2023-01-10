/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { GoogleLogin } from 'react-google-login';
import { Alert } from 'react-bootstrap';
import logo from 'assets/images/logo.svg';
import { getSummaryAuthAction } from 'store/actions/gapi';
import ActivitySummary from 'containers/LMS/MsTeams/ActivitySummary';
import './styles.scss';

function MsTeamSummaryPage(props) {
  console.log('parameters: ', props.match);
  const { match, student, teacher, errors, summaryError, getSummaryAuth } = props;
  const studentName = student ? student.name : 'your student';

  const handleLogin = (data) => {
    getSummaryAuth(data, match.params.courseId, match.params.gClassworkId, match.params.submissionId);
  };

  return (
    <div className="gclass-activity-container">
      <section className="main-page-content preview iframe-height-resource-shared">
        <Helmet>
          <script src="https://dev.currikistudio.org/api/storage/h5p/h5p-core/js/h5p-resizer.js" charset="UTF-8" />
        </Helmet>

        <div className="container">
          <div className="row">
            <div className="col">
              <ActivitySummary />
              
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

MsTeamSummaryPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(MsTeamSummaryPage);
