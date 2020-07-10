import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Header from "../components/Header/Header";

import { loadMyProjectsAction } from "../actions/project";

import ProjectPreview from "../components/ProjectPreviewShared";

export class PreviewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistID: null,
    };
  }

  render() {
    var content = (
      <div className="sitecontainer">
        <ProjectPreview
          {...this.props}
          key={this.props.match.params.projectid}
          project={this.props.project}
          showlti={false}
        />
      </div>
    );

    return <div>{content}</div>;
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadMyProjectsAction: () => dispatch(loadMyProjectsAction()),
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
