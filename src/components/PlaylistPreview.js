import React, { Suspense, lazy } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import projecticon from "../images/project_icon.svg";
import axios from "axios";

import { LoadHP } from "../actions/playlist";
import { loadPlaylistAction } from "../actions/playlist";
import Unauthorized from "./unauthorized";
import ActivityPreviewCard from "./ActivityPreviewCard";
const H5PPreview = lazy(() => import("../containers/H5PPreview"));
const ImmersiveReaderPreview = lazy(() => import("./Microsoft/ImmersiveReaderPreview"));

import "./PlayListPreview.css";

export class PlaylistPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      resourceid: this.props.resourceid,
      resourcetitle: ""
    };
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

    if (playlist.activities.length == 0) {
      activities = (
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

    if (previousResource) {
      previousLink = (
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
      );
    } else {
      previousLink = (
        <a>
          {" "}
          <i class="fa fa-chevron-left" aria-hidden="true"></i>
        </a>
      );
    }

    let nextLink = null;
    if (nextResource) {
      nextLink = (
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
      );
    } else {
      nextLink = (
        <a>
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </a>
      );
    }

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
                      {previousLink}
                      {nextLink}
                    </div>
                  </div>
                </div>
                <div className="main-item-wrapper">
                  <div className="item-container">
                    <Suspense fallback={<div>Loading</div>}>
                      {(currentActivity.type === 'h5p') ? 
                        (<H5PPreview {...this.state} resourceid={resourceid} />) : 
                        (<ImmersiveReaderPreview activity={currentActivity}/>)
                      }
                      
                    </Suspense>
                  </div>
                </div>
              </div>
              <div className="right-sidegolf-info">
                <div className="back-header">
                  <div>
                    <Link className="gobackbuttonpreview" to="/">
                      <i className="fa fa-undo" aria-hidden="true"></i>Back to
                      Projects
                    </Link>
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
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistPreview)
);
