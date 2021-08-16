/*eslint-disable*/
import React from "react";
import HeadingText from "utils/HeadingText/headingtext";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import Tabs from "utils/Tabs/tabs";
import Buttons from "utils/Buttons/buttons";
import { Formik } from "formik";
import HeadingThree from "utils/HeadingThree/headingthree";
import VideoTagImage from "../../../assets/images/Group 616.png";
import { Link } from "react-router-dom";

const AddActivity = () => {
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
            }}
          >
            <form>
              <div className="layout-formik-radioBtn">
                <HeadingText text="Method" color="#515151" />
                <div className="radioBtns">
                  <div className="formik-radioBtn">
                    <label className="check-input">
                      <input type="checkbox" /> <span></span> Create{" "}
                    </label>
                  </div>
                  <div className="formik-radioBtn">
                    <label className="check-input">
                      <input type="checkbox" /> <span></span> Upload{" "}
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
              <div className="layout-colums-box">
                <HeadingThree
                  text="List of column content"
                  color="#084892"
                  className="box-title"
                />
                <div className="layout-colums-inner-box"></div>
              </div>
            </form>
          </Formik>
        </div>
        <div className="add-activity-layout-videoTag">
          <div className="videoTag">
            <img src={VideoTagImage} alt="" />
            <div className="videoTag-link">
              <Link to="/">View Demo</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="add-activity-btns">
        <Buttons text="Back" secondary={true} width="110px" height="35px" />
        <Buttons text="Next" primary={true} width="132px" height="36px" />
      </div>
    </div>
  );
};

export default AddActivity;
