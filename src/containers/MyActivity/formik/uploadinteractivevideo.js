/*eslint-disable*/
import React, { useState } from "react";
import HeadingText from "utils/HeadingText/headingtext";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import Tabs from "utils/Tabs/tabs";
import Buttons from "utils/Buttons/buttons";
import { Formik, Field } from "formik";
import HeadingThree from "utils/HeadingThree/headingthree";
import VideoTagImage from "../../../assets/images/Group 616.png";
import { Link } from "react-router-dom";
import H5PEditor from "components/ResourceCard/AddResource/Editors/H5PEditorV2";
import UploadImage from "utils/UploadImage/uploadimage";
import PreviewLayoutModel from "containers/MyProject/model/previewlayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UploadImageV2 from "utils/uploadimagev2/uploadimagev2";
import UploadFile from "utils/uploadselectfile/uploadfile";

const UploadInteractiveVideo = (props) => {
  const { changeScreenHandler } = props;

  const [modalShow, setModalShow] = useState(false);
  const [upload, setupload] = useState(false);

  const [title, setTitle] = useState("Interactive Video");
  return (
    <>
      <div className="interactive-activity-form">
        <div className="interactive-activity-tabs">
          <Tabs text="1. Select a layout" tabActive={true} />
          <Tabs
            text="2. Add activities to Layout"
            className="ml-10 mt-10"
            tabActive={true}
          />
          <Tabs text="3. Preview Layout" className="ml-10" />
        </div>
        <div className="interactive-activity-title-select">
          <div className="interactive-activity-title">
            <HeadingTwo text={title} color="#084892" />
          </div>

          <div className="interactive-title-change-layout">
            <select onChange={(e) => setTitle(e.target.value)}>
              {/* <option value="">Change Layout</option> */}
              <option value="Interactive video">Interactive video</option>
              <option value="Column layout">Column layout</option>
              <option value="Interactive book">Interactive book</option>
              <option value="Course presentation">Course presentation</option>
              <option value="Quiz">Quiz</option>
              <option value="Single activity">Single activity</option>
            </select>
          </div>
        </div>
        <div className="interactive-activity-selection">
          <button onClick={() => changeScreenHandler("addactivity")}>
            Create New
            <FontAwesomeIcon icon="plus" className="btn-icon" />
          </button>
          <button className="upload-btn">
            Upload
            <FontAwesomeIcon icon="plus" className="btn-icon" />
          </button>
        </div>
        <div className="interactive-load-save-activity">
          <UploadFile />
        </div>

        <div className="interactive-activity-btns">
          <Buttons
            text="upload"
            primary={true}
            width="142px"
            height="35px"
            onClick={() => setModalShow(true)}
          />
          <Buttons
            text="Preview Layout"
            secondary={true}
            width="159px"
            height="36px"
            // disabled={layout ? false : true}
            onClick={() => changeScreenHandler("preview")}
            hover={true}
          />
        </div>
      </div>
    </>
  );
};

export default UploadInteractiveVideo;
