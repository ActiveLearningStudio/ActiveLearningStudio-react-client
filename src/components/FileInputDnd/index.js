/* eslint-disable */
import React, { useState, useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import btnLogo from 'assets/images/googleBtnLogo.png';
import axios from 'axios';
import TabsHeading from "utils/Tabs/tabs";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import { Tabs, Tab, Alert } from "react-bootstrap";
import HeadingThree from "utils/HeadingThree/headingthree";
import UploadImg from "assets/images/upload1.png";

const FileInputDnd = ({ className, handleChange }) => {
  const primaryColor = getGlobalColor("--main-primary-color");
  
  return (
    <div className="curriki-utility-uploadfile">
      <div className="uploadfile-box">
        <div className="drop-area">
          <button
            onClick={() => {
              // imgUpload.current.click();
              // setUploadedFile();
            }}
            type="reset"
          >
            <svg
              width="15"
              height="12"
              className="mr-2"
              viewBox="0 0 15 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                // eslint-disable-next-line max-len
                d="M1.5 7V10.2C1.5 10.4122 1.65804 10.6157 1.93934 10.7657C2.22064 10.9157 2.60218 11 3 11H12C12.3978 11 12.7794 10.9157 13.0607 10.7657C13.342 10.6157 13.5 10.4122 13.5 10.2V7"
                stroke={primaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10.1499 3.39999L7.5249 1L4.8999 3.39999"
                stroke={primaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 1V8.79997"
                stroke={primaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Select File
          </button>
          <input
            type="file"
            name="h5p_file"
            id="h5p-file"
            className="laravel-h5p-upload form-control"
            onChange={async (e) => {
              e.preventDefault();
            }}
            style={{
              cursor: "pointer",
              background: "#F1F1F1",
              padding: "160px 41px 0px 41px",
              borderRadius: "8px",
              border: "none",
            }}
            onClick={(e) => {
              // e.target.value = "";
            }}
          />
          <div
            onClick={() => {
              // imgUpload.current.click();
              // setUploadedFile();
            }}
            className="upload-holder"
            style={{ cursor: "pointer" }}
          >
            <img
              style={{ cursor: "pointer" }}
              src={UploadImg}
              alt="upload"
              className="mr-2"
            />
            <p>
              Drag & drop file or&nbsp;
              <span style={{ color: "#2e8df5" }}>browse</span>
              &nbsp; to upload
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileInputDnd;