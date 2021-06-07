import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createProjectAction, loadMyProjectsAction, showCreateProjectModalAction } from 'store/actions/project';
import { loadPlaylistAction } from 'store/actions/playlist';
// import Header from 'components/Header';
// import Sidebar from 'components/Sidebar';
import ProjectPreview from './ProjectPreview';
import ResourcePreview from './ResourcePreview';
import PlaylistPreview from './PlaylistPreview';
import ActivityShared from './PlaylistPreview/ActivityShared';

class PreviewPage extends React.Component {
  componentDidMount() {
    // scroll to top
    window.scrollTo(0, 0);

    // const { loadMyProjects, previewType } = this.props;
    // if (previewType !== 'activityShared') {
    //   //loadMyProjects();
    // }
  }

  render() {
    const { match, project, previewType } = this.props;

    const { projectId, playlistId, activityId } = match.params;

    let content;
    if (previewType === 'activity') {
      content = (
        <ResourcePreview
          activityId={parseInt(activityId, 10)}
          playlistId={playlistId}
        />
      );
    } else if (previewType === 'playlist') {
      content = (
        <PlaylistPreview
          projectId={parseInt(projectId, 10)}
          playlistId={parseInt(playlistId, 10)}
          activityId={(activityId !== null && activityId !== undefined) ? parseInt(activityId, 10) : null}
        />
      );
    } else if (previewType === 'activityShared') {
      content = <ActivityShared />;
    } else {
      content = (
        <div className="site-container-preview">
          <ProjectPreview
            {...this.props}
            key={projectId}
            project={project}
            showLti={false}
          />
        </div>
      );
    }

    return (
      <div>
        {/* {!previewType && <Header {...this.props} />} */}
        {/* {!previewType ? (
          <div className="main-content-wrapper">
            <div className="sidebar-wrapper">
              <Sidebar />
            </div>
            {content}
          </div>
        ) : content} */}
        {content}
      </div>
    );
  }
}

PreviewPage.propTypes = {
  match: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  previewType: PropTypes.string,
  selectedPlaylist: PropTypes.object,
  loadMyProjects: PropTypes.func.isRequired,
};

PreviewPage.defaultProps = {
  previewType: '',
  selectedPlaylist: null,
};

const mapDispatchToProps = (dispatch) => ({
  createProject: (name, description, thumbUrl) => dispatch(createProjectAction(name, description, thumbUrl)),
  loadMyProjects: () => dispatch(loadMyProjectsAction()),
  showCreateProjectModal: () => dispatch(showCreateProjectModalAction()),
  loadPlaylist: () => dispatch(loadPlaylistAction()),
});

const mapStateToProps = (state) => ({
  project: state.project,
  selectedPlaylist: state.playlist.selectedPlaylist,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreviewPage),
);
