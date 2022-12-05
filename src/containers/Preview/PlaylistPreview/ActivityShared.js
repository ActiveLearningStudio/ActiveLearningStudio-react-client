/* eslint-disable */
import React, { Suspense, useEffect, useState, useRef } from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import TinCan from 'tincanjs';
import { Tab, Tabs } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  loadH5pResourceSettingsShared,
  loadH5pResourceSettingsEmbed,
  loadH5pResourceXapi,
  searchPreviewActivityAction,
  searchPreviewIndependentActivityAction,
} from 'store/actions/resource';
import PreviousLink from './components/PreviousLink';
import NextLink from './components/NextLink';
import listIcon from 'assets/images/svg/miscellaneous-list.svg';
import indResourceService from 'services/indActivities.service';
import HeaderLogo from 'assets/images/GCLogo.png';
import * as xAPIHelper from 'helpers/xapi';
import QueryString from 'query-string';
import projectIcon from 'assets/images/project_icon.svg';
import './activity-share.scss';
import './playlistPreview.scss';

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
  const [openPlaylistMenu, setPlaylistMenu] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState();

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
      }),
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
              setAuthorized(data);
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
              setAuthorized(data);
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
              if (data && !data?.errors) {
                h5pInsertion(data);
              } else {
                setAuthorized(data);
              }
            })
            .catch(() => {
              setAuthorized(true);
            });
        } else {
          loadH5pResourceSettingsShared(match.params.activityId)
            .then(async (data) => {
              if (data) {
                setSelectedPlaylist(data);
                h5pInsertion(data);
              } else {
                setAuthorized(data);
              }
            })
            .catch((e) => {
              setAuthorized(e);
            });
        }
      }

      const checkXapi = setInterval(() => {
        try {
          const x = document.getElementsByClassName('h5p-iframe')[0]?.contentWindow;
          if (x?.H5P) {
            if (x.H5P.externalDispatcher && xAPIHelper.isxAPINeeded(match.path)) {
              // eslint-disable-next-line no-use-before-define
              stopXapi();

              x.H5P.externalDispatcher.on('xAPI', (event) => {
                if (event.ignoreStatement) {
                  return;
                }
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
    <section className="curriki-playlist-preview">
      <div className="project-share-preview-nav">
        <img src={HeaderLogo} />
      </div>
      {query.view === 'playlist' ? (
        <div className="curriki-playlist-preview-container">
          <div className="activity-preview-with-playlist-container">
            <div className={!openPlaylistMenu ? (query.view === 'activity' ? 'left-activity-view extra-padding' : ' left-activity-view') : ' hideInMobile left-activity-view'}>
              <div className="activity-metadata">
                <Link to={`/project/${selectedPlaylist?.playlist?.project.id}/shared`}>
                  <img src={projectIcon} alt="" />
                  Project: {selectedPlaylist?.playlist?.project.name}
                </Link>
                <FontAwesomeIcon icon="chevron-right" />
                <Link>
                  <img src={listIcon} alt="" />
                  Playlist:{selectedPlaylist?.playlist?.title}
                </Link>
              </div>

              <div className="activity-controller">
                <h1>
                  Activity: &nbsp;
                  <span>{selectedPlaylist?.activity.title}</span>
                </h1>
                <div className="controller">
                  <PreviousLink
                    viewType={query.view}
                    playlistId={selectedPlaylist?.playlist.id}
                    previousResource={selectedPlaylist?.playlist.activities[selectedPlaylist?.playlist?.activities?.findIndex((f) => f.id === selectedPlaylist?.activity.id) - 1]}
                    allPlaylists={[]}
                    projectId={selectedPlaylist?.playlist.project.id}
                    activtyPlaylist
                    setH5pCurrentActivity={() => setSelectedPlaylist()}
                  />
                  <NextLink
                    viewType={query.view}
                    playlistId={selectedPlaylist?.playlist.id}
                    nextResource={selectedPlaylist?.playlist.activities[selectedPlaylist?.playlist?.activities?.findIndex((f) => f.id === selectedPlaylist?.activity.id) + 1]}
                    allPlaylists={[]}
                    projectId={selectedPlaylist?.playlist.project.id}
                    activtyPlaylist
                    setH5pCurrentActivity={() => setSelectedPlaylist()}
                  />
                </div>
              </div>
              <div className="main-item-wrapper">
                <div className="item-container">
                  {authorized?.errors ? (
                    <Alert variant="danger">{authorized.errors?.[0]}</Alert>
                  ) : selectedPlaylist?.activity.id ? (
                    <div
                      id="curriki-h5p-wrapper"
                      ref={(el) => {
                        if (el) {
                          currikiH5PWrapper.current = el;
                        }
                      }}
                    ></div>
                  ) : (
                    <Alert variant="primary"> Loading Activity</Alert>
                  )}
                </div>
              </div>
            </div>

            <div className={openPlaylistMenu ? 'all-activities-of-playlist active' : 'all-activities-of-playlist'}>
              <div className="list-button" onClick={() => setPlaylistMenu(!openPlaylistMenu)}>
                {openPlaylistMenu ? <FontAwesomeIcon icon="chevron-right" /> : <FontAwesomeIcon icon="chevron-left" />}
              </div>

              {openPlaylistMenu ? (
                <div className="relative-white-bg">
                  <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Activities">
                      <div className="all-activities">
                        {selectedPlaylist?.playlist.activities?.map((data) => (
                          <div className={selectedPlaylist?.activity.title === data.title ? 'each-activity active' : 'each-activity'}>
                            <Link
                              onClick={() => {
                                setSelectedPlaylist();
                              }}
                              to={`/activity/${data.id}/shared?view=playlist`}
                            >
                              <div
                                className="thumbnail"
                                style={{
                                  backgroundImage:
                                    !!data.thumb_url && !data.thumb_url.includes('/storage/') ? `url(${data.thumb_url})` : `url(${global.config.resourceUrl}${data.thumb_url})`,
                                }}
                              />
                              <p>{data.title}</p>
                            </Link>
                          </div>
                        ))}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              ) : (
                <div className="relative-white-bg-collapsed">
                  <div className="all-activities">
                    {selectedPlaylist?.playlist.activities?.map((data) => (
                      <Link
                        title={data.title}
                        onClick={() => {
                          setSelectedPlaylist();
                        }}
                        to={`/activity/${data.id}/shared?view=playlist`}
                        className="each-activity"
                      >
                        <div
                          className="thumbnail"
                          style={{
                            backgroundImage:
                              !!data.thumb_url && !data.thumb_url.includes('/storage/') ? `url(${data.thumb_url})` : `url(${global.config.resourceUrl}${data.thumb_url})`,
                          }}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="curriki-activity-share"
          id="curriki-h5p-wrapper"
          ref={(el) => {
            if (el) {
              currikiH5PWrapper.current = el;
            }
          }}
        >
          {authorized?.errors ? (
            <Alert variant="danger">{authorized.errors?.[0]}</Alert>
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
      )}
    </section>
  );
};

ActivityShared.propTypes = {
  match: PropTypes.object.isRequired,
  embed: PropTypes.string.isRequired,
};

export default withRouter(ActivityShared);
