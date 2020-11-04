import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { GoogleLogin } from 'react-google-login';
import { Alert } from 'react-bootstrap';

import logo from 'assets/images/logo.svg';
import { getStudentCoursesAction } from 'store/actions/gapi';
import Activity from 'containers/LMS/GoogleClassroom/Activity';

import './styles.scss';

function GclassActivityPage(props) {
  const { match, getStudentCourses, courses } = props;
  const { activityId, courseId } = match.params;
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    if (courses === null) {
      return;
    }

    let found = false;
    // eslint-disable-next-line no-restricted-syntax
    for (const i in courses) {
      if (courses[i].id === courseId) {
        found = true;
      }
    }
    setAuthorized(found);
  }, [courses]);

  const handleLogin = (data) => {
    getStudentCourses(data.accessToken);
  };

  return (
    <div className="gclass-activity-container">
      <section className="main-page-content preview iframe-height-resource-shared">
        <Helmet>
          <script src="https://dev.currikistudio.org/api/storage/h5p/h5p-core/js/h5p-resizer.js" charset="UTF-8" />
        </Helmet>

        <div className="flex-container previews">
          <div className="activity-bg left-vdo">
            <div className="main-item-wrapper desktop-view">
              <div className="item-container">
                {authorized && (<Activity activityId={activityId} />)}

                {!authorized && (
                  <div className="container">
                    <div className="row">
                      <div className="col text-center">
                        <img className="curriki-logo" src={logo} alt="" />
                      </div>
                    </div>

                    {authorized === false && (
                      <div className="row m-4">
                        <div className="col text-center">
                          <Alert variant="warning">
                            You don&apos;t seem to be authorized to take this activity.
                          </Alert>
                        </div>
                      </div>
                    )}

                    <div className="row m-4">
                      <div className="col text-center">
                        <h2>Please log in to take this activity.</h2>
                        <GoogleLogin
                          clientId={global.config.gapiClientId}
                          buttonText="Login"
                          onSuccess={handleLogin}
                          onFailure={handleLogin}
                          cookiePolicy="single_host_origin"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

GclassActivityPage.propTypes = {
  match: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  getStudentCourses: PropTypes.func.isRequired,
};

GclassActivityPage.defaultProps = {
};

const mapStateToProps = (state) => ({
  courses: state.gapi.courses,
});

const mapDispatchToProps = (dispatch) => ({
  getStudentCourses: (token) => dispatch(getStudentCoursesAction(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GclassActivityPage);
