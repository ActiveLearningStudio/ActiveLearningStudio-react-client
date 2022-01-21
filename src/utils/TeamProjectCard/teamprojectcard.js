/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./teamprojectcard.scss";
import ActivityCardDropDown from "utils/ActivityCardDropDown/activitycarddropdown";
import ProjectPlayList from "utils/ProjectPlayList/projectplaylist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faLink } from "@fortawesome/free-solid-svg-icons";

const TeamProjectCard = ({ className, backgroundImg, title, setSelectProject, selectProject, project }) => {
  const currikiUtility = classNames(
    "curriki-utility-teamproject-card",
    className
  );
  return (
    <div className={currikiUtility}>
      <div
        className={
          selectProject.includes(project.id)
            ? "teamproject-card-top select-project-status"
            : " teamproject-card-top noselect-project-status"
        }
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="project-checkbox-select">
          <label className="checkbox_section">
            <input type="checkbox" />
            <span
              onClick={() => {
                if (selectProject.includes(project.id)) {
                  setSelectProject(selectProject.filter(item => item !== project.id));
                } else {
                  setSelectProject([...selectProject, project.id]);
                }
              }}
            ></span>
          </label>
        </div>
        <div className="teamproject-card-title">
          <h2>{title}</h2>
          <div>Created date: {project?.created_at.split('T')[0]}</div>
        </div>
      </div>
    </div>
  );
};

TeamProjectCard.propTypes = {
  className: PropTypes.string,
  backgroundImg: PropTypes.string,
  title: PropTypes.string,
};

export default TeamProjectCard;
