/* eslint-disable max-len */
import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

import projectIcon from 'assets/images/project_icon.svg';
import { loadPlaylistActionShared } from 'store/actions/playlist';
import ActivityPreviewCard from 'components/ActivityPreviewCard';
import ActivityPreviewCardDropdown from 'components/ActivityPreviewCard/ActivityPreviewCardDropdown';
import Unauthorized from 'components/Unauthorized';

import './style.scss';

const H5PPreview = React.lazy(() => import('../../H5PPreview'));

class LtiPlaylistPreviewShared extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resourceId: props.match.params.resourceId,
      allProjectsState: {},
      currentPlaylist: '',
      // loading: 'loading.ddd..',
    };
  }

  static getDerivedStateFromProps(nextProps) {
    if (!!nextProps.playlist.selectedPlaylist && nextProps.playlist.selectedPlaylist.project) {
      const selectedPlaylist = nextProps.playlist.selectedPlaylist.project.playlists;
      if (selectedPlaylist) {
        if (selectedPlaylist.length > 0) {
          return {
            allProjectsState: selectedPlaylist,
            currentPlaylist: nextProps.playlist.selectedPlaylist,
          };
        }

        return {
          allProjectsState: null,
          currentPlaylist: nextProps.playlist.selectedPlaylist,
        };
      }
    }

    return null;
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const { playlistId, loadLtiPlaylist } = this.props;
    loadLtiPlaylist(playlistId);
  }

  componentDidUpdate() {
    const { resourceId } = this.state;
    const { match, playlistId, loadLtiPlaylist } = this.props;
    if (resourceId !== match.params.resourceId) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        resourceId: match.params.resourceId,
      });
      loadLtiPlaylist(playlistId);
    }
  }

  handleSelect = (resourceId) => {
    if (resourceId) {
      this.setState({ resourceId });
    }
  };

  render() {
    let { resourceId } = this.state;
    const { allProjectsState, currentPlaylist } = this.state;
    const {
      history,
      playlist,
      playlistId,
      loading,
    } = this.props;
    const { selectedPlaylist } = playlist;

    if (selectedPlaylist === 'error') {
      return <Unauthorized text="Project is not public." />;
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

    if (selectedPlaylist.activities.length === 0) {
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
          activity={activity}
          key={activity.id}
          handleSelect={this.handleSelect}
          playlist={playlistId}
          lti
          shared
        />
      ));

      activities1 = selectedPlaylist.activities.map((activity) => (
        <ActivityPreviewCardDropdown
          activity={activity}
          key={activity.id}
          handleSelect={this.handleSelect}
          playlist={playlistId}
          lti
          shared
        />
      ));

      if (resourceId === 0) {
        resourceId = selectedPlaylist.activities[0].id;
      }
    }

    const currentActivity = selectedPlaylist.activities.filter((f) => f.id === resourceId)[0];

    const previousResource = selectedPlaylist.activities.indexOf(currentActivity) >= 1
      ? selectedPlaylist.activities[selectedPlaylist.activities.indexOf(currentActivity) - 1]
      : null;
    const nextResource = selectedPlaylist.activities.indexOf(currentActivity) !== selectedPlaylist.activities.length - 1
      ? selectedPlaylist.activities[selectedPlaylist.activities.indexOf(currentActivity) + 1]
      : null;

    // let previousLink = null;
    let previousLink1 = null;
    if (previousResource) {
      // previousLink = (
      //   <a
      //     href="#"
      //     className="slide-control prev"
      //     onClick={() => this.handleSelect(previousResource.id)}
      //   >
      //     <FontAwesomeIcon icon="arrow-left" />
      //     <span> previous Activity</span>
      //   </a>
      // );

      previousLink1 = (
        <div className="slider-hover-section">
          <Link to={playlistId && `/playlist/shared/preview/${playlistId}/resource/${previousResource.id}`}>
            {' '}
            <FontAwesomeIcon icon="chevron-left" />
          </Link>

          <div className="hover-control-caption pointer-cursor">
            <Link to={playlistId && `/playlist/shared/preview/${playlistId}/resource/${previousResource.id}`}>
              <div
                style={{
                  backgroundImage: previousResource.thumbUrl
                    ? previousResource.thumbUrl.includes('pexels.com')
                      ? `url(${previousResource.thumbUrl})`
                      : `url(${global.config.laravelAPIUrl}${previousResource.thumbUrl})`
                    : 'url(data:image/jpeg;base64,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)',
                }}
                className="img-in-hover"
              />
              <span>{previousResource.title}</span>
            </Link>
          </div>
        </div>
      );
    } else {
      // previousLink = (
      //   <a href="#" className="slide-control prev disabled-link">
      //     <FontAwesomeIcon icon="chevron-left" />
      //     <span> previous Activity</span>
      //   </a>
      // );

      previousLink1 = (
        <div className="slider-hover-section">
          <Link>
            <FontAwesomeIcon icon="chevron-left" />
          </Link>

          <div className="hover-control-caption pointer-cursor no-data prev">
            <div className="slider-end">
              <p>Welcome! You are at the beginning of this playlist.</p>

              <Link
                onClick={() => {
                  for (let data = 0; data < allProjectsState.length; data += 1) {
                    if (allProjectsState[data].id === currentPlaylist.id) {
                      try {
                        history.push(`/playlist/shared/preview/${allProjectsState[data - 1].id}/resource/${allProjectsState[data - 1].activities[0].id}`);
                      } catch (e) {
                        Swal.fire({
                          text: 'You are at the beginning of this project. Would you like to return to the project preview?',
                          showCancelButton: true,
                          confirmButtonColor: '#3085d6',
                          cancelButtonColor: '#d33',
                          confirmButtonText: 'Yes',
                        }).then((result) => {
                          if (result.value) {
                            history.push(`/project/preview2/${selectedPlaylist.project.id}`);
                          }
                        });
                      }
                    }
                  }
                }}
              >
                <FontAwesomeIcon icon="chevron-left" />
                {' '}
                Switch to previous playlist
              </Link>
            </div>
          </div>
        </div>
      );
    }

    // let nextLink = null;
    let nextLink1 = null;
    if (nextResource) {
      // nextLink = (
      //   <a
      //     className="slide-control next"
      //     onClick={() => this.handleSelect(nextResource.id)}
      //   >
      //     <FontAwesomeIcon icon="arrow-right" />
      //     <span> Next Activity</span>
      //   </a>
      // );

      nextLink1 = (
        <div className="slider-hover-section">
          <Link to={playlistId && `/playlist/shared/preview/${playlistId}/resource/${nextResource.id}`}>
            <FontAwesomeIcon icon="chevron-right" />
          </Link>

          <div className="hover-control-caption pointer-cursor">
            <Link to={playlistId && `/playlist/shared/preview/${playlistId}/resource/${nextResource.id}`}>
              <div
                style={{
                  backgroundImage: nextResource.thumbUrl
                    ? nextResource.thumbUrl.includes('pexels.com')
                      ? `url(${nextResource.thumbUrl})`
                      : `url(${global.config.laravelAPIUrl}${nextResource.thumbUrl})`
                    : 'url(data:image/jpeg;base64,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)',
                }}
                className="img-in-hover"
              />
              <span>{nextResource.title}</span>
            </Link>
          </div>
        </div>
      );
    } else {
      // nextLink = (
      //   <a href="#" className="slide-control next disabled-link">
      //     <FontAwesomeIcon icon="arrow-right" />
      //     <span> Next Activity</span>
      //     {/* <div className="hover-control-caption pointer-cursor">
      //       <img alt="thumb01" />
      //       <span></span>
      //     </div> */}
      //   </a>
      // );

      nextLink1 = (
        <div className="slider-hover-section">
          <Link>
            <FontAwesomeIcon icon="chevron-right" />
          </Link>

          <div className="hover-control-caption pointer-cursor no-data">
            <div className="slider-end">
              <p>Hooray! You did it! There are no more activities in this playlist.</p>

              <Link
                onClick={() => {
                  for (let data = 0; data < allProjectsState.length; data += 1) {
                    if (allProjectsState[data].id === currentPlaylist.id) {
                      try {
                        history.push(`/playlist/shared/preview/${allProjectsState[data + 1].id}/resource/${allProjectsState[data + 1].activities[0].id}`);
                      } catch (e) {
                        Swal.fire({
                          text: 'You are at the end of this project. Would you like to return to the project preview?',
                          showCancelButton: true,
                          confirmButtonColor: '#4646c4',
                          cancelButtonColor: '#d33',
                          cancelButtonText: 'No',
                          confirmButtonText: 'Yes',
                        }).then((result) => {
                          if (result.value) {
                            history.push(`/project/preview2/${selectedPlaylist.project.id}`);
                          }
                        });
                      }
                    }
                  }
                }}
              >
                Switch to next playlist
                {' '}
                <FontAwesomeIcon icon="chevron-right" />
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return (
      <>
        {loading ? (
          <div className="loading-phf-data">
            {loading === 'loading...' ? (
              <Unauthorized text={loading} />
            ) : (
              <Unauthorized
                text="You are unauthorized to access this!"
                showButton
              />
            )}
          </div>
        ) : (
          <section className="main-page-content preview">
            <div className="container-flex-upper">
              <Link onClick={history.goBack}>
                <div className="project-title">
                  <img src={projectIcon} alt="" />
                  Project :
                  {' '}
                  {selectedPlaylist.project.name}
                </div>
              </Link>

              <Link to={`/project/${selectedPlaylist.project.id}`}>
                {' '}
                <FontAwesomeIcon icon="times" />
              </Link>
            </div>

            <div className="flex-container">
              <div className="activity-bg left-vdo">
                <div className="flex-container-preview">
                  <div className="act-top-header">
                    <div className="heading-wrapper">
                      <div className="main-heading">
                        {/* <span>You are Watching:</span> */}

                        {selectedPlaylist.activities && selectedPlaylist.activities.length
                          ? selectedPlaylist.activities.filter((a) => a.id === resourceId).length > 0
                            ? selectedPlaylist.activities.filter((a) => a.id === resourceId)[0].title
                            : ''
                          : ''}
                      </div>
                      {/* <div className="sub-heading">
                        <span>From the playlist:</span>
                        {selectedPlaylist ? selectedPlaylist.title : ""}
                      </div> */}
                    </div>
                  </div>

                  <div className="right-control vd-controls">
                    <div className="slider-btn">
                      {previousLink1}
                      {nextLink1}
                    </div>

                    {/* <div className="dropdown">
                      <button
                        className="btn"
                        type="button"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <FontAwesomeIcon icon="ellipsis-v" />
                      </button>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        {/* {nextLink}
                        {previousLink}
                        <Link
                          to={`/project/preview2/${selectedPlaylist.project.id}`}
                          className="slide-control"
                        >
                          <FontAwesomeIcon icon="share" />
                          Back to Project
                        </Link>
                        <Link
                          to={`/project/${selectedPlaylist.project.id}`}
                          className="slide-control"
                        >
                          <FontAwesomeIcon icon="times-circle" />
                          Exit
                        </Link>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="main-item-wrapper">
                  <div className="item-container">
                    {/* <img src="/images/video-thumbnail.jpg" alt="video-thumbnail" /> */}
                    <Suspense fallback={<div>Loading</div>}>
                      {resourceId ? (
                        <H5PPreview
                          {...this.state}
                          resourceId={resourceId}
                          tokenrequire
                          showLtiPreview
                        />
                      ) : (
                        <H5PPreview
                          {...this.state}
                          showLtiPreview
                          resourceId={selectedPlaylist && selectedPlaylist.activities[0].id}
                        />
                      )}
                    </Suspense>
                    {/* <div className="item-caption-bottom">
                      <p>
                        {selectedPlaylist.activities && selectedPlaylist.activities.length
                          ? selectedPlaylist.activities.filter((a) => a.id === resourceId).length > 0
                            ? selectedPlaylist.activities.filter((a) => a.id === resourceId)[0].title
                            : ''
                          : ''}
                      </p>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="right-sidegolf-info">
                <div className="back-header">
                  <div>
                    {' '}
                    <Link
                      className="go-back-button-preview"
                      onClick={history.goBack}
                    >
                      <FontAwesomeIcon icon="undo" />
                      Back to Project
                    </Link>
                  </div>

                  <div className="dropdown">
                    <button
                      className="btn"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon="ellipsis-v" />
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <ul>{activities1}</ul>
                    </div>
                  </div>

                  {/* <Link
                    to={`/project/preview2/${selectedPlaylist.project.id}`}
                    className="link"
                  >
                    <img src="/images/right-arrow.png" className="back-arrow" />
                    Back to {selectedPlaylist.project.name}
                  </Link> */}
                </div>

                {/* <button
                  type="button"
                  data-toggle="collapse"
                  aria-expanded="false"
                >
                  <div className="sub-heading">
                    <div className="line">
                      <span>From the playlist:</span>
                      {selectedPlaylist ? selectedPlaylist.title : ""}
                    </div>
                    <div>
                      <FontAwesomeIcon icon="angle-up" />
                    </div>
                  </div>
                </button> */}

                <div className="scrollDiv long">
                  <div className="watcher">
                    You are watching from
                    {' '}
                    <span>
                      {playlist.title}
                      {' '}
                    </span>
                  </div>
                  <ul className="slider-scroll-auto">{activities}</ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    );
  }
}

LtiPlaylistPreviewShared.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  playlistId: PropTypes.string.isRequired,
  loading: PropTypes.string,
  loadLtiPlaylist: PropTypes.func.isRequired,
};

LtiPlaylistPreviewShared.defaultProps = {
  loading: '',
};

const mapDispatchToProps = (dispatch) => ({
  loadLtiPlaylist: (playlistId) => dispatch(loadPlaylistActionShared(playlistId)),
});

const mapStateToProps = (state) => ({
  playlist: state.playlist,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LtiPlaylistPreviewShared),
);
