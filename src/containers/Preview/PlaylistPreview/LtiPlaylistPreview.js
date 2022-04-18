/* eslint-disable */
import React, { Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';

import { collapsedSideBar } from 'store/actions/ui';
import projectIcon from 'assets/images/svg/projectFolder.svg';
import listIcon from 'assets/images/svg/miscellaneous-list.svg';
import rightIcon from 'assets/images/svg/right.svg';
import { loadLtiPlaylistAction, loadProjectPlaylistsAction, loadSingleSharedPlaylist, searchPreviewPlaylistAction } from 'store/actions/playlist';
import PreviousLink from './components/PreviousLink';
import NextLink from './components/NextLink';
import ActivitiesDropdown from './components/ActivitiesDropdown';
import HeaderLogo from 'assets/images/GCLogo.png';

import './playlistPreview.scss';

const H5PPreview = React.lazy(() => import('../../H5PPreview'));

function LtiPlaylistPreview(props) {
  const { playlist, playlistId, activityId, projectId, showLti, loadLtiPlaylist, loadSharedPlaylist, loadProjectPlaylists, searchPreviewPlaylist, setCollapsed, collapsed } = props;
  const { activeOrganization } = useSelector((state) => state.organization);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (window.location.pathname.includes('/shared') && playlistId && projectId) {
      loadSharedPlaylist(projectId, playlistId);
    } else if (window.location.pathname.includes('/preview/lti') && playlistId) {
      loadLtiPlaylist(playlistId);
    } else if (window.location.pathname.includes('/preview') && playlistId && activeOrganization?.id) {
      searchPreviewPlaylist(playlistId);
    }
  }, [playlistId, activityId, loadLtiPlaylist, loadSharedPlaylist, projectId, activeOrganization?.id, searchPreviewPlaylist]);

  let { selectedPlaylist } = playlist;
  useEffect(() => {
    if (selectedPlaylist) {
      loadProjectPlaylists(selectedPlaylist.project_id);
    }
  }, [selectedPlaylist]);
  if (selectedPlaylist && selectedPlaylist.id !== playlistId) {
    selectedPlaylist = null;
  }

  if (playlist.isNonAvailablePlaylist) {
    return (
      <div className="alert alert-danger" role="alert" style={{ fontSize: '1.5em' }}>
        Playlist is not available.
      </div>
    );
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
                <PreviousLink showLti={showLti} playlistId={playlistId} previousResource={previousResource} allPlaylists={allPlaylists} projectId={selectedPlaylist.project_id} />
                <NextLink showLti={showLti} playlistId={playlistId} nextResource={nextResource} allPlaylists={allPlaylists} projectId={selectedPlaylist.project_id} />

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
            <div className="relative-white-bg">
              <div className="list-button">
                <img src={rightIcon} alt="" />
              </div>
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
                      </div>
                    ))}
                  </div>
                </Tab>
              </Tabs>
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
  projectId: PropTypes.number,
  activityId: PropTypes.number,
  showLti: PropTypes.bool,
  loadLtiPlaylist: PropTypes.func.isRequired,
  loadSharedPlaylist: PropTypes.func.isRequired,
  loadProjectPlaylists: PropTypes.func.isRequired,
  searchPreviewPlaylist: PropTypes.func.isRequired,
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};

LtiPlaylistPreview.defaultProps = {
  showLti: false,
  activityId: undefined,
  projectId: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  loadLtiPlaylist: (playlistId) => dispatch(loadLtiPlaylistAction(playlistId)),
  loadSharedPlaylist: (projectId, playlistId) => dispatch(loadSingleSharedPlaylist(projectId, playlistId)),
  loadProjectPlaylists: (projectId) => dispatch(loadProjectPlaylistsAction(projectId)),
  searchPreviewPlaylist: (playlistId) => dispatch(searchPreviewPlaylistAction(playlistId)),
  setCollapsed: () => dispatch(collapsedSideBar()),
});

const mapStateToProps = (state) => ({
  playlist: state.playlist,
  collapsed: state.ui.sideBarCollapsed,
});

export default connect(mapStateToProps, mapDispatchToProps)(LtiPlaylistPreview);
