import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  showCreateProjectModalAction,
  createProjectAction,
  loadMyProjectsAction,
} from 'store/actions/project';
import Header from 'components/Header';
import ActivityShared from 'containers/Preview/PlaylistPreview/ActivityShared';
import LtiPlaylistPreview from 'containers/Preview/PlaylistPreview/LtiPlaylistPreview';
import LtiPlaylistPreviewShared from 'containers/Preview/PlaylistPreview/LtiPlaylistPreviewShared';

class LtiPreviewPage extends React.Component {
  componentDidMount() {
    // scroll to top
    window.scrollTo(0, 0);

    // const { loadMyProjects } = this.props;
    // loadMyProjects();
  }

  render() {
    const { match, previewType } = this.props;

    const { projectId, playlistId, activityId } = match.params;

    const proId = (projectId !== null && projectId !== undefined) ? parseInt(projectId, 10) : null;
    const plyId = (playlistId !== null && playlistId !== undefined) ? parseInt(playlistId, 10) : null;
    const actId = (activityId !== null && activityId !== undefined) ? parseInt(activityId, 10) : null;

    let content;
    if (previewType === 'playlistShared') {
      content = (
        <LtiPlaylistPreviewShared
          showLti
          projectId={proId}
          playlistId={plyId}
          activityId={actId}
        />
      );
    } else if (previewType === 'activityShared') {
      content = (
        <ActivityShared activityId={actId} />
      );
    } else {
      content = (
        <LtiPlaylistPreview
          showLti
          projectId={proId}
          playlistId={plyId}
          activityId={actId}
        />
      );
    }

    return (
      <div>
        {!previewType && <Header {...this.props} /> }

        {content}
      </div>
    );
  }
}

LtiPreviewPage.propTypes = {
  match: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  previewType: PropTypes.string.isRequired,
  loadMyProjects: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  showCreateProjectModal: () => dispatch(showCreateProjectModalAction()),
  loadMyProjects: () => dispatch(loadMyProjectsAction()),
  createProject: (name, description, thumbUrl) => dispatch(createProjectAction(name, description, thumbUrl)),
  // hideCreateProjectModal: () => dispatch(hideCreateProjectModalAction()),
});

const mapStateToProps = (state) => ({
  project: state,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LtiPreviewPage),
);
