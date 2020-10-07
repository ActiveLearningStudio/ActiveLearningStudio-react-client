import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import ReactPlaceholder from 'react-placeholder';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import welcomVideo from 'assets/video/welcome.mp4';
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
import Header from 'components/Header';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import DeletePopup from 'components/DeletePopup';
import ProjectsLoading from 'components/Loading/ProjectsLoading';
import GoogleModel from 'components/models/GoogleLoginModal';
import ProjectCard from './ProjectCard';
import NewProjectPage from './NewProjectPage';

export const ProjectsPage = (props) => {
  const allStateProject = useSelector((state) => state.project);
  const [show, setShow] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [activeFilter, setActiveFilter] = useState('normal-grid');
  const [allProjects, setAllProjects] = useState(null);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      allProjects,
      result.source.index,
      result.destination.index,
    );

    setAllProjects(items);
  };

  useEffect(() => {
    if (allStateProject.projects.length > 0) {
      setAllProjects(allStateProject.projects);
    }
  }, [allStateProject]);

  useEffect(() => {
    const {
      match,
      showCreateProjectPopup,
      showEditProjectPopup,
      showCreateProjectModal,
      loadProject,
      loadMyProjects,
      loadLms,
    } = props;

    loadLms();

    // scroll to top
    window.scrollTo(0, 0);
    document.body.classList.remove('mobile-responsive');

    if (!showCreateProjectPopup && !showEditProjectPopup) {
      loadMyProjects();
    }

    if (showEditProjectPopup) {
      loadProject(match.params.projectId);
    } else if (showCreateProjectPopup) {
      showCreateProjectModal();
    }
  }, [props]);

  const handleShow = () => {
    setShow(true); //! state.show
  };

  const setProjectId = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const handleClose = () => {
    setShow(false);
  };

  const handleCloseProjectModal = (e) => {
    e.preventDefault();
    const { history } = props;
    history.push('/projects');
  };

  const handleDeleteProject = (projectId) => {
    const { deleteProject } = props;
    if (window.confirm('Are you Sure?')) {
      deleteProject(projectId);
    }
  };

  const handleShareProject = (projectId) => {
    const { shareProject } = props;
    shareProject(projectId);
  };

  const {
    ui,
    showPreview,
    showCreateProjectPopup,
    showEditProjectPopup,
    showDeletePopup,
  } = props;

  const { pageLoading, showDeletePlaylistPopup } = ui;

  const projectCards = !!allProjects
    && allProjects.map((proj, index) => {
      const res = {
        title: proj.name,
        id: proj.id,
        deleteType: 'Project',
      };
      return (
        <Draggable key={proj.id} draggableId={`${proj.id}`} index={index}>
          {(provided) => (
            <div
              className="playlist-resource"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <ProjectCard
                key={proj.id}
                project={proj}
                res={res}
                handleDeleteProject={handleDeleteProject}
                handleShareProject={handleShareProject}
                showDeletePopup={showDeletePopup}
                showPreview={showPreview === proj.id}
                handleShow={handleShow}
                handleClose={handleClose}
                setProjectId={setProjectId}
              />
            </div>
          )}
        </Draggable>
      );
    });

  return (
    <>
      <Header {...props} />

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

          <div className={`content-wrapper ${activeFilter}`}>
            <div className="content">
              <div className="row">
                <div className="col-md-12">
                  <div className="program-page-title">
                    <h1>My Projects</h1>
                    <div className="project-page-settings">
                      <div className="sort-project-btns">
                        <div
                          className={
                            activeFilter === 'list-grid'
                              ? 'sort-btn active'
                              : 'sort-btn'
                          }
                          onClick={() => setActiveFilter('list-grid')}
                        >
                          <FontAwesomeIcon icon="bars" />
                        </div>
                        <div
                          className={
                            activeFilter === 'small-grid'
                              ? 'sort-btn active'
                              : 'sort-btn'
                          }
                          onClick={() => setActiveFilter('small-grid')}
                        >
                          <FontAwesomeIcon icon="grip-horizontal" />
                        </div>
                        <div
                          className={
                            activeFilter === 'normal-grid'
                              ? 'sort-btn active'
                              : 'sort-btn'
                          }
                          onClick={() => setActiveFilter('normal-grid')}
                        >
                          <FontAwesomeIcon icon="th-large" />
                        </div>
                      </div>
                      <Link to="/project/create">
                        <div className="btn-top-page">
                          <FontAwesomeIcon icon="plus" className="mr-2" />
                          Add Project
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {!!projectCards && projectCards.length > 0 ? (
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable
                    droppableId="project-droppable-id"
                    direction="horizontal"
                    type="column"
                  >
                    {(provided) => (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div className="row check-home">{projectCards}</div>
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              ) : (
                <>
                  <Alert variant="success">
                    Start building your first Project by clicking on the
                    {' '}
                    <b>Add Project</b>
                    {' '}
                    button.
                    <br />
                    For more information click here:
                    <a
                      target="_blank"
                      rel="noreferrer noopener"
                      className="alert-link-ref"
                      href="https://support.curriki.org/creating-learning-projects"
                    >
                      <b>Getting Started.</b>
                      {' '}
                    </a>
                  </Alert>
                  {/* eslint-disable-next-line */}
                  <video controls className="welcome-video">
                    <source src={welcomVideo} type="video/mp4" />
                  </video>
                </>
              )}
            </div>
          </div>
        </div>

        {(showCreateProjectPopup || showEditProjectPopup) && (
          <NewProjectPage
            {...props}
            handleCloseProjectModal={handleCloseProjectModal}
          />
        )}

        {showDeletePlaylistPopup && (
          <DeletePopup {...props} deleteType="Project" />
        )}
      </ReactPlaceholder>

      <Footer />

      <GoogleModel
        projectId={selectedProjectId}
        show={show} // {props.show}
        onHide={handleClose}
      />
    </>
  );
};

ProjectsPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
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
  loadLms: PropTypes.func.isRequired,
};

ProjectsPage.defaultProps = {
  showPreview: undefined,
  showCreateProjectPopup: false,
  showEditProjectPopup: false,
};

const mapStateToProps = (state) => ({
  project: state.project,
  ui: state.ui,
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
  loadLms: () => dispatch(loadLmsAction()),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectsPage),
);
