/*eslint-disable*/
import React, { useEffect, useState } from "react";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import TabsHeading from "utils/Tabs/tabs";
import { Tabs, Tab } from "react-bootstrap";
import { Formik } from "formik";
import Buttons from "utils/Buttons/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import BrightcoveModel from "../model/brightmodel";
import UploadImageV2 from "utils/uploadimagev2/uploadimagev2";
import UploadImage from "utils/UploadImage/uploadimage";
import HeadingText from "utils/HeadingText/headingtext";
import DefaultUpload from "assets/images/defaultUpload.png";
const DescribeVideo = ({ setUploadImageStatus }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <div className="add-describevideo-form">
        <div className="add-describevideo-tabs">
          <TabsHeading text="1. Add a video" tabActive={true} />
          <TabsHeading
            text="2. Describe video"
            className="ml-10"
            tabActive={true}
          />
          <TabsHeading text="3. Add interactions" className="ml-10" />
          <TabsHeading text="4. Optional settings" className="ml-10" />
        </div>
        <div className="add-describevideo-title-select">
          <div className="add-video-title">
            <HeadingTwo text="Describe video" color="#084892" />
          </div>
          <div className="add-describevideo-tour">
            <span>
              <FontAwesomeIcon
                icon={faClock}
                color="#084892"
                className="ml-9"
              />
              Tour
            </span>
          </div>
        </div>
        <div className="add-describevideo-section-layout-formik">
          <div className="add-describevideo-layout-formik">
            <Formik
              initialValues={{
                videoUrl: "",
              }}
              onSubmit={(values) => {}}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
              }) => (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div className="dec-title-formik-textField">
                    <span>Title</span>
                    <p>Used for searching, reports and copyright information</p>
                    <input
                      type="text"
                      name="title"
                      placeholder="Give your layout a name..."
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                    />
                  </div>
                  <div className="dec-title-formik-textField">
                    <span>Description</span>
                    <textarea
                      rows="4"
                      cols="4"
                      name="description"
                      placeholder="What is this video about"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.title}
                    />
                  </div>
                  <div className="layout-formik-select">
                    <div className="formik-select mr-32">
                      <HeadingText
                        text="Subject"
                        className="formik-select-title"
                      />
                      <select
                        name="subject_id"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option hidden>Select</option>
                      </select>
                    </div>
                    <div className="formik-select mr-32 ">
                      <HeadingText
                        text="Education level"
                        className="formik-select-title"
                      />
                      <select
                        name="education_level_id"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option hidden>Select</option>
                      </select>
                    </div>
                    <div className="formik-select ">
                      <HeadingText
                        text="Author tags"
                        className="formik-select-title"
                      />
                      <select
                        name="subject_id"
                        onChange={handleChange}
                        onBlur={handleBlur}
                      >
                        <option hidden>Select</option>
                      </select>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
          <div className="describe-video-upload-section">
            <UploadImage
              title="Upload poster (Optional)"
              defuaultImage={DefaultUpload}
              className="uploadImage-describe-video"
              setUploadImageStatus={setUploadImageStatus}
            />
          </div>
        </div>

        <div className="describe-video">
          <Buttons
            primary={true}
            text="Add Interactions"
            width="162px"
            height="32px"
            hover={true}
          />
        </div>
      </div>
    </>
  );
};

export default DescribeVideo;
