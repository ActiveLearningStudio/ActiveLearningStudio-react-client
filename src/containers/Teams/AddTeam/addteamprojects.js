/*eslint-disable */
import React from 'react';
import Buttons from 'utils/Buttons/buttons';
import { Alert, Tabs, Tab } from 'react-bootstrap';
import searchimg from 'assets/images/svg/search-icon-admin-panel.svg';
import './style.scss';
import { faAngleLeft, faAngleRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import TeamProjectCard from 'utils/TeamProjectCard/teamprojectcard';
import Project1 from 'assets/images/teamprojects/project1.png';
import Project2 from 'assets/images/teamprojects/project2.png';
import Project3 from 'assets/images/teamprojects/project3.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SearchInterface from 'containers/Search';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
const AddTeamProjects = ({ setPageLoad }) => {
  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <div className="add-team-projects">
      <div className="team-projects-top-section">
        <div>
          <div className="organization-name">CurrikiStudio</div>
          <div className="title-image">
            <div>
              <h1 className="title">Add projects</h1>
            </div>
          </div>
        </div>
        <div
          className="back-to-section"
          onClick={() => {
            setPageLoad((oldStatus) => !oldStatus);
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
                <div className="search-and-filters">
                  <div className="search-bar">
                    <input type="text" className="search-input" placeholder="Search project" />
                    {/*  <img src={searchimg} alt="search" />*/}
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" css-inspector-installed="true">
                      <path
                        d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58175 3 3.00003 6.58172 3.00003 11C3.00003 15.4183 6.58175 19 11 19Z"
                        stroke={primaryColor}
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path d="M21 20.9984L16.65 16.6484" stroke={primaryColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </div>
                </div>

                <div className="team-project-btns">
                  <div className="project-selection">
                    <p>5 projects have been selected. </p>
                  </div>
                  <Buttons icon={faPlus} text="Add Project to team" primary={true} width="188px" height="32px" hover={true} />
                </div>
              </div>
            </div>
            <div className="list-of-team-projects">
              <TeamProjectCard backgroundImg={Project1} title="The Curriki Vision" className="mrt" />
              <TeamProjectCard backgroundImg={Project2} title="The Curriki Vision" className="mrt" />
              <TeamProjectCard backgroundImg={Project3} title="The Curriki Vision" className="mrt" />
              <TeamProjectCard backgroundImg={Project1} title="The Curriki Vision" className="mrt" />
              <TeamProjectCard backgroundImg={Project2} title="The Curriki Vision" className="mrt" />
              <TeamProjectCard backgroundImg={Project3} title="The Curriki Vision" className="mrt" />
            </div>
          </Tab>
          <Tab eventKey="Search" title="Search">
            <div className="flex-button-top">
              <div className="team-controller">
                <div className="search-and-filters">
                  <div className="search-bar">
                    <input type="text" className="search-input" placeholder="Search project" />
                    <img src={searchimg} alt="search" />
                  </div>
                </div>

                <div className="team-project-btns">
                  <div className="project-selection">
                    <p>5 projects have been selected. </p>
                  </div>
                  <Buttons icon={faPlus} text="Add project to team" primary={true} width="188px" height="32px" hover={true} />
                </div>
              </div>
            </div>
            <SearchInterface fromTeam={true} />
          </Tab>
        </Tabs>
      </div>
      {/* <div className="flex-button-top">
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
              primary={true}
              width="188px"
              height="32px"
              hover={true}
            />
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AddTeamProjects;
