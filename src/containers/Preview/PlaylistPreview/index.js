/* eslint-disable max-len */
import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { Dropdown } from 'react-bootstrap';
import Switch from 'react-switch';
import { confirmAlert } from 'react-confirm-alert';

import projectIcon from 'assets/images/project_icon.svg';
import { loadPlaylistAction, LoadHP } from 'store/actions/playlist';
import { resourceShared, resourceUnshared } from 'store/actions/resource';
import ActivityPreviewCard from 'components/ActivityPreviewCard';
import ActivityPreviewCardDropdown from 'components/ActivityPreviewCard/ActivityPreviewCardDropdown';
import Unauthorized from 'components/Unauthorized';

import './style.scss';

const H5PPreview = lazy(() => import('../../H5PPreview'));
const ImmersiveReaderPreview = lazy(() => import('../../../components/Microsoft/ImmersiveReaderPreview'));

// TODO: need to refactor
class PlaylistPreview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resourceId: props.resourceId,
      resourceTitle: '',
      playlists: [],
      currentPlaylist: '',
      activeShared: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.projects.length > 0 && !!nextProps.playlist.selectedPlaylist) {
      const selectedProject = nextProps.projects.find((data) => data.id === nextProps.projectId);
      if (selectedProject) {
        let currentActivity;
        if (nextProps.playlist.selectedPlaylist && nextProps.playlist.selectedPlaylist.activities) {
          currentActivity = nextProps.playlist.selectedPlaylist.activities.find(
            (a) => a.id === prevState.resourceId,
          );
        }

        let activeShared;
        if (currentActivity) {
          activeShared = currentActivity.length > 0 && currentActivity[0].shared;
        }

        return {
          playlists: selectedProject.playlists,
          currentPlaylist: nextProps.playlist.selectedPlaylist,
          activeShared: !!activeShared,
        };
      }

      return {
        playlists: [],
        currentPlaylist: nextProps.playlist.selectedPlaylist,
      };
    }

    return null;
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const {
      // loading,
      projectId,
      playlistId,
      // resourceId,
      // loadHP,
      loadPlaylist,
    } = this.props;

    loadPlaylist(projectId, playlistId);

    const checkValidResource = async () => {
      // const token = JSON.parse(localStorage.getItem(USER_TOKEN_KEY));
      // if (loading) {
      //   axios
      //     .post(
      //       `${global.config.laravelAPIUrl}/h5p-resource-settings`,
      //       { resourceId },
      //       { headers: { Authorization: `Bearer ${token}` } },
      //     )
      //     .then((response) => {
      //       if (response.data.status === 'success') {
      //         loadHP(null);
      //       } else {
      //         loadHP(response.data.status);
      //       }
      //     })
      //     .catch((/* error */) => {
      //       // console.log(error);
      //     });
      // }
    };

    checkValidResource();
  }

  handleSelect = (resourceId) => {
    if (resourceId) {
      this.setState({ resourceId });
    }
  };

  render() {
    let { resourceId } = this.state;
    const { playlists, currentPlaylist, activeShared } = this.state;
    const {
      history,
      playlist: { selectedPlaylist },
      projectId,
      playlistId,
      projects,
      loading,
      loadPlaylist,
    } = this.props;

    if (!selectedPlaylist) {
      return (
        <div className="alert alert-info" role="alert">
          Loading...
        </div>
      );
    }

    let activities;
    let activities1;

    // let previousLink = null;
    let previousLink1 = null;
    // let nextLink = null;
    let nextLink1 = null;

    let currentActivity;

    const currentProject = projects.find((p) => p.id === projectId);

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
          activity={activity}
          handleSelect={this.handleSelect}
          playlistId={playlistId}
        />
      ));
      activities1 = selectedPlaylist.activities.map((activity) => (
        <ActivityPreviewCardDropdown
          key={activity.id}
          activity={activity}
          handleSelect={this.handleSelect}
          playlistId={playlistId}
        />
      ));

      if (resourceId === 0) {
        resourceId = selectedPlaylist.activities[0].id;
      }

      const currentIndex = selectedPlaylist.activities.findIndex((f) => f.id === resourceId);
      if (currentIndex > -1) {
        currentActivity = selectedPlaylist.activities[currentIndex];
      }

      const previousResource = currentIndex > 0 ? selectedPlaylist.activities[currentIndex - 1] : null;
      const nextResource = currentIndex < selectedPlaylist.activities.length - 1
        ? selectedPlaylist.activities[currentIndex + 1]
        : null;

      if (previousResource) {
        // previousLink = (
        //   <a
        //     href="#"
        //     className="slide-control prev"
        //     onClick={() => this.handleSelect(previousResource.id)}
        //   >
        //     <FontAwesomeIcon icon="arrow-left" />
        //     <span>Previous Activity</span>
        //   </a>
        // );

        previousLink1 = (
          <div className="slider-hover-section">
            <Link to={`/playlist/preview/${playlistId}/resource/${previousResource.id}`}>
              <FontAwesomeIcon icon="chevron-left" />
            </Link>

            <div className="hover-control-caption pointer-cursor">
              <Link to={`/playlist/preview/${playlistId}/resource/${previousResource.id}`}>
                <div
                  className="img-in-hover"
                  style={{
                    backgroundImage: previousResource.metadata
                      ? previousResource.metadata.thumbUrlType === 'pexels'
                        ? `url(${previousResource.metadata.thumbUrl})`
                        : `url(${global.config.resourceUrl}${previousResource.metadata.thumbUrl})`
                      : 'url(data:image/jpeg;base64,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)',
                  }}
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
                    for (let i = 0; i < playlists.length; i += 1) {
                      if (playlists[i].id === currentPlaylist.id) {
                        try {
                          history.push(
                            `/playlist/preview/${playlists[i - 1].id}/resource/${playlists[i - 1].activities[0].id}`,
                          );
                        } catch (e) {
                          Swal.fire({
                            text: 'You are at the beginning of this project. Would you like to return to the project preview?',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes',
                          }).then((result) => {
                            if (result.value) {
                              history.push(`/project/preview2/${projectId}`);
                            }
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

      if (nextResource) {
        // nextLink = (
        //   <a
        //     className="slide-control next"
        //     onClick={() => this.handleSelect(nextResource.id)}
        //   >
        //     <FontAwesomeIcon icon="arrow-right" />
        //     <span>Next Activity</span>
        //   </a>
        // );

        nextLink1 = (
          <div className="slider-hover-section">
            <Link to={`/playlist/preview/${playlistId}/resource/${nextResource.id}`}>
              <FontAwesomeIcon icon="chevron-right" />
            </Link>

            <div className="hover-control-caption pointer-cursor">
              <Link to={`/playlist/preview/${playlistId}/resource/${nextResource.id}`}>
                <div
                  className="img-in-hover"
                  style={{
                    backgroundImage: nextResource.metadata
                      ? nextResource.metadata.thumbUrlType === 'pexels'
                        ? `url(${nextResource.metadata.thumbUrl})`
                        : `url(${global.config.resourceUrl}${nextResource.metadata.thumbUrl})`
                      : 'url(data:image/jpeg;base64,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)',
                  }}
                />
              </Link>
              <span>{nextResource.title}</span>
            </div>
          </div>
        );
      } else {
        // nextLink = (
        //   <a href="#" className="slide-control next disabled-link">
        //     <FontAwesomeIcon icon="arrow-right" />
        //     <span>Next Activity</span>
        //
        //     {/*
        //     <div className="hover-control-caption pointer-cursor">
        //       <img alt="thumb01" />
        //       <span />
        //     </div>
        //     */}
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
                    for (let i = 0; i < playlists.length; i += 1) {
                      if (playlists[i].id === currentPlaylist.id) {
                        try {
                          history.push(
                            `/playlist/preview/${playlists[i + 1].id}/resource/${playlists[i + 1].activities[0].id}`,
                          );
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
                              history.push(`/project/preview2/${projectId}`);
                            }
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
    }

    return (
      <>
        {!loading ? (
          <div className="loading-phf-data">
            {loading === 'loading...' ? (
              <Unauthorized text="Loading..." />
            ) : (
              <Unauthorized showButton text="You are unauthorized to access this!" />
            )}
          </div>
        ) : (
          <section className="main-page-content preview">
            <div className="container-flex-upper">
              <Link to={`/project/preview2/${projectId}`}>
                <div className="project-title">
                  <img src={projectIcon} alt="" />
                  Project :
                  {' '}
                  {currentProject && currentProject.name}
                </div>
              </Link>

              <Link to={`/project/${projectId}`}>
                <FontAwesomeIcon icon="times" />
              </Link>
            </div>

            <div className="flex-container">
              <div className="activity-bg left-vdo">
                <div className="flex-container-preview">
                  <div className="act-top-header">
                    <div className="heading-wrapper">
                      <div className="main-heading">
                        {selectedPlaylist.activities && selectedPlaylist.activities.length
                          ? selectedPlaylist.activities.filter((a) => a.id === resourceId).length > 0
                            ? selectedPlaylist.activities.filter((a) => a.id === resourceId)[0].title
                            : ''
                          : ''}
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
                        {currentActivity.type === 'h5p' ? (
                          <H5PPreview {...this.state} resourceId={resourceId} />
                        ) : (
                          <ImmersiveReaderPreview activity={currentActivity} />
                        )}
                      </Suspense>
                    )}
                  </div>
                </div>
              </div>

              <div className="right-sidegolf-info">
                <div className="back-header">
                  <div>
                    <Link
                      className="go-back-button-preview"
                      to={`/project/preview2/${projectId}`}
                    >
                      <FontAwesomeIcon icon="undo" className="mr-2" />
                      Back to Project
                    </Link>
                  </div>

                  <Dropdown className="preview-dropdown check">
                    <Dropdown.Toggle className="btn">
                      <FontAwesomeIcon icon="ellipsis-v" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {activities1}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>

                <div className="scrollDiv long">
                  <div className="watcher spaner">
                    <div>
                      Share Activity
                      <Switch
                        onColor="#5952c6"
                        onChange={() => {
                          const activityTitle = selectedPlaylist.activities && selectedPlaylist.activities.length
                            ? selectedPlaylist.activities.filter((a) => a.id === resourceId).length > 0
                              ? selectedPlaylist.activities.filter((a) => a.id === resourceId)[0].title
                              : ''
                            : '';
                          if (activeShared) {
                            Swal.fire({
                              icon: 'warning',
                              title: `You are about to stop sharing <strong>${activityTitle}</strong>
                                Please remember that anyone you have shared this activity with will no longer have access its contents.
                                Do you want to continue?`,
                              showCloseButton: true,
                              showCancelButton: true,
                              focusConfirm: false,
                              confirmButtonText: 'Stop Sharing!',
                              confirmButtonAriaLabel: 'Stop Sharing!',
                              cancelButtonText: 'Cancel',
                              cancelButtonAriaLabel: 'Cancel',
                            }).then((resp) => {
                              if (resp.isConfirmed) {
                                resourceUnshared(resourceId, activityTitle);
                                loadPlaylist(projectId, playlistId);
                              }
                            });
                          } else {
                            resourceShared(resourceId, activityTitle);
                            loadPlaylist(projectId, playlistId);
                          }
                        }}
                        checked={activeShared}
                        className="react-switch"
                        id="material-switch"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                      />
                    </div>

                    {activeShared && (
                      <div
                        className="shared-link"
                        onClick={() => {
                          const protocol = `${window.location.href.split('/')[0]}//`;
                          confirmAlert({
                            customUI: ({ onClose }) => (
                              <div className="share-project-preview-url project-share-check">
                                <br />

                                <a
                                  target="_blank"
                                  href={`/shared/activity/${resourceId.trim()}`}
                                  rel="noopener noreferrer"
                                >
                                  <input
                                    id="urllink_clip"
                                    value={`${protocol + window.location.host}/shared/activity/${resourceId}`}
                                  />
                                </a>

                                <FontAwesomeIcon
                                  title="copy to clipboard"
                                  icon="clipboard"
                                  onClick={() => {
                                    /* Get the text field */
                                    const copyText = document.getElementById('urllink_clip');

                                    /* Select the text field */
                                    copyText.focus();
                                    copyText.select();
                                    // copyText.setSelectionRange(0, 99999); /* For mobile devices */

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
                                <br />

                                <div className="close-btn">
                                  <button type="button" onClick={onClose}>Ok</button>
                                </div>
                              </div>
                            ),
                          });
                          // confirmAlert();
                        }}
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

PlaylistPreview.propTypes = {
  history: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
  playlistId: PropTypes.number.isRequired,
  resourceId: PropTypes.number,
  loading: PropTypes.string,
  projects: PropTypes.array.isRequired,
  loadPlaylist: PropTypes.func.isRequired,
  loadHP: PropTypes.func.isRequired,
};

PlaylistPreview.defaultProps = {
  loading: '',
  resourceId: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  loadPlaylist: (projectId, playlistId) => dispatch(loadPlaylistAction(projectId, playlistId)),
  loadHP: (show) => dispatch(LoadHP(show)),
});

const mapStateToProps = (state) => ({
  playlist: state.playlist,
  loading: state.playlist.loadingH5P,
  projects: state.project.projects,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistPreview),
);
