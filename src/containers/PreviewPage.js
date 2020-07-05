import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

import {
  showCreateProjectModalAction,
  createProjectAction,
  loadMyProjectsAction,
} from "../actions/project";
import { loadPlaylistAction } from "../actions/playlist";

import ProjectPreview from "../components/ProjectPreview";
import ResourcePreview from "../components/ResourcePreview";
import PlaylistPreview from "../components/PlaylistPreview";

export class PreviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistID: null,
    };
  }

  componentDidMount() {
    //scroll to top
    window.scrollTo(0, 0);
    this.props.loadMyProjectsAction();
    //this.props.loadPlaylistAction_new(this.props.match.params.resourceid);
  }
  // componentDidUpdate() {
  //   alert();
  //   if (this.props.selectedplaylist !== this.state.playlistID) {
  //     //return { playlistID: nextProps.selectedplaylist._id };
  //     this.setState({ playlistID: this.props.selectedplaylist });
  //   }
  // }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.selectedplaylist !== prevState.playlistID) {
  //     return { playlistID: nextProps.selectedplaylist._id };
  //   } else return null;
  // }

  render() {
    // const { projects } = this.props.project;
    var content;
    if (this.props.previewType == "resource")
      content = (
        <ResourcePreview resourceid={this.props.match.params.resourceid} />
      );
    else if (this.props.previewType == "playlist") {
      // alert(this.pri.selectedplaylist);
      content = !this.state.playlistID && (
        <PlaylistPreview
          playlistid={this.props.match.params.playlistid}
          resourceid={this.props.match.params.resourceid}
        />
      );
    } else
      content = (
        <div className="sitecontainer">
          <ProjectPreview
            {...this.props}
            key={this.props.match.params.projectid}
            project={this.props.project}
            showlti={false}
          />
        </div>
      );

    return (
      <div>
        <Header {...this.props} />

        {content}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  showCreateProjectModalAction: () => dispatch(showCreateProjectModalAction()),
  loadMyProjectsAction: () => dispatch(loadMyProjectsAction()),
  createProjectAction: (name, description, thumb_url) =>
    dispatch(createProjectAction(name, description, thumb_url)),
  loadPlaylistAction_new: (res_id) => dispatch(loadPlaylistAction_new(res_id)),
});

const mapStateToProps = (state) => {
  //console.log(state.playlist);

  return {
    project: state.project,
    selectedplaylist: state.playlist.selectedPlaylist,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreviewPage)
);
