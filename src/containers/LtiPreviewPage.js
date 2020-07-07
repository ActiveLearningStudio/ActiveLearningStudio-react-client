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
import PlaylistPreview from 'components/PlaylistPreview';

class LtiPreviewPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = { resourceId: 'sdfg' };
  }

  componentDidMount() {
    // scroll to top
    window.scrollTo(0, 0);

    const { loadMyProjects } = this.props;
    loadMyProjects();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.project.playlist.selectedPlaylist !== prevState.resourceId) {
      const _ids = nextProps.project.playlist.selectedPlaylist
        && nextProps.project.playlist.selectedPlaylist.activities[0]._id;
      return {
        resourceId: _ids,
      };
    } return null;
  }

  render() {
    const { resourceId } = this.state;
    const { match } = this.props;

    return (
      <div>
        <Header {...this.props} />

        <PlaylistPreview
          playlistId={match.params.playlistId}
          resourceId={resourceId}
          showLti
        />
      </div>
    );
  }
}

LtiPreviewPage.propTypes = {
  match: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
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
