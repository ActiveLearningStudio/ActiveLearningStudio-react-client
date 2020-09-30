import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import useBodyClass from 'helpers/BodyClass';
import { loadMyProjectsAction } from 'store/actions/project';
import ProjectPreview from 'containers/Preview/ProjectPreview/ProjectPreviewShared';
import { logProjectViewAction } from 'store/actions/metrics';

function PreviewPage(props) {
  const { match, project, logProjectView } = props;

  useBodyClass('hidechat-container');

  const content = (
    <ProjectPreview
      {...props}
      key={match.params.projectId}
      project={project}
      showLti={false}
    />
  );

  useEffect(() => {
    logProjectView(match.params.projectId);
  }, [logProjectView, match.params.projectId]);

  return (
    <div>{content}</div>
  );
}

PreviewPage.propTypes = {
  match: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  logProjectView: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadMyProjects: () => dispatch(loadMyProjectsAction()),
  logProjectView: (projectId) => dispatch(logProjectViewAction(projectId)),
});

const mapStateToProps = (state) => ({
  project: state.project,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreviewPage),
);
