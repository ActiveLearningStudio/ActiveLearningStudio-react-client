/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./uploadfile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadImg from "../../assets/images/upload1.png";
import { faCloud, faUpload } from "@fortawesome/free-solid-svg-icons";

const UploadFile = ({ className }) => {
  const currikiUtility = classNames("curriki-utility-uploadfile", className);
  return (
    <>
      <div className={currikiUtility}>
        <h3>Load saved activity</h3>
        <div className="uploadfile-box">
          <button>
            <FontAwesomeIcon icon={faUpload} className="curriki_btn-mr-2" />
            Select File
          </button>
          <div className="uploadfile-option">
            <img src={UploadImg} alt="" />
            <p>
              Drag & Drop File or <span className="upload-browse">browse</span>{" "}
              to upload
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

UploadFile.propTypes = {
  className: PropTypes.string,
};

export default UploadFile;
