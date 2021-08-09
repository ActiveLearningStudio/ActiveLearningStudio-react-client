/* eslint-disable max-len */
import React, { Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';

import projectIcon from 'assets/images/project_icon.svg';
import { loadSharedPlaylistAction } from 'store/actions/playlist';
import Unauthorized from 'components/Unauthorized';
import PreviousLink from './components/PreviousLink';
import NextLink from './components/NextLink';
import ActivitiesDropdown from './components/ActivitiesDropdown';
import ActivitiesList from './components/ActivitiesList';

import './style.scss';

const H5PPreview = React.lazy(() => import('../../H5PPreview'));

function LtiPlaylistPreviewShared(props) {
  const {
    history,
    playlist,
    projectId,
    playlistId,
    activityId,
    loading,
    loadSharedPlaylist,
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);

    loadSharedPlaylist(projectId, playlistId);
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
      <div className="alert alert-info" role="alert">
        Loading...
      </div>
    );
  }

  const allPlaylists = selectedPlaylist.project.playlists;

  let currentActivityId = activityId;
  let currentActivity;
  let previousResource = null;
  let nextResource = null;

  if (selectedPlaylist.activities && selectedPlaylist.activities.length > 0) {
    if (currentActivityId === null || currentActivityId === undefined) {
      currentActivityId = selectedPlaylist.activities[0].id;
    }

    currentActivity = selectedPlaylist.activities.find((f) => f.id === currentActivityId);

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

  console.log(selectedPlaylist);

  return (
    <>
      {loading ? (
        <div className="loading-phf-data">
          {loading === 'loading...' ? (
            <Unauthorized text={loading.toUpperCase()} />
          ) : (
            <Unauthorized showButton text="You are unauthorized to access this!" />
          )}
        </div>
      ) : (
        <section className="main-page-content preview">
          <div className="container-flex-upper">
            {selectedPlaylist.project && (
              <>
                <Link to="#" onClick={history.goBack}>
                  <div className="project-title">
                    <img src={projectIcon} alt="" />
                    {`Project: ${selectedPlaylist.project.name}`}
                  </div>
                </Link>

                <Link to={`/studio/project/${selectedPlaylist.project.id}`}>
                  <FontAwesomeIcon icon="times" />
                </Link>
              </>
            )}
          </div>

          <div className="flex-container">
            <div className="activity-bg left-vdo">
              <div className="flex-container-preview">
                <div className="act-top-header">
                  <div className="heading-wrapper">
                    <div className="main-heading">
                      {/* <span>You are Watching:</span> */}

                      {currentActivity && currentActivity.title}
                    </div>
                    {/*
                    <div className="sub-heading">
                      <span>From the playlist:</span>
                      {selectedPlaylist ? selectedPlaylist.title : ""}
                    </div>
                    */}
                  </div>
                </div>

                <div className="right-control vd-controls">
                  <div className="slider-btn">
                    <PreviousLink
                      shared
                      projectId={projectId}
                      playlistId={playlistId}
                      previousResource={previousResource}
                      allPlaylists={allPlaylists}
                    />
                    <NextLink
                      shared
                      projectId={projectId}
                      playlistId={playlistId}
                      nextResource={nextResource}
                      allPlaylists={allPlaylists}
                    />
                  </div>
                </div>
              </div>

              <div className="main-item-wrapper">
                <div className="item-container">
                  {/* <img src="/images/video-thumbnail.jpg" alt="video-thumbnail" /> */}
                  {currentActivity && (
                    <Suspense fallback={<div>Loading</div>}>
                      <H5PPreview showLtiPreview activityId={currentActivity.id} />
                    </Suspense>
                  )}
                  {/*
                  <div className="item-caption-bottom">
                    <p>
                      {currentActivity && currentActivity.title}
                    </p>
                  </div>
                  */}
                </div>
              </div>
            </div>

            <div className="right-sidegolf-info">
              <div className="back-header">
                <div>
                  <Link
                    to="#"
                    className="go-back-button-preview"
                    onClick={history.goBack}
                  >
                    <FontAwesomeIcon icon="undo" className="mr-2" />
                    Back to Project
                  </Link>
                </div>

                <Dropdown className="ml-auto playlist-dropdown check">
                  <Dropdown.Toggle className="playlist-dropdown-btn">
                    <FontAwesomeIcon icon="ellipsis-v" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <ActivitiesDropdown
                      shared
                      projectId={projectId}
                      playlistId={playlistId}
                      activities={selectedPlaylist.activities}
                    />
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="scrollDiv long">
                <div className="watcher">
                  You are watching from
                  {' '}
                  <span>
                    {selectedPlaylist.title}
                  </span>
                </div>
                <ul className="slider-scroll-auto">
                  <ActivitiesList
                    shared
                    projectId={projectId}
                    playlistId={playlistId}
                    activities={selectedPlaylist.activities}
                  />
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
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

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LtiPlaylistPreviewShared),
);
