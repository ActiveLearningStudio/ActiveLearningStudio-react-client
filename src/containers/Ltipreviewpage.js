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

import LtiPlaylistPreview from "../components/LtiPlaylistPreview";

export class LtiPreviewPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    //scroll to top
    window.scrollTo(0, 0);
    // this.props.loadMyProjectsAction();
    console.log(this.props.project);
  }

  render() {
    var content = (content = (
      <LtiPlaylistPreview
        playlistid={this.props.match.params.playlistid}
        resourceid={this.props.match.params.resourceid}
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
