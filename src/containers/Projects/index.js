import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import ReactPlaceholder from 'react-placeholder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { showDeletePopupAction, hideDeletePopupAction } from 'store/actions/ui';
import {
  deleteProjectAction,
  showCreateProjectModalAction,
  loadProjectAction,
  createProjectAction,
  loadMyProjectsAction,
  shareProjectAction,
  loadLmsAction,
} from 'store/actions/project';
import { logoutAction } from 'store/actions/auth';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import DeletePopup from 'components/DeletePopup';
import ProjectsLoading from 'components/Loading/ProjectsLoading';
import ProjectCard from './ProjectCard';
import NewProjectPage from './NewProjectPage';

// TODO: need to convert to functional component
export class ProjectsPage extends React.Component {
  componentDidMount() {
    const {
      match,
      showCreateProjectPopup,
      showEditProjectPopup,
      showCreateProjectModal,
      loadProject,
      loadMyProjects,
      // logout,
      loadLms,
      // user,
    } = this.props;

    // TODO: enable after add subscription step on auth
    // if (!user.subscribed) {
    //   logout();
    // }

    loadLms();

    // scroll to top
    window.scrollTo(0, 0);

    if (!showCreateProjectPopup && !showEditProjectPopup) {
      loadMyProjects();
    }

    if (showEditProjectPopup) {
      loadProject(match.params.projectId);
    } else if (showCreateProjectPopup) {
      showCreateProjectModal();
    }
  }

  handleCloseProjectModal = (e) => {
    e.preventDefault();

    const { history } = this.props;
    history.push('/');
  };

  handleDeleteProject = (projectId) => {
    const { deleteProject } = this.props;
    if (window.confirm('Are you Sure?')) {
      deleteProject(projectId);
    }
  };

  handleShareProject = (projectId) => {
    const { shareProject } = this.props;
    shareProject(projectId);
  };

  render() {
    const {
      project,
      ui,
      showPreview,
      showCreateProjectPopup,
      showEditProjectPopup,
      showDeletePopup,
    } = this.props;

    const { projects } = project;
    const { pageLoading, showDeletePlaylistPopup } = ui;

    const projectCards = projects.map((proj) => {
      const res = { title: proj.name, id: proj.id, deleteType: 'Project' };
      return (
        <ProjectCard
          key={proj.id}
          project={proj}
          res={res}
          handleDeleteProject={this.handleDeleteProject}
          handleShareProject={this.handleShareProject}
          showDeletePopup={showDeletePopup}
          showPreview={showPreview === proj.id}
        />
      );
    });

    return (
      <>
        <Header {...this.props} />

        <ReactPlaceholder
          type="media"
          showLoadingAnimation
          customPlaceholder={<ProjectsLoading />}
          ready={!pageLoading}
        >
          <div className="main-content-wrapper">
            <div className="sidebar-wrapper">
              <Sidebar />
            </div>

            <div className="content-wrapper">
              <div className="content">
                <div className="row">
                  <div className="col-md-12">
                    <div className="program-page-title">
                      <h1>My Projects</h1>
                      <Link to="/project/create">
                        <div className="btn-top-page">
                          <FontAwesomeIcon icon="plus" className="mr-2" />
                          Add Project
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="row check-home">{projectCards}</div>
              </div>
            </div>
          </div>

          {(showCreateProjectPopup || showEditProjectPopup) && (
            <NewProjectPage
              {...this.props}
              handleCloseProjectModal={this.handleCloseProjectModal}
            />
          )}

          {showDeletePlaylistPopup && (
            <DeletePopup
              res={project}
              deleteType="Project"
              {...this.props}
            />
          )}
        </ReactPlaceholder>

        <Footer />
      </>
    );
  }
}

ProjectsPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  user: PropTypes.object,
  project: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  showPreview: PropTypes.number,
  showCreateProjectPopup: PropTypes.bool,
  showEditProjectPopup: PropTypes.bool,
  showCreateProjectModal: PropTypes.func.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  loadProject: PropTypes.func.isRequired,
  loadMyProjects: PropTypes.func.isRequired,
  shareProject: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loadLms: PropTypes.func.isRequired,
};

ProjectsPage.defaultProps = {
  user: null,
  showPreview: undefined,
  showCreateProjectPopup: false,
  showEditProjectPopup: false,
};

const mapStateToProps = (state) => ({
  project: state.project,
  ui: state.ui,
  user: state.auth.user,
});

const mapDispatchToProps = (dispatch) => ({
  showCreateProjectModal: () => dispatch(showCreateProjectModalAction()),
  loadMyProjects: () => dispatch(loadMyProjectsAction()),
  createProject: (name, description, thumbUrl) => dispatch(createProjectAction(name, description, thumbUrl)),
  showDeletePopup: (id, title, deleteType) => dispatch(showDeletePopupAction(id, title, deleteType)),
  deleteProject: (id) => dispatch(deleteProjectAction(id)),
  hideDeletePopup: () => dispatch(hideDeletePopupAction()),
  loadProject: (id) => dispatch(loadProjectAction(id)),
  shareProject: (id) => dispatch(shareProjectAction(id)),
  logout: () => dispatch(logoutAction()),
  loadLms: () => dispatch(loadLmsAction()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectsPage),
);
