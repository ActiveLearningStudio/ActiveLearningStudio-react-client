/* eslint-disable max-len */
import React, { Suspense, lazy, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import Switch from 'react-switch';
import { confirmAlert } from 'react-confirm-alert';

import projectIcon from 'assets/images/project_icon.svg';
import { loadPlaylistAction, loadProjectPlaylistsAction, LoadHP } from 'store/actions/playlist';
import { shareActivity, removeShareActivity, loadH5pResourceSettings } from 'store/actions/resource';
import Unauthorized from 'components/Unauthorized';
import PreviousLink from './components/PreviousLink';
import NextLink from './components/NextLink';
import ActivitiesList from './components/ActivitiesList';

import './style.scss';

const H5PPreview = lazy(() => import('../../H5PPreview'));
const ImmersiveReaderPreview = lazy(() => import('../../../components/Microsoft/ImmersiveReaderPreview'));

function PlaylistPreview(props) {
  const {
    loading,
    projectId,
    playlistId,
    activityId,
    playlist,
    loadHP,
    loadPlaylist,
    loadProjectPlaylists,
  } = props;

  useEffect(() => {
    window.scrollTo(0, 0);
    loadPlaylist(projectId, playlistId);
  }, [
    projectId,
    playlistId,
    activityId,
    loadPlaylist,
  ]);

  useEffect(() => {
    loadProjectPlaylists(projectId);
  }, [projectId, loadProjectPlaylists]);

  let { selectedPlaylist } = playlist;
  if (selectedPlaylist && selectedPlaylist.id !== playlistId) {
    selectedPlaylist = null;
  }

  let currentActivityId = activityId;
  let currentActivity;
  let previousResource = null;
  let nextResource = null;

  if (selectedPlaylist && selectedPlaylist.activities && selectedPlaylist.activities.length > 0) {
    if (currentActivityId === null || currentActivityId === undefined) {
      currentActivityId = selectedPlaylist.activities[0].id;
    }

    currentActivity = selectedPlaylist.activities.find((f) => f.id === currentActivityId);

    if (currentActivity) {
      const index = selectedPlaylist.activities.findIndex((f) => f.id === currentActivity.id);
      if (index > 0) {
        previousResource = selectedPlaylist.activities[index - 1];
      }
      if (index < selectedPlaylist.activities.length - 1) {
        nextResource = selectedPlaylist.activities[index + 1];
      }
    }
  }

  useEffect(() => {
    if (loading && currentActivityId) {
      loadH5pResourceSettings(currentActivityId)
        .then(() => {
          loadHP(null);
        })
        .catch(() => {
          loadHP('fail');
        });
    }
  }, [loading, currentActivityId, loadHP]);

  if (!selectedPlaylist) {
    return (
      <div className="alert alert-info" role="alert">
        Loading...
      </div>
    );
  }

  // const allPlaylists = selectedPlaylist.project.playlists;
  const allPlaylists = playlist.playlists;
  const activityShared = currentActivity && currentActivity.shared;

  const share = async () => {
    const nameActivity = currentActivity && currentActivity.title;
    if (activityShared) {
      Swal.fire({
        icon: 'warning',
        title: `You are about to stop sharing <strong>${nameActivity}</strong>.
          Please remember that anyone you have shared this activity with will no longer have access its contents.
          Do you want to continue?`,
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Stop Sharing!',
        confirmButtonAriaLabel: 'Stop Sharing!',
        cancelButtonText: 'Cancel',
        cancelButtonAriaLabel: 'Cancel',
      })
        .then(async (resp) => {
          if (resp.isConfirmed) {
            await removeShareActivity(currentActivityId, nameActivity);
            loadPlaylist(projectId, playlistId);
          }
        });
    } else {
      await shareActivity(currentActivityId);
      loadPlaylist(projectId, playlistId);
    }
  };

  const viewSharedLink = () => {
    const protocol = `${window.location.href.split('/')[0]}//`;
    confirmAlert({
      // eslint-disable-next-line react/prop-types
      customUI: ({ onClose }) => (
        <div className="share-project-preview-url project-share-check">
          <div className="mt-3 mb-2 d-flex align-items-center">
            <a
              href={`/activity/${currentActivityId}/shared`}
              target="_blank"
              rel="noreferrer"
              style={{ flex: 1 }}
            >
              <input
                id="urllink_clip"
                style={{ width: '100%' }}
                value={`${protocol}${window.location.host}/activity/${currentActivityId}/shared`}
              />
            </a>

            <FontAwesomeIcon
              title="Copy to clipboard"
              icon="clipboard"
              onClick={() => {
                /* Get the text field */
                const copyText = document.getElementById('urllink_clip');

                /* Select the text field */
                copyText.focus();
                copyText.select();
                // copyText.setSelectionRange(0, 99999); /*For mobile devices*/

                /* Copy the text inside the text field */
                document.execCommand('copy');

                /* Alert the copied text */
                Swal.fire({
                  title: 'Link Copied',
                  showCancelButton: false,
                  showConfirmButton: false,
                  timer: 1500,
                  allowOutsideClick: false,
                });
              }}
            />
          </div>

          <div className="close-btn">
            <button type="button" onClick={onClose}>Ok</button>
          </div>
        </div>
      ),
    });
  };

  return (
    <>
      {loading ? (
        <div className="loading-phf-data">
          {loading === 'loading...' ? (
            <Unauthorized text={loading.toUpperCase()} />
          ) : (
            <Unauthorized showbutton text="You are unauthorized to access this!" />
          )}
        </div>
      ) : (
        <section className="main-page-content preview iframe-height-resource">
          <div className="container-flex-upper">
            <Link to={`/project/${selectedPlaylist.project.id}/preview`}>
              <div className="project-title">
                <img src={projectIcon} alt="" />
                {`Project: ${selectedPlaylist.project.name}`}
              </div>
            </Link>

            <Link to={`/project/${selectedPlaylist.project.id}`}>
              <FontAwesomeIcon icon="times" />
            </Link>
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
                      projectId={projectId}
                      playlistId={playlistId}
                      previousResource={previousResource}
                      allPlaylists={allPlaylists}
                    />
                    <NextLink
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
                  {currentActivity && (
                    <Suspense fallback={<div>Loading</div>}>
                      {currentActivity.type === 'h5p' ? (
                        <H5PPreview activityId={currentActivity.id} />
                      ) : (
                        <ImmersiveReaderPreview activity={currentActivity} />
                      )}
                    </Suspense>
                  )}
                </div>
              </div>
            </div>

            <div className="right-sidegolf-info">
              <div className="abs-div">
                <div className="back-header align-items-center justify-content-between">
                  <div>
                    <Link
                      className="go-back-button-preview"
                      to={`/project/${selectedPlaylist.project.id}/preview`}
                    >
                      <FontAwesomeIcon icon="undo" className="mr-2" />
                      Back to Project
                    </Link>
                  </div>

                  {/* <Dropdown className="ml-auto playlist-dropdown check">
                    <Dropdown.Toggle className="playlist-dropdown-btn">
                      <FontAwesomeIcon icon="ellipsis-v" />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <ActivitiesDropdown
                        projectId={projectId}
                        playlistId={playlistId}
                        activities={selectedPlaylist.activities}
                      />
                    </Dropdown.Menu>
                  </Dropdown> */}
                </div>

                <div className="scrollDiv long">
                  <div className="watcher spaner">
                    <div>
                      Share Activity
                      <Switch
                        onColor="#5952c6"
                        onChange={share}
                        checked={activityShared}
                        className="react-switch"
                        id="material-switch"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                      />
                    </div>

                    {activityShared && (
                    <div
                      className="shared-link"
                      onClick={viewSharedLink}
                    >
                      <FontAwesomeIcon icon="external-link-alt" className="mr-2" />
                      View Shared Link
                    </div>
                    )}
                  </div>

                  <div className="watcher">
                    You are watching from
                    {' '}
                    <span>
                      {selectedPlaylist.title}
                    </span>
                  </div>

                  <ul className="slider-scroll-auto">
                    <ActivitiesList
                      projectId={projectId}
                      playlistId={playlistId}
                      activities={selectedPlaylist.activities}
                      playlist={playlist.selectedPlaylist}
                    />
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

PlaylistPreview.propTypes = {
  playlist: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
  playlistId: PropTypes.number.isRequired,
  activityId: PropTypes.number,
  loading: PropTypes.string,
  loadPlaylist: PropTypes.func.isRequired,
  loadProjectPlaylists: PropTypes.func.isRequired,
  loadHP: PropTypes.func.isRequired,
};

PlaylistPreview.defaultProps = {
  loading: '',
  activityId: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  loadPlaylist: (projectId, playlistId) => dispatch(loadPlaylistAction(projectId, playlistId)),
  loadProjectPlaylists: (projectId) => dispatch(loadProjectPlaylistsAction(projectId)),
  loadHP: (show) => dispatch(LoadHP(show)),
});

const mapStateToProps = (state) => ({
  playlist: state.playlist,
  loading: state.playlist.loadingH5P,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistPreview),
);
