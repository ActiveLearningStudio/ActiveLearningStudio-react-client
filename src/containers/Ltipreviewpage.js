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
import ActivityShared from 'components/PlaylistPreview/ActivityShared';
import LtiPlaylistPreview from 'components/PlaylistPreview/LtiPlaylistPreview';
import LtiPlaylistPreviewShared from 'components/PlaylistPreview/LtiPlaylistPreviewShared';

class LtiPreviewPage extends React.Component {
  componentDidMount() {
    // scroll to top
    window.scrollTo(0, 0);

    // const { loadMyProjects } = this.props;
    // loadMyProjects();
  }

  render() {
    const { match, previewType } = this.props;

    let content;
    if (previewType === 'playlistShared') {
      content = (
        <LtiPlaylistPreviewShared
          playlistId={match.params.playlistId}
          resourceId={match.params.resourceId}
          showLti
        />
      );
    } else if (previewType === 'activityShared') {
      content = (
        <ActivityShared resourceId={match.params.resourceId} />
      );
    } else {
      content = (
        <LtiPlaylistPreview
          playlistId={match.params.playlistId}
          resourceId={match.params.resourceId}
          showLti
        />
      );
    }

    return (
      <div>
        <Header {...this.props} />

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
