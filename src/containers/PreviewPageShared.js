import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loadMyProjectsAction } from 'store/actions/project';
import ProjectPreview from 'components/ProjectPreview/ProjectPreviewShared';
import useBodyClass from '../helpers/BodyClass';

function PreviewPage(props) {
  const { match, project } = props;

  useBodyClass('hidechat-container');

  const content = (
    <div className="site-container">
      <ProjectPreview
        {...props}
        key={match.params.projectId}
        project={project}
        showLti={false}
      />
    </div>
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
