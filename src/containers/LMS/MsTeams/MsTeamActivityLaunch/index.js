/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { GoogleLogin } from 'react-google-login';
import { Alert } from 'react-bootstrap';

import logo from 'assets/images/logo.svg';
import { setStudentAuthAction, refreshStudentAuthTokenAction, getStudentCoursesAction } from 'store/actions/gapi';
import MsTeamActivityLaunchScreen from 'containers/LMS/MsTeams/MsTeamActivityLaunchScreen';

import './styles.scss';

function MsTeamActivityLaunch({match}) {
  const { activityId, classId } = match.params;
  // const [authorized, setAuthorized] = useState(null);
  // const [isTeacher, setIsTeacher] = useState(null);
  // const [activeCourse, setActiveCourse] = useState(null);
  // Gets student courses
  // useEffect(() => {
  //   if (student === null) return;

  //   getStudentCourses(student.auth.accessToken);
  // }, [student]);

  // Checks user membership in the course
  // useEffect(() => {
  //   if (courses === null) return;

  //   let found = false;
  //   let teacher = false;
  //   // eslint-disable-next-line no-restricted-syntax
  //   for (const i in courses) {
  //     if (courses[i].id === courseId) {
  //       found = true;
  //       setActiveCourse(courses[i]);

  //       if (courses[i].ownerId === student.auth.googleId) {
  //         teacher = true;
  //       }
  //     }
  //   }
  //   setAuthorized(found && !teacher && !submissionError);
  //   setIsTeacher(teacher);
  // }, [courses, courseId, submissionError]);

  // const handleLogin = (data) => {
  //   if (!data) return;

  //   setStudentAuth(data);
  //   // Refresh token in less than half an hour
  //   setInterval(() => {
  //     data.reloadAuthResponse().then((newData) => {
  //       refreshStudentAuthToken(newData);
  //     });
  //   }, 1000 * 60 * 15);
  // };

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
                  <MsTeamActivityLaunchScreen activityId={activityId} classId={classId} />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* {(orientation >= 90)
      && (
      <div className="coverallareas">
        <Alert variant="warning">Please use Portrait mode!</Alert>
      </div>
      )} */}
    </>
  );
}

MsTeamActivityLaunch.defaultProps = {
};

MsTeamActivityLaunch.propTypes = {
  match: PropTypes.object.isRequired,
  // orientation: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MsTeamActivityLaunch);
