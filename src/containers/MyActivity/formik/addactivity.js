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

const AddActivity = (props) => {
  const { changeScreenHandler } = props;
  const [upload, setupload] = useState(false);
  return (
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
      <div className="add-activity-title">
        <HeadingTwo text="Add activities to Column Layout" color="#084892" />
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
              <div className="layout-formik-radioBtn">
                <HeadingText text="Method" color="#515151" />
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
              </div>
              <div className="layout-title-formik-textField">
                <HeadingThree
                  text="Layout Title"
                  color="#084892"
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
            </form>
          </Formik>
        </div>
        <div className="add-activity-layout-videoTag">
          <div className="videoTag">
            <div className="videoTag-link">
              <Link to="/">View Demo</Link>
            </div>
            <iframe
              width="100%"
              height="200"
              src="https://www.youtube.com/embed/ngXSzWNYzU4"
              title="https://youtu.be/ngXSzWNYzU4"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="layout-colums-box">
        <HeadingThree
          text="List of column content"
          color="#084892"
          className="box-title"
        />
        <div className="layout-colums-inner-box">
          <H5PEditor upload={upload} />
        </div>
      </div>
      <div className="add-activity-btns">
        <Buttons
          text="Back"
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
      </div>
    </div>
  );
};

export default AddActivity;
