import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import {
  showCreateProjectModalAction,
  createProjectAction,
  loadMyProjectsAction,
  // LoadLMS,
} from "../actions/project";

import LtiPlaylistPreview from "../components/LtiPlaylistPreview";
import LtiPlaylistPreviewShared from "../components/LtiPlaylistPreviewShared";
import ActivityShared from "../components/ActivityShared";

export class LtiPreviewPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //scroll to top
    window.scrollTo(0, 0);
    // this.props.loadMyProjectsAction();
    //console.log(this.props.project);
    // this.props.LoadLMS();
  }

  render() {
    var content;
    if (this.props.previewType == "playlistshared") {
      content = (
        <LtiPlaylistPreviewShared
          playlistid={this.props.match.params.playlistid}
          resourceid={this.props.match.params.resourceid}
          showlti={true}
        />
      );
    } else if (this.props.previewType == "activityshared") {
      content = (
        <ActivityShared resourceid={this.props.match.params.resourceid} />
      );
    } else if (this.props.previewType == "activitysharedlti") {
      content = (
        <ActivityShared
          ltiactivity={true}
          resourceid={this.props.match.params.resourceid}
        />
      );
    } else {
      content = (
        <LtiPlaylistPreview
          playlistid={this.props.match.params.playlistid}
          resourceid={this.props.match.params.resourceid}
          showlti={true}
        />
      );
    }

    return <div>{content}</div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  showCreateProjectModalAction: () => dispatch(showCreateProjectModalAction()),
  loadMyProjectsAction: () => dispatch(loadMyProjectsAction()),
  createProjectAction: (name, description, thumb_url) =>
    dispatch(createProjectAction(name, description, thumb_url)),
  // hideCreateProjectModalAction: () => dispatch(hideCreateProjectModalAction()),
  // LoadLMS: () => dispatch(LoadLMS()),
});

const mapStateToProps = (state) => {
  return {
    project: state,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LtiPreviewPage)
);
