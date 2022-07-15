/* eslint-disable */
import React, { useState, useEffect, memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
// import ReactPlaceholder from "react-placeholder";
import Pagination from 'react-js-pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Alert, Tabs, Tab } from 'react-bootstrap';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import QueryString from 'query-string';

import ProjectCardSkeleton from 'components/Skeletons/projectCard';

import searchimg from 'assets/images/search-icon.png';
import { showDeletePopupAction, hideDeletePopupAction } from 'store/actions/ui';
import { toast } from 'react-toastify';
import loader from 'assets/images/loader.svg';
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
  setCurrentVisibilityType,
  // allSidebarProjects,
} from 'store/actions/project';
import DeletePopup from 'components/DeletePopup';
import GoogleModel from 'components/models/GoogleLoginModal';
// import CompleteProfileAlert from 'components/CompleteProfileAlert';
import { getTeamProject } from 'store/actions/team';
import Initialpage from './initialProjectPage';
import ProjectCard from './ProjectCard';
import SampleProjectCard from './SampleProjectCard';
import NewProjectPage from './NewProjectPage';
import Headline from './headline';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import { Dropdown } from 'react-bootstrap';
import './style.scss';
import StartingPage from 'utils/StartingPage/startingpage';
// import MyProjects from "./MyProjects";
const ImgLoader = () => <img src={loader} alt="loader" />;
export const ProjectsPage = (props) => {
  const allStateProject = useSelector((state) => state.project);
  const [show, setShow] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [activeFilter, setActiveFilter] = useState('small-grid');
  const [allProjects, setAllProjects] = useState(null);
  const [value, setValue] = useState(0);
  const [projectDivider, setProjectDivider] = useState(null);
  const [sortNumber, setSortNumber] = useState(5);
  const [customCardWidth, setCustomCardWidth] = useState('customcard20');
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
  const [createProject, setCreateProject] = useState(false);

  const samplerRef = useRef();
  const {
    ui,
    showPreview,
    showDeletePopup,
    loadMyReorderProjectsActionMethod,
    // allSidebarProjectsUpdate,
    sampleProjectsData,
    loadMyFavProjectsActionData,
    location,
    loadMyProjects,
    loadLms,
    getTeamProjects,
    project,
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
    const sw = window.innerWidth;
    if (sw < 1200) {
      setSortNumber(3);
      setCustomCardWidth('customcard30');
    } else if (sw < 1600) {
      setSortNumber(4);
      setCustomCardWidth('customcard50');
    } else if (sw > 1600) {
      setSortNumber(6);
      setCustomCardWidth('customcard60');
    }
  }, [window.innerWidth]);

  useEffect(() => {
    if (!searchTeamQuery) {
      if (organization?.currentOrganization) {
        getTeamProjects('', activePage).then((data) => {
          setTeamProjects(data.data);
          setMeta(data.meta);
        });
      }
    } else if (searchTeamQuery && organization?.currentOrganization) {
      getTeamProjects(searchTeamQuery, activePage).then((data) => {
        setTeamProjects(data.data);
        setMeta(data.meta);
      });
    }
  }, [searchTeamQuery, organization?.currentOrganization, getTeamProjects, activePage]);
  useEffect(() => {
    if (!searchTeamQuery && organization?.currentOrganization) {
      getTeamProjects('', activePage).then((data) => {
        setTeamProjects(data.data);
        setMeta(data.meta);
      });
    }
  }, [activePage, getTeamProjects, organization?.currentOrganization, searchTeamQuery]);
  useEffect(() => {
    if (organization?.currentOrganization) {
      sampleProjectsData();
    }
  }, [sampleProjectsData, organization?.currentOrganization]);

  useEffect(() => {
    if (organization?.currentOrganization) {
      loadMyFavProjectsActionData();
    }
  }, [loadMyFavProjectsActionData, organization?.currentOrganization]);

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
      } else if (allStateProject.projects.length + 1 === counter + 1) {
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
    const { source, destination, draggableId } = result;
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      projectDivider?.forEach(async (data, index) => {
        if (data.id === source.droppableId) {
          const items = reorder(data.collection, source.index, destination.index);

          projectDivider[index] = {
            id: data.id,
            collection: items,
          };

          setProjectDivider(projectDivider);
          setValue((v) => v + 1);
          await loadMyReorderProjectsActionMethod(draggableId, projectDivider);
        }
      });
    } else {
      let verticalSource = '';
      let verticalDestination = '';
      projectDivider?.forEach((data) => {
        if (data.id === source.droppableId) {
          verticalSource = data.collection;
        }
        if (data.id === destination.droppableId) {
          verticalDestination = data.collection;
        }
      });

      const res = move(verticalSource, verticalDestination, source, destination);

      Object.keys(res).forEach((key) => {
        projectDivider?.forEach((data, index) => {
          if (data.id === key) {
            projectDivider[index] = {
              id: data.id,
              collection: res[key],
            };
          }
        });
      });

      const updateProjectList = [];
      projectDivider?.forEach((data) =>
        data.collection.forEach((arrays) => {
          updateProjectList.push(arrays);
        })
      );

      setProjectDivider(projectDivider);
      divideProjects(updateProjectList);
      await loadMyReorderProjectsActionMethod(draggableId, projectDivider);
    }
  };

  useEffect(() => {
    if (allStateProject) {
      toast.dismiss();
      setAllProjects(allStateProject.projects);
    }
  }, [allStateProject]);

  useEffect(() => {
    loadLms();
  }, [loadLms]);
  useEffect(() => {
    // scroll to top
    window.scrollTo(0, 0);
    document.body.classList.remove('mobile-responsive');

    if (organization.activeOrganization && !allState.projects) {
      if (organization?.currentOrganization) {
        loadMyProjects();
      }
    }
  }, [allState.projects, loadMyProjects, organization.activeOrganization, organization?.currentOrganization]);

  useEffect(() => {
    if (allProjects) {
      divideProjects([{ type: 'create' }, ...allProjects]);
      if (allProjects.length === 0) {
        setProjectDivider([]);
      }
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

  const { showDeletePlaylistPopup } = ui;
  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <>
      <div className={`content-wrapper ${activeFilter}`}>
        <div className={`inner-content  ${customCardWidth}`}>
          <div className="">
            <Headline setCreateProject={setCreateProject} />
            {permission?.Project?.includes('project:view') ? (
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
                  {!!projectDivider?.length && (
                    <div className="my-project-cards-top-search-filter">
                      <div className="search-bar">
                        <input className="" type="text" placeholder="Search" />

                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ cursor: 'pointer' }}>
                          <path
                            d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58175 3 3.00003 6.58172 3.00003 11C3.00003 15.4183 6.58175 19 11 19Z"
                            stroke={primaryColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path d="M21 20.9984L16.65 16.6484" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div className="activity-counter">
                        <div className="pagination-counter drop-counter ">
                          My Project per page
                          <span>
                            <Dropdown>
                              <Dropdown.Toggle id="dropdown-basic">10</Dropdown.Toggle>

                              <Dropdown.Menu>
                                <Dropdown.Item
                                // onClick={() => {
                                //   setSize(10);
                                //   setActivePage(1);
                                // }}
                                >
                                  10
                                </Dropdown.Item>
                                <Dropdown.Item
                                // onClick={() => {
                                //   setSize(25);
                                //   setActivePage(1);
                                // }}
                                >
                                  25
                                </Dropdown.Item>
                                <Dropdown.Item
                                // onClick={() => {
                                //   setSize(50);
                                //   setActivePage(1);
                                // }}
                                >
                                  50
                                </Dropdown.Item>
                                <Dropdown.Item
                                // onClick={() => {
                                //   setSize(100);
                                //   setActivePage(1);
                                // }}
                                >
                                  100
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </span>
                        </div>
                      </div>
                      {/* <div className="filter-dropdown-project">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.8334 3H2.16669L6.83335 8.25556V11.8889L9.16669 13V8.25556L13.8334 3Z"
                          stroke={primaryColor}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Filter
                    </div> */}
                    </div>
                  )}
                  <div className="row">
                    <div className="col-md-12">
                      {allProjects ? (
                        projectDivider?.length > 0 ? (
                          <>
                            <div className="project-list-all">
                              {/* <div className="add-project-block">

                            </div> */}

                              <DragDropContext onDragEnd={onDragEnd}>
                                {projectDivider?.map((rowData, indexFirst) => (
                                  <Droppable
                                    key={rowData.id}
                                    droppableId={rowData.id}
                                    // direction="horizontal"
                                    // type="row"
                                    className="drag-class"
                                    direction="horizontal"
                                  >
                                    {(provided) => (
                                      <>
                                        <div {...provided.droppableProps} ref={provided.innerRef}>
                                          <div className="check-home" id={value}>
                                            {/* <div id={value}> */}

                                            {rowData.collection.map((proj, index) => {
                                              const res = {
                                                title: proj.name,
                                                id: proj.id,
                                                deleteType: 'Project',
                                              };
                                              return index === 0 && indexFirst === 0 ? (
                                                permission?.Project?.includes('project:create') && (
                                                  <div
                                                    className="Add-my-project-section playlist-resource"
                                                    onClick={() => {
                                                      setCurrentVisibilityType(null);
                                                      setCreateProject(true);
                                                    }}
                                                  >
                                                    <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path
                                                        d="M2 26C2.03441 26 34.0143 26.0003 50 26.0005"
                                                        stroke={primaryColor}
                                                        stroke-width="4"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                      />
                                                      <path
                                                        d="M26 50C26 49.9656 26 17.9857 26 2"
                                                        stroke={primaryColor}
                                                        stroke-width="4"
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                      />
                                                    </svg>
                                                    <span>Create new project</span>
                                                  </div>
                                                )
                                              ) : (
                                                <Draggable key={proj.id} draggableId={`${proj.id}`} index={index}>
                                                  {(provid) => (
                                                    <div className="playlist-resource" ref={provid.innerRef} {...provid.draggableProps} {...provid.dragHandleProps}>
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
                                                        setCreateProject={setCreateProject}
                                                      />
                                                    </div>
                                                  )}
                                                </Draggable>
                                              );
                                            })}
                                          </div>
                                          {provided.placeholder}
                                        </div>
                                      </>
                                    )}
                                  </Droppable>
                                ))}
                              </DragDropContext>
                            </div>
                          </>
                        ) : (
                          // <Initialpage />
                          <StartingPage
                            createBtnTitle="Create new project"
                            createTitle="Start creating engaging activities."
                            createDetail="We have a library of over 40 “interactive-by-design” learning activities to create inmersive experiences.
                          Start by creating a new Activity or choose a guide from the right to learn more."
                            helpBtnTitle="Help center"
                            helpTitle="Learn how it works"
                            helpDetail="Create your learning content using interactive activities.
                          Organize your content by projects."
                            onClick={() => {
                              setCurrentVisibilityType(null);
                              setCreateProject(true);
                            }}
                          />
                        )
                      ) : (
                        <div className="d-flex ">
                          <ProjectCardSkeleton />
                          <ProjectCardSkeleton />
                          <ProjectCardSkeleton />
                        </div>
                      )}
                    </div>
                  </div>
                </Tab>
                {permission?.Project?.includes('project:favorite') && (
                  <Tab eventKey="Favorite Projects" title="Favorite Projects">
                    <div className="row">
                      <div className="col-md-12" style={{ display: 'none' }}>
                        <div className="program-page-title">
                          <h1>Favorite Projects</h1>
                          {showSampleSort && favProject.length === 0 && (
                            <div className="project-page-settings">
                              <div className="sort-project-btns">
                                <div
                                  className={activeFilter === 'list-grid' ? 'sort-btn active' : 'sort-btn'}
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
                          {favProject.length > 0 ? (
                            <SampleProjectCard
                              projects={favProject}
                              type={type}
                              activeTab={tabToggle}
                              setType={setType}
                              setTabToggle={setTabToggle}
                              setShowSampleSort={setShowSampleSort}
                            />
                          ) : (
                            <Alert variant="warning">No Favorite Project found.</Alert>
                          )}
                        </div>
                      </div>
                    </div>
                  </Tab>
                )}
                <Tab eventKey="Sample Projects" ref={samplerRef} title="Sample Projects">
                  <div className="row">
                    <div className="col-md-12" style={{ display: 'none' }}>
                      <div className="program-page-title">
                        <h1>Sample Projects</h1>

                        {showSampleSort && sampleProject.length === 0 && (
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
                        {sampleProject.length > 0 ? (
                          <SampleProjectCard
                            projects={sampleProject}
                            activeTab={tabToggle}
                            setType={setType}
                            setTabToggle={setTabToggle}
                            type={type}
                            setShowSampleSort={setShowSampleSort}
                          />
                        ) : (
                          <Alert variant="warning"> No sample project found.</Alert>
                        )}
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="Team Projects" title="Team Projects">
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
                            setType={setType}
                            setTabToggle={setTabToggle}
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
                      {showSampleSort && teamProjects.length > 0 && (
                        <Pagination
                          activePage={activePage}
                          pageRangeDisplayed={5}
                          itemsCountPerPage={Number(meta?.per_page)}
                          totalItemsCount={Number(meta?.total)}
                          onChange={(e) => {
                            // setCurrentTab("index");
                            window.scrollTo(0, 0);
                            setActivePage(e);
                          }}
                        />
                      )}
                    </div>
                  </div>
                </Tab>
              </Tabs>
            ) : (
              <Alert variant="danger"> You are not authorized to view Projects</Alert>
            )}
          </div>
        </div>
      </div>
      {createProject && <NewProjectPage project={project} handleCloseProjectModal={setCreateProject} />}

      {showDeletePlaylistPopup && <DeletePopup {...props} deleteType="Project" />}

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
  // allSidebarProjectsUpdate: PropTypes.func.isRequired,
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
  loadMyReorderProjectsActionMethod: (projectId, dividerProjects) => dispatch(loadMyReorderProjectsAction(projectId, dividerProjects)),
  // allSidebarProjectsUpdate: () => dispatch(allSidebarProjects()),
  sampleProjectsData: () => dispatch(sampleProjects()),
  loadMyFavProjectsActionData: () => dispatch(loadMyFavProjectsAction()),
  getTeamProjects: (query, page) => dispatch(getTeamProject(query, page)),
});

export default memo(withRouter(connect(mapStateToProps, mapDispatchToProps)(ProjectsPage)));
