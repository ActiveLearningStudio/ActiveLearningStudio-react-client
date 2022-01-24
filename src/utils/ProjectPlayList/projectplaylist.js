/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./projectplaylist.scss";
import ActivityCardDropDown from "utils/ActivityCardDropDown/activitycarddropdown";
import PlayList1 from "assets/images/svg/playlist1.svg";

const ProjectPlayList = ({ className, playList }) => {
  const currikiUtility = classNames("curriki-utility-playlist", className);
  return (
    <div className={currikiUtility}>
      <div className="playlist-top">
        <div className="playlist-card-title">
          <h3>Playlist name #3</h3>
        </div>
        <div className="playlist-card-dropdown">
          <ActivityCardDropDown />
        </div>
      </div>
      <div className="playlist-items-list">
        {/* <div className="playlist-items">
          <img src={PlayList1} alt="" />
          <p>Title</p>
        </div> */}
        {playList?.map((ltem, index) => {
          return (
            <div className="playlist-items" key={index}>
              <img src={ltem.img} alt="" />
              <p>{ltem.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

ProjectPlayList.propTypes = {
  className: PropTypes.string,
  playList: PropTypes.object,
};

export default ProjectPlayList;
