/* eslint-disable */
import React, { useState } from "react";
import HeadingText from "utils/HeadingText/headingtext";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import Tabs from "utils/Tabs/tabs";
import HeadingThree from "utils/HeadingThree/headingthree";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TopHeading from "utils/TopHeading/topheading";
import DialogCardImage from "assets/images/Rectangle 127.png";
import Buttons from "utils/Buttons/buttons";
import CarDImage from "../../../assets/images/program-thumb.png";
const PreviewLayout = (props) => {
  const { changeScreenHandler } = props;
  return (
    <div className="preview-layout-form">
      <div className="preview-layout-back">
        <Link
          className="back-link"
          onClick={() => changeScreenHandler("addactivity")}
        >
          <FontAwesomeIcon icon="chevron-left" className="icon-link" />
          Back
        </Link>
      </div>
      <div className="preview-layout-tabs">
        <Tabs text="1. Select a layout" tabActive={true} />
        <Tabs
          text="2. Add activities to Layout"
          className="ml-10 mt-10"
          tabActive={true}
        />
        <Tabs text="3. Preview Layout" className="ml-10" tabActive={true} />
      </div>
      <div className="preview-layout-card-project">
        <div className="preview-layout-dialogcard">
          <div className="dialogcard-subtitle">
            <HeadingText
              text="Dialog Card"
              color="#084892"
              className="subtitle-text"
            />
          </div>
          <div className="dialogcard-title">
            <HeadingTwo
              text="Activity Title"
              color="#084892"
              className="title-heading"
            />
            <HeadingThree
              text="Heading"
              color="#084892"
              className="sub-heading"
            />
          </div>
          <div className="detail-dialogcard">
            <div className="card-actvity">
              <img src={CarDImage} alt="" />
              <div>
                <FontAwesomeIcon
                  icon="volume-up"
                  className="card-actvity-icon"
                />
              </div>
              <HeadingThree
                text="Activity Title"
                className="card-actvity-title"
              />
              <Buttons
                icon="sync-alt"
                text="Turn"
                primary={true}
                width="96px"
                height="35px"
                className="card-actvity-btn"
              />
            </div>
          </div>
          <div className="card-pagination">
            <div className="pagination-text">
              <HeadingText text="Card 1 of 5" />
            </div>
            <div className="pagination-icon">
              <FontAwesomeIcon icon="angle-right" className="icon-next" />
            </div>
          </div>
        </div>
        <div className="preview-layout-project">
          <div className="project-title-link">
            <div className="project-title">
              <HeadingTwo
                text="Project: "
                color="#084892"
                className="project-heading"
              />
              <HeadingText text="Project title here" color="#515151" />
              <HeadingTwo
                text="Playlist:"
                color="#084892"
                className="playlist-heading"
              />
              <HeadingText text="Playlist name here" color="#515151" />
            </div>
            <div className="project-link">
              <Link className="get-link">
                <FontAwesomeIcon icon="link" className="icon-link" />
                Get link
              </Link>
            </div>
          </div>
          <div className="dialog-card-box">
            <img src={DialogCardImage} alt="" />
            <HeadingText
              text="Dialog Cards"
              color="#084892"
              className="ml-15"
            />
          </div>
          <div className="add-more-activity">
            <div className="more-activity-icon">
              <FontAwesomeIcon icon="link" className="icon-link" />
            </div>
            <Link className="more-activity-link" to="/">
              Add More Activity
            </Link>
          </div>
          <div className="project-link-button">
            <Link color="#084892" className="edit-link">
              Edit
            </Link>
            <Buttons
              text="SAVE"
              primary={true}
              width="126px"
              height="43px"
              hover={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewLayout;
