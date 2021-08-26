/*eslint-disable*/
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./uploadimagev2.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PexelsAPI from "../../components/models/pexels";
import DefaultImage from "assets/images/activitycard.png";
import PixelUpload from "assets/images/svg/pixelupload.svg";
import uploadimageoption from "assets/images/uploadimageoption.png";
import Swal from "sweetalert2";
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
  const openFile = useRef();
  return (
    <>
      <PexelsAPI
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          setUploadImageStatus(false);
        }}
        searchName="abstract"
      />
      <div className={currikiUtility}>
        <h3>Upload an image</h3>
        <div className="uploadimage-box">
          <img src={DefaultImage} alt="" />
        </div>
        <div className="uploadimage-option">
          <label style={{ display: "none" }}>
            <input
              ref={openFile}
              type="file"
              accept="image/x-png,image/jpeg"
              onChange={(e) => {
                if (e.target.files.length === 0) {
                  return true;
                }
                if (
                  !(
                    e.target.files[0].type.includes("png") ||
                    e.target.files[0].type.includes("jpg") ||
                    e.target.files[0].type.includes("gif") ||
                    e.target.files[0].type.includes("jpeg")
                  )
                ) {
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Invalid file selected.",
                  });
                } else if (e.target.files[0].size > 100000000) {
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Selected file size should be less then 100MB.",
                  });
                } else {
                  uploadThumb(e);
                }
              }}
            />
            <span>Upload</span>
          </label>
          <button
            type="button"
            onClick={() => {
              openFile.current.click();
            }}
            className="btn-mr-27"
          >
            Upload from computer
            <FontAwesomeIcon icon={faLaptop} className="mr-20" />
          </button>
          <button
            type="button"
            onClick={() => {
              setModalShow(true);
              setUploadImageStatus(true);
            }}
          >
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
