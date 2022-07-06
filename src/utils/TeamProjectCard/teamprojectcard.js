/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./teamprojectcard.scss";
import Swal from "sweetalert2";

const TeamProjectCard = ({
  className,
  backgroundImg,
  title,
  setSelectProject,
  selectProject,
  project,
}) => {
  const currikiUtility = classNames(
    "curriki-utility-teamproject-card",
    className
  );
  return (
    <div className={currikiUtility}>
      <div
        className={
          selectProject[0] === project.id
            ? "teamproject-card-top select-project-status"
            : " teamproject-card-top noselect-project-status"
        }
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="project-checkbox-select">
          <label className="checkbox_section">
            <div
              className="assign-project-radio"
              onClick={() => {
                if (selectProject.length === 0) {
                  setSelectProject([project.id]);
                } else if (selectProject[0] === project.id) {
                  setSelectProject([]);
                } else {
                  Swal.fire({
                    icon: "warning",
                    title: "Action Prohibited",
                    text: "You are only allowed to select 1 project.",
                  });
                }
              }}
            >
              {selectProject[0] === project.id && (
                <span className="checkmark" />
              )}
            </div>
          </label>
        </div>
        <div className="teamproject-card-title">
          <h2>{title}</h2>
          <div className="update-title-tag">
            Updated date: {project?.updated_at?.split("T")[0]}
          </div>
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
