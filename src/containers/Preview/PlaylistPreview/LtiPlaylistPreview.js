/* eslint-disable max-len */
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';

import projectIcon from 'assets/images/project_icon.svg';
import { loadLtiPlaylistAction } from 'store/actions/playlist';
import ActivityPreviewCard from 'components/ActivityPreviewCard';
import ActivityPreviewCardDropdown from 'components/ActivityPreviewCard/ActivityPreviewCardDropdown';

import './style.scss';

const H5PPreview = React.lazy(() => import('../../H5PPreview'));

class LtiPlaylistPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activityId: props.activityId,
      allPlaylists: [],
      currentPlaylist: {},
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (!!nextProps.playlist.selectedPlaylist && nextProps.playlist.selectedPlaylist.project) {
      const selectedPlaylists = nextProps.playlist.selectedPlaylist.project.playlists;
      if (selectedPlaylists && selectedPlaylists.length > 0) {
        return {
          allPlaylists: selectedPlaylists,
          currentPlaylist: nextProps.playlist.selectedPlaylist,
        };
      }

      return {
        allPlaylists: [],
        currentPlaylist: nextProps.playlist.selectedPlaylist,
      };
    }

    return null;
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const { playlistId, loadLtiPlaylist } = this.props;
    loadLtiPlaylist(playlistId);
  }

  componentDidUpdate() {
    const { activityId } = this.state;
    const {
      playlistId,
      activityId: aId,
      loadLtiPlaylist,
    } = this.props;

    if (activityId !== aId) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        activityId: aId,
      });

      loadLtiPlaylist(playlistId);
    }
  }

  handleSelect = (activityId) => {
    if (activityId) {
      this.setState({ activityId });
    }
  };

  render() {
    let { activityId } = this.state;
    const { allPlaylists, currentPlaylist } = this.state;
    const {
      history,
      playlist,
      playlistId,
      showLti,
    } = this.props;

    let { selectedPlaylist } = playlist;
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

    let activities;
    let activities1;

    let currentActivity;
    let previousResource = null;
    let nextResource = null;

    if (!selectedPlaylist.activities || selectedPlaylist.activities.length === 0) {
      activities = (
        <div className="col-md-12">
          <div className="alert alert-info" role="alert">
            No activities defined for this playlist.
          </div>
        </div>
      );

      activities1 = (
        <div className="col-md-12">
          <div className="alert alert-info" role="alert">
            No activities defined for this playlist.
          </div>
        </div>
      );
    } else {
      activities = selectedPlaylist.activities.map((activity) => (
        <ActivityPreviewCard
          key={activity.id}
          showLti
          activity={activity}
          playlistId={playlistId}
          handleSelect={this.handleSelect}
        />
      ));

      activities1 = selectedPlaylist.activities.map((activity) => (
        <ActivityPreviewCardDropdown
          key={activity.id}
          showLti
          activity={activity}
          playlistId={playlistId}
          handleSelect={this.handleSelect}
        />
      ));

      if (activityId === null || activityId === undefined) {
        activityId = selectedPlaylist.activities[0].id;
      }

      currentActivity = selectedPlaylist.activities.find((f) => f.id === activityId);

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

    let previousLink1;
    if (previousResource) {
      previousLink1 = (
        <div className="slider-hover-section">
          <Link to={`/playlist/${playlistId}/activity/${previousResource.id}/preview/lti`}>
            <FontAwesomeIcon icon="chevron-left" />
          </Link>

          <div className="hover-control-caption pointer-cursor">
            <Link to={`/playlist/${playlistId}/activity/${previousResource.id}/preview/lti`}>
              <div
                className="img-in-hover"
                style={{
                  backgroundImage: previousResource.thumb_url
                    ? previousResource.thumb_url.includes('pexels.com')
                      ? `url(${previousResource.thumb_url})`
                      : `url(${global.config.resourceUrl}${previousResource.thumb_url})`
                    : 'url(data:image/jpeg;base64,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)',
                }}
              />
              <span>{previousResource.title}</span>
            </Link>
          </div>
        </div>
      );
    } else {
      previousLink1 = (
        <div className="slider-hover-section">
          <Link to="#">
            <FontAwesomeIcon icon="chevron-left" />
          </Link>

          <div className="hover-control-caption pointer-cursor no-data prev">
            <div className="slider-end">
              <p>Welcome! You are at the beginning of this playlist.</p>
              <Link
                to="#"
                onClick={() => {
                  for (let i = 0; i < allPlaylists.length; i += 1) {
                    if (allPlaylists[i].id === currentPlaylist.id) {
                      try {
                        history.push(`/playlist/${allPlaylists[i - 1].id}/activity/${allPlaylists[i - 1].activities[0].id}/preview/lti`);
                      } catch (e) {
                        Swal.fire({
                          text: 'You are at the beginning of this project.',
                        });
                      }
                    }
                  }
                }}
              >
                <FontAwesomeIcon icon="chevron-left" className="mr-2" />
                Switch to previous playlist
              </Link>
            </div>
          </div>
        </div>
      );
    }

    let nextLink1;
    if (nextResource) {
      nextLink1 = (
        <div className="slider-hover-section">
          <Link to={`/playlist/${playlistId}/activity/${nextResource.id}/preview/lti`}>
            <FontAwesomeIcon icon="chevron-right" />
          </Link>
          <div className="hover-control-caption pointer-cursor">
            <Link to={`/playlist/${playlistId}/activity/${nextResource.id}/preview/lti`}>
              <div
                className="img-in-hover"
                style={{
                  backgroundImage: nextResource.thumb_url
                    ? nextResource.thumb_url.includes('pexels.com')
                      ? `url(${nextResource.thumb_url})`
                      : `url(${global.config.resourceUrl}${nextResource.thumb_url})`
                    : 'url(data:image/jpeg;base64,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)',
                }}
              />
              <span>{nextResource.title}</span>
            </Link>
          </div>
        </div>
      );
    } else {
      nextLink1 = (
        <div className="slider-hover-section">
          <Link to="#">
            <FontAwesomeIcon icon="chevron-right" />
          </Link>

          <div className="hover-control-caption pointer-cursor no-data">
            <div className="slider-end">
              <p>Hooray! You did it! There are no more activities in this playlist.</p>
              <Link
                to="#"
                onClick={() => {
                  for (let i = 0; i < allPlaylists.length; i += 1) {
                    if (allPlaylists[i].id === currentPlaylist.id) {
                      try {
                        history.push(`/playlist/${allPlaylists[i + 1].id}/activity/${allPlaylists[i + 1].activities[0].id}/preview/lti`);
                      } catch (e) {
                        Swal.fire({
                          text: 'You are at the end of this project.',
                        });
                      }
                    }
                  }
                }}
              >
                Switch to next playlist
                <FontAwesomeIcon icon="chevron-right" className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <section className="main-page-content preview">
        <div className="container-flex-upper">
          <div className="project-title">
            <img src={projectIcon} alt="" />
            {showLti
              ? `Playlist :${selectedPlaylist.title}`
              : `Project :${selectedPlaylist.project.name}`}
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
                  {previousLink1}
                  {nextLink1}
                </div>
              </div>
            </div>

            <div className="main-item-wrapper">
              <div className="item-container">
                {!!currentActivity && (
                  <Suspense fallback={<div>Loading</div>}>
                    <H5PPreview showLtiPreview activityId={currentActivity.id} />
                  </Suspense>
                )}
              </div>
            </div>
          </div>

          <div className="right-sidegolf-info">
            <div className="back-header align-items-center justify-content-between">
              <Dropdown className="ml-auto playlist-dropdown check">
                <Dropdown.Toggle className="playlist-dropdown-btn">
                  <FontAwesomeIcon icon="ellipsis-v" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  {activities1}
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

              <ul className="slider-scroll-auto">{activities}</ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

LtiPlaylistPreview.propTypes = {
  history: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  playlistId: PropTypes.number,
  activityId: PropTypes.number,
  showLti: PropTypes.bool,
  loadLtiPlaylist: PropTypes.func.isRequired,
};

LtiPlaylistPreview.defaultProps = {
  showLti: false,
  playlistId: undefined,
  activityId: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  loadLtiPlaylist: (playlistId) => dispatch(loadLtiPlaylistAction(playlistId)),
});

const mapStateToProps = (state) => ({
  playlist: state.playlist,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LtiPlaylistPreview),
);
