/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import gifloader from 'assets/images/dotsloader.gif';
import { loadH5PSettingsAction } from 'store/actions/LMS/genericLMS';
import * as xAPIHelper from 'helpers/xapi';
import { loadH5pResourceXapi } from 'store/actions/resource';
import './style.scss';

const Activity = (props) => {
  const {
    match,
    user,
    activityId,
    h5pSettings,
    loadH5pSettings,
    sendStatement,
  } = props;

  const submissionId = match.params.lmsName + match.params.lmsCourseId + match.params.lmsUnitId + user.id;
  const [attemptId, setAttemptId] = useState(null);
  const [xAPILoaded, setXAPILoaded] = useState(false);
  const [xAPIEventHooked, setXAPIEventHooked] = useState(false);

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    if (attemptId === null) setAttemptId(Date.now());
    loadH5pSettings(activityId);
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

    // Loops until it finds H5P object
    const checkXapi = setInterval(() => {
      if (xAPILoaded) {
        console.log('Loaded hit, returning');
        return;
      }

      const x = document.getElementsByClassName('h5p-iframe')[0].contentWindow;
      if (!x.H5P) return;
      if (!x.H5P.externalDispatcher) return;

      console.log('AE H5P ready');
      clearInterval(checkXapi);
      setTimeout(() => { setXAPILoaded(true); });
    });
  }, [h5pSettings]);

  // Patch into xAPI events
  useEffect(() => {
    console.log('AE entered hook func');
    if (!xAPILoaded || xAPIEventHooked) {
      console.log('hit over here');
      return;
    }

    const x = document.getElementsByClassName('h5p-iframe')[0].contentWindow;
    // if (!x.H5P.externalDispatcher || xAPIHelper.isxAPINeeded(match.path) === false) return;
    if (!x.H5P.externalDispatcher || xAPIHelper.isxAPINeeded(match.path) === false) {
      console.log('AE missing dispatcher');
      return;
    }
    console.log('AE found dispatcher, trying to hook');
    x.H5P.externalDispatcher.on('xAPI', function (event) {
      console.log('AE running listener');
      const params = {
        path: match.path,
        studentId: user.id,
        activityId,
        submissionId,
        attemptId,
        homepage: decodeURIComponent(match.params.lmsUrl),
        courseId: match.params.lmsCourseId,
        toolPlatform: decodeURIComponent(match.params.lmsUrl),
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
          title: 'You have completed this activity.',
          confirmButtonText: 'OK',
        });
      } else {
        sendStatement(JSON.stringify(xapiData));
      }
    });
    console.log('AE maybe hooked?');
    setXAPIEventHooked(true);
  }, [xAPILoaded, match.path, match.params, activityId]);

  return (
    <div id="curriki-h5p-wrapper">
      <div className="loader_gif">
        <img style={{ width: '50px' }} src={gifloader} alt="" />
      </div>
    </div>
  );
};

Activity.propTypes = {
  match: PropTypes.object.isRequired,
  activityId: PropTypes.string.isRequired,
  h5pSettings: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  loadH5pSettings: PropTypes.func.isRequired,
  sendStatement: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  h5pSettings: state.genericLMS.h5pSettings,
  user: state.genericLMS.user,
});

const mapDispatchToProps = (dispatch) => ({
  loadH5pSettings: (activityId) => dispatch(loadH5PSettingsAction(activityId)),
  sendStatement: (statement) => dispatch(loadH5pResourceXapi(statement)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activity));
