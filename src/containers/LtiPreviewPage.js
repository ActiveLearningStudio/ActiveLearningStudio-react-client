import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import {
  showCreateProjectModalAction,
  createProjectAction,
  loadMyProjectsAction,
} from 'store/actions/project';
import { logActivityViewAction, logPlaylistViewAction } from 'store/actions/metrics';
import Header from 'components/Header';
import ActivityShared from 'containers/Preview/PlaylistPreview/ActivityShared';
import LtiPlaylistPreview from 'containers/Preview/PlaylistPreview/LtiPlaylistPreview';
import LtiPlaylistPreviewShared from 'containers/Preview/PlaylistPreview/LtiPlaylistPreviewShared';

class LtiPreviewPage extends React.Component {
  componentDidMount() {
    // scroll to top
    window.scrollTo(0, 0);
    // Logging the view for metrics
    const {
      match, previewType, logActivityView, logPlaylistView,
    } = this.props;
    const { playlistId, activityId } = match.params;

    if (previewType === 'activityShared') { logActivityView(activityId); } else if (previewType === 'playlistShared') {
      logPlaylistView(playlistId);
      logActivityView(activityId);
    }
  }

  render() {
    const { match, previewType, logActivityView } = this.props;

    const { projectId, playlistId, activityId } = match.params;

    const projId = (projectId !== null && projectId !== undefined) ? parseInt(projectId, 10) : null;
    const plyId = parseInt(playlistId, 10);
    const actId = (activityId !== null && activityId !== undefined) ? parseInt(activityId, 10) : null;

    let content;
    if (previewType === 'playlistShared') {
      content = (
        <LtiPlaylistPreviewShared
          projectId={projId}
          playlistId={plyId}
          activityId={actId}
        />
      );
    } else if (previewType === 'activityShared') {
      logActivityView(match.params.activityId);
      content = (
        <ActivityShared />
      );
    } else if (previewType === 'activitySharedEmbed') {
      logActivityView(match.params.activityId);
      content = (
        <ActivityShared embed />
      );
    } else {
      content = (
        <LtiPlaylistPreview
          showLti
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
  previewType: PropTypes.string,
  loadMyProjects: PropTypes.func.isRequired,
  logActivityView: PropTypes.func.isRequired,
  logPlaylistView: PropTypes.func.isRequired,
};

LtiPreviewPage.defaultProps = {
  previewType: null,
};

const mapDispatchToProps = (dispatch) => ({
  showCreateProjectModal: () => dispatch(showCreateProjectModalAction()),
  loadMyProjects: () => dispatch(loadMyProjectsAction()),
  createProject: (name, description, thumbUrl) => dispatch(createProjectAction(name, description, thumbUrl)),
  // hideCreateProjectModal: () => dispatch(hideCreateProjectModalAction()),

  logActivityView: (activityId) => dispatch(logActivityViewAction(activityId)),
  logPlaylistView: (playlistId) => dispatch(logPlaylistViewAction(playlistId)),
});

export default withRouter(
  connect(null, mapDispatchToProps)(LtiPreviewPage),
);
