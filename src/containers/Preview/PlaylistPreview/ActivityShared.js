/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import TinCan from 'tincanjs';
import { Alert } from 'react-bootstrap';
import gifloader from 'assets/images/dotsloader.gif';
import { loadH5pResourceSettingsShared, loadH5pResourceSettingsEmbed, loadH5pResourceXapi } from 'store/actions/resource';
import * as xAPIHelper from 'helpers/xapi';

import './style.scss';

let counter = 1;
let lrs = null;

const ActivityShared = (props) => {
  const { match, embed } = props;
  const lrsEndpoint = new URLSearchParams(window.location.search).get('endpoint');
  const lrsAuth = new URLSearchParams(window.location.search).get('auth');
  const lrsRegistration = new URLSearchParams(window.location.search).get('registration');
  const [authorized, setAuthorized] = useState(false);
  // const [lrs, setLrs] = useState(null);
  // const { orientation } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  const h5pInsertion = async (data) => {
    window.H5PIntegration = data.h5p.settings;
    const h5pWrapper = document.getElementById('curriki-h5p-wrapper');
    h5pWrapper.innerHTML = data.h5p.embed_code.trim();
    const newCss = data.h5p.settings.core.styles.concat(data.h5p.settings.loadedCss);

    await Promise.all(
      newCss.map((value) => {
        const link = document.createElement('link');
        link.href = value;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return true;
      })
    );

    const newScripts = data.h5p.settings.core.scripts.concat(data.h5p.settings.loadedJs);

    newScripts.forEach((value) => {
      const script = document.createElement('script');
      script.src = value;
      script.async = false;
      document.body.appendChild(script);
    });
  };

  // Checking if in a tincan env
  useEffect(() => {
    if (!lrsEndpoint && !lrsAuth && lrs === null) return;

    lrs = new TinCan.LRS({
      endpoint: lrsEndpoint,
      auth: lrsAuth,
      allowFail: true,
    });
  }, [lrsEndpoint, lrsAuth]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (match.params.activityId) {
      if (embed) {
        loadH5pResourceSettingsEmbed(match.params.activityId)
          .then(async (data) => {
            const embedSettings = {};
            embedSettings.h5p = data;
            h5pInsertion(embedSettings);
          })
          .catch(() => {
            setAuthorized(true);
          });
      } else {
        loadH5pResourceSettingsShared(match.params.activityId)
          .then(async (data) => {
            h5pInsertion(data);
          })
          .catch(() => {
            setAuthorized(true);
          });
      }

      const checkXapi = setInterval(() => {
        try {
          const x = document.getElementsByClassName('h5p-iframe')[0].contentWindow;
          if (x.H5P) {
            if (x.H5P.externalDispatcher && xAPIHelper.isxAPINeeded(props.match.path)) {
              // eslint-disable-next-line no-use-before-define
              stopXapi();

              x.H5P.externalDispatcher.on('xAPI', (event) => {
                if (counter > 0) {
                  const extendedStatement = xAPIHelper.extendSharedActivityStatement(this, event.data.statement, { path: match.path, activityId: match.params.activityId });
                  dispatch(loadH5pResourceXapi(JSON.stringify(extendedStatement)));

                  if (lrs) {
                    // If completed, check for passing grade. Cancel statement if not passing
                    if (extendedStatement?.verb?.id === 'http://adlnet.gov/expapi/verbs/completed' && extendedStatement?.result?.score?.scaled !== 1) {
                      Swal.fire({
                        title: 'Please complete all the interactions correctly to finish the activity.',
                        confirmButtonText: 'Continue',
                      });
                    } else {
                      // If an lrs has been defined, send tincanjs statement
                      const doceboStatement = new TinCan.Statement({
                        actor: {
                          ...extendedStatement.actor,
                          mbox: 'mailto:info@currikistudio.org',
                        },
                        verb: extendedStatement.verb,
                        context: {
                          ...extendedStatement.context,
                          registration: lrsRegistration,
                        },
                        object: extendedStatement.object,
                      });

                      lrs.saveStatement(doceboStatement, {
                        callback: (err, xhr) => {
                          if (err !== null) {
                            if (xhr !== null) {
                              console.log(`Failed to save statement: ${xhr.responseText} (${xhr.status})`);
                              // TODO: do something with error, didn't save statement
                              return;
                            }

                            console.log(`Failed to save statement: ${err}`);
                            // TODO: do something with error, didn't save statement
                            return;
                          }

                          console.log('Statement saved');
                          // TOOO: do something with success (possibly ignore)
                        },
                      });
                    }
                  }
                }
                counter += 1;
              });
            }
          }
        } catch (e) {
          console.log(e);
        }
      });

      const stopXapi = () => clearInterval(checkXapi);
    }
  }, [dispatch, embed, match.params.activityId]);

  return (
    <>
      {authorized ? (
        <Alert variant="warning"> Activity is not sharable</Alert>
      ) : (
        <div id="curriki-h5p-wrapper">
          <Alert variant="primary"> Loading Activity</Alert>
        </div>
      )}
    </>
  );
};

ActivityShared.propTypes = {
  match: PropTypes.object.isRequired,
  embed: PropTypes.string.isRequired,
};

export default withRouter(ActivityShared);
