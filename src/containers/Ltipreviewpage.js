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

import ProjectPreview from "../components/ProjectPreview";
import ResourcePreview from "../components/ResourcePreview";
import PlaylistPreview from "../components/PlaylistPreview";

export class LtiPreviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { resourceid: "sdfg" };
  }

  componentDidMount() {
    //scroll to top
    window.scrollTo(0, 0);
    this.props.loadMyProjectsAction();
    console.log(this.props.project);
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.project.playlist.selectedPlaylist !== prevState.resourceid) {
      var _ids =
        nextProps.project.playlist.selectedPlaylist &&
        nextProps.project.playlist.selectedPlaylist.activities[0]._id;
      return {
        resourceid: _ids,
      };
    } else return null;
  }

  render() {
    var content = (content = (
      <PlaylistPreview
        playlistid={this.props.match.params.playlistid}
        resourceid={this.state.resourceid}
        showlti={true}
      />
    ));

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
  // hideCreateProjectModalAction: () => dispatch(hideCreateProjectModalAction()),
});

const mapStateToProps = (state) => {
  return {
    project: state,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LtiPreviewPage)
);
