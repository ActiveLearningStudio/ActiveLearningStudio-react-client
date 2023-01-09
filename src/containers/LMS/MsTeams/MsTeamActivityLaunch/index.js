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
import { useLocation } from "react-router-dom";
import { app } from '@microsoft/teams-js';

import './styles.scss';

function MsTeamActivityLaunch({match}) {
  const { activityId, assignmentId } = match.params;
  console.log('my params: ', match.params);
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  console.log('classIdAssignment:', queryParams.get("classId"));
  const [isTeacher, setIsTeacher] = useState(false);
  const [msContext, setMsContext] = useState(null);
  
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
  
  const params = {
    assignmentId: queryParams.get("assignmentId"),
    classId: queryParams.get("classId"),
    view: queryParams.get("view"),
    userRole: queryParams.get("userRole"),
    submissionId: queryParams.get("submissionId"),
  };
 
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
                  <MsTeamActivityLaunchScreen activityId={activityId} context={msContext} paramObj={params} />

                  {/* {isTeacher === true && (
                        <div className="row m-4">
                          <div className="col text-center">
                            <Alert variant="warning">You are the teacher for this activity. Please login as a student to take the activity.</Alert>
                          </div>
                        </div>
                      )} */}
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
