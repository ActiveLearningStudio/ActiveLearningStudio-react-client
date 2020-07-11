import React, { Suspense } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { loadPlaylistActionshared } from "../actions/playlist";
import ActivityPreviewCard from "./ActivityPreviewCard";
import ActivityPreviewCarddropdown from "./ActivityPreviewCardDropdown";
import gifloader from "../images/276.gif";
import projecticon from "../images/project_icon.svg";
const H5PPreview = React.lazy(() => import("../containers/H5PPreview"));
import "./PlayListPreview.css";
import Unauthorized from "./unauthorized";
export class LtiPlaylistPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resourceid: this.props.match.params.resourceid,
      resourcetitle: "",
    };
  }

  componentDidUpdate() {
    if (this.state.resourceid != this.props.match.params.resourceid) {
      this.setState({
        resourceid: this.props.match.params.resourceid,
      });
    }
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.loadPlaylistActionlti(this.props.playlistid);
  }

  handleSelect = (resourceid) => {
    if (resourceid) {
      this.setState({ resourceid: resourceid });
    }
  };

  render() {
    if (this.props.playlist.selectedPlaylist == "error") {
      return <Unauthorized text="Project is not public." />;
    }
    if (!this.props.playlist.selectedPlaylist)
      return (
        <div className="alert alert-info" role="alert">
          Loading...
        </div>
      );

    const { resourceid } = this.state;
    const playlist = this.props.playlist.selectedPlaylist;
    console.log(playlist);
    var activities;
    var activities1;

    if (playlist.activities.length == 0) {
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
      activities = playlist.activities.map((activity) => (
        <ActivityPreviewCard
          activity={activity}
          key={activity._id}
          handleSelect={this.handleSelect}
          playlist={this.props.playlistid}
          lti={true}
          shared={true}
        />
      ));
      console.log(activities);
      activities1 = playlist.activities.map((activity) => (
        <ActivityPreviewCarddropdown
          activity={activity}
          key={activity._id}
          handleSelect={this.handleSelect}
          playlist={this.props.playlistid}
          lti={true}
          shared={true}
        />
      ));
      console.log(activities1);

      if (resourceid == 0) this.state.resourceid = playlist.activities[0]._id;
    }

    const currentActivity = playlist.activities.filter(
      (f) => f._id == resourceid
    )[0];

    const previousResource =
      playlist.activities.indexOf(currentActivity) >= 1
        ? playlist.activities[playlist.activities.indexOf(currentActivity) - 1]
        : null;
    const nextResource =
      playlist.activities.indexOf(currentActivity) !=
      playlist.activities.length - 1
        ? playlist.activities[playlist.activities.indexOf(currentActivity) + 1]
        : null;

    let previousLink = null;
    let previousLink1 = null;
    if (previousResource) {
      previousLink = (
        <a
          to="#"
          className="slide-control prev"
          onClick={() => this.handleSelect(previousResource._id)}
        >
          <i className="fa fa-arrow-left" aria-hidden="true"></i>
          <span> previous Activity</span>
        </a>
      );

      previousLink1 = (
        <Link
          to={
            this.props.playlistid &&
            "/playlist/shared/preview/" +
              this.props.playlistid +
              "/resource/" +
              previousResource._id
          }
        >
          {" "}
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </Link>
      );
    } else {
      previousLink = (
        <a to="#" className="slide-control prev disabled-link">
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
          <span> previous Activity</span>
        </a>
      );
      previousLink1 = (
        <a>
          {" "}
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </a>
      );
    }

    let nextLink = null;
    let nextLink1 = null;
    if (nextResource) {
      nextLink = (
        <a
          className="slide-control next"
          onClick={() => this.handleSelect(nextResource._id)}
        >
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
          <span> Next Activity</span>
        </a>
      );
      nextLink1 = (
        <Link
          to={
            this.props.playlistid &&
            "/playlist/shared/preview/" +
              this.props.playlistid +
              "/resource/" +
              nextResource._id
          }
        >
          <i class="fa  fa-chevron-right" aria-hidden="true"></i>
        </Link>
      );
    } else {
      nextLink = (
        <a to="#" className="slide-control next disabled-link">
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
          <span> Next Activity</span>
        </a>
      );
      nextLink1 = (
        <a>
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
      );
    }

    return (
      <section className="main-page-content preview">
        <div className="container-flex-upper">
          <div className="project-title">
            <img src={projecticon} alt="" />
            {this.props.showlti
              ? "Playlist :" + playlist.title
              : "Project :" + playlist.project.name}
          </div>
          {/* <Link
            to={"/project/" + this.props.playlist.selectedPlaylist.project._id}
          >
            {" "}
            <i className="fa fa-times" />
          </Link> */}
        </div>
        <div className="flex-container ">
          <div className="activity-bg left-vdo">
            <div className="flex-container-preview">
              <div className="act-top-hader">
                <div className="heading-wrapper">
                  <div className="main-heading">
                    {/* <span>You are Watching:</span> */}

                    {playlist.activities && playlist.activities.length
                      ? playlist.activities.filter((a) => a._id == resourceid)
                          .length > 0
                        ? playlist.activities.filter(
                            (a) => a._id == resourceid
                          )[0].title
                        : ""
                      : ""}
                  </div>
                  {/* <div className="sub-heading">
                  <span>From the playlist:</span>
                  {playlist ? playlist.title : ""}
                </div> */}
                </div>
              </div>
              <div className="right-control vd-controls">
                <div className="sliderbtn">
                  {previousLink1}
                  {nextLink1}
                </div>
              </div>
            </div>
            <div className="main-item-wrapper">
              <div className="item-container">
                {/* <img src="/images/video-thumbnail.jpg" alt="video-thumbnail" className=""></img> */}
                <Suspense fallback={<div>Loading</div>}>
                  {!!this.state.resourceid ? (
                    <H5PPreview
                      {...this.state}
                      resourceid={this.state.resourceid}
                      tokenrequire={true}
                      showltipreview={true}
                    />
                  ) : (
                    <H5PPreview
                      {...this.state}
                      showltipreview={true}
                      resourceid={
                        this.props.playlist.selectedPlaylist &&
                        this.props.playlist.selectedPlaylist.activities[0]._id
                      }
                    />
                  )}
                </Suspense>
              </div>
            </div>
          </div>
          <div className="right-sidegolf-info">
            <div className="back-header">
              <div>
                {" "}
                <Link
                  className="gobackbuttonpreview"
                  onClick={this.props.history.goBack}
                >
                  <i className="fa fa-undo" aria-hidden="true"></i>Back to
                  Project
                </Link>
              </div>
              <div className="dropdown">
                <button
                  className="btn "
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <ul className="">{activities1}</ul>
                </div>
              </div>
            </div>

            <div className="scrollDiv long">
              <div className="watcher">
                You are watching from <span>{playlist.title} </span>
              </div>
              <ul className="sliderscrollauto">{activities}</ul>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadPlaylistActionlti: (playlistid) =>
    dispatch(loadPlaylistActionshared(playlistid)),
});

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LtiPlaylistPreview)
);
