import React, { Suspense, lazy, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import Switch from 'react-switch';
import { confirmAlert } from 'react-confirm-alert';
import { Tab, Tabs } from 'react-bootstrap';

import projectIcon from 'assets/images/project_icon.svg';
import { loadPlaylistAction, loadProjectPlaylistsAction, LoadHP } from 'store/actions/playlist';
import { shareActivity, removeShareActivity, loadH5pResourceSettings } from 'store/actions/resource';
import { collapsedSideBar } from 'store/actions/ui';
import Unauthorized from 'components/Unauthorized';
import { getTeamPermission } from 'store/actions/team';
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
    collapsed,
    setCollapsed,
  } = props;
  const organization = useSelector((state) => state.organization);
  const { teamPermission } = useSelector((state) => state.team);
  const { permission } = organization;
  const projectPreview = localStorage.getItem('projectPreview');
  // const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    loadPlaylist(projectId, playlistId);
  }, [
    projectId,
    playlistId,
    activityId,
    loadPlaylist,
  ]);

  let { selectedPlaylist } = playlist;
  if (selectedPlaylist && selectedPlaylist.id !== playlistId) {
    selectedPlaylist = null;
  }
  useEffect(() => {
    loadProjectPlaylists(projectId);
  }, [projectId, loadProjectPlaylists]);
  useEffect(() => {
    if (Object.keys(teamPermission).length === 0 && organization?.currentOrganization?.id && selectedPlaylist?.project?.team?.id) {
      dispatch(getTeamPermission(organization?.currentOrganization?.id, selectedPlaylist?.project?.team?.id));
    }
  }, [teamPermission, selectedPlaylist, dispatch, organization?.currentOrganization?.id]);

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
              href={`/studio/activity/${currentActivityId}/shared`}
              target="_blank"
              rel="noreferrer"
              style={{ flex: 1 }}
            >
              <input
                id="urllink_clip"
                style={{ width: '100%' }}
                value={`${protocol}${window.location.host}/studio/activity/${currentActivityId}/shared`}
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
  // const goBack = () => {
  //   history.goBack();
  // };
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
            <div className="both-p">
              <Link to={`/studio/project/${selectedPlaylist.project.id}/preview`}>
                <div className="project-title">
                  <img src={projectIcon} alt="" />
                  {`Project: ${selectedPlaylist.project.name}`}
                </div>
              </Link>
              <Link>
                <div className="project-title">
                  <img src={projectIcon} alt="" />
                  {`Playlist: ${selectedPlaylist.title}`}
                </div>
              </Link>
            </div>

            <Link
              to={
                projectPreview === 'true'
                 ? `/studio/org/${organization.currentOrganization?.domain}/project/${selectedPlaylist.project.id}/preview`
                 : `/studio/org/${organization.currentOrganization?.domain}/project/${selectedPlaylist.project.id}`
              }
            >
              <FontAwesomeIcon icon="times" />
            </Link>
          </div>

          <div className="flex-container previews">
            <div className={`activity-bg left-vdo${collapsed ? ' collapsed' : ''}`}>
              <div className="flex-container-preview">
                <div className="act-top-header">
                  <div className="heading-wrapper">
                    <div className="main-heading">
                      {currentActivity && (
                        <h3>
                          Activity:
                          &nbsp;
                          <span>
                            {currentActivity.title}
                          </span>
                        </h3>
                      )}
                    </div>
                  </div>
                </div>
                <div className="back-header align-items-center justify-content-between">
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
                  {/* <div>
                    <Link
                      className="go-back-"
                      to={`/project/${selectedPlaylist.project.id}/preview`}
                    >
                      <FontAwesomeIcon icon="undo" className="mr-2" />
                    </Link>
                  </div> */}
                  <a
                    onClick={() => setCollapsed()}
                    className={`btn-expand-collapse${collapsed ? ' collapsed' : ''}`}
                  >
                    <FontAwesomeIcon icon="align-right" />
                  </a>
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

            <div className={`right-sidegolf-info${collapsed ? ' collapsed' : ''}`}>
              <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                <Tab eventKey="home" title="Activities">
                  <div className="all-laylist-oracle">
                    <ActivitiesList
                      projectId={projectId}
                      playlistId={playlistId}
                      activities={selectedPlaylist.activities}
                      playlist={playlist.selectedPlaylist}
                      teamPermission={teamPermission || {}}
                    />
                  </div>
                </Tab>
                {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:share-activity') : permission?.Activity?.includes('activity:share')) && (
                  <Tab eventKey="profile" title="Share">
                    <div className="watcher spaner">
                      {activityShared && (
                        <div className="shared-link" onClick={viewSharedLink}>
                          <FontAwesomeIcon icon="external-link-alt" className="mr-2" />
                          View Shared Link
                        </div>
                      )}
                      <div>
                        Share Activity
                        <Switch
                          onColor="#084892"
                          onChange={share}
                          checked={activityShared}
                          className="react-switch"
                          id="material-switch"
                          handleDiameter={30}
                          uncheckedIcon={false}
                          checkedIcon={false}
                        />
                      </div>
                    </div>
                  </Tab>
                )}
                <Tab eventKey="contact" title="About">
                  <div className="descr-">
                    <div className="tti">
                      description
                    </div>
                    <p>
                      {selectedPlaylist.project.description}
                    </p>
                  </div>
                </Tab>
              </Tabs>
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
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};

PlaylistPreview.defaultProps = {
  loading: '',
  activityId: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  loadPlaylist: (projectId, playlistId) => dispatch(loadPlaylistAction(projectId, playlistId)),
  loadProjectPlaylists: (projectId) => dispatch(loadProjectPlaylistsAction(projectId)),
  loadHP: (show) => dispatch(LoadHP(show)),
  setCollapsed: () => dispatch(collapsedSideBar()),
});

const mapStateToProps = (state) => ({
  collapsed: state.ui.sideBarCollapsed,
  playlist: state.playlist,
  loading: state.playlist.loadingH5P,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistPreview),
);
