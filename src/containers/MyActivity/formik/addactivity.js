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

const AddActivity = (props) => {
  const { changeScreenHandler, setUploadImageStatus } = props;

  const [modalShow, setModalShow] = useState(false);
  const [upload, setupload] = useState(false);
  return (
    <>
      <PreviewLayoutModel
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        searchName="abstract"
      />
      <div className="add-activity-form">
        <div className="add-activity-tabs">
          <Tabs text="1. Select a layout" tabActive={true} />
          <Tabs
            text="2. Add activities to Layout"
            className="ml-10 mt-10"
            tabActive={true}
          />
          <Tabs text="3. Preview Layout" className="ml-10" />
        </div>
        <div className="add-activity-title-select">
          <div className="add-activity-title">
            <HeadingTwo text="Interactive Video" color="#084892" />
          </div>

          <div className="activity-title-change-layout">
            <select>
              <option>Change Layout</option>
              <option>Interactive video</option>
              <option>Column layout</option>
              <option>Interactive book</option>
              <option>Course presentation</option>
              <option>Quiz</option>
              <option>Single activity</option>
            </select>
          </div>
        </div>
        <div className="add-activity-selection">
          <button>
            Create New
            <FontAwesomeIcon icon="plus" className="btn-icon" />
          </button>
          <button
            className="upload-btn"
            onClick={() => changeScreenHandler("uploadinteractivevideo")}
          >
            Upload
            <FontAwesomeIcon icon="plus" className="btn-icon" />
          </button>
        </div>
        <div className="add-activity-layout-formik-videoTag">
          <div className="add-activity-layout-formik">
            <Formik
              initialValues={{
                method: "",
                layoutTitle: "",
                picked: "create",
              }}
            >
              <form>
                <HeadingTwo
                  text="Layout description"
                  color="#084892"
                  className="layout-description-title"
                />
                {/* <div className="layout-formik-radioBtn">
                  <HeadingThree text="Method" color="#515151" />
                  <div className="radioBtns">
                    <div className="formik-radioBtn">
                      <label className="check-input">
                        <Field
                          onClick={() => {
                            setupload(false);
                          }}
                          type="radio"
                          name="picked"
                          value="create"
                        />
                        Create
                      </label>
                    </div>
                    <div className="formik-radioBtn">
                      <label className="check-input">
                        <Field
                          onClick={() => {
                            setupload(true);
                          }}
                          type="radio"
                          name="picked"
                          value="upload"
                        />
                        Upload
                      </label>
                    </div>
                  </div>
                </div> */}
                <div className="layout-title-formik-textField">
                  <HeadingThree
                    text="Layout Title"
                    color="#515151"
                    className="textField-title"
                  />
                  <HeadingText
                    text="Used for searching, reports and copyright information"
                    color="#515151"
                    className="textField-detailText"
                  />
                  <input
                    type="text"
                    name="layout-title"
                    placeholder="Give your layout a name..."
                  />
                </div>
                <div className="layout-formik-select">
                  <div className="formik-select mr-32">
                    <HeadingText
                      text="Subject"
                      className="formik-select-title"
                    />
                    <select>
                      <option>Select</option>
                    </select>
                  </div>
                  <div className="formik-select ">
                    <HeadingText
                      text="Education level"
                      className="formik-select-title"
                    />
                    <select>
                      <option>Select</option>
                    </select>
                  </div>
                </div>
                <div className="formik-uploadimage">
                  <UploadImageV2 />
                </div>
              </form>
            </Formik>
          </div>
          <div className="add-activity-layout-videoTag">
            {/* <div className="videoTag">
              <div className="videoTag-link">
                <Link to="/">View Demo</Link>
              </div>
              <iframe
                width="100%"
                height="200"
                src="https://www.youtube.com/embed/ngXSzWNYzU4"
                title="https://youtu.be/ngXSzWNYzU4"
              ></iframe>
            </div> */}
            <HeadingTwo
              text="Add Activities"
              color="#084892"
              className="layout-add-activity-title"
            />
            <HeadingText
              text="Start adding activities by opening the editor. Once you finish, hit the Preview Layout button to see your results."
              color="#515151"
            />
            <div className="add-activity-btns">
              <Buttons
                text="Open editor"
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
        </div>

        {/* <div className="layout-colums-box">
        <HeadingThree
          text="List of column content"
          color="#084892"
          className="box-title"
        />
        <div className="layout-colums-inner-box">
          <H5PEditor upload={upload} />
        </div>
      </div> */}

        {/* <div className="open-editor-box">
          <div className="editor-title">
            <HeadingTwo text="Open Editor" color="#084892" />
          </div>
          <Link
            onClick={() => setModalShow(true)}
            className="editor-preview-link"
          >
            Preview Layout
          </Link>
        </div> */}

        {/* <div className="add-activity-btns">
          <Buttons
            text="Cancel"
            secondary={true}
            width="110px"
            height="35px"
            onClick={() => changeScreenHandler("layout")}
          />
          <Buttons
          text="Next"
          primary={true}
          width="132px"
          height="36px"
          // disabled={layout ? false : true}
          onClick={() => changeScreenHandler("preview")}
          hover={true}
        />
        </div> */}
      </div>
    </>
  );
};

export default AddActivity;
