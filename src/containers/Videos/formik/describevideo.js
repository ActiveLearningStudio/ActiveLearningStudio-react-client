/*eslint-disable*/
import React, { useRef, useState } from "react";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import TabsHeading from "utils/Tabs/tabs";

import { Formik } from "formik";
import Buttons from "utils/Buttons/buttons";

import { useSelector } from "react-redux";
import UploadImage from "utils/uploadimagev2/uploadimagev2";
import HeadingText from "utils/HeadingText/headingtext";
import DefaultUpload from "assets/images/defaultUpload.png";
import PreviewLayoutModel from "containers/MyProject/model/previewlayout";
import {
  educationLevels,
  subjects,
} from "components/ResourceCard/AddResource/dropdownData";
const DescribeVideo = ({
  setUploadImageStatus,
  setScreenStatus,
  setOpenVideo,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const { videoId, editVideo, activecms } = useSelector(
    (state) => state.videos
  );

  const formRef = useRef();
  return (
    <>
      <PreviewLayoutModel
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        type="videoModal"
        title={videoTitle}
        video={videoId}
        formData={formRef.current?.values}
        editVideo={editVideo}
        setOpenVideo={setOpenVideo}
        accountId={activecms?.account_id}
      />
      <div className="add-describevideo-form">
        <div className="add-describevideo-tabs">
          <TabsHeading text="1. Add a video" tabActive={true} />
          <TabsHeading
            text="2. Describe video"
            className="ml-10"
            tabActive={true}
          />
          <TabsHeading text="3. Add interactions" className="ml-10" />
        </div>
        <div className="add-describevideo-title-select">
          <div className="add-video-title">
            <HeadingTwo text="Describe video" color="#084892" />
          </div>
          {/* <div className="add-describevideo-tour">
            <span>
              <FontAwesomeIcon icon={faClock} color="#084892" className="ml-9" />
              Tour
            </span>
          </div> */}
        </div>
        <div className="add-describevideo-section-layout-formik">
          <div className="add-describevideo-layout-formik">
            <Formik
              innerRef={formRef}
              initialValues={{
                title: editVideo ? editVideo.title : "",
                description: editVideo
                  ? editVideo.description || undefined
                  : undefined,
                subject_id: editVideo ? editVideo.subject_id : "",
                education_level_id: editVideo
                  ? editVideo.education_level_id
                  : "",
                thumb_url: editVideo?.thumb_url
                  ? editVideo.thumb_url
                  : "https://images.pexels.com/photos/5022849/pexels-photo-5022849.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280",
              }}
              validate={(values) => {
                const errors = {};
                if (!values.title) {
                  errors.title = "Required";
                }
                return errors;
              }}
              onSubmit={(values) => {
                setModalShow(true);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                setFieldValue,
              }) => (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <div>
                    <div className="dec-title-formik-textField">
                      <span>Title</span>
                      <p>
                        Used for searching, reports and copyright information
                      </p>
                      <input
                        type="text"
                        name="title"
                        placeholder="Give your layout a name..."
                        onChange={(e) => {
                          setFieldValue("title", e.target.value);
                          setVideoTitle(e.target.value);
                        }}
                        onBlur={handleBlur}
                        value={values.title}
                      />
                    </div>
                    <div className="error" style={{ color: "red" }}>
                      {errors.title && touched.title && errors.title}
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
                        value={values.description}
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
                          value={values.subject_id}
                        >
                          <option hidden>Select</option>
                          {subjects.map((data) => (
                            <option key={data.value} value={data.subject}>
                              {data.subject}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="formik-select">
                        <HeadingText
                          text="Education level"
                          className="formik-select-title"
                        />
                        <select
                          name="education_level_id"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.education_level_id}
                        >
                          <option hidden>Select</option>
                          {educationLevels.map((data) => (
                            <option key={data.value} value={data.name}>
                              {data.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="describe-video-upload-section">
                    <UploadImage
                      title="Upload poster (Optional)"
                      defuaultImage={DefaultUpload}
                      className="uploadImage-describe-video"
                      setUploadImageStatus={setUploadImageStatus}
                      formRef={formRef}
                      thumb_url={editVideo?.thumb_url}
                    />
                  </div>
                  <div className="describe-video">
                    {!editVideo && (
                      <Buttons
                        onClick={() => setScreenStatus("AddVideo")}
                        secondary={true}
                        text="Back"
                        width="162px"
                        height="32px"
                        hover={true}
                      />
                    )}
                    <Buttons
                      primary={true}
                      text="Add Interactions"
                      width="162px"
                      height="32px"
                      hover={true}
                      type="submit"
                      
                    />
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default DescribeVideo;
