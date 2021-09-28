import React, { Suspense, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Tab, Tabs } from 'react-bootstrap';

import { collapsedSideBar } from 'store/actions/ui';
import projectIcon from 'assets/images/project_icon.svg';
import { loadLtiPlaylistAction, loadProjectPlaylistsAction } from 'store/actions/playlist';
import PreviousLink from './components/PreviousLink';
import NextLink from './components/NextLink';
import ActivitiesDropdown from './components/ActivitiesDropdown';

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
    setCollapsed,
    collapsed,
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

  if (playlist.isNonAvailablePlaylist) {
    return (
      <div
        className="alert alert-danger"
        role="alert"
        style={{ fontSize: '1.5em' }}
      >
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
    <section className="main-page-content preview iframe-height-resource">
      <div className="container-flex-upper">
        <div className="both-p">
          <Link>
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
        { localStorage.getItem('lti_activity') === 'false' && (
        <Link to={`/studio/project/${selectedPlaylist.project.id}/shared`}>
          <FontAwesomeIcon icon="times" />
        </Link>
        )}
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

            <div className="right-control vd-controls">
              <div className="slider-btn">
                <PreviousLink
                  showLti={showLti}
                  playlistId={playlistId}
                  previousResource={previousResource}
                  allPlaylists={allPlaylists}
                  projectId={selectedPlaylist.project_id}
                />
                <NextLink
                  showLti={showLti}
                  playlistId={playlistId}
                  nextResource={nextResource}
                  allPlaylists={allPlaylists}
                  projectId={selectedPlaylist.project_id}
                />
              </div>
            </div>
            <a
              onClick={() => setCollapsed()}
              className={`btn-expand-collapse${collapsed ? ' collapsed' : ''}`}
            >
              <FontAwesomeIcon icon="align-right" />
            </a>
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
        <div className={`right-sidegolf-info${collapsed ? ' collapsed' : ''}`}>
          <Tabs defaultActiveKey="home" id="uncontrolled-tab-example">
            <Tab eventKey="home" title="Activities">
              <div className="all-laylist-oracle">
                <ActivitiesDropdown
                  showLti
                  playlistId={playlistId}
                  activities={selectedPlaylist.activities}
                />
              </div>
            </Tab>
            {/* <Tab eventKey="contact" title="About">
              <div className="descr-">
                <div className="tti">
                  description
                </div>
                <p>
                  {selectedPlaylist.project.description}
                </p>
              </div>
            </Tab> */}
          </Tabs>
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
  collapsed: PropTypes.bool.isRequired,
  setCollapsed: PropTypes.func.isRequired,
};

LtiPlaylistPreview.defaultProps = {
  showLti: false,
  activityId: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  loadLtiPlaylist: (playlistId) => dispatch(loadLtiPlaylistAction(playlistId)),
  loadProjectPlaylists: (projectId) => dispatch(loadProjectPlaylistsAction(projectId)),
  setCollapsed: () => dispatch(collapsedSideBar()),
});

const mapStateToProps = (state) => ({
  playlist: state.playlist,
  collapsed: state.ui.sideBarCollapsed,
});

export default connect(mapStateToProps, mapDispatchToProps)(LtiPlaylistPreview);
