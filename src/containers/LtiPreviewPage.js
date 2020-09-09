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
    const { match, previewType, logActivityView, logPlaylistView } = this.props;
    const { playlistId, activityId } = match.params;
    
    if (previewType === 'activityShared')
      logActivityView(activityId);
    else if(previewType === 'playlistShared'){
      logPlaylistView(playlistId);
      logActivityView(activityId);
    }
  }

  render() {
    const { match, previewType, logActivityView, logPlaylistView } = this.props;

    const { playlistId, activityId } = match.params;

    const plyId = (playlistId !== null && playlistId !== undefined) ? parseInt(playlistId, 10) : null;
    const actId = (activityId !== null && activityId !== undefined) ? parseInt(activityId, 10) : null;

    let content;
    if (previewType === 'playlistShared') {
      content = (
        <LtiPlaylistPreviewShared
          showLti
          playlistId={plyId}
          activityId={actId}
        />
      );
    } else if (previewType === 'activityShared') {
      this.props.logActivityView(match.params.activityId);
      content = (
        <ActivityShared activityId={actId} />
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
  previewType: PropTypes.string.isRequired,
  loadMyProjects: PropTypes.func.isRequired,
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
