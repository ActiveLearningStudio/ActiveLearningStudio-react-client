/* eslint-disable max-len */
/* eslint-disable */
import React, { Suspense, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QueryString from 'query-string';
import listIcon from 'assets/images/svg/miscellaneous-list.svg';
import { Tab, Tabs } from 'react-bootstrap';
import projectIcon from 'assets/images/project_icon.svg';
import { loadSharedPlaylistAction } from 'store/actions/playlist';
import Unauthorized from 'components/Unauthorized';
import PreviousLink from './components/PreviousLink';
import NextLink from './components/NextLink';
import HeaderLogo from 'assets/images/GCLogo.png';

import './playlistPreview.scss';

const H5PPreview = React.lazy(() => import('../../H5PPreview'));

function LtiPlaylistPreviewShared(props) {
  const { history, playlist, projectId, playlistId, activityId, loading, loadSharedPlaylist } = props;
  const [openPlaylistMenu, setPlaylistMenu] = useState(false);
  const [h5pCurrentActivity, setH5pCurrentActivity] = useState(null);
  const [errorType, setTypeError] = useState('');
  const query = QueryString.parse(window.location.search);
  useEffect(() => {
    window.scrollTo(0, 0);

    loadSharedPlaylist(projectId, playlistId)
      .then()
      .catch((err) => setTypeError(err.errors?.[0]));
  }, [projectId, playlistId, activityId, loadSharedPlaylist]);

  let { selectedPlaylist } = playlist;
  if (selectedPlaylist === 'error') {
    return <Unauthorized text="Project is not public." />;
  }

  if (selectedPlaylist && selectedPlaylist.id !== playlistId) {
    selectedPlaylist = null;
  }

  if (!selectedPlaylist) {
    return (
      <div className={errorType ? 'alert alert-danger' : 'alert alert-info'} role="alert">
        {errorType ? errorType.replace('Project', 'Playlist') : 'Loading...'}
      </div>
    );
  }
  const allPlaylists = playlist.playlists;

  let currentActivityId = activityId;
  let currentActivity;
  let previousResource = null;
  let nextResource = null;

  if (selectedPlaylist.activities && selectedPlaylist.activities.length > 0) {
    if (currentActivityId === null || currentActivityId === undefined) {
      currentActivityId = selectedPlaylist.activities[0].id;
    }

    currentActivity = h5pCurrentActivity?.id || selectedPlaylist.activities.find((f) => f.id === currentActivityId);

    if (currentActivity) {
      const index = selectedPlaylist.activities.findIndex((act) => act.id === currentActivity.id);
      if (index > 0) {
        previousResource = selectedPlaylist.activities[index - 1];
      }
      if (index < selectedPlaylist.activities.length - 1) {
        nextResource = selectedPlaylist.activities[index + 1];
      }
    }
  }

  // useEffect(() => {
  //   if (selectedPlaylist?.activities?.length) {
  //     //setH5pCurrentActivity(selectedPlaylist.activities[0].id);
  //   }
  // }, [selectedPlaylist]);

  return (
    <section className="curriki-playlist-preview">
      <div className="project-share-preview-nav">
        <img src={HeaderLogo} />
      </div>
      <div className="curriki-playlist-preview-container">
        <div className="activity-preview-with-playlist-container">
          {/* <div className={`activity-bg left-vdo${collapsed ? ' collapsed' : ''}`}> */}

          <div className={!openPlaylistMenu ? (query.view === 'activity' ? 'left-activity-view extra-padding' : ' left-activity-view') : ' hideInMobile left-activity-view'}>
            <div className="activity-metadata">
              <Link>
                <img src={projectIcon} alt="" />
                Project: {selectedPlaylist.project.name}
              </Link>
              <FontAwesomeIcon icon="chevron-right" />
              <Link>
                <img src={listIcon} alt="" />
                Playlist:{selectedPlaylist.title}
              </Link>
            </div>
            {localStorage.getItem('lti_activity') === 'false' && (
              <Link to={`/project/${selectedPlaylist.project.id}/shared`}>
                <FontAwesomeIcon icon="times" />
              </Link>
            )}
            <div className="activity-controller">
              {currentActivity && (
                <h1>
                  Activity: &nbsp;
                  <span>{h5pCurrentActivity?.title || currentActivity.title}</span>
                </h1>
              )}
              <div className="controller">
                <PreviousLink
                  viewType={query.view}
                  setH5pCurrentActivity={setH5pCurrentActivity}
                  playlistId={playlistId}
                  previousResource={
                    h5pCurrentActivity ? selectedPlaylist.activities[selectedPlaylist.activities.findIndex((f) => f.id === h5pCurrentActivity.id) - 1] : previousResource
                  }
                  allPlaylists={allPlaylists}
                  projectId={selectedPlaylist.project_id}
                />
                <NextLink
                  viewType={query.view}
                  setH5pCurrentActivity={setH5pCurrentActivity}
                  playlistId={playlistId}
                  nextResource={h5pCurrentActivity ? selectedPlaylist.activities[selectedPlaylist.activities.findIndex((f) => f.id === h5pCurrentActivity.id) + 1] : nextResource}
                  allPlaylists={allPlaylists}
                  projectId={selectedPlaylist.project_id}
                />
              </div>
            </div>

            <div className="main-item-wrapper">
              <div className="item-container">
                {currentActivity && (
                  <Suspense fallback={<div>Loading</div>}>
                    <H5PPreview showLtiPreview activityId={h5pCurrentActivity?.id || currentActivity.id} />
                  </Suspense>
                )}
              </div>
            </div>
          </div>
          {query.view !== 'activity' && (
            <div className={openPlaylistMenu ? 'all-activities-of-playlist active' : 'all-activities-of-playlist'}>
              <div className="list-button" onClick={() => setPlaylistMenu(!openPlaylistMenu)}>
                {openPlaylistMenu ? <FontAwesomeIcon icon="chevron-right" /> : <FontAwesomeIcon icon="chevron-left" />}
              </div>

              {openPlaylistMenu ? (
                <div className="relative-white-bg">
                  <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                    <Tab eventKey="home" title="Activities">
                      <div className="all-activities">
                        {selectedPlaylist.activities?.map((data) => (
                          <div className={currentActivity.title === data.title ? 'each-activity active' : 'each-activity'}>
                            <Link
                              onClick={() => {
                                setPlaylistMenu(!openPlaylistMenu);
                                setH5pCurrentActivity(data);
                              }}
                              to="#"
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
                    {selectedPlaylist.activities?.map((data) => (
                      <Link
                        title={data.title}
                        onClick={() => {
                          setPlaylistMenu(!openPlaylistMenu);
                          setH5pCurrentActivity(data);
                        }}
                        to="#"
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
          )}
        </div>
      </div>
    </section>
  );
}

LtiPlaylistPreviewShared.propTypes = {
  history: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
  playlistId: PropTypes.number.isRequired,
  activityId: PropTypes.number.isRequired,
  loading: PropTypes.string,
  loadSharedPlaylist: PropTypes.func.isRequired,
};

LtiPlaylistPreviewShared.defaultProps = {
  loading: '',
};

const mapDispatchToProps = (dispatch) => ({
  loadSharedPlaylist: (projectId, playlistId) => dispatch(loadSharedPlaylistAction(projectId, playlistId)),
});

const mapStateToProps = (state) => ({
  playlist: state.playlist,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LtiPlaylistPreviewShared));
