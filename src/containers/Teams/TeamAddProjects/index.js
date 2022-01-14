import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Buttons from 'utils/Buttons/buttons';
import { Tabs, Tab } from 'react-bootstrap';
import searchimg from 'assets/images/svg/search-icon-admin-panel.svg';
import './style.scss';
import {
  faAngleLeft,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import TeamProjectCard from 'utils/TeamProjectCard/teamprojectcard';
import Project1 from 'assets/images/teamprojects/project1.png';
import Project2 from 'assets/images/teamprojects/project2.png';
import Project3 from 'assets/images/teamprojects/project3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchInterface from 'containers/Search';
import { useSelector, useDispatch } from 'react-redux';
import { loadMyProjectsAction } from 'store/actions/project';

const AddTeamProjects = (props) => {
  const { creation } = props;
  const dispatch = useDispatch();
  const [allPersonalProjects, setAllPersonalProjects] = useState([]);
  console.log(allPersonalProjects);
  const projectReduxState = useSelector((state) => state.project);
  const teamReduxState = useSelector((state) => state.team);
  const { selectedTeam } = teamReduxState;
  // USE EFFECT FOR FETCHING ALL PROJECTS IF COMPONENT IS NOT FETCHED IN CREATION STAGE
  useEffect(() => {
    // Edit mode
    if (!creation && selectedTeam?.id && projectReduxState?.projects) {
      const allProjects = projectReduxState?.projects.filter(
        (project) => !selectedTeam?.projects.includes(project.id),
      );
      setAllPersonalProjects(allProjects);
    } else if (!creation && selectedTeam?.id && projectReduxState?.projects.length === 0) {
      dispatch(loadMyProjectsAction());
    }
    // Creation mode
    if (creation && projectReduxState?.projects) {
      setAllPersonalProjects(projectReduxState?.projects);
    } else if (creation && projectReduxState?.projects.length === 0) {
      dispatch(loadMyProjectsAction());
    }
  }, [creation, dispatch, projectReduxState?.projects, selectedTeam]);
  return (
    <div className="add-team-projects">
      <div className="team-projects-top-section">
        <div>
          <div className="organization-name">Curriki Studio</div>
          <div className="title-image">
            <div>
              <h1 className="title">Add projects</h1>
            </div>
          </div>
        </div>
        <div
          className="back-to-section"
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
                    <p>5 projects have been selected. </p>
                  </div>
                  <Buttons
                    icon={faPlus}
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
              <TeamProjectCard
                backgroundImg={Project1}
                title="The Curriki Vision"
                className="mrt"
              />
              <TeamProjectCard
                backgroundImg={Project2}
                title="The Curriki Vision"
                className="mrt"
              />
              <TeamProjectCard
                backgroundImg={Project3}
                title="The Curriki Vision"
                className="mrt"
              />
              <TeamProjectCard
                backgroundImg={Project1}
                title="The Curriki Vision"
                className="mrt"
              />
              <TeamProjectCard
                backgroundImg={Project2}
                title="The Curriki Vision"
                className="mrt"
              />
              <TeamProjectCard
                backgroundImg={Project3}
                title="The Curriki Vision"
                className="mrt"
              />
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
                    <p>5 projects have been selected. </p>
                  </div>
                  <Buttons
                    icon={faPlus}
                    text="Add projects to team"
                    primary
                    width="188px"
                    height="32px"
                    hover
                  />
                </div>
              </div>
            </div>
            <SearchInterface fromTeam />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

AddTeamProjects.propTypes = {
  creation: PropTypes.bool,
};

AddTeamProjects.defaultProps = { creation: false };

export default AddTeamProjects;
