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
import ProjectPreview from 'components/ProjectPreview';
import ResourcePreview from 'components/ResourcePreview';
import PlaylistPreview from 'components/PlaylistPreview';

export class PreviewPage extends React.Component {
  componentDidMount() {
    // scroll to top
    window.scrollTo(0, 0);

    const { loadMyProjects } = this.props;
    loadMyProjects();
  }

  render() {
    const { match, project, previewType } = this.props;

    let content;
    if (previewType === 'resource') {
      content = (
        <ResourcePreview resourceId={match.params.resourceId} />
      );
    } else if (previewType === 'playlist') {
      content = (
        <PlaylistPreview
          playlistid={match.params.playlistId}
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
            showlti={false}
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
  previewType: PropTypes.string.isRequired,
  loadMyProjects: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  showCreateProjectModal: () => dispatch(showCreateProjectModalAction()),
  loadMyProjects: () => dispatch(loadMyProjectsAction()),
  createProject: (name, description, thumbUrl) => dispatch(createProjectAction(name, description, thumbUrl)),
});

const mapStateToProps = (state) => ({
  project: state.project,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreviewPage),
);
