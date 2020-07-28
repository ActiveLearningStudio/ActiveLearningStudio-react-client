import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { loadPlaylistAction } from "../actions/playlist";
import ActivityPreviewCard from "./ActivityPreviewCard";
import ActivityPreviewCarddropdown from "./ActivityPreviewCardDropdown";
import gifloader from "../images/276.gif";
import projecticon from "../images/project_icon.svg";
import "./PlayListPreview.css";
import {
  previewResource,
  resourceshared,
  resourceUnshared,
} from "../actions/resource";
import { LoadHP } from "./../actions/playlist";
import axios from "axios";
import Unauthorized from "./unauthorized";
import Switch from "react-switch";
import Swal from "sweetalert2";
const H5PPreview = lazy(() => import("../containers/H5PPreview"));
//const ImmersiveReaderPreview = lazy(() => import("./Microsoft/ImmersiveReaderPreview"));

export class PlaylistPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resourceid: this.props.resourceid,
      resourcetitle: "",
      allprojectsState: {},
      currentPlaylist: "",
      activeShared: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    if (
      nextProps.allproject !== prevState.allprojectsState &&
      !!nextProps.playlist.selectedPlaylist
    ) {
      const selectedplaylist = nextProps.allproject.filter((data) => {
        return data._id == nextProps.playlist.selectedPlaylist.projectid;
      });
      if (selectedplaylist.length > 0) {
        var currentactvity = nextProps.playlist.selectedPlaylist.activities.filter(
          (a) => a._id == prevState.resourceid
        );
        currentactvity = currentactvity.length > 0 && currentactvity[0].shared;

        return {
          allprojectsState: selectedplaylist[0].playlists,
          currentPlaylist: nextProps.playlist.selectedPlaylist,
          activeShared: !!currentactvity,
        };
      } else {
        return {
          allprojectsState: selectedplaylist,
          currentPlaylist: nextProps.playlist.selectedPlaylist,
        };
      }
    } else return null;
  }

  componentDidMount() {
    window.scrollTo(0, 0);

    this.props.loadPlaylistAction(this.props.playlistid);
    const checkvalifresourcer = async () => {
      const { token } = JSON.parse(localStorage.getItem("auth"));
      this.props.loading &&
        axios
          .post(
            global.config.laravelAPIUrl + "/h5p-resource-settings",
            { resourceid: this.props.resourceid },
            { headers: { Authorization: "Bearer " + token } }
          )
          .then((response) => {
            if (response.data.status == "success") {
              this.props.LoadHP(null);
            } else {
              this.props.LoadHP(response.data.status);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    };
    checkvalifresourcer();
  }

  handleSelect = (resourceid) => {
    if (resourceid) {
      this.setState({ resourceid: resourceid });
    }
  };

  render() {
    if (!this.props.playlist.selectedPlaylist)
      return (
        <div className="alert alert-info" role="alert">
          Loading...
        </div>
      );

    const { resourceid } = this.state;
    const playlist = this.props.playlist.selectedPlaylist;

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
        />
      ));
      activities1 = playlist.activities.map((activity) => (
        <ActivityPreviewCarddropdown
          activity={activity}
          key={activity._id}
          handleSelect={this.handleSelect}
          playlist={this.props.playlistid}
        />
      ));

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
    console.log("previousResource", previousResource);
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
        <div className="slider-hover-section">
          <Link
            to={
              this.props.playlistid &&
              "/playlist/preview/" +
                this.props.playlistid +
                "/resource/" +
                previousResource._id
            }
          >
            {" "}
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
          </Link>
          <div className="hover-control-caption pointer-cursor">
            <Link
              to={
                this.props.playlistid &&
                "/playlist/preview/" +
                  this.props.playlistid +
                  "/resource/" +
                  previousResource._id
              }
            >
              <div
                style={{
                  backgroundImage: previousResource.metadata
                    ? "url(" +
                      global.config.laravelAPIUrl +
                      previousResource.metadata.thumb_url +
                      ")"
                    : "url(data:image/jpeg;base64,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)",
                }}
                className="imginhover"
              />
              <span>{previousResource.metadata.title}</span>
            </Link>
          </div>
        </div>
      );
    } else {
      previousLink = (
        <a to="#" className="slide-control prev disabled-link">
          <i className="fa fa-chevron-left" aria-hidden="true"></i>
          <span> previous Activity</span>
        </a>
      );
      previousLink1 = (
        <div className="slider-hover-section">
          <Link>
            <i class="fa  fa-chevron-left" aria-hidden="true"></i>
          </Link>
          <div className="hover-control-caption pointer-cursor no-data  prev">
            <div className="sliderend">
              <p>Welcome! You are at the beginning of this playlist.</p>
              <Link
                onClick={() => {
                  for (
                    var data = 0;
                    data < this.state.allprojectsState.length;
                    data++
                  ) {
                    if (
                      this.state.allprojectsState[data]._id ==
                      this.state.currentPlaylist._id
                    ) {
                      try {
                        this.props.history.push(
                          "/playlist/preview/" +
                            this.state.allprojectsState[data - 1]._id +
                            "/resource/" +
                            this.state.allprojectsState[data - 1].activities[0]
                              ._id
                        );
                      } catch (e) {
                        Swal.fire({
                          text:
                            "You are at the beginning of this project. Would you like to return to the project preview?",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes",
                        }).then((result) => {
                          if (result.value) {
                            this.props.history.push(
                              "/project/preview2/" +
                                this.props.playlist.selectedPlaylist.project._id
                            );
                          }
                        });
                      }
                    }
                  }
                }}
              >
                <i class="fa fa-chevron-left" aria-hidden="true"></i>
                Switch to previous playlist{" "}
              </Link>
            </div>
          </div>
        </div>
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
        <div className="slider-hover-section">
          <Link
            to={
              this.props.playlistid &&
              "/playlist/preview/" +
                this.props.playlistid +
                "/resource/" +
                nextResource._id
            }
          >
            <i class="fa  fa-chevron-right" aria-hidden="true"></i>
          </Link>
          <div className="hover-control-caption pointer-cursor">
            <Link
              to={
                this.props.playlistid &&
                "/playlist/preview/" +
                  this.props.playlistid +
                  "/resource/" +
                  nextResource._id
              }
            >
              <div
                style={{
                  backgroundImage: nextResource.metadata
                    ? "url(" +
                      global.config.laravelAPIUrl +
                      nextResource.metadata.thumb_url +
                      ")"
                    : "url(data:image/jpeg;base64,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)",
                }}
                className="imginhover"
              />
            </Link>
            <span>{nextResource.metadata.title}</span>
          </div>
        </div>
      );
    } else {
      nextLink = (
        <a to="#" className="slide-control next disabled-link">
          <i className="fa fa-arrow-right" aria-hidden="true"></i>
          <span> Next Activity</span>
        </a>
      );
      nextLink1 = (
        <div className="slider-hover-section">
          <Link>
            <i class="fa  fa-chevron-right" aria-hidden="true"></i>
          </Link>
          <div className="hover-control-caption pointer-cursor no-data">
            <div className="sliderend">
              <p>
                Hooray! You did it! There are no more activities in this
                playlist.
              </p>
              <Link
                onClick={() => {
                  for (
                    var data = 0;
                    data < this.state.allprojectsState.length;
                    data++
                  ) {
                    if (
                      this.state.allprojectsState[data]._id ==
                      this.state.currentPlaylist._id
                    ) {
                      try {
                        this.props.history.push(
                          "/playlist/preview/" +
                            this.state.allprojectsState[data + 1]._id +
                            "/resource/" +
                            this.state.allprojectsState[data + 1].activities[0]
                              ._id
                        );
                        //  global.config.laravelAPIUrl
                      } catch (e) {
                        Swal.fire({
                          text:
                            "You are at the end of this project. Would you like to return to the project preview?",
                          showCancelButton: true,
                          confirmButtonColor: "#4646c4",
                          cancelButtonColor: "#d33",
                          cancelButtonText: "No",
                          confirmButtonText: "Yes",
                        }).then((result) => {
                          if (result.value) {
                            this.props.history.push(
                              "/project/preview2/" +
                                this.props.playlist.selectedPlaylist.project._id
                            );
                          }
                        });
                      }
                    }
                  }
                }}
              >
                Switch to next playlist{" "}
                <i class="fa fa-chevron-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      );
    }
    //  alert(this.props.loading);
    return (
      <>
        {!!this.props.loading ? (
          <div className="loadingphfdata">
            {this.props.loading == "loading..." ? (
              <Unauthorized text={this.props.loading} />
            ) : (
              <Unauthorized
                text={"You are unauthorized to access this!"}
                showbutton={true}
              />
            )}
          </div>
        ) : (
          <section className="main-page-content preview">
            <div className="container-flex-upper">
              <Link
                to={
                  "/project/preview2/" +
                  this.props.playlist.selectedPlaylist.project._id
                }
              >
                <div className="project-title">
                  <img src={projecticon} alt="" />
                  Project : {playlist.project.name}
                </div>
              </Link>
              <Link
                to={
                  "/project/" + this.props.playlist.selectedPlaylist.project._id
                }
              >
                {" "}
                <i className="fa fa-times" />
              </Link>
            </div>
            <div className="flex-container ">
              <div className="activity-bg left-vdo">
                <div className="flex-container-preview">
                  <div className="act-top-hader">
                    <div className="heading-wrapper">
                      <div className="main-heading">
                        {playlist.activities && playlist.activities.length
                          ? playlist.activities.filter(
                              (a) => a._id == resourceid
                            ).length > 0
                            ? playlist.activities.filter(
                                (a) => a._id == resourceid
                              )[0].title
                            : ""
                          : ""}
                      </div>
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
                    <Suspense fallback={<div>Loading</div>}>
                      {/* {
                        (currentActivity.type === 'h5p') ? 
                          (<H5PPreview {...this.state} resourceid={resourceid} />) : 
                          (<ImmersiveReaderPreview activity={currentActivity}/>)
                      } */}
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
                      to={
                        "/project/preview2/" +
                        this.props.playlist.selectedPlaylist.project._id
                      }
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
                  <div className="watcher spaner">
                    <div>
                      Share Activity
                      <Switch
                        onColor="#5952c6"
                        onChange={() => {
                          const nameactivity =
                            playlist.activities && playlist.activities.length
                              ? playlist.activities.filter(
                                  (a) => a._id == resourceid
                                ).length > 0
                                ? playlist.activities.filter(
                                    (a) => a._id == resourceid
                                  )[0].title
                                : ""
                              : "";
                          if (this.state.activeShared) {
                            Swal.fire({
                              icon: "warning",
                              title: `You are about to stop sharing <strong>${nameactivity}</strong>
                    Please remember that anyone you have shared this activity with will no longer have access its contents.
                                  Do you want to continue?`,
                              showCloseButton: true,
                              showCancelButton: true,
                              focusConfirm: false,
                              confirmButtonText: "Stop Sharing!",
                              confirmButtonAriaLabel: "Stop Sharing!",
                              cancelButtonText: "Cancel",
                              cancelButtonAriaLabel: "Cancel",
                            }).then((resp) => {
                              if (resp.isConfirmed) {
                                resourceUnshared(
                                  this.state.resourceid,
                                  nameactivity
                                );
                                this.props.loadPlaylistAction(
                                  this.props.playlistid
                                );
                              }
                            });
                          } else {
                            resourceshared(this.state.resourceid, nameactivity);
                            this.props.loadPlaylistAction(
                              this.props.playlistid
                            );
                          }
                        }}
                        checked={this.state.activeShared}
                        className="react-switch"
                        id="material-switch"
                        handleDiameter={30}
                        uncheckedIcon={false}
                        checkedIcon={false}
                      />
                    </div>
                    {this.state.activeShared && (
                      <div
                        className="sharedlink"
                        onClick={() => {
                          let protocol =
                            window.location.href.split("/")[0] + "//";
                          swal.fire({
                            html: `<a target="_blank" href="/shared/activity/${this.state.resourceid.trim()}">
                             ${
                               protocol + window.location.host
                             }/shared/activity/${this.state.resourceid}
                              </a>`,
                          });
                        }}
                      >
                        <i class="fa fa-external-link" aria-hidden="true"></i>
                        View Shared Link
                      </div>
                    )}
                  </div>
                  <div className="watcher">
                    You are watching from <span>{playlist.title} </span>
                  </div>
                  <ul className="sliderscrollauto">{activities}</ul>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadPlaylistAction: (playlistid) => dispatch(loadPlaylistAction(playlistid)),
  LoadHP: (show) => dispatch(LoadHP(show)),
});

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist,
    loading: state.playlist.loadingPH5,
    allproject: state.project.projects,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistPreview)
);
