/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./myteamcard.scss";
import ActivityCardDropDown from "utils/ActivityCardDropDown/activitycarddropdown";
import ProjectPlayList from "utils/ProjectPlayList/projectplaylist";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faEye,
  faLink,
  faPlus,
  faShare,
  faShareAlt,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
// import { Link } from "react-router-dom";

const MyTeamCard = ({ className, backgroundImg, title, description }) => {
  const currikiUtility = classNames(
    "curriki-utility-myproject-card",
    className
  );
  return (
    <div className={currikiUtility}>
      <div
        className="myproject-card-top"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="myproject-card-dropdown">
          <ActivityCardDropDown iconColor="white" />
        </div>
        <div className="myproject-card-title">
          <h2>{title}</h2>
        </div>
      </div>
      <div className="myproject-card-detail">
        <p>
          {description}
        </p>
      </div>
      <div className="my-project-icons">
        <FontAwesomeIcon icon={faEye} color="#084892" className="icon-edit" />
        <FontAwesomeIcon icon={faEdit} color="#084892" className="icon-edit" />
        <FontAwesomeIcon icon={faLink} color="#084892" className="icon-edit" />
      </div>
    </div>
  );
};

MyTeamCard.propTypes = {
  className: PropTypes.string,
  backgroundImg: PropTypes.string,
  title: PropTypes.string,
};

export default MyTeamCard;
