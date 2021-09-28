/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState, useReducer } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gifloader from 'assets/images/dotsloader.gif';
import * as xAPIHelper from 'helpers/xapi';
import { loadH5pResourceXapi } from 'store/actions/resource';
import { loadH5pResourceSettings } from 'store/actions/gapi';
import { gradePassBackAction, activityInitAction } from 'store/actions/canvas';
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
    match,
    h5pSettings,
    ltiFinished,
    attemptId,
    loadH5pSettings,
    sendStatement,
    gradePassBack,
    activityInit,
    sendScreenshot,
  } = props;
  const { activityId } = match.params;
  const searchParams = new URLSearchParams(window.location.search);
  const session = searchParams.get('PHPSESSID');
  const studentId = searchParams.get('user_id');
  const submissionId = searchParams.get('submission_id');
  const homepage = searchParams.get('homepage');
  const isLearner = searchParams.get('is_learner') !== '';
  const courseId = searchParams.get('course_id');
  const toolPlatform = searchParams.get('tool_platform');
  const customCourseName = searchParams.get('custom_course_name');
  const customApiDomainUrl = searchParams.get('custom_api_domain_url');
  const customCourseCode = searchParams.get('custom_course_code');
  const [xAPILoaded, setXAPILoaded] = useState(false);
  const [intervalPointer, dispatch] = useReducer(reducer, 0);
  const [xAPIEventHooked, setXAPIEventHooked] = useState(false);

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    loadH5pSettings(match.params.activityId);
    activityInit();
  }, [activityId]);

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
    // Loops until it finds H5P object
    const intervalId = setInterval(() => {
      const x = document.getElementsByClassName('h5p-iframe')[0]?.contentWindow;
      if (!x?.H5P?.externalDispatcher) return;

      console.log('H5P dispatcher found');
      setXAPILoaded(true);
      console.log(`Clearing interval ${intervalPointer}`);
      dispatch({ type: 'clear' });
    }, 500);
    dispatch({ type: 'set', intervalId });
  }, []);

  // Patch into xAPI events
  useEffect(() => {
    console.log('Patching into xAPI event dispatcher');
    if (!xAPILoaded || !isLearner || xAPIEventHooked) {
      console.log('Abort patching into xAPI event dispatcher');
      return;
    }

    const x = document.getElementsByClassName('h5p-iframe')[0]?.contentWindow;
    // if (!x.H5P.externalDispatcher || xAPIHelper.isxAPINeeded(match.path) === false) return;
    if (!x.H5P.externalDispatcher || xAPIHelper.isxAPINeeded(match.path) === false) {
      console.log('Missing H5P event dispatcher');
      return;
    }

    x.H5P.externalDispatcher.on('xAPI', function (event) {
      console.log('Running xAPI listener callback');
      const params = {
        path: match.path,
        studentId,
        activityId,
        submissionId,
        attemptId,
        homepage,
        courseId,
        toolPlatform,
        customCourseName,
        customApiDomainUrl,
        customCourseCode,
      };

      // Extending the xAPI statement with our custom values and sending it off to LRS
      const xapiData = xAPIHelper.extendStatement(this, event.data.statement, params);

      if (event.data.statement.verb.display['en-US'] === 'submitted-curriki') {
        // Check if all questions/interactions have been accounted for in LRS
        // If the user skips one of the questions, no xAPI statement is generated.
        // We need statements for all questions for proper summary accounting.
        // Fire off an artificial "answered" statement if necessary
        if (this.parent === undefined && this.interactions) {
          this.interactions.forEach((interaction) => {
            if (interaction.getLastXAPIVerb()) return; // Already initialized

            const xAPIData = interaction.getXAPIData();
            if (!xAPIData) return; // Some interactions have no data to report

            const iXAPIStatement = JSON.stringify(
              xAPIHelper.extendStatement(this, xAPIData.statement, params, true),
            );
            sendStatement(iXAPIStatement);
          }, this);
        }

        sendStatement(JSON.stringify(xapiData));
        Swal.fire({
          title: 'Turn in results?',
          confirmButtonText: 'OK',
        }).then(() => {
          const score = xapiData.result.score.scaled;
          gradePassBack(session, 1, score, isLearner);
          Swal.fire('Saved!', '', 'success');
        });
      } else {
        const jsonStatement = JSON.stringify(xapiData);
        sendStatement(jsonStatement);
        if (h5pSettings?.organization?.api_key) {
          sendScreenshot(h5pSettings.organization, jsonStatement, h5pSettings.activity.title, params.studentId);
        }
      }
    });
    console.log('Patched into xAPI event dispatcher');
    setXAPIEventHooked(true);
  }, [xAPILoaded]);

  return (
    <div>
      {ltiFinished && (
        <div className="p-5 text-center finished-div">
          <h1>You have completed this activity!</h1>
          <FontAwesomeIcon icon="thumbs-o-up" className="action-icon ml-1" />
        </div>
      )}

      {!ltiFinished && (
        <div id="curriki-h5p-wrapper" className="added-middle-height-width">
          <div className="loader_gif">
            <img style={{ width: '50px' }} src={gifloader} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

Activity.defaultProps = {
  h5pSettings: null,
  attemptId: null,
};

Activity.propTypes = {
  match: PropTypes.object.isRequired,
  h5pSettings: PropTypes.object,
  ltiFinished: PropTypes.bool.isRequired,
  attemptId: PropTypes.number,
  loadH5pSettings: PropTypes.func.isRequired,
  sendStatement: PropTypes.func.isRequired,
  gradePassBack: PropTypes.func.isRequired,
  activityInit: PropTypes.func.isRequired,
  sendScreenshot: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  h5pSettings: state.gapi.h5pSettings,
  ltiFinished: state.canvas.ltiFinished,
  attemptId: state.canvas.attemptId,
});

const mapDispatchToProps = (dispatch) => ({
  loadH5pSettings: (activityId) => dispatch(loadH5pResourceSettings(activityId)),
  sendStatement: (statement) => dispatch(loadH5pResourceXapi(statement)),
  gradePassBack: (session, gpb, score, isLearner) => dispatch(gradePassBackAction(session, gpb, score, isLearner)),
  activityInit: () => dispatch(activityInitAction()),
  sendScreenshot: (org, statement, title, studentName) => dispatch(saveResultScreenshotAction(org, statement, title, studentName)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activity));
