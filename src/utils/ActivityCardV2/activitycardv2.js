/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./activitycardv2.scss";
import ActivityCardDropDown from "utils/ActivityCardDropDown/activitycarddropdown";
import ProjectPlayList from "utils/ProjectPlayList/projectplaylist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faPlus, faShare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";
import ProjectListDropDown from "utils/ProjectListDropDown/projectlistdropdown";

const ActivityCardV2 = ({
  className,
  backgroundImg,
  title,
  listView = false,
  selectionStatus = false,
  setAddActivityPopUp,
}) => {
  const [changeAddActivityPopUp, setChangeAddActivityPopUp] = useState(false);
  const currikiUtility = classNames(
    "curriki-utility-activitycard-card",
    className
  );
  return (
    <>
      {listView ? (
        <div className="activitycard-top-listView">
          <div className="activitycard-header-listView">
            <div className="activitycard-text-listView">
              <p>
                <span></span> Published
              </p>
            </div>
            <div className="status-card-listView">
              <ActivityCardDropDown />
            </div>
          </div>
          <div className="activitycard-body-listView">
            {/* <div className="body-image">
            <img src={backgroundImg} alt="" />
          </div> */}
            <div className="body-title-detail">
              <div className="title-listView">
                <h2>{title}</h2>
              </div>
              <div className="detail-listView">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.
                </p>
              </div>
            </div>
            <div className="body-project-detail">
              <div className="share-text">
                <span>Shared in</span>
              </div>
              <div className="btn-box">
                <ProjectListDropDown />
                {/* <button style={{ width: "108px", height: "32px" }}>
                  <FontAwesomeIcon
                    icon={faFolderOpen}
                    style={{ marginRight: "12px" }}
                    color="#084892"
                  />
                  2 projects
                </button> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          className={currikiUtility}
          style={selectionStatus ? { height: "400px" } : { height: "340px" }}
        >
          <div
            className="activitycard-card-top"
            style={{ backgroundImage: `url(${backgroundImg})` }}
          >
            <div className="activitycard-card-dropdown">
              <ActivityCardDropDown iconColor="white" />
            </div>
            <div className="activitycard-card-title">
              <h2>{title}</h2>
            </div>
          </div>
          <div className="activitycard-card-detail">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor.
            </p>
          </div>
          <div className="activitycard-card-status">
            <p>
              <span></span> Shared
            </p>
          </div>
          <div className="activitycard-card-add-share">
            <div className="share-text">
              <span>Shared in</span>
            </div>
            <div className="btn-box">
              <ProjectListDropDown />
              {/* <button style={{ width: "108px", height: "32px" }}>
                <FontAwesomeIcon
                  icon={faFolderOpen}
                  style={{ marginRight: "12px" }}
                  color="#084892"
                />
                2 projects
              </button> */}
            </div>
          </div>
          {selectionStatus && (
            <div className="activity-selection-box">
              <input
                type="checkbox"
                onClick={() => {
                  setAddActivityPopUp(!changeAddActivityPopUp);
                  setChangeAddActivityPopUp(!changeAddActivityPopUp);
                }}
              />
              <span>Select</span>
            </div>
          )}
        </div>
      )}

      {/* ListView */}
    </>
  );
};

ActivityCardV2.propTypes = {
  className: PropTypes.string,
  backgroundImg: PropTypes.string,
  title: PropTypes.string,
  listView: PropTypes.bool,
  selectionStatus: PropTypes.bool,
};

export default ActivityCardV2;
