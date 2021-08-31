/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./uploadimage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PexelsAPI from "../../components/models/pexels";
import DefaultImage from "assets/images/activitycard.png";
import {
  faLaptop,
  faLink,
  faHdd,
  faParachuteBox,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

const UploadImage = ({ className, setUploadImageStatus }) => {
  const [modalShow, setModalShow] = useState(false);
  const currikiUtility = classNames("curriki-utility-uploadimage", className);
  const project = useSelector((state) => state.project);
  return (
    <>
      <PexelsAPI
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setUploadImageStatus(false);
        }}
        project={project}
        searchName="abstract"
      />
      <div className={currikiUtility}>
        <p>Upload an image</p>
        <div
          className="uploadimage-box"
          style={{
            backgroundImage: project.thumbUrl
              ? project.thumbUrl.includes("pexels.com")
                ? `url(${project.thumbUrl})`
                : `url(${global.config.resourceUrl}${project.thumbUrl})`
              : `url(${DefaultImage})`,
          }}
        >
          {/* <img src={DefaultImage} alt="" /> */}
        </div>
        <div className="uploadimage-option">
          <FontAwesomeIcon icon={faLaptop} className="upload-option mr-20" />
          <FontAwesomeIcon icon={faLink} className="upload-option mr-20" />
          <FontAwesomeIcon icon={faHdd} className="upload-option mr-20" />
          <FontAwesomeIcon
            icon={faParachuteBox}
            className="upload-option mr-20"
            onClick={() => {
              setModalShow(true);
              setUploadImageStatus(true);
            }}
          />
        </div>
      </div>
    </>
  );
};

UploadImage.propTypes = {
  className: PropTypes.string,
};

export default UploadImage;
