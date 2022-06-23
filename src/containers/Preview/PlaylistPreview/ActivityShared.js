/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import TinCan from 'tincanjs';
import { Alert } from 'react-bootstrap';
import { loadH5pResourceSettingsShared, loadH5pResourceSettingsEmbed, loadH5pResourceXapi, searchPreviewActivityAction, searchPreviewIndependentActivityAction } from 'store/actions/resource';
import indResourceService from 'services/indActivities.service';
import HeaderLogo from 'assets/images/GCLogo.png';
import * as xAPIHelper from 'helpers/xapi';
import QueryString from 'query-string';

import './activity-share.scss';

let counter = 1;
let lrs = null;

const ActivityShared = (props) => {
  const currikiH5PWrapper = useRef(null);
  const query = QueryString.parse(window.location.search);
  const { match, embed } = props;
  const lrsEndpoint = new URLSearchParams(window.location.search).get('endpoint');
  const lrsAuth = new URLSearchParams(window.location.search).get('auth');
  const lrsRegistration = new URLSearchParams(window.location.search).get('registration');
  const [authorized, setAuthorized] = useState(false);
  // const [lrs, setLrs] = useState(null);
  // const { orientation } = useSelector((state) => state.ui);
  const dispatch = useDispatch();
  const { activeOrganization } = useSelector((state) => state.organization);
  const h5pInsertion = async (data) => {
    if (!data) return;
    window.H5PIntegration = data?.h5p.settings;
    const h5pWrapper = document.getElementById('curriki-h5p-wrapper');
    h5pWrapper.innerHTML = data?.h5p.embed_code.trim();
    const newCss = data?.h5p.settings.core.styles.concat(data?.h5p.settings.loadedCss);

    await Promise.all(
      newCss?.map((value) => {
        const link = document.createElement('link');
        link.href = value;
        link.type = 'text/css';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        return true;
      })
    );

    const newScripts = data?.h5p.settings.core.scripts.concat(data.h5p.settings.loadedJs);

    newScripts?.forEach((value) => {
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
    if (currikiH5PWrapper && currikiH5PWrapper.current) {
      const aspectRatio = 1.778; // standard aspect ratio of video width and height
      const currentHeight = currikiH5PWrapper.current.offsetHeight - 65; // current height with some margin
      const adjustedWidthVal = currentHeight * aspectRatio;
      const parentWidth = currikiH5PWrapper.current.parentElement.offsetWidth;
      if (adjustedWidthVal < parentWidth) {
        currikiH5PWrapper.current.style.width = `${adjustedWidthVal}px`; // eslint-disable-line no-param-reassign
      }
    }
  }, [currikiH5PWrapper]);

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
      } else if (query.type === 'ind-search' && window.location.pathname.includes('/preview') && activeOrganization?.id) {
        dispatch(searchPreviewIndependentActivityAction(match.params.activityId))
          .then(async (data) => {
            if (data) {
              h5pInsertion(data);
            } else {
              setAuthorized(true);
            }
          })
          .catch(() => {
            setAuthorized(true);
          });
      } else if (window.location.pathname.includes('/preview') && activeOrganization?.id && query.type !== 'ind-search') {
        dispatch(searchPreviewActivityAction(match.params.activityId))
          .then(async (data) => {
            if (data) {
              h5pInsertion(data);
            } else {
              setAuthorized(true);
            }
          })
          .catch(() => {
            setAuthorized(true);
          });
      } else if (!window.location.pathname.includes('/preview')) {
        if (query.type === 'ind') {
          indResourceService
            .h5pResourceSettingsSharedIndActivity(match.params.activityId)
            .then(async (data) => {
              if (data) {
                h5pInsertion(data);
              } else {
                setAuthorized(true);
              }
            })
            .catch(() => {
              setAuthorized(true);
            });
        } else {
          loadH5pResourceSettingsShared(match.params.activityId)
            .then(async (data) => {
              if (data) {
                h5pInsertion(data);
              } else {
                setAuthorized(true);
              }
            })
            .catch(() => {
              setAuthorized(true);
            });
        }
      }

      const checkXapi = setInterval(() => {
        try {
          const x = document.getElementsByClassName('h5p-iframe')[0].contentWindow;
          if (x.H5P) {
            if (x.H5P.externalDispatcher && xAPIHelper.isxAPINeeded(match.path)) {
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
  }, [embed, match.params.activityId, activeOrganization?.id, match.path, dispatch, lrsRegistration]);

  return (
    <>
      <div className="project-share-preview-nav">
        <img src={HeaderLogo} />
      </div>
      <div className="curriki-activity-share">
        {authorized ? (
          <Alert variant="danger"> Activity not found.</Alert>
        ) : (
          <div
            id="curriki-h5p-wrapper"
            ref={(el) => {
              if (el) {
                currikiH5PWrapper.current = el;
              }
            }}
          >
            <Alert variant="primary"> Loading Activity</Alert>
          </div>
        )}
      </div>
    </>
  );
};

ActivityShared.propTypes = {
  match: PropTypes.object.isRequired,
  embed: PropTypes.string.isRequired,
};

export default withRouter(ActivityShared);
