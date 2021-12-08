/*eslint-disable */
import React from "react";
import Buttons from "utils/Buttons/buttons";
import { Alert, Tabs, Tab } from "react-bootstrap";
import searchimg from "assets/images/svg/search-icon-admin-panel.svg";
import "./style.scss";
import {
  faAngleLeft,
  faAngleRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import TeamProjectCard from "utils/TeamProjectCard/teamprojectcard";
import Project1 from "assets/images/teamprojects/project1.png";
import Project2 from "assets/images/teamprojects/project2.png";
import Project3 from "assets/images/teamprojects/project3.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const AddTeamProjects = ({ setPageLoad }) => {
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
          onClick={() => {
            setPageLoad((oldStatus) => !oldStatus);
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
          <Tab eventKey="Projects" title="Projects"></Tab>
          <Tab eventKey="Search" title="Search"></Tab>
        </Tabs>
      </div>
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
              primary={true}
              width="188px"
              height="32px"
              hover={true}
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
    </div>
  );
};

export default AddTeamProjects;
