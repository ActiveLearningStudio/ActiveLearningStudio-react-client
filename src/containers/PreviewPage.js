import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loadMyProjectsAction } from 'store/actions/project';
import Header from 'components/Header';
import ProjectPreview from 'components/ProjectPreview';
import ResourcePreview from 'components/ResourcePreview';
import PlaylistPreview from 'components/PlaylistPreview';

export class PreviewPage extends React.Component {
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
  //     return { playlistId: nextProps.selectedPlaylist._id };
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
  previewType: PropTypes.string.isRequired,
  loadMyProjects: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadMyProjects: () => dispatch(loadMyProjectsAction()),
});

const mapStateToProps = (state) => ({
  project: state.project,
  selectedPlaylist: state.playlist.selectedPlaylist,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreviewPage),
);
