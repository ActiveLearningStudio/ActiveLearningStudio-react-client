/* eslint-disable react/no-this-in-sfc */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';
import Swal from 'sweetalert2';
import gifloader from 'assets/images/dotsloader.gif';
import resourceService from 'services/indActivities.service';
import './style.scss';

// Dispatches a custom event with the xAPI statement data on the parent iframe
const sendStatementEvent = (statement) => {
  if (!window.parent) {
    console.log('No window parent. sendStatementEvent not executed');
    return;
  }
  window.parent.postMessage(statement, '*');
};

const C2EActivity = ({ match }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const { activityId } = match.params;
  const token = searchParams.get('token');
  const ceeId = searchParams.get('ceeid');
  const [h5pSettings, setH5pSettings] = useState(null);
  const [errors, setErrors] = useState(null);
  const [xAPILoaded, setXAPILoaded] = useState(false);
  const [xAPIEventHooked, setXAPIEventHooked] = useState(false);

  // Init
  useEffect(() => {
    window.scrollTo(0, 0);
    resourceService.h5pResourceSettingsSharedIndActivity(activityId, token, ceeId)
    .then(async (data) => {
      if (data && !data?.errors) {
        setH5pSettings(data);
      } else {
        setErrors(data.errors);
      }
    })
    .catch(() => {
      setErrors('Error loading activity settings');
    });
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
        return;
      }

      const x = document.getElementsByClassName('h5p-iframe')[0].contentWindow;
      if (!x.H5P) return;
      if (!x.H5P.externalDispatcher) return;

      console.log('H5P ready');
      clearInterval(checkXapi);
      setTimeout(() => { setXAPILoaded(true); });
    });
  }, [h5pSettings]);

  // Patch into xAPI events
  useEffect(() => {
    console.log('AE entered hook func');
    if (!xAPILoaded || xAPIEventHooked) {
      return;
    }

    const x = document.getElementsByClassName('h5p-iframe')[0].contentWindow;
    if (!x.H5P.externalDispatcher) {
      console.log('missing dispatcher');
      return;
    }

    x.H5P.externalDispatcher.on('xAPI', function (event) {
      if (event.ignoreStatement) {
        return;
      }

      const xapiData = event.data.statement;

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

            sendStatementEvent(xAPIData.statement);
          }, this);
        }

        sendStatementEvent(JSON.stringify(xapiData));

        Swal.fire({
          title: 'You have completed this activity.',
          confirmButtonText: 'OK',
        });
      } else {
        sendStatementEvent(JSON.stringify(xapiData));
      }
    });
    setXAPIEventHooked(true);
  }, [xAPILoaded, match.path, match.params, activityId]);

  return (
    <>
      {errors && (<Alert variant="danger">{errors}</Alert>)}
      {!errors && (
        <div id="curriki-h5p-wrapper">
          <div className="loader_gif">
            <img style={{ width: '50px' }} src={gifloader} alt="" />
          </div>
        </div>
      )}
    </>
  );
};

C2EActivity.propTypes = {
  match: PropTypes.object.isRequired,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = () => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(C2EActivity));
