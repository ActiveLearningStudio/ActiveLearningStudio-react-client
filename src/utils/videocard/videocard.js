/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./videocard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import H5PIcon from "../../assets/images/hp5icon.png";
import { faCloud, faUpload } from "@fortawesome/free-solid-svg-icons";

const VideoCard = ({ className }) => {
  const currikiUtility = classNames("curriki-utility-videocard", className);
  return (
    <>
      <div className={currikiUtility}>
        <h3>Load saved activity</h3>
        <div className="vidoe-section">
          <iframe
            width="100%"
            height="200"
            frameborder="0"
            src="https://www.youtube.com/embed/ngXSzWNYzU4"
            title="https://youtu.be/ngXSzWNYzU4"
          ></iframe>
        </div>
        <div className="video-detail">
          <img src={H5PIcon} alt="" />
          <p>
            An HTML5-based interactive video content type allowing users to add
            multiple choice and fill in the blank questions, pop-up text and
            other types of interactions to their videos using only a web
            browser.
          </p>
        </div>
        <div className="video-demo-link">
          <a href="#">View demo</a>
        </div>
      </div>
    </>
  );
};

VideoCard.propTypes = {
  className: PropTypes.string,
};

export default VideoCard;
