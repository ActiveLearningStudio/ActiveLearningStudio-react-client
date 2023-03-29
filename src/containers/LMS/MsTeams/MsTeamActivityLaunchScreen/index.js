/* eslint-disable */
import React, { useEffect, useReducer } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import gifloader from 'assets/images/dotsloader.gif';
import * as xAPIHelper from 'helpers/xapi';
import { loadH5pResourceXapi } from 'store/actions/resource';
import { loadH5pResourceSettings } from 'store/actions/gapi';
import { turnInAction } from 'store/actions/msTeams';
import './styles.scss';

const reducer = (activityState, action) => {
  switch (action.type) {
    case 'SET_INTERVAL':
      return {
        ...activityState,
        intervalId: action.intervalId,
      };

      case 'ASSETS_LOADED':
        return {
          ...activityState,
          assetsLoaded: [...activityState.assetsLoaded, action.asset],
        };

      case 'CHECK_ASSETS':
        console.log('checking assets');
        if (typeof window.H5P === 'undefined' || !window.H5P.externalDispatcher) {
          console.log('H5P is not ready yet...');
          return activityState;
        }

        if (activityState.assets.length !== activityState.assetsLoaded.length) {
          console.log(`Assets not ready. ${activityState.assetsLoaded.length} of ${activityState.assets.length} loaded`);
          return activityState;
        }

        clearInterval(activityState.intervalId);
        return {
          ...activityState,
          h5pObject: window.H5P,
          intervalId: null,
        };

      case 'SET_ASSETS':
        return {
          ...activityState,
          assets: action.assets,
        };

      default:
        return activityState;
  }
};

const MsTeamActivityLaunchScreen = (props) => {
  const {
    activityId,
    paramObj,
    activeCourse,
    match,
    history,
    h5pSettings,
    loadH5pSettings,
    sendStatement,
    turnIn,
  } = props;
  // We do use it with the reducer
  /* eslint-disable-next-line no-unused-vars */
  const [activityState, dispatch] = useReducer(reducer, {
    intervalId: null,
    assets: [],
    assetsLoaded: [],
    h5pObject: null,
  });

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
      element.onload = () => {
        dispatch({ type: 'ASSETS_LOADED', asset: element.src });
        console.log(`Assets loaded: ${element.src}`);
      };
      element.src = script;
      element.async = false;
      document.body.appendChild(element);
    });
  };

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    loadH5pSettings(activityId, paramObj.userId, paramObj.submissionId);
  }, [activityId]);

  // Load H5P core
  useEffect(() => {
    if (h5pSettings === null) return;

    window.H5P = window.H5P || {};
    window.H5P.preventInit = true;
    window.H5PIntegration = h5pSettings.h5p.settings;
    const h5pWrapper = document.getElementById('curriki-h5p-wrapper');
    h5pWrapper.innerHTML = h5pSettings.h5p.embed_code.trim();

    // Load H5P assets
    const styles = h5pSettings.h5p.settings.core.styles.concat(h5pSettings.h5p.settings.loadedCss);
    const scripts = h5pSettings.h5p.settings.core.scripts.concat(h5pSettings.h5p.settings.loadedJs);
    dispatch({ type: 'SET_ASSETS', assets: scripts });
    loadAssets(styles, scripts);

    // Loops until H5P object and dispatcher are ready
    const intervalId = setInterval(() => {
      dispatch({ type: 'CHECK_ASSETS' });
    }, 500);
    dispatch({ type: 'SET_INTERVAL', intervalId });
  }, [h5pSettings]);

  // Patch into xAPI events and finish loading activity
  useEffect(() => {
    if (!activityState.h5pObject) {
      console.log('H5P object not ready');
      return;
    }

    if (paramObj.userRole !== 'student') {
      activityState.h5pObject.init();
      return;
    }

    // Hook into H5P dispatcher only if xAPI is needed for this route
    if (xAPIHelper.isxAPINeeded(match.path) === true) {
      activityState.h5pObject.externalDispatcher.on('xAPI', function (event) {
        console.log('Running xAPI listener callback');
        if (event.ignoreStatement) {
          return;
        }
        const params = {
          path: match.path,
          activityId,
          activeCourse,
          submissionId: paramObj.submissionId,
          attemptId: Date.now(),
          studentId: paramObj.userId,
          classworkId: paramObj.classId,
          courseId: paramObj.assignmentId,
          auth: paramObj.userId,
          tool_platform: 'MS Teams',
          homepage: 'https://teams.microsoft.com'
        };

        // Extending the xAPI statement with our custom values and sending it off to LRS
        const xapiData = JSON.stringify(
          xAPIHelper.extendStatement(this, event.data.statement, params),
        );
        sendStatement(xapiData);

        if(paramObj.userRole == 'student'){
          const h5pCurrentInstance = this;
          // Ask the user if he wants to turn-in the work to Teams
          if (event.data.statement.verb.display['en-US'] === 'submitted-curriki') {
            Swal.fire({
              title: 'Do you want to turn in your work to Teams?',
              showCancelButton: true,
              confirmButtonText: 'Turn In',
            }).then((result) => {
              if (result.isConfirmed) {
                turnIn(localStorage.getItem('msteams_token'), params.classworkId, params.submissionId, params.courseId);
                Swal.fire('Saved!', '', 'success');
                h5pCurrentInstance.trigger('turnInSaved');
              } else {
                h5pCurrentInstance.trigger('turnInCancelled');
              }
            });
          }
      }
      });
    }

    activityState.h5pObject.init();
  }, [activityState.h5pObject]);

  return (
    <div id="curriki-h5p-wrapper">
      <div className="loader_gif">
        <img style={{ width: '50px' }} src={gifloader} alt="" />
      </div>
    </div>
  );
};

MsTeamActivityLaunchScreen.defaultProps = {
  h5pSettings: null,
};

MsTeamActivityLaunchScreen.propTypes = {
  activityId: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  h5pSettings: PropTypes.object,
  loadH5pSettings: PropTypes.func.isRequired,
  sendStatement: PropTypes.func.isRequired,
  turnIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  student: state.gapi.student,
  submission: state.gapi.submission,
  h5pSettings: state.gapi.h5pSettings,
});

const mapDispatchToProps = (dispatch) => ({
  loadH5pSettings: (activityId, studentId, submissionId) => dispatch(loadH5pResourceSettings(activityId, studentId, submissionId)),
  sendStatement: (statement) => dispatch(loadH5pResourceXapi(statement)),
  turnIn: (token, classworkId, submissionId, courseId) => dispatch(turnInAction(token, classworkId, submissionId, courseId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MsTeamActivityLaunchScreen));
