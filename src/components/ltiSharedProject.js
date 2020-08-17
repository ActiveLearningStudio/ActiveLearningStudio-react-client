import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { loadPlaylistActionlti } from "../actions/playlist";
import ActivityPreviewCard from "./ActivityPreviewCard";
import ActivityPreviewCarddropdown from "./ActivityPreviewCardDropdown";

import "./PlayListPreview.css";
import projecticon from "../images/project_icon.svg";

import "./PlayListPreview.css";

const H5PPreview = React.lazy(() => import("../containers/H5PPreview"));

export class LtiPlaylistPreview extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.playlistid);
    this.state = {
      resourceid: this.props.match.params.resourceid,
      resourcetitle: "",
      allprojectsState: {},
      currentPlaylist: "",
    };
  }

  componentDidUpdate() {
    console.log(this.state.allprojectsState);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log(nextProps);
    if (
      !!nextProps.playlist.selectedPlaylist &&
      nextProps.playlist.selectedPlaylist.project
    ) {
      const selectedplaylist =
        nextProps.playlist.selectedPlaylist.project.playlists;
      if (!!selectedplaylist) {
        if (selectedplaylist.length > 0) {
          return {
            allprojectsState: selectedplaylist,
            currentPlaylist: nextProps.playlist.selectedPlaylist,
          };
        } else {
          return {
            allprojectsState: null,
            currentPlaylist: nextProps.playlist.selectedPlaylist,
          };
        }
      }
    } else return null;
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
          lti={true}
        />
      ));

      if (resourceid == 0) this.state.resourceid = playlist.activities[0]._id;
    }

    return (
      <section className="main-page-content preview">
        <div className="flex-container newshare ">
          <div className="activity-bg left-vdo">
            <div className="flex-container-preview check">
              <div className=" vd-controls">
                <div className="project-title">
                  <img src={projecticon} alt="" />

                  {this.props.allproject && this.props.allproject.name}
                </div>
              </div>
            </div>
            <div className="main-item-wrapper">
              <div className="item-container">
                <div className="flex-project-share">
                  {this.props.allproject &&
                  this.props.allproject.thumb_url.includes("pexels.com") ? (
                    <img src={this.props.allproject.thumb_url} alt="" />
                  ) : (
                    <img
                      src={
                        global.config.laravelAPIUrl +
                        this.props.allproject.thumb_url
                      }
                    />
                  )}
                  <div className="content">
                    <h1>
                      {this.props.allproject && this.props.allproject.name}
                    </h1>
                    <p>
                      {this.props.allproject &&
                        this.props.allproject.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="right-sidegolf-info">
            <div className="back-header">
              <div className="dropdown">
                <button
                  className="btn playlist "
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Select Playlist from dropdown{" "}
                  <i className="fa fa-chevron-down" aria-hidden="true"></i>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton"
                >
                  <ul className="">
                    {this.props.allproject &&
                    this.props.allproject.playlists &&
                    this.props.allproject.playlists.length > 0
                      ? this.props.allproject.playlists.map((data) => {
                          return (
                            <li
                              onClick={() => {
                                this.props.loadPlaylistActionlti(data._id);
                              }}
                            >
                              {data.title}
                            </li>
                          );
                        })
                      : "no playlist available"}
                  </ul>
                </div>
              </div>
            </div>

            <div className="scrollDiv long">
              <div className="watcher">
                You are watching from Playlist : <span>{playlist.title} </span>
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
    dispatch(loadPlaylistActionlti(playlistid)),
});

const mapStateToProps = (state) => {
  return {
    playlist: state.playlist,
    allproject: state.project.projectSelect,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LtiPlaylistPreview)
);
