import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { loadPlaylistAction } from 'store/actions/playlist';
// import { previewResource } from 'store/actions/resource';
import projectIcon from 'assets/images/project_icon.svg';
// import gifloader from 'assets/images/276.gif';
import ActivityPreviewCard from '../ActivityPreviewCard';
import ActivityPreviewCarddropdown from '../ActivityPreviewCard/ActivityPreviewCardDropdown';

import './style.scss';

const H5PPreview = React.lazy(() => import('../../containers/H5PPreview'));

// TODO: need to refactor the code, change to functional component
class PlaylistPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resourceId: props.resourceId,
      resourceTitle: '',
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    const { playlistId, loadPlaylist } = this.props;
    loadPlaylist(playlistId);
  }

  handleSelect = (resourceId) => {
    if (resourceId) {
      this.setState({ resourceId });
    }
  };

  render() {
    const { playlist, playlistId } = this.props;

    if (!playlist.selectedPlaylist) {
      return (
        <div className="alert alert-info" role="alert">
          Loading...
        </div>
      );
    }

    const { resourceId } = this.state;
    const { selectedPlaylist } = playlist;
    const { activities: selectedActivities } = selectedPlaylist;

    let activities;
    let activities1;
    if (selectedActivities.length === 0) {
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
      activities = selectedActivities.map((activity) => (
        <ActivityPreviewCard
          activity={activity}
          key={activity._id}
          handleSelect={this.handleSelect}
          playlist={playlistId}
        />
      ));
      activities1 = selectedActivities.map((activity) => (
        <ActivityPreviewCarddropdown
          activity={activity}
          key={activity._id}
          handleSelect={this.handleSelect}
          playlist={playlistId}
        />
      ));

      if (resourceId === 0) {
        this.state.resourceId = selectedActivities[0]._id;
      }
    }

    const currentActivity = selectedActivities.filter(
      (f) => f._id === resourceId,
    )[0];

    const previousResource = selectedActivities.indexOf(currentActivity) >= 1
      ? selectedActivities[selectedActivities.indexOf(currentActivity) - 1]
      : null;
    const nextResource = selectedActivities.indexOf(currentActivity) !== (selectedActivities.length - 1)
      ? selectedActivities[selectedActivities.indexOf(currentActivity) + 1]
      : null;

    // let previousLink = null;
    let previousLink1 = null;
    if (previousResource) {
      // previousLink = (
      //   <a
      //     href="#"
      //     className="slide-control prev"
      //     onClick={() => this.handleSelect(previousResource._id)}
      //   >
      //     <FontAwesomeIcon icon="arrow-left" />
      //     <span> previous Activity</span>
      //   </a>
      // );

      previousLink1 = (
        <Link
          // onClick={() => {
          //   this.handleSelect(previousResource._id);
          //   try {
          //     document.getElementById(
          //       "curriki-h5p-wrapper"
          //     ).innerHTML = `<div class="loader_gif">
          //       <img src='${gifloader}' alt="" />
          //     </div>`;
          //   } catch (e) {}
          // }}
          to={playlistId && `/playlist/preview/${playlistId}/resource/${previousResource._id}`}
        >
          <FontAwesomeIcon icon="chevron-left" />
        </Link>
      );
    } else {
      // previousLink = (
      //   <a href="#" className="slide-control prev disabled-link">
      //     <FontAwesomeIcon icon="chevron-left" />
      //     <span> previous Activity</span>
      //   </a>
      // );

      previousLink1 = (
        <a>
          <FontAwesomeIcon icon="chevron-left" />
        </a>
      );
    }

    // let nextLink = null;
    let nextLink1 = null;
    if (nextResource) {
      // nextLink = (
      //   <a
      //     className="slide-control next"
      //     onClick={() => this.handleSelect(nextResource._id)}
      //   >
      //     <FontAwesomeIcon icon="arrow-right" />
      //     <span> Next Activity</span>
      //     {/*
      //     <div className="hover-control-caption pointer-cursor">
      //       <div
      //         style={{
      //           backgroundImage: `url(${global.config.laravelAPIUrl}${nextResource.thumb_url})`,
      //         }}
      //         className="imginhover"
      //       />
      //       <span>{nextResource.title}</span>
      //     </div>
      //     */}
      //   </a>
      // );

      nextLink1 = (
        <Link
          // onClick={() => {
          //   this.handleSelect(nextResource._id);
          //   try {
          //     document.getElementById(
          //       "curriki-h5p-wrapper"
          //     ).innerHTML = `<div class="loader_gif">
          //       <img src='${gifloader}' alt="" />
          //     </div>`;
          //   } catch (e) {}
          // }}
          to={playlistId && `/playlist/preview/${playlistId}/resource/${nextResource._id}`}
        >
          <FontAwesomeIcon icon="chevron-right" />
        </Link>
      );
    } else {
      // nextLink = (
      //   <a href="#" className="slide-control next disabled-link">
      //     <FontAwesomeIcon icon="arrow-right" />
      //     <span> Next Activity</span>
      //     {/*
      //     <div className="hover-control-caption pointer-cursor">
      //       <img alt="thumb01"></img>
      //       <span></span>
      //     </div>
      //     */}
      //   </a>
      // );

      nextLink1 = (
        <a>
          <FontAwesomeIcon icon="chevron-right" />
        </a>
      );
    }

    return (
      <section className="main-page-content preview">
        <div className="container-flex-upper">
          <Link to={`/project/preview2/${playlist.selectedPlaylist.project._id}`}>
            <div className="project-title">
              <img src={projectIcon} alt="" />
              {`Project: ${selectedPlaylist.project.name}`}
            </div>
          </Link>

          <Link to={`/project/${playlist.selectedPlaylist.project._id}`}>
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
                      ? selectedPlaylist.activities.filter((a) => a._id === resourceId).length > 0
                        ? selectedPlaylist.activities.filter((a) => a._id === resourceId)[0].title
                        : ''
                      : ''}
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
                <div className="sliderbtn">
                  {previousLink1}
                  {nextLink1}
                </div>

                {/*
                <div className="dropdown">
                  <button
                    className="btn "
                    type="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon="ellipsis-v" />
                  </button>
                  <div className="dropdown-menu">
                    {nextLink}
                    {previousLink}
                    <Link
                      to={`/project/preview2/${playlist.selectedPlaylist.project._id}`}
                      className="slide-control"
                    >
                      <FontAwesomeIcon icon="share" />
                      Back to Project
                    </Link>
                    <Link
                      to={`/project/${playlist.selectedPlaylist.project._id}`}
                      className="slide-control"
                    >
                      <FontAwesomeIcon icon="times-circle-o" />
                      Exit
                    </Link>
                  </div>
                </div>
                */}
              </div>
            </div>

            <div className="main-item-wrapper">
              <div className="item-container">
                {/* <img src="/assets.images/video-thumbnail.jpg" alt="video-thumbnail"></img> */}
                <Suspense fallback={<div>Loading</div>}>
                  <H5PPreview {...this.state} resourceId={resourceId} />
                </Suspense>
                {/*
                <div className="item-caption-bottom">
                  <p>
                    {selectedPlaylist.activities && selectedPlaylist.activities.length
                      ? selectedPlaylist.activities.filter((a) => a._id === resourceId).length > 0
                        ? selectedPlaylist.activities.filter(
                            (a) => a._id === resourceId
                          )[0].title
                        : ""
                      : ""}
                  </p>
                </div>
                */}
              </div>
            </div>
          </div>

          <div className="right-sidegolf-info">
            <div className="back-header">
              <div>
                <Link className="go-back-button-preview" to="/">
                  <FontAwesomeIcon icon="undo" />
                  Back to Projects
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
                  <ul className="">{activities1}</ul>
                </div>
              </div>

              {/*
              <Link
                to={`/project/preview2/${playlist.selectedPlaylist.project._id}`}
                className="link"
              >
                <img src="/assets.images/right-arrow.png" className="back-arrow"></img>
                Back to {playlist.selectedPlaylist.project.name}
              </Link>
              */}
            </div>

            {/*
            <button
              type="button"
              data-toggle="collapse"
              data-target="#collapseExample"
              aria-expanded="false"
              aria-controls="collapseExample"
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
            </button>
            */}

            <div className="scrollDiv long">
              <div className="watcher">
                You are watching from
                {' '}
                <span>{selectedPlaylist.title}</span>
              </div>
              <ul className="slider-scroll-auto">{activities}</ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

PlaylistPreview.propTypes = {
  playlist: PropTypes.object.isRequired,
  playlistId: PropTypes.string.isRequired,
  resourceId: PropTypes.string.isRequired,
  showLti: PropTypes.bool.isRequired,
  loadPlaylist: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadPlaylist: (playlistId) => dispatch(loadPlaylistAction(playlistId)),
});

const mapStateToProps = (state) => ({
  playlist: state.playlist,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistPreview),
);
