/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./uploadimage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShareAlt,
  faLaptop,
  faLink,
  faHdd,
  faParachuteBox,
} from "@fortawesome/free-solid-svg-icons";

const UploadImage = ({ text, color, className, id, children }) => {
  const currikiUtility = classNames("curriki-utility-uploadimage", className);
  return (
    <div className={currikiUtility}>
      <p>Upload an image</p>
      <div className="uploadimage-box"></div>
      <div className="uploadimage-option">
        <FontAwesomeIcon icon={faLaptop} className="upload-option mr-20" />
        <FontAwesomeIcon icon={faLink} className="upload-option mr-20" />
        <FontAwesomeIcon icon={faHdd} className="upload-option mr-20" />
        <FontAwesomeIcon
          icon={faParachuteBox}
          className="upload-option mr-20"
        />
      </div>
    </div>
  );
};

UploadImage.propTypes = {
  text: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string,
  id: PropTypes.string,
};

export default UploadImage;
