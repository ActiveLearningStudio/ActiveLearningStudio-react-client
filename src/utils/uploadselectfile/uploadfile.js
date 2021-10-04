/*eslint-disable*/
import React, { useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import "./uploadfile.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadImg from "../../assets/images/upload1.png";
import { faCloud, faUpload } from "@fortawesome/free-solid-svg-icons";
import Buttons from "utils/Buttons/buttons";
import { createResourceByH5PUploadAction } from "store/actions/resource";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

const UploadFile = ({ className, metadata }) => {
  const { selectedLayout, playlist, project } = useSelector(
    (state) => state.myactivities
  );
  const imgUpload = useRef();
  const dispatch = useDispatch();
  const currikiUtility = classNames("curriki-utility-uploadfile", className);
  return (
    <>
      <div className={currikiUtility}>
        <h3>Load saved activity</h3>
        <div className="uploadfile-box">
          <button onClick={() => imgUpload.current.click()}>
            <FontAwesomeIcon icon={faUpload} className="curriki_btn-mr-2" />
            Select File
          </button>
          <div className="uploadfile-option">
            <img src={UploadImg} alt="" />
            <p>
              Drag & Drop File or <span className="upload-browse">browse</span>{" "}
              to upload
            </p>
            <input
              ref={imgUpload}
              style={{ display: "none" }}
              type="file"
              onChange={(event) => {
                const h5pFile = event.target.files[0];
                const fileArr = h5pFile.name.split(".");
                const fileExtension =
                  fileArr.length > 0 ? fileArr[fileArr.length - 1] : "";
                if (fileExtension !== "h5p") {
                  Swal.fire("Invalid file selected, kindly select h5p file.");
                  return true;
                }
                const submitAction = "upload";
                const payload = {
                  event,
                  submitAction,
                  h5pFile,
                };
                dispatch(
                  createResourceByH5PUploadAction(
                    playlist.id,
                    selectedLayout.h5pLib,
                    selectedLayout.type,
                    payload,
                    metadata,
                    project
                  )
                );
              }}
            />
          </div>
        </div>
        {/* <div className="upload-btn">
          <Buttons
            text="upload"
            primary={true}
            width="142px"
            height="35px"
            hover={true}
          />
        </div> */}
      </div>
    </>
  );
};

UploadFile.propTypes = {
  className: PropTypes.string,
};

export default UploadFile;
