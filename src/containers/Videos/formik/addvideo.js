/*eslint-disable*/
import React, { useEffect, useState } from "react";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import TabsHeading from "utils/Tabs/tabs";
import { Tabs, Tab } from "react-bootstrap";
import { Formik } from "formik";
import AddVideoImage from "assets/images/svg/addvidobright.svg";
import Buttons from "utils/Buttons/buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import BrightcoveModel from "../model/brightmodel";
const AddVideo = ({ setScreenStatus }) => {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <BrightcoveModel
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
      />
      <div className="add-video-form">
        <div className="add-video-tabs">
          <TabsHeading text="1. Add a video" tabActive={true} />
          <TabsHeading text="2. Describe video" className="ml-10" />
          <TabsHeading text="3. Add interactions" className="ml-10" />
          <TabsHeading text="4. Optional settings" className="ml-10" />
        </div>
        <div className="add-video-title-select">
          <div className="add-video-title">
            <HeadingTwo text="Add a video" color="#084892" />
          </div>
          <div className="add-video-tour">
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
        <div className="add-video-form-tabs">
          <Tabs
            className="main-tabs"
            defaultActiveKey="default"
            id="uncontrolled-tab-example"
          >
            <Tab eventKey="default" title="BrightCove"></Tab>
            <Tab eventKey="Mydevice" title="My device"></Tab>
            <Tab eventKey="YouTube" title="YouTube"></Tab>
            <Tab eventKey="Vimeo" title="Vimeo"></Tab>
            <Tab eventKey="Kaltura" title="Kaltura"></Tab>
          </Tabs>
        </div>
        <div className="add-video-layout-formik">
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
              /* and other goodies */
            }) => (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
              >
                <div className="layout-title-formik-textField">
                  <img src={AddVideoImage} />
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter video ID"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                  <Buttons
                    primary={true}
                    text="Browse videos"
                    width="146px"
                    height="35px"
                    hover={true}
                    className="ml-32"
                    onClick={() => setModalShow(true)}
                  />
                </div>
              </form>
            )}
          </Formik>
        </div>
        <div className="describe-video">
          <Buttons
            primary={true}
            text="Describe Video"
            width="149px"
            height="35px"
            hover={true}
            onClick={() => setScreenStatus("DescribeVideo")}
          />
        </div>
      </div>
    </>
  );
};

export default AddVideo;
