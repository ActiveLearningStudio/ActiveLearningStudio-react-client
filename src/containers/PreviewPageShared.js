import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import useBodyClass from './../helpers/BodyClass'

import { loadMyProjectsAction } from "../actions/project";

import ProjectPreview from "../components/ProjectPreviewShared";

const PreviewPage = (props) =>  {
  useBodyClass(`hidechat-container`);
    var content = (
      <div className="sitecontainer">
        <ProjectPreview
          {...props}
          key={props.match.params.projectid}
          project={props.project}
          showlti={false}
        />
      </div>
    );

    return <div>{content}</div>;
}

const mapDispatchToProps = (dispatch) => ({
  loadMyProjectsAction: () => dispatch(loadMyProjectsAction()),
});

const mapStateToProps = (state) => {
  return {
    project: state.project,
    selectedplaylist: state.playlist.selectedPlaylist,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreviewPage)
);
