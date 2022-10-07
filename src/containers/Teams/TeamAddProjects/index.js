/* eslint-disable  */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Buttons from 'utils/Buttons/buttons';
import { Tabs, Tab, Alert } from 'react-bootstrap';
// import searchimg from 'assets/images/svg/search-icon-admin-panel.svg';
import './style.scss';
import { faAngleLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import TeamProjectCard from 'utils/TeamProjectCard/teamprojectcard';
// import Project1 from 'assets/images/teamprojects/project1.png';
// import Project2 from 'assets/images/teamprojects/project2.png';
// import Project3 from 'assets/images/teamprojects/project3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchInterface from 'containers/Search';
import { useSelector, useDispatch, connect } from 'react-redux';
import { loadMyProjectsAction } from 'store/actions/project';
import { createTeamAction, loadTeamAction, setNewTeamData, addProjectsAction, loadTeamsAction } from 'store/actions/team';
import Swal from 'sweetalert2';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import SearchInputMdSvg from 'iconLibrary/mainContainer/SearchInputMdSvg';

const AddTeamProjects = (props) => {
  const { location, organization, team, newTeam, newTeamData, createTeam, loadTeam, loadTeams, addProjectToTeam } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [allPersonalProjects, setAllPersonalProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectProject, setSelectProject] = useState([]);
  const projectReduxState = useSelector((state) => state.project);
  const { teamPermission } = useSelector((state) => state.team);
  // use effect to redirect user to team page if newTeam is not found
  useEffect(() => {
    if (location.pathname.includes('/teams/add-projects') && !newTeam?.name && organization?.domain) {
      history.push(`/org/${organization?.domain}/teams`);
    } else if (!team?.id && !newTeam?.name && organization?.domain) {
      const teamId = parseInt(location.pathname.split('teams/')[1], 10);
      loadTeam(teamId);
    }
  }, [organization]);
  // useEffect to add projects to new team as we select them
  useEffect(() => {
    if (newTeam?.projects && newTeam?.name) {
      newTeamData({ ...newTeam, projects: [...selectProject] });
    } else if (selectProject.length > 0 && newTeam?.name) {
      newTeamData({ ...newTeam, projects: [...selectProject] });
    }
  }, [selectProject]);

  // USE EFFECT FOR FETCHING ALL PROJECTS IF COMPONENT IS NOT FETCHED IN CREATION STAGE
  useEffect(() => {
    // Edit mode
    if (team?.id && projectReduxState?.projects?.length > 0) {
      const allProjects = projectReduxState?.projects.filter((project) => !team?.projects.includes(project.id));
      setAllPersonalProjects(allProjects);
      setLoading(false);
    } else if (team?.id && projectReduxState?.projects?.length === 0 && organization?.id) {
      dispatch(loadMyProjectsAction());
    }
    // Creation mode
    if (!team?.id && projectReduxState?.projects?.length > 0) {
      setAllPersonalProjects(projectReduxState?.projects);
      setLoading(false);
    } else if (!team?.id && projectReduxState?.projects?.length === 0 && organization?.id) {
      dispatch(loadMyProjectsAction());
    }
  }, [dispatch, projectReduxState?.projects, team, organization?.id]);
  const searchProjects = ({ target }) => {
    const { value } = target;
    if (value.length > 0) {
      const filteredProjects = allPersonalProjects.filter((project) => project.name.toLowerCase().includes(value.toLowerCase()));
      setAllPersonalProjects(filteredProjects);
    } else if (team?.id) {
      const allProjects = projectReduxState?.projects.filter((project) => !team?.projects.includes(project.id));
      setAllPersonalProjects(allProjects);
    } else if (!team?.id) {
      setAllPersonalProjects(projectReduxState?.projects);
      setLoading(false);
    }
  };
  const primaryColor = getGlobalColor('--main-primary-color');

  const updateTeamProject = async (id) => {
    await loadTeam(id);
  };
  return (
    <div className="team-project-page">
      <div className="content">
        <div className="inner-content">
          <div className="add-team-projects">
            <div className="team-projects-top-section">
              <div>
                <div className="organization-name">{organization?.name}</div>
                <div className="title-image">
                  <div>
                    <h1 className="title">Add projects</h1>
                  </div>
                </div>
              </div>
              <div
                className="back-to-section"
                onClick={() => {
                  if (team?.id) {
                    history.push(`/org/${organization?.domain}/teams/${team?.id}`);
                  } else {
                    history.push(`/org/${organization?.domain}/teams`);
                  }
                }}
              >
                <FontAwesomeIcon icon={faAngleLeft} className="back-icon" />
                <span>Back to team</span>
              </div>
            </div>

            <div className="project-tabs">
              <Tabs className="main-tabs" defaultActiveKey="Projects" id="uncontrolled-tab-example">
                <Tab eventKey="Projects" title="Projects">
                  <div className="flex-button-top">
                    <div className="team-controller">
                      {team?.id && (
                        <div className="search-and-filters">
                          <div className="search-bar">
                            <input type="text" className="search-input" placeholder="Search project" onChange={searchProjects} />
                            <SearchInputMdSvg primaryColor={primaryColor} />
                          </div>
                        </div>
                      )}

                      <div className="team-project-btns">
                        <div className="project-selection">
                          <p>{selectProject?.length} projects have been selected. </p>
                        </div>
                        {teamPermission?.Team?.includes('team:add-project') && team?.id && (
                          <Buttons
                            icon={faPlus}
                            type="button"
                            text="Add project to team"
                            primary
                            width="188px"
                            height="32px"
                            hover
                            onClick={async () => {
                              if (selectProject.length > 0) {
                                addProjectToTeam(team?.id, selectProject)
                                  .then((result) => {
                                    // loadTeam(team?.id);
                                    // updateTeamProject(team?.id);
                                    Swal.fire({
                                      icon: 'success',
                                      title: result?.message,
                                    });
                                    loadTeam(team?.id);
                                    history.push(`/org/${organization?.domain}/teams/${team?.id}`);
                                  })
                                  .catch((err) => {
                                    Swal.fire({
                                      icon: 'error',
                                      title: err?.message,
                                    });
                                  });
                              }
                            }}
                          />
                        )}
                        {newTeam?.name && (
                          <Buttons
                            type="button"
                            text="Finish"
                            primary
                            width="100px"
                            height="32px"
                            hover
                            onClick={() => {
                              Swal.showLoading();
                              createTeam({
                                ...newTeam,
                                organization_id: organization?.id,
                              })
                                .then(() => {
                                  Swal.fire({
                                    icon: 'success',
                                    title: 'Team added successfully.',
                                  });
                                  loadTeams();
                                  history.push(`/org/${organization?.domain}/teams`);
                                })
                                .catch((err) => {
                                  console.log(err);
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Error',
                                    text: 'Create Team failed, kindly try again.',
                                  });
                                });
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="list-of-team-projects">
                    {loading ? (
                      <Alert variant="primary" className="alert">
                        Loading...
                      </Alert>
                    ) : allPersonalProjects.length > 0 ? (
                      allPersonalProjects?.map((project) => (
                        <TeamProjectCard
                          backgroundImg={project?.thumb_url}
                          title={project?.name}
                          className="mrt"
                          key={project?.id}
                          selectProject={selectProject}
                          setSelectProject={setSelectProject}
                          project={project}
                        />
                      ))
                    ) : (
                      <Alert variant="danger" className="alert">
                        No project found.
                      </Alert>
                    )}
                  </div>
                </Tab>
                <Tab eventKey="Search" title="Search">
                  <div className="flex-button-top">
                    <div className="team-controller">
                      <div className="team-project-btns">
                        <div className="project-selection">
                          <p>{selectProject?.length} projects have been selected. </p>
                        </div>
                        <Buttons
                          icon={faPlus}
                          text="Add project to team"
                          type="button"
                          primary
                          width="188px"
                          height="32px"
                          hover
                          disabled={selectProject?.length === 0}
                          onClick={() => {
                            if (selectProject.length > 0) {
                              addProjectToTeam(team?.id, selectProject)
                                .then((result) => {
                                  Swal.fire({
                                    icon: 'success',
                                    title: result?.message,
                                  });
                                  loadTeam(team?.id);
                                  history.push(`/org/${organization?.domain}/teams/${team?.id}`);
                                })
                                .catch((err) => {
                                  Swal.fire({
                                    icon: 'error',
                                    title: err?.message,
                                  });
                                });
                            }
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <SearchInterface fromTeam selectProject={selectProject} setSelectProject={setSelectProject} />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

AddTeamProjects.propTypes = {
  location: PropTypes.object.isRequired,
  team: PropTypes.object.isRequired,
  organization: PropTypes.object.isRequired,
  newTeam: PropTypes.object.isRequired,
  newTeamData: PropTypes.func.isRequired,
  createTeam: PropTypes.func.isRequired,
  loadTeam: PropTypes.func.isRequired,
  loadTeams: PropTypes.func.isRequired,
  addProjectToTeam: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  team: state.team.selectedTeam,
  newTeam: state.team.newTeam,
  organization: state.organization.activeOrganization,
});
const mapDispatchToProps = (dispatch) => ({
  newTeamData: (team) => dispatch(setNewTeamData(team)),
  createTeam: (data) => dispatch(createTeamAction(data)),
  loadTeam: (teamId) => dispatch(loadTeamAction(teamId)),
  loadTeams: () => dispatch(loadTeamsAction()),
  addProjectToTeam: (teamId, projectId) => dispatch(addProjectsAction(teamId, projectId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(AddTeamProjects);
