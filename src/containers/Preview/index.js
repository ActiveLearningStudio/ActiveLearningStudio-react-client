import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createProjectAction, loadMyProjectsAction, showCreateProjectModalAction } from 'store/actions/project';
import { loadPlaylistAction } from 'store/actions/playlist';
import Header from 'components/Header';
import ProjectPreview from './ProjectPreview';
import ResourcePreview from './ResourcePreview';
import PlaylistPreview from './PlaylistPreview';

class PreviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playlistId: null,
    };
  }

  componentDidMount() {
    // scroll to top
    window.scrollTo(0, 0);

    const { loadMyProjects } = this.props;
    loadMyProjects();
  }

  // componentDidUpdate() {
  //   if (this.props.selectedPlaylist !== this.state.playlistId) {
  //     this.setState({ playlistId: this.props.selectedPlaylist });
  //   }
  // }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.selectedPlaylist !== prevState.playlistId) {
  //     return { playlistId: nextProps.selectedPlaylist.id };
  //   } else {
  //     return null;
  //   }
  // }

  render() {
    const { playlistId } = this.state;
    const { match, project, previewType } = this.props;

    let content;
    if (previewType === 'resource') {
      content = (
        <ResourcePreview resourceId={match.params.resourceId} />
      );
    } else if (previewType === 'playlist') {
      content = !playlistId && (
        <PlaylistPreview
          playlistId={match.params.playlistId}
          resourceId={match.params.resourceId}
        />
      );
    } else {
      content = (
        <div className="site-container">
          <ProjectPreview
            {...this.props}
            key={match.params.projectId}
            project={project}
            showLti={false}
          />
        </div>
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

PreviewPage.propTypes = {
  match: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  previewType: PropTypes.string,
  loadMyProjects: PropTypes.func.isRequired,
};

PreviewPage.defaultProps = {
  previewType: '',
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
