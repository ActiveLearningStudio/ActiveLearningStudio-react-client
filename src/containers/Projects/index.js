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
  loadMyReorderProjectsAction,
  loadLmsAction,
} from 'store/actions/project';
import {allSidebarProjects} from 'store/actions/project';
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
  const [value, setValue] = useState(0);
  const [projectDivider, setProjectDivider] = useState([]);
  const [sortNumber, setSortNumber] = useState(4);

  const {
    ui,
    showPreview,
    showCreateProjectPopup,
    showEditProjectPopup,
    showDeletePopup,
    loadMyReorderProjectsActionMethod,
    allSidebarProjectsUpdate
  } = props;

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
  };

  var array6 = [];
  var allchunk = [];
  const divideProjects = (divderProjects) => {
    divderProjects.map((data, counter) => {
      if ((counter + 1) % sortNumber === 0) {
        array6.push(data);
        allchunk.push({
          id: `project_chunk${counter}`,
          collection: array6,
        });
        array6 = [];
      } else if (allStateProject.projects.length === counter + 1) {
        array6.push(data);
        allchunk.push({
          id: `project_chunk${counter}`,
          collection: array6,
        });
        array6 = [];
      } else {
        array6.push(data);
      }
    });
    setProjectDivider(allchunk);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      projectDivider.map((data, index) => {
        if (data.id === source.droppableId) {
          const items = reorder(
            data.collection,
            source.index,
            destination.index
          );

          projectDivider[index] = {
            id: data.id,
            collection: items,
          };
        
          loadMyReorderProjectsActionMethod(projectDivider)
          setProjectDivider(projectDivider);
          setValue((value) => value=value+1);
          allSidebarProjectsUpdate()
        }
      });
    } else {
      var verticalsource = '';
      var verticaldestination = '';
      projectDivider.map((data) => {
        if (data.id === source.droppableId) {
          verticalsource = data.collection
        }
        if (data.id === destination.droppableId) {
          verticaldestination = data.collection
        }
      });

      const result = move(
        verticalsource,
        verticaldestination,
        source,
        destination
      );

      Object.keys(result).map((key) => {
        projectDivider.map((data, index) => {
          if (data.id === key) {
            projectDivider[index] = {
              id: data.id,
              collection: result[key],
            };
          }
        });
      });

      var updateProjectList = [];
      projectDivider.map((data) => {
        return data.collection.map((arrrays) => {
          updateProjectList.push(arrrays);
        });
      });
      loadMyReorderProjectsActionMethod(projectDivider)
      setProjectDivider(projectDivider);
      divideProjects(updateProjectList);
      allSidebarProjectsUpdate()
     
    }
  };

  useEffect(() => {
    if (allStateProject.projects.length > 0) {
      setAllProjects(allStateProject.projects);
      divideProjects(allStateProject.projects);
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
  }, []);

  useEffect(() => {
    if (!!allProjects) {
      divideProjects(allProjects);
    }
  }, [sortNumber]);
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

  const { pageLoading, showDeletePlaylistPopup } = ui;

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
                          onClick={() => {
                            setActiveFilter('list-grid');
                          }}
                        >
                          <FontAwesomeIcon icon="bars" />
                        </div>
                        <div
                          className={
                            activeFilter === 'small-grid'
                              ? 'sort-btn active'
                              : 'sort-btn'
                          }
                          onClick={() => {
                            setActiveFilter('small-grid');
                            setSortNumber(6, () => {
                              divideProjects(allProjects);
                            });
                          }}
                        >
                          <FontAwesomeIcon icon="grip-horizontal" />
                        </div>
                        <div
                          className={
                            activeFilter === 'normal-grid'
                              ? 'sort-btn active'
                              : 'sort-btn'
                          }
                          onClick={() => {
                            setActiveFilter('normal-grid');
                            setSortNumber(4);
                          }}
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
              {
                //!!projectCards && projectCards.length > 0
                !!projectDivider && projectDivider.length > 0 ? (
                  <DragDropContext onDragEnd={onDragEnd}>
                    {projectDivider.map((rowData) => {
                      return (
                        <Droppable
                          droppableId={rowData.id}
                          //direction="horizontal"
                          //type="row"
                          direction="horizontal"
                        >
                          {(provided) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              <div className="row check-home" id={value}>
                                {rowData.collection.map((proj, index) => {
                                  const res = {
                                    title: proj.name,
                                    id: proj.id,
                                    deleteType: 'Project',
                                  };
                                return (
                                  <Draggable
                                    key={proj.id}
                                    draggableId={`${proj.id}`}
                                    index={index}
                                  >
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
                                          activeFilter={activeFilter}
                                        />
                                      </div>
                                    )}
                                  </Draggable>
                                );
                                })}
                              </div>
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      );
                    })}
                  </DragDropContext>
                ) : (
                  <>
                    <Alert variant="success">
                      Start building your first Project by clicking on the{' '}
                      <b>Add Project</b> button.
                      <br />
                      For more information click here:
                      <a
                        target="_blank"
                        rel="noreferrer noopener"
                        className="alert-link-ref"
                        href="https://support.curriki.org/creating-learning-projects"
                      >
                        <b>Getting Started.</b>{' '}
                      </a>
                    </Alert>
                    {/* eslint-disable-next-line */}
                    <video controls className="welcome-video">
                      <source src={welcomVideo} type="video/mp4" />
                    </video>
                  </>
                )
              }
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
  loadMyReorderProjectsActionMethod:PropTypes.func.isRequired,
  allSidebarProjectsUpdate:PropTypes.func.isRequired
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
  createProject: (name, description, thumbUrl) =>
    dispatch(createProjectAction(name, description, thumbUrl)),
  showDeletePopup: (id, title, deleteType) =>
    dispatch(showDeletePopupAction(id, title, deleteType)),
  deleteProject: (id) => dispatch(deleteProjectAction(id)),
  hideDeletePopup: () => dispatch(hideDeletePopupAction()),
  loadProject: (id) => dispatch(loadProjectAction(id)),
  shareProject: (id) => dispatch(shareProjectAction(id)),
  loadLms: () => dispatch(loadLmsAction()),
  loadMyReorderProjectsActionMethod:(projectDivider)=>dispatch(loadMyReorderProjectsAction(projectDivider)),
  allSidebarProjectsUpdate:()=>dispatch(allSidebarProjects())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectsPage)
);
