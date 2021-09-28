import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import ReactPlaceholder from 'react-placeholder';
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Tabs, Tab } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import QueryString from 'query-string';
import WelcomeVideo from 'assets/video/welcome.mp4';
import searchimg from 'assets/images/search-icon.png';
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
  sampleProjects,
  loadMyFavProjectsAction,
  allSidebarProjects,
} from 'store/actions/project';
import Footer from 'components/Footer';
import DeletePopup from 'components/DeletePopup';
import ProjectsLoading from 'components/Loading/ProjectsLoading';
import GoogleModel from 'components/models/GoogleLoginModal';
// import CompleteProfileAlert from 'components/CompleteProfileAlert';
import { getTeamProject } from 'store/actions/team';
import ProjectCard from './ProjectCard';
import SampleProjectCard from './SampleProjectCard';
import NewProjectPage from './NewProjectPage';
import Headline from './headline';

import './style.scss';

export const ProjectsPage = (props) => {
  const allStateProject = useSelector((state) => state.project);
  const [show, setShow] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [activeFilter, setActiveFilter] = useState('small-grid');
  const [allProjects, setAllProjects] = useState(null);
  const [value, setValue] = useState(0);
  const [projectDivider, setProjectDivider] = useState([]);
  const [sortNumber, setSortNumber] = useState(5);
  const [sampleProject, setSampleProjects] = useState([]);
  const [favProject, setFavProjects] = useState([]);
  const [teamProjects, setTeamProjects] = useState([]);
  const [activeTab, setActiveTab] = useState('My Projects');
  const [showSampleSort, setShowSampleSort] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [meta, setMeta] = useState(1);
  const [tabToggle, setTabToggle] = useState([]);
  const [type, setType] = useState([]);
  const [searchTeamQuery, SetSearchTeamQuery] = useState('');
  const {
    ui,
    match,
    showPreview,
    showCreateProjectPopup,
    showEditProjectPopup,
    showDeletePopup,
    loadMyReorderProjectsActionMethod,
    allSidebarProjectsUpdate,
    sampleProjectsData,
    loadMyFavProjectsActionData,
    location,
    showCreateProjectModal,
    loadProject,
    loadMyProjects,
    loadLms,
    getTeamProjects,
  } = props;

  const allState = useSelector((state) => state);
  const { organization } = allState;
  const { permission } = organization;
  useEffect(() => {
    const query = QueryString.parse(location.search);
    if (query.active === 'fav') {
      setActiveTab('Favorite Projects');
    } else {
      setActiveTab('My Projects');
    }
  }, []);

  useEffect(() => {
    if (!searchTeamQuery) {
      if (organization?.activeOrganization) {
        getTeamProjects('', activePage).then((data) => {
          setTeamProjects(data.data);
          setMeta(data.meta);
        });
      }
    } else if (searchTeamQuery && organization?.activeOrganization) {
      getTeamProjects(searchTeamQuery, activePage).then((data) => {
        setTeamProjects(data.data);
        setMeta(data.meta);
      });
    }
  }, [getTeamProjects, organization?.activeOrganization, activePage]);
  useEffect(() => {
    if (!searchTeamQuery) {
      getTeamProjects('', activePage).then((data) => {
        setTeamProjects(data.data);
        setMeta(data.meta);
      });
    }
  }, [searchTeamQuery]);
  useEffect(() => {
    if (organization.activeOrganization) {
      sampleProjectsData();
    }
  }, [sampleProjectsData, organization.activeOrganization]);

  useEffect(() => {
    if (organization.activeOrganization) {
      loadMyFavProjectsActionData();
    }
  }, [loadMyFavProjectsActionData, organization.activeOrganization]);

  useEffect(() => {
    // if (allState.sidebar.updateProject.length > 0) {
    setFavProjects(allState.sidebar.updateProject);
    // }
  }, [allState.sidebar.updateProject]);

  useEffect(() => {
    if (allState.sidebar.sampleProject.length > 0) {
      setSampleProjects(allState.sidebar.sampleProject);
    }
  }, [allState.sidebar.sampleProject]);
  const handleSearchQueryTeams = () => {
    getTeamProjects(searchTeamQuery || '', activePage).then((data) => {
      setTeamProjects(data.data);
      setMeta(data.meta);
    });
  };
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

  let array6 = [];
  const allChunk = [];

  const divideProjects = (dividerProjects) => {
    dividerProjects.forEach((data, counter) => {
      if ((counter + 1) % sortNumber === 0) {
        array6.push(data);
        allChunk.push({
          id: `project_chunk${counter}`,
          collection: array6,
        });
        array6 = [];
      } else if (allStateProject.projects.length === counter + 1) {
        array6.push(data);
        allChunk.push({
          id: `project_chunk${counter}`,
          collection: array6,
        });
        array6 = [];
      } else {
        array6.push(data);
      }
    });

    setProjectDivider(allChunk);
  };

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      projectDivider.forEach(async (data, index) => {
        if (data.id === source.droppableId) {
          const items = reorder(
            data.collection,
            source.index,
            destination.index,
          );

          projectDivider[index] = {
            id: data.id,
            collection: items,
          };

          setProjectDivider(projectDivider);
          setValue((v) => v + 1);
          const reorderData = await loadMyReorderProjectsActionMethod(projectDivider);

          allSidebarProjectsUpdate();
          setAllProjects(reorderData.projects);
        }
      });
    } else {
      let verticalSource = '';
      let verticalDestination = '';
      projectDivider.forEach((data) => {
        if (data.id === source.droppableId) {
          verticalSource = data.collection;
        }
        if (data.id === destination.droppableId) {
          verticalDestination = data.collection;
        }
      });

      const res = move(
        verticalSource,
        verticalDestination,
        source,
        destination,
      );

      Object.keys(res).forEach((key) => {
        projectDivider.forEach((data, index) => {
          if (data.id === key) {
            projectDivider[index] = {
              id: data.id,
              collection: res[key],
            };
          }
        });
      });

      const updateProjectList = [];
      projectDivider.forEach((data) => data.collection.forEach((arrays) => {
        updateProjectList.push(arrays);
      }));

      setProjectDivider(projectDivider);
      divideProjects(updateProjectList);
      const reorderData = await loadMyReorderProjectsActionMethod(projectDivider);

      allSidebarProjectsUpdate();
      setAllProjects(reorderData.projects);
    }
  };

  useEffect(() => {
    // if (allStateProject.projects.length > 0) {
    setAllProjects(allStateProject.projects);
    divideProjects(allStateProject.projects);
    // }
  }, [allStateProject]);

  useEffect(() => {
    const { activeOrganization } = organization;
    if (activeOrganization) {
      allSidebarProjectsUpdate();
    }
  }, [organization.activeOrganization]);

  useEffect(() => {
    loadLms();

    // scroll to top
    window.scrollTo(0, 0);
    document.body.classList.remove('mobile-responsive');

    if (!showCreateProjectPopup && !showEditProjectPopup && organization.activeOrganization) {
      loadMyProjects();
    }

    if (showEditProjectPopup) {
      loadProject(match.params.projectId);
    } else if (showCreateProjectPopup) {
      showCreateProjectModal();
    }
  }, [match.params.projectId, loadLms, organization.activeOrganization, loadMyProjects, loadProject, showCreateProjectPopup, showCreateProjectModal, showEditProjectPopup]);

  useEffect(() => {
    if (allProjects) {
      divideProjects(allProjects);
    }
  }, [allProjects, sortNumber]);

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
    history.push('/studio/projects');
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

  // const handleTabChange = (key) => {
  //   if (key === 'Favorite Projects') {
  //     setTabToggle(true);
  //   } else if (key === 'Sample Projects') {
  //     setTabToggle(false);
  //   }
  // };
  console.log(teamProjects);
  const { pageLoading, showDeletePlaylistPopup } = ui;
  return (
    <>
      <ReactPlaceholder
        type="media"
        showLoadingAnimation
        customPlaceholder={<ProjectsLoading />}
        ready={!pageLoading}
      >
        <div className={`content-wrapper ${activeFilter}`}>
          <div className="content">
            <Headline />
            {permission?.Project?.includes('project:view')
            ? (
              <Tabs
                onSelect={(eventKey) => {
                  setShowSampleSort(true);
                  setTabToggle(eventKey);
                  if (eventKey === 'Sample Projects') {
                    setType('sample');
                  } else if (eventKey === 'Favorite Projects') {
                    setType('fav');
                  } else if (eventKey === 'Team Projects') {
                    setType('team');
                  }
                }}
                className="main-tabs"
                defaultActiveKey={activeTab}
                id="uncontrolled-tab-example"
              >
                <Tab eventKey="My Projects" title="My Projects">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="col-md-12">
                        {/* <div className="program-page-title">
                          <h1>My Projects</h1>
                          <div className="project-page-settings">
                            <div className="sort-project-btns">
                              <div
                                className={activeFilter === 'list-grid' ? 'sort-btn active' : 'sort-btn'}
                                onClick={() => {
                                  // const allchunk = [];
                                  // let counterSimpl = 0;
                                  setActiveFilter('list-grid');
                                  setSortNumber(-1);
                                  divideProjects(allProjects);
                                }}
                              >
                                <FontAwesomeIcon icon="bars" />
                              </div>
                              <div
                                className={activeFilter === 'small-grid' ? 'sort-btn active' : 'sort-btn'}
                                onClick={() => {
                                  setActiveFilter('small-grid');
                                  setSortNumber(5);
                                  divideProjects(allProjects);
                                }}
                              >
                                <FontAwesomeIcon icon="grip-horizontal" />
                              </div>
                              <div
                                className={activeFilter === 'normal-grid' ? 'sort-btn active' : 'sort-btn'}
                                onClick={() => {
                                  setActiveFilter('normal-grid');
                                  setSortNumber(4);
                                  divideProjects(allProjects);
                                }}
                              >
                                <FontAwesomeIcon icon="th-large" />
                              </div>
                            </div>
                          </div>
                        </div> */}
                      </div>
                      {
                      !!projectDivider && projectDivider.length > 0 ? (
                        <DragDropContext onDragEnd={onDragEnd}>
                          {projectDivider.map((rowData) => (
                            <Droppable
                              key={rowData.id}
                              droppableId={rowData.id}
                              // direction="horizontal"
                              // type="row"
                              className="drag-class"
                              direction="horizontal"
                            >
                              {(provided) => (
                                <div
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                >
                                  <div className="check-home" id={value}>
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
                                          {(provid) => (
                                            <div
                                              className="playlist-resource"
                                              ref={provid.innerRef}
                                              {...provid.draggableProps}
                                              {...provid.dragHandleProps}
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
                          ))}
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

                          {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                          <video controls className="welcome-video">
                            <source src={WelcomeVideo} type="video/mp4" />
                          </video>
                        </>
                      )
                      }
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="Sample Projects" title="Sample Projects">
                  <div className="row">
                    <div className="col-md-12" style={{ display: 'none' }}>
                      <div className="program-page-title">
                        <h1>Sample Projects</h1>

                        {(showSampleSort && sampleProject.length === 0) && (
                          <div className="project-page-settings">
                            <div className="sort-project-btns">
                              <div
                                className={activeFilter === 'list-grid' ? 'sort-btn active' : 'sort-btn'}
                                onClick={() => {
                                  // const allchunk = [];
                                  // let counterSimpl = 0;
                                  setActiveFilter('list-grid');
                                  setSortNumber(-1);
                                  divideProjects(allProjects);
                                }}
                              >
                                <FontAwesomeIcon icon="bars" />
                              </div>
                              <div
                                className={activeFilter === 'small-grid' ? 'sort-btn active' : 'sort-btn'}
                                onClick={() => {
                                  setActiveFilter('small-grid');
                                  setSortNumber(5);
                                  divideProjects(allProjects);
                                }}
                              >
                                <FontAwesomeIcon icon="grip-horizontal" />
                              </div>
                              <div
                                className={activeFilter === 'normal-grid' ? 'sort-btn active' : 'sort-btn'}
                                onClick={() => {
                                  setActiveFilter('normal-grid');
                                  setSortNumber(4);
                                  divideProjects(allProjects);
                                }}
                              >
                                <FontAwesomeIcon icon="th-large" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="flex-smaple">
                        {sampleProject.length > 0
                          ? <SampleProjectCard projects={sampleProject} activeTab={tabToggle} type={type} setShowSampleSort={setShowSampleSort} />
                        : <Alert variant="warning"> No sample project found.</Alert>}
                      </div>
                    </div>
                  </div>
                </Tab>
                {permission?.Project?.includes('project:favorite') && (
                  <Tab eventKey="Favorite Projects" title="Favorite Projects">
                    <div className="row">
                      <div className="col-md-12" style={{ display: 'none' }}>
                        <div className="program-page-title">
                          <h1>Favorite Projects</h1>
                          {(showSampleSort && favProject.length === 0) && (
                            <div className="project-page-settings">
                              <div className="sort-project-btns">
                                <div
                                  className={
                                    activeFilter === 'list-grid'
                                      ? 'sort-btn active'
                                      : 'sort-btn'
                                  }
                                  onClick={() => {
                                    // const allchunk = [];
                                    // var counterSimpl = 0;
                                    setActiveFilter('list-grid');
                                    setSortNumber(-1);
                                    divideProjects(allProjects);
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
                                    setSortNumber(5);
                                    divideProjects(allProjects);
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
                                    divideProjects(allProjects);
                                  }}
                                >
                                  <FontAwesomeIcon icon="th-large" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="flex-smaple">
                          {favProject.length > 0 ? (
                            <SampleProjectCard projects={favProject} type={type} activeTab={tabToggle} setShowSampleSort={setShowSampleSort} />
                          ) : (
                            <Alert variant="warning">No Favorite Project found.</Alert>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tab>
                )}
                <Tab
                  eventKey="Team Projects"
                  title="Team Projects"
                >
                  <div className="row">
                    <div className="col-md-12" style={{ display: 'none' }}>
                      <div className="program-page-title">
                        <h1>Team Projects</h1>
                      </div>
                    </div>
                    <div className="col-md-12">
                      {showSampleSort && (
                        <div className="search-bar-team-tab">
                          <input type="text" placeholder="Search team projects" value={searchTeamQuery} onChange={({ target }) => SetSearchTeamQuery(target.value)} />
                          <img src={searchimg} alt="search" onClick={handleSearchQueryTeams} />

                        </div>
                      )}
                      <div className="flex-smaple">
                        {teamProjects.length > 0 ? (
                          <SampleProjectCard
                            projects={teamProjects}
                            type={type}
                            activeTab={tabToggle}
                            setShowSampleSort={setShowSampleSort}
                            handleShow={handleShow}
                            handleClose={handleClose}
                            setProjectId={setProjectId}
                          />
                        ) : (
                          <Alert variant="warning">No Team Project found.</Alert>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="pagination-top-team">
                    <div className="pagination_state">
                      <Pagination
                        activePage={activePage}
                        pageRangeDisplayed={5}
                        itemsCountPerPage={meta?.per_page}
                        totalItemsCount={meta?.total}
                        onChange={(e) => {
                          // setCurrentTab("index");
                          window.scrollTo(0, 0);
                          setActivePage(e);
                        }}
                      />
                    </div>
                  </div>
                </Tab>
              </Tabs>
            ) : (
              <Alert variant="danger"> You are not authorized to view Projects</Alert>
            )}
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
  loadMyReorderProjectsActionMethod: PropTypes.func.isRequired,
  allSidebarProjectsUpdate: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  sampleProjectsData: PropTypes.func.isRequired,
  loadMyFavProjectsActionData: PropTypes.func.isRequired,
  getTeamProjects: PropTypes.func.isRequired,
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
  loadMyReorderProjectsActionMethod: (projectDivider) => dispatch(loadMyReorderProjectsAction(projectDivider)),
  allSidebarProjectsUpdate: () => dispatch(allSidebarProjects()),
  sampleProjectsData: () => dispatch(sampleProjects()),
  loadMyFavProjectsActionData: () => dispatch(loadMyFavProjectsAction()),
  getTeamProjects: (query, page) => dispatch(getTeamProject(query, page)),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProjectsPage),
);
