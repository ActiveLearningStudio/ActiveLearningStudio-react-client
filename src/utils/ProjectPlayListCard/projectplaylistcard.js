/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./projectplaylistcard.scss";
import ActivityCardDropDown from "utils/ActivityCardDropDown/activitycarddropdown";
import ProjectPlayList from "utils/ProjectPlayList/projectplaylist";

const ProjectPlayListCard = ({ className, backgroundImg, playList }) => {
  const currikiUtility = classNames("curriki-utility-playlistcard", className);
  return (
    <div className={currikiUtility}>
      <div
        className="playlistcard-top"
        style={{ backgroundImage: `url(${backgroundImg})` }}
      >
        <div className="playlistcard-dropdown">
          <ActivityCardDropDown iconColor="white" />
        </div>
        <div className="playlistcard-title">
          <h2>Project name #2</h2>
        </div>
      </div>
      <div className="playlistcard-playlist">
        <ProjectPlayList playList={playList} />
      </div>
    </div>
  );
};

ProjectPlayListCard.propTypes = {
  className: PropTypes.string,
  backgroundImg: PropTypes.string,
  playList: PropTypes.string,
};

export default ProjectPlayListCard;
