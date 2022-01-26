import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Buttons from 'utils/Buttons/buttons';
import { Tabs, Tab, Alert } from 'react-bootstrap';
import searchimg from 'assets/images/svg/search-icon-admin-panel.svg';
import './style.scss';
import {
  faAngleLeft,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import TeamProjectCard from 'utils/TeamProjectCard/teamprojectcard';
// import Project1 from 'assets/images/teamprojects/project1.png';
// import Project2 from 'assets/images/teamprojects/project2.png';
// import Project3 from 'assets/images/teamprojects/project3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchInterface from 'containers/Search';
import { useSelector, useDispatch } from 'react-redux';
import { loadMyProjectsAction } from 'store/actions/project';

const AddTeamProjects = (props) => {
  const { organization, team, setCreationMode } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [allPersonalProjects, setAllPersonalProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectProject, setSelectProject] = useState([]);
  const projectReduxState = useSelector((state) => state.project);

  // USE EFFECT FOR FETCHING ALL PROJECTS IF COMPONENT IS NOT FETCHED IN CREATION STAGE
  useEffect(() => {
    // Edit mode
    if (team?.id && projectReduxState?.projects?.length > 0) {
      const allProjects = projectReduxState?.projects.filter(
        (project) => !team?.projects.includes(project.id),
      );
      setAllPersonalProjects(allProjects);
      setLoading(false);
    } else if (team?.id && projectReduxState?.projects?.length === 0) {
      dispatch(loadMyProjectsAction());
    }
    // Creation mode
    if (!team?.id && projectReduxState?.projects?.length > 0) {
      setAllPersonalProjects(projectReduxState?.projects);
      setLoading(false);
    } else if (!team?.id && projectReduxState?.projects?.length === 0) {
      dispatch(loadMyProjectsAction());
    }
  }, [dispatch, projectReduxState?.projects, team]);

  return (
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
              setCreationMode(false);
            } else {
              history.push(`/org/${organization?.domain}/teams`);
              setCreationMode(true);
            }
          }}
        >
          <FontAwesomeIcon icon={faAngleLeft} className="back-icon" />
          <span>Back to team</span>
        </div>
      </div>

      <div className="project-tabs">
        <Tabs
          className="main-tabs"
          defaultActiveKey="Projects"
          id="uncontrolled-tab-example"
        >
          <Tab eventKey="Projects" title="Projects">
            <div className="flex-button-top">
              <div className="team-controller">
                <div className="search-and-filters">
                  <div className="search-bar">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search project"
                    />
                    <img src={searchimg} alt="search" />
                  </div>
                </div>

                <div className="team-project-btns">
                  <div className="project-selection">
                    <p>
                      {selectProject?.length}
                      {' '}
                      projects have been selected.
                      {' '}
                    </p>
                  </div>
                  <Buttons
                    icon={faPlus}
                    type="button"
                    text="Add projects to team"
                    primary
                    width="188px"
                    height="32px"
                    hover
                  />
                </div>
              </div>
            </div>
            <div className="list-of-team-projects">
              {loading ? <Alert variant="primary" className="alert">Loading...</Alert> : allPersonalProjects?.map((project) => (
                <TeamProjectCard
                  backgroundImg={project?.thumb_url}
                  title={project?.name}
                  className="mrt"
                  key={project?.id}
                  selectProject={selectProject}
                  setSelectProject={setSelectProject}
                  project={project}
                />
              ))}
            </div>
          </Tab>
          <Tab eventKey="Search" title="Search">
            <div className="flex-button-top">
              <div className="team-controller">
                <div className="search-and-filters">
                  <div className="search-bar">
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search project"
                    />
                    <img src={searchimg} alt="search" />
                  </div>
                </div>

                <div className="team-project-btns">
                  <div className="project-selection">
                    <p>
                      {selectProject?.length}
                      {' '}
                      projects have been selected.
                      {' '}
                    </p>
                  </div>
                  <Buttons
                    icon={faPlus}
                    text="Add projects to team"
                    type="button"
                    primary
                    width="188px"
                    height="32px"
                    hover
                    disabled={selectProject?.length === 0}
                  />
                </div>
              </div>
            </div>
            <SearchInterface fromTeam selectProject={selectProject} setSelectProject={setSelectProject} />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

AddTeamProjects.propTypes = {
  team: PropTypes.object,
  organization: PropTypes.object.isRequired,
  setCreationMode: PropTypes.func.isRequired,
};

AddTeamProjects.defaultProps = { team: {} };

export default AddTeamProjects;
