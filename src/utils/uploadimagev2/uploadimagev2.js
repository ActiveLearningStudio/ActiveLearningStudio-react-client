/*eslint-disable*/
import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./uploadimagev2.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PexelsAPI from "../../components/models/pexels";
import DefaultImage from "assets/images/activitycard.png";
import PixelUpload from "assets/images/svg/pixelupload.svg";
import uploadimageoption from "assets/images/uploadimageoption.png";
import {
  faLaptop,
  faLink,
  faHdd,
  faParachuteBox,
} from "@fortawesome/free-solid-svg-icons";

const UploadImageV2 = ({ className, setUploadImageStatus }) => {
  const [modalShow, setModalShow] = useState(false);
  const currikiUtility = classNames("curriki-utility-uploadimageV2", className);
  const [project, setProject] = useState();
  return (
    <>
      {/* <PexelsAPI
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setUploadImageStatus(false);
        }}
        searchName="abstract"
      /> */}
      <div className={currikiUtility}>
        <h3>Upload an image</h3>
        <div className="uploadimage-box">
          <img src={uploadimageoption} alt="" />
        </div>
        <div className="uploadimage-option">
          <button className="btn-mr-27">
            Upload from computer
            <FontAwesomeIcon icon={faLaptop} className="mr-20" />
          </button>
          <button>
            Select from Pexels
            <FontAwesomeIcon icon={faLaptop} className="mr-20" />
          </button>
        </div>
      </div>
    </>
  );
};

UploadImageV2.propTypes = {
  className: PropTypes.string,
};

export default UploadImageV2;
