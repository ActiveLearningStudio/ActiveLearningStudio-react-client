/* global H5P */
/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import gifloader from 'assets/images/dotsloader.gif';
import * as xAPIHelper from 'helpers/xapi';
import { loadH5pResourceXapi } from 'store/actions/resource';
import { loadH5pResourceSettings, getSubmissionAction, turnInAction } from 'store/actions/gapi';
import { saveResultScreenshotAction } from 'store/actions/safelearn';
import './style.scss';

const reducer = (intervalPointer, action) => {
  if (action.type === 'set') return action.intervalId;

  if (action.type === 'clear') {
    clearInterval(intervalPointer);
    return null;
  }
};

const Activity = (props) => {
  const {
    activityId,
    activeCourse,
    match,
    history,
    student,
    submission,
    h5pSettings,
    loadH5pSettings,
    getSubmission,
    sendStatement,
    turnIn,
    sendScreenshot,
  } = props;
  const [intervalPointer, dispatch] = useReducer(reducer, 0);
  const [xAPIEventHooked, setXAPIEventHooked] = useState(false);
  const [h5pObject, setH5pObject] = useState(null);

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    getSubmission(match.params.classworkId, match.params.courseId, student.auth);
  }, [activityId]);

  useEffect(() => {
    if (submission === null) return;

    loadH5pSettings(activityId, student.auth.googleId, submission.id);
  }, [submission]);

  // Load H5P
  useEffect(() => {
    if (h5pSettings === null) return;

    window.H5PIntegration = h5pSettings.h5p.settings;
    const h5pWrapper = document.getElementById('curriki-h5p-wrapper');
    h5pWrapper.innerHTML = h5pSettings.h5p.embed_code.trim();
    const newCss = h5pSettings.h5p.settings.core.styles.concat(
      h5pSettings.h5p.settings.loadedCss,
    );

    Promise.all(
      newCss.map((value) => {
        const link = document.createElement('link');
        link.href = value;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return true;
      }),
    );

    const newScripts = h5pSettings.h5p.settings.core.scripts.concat(
      h5pSettings.h5p.settings.loadedJs,
    );

    newScripts.forEach((value) => {
      const script = document.createElement('script');
      script.src = value;
      script.async = false;
      document.body.appendChild(script);
    });
  }, [h5pSettings]);

  useEffect(() => {
    if (h5pSettings === null) return;

    // Loops until it finds H5P object
    const intervalId = setInterval(() => {
      if (typeof H5P !== 'undefined' && H5P.externalDispatcher) {
        console.log('H5P dispatcher found on non-iframe h5p');
        setH5pObject(H5P);
        dispatch({ type: 'clear' });
      } else if (document.getElementsByClassName('h5p-iframe')[0]?.contentWindow?.H5P?.externalDispatcher) {
        console.log('H5P dispatcher found on iframe h5p');
        setH5pObject(document.getElementsByClassName('h5p-iframe')[0].contentWindow.H5P);
        dispatch({ type: 'clear' });
      }
    }, 500);
    dispatch({ type: 'set', intervalId });
  }, [h5pSettings]);

  // Patch into xAPI events
  useEffect(() => {
    console.log('Entered hook');
    if (!h5pObject || !submission || xAPIEventHooked) {
      console.log('Abort patching into xAPI event dispatcher');
      return;
    }

    if (xAPIHelper.isxAPINeeded(match.path) === false) {
      console.log('xAPI not needed for path');
      return;
    }

    h5pObject.externalDispatcher.on('xAPI', function (event) {
      console.log('Running xAPI listener callback');
      const params = {
        path: match.path,
        activityId,
        activeCourse,
        submissionId: submission.id,
        attemptId: submission.attemptId,
        studentId: student.profile.data.id,
        classworkId: match.params.classworkId,
        courseId: match.params.courseId,
        auth: student.auth,
      };

      // Extending the xAPI statement with our custom values and sending it off to LRS
      const xapiData = JSON.stringify(
        xAPIHelper.extendStatement(this, event.data.statement, params),
      );
      sendStatement(xapiData);

      if (h5pSettings?.organization?.api_key) {
        sendScreenshot(h5pSettings.organization, xapiData, h5pSettings.activity.title, student.profile.data.name.fullName);
      }

      // Ask the user if he wants to turn-in the work to google classroom
      if (event.data.statement.verb.display['en-US'] === 'submitted-curriki') {
        Swal.fire({
          title: 'Do you want to turn in your work to Google Classroom?',
          showCancelButton: true,
          confirmButtonText: 'Turn In',
        }).then((result) => {
          if (result.isConfirmed) {
            turnIn(params.classworkId, params.courseId, params.auth);
            Swal.fire('Saved!', '', 'success');
          }
        });
      }
    });
    setXAPIEventHooked(true);
  }, [h5pObject]);

  // If the activity has already been submitted to google classroom, redirect to summary page
  useEffect(() => {
    if (submission && submission.state === 'TURNED_IN') {
      clearInterval(intervalPointer);
      history.push(`/gclass/summary/${match.params.userId}/${match.params.courseId}/${match.params.activityId}/${submission.coursework_id}/${submission.id}`);
    }
  }, [submission]);

  return (
    <div id="curriki-h5p-wrapper">
      <div className="loader_gif">
        <img style={{ width: '50px' }} src={gifloader} alt="" />
      </div>
    </div>
  );
};

Activity.propTypes = {
  activityId: PropTypes.string.isRequired,
  activeCourse: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  submission: PropTypes.object.isRequired,
  h5pSettings: PropTypes.object.isRequired,
  loadH5pSettings: PropTypes.func.isRequired,
  getSubmission: PropTypes.func.isRequired,
  sendStatement: PropTypes.func.isRequired,
  turnIn: PropTypes.func.isRequired,
  sendScreenshot: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.gapi.student,
  submission: state.gapi.submission,
  h5pSettings: state.gapi.h5pSettings,
});

const mapDispatchToProps = (dispatch) => ({
  loadH5pSettings: (activityId, studentId, submissionId) => dispatch(loadH5pResourceSettings(activityId, studentId, submissionId)),
  getSubmission: (classworkId, courseId, auth) => dispatch(getSubmissionAction(classworkId, courseId, auth)),
  sendStatement: (statement) => dispatch(loadH5pResourceXapi(statement)),
  turnIn: (classworkId, courseId, auth) => dispatch(turnInAction(classworkId, courseId, auth)),
  sendScreenshot: (org, statement, title, studentName) => dispatch(saveResultScreenshotAction(org, statement, title, studentName)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activity));
