/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import gifloader from 'assets/images/dotsloader.gif';
import * as xAPIHelper from 'helpers/xapi';
import { loadH5pResourceXapi } from 'store/actions/resource';
import { loadH5pResourceSettings } from 'store/actions/gapi';
import { gradePassBackAction } from 'store/actions/canvas';
import './style.scss';

const Activity = (props) => {
  const {
    activityId,
    match,
    h5pSettings,
    ltiFinished,
    loadH5pSettings,
    sendStatement,
    gradePassBack,
  } = props;
  const searchParams = new URLSearchParams(window.location.search);
  const session = searchParams.get('PHPSESSID');
  const studentId = searchParams.get('user_id');
  const isLearner = searchParams.get('is_learner') !== '';
  const [xAPILoaded, setXAPILoaded] = useState(false);

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    loadH5pSettings(match.params.activityId);
  }, [match]);

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
      setXAPILoaded(true);
    });
    // setIntervalPointer(checkXapi);
  }, [h5pSettings]);

  // Patch into xAPI events
  useEffect(() => {
    if (!xAPILoaded || !isLearner) return;

    const x = document.getElementsByClassName('h5p-iframe')[0].contentWindow;
    if (!x.H5P.externalDispatcher || xAPIHelper.isxAPINeeded(match.path) === false) return;

    x.H5P.externalDispatcher.on('xAPI', function (event) {
      const params = {
        path: match.path,
        studentId,
        activityId,
      };

      // Extending the xAPI statement with our custom values and sending it off to LRS
      const xapiData = xAPIHelper.extendStatement(event.data.statement, params);

      if (event.data.statement.verb.display['en-US'] === 'completed') {
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
              xAPIHelper.extendStatement(xAPIData.statement, params, true),
            );
            sendStatement(iXAPIStatement);
          }, this);
        }

        sendStatement(JSON.stringify(xapiData));

        Swal.fire({
          title: 'You have completed this activity.',
          confirmButtonText: 'OK',
        });

        // Sending grade passback
        const score = xapiData.result.score.scaled;
        gradePassBack(session, 1, score);
      } else {
        sendStatement(JSON.stringify(xapiData));
      }
    });
  }, [xAPILoaded, match.path, match.params, activityId]);

  return (
    <div>
      {ltiFinished && (
        <div>Finished</div>
      )}

      {!ltiFinished && (
        <div id="curriki-h5p-wrapper">
          <div className="loader_gif">
            <img style={{ width: '50px' }} src={gifloader} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

Activity.propTypes = {
  activityId: PropTypes.string.isRequired,
  match: PropTypes.object.isRequired,
  h5pSettings: PropTypes.object.isRequired,
  ltiFinished: PropTypes.bool.isRequired,
  loadH5pSettings: PropTypes.func.isRequired,
  sendStatement: PropTypes.func.isRequired,
  gradePassBack: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  h5pSettings: state.gapi.h5pSettings,
  ltiFinished: state.canvas.ltiFinished,
});

const mapDispatchToProps = (dispatch) => ({
  loadH5pSettings: (activityId) => dispatch(loadH5pResourceSettings(activityId)),
  sendStatement: (statement) => dispatch(loadH5pResourceXapi(statement)),
  gradePassBack: (session, gpb, score) => dispatch(gradePassBackAction(session, gpb, score)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Activity));
