/* eslint-disable */
import React, { useRef } from 'react';
import UploadImg from "assets/images/upload1.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './style.scss';

const FileInputDnd = ({ handleChange }) => {
  const inputRef = useRef(null);

  const areaClick = (e) => {
    inputRef.current.click();
  };
  
  return (
    <>
      <div className="file-upload-dnd-area" onClick={areaClick}>
        <label>
          <FontAwesomeIcon icon="upload" className="mx-2"/>
          Select File
        </label>

        <div className="file-upload-dnd-are-content">
          <img src={UploadImg} alt="Cloud upload image"/>
          <p>Drag & drop file or browse to upload</p>
        </div>
      </div>
      <input className="file-upload-dnd-input" type="file" accept=".pdf" onChange={handleChange} ref={inputRef}/>
    </>
  );
};

export default FileInputDnd;