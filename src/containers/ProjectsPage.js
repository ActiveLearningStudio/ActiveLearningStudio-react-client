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
} from 'store/actions/project';
import { logoutAction } from 'store/actions/auth';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import ProjectCard from 'components/ProjectCard';
import DeletePopup from 'components/DeletePopup';
import ProjectsLoading from 'components/Loading/ProjectsLoading';
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
      logout,
    } = this.props;

    const termsTrue = JSON.parse(localStorage.getItem('auth'));
    if (!termsTrue.subscribed) {
      logout();
    }

    // scroll to top
    window.scrollTo(0, 0);

    if (showCreateProjectPopup === undefined && showEditProjectPopup === undefined) {
      loadMyProjects();
    }

    if (showEditProjectPopup) {
      // loads the data of project for showing into edit form
      loadProject(match.params.projectId);
    } else if (showCreateProjectPopup) {
      showCreateProjectModal();
    }
  }

  handleCloseProjectModal = (e) => {
    e.preventDefault();

    try {
      const { history } = this.props;
      history.push('/');
    } catch (err) {
      console.log(err.message);
    }
  };

  // TODO: need to check confirm
  handleDeleteProject = (/* projectId */) => {
    // if (confirm('Are you Sure?')) {
    //   this.props.deleteProject(projectId);
    // }
  };

  handleShareProject = (projectId) => {
    const { shareProject } = this.props;
    shareProject(projectId);
  };

  render() {
    const {
      showCreateProjectPopup,
      showEditProjectPopup,
      project,
      ui,
      showPreview,
      showDeletePopup,
    } = this.props;
    const { projects } = project;
    const { pageLoading, showDeletePlaylistPopup } = ui;

    const projectCards = projects.map((proj) => {
      const res = { title: proj.name, id: proj._id, deleteType: 'Project' };
      return (
        <ProjectCard
          key={proj._id}
          project={proj}
          res={res}
          handleDeleteProject={this.handleDeleteProject}
          handleShareProject={this.handleShareProject}
          showDeletePopup={showDeletePopup}
          showPreview={showPreview === project._id}
        />
      );
    });

    return (
      <>
        <Header {...this.props} />
        <ReactPlaceholder
          type="media"
          showLoadingAnimation
          customPlaceholder={ProjectsLoading}
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
                      <Link to="./project/create">
                        <div className="btn-top-page">
                          <FontAwesomeIcon icon="plus" />
                          Add Project
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="row  check-home">{projectCards}</div>
              </div>
            </div>
          </div>

          {(showCreateProjectPopup || showEditProjectPopup) && (
            <NewProjectPage
              {...this.props}
              handleCloseProjectModal={this.handleCloseProjectModal}
              onThumbUrlChange={this.onThumbUrlChange}
              inputRef={(input) => {
                this.textInput = input;
              }}
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
      </>
    );
  }
}

ProjectsPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  showPreview: PropTypes.string.isRequired,
  showCreateProjectPopup: PropTypes.bool.isRequired,
  showEditProjectPopup: PropTypes.bool.isRequired,
  showCreateProjectModal: PropTypes.bool.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
  loadProject: PropTypes.func.isRequired,
  loadMyProjects: PropTypes.func.isRequired,
  shareProject: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
};

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
});

const mapStateToProps = (state) => ({
  project: state.project,
  ui: state.ui,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectsPage),
);
