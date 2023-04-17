/* eslint-disable */
import React, { useRef } from "react";
import UploadImg from "assets/images/upload1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./style.scss";

const FileInputDnd = ({ handleChange, acceptFormats, fileError }) => {
  const inputRef = useRef(null);

  const areaClick = (e) => {
    inputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    handleChange(e.target.files[0]);
  };

  const handleDrag = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div
        className="file-upload-dnd-area"
        onClick={areaClick}
        onDrop={handleDrop}
        onDragOver={handleDrag}
      >
        <label>
          <FontAwesomeIcon icon="upload" className="mx-2" />
          Select File
        </label>

        <div className="file-upload-dnd-are-content">
          <img src={UploadImg} alt="Cloud upload image" />
          <p>Drag & drop file or browse to upload</p>
        </div>
      </div>
      <input
        className="file-upload-dnd-input"
        type="file"
        accept={acceptFormats}
        onChange={handleFileChange}
        ref={inputRef}
      />
      {fileError && (
        <div style={{ color: "red" }} className="mt-2">
          {fileError}
        </div>
      )}
    </>
  );
};

export default FileInputDnd;
