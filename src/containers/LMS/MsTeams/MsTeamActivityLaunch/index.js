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
  const [isTeacher, setIsTeacher] = useState('teacher');
  const [msContext, setMsContext] = useState(null);
  
   // Get app context of login user
   useEffect(() => {

    setIsTeacher(queryParams.get("userRole"));

    app.initialize().then(async () => {
      await app.getContext().then((response) => {
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
    submissionId: queryParams.has('submissionId') ? queryParams.get("submissionId") : 'preview',
  };
 
  return (
    <>
      <div className="gclass-activity-container">
        <section className="main-page-content preview iframe-height-resource-shared defaultcontainer msteams-padding">
          <Helmet>
            <script src="https://dev.currikistudio.org/api/storage/h5p/h5p-core/js/h5p-resizer.js" charset="UTF-8" />
          </Helmet>
          <div className="flex-container previews">
            <div className="activity-bg left-vdo msteams-width">
              <div className="main-item-wrapper desktop-view">
                <div className="item-container">
                  {msContext && <MsTeamActivityLaunchScreen activityId={activityId} context={msContext} paramObj={params} />}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

MsTeamActivityLaunch.defaultProps = {
};

MsTeamActivityLaunch.propTypes = {
  match: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MsTeamActivityLaunch);
