/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./addvideocard.scss";
import ActivityCardDropDown from "utils/ActivityCardDropDown/activitycarddropdown";
import ProjectListDropDown from "utils/ProjectListDropDown/projectlistdropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faEye, faFolderOpen } from "@fortawesome/free-solid-svg-icons";

const AddVideoCard = ({
  className,
  backgroundImg,
  title,
  selectionStatus = false,
  setAddActivityPopUp,
}) => {
  const [changeAddActivityPopUp, setChangeAddActivityPopUp] = useState(false);
  const currikiUtility = classNames("curriki-utility-addvideo-card", className);
  return (
    <>
      <div className={currikiUtility}>
        <div
          className="addvideo-card-top"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        >
          <div className="addvideo-card-dropdown">
            <ActivityCardDropDown iconColor="white" />
          </div>
          <div className="addvideo-card-title">
            <h2>{title}</h2>
          </div>
        </div>
        <div className="addvideo-card-detail">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>

        <div className="addvideo-card-add-share">
          <div className="btn-box">
            <FontAwesomeIcon
              icon={faEye}
              style={{ marginRight: "12px" }}
              color="#084892"
            />
            <FontAwesomeIcon
              icon={faEdit}
              style={{ marginRight: "12px" }}
              color="#084892"
            />
          </div>
        </div>
        {selectionStatus && (
          <div className="addvideo-selection-box">
            <input type="checkbox" />
            <span>Select</span>
          </div>
        )}
      </div>
    </>
  );
};

AddVideoCard.propTypes = {
  className: PropTypes.string,
  backgroundImg: PropTypes.string,
  title: PropTypes.string,
  listView: PropTypes.bool,
  selectionStatus: PropTypes.bool,
};

export default AddVideoCard;
