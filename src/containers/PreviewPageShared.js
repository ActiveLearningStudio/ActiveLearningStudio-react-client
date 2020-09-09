import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import useBodyClass from 'helpers/BodyClass';
import { loadMyProjectsAction } from 'store/actions/project';
import ProjectPreview from 'containers/Preview/ProjectPreview/ProjectPreviewShared';

function PreviewPage(props) {
  const { match, project } = props;

  useBodyClass('hidechat-container');

  const content = (

    <ProjectPreview
      {...props}
      key={match.params.projectId}
      project={project}
      showLti={false}
    />

  );

  return (
    <div>{content}</div>
  );
}

PreviewPage.propTypes = {
  match: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadMyProjects: () => dispatch(loadMyProjectsAction()),
});

const mapStateToProps = (state) => ({
  project: state.project,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PreviewPage),
);
