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
  /* eslint-disable no-unused-vars */
  // We do use it with the reducer
  const [intervalPointer, dispatch] = useReducer(reducer, 0);
  /* eslint-enable no-unused-vars */
  const [h5pObject, setH5pObject] = useState(null);
  const loadAssets = (styles, scripts) => {
    styles.forEach((style) => {
      const link = document.createElement('link');
      link.href = style;
      link.type = 'text/css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });
    scripts.forEach((script) => {
      const element = document.createElement('script');
      element.src = script;
      element.async = false;
      document.body.appendChild(element);
    });
  };

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    getSubmission(match.params.classworkId, match.params.courseId, student.auth);
  }, [activityId]);

  useEffect(() => {
    if (submission === null) return;

    // If the activity has already been submitted to google classroom, redirect to summary page
    if (submission && submission.state === 'TURNED_IN') {
      history.push(`/gclass/summary/${match.params.userId}/${match.params.courseId}/${match.params.activityId}/${submission.coursework_id}/${submission.id}`);
      return;
    }

    loadH5pSettings(activityId, student.auth.googleId, submission.id);
  }, [submission]);

  // Load H5P core
  useEffect(() => {
    if (h5pSettings === null) return;

    window.H5PIntegration = h5pSettings.h5p.settings;
    const h5pWrapper = document.getElementById('curriki-h5p-wrapper');
    h5pWrapper.innerHTML = h5pSettings.h5p.embed_code.trim();

    // Load H5P core
    loadAssets(h5pSettings.h5p.settings.core.styles, h5pSettings.h5p.settings.core.scripts);

    // Loops until H5P object and dispatcher are ready
    const intervalId = setInterval(() => {
      if (typeof H5P === 'undefined' || !H5P.externalDispatcher) return;

      console.log('H5P dispatcher found');
      setH5pObject(H5P);
      dispatch({ type: 'clear' });
    }, 500);
    dispatch({ type: 'set', intervalId });
  }, [h5pSettings]);

  // Patch into xAPI events and finish loading activity
  useEffect(() => {
    if (!h5pObject) {
      console.log('H5P object not ready');
      return;
    }

    // Hook into H5P dispatcher only if xAPI is needed for this route
    if (xAPIHelper.isxAPINeeded(match.path) === true) {
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
    }

    // Load the rest of the activity assets
    loadAssets(h5pSettings.h5p.settings.loadedCss, h5pSettings.h5p.settings.loadedJs);
  }, [h5pObject]);

  return (
    <div id="curriki-h5p-wrapper">
      <div className="loader_gif">
        <img style={{ width: '50px' }} src={gifloader} alt="" />
      </div>
    </div>
  );
};

Activity.defaultProps = {
  submission: null,
  h5pSettings: null,
};

Activity.propTypes = {
  activityId: PropTypes.string.isRequired,
  activeCourse: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  submission: PropTypes.object,
  h5pSettings: PropTypes.object,
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
