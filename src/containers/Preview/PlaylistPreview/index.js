/* eslint-disable */
import React, { Suspense, lazy, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import DropdownActivity from 'components/ResourceCard/dropdown';
import { confirmAlert } from 'react-confirm-alert';
import { Tab, Tabs } from 'react-bootstrap';

import projectIcon from 'assets/images/svg/projectFolder.svg';
import listIcon from 'assets/images/svg/miscellaneous-list.svg';
import { loadPlaylistAction, loadProjectPlaylistsAction, LoadHP } from 'store/actions/playlist';
import { shareActivity, removeShareActivity, loadH5pResourceSettings } from 'store/actions/resource';
import { collapsedSideBar } from 'store/actions/ui';

import { getTeamPermission } from 'store/actions/team';

import PreviousLink from './components/PreviousLink';
import NextLink from './components/NextLink';
import ActivitiesList from './components/ActivitiesList';
import HeaderLogo from 'assets/images/GCLogo.png';

import './playlistPreview.scss';

const H5PPreview = lazy(() => import('../../H5PPreview'));
const ImmersiveReaderPreview = lazy(() => import('../../../components/Microsoft/ImmersiveReaderPreview'));

function PlaylistPreview(props) {
  const { loading, projectId, playlistId, activityId, playlist, loadHP, loadPlaylist, loadProjectPlaylists, collapsed, setCollapsed } = props;
  const organization = useSelector((state) => state.organization);
  const { teamPermission } = useSelector((state) => state.team);
  const [openPlaylistMenu, setPlaylistMenu] = useState(true);
  const { permission } = organization;
  const projectPreview = localStorage.getItem('projectPreview');
  // const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
    loadPlaylist(projectId, playlistId);
  }, [projectId, playlistId, activityId, loadPlaylist]);

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
      }).then(async (resp) => {
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
            <a href={`/activity/${currentActivityId}/shared`} target="_blank" rel="noreferrer" style={{ flex: 1 }}>
              <input id="urllink_clip" style={{ width: '100%' }} value={`${protocol}${window.location.host}/activity/${currentActivityId}/shared`} />
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

          <div className="close-btn flex-center">
            <button type="button" className="curriki-btn-extra" onClick={onClose}>
              Ok
            </button>
          </div>
        </div>
      ),
    });
  };
  // const goBack = () => {
  //   history.goBack();
  // };
  return (
    <section className="curriki-playlist-preview">
      <div className="project-share-preview-nav">
        <img src={HeaderLogo} />
      </div>
      <div className="curriki-playlist-preview-container">
        <div className="activity-preview-with-playlist-container">
          {/* <div className={`activity-bg left-vdo${collapsed ? ' collapsed' : ''}`}> */}

          <div className="left-activity-view">
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
              <Link
                className="close-icon"
                to={
                  projectPreview === 'true'
                    ? // eslint-disable-next-line no-restricted-globals
                      { pathname: `/org/${organization.currentOrganization?.domain}/project/${selectedPlaylist.project.id}/preview`, state: { from: location.pathname } }
                    : `/org/${organization.currentOrganization?.domain}/project/${selectedPlaylist.project.id}`
                }
              >
                <FontAwesomeIcon icon="times" />
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
                  <span>{currentActivity.title}</span>
                </h1>
              )}
              <div className="controller">
                <PreviousLink projectId={projectId} playlistId={playlistId} previousResource={previousResource} allPlaylists={allPlaylists} />
                <NextLink projectId={projectId} playlistId={playlistId} nextResource={nextResource} allPlaylists={allPlaylists} />

                {/* <a onClick={() => setCollapsed()} className={`btn-expand-collapse${collapsed ? ' collapsed' : ''}`}>
              <FontAwesomeIcon icon="align-right" />
            </a> */}
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
          {/* className={`right-sidegolf-info${collapsed ? ' collapsed' : ''}`} */}
          <div className="all-activities-of-playlist">
            <div className="list-button" onClick={() => setPlaylistMenu(!openPlaylistMenu)}>
              {openPlaylistMenu ? <FontAwesomeIcon icon="chevron-right" /> : <FontAwesomeIcon icon="chevron-left" />}
            </div>
            {openPlaylistMenu ? (
              <div className="relative-white-bg">
                <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
                  <Tab eventKey="home" title="Activities">
                    <div className="all-activities">
                      {selectedPlaylist.activities?.map((data) => (
                        <div className="each-activity">
                          <div
                            className="thumbnail"
                            style={{
                              backgroundImage:
                                !!data.thumb_url && data.thumb_url.includes('pexels.com') ? `url(${data.thumb_url})` : `url(${global.config.resourceUrl}${data.thumb_url})`,
                            }}
                          />
                          <p>{data.title}</p>
                          <DropdownActivity className="Dropdown-Activity" resource={data} playlist={playlist} teamPermission={teamPermission || {}} />
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
                    <div className="each-activity">
                      <div
                        className="thumbnail"
                        style={{
                          backgroundImage:
                            !!data.thumb_url && data.thumb_url.includes('pexels.com') ? `url(${data.thumb_url})` : `url(${global.config.resourceUrl}${data.thumb_url})`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistPreview));
