/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./projectlist.scss";
import ActivityCardDropDown from "utils/ActivityCardDropDown/activitycarddropdown";
import PlayList1 from "assets/images/svg/playlist1.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const ProjectList = ({ className, projectTitle, playList }) => {
  const currikiUtility = classNames("curriki-utility-projectlist", className);
  return (
    <div className={currikiUtility}>
      <div className="playlist-top">
        <div className="playlist-card-title">
          <h3>{projectTitle}</h3>
        </div>
        <div className="playlist-card-dropdown">
          <ActivityCardDropDown />
        </div>
      </div>
      <div className="playlist-items-list">
        {/* <div className="project-list-items">
          <div className="project-list-title">
            <p>Activity #1</p>
          </div>
          <div className="project-list-status-dropdown">
            <div className="project-list-status">
              <p>
                <span></span> Shared
              </p>
            </div>
            <div className="project-list-dropdown">
              <ActivityCardDropDown />
            </div>
          </div>
        </div> */}
        {playList?.map((ltem, index) => {
          return (
            <div className="project-list-items">
              <div className="project-list-title">
                <p>{ltem.title}</p>
              </div>
              <div className="project-list-status-dropdown">
                <div className="project-list-status">
                  {ltem?.status && (
                    <p>
                      <span></span> {ltem.status}
                    </p>
                  )}
                </div>
                <div className="project-list-dropdown">
                  <ActivityCardDropDown />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="project-list-add-activity">
        <a href="#" className="add-activity-link">
          <FontAwesomeIcon icon={faPlus} style={{ marginRight: "20px" }} />
          Add new Activity
        </a>
      </div>
    </div>
  );
};

ProjectList.propTypes = {
  className: PropTypes.string,
  projectTitle: PropTypes.string,
  playList: PropTypes.object,
};

export default ProjectList;
