import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import gifloader from 'assets/images/dotsloader.gif';
import * as xAPIHelper from 'helpers/xapi';
import { loadH5pResourceXapi } from 'store/actions/resource';
import { loadH5pResourceSettings, getSubmissionAction, turnInAction } from 'store/actions/gapi';
import './style.scss';

const Activity = (props) => {
  const {
    activityId,
    match,
    student,
    submission,
    h5pSettings,
    loadH5pSettings,
    loadH5pXapi,
    getSubmission,
    turnIn,
    history,
  } = props;
  const [xAPILoaded, setXAPILoaded] = useState(false);
  const [intervalPointer, setIntervalPointer] = useState(null);

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    loadH5pSettings(activityId);
    getSubmission(match.params.classworkId, match.params.courseId, student.auth);
  }, [activityId, match]);

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

    // Loops until it finds H5P object
    const checkXapi = setInterval(() => {
      const x = document.getElementsByClassName('h5p-iframe')[0].contentWindow;
      if (!x.H5P) return;

      clearInterval(checkXapi);
      setIntervalPointer(null);
      setXAPILoaded(true);
    });
    setIntervalPointer(checkXapi);
  }, [h5pSettings]);

  // Patch into xAPI events
  useEffect(() => {
    if (!xAPILoaded || !submission) return;

    const x = document.getElementsByClassName('h5p-iframe')[0].contentWindow;
    if (!x.H5P.externalDispatcher || xAPIHelper.isxAPINeeded(match.path) === false) return;

    x.H5P.externalDispatcher.on('xAPI', (event) => {
      const params = {
        path: match.path,
        activityId,
        submissionId: submission.id,
        studentId: student.profile.data.id,
      };
      const xapiData = JSON.stringify(
        xAPIHelper.extendStatement(event.data.statement, params),
      );
      loadH5pXapi(xapiData);

      if (event.data.statement.verb.display['en-US'] === 'completed') {
        turnIn(match.params.classworkId, match.params.courseId, student.auth);
      }
    });
  }, [xAPILoaded, match.path, match.params, activityId, student, submission]);

  // If the activity has already been submitted to google classroom, redirect to summary page
  useEffect(() => {
    if (submission && submission.state === 'TURNED_IN') {
      clearInterval(intervalPointer);
      history.push(`/gclass/summary/${match.params.userId}/${match.params.courseId}/${match.params.activityId}/${submission.coursework_id}/${submission.id}`);
    }
  }, [submission, match]);

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
  match: PropTypes.object.isRequired,
  student: PropTypes.object.isRequired,
  submission: PropTypes.object.isRequired,
  h5pSettings: PropTypes.object.isRequired,
  loadH5pSettings: PropTypes.func.isRequired,
  loadH5pXapi: PropTypes.func.isRequired,
  getSubmission: PropTypes.func.isRequired,
  turnIn: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.gapi.student,
  submission: state.gapi.submission,
  h5pSettings: state.gapi.h5pSettings,
});

const mapDispatchToProps = (dispatch) => ({
  loadH5pSettings: (activityId) => dispatch(loadH5pResourceSettings(activityId)),
  loadH5pXapi: (xapiData) => dispatch(loadH5pResourceXapi(xapiData)),
  getSubmission: (classworkId, courseId, auth) => dispatch(getSubmissionAction(classworkId, courseId, auth)),
  turnIn: (classworkId, courseId, auth) => dispatch(turnInAction(classworkId, courseId, auth)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activity));
