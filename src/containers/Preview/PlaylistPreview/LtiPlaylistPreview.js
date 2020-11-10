import React, { Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';

import projectIcon from 'assets/images/project_icon.svg';
import { loadLtiPlaylistAction, loadProjectPlaylistsAction } from 'store/actions/playlist';
import PreviousLink from './components/PreviousLink';
import NextLink from './components/NextLink';
import ActivitiesDropdown from './components/ActivitiesDropdown';
import ActivitiesList from './components/ActivitiesList';

import './style.scss';

const H5PPreview = React.lazy(() => import('../../H5PPreview'));

function LtiPlaylistPreview(props) {
  const {
    playlist,
    playlistId,
    activityId,
    showLti,
    loadLtiPlaylist,
    loadProjectPlaylists,
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);

    loadLtiPlaylist(playlistId);
  }, [playlistId, activityId, loadLtiPlaylist]);

  let { selectedPlaylist } = playlist;
  useEffect(() => {
    if (selectedPlaylist) {
      loadProjectPlaylists(selectedPlaylist.project_id);
    }
  }, [selectedPlaylist]);
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

  const allPlaylists = playlist.playlists;

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

  return (
    <section className="main-page-content preview iframe-height-resource">
      <div className="container-flex-upper">
        <div className="project-title">
          <img src={projectIcon} alt="" />
          {showLti
            ? `Playlist: ${selectedPlaylist.title}`
            : `Project: ${selectedPlaylist.project.name}`}
        </div>
      </div>

      <div className="flex-container previews">
        <div className="activity-bg left-vdo">
          <div className="flex-container-preview">
            <div className="act-top-header">
              <div className="heading-wrapper">
                <div className="main-heading">
                  {currentActivity && currentActivity.title}
                </div>
              </div>
            </div>

            <div className="right-control vd-controls">
              <div className="slider-btn">
                <PreviousLink
                  showLti
                  playlistId={playlistId}
                  previousResource={previousResource}
                  allPlaylists={allPlaylists}
                  projectId={selectedPlaylist.project_id}
                />
                <NextLink
                  showLti
                  playlistId={playlistId}
                  nextResource={nextResource}
                  allPlaylists={allPlaylists}
                  projectId={selectedPlaylist.project_id}
                />
              </div>
            </div>
          </div>

          <div className="main-item-wrapper">
            <div className="item-container">
              {currentActivity && (
                <Suspense fallback={<div>Loading</div>}>
                  <H5PPreview showLtiPreview activityId={currentActivity.id} />
                </Suspense>
              )}
            </div>
          </div>
        </div>

        <div className="right-sidegolf-info">
          <div className="abs-div">
            <div className="back-header align-items-center justify-content-between">
              <Dropdown className="ml-auto playlist-dropdown check">
                <Dropdown.Toggle className="playlist-dropdown-btn">
                  <FontAwesomeIcon icon="ellipsis-v" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <ActivitiesDropdown
                    showLti
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
                  showLti
                  playlistId={playlistId}
                  activities={selectedPlaylist.activities}
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

LtiPlaylistPreview.propTypes = {
  playlist: PropTypes.object.isRequired,
  playlistId: PropTypes.number.isRequired,
  activityId: PropTypes.number,
  showLti: PropTypes.bool,
  loadLtiPlaylist: PropTypes.func.isRequired,
  loadProjectPlaylists: PropTypes.func.isRequired,
};

LtiPlaylistPreview.defaultProps = {
  showLti: false,
  activityId: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  loadLtiPlaylist: (playlistId) => dispatch(loadLtiPlaylistAction(playlistId)),
  loadProjectPlaylists: (projectId) => dispatch(loadProjectPlaylistsAction(projectId)),
});

const mapStateToProps = (state) => ({
  playlist: state.playlist,
});

export default connect(mapStateToProps, mapDispatchToProps)(LtiPlaylistPreview);
