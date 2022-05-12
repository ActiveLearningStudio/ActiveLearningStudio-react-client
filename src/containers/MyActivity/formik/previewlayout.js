/* eslint-disable */
import React, { useState } from 'react';
import HeadingText from 'utils/HeadingText/headingtext';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import Tabs from 'utils/Tabs/tabs';
import HeadingThree from 'utils/HeadingThree/headingthree';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TopHeading from 'utils/TopHeading/topheading';
import DialogCardImage from 'assets/images/Rectangle 127.png';
import Buttons from 'utils/Buttons/buttons';
import CarDImage from '../../../assets/images/program-thumb.png';
import ExplanatoryH5P from 'assets/images/svg/explanatoryH5P.svg';
import { faAngleLeft, faAngleRight, faArrowDown } from '@fortawesome/free-solid-svg-icons';
const PreviewLayout = (props) => {
  const { changeScreenHandler } = props;
  return (
    <div className="preview-layout-form">
      {/* <div className="preview-layout-back">
        <Link
          className="back-link"
          onClick={() => changeScreenHandler("addactivity")}
        >
          <FontAwesomeIcon icon="chevron-left" className="icon-link" />
          Back
        </Link>
      </div> */}
      <div className="preview-layout-tabs">
        <Tabs text="1. Select an activity" tabActive={true} />
        <Tabs text="2. Add activities to Layout" className="ml-10 mt-10" tabActive={true} />
        <Tabs text="3. Preview Activity" className="ml-10" tabActive={true} />
      </div>
      <div className="preview-layout-title-select">
        <div className="preview-layout-title">
          <HeadingTwo text="Interactive Video" color="#084892" />
        </div>

        {/* <div className="preview-layout-change-layout">
          <select>
            <option>Change Layout</option>
            <option>Interactive video</option>
            <option>Column layout</option>
            <option>Interactive book</option>
            <option>Course presentation</option>
            <option>Quiz</option>
            <option>Single activity</option>
          </select>
        </div> */}
      </div>
      <div className="preview-layout-card-project">
        <div className="preview-layout-dialogcard">
          <div className="dialogcard-subtitle">
            <HeadingThree text="Activity title" color="#084892" />
          </div>
          <div>
            <HeadingText text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam." />
          </div>
          <div className="preview-layout-panel">
            <div className="layout-panel">
              <HeadingThree text="First panel " color="#084892" />
              <FontAwesomeIcon icon="chevron-down" color="#084892" />
            </div>
            <div className="layout-panel mt-8">
              <HeadingThree text="Second panel " color="#084892" />
              <FontAwesomeIcon icon="chevron-down" color="#084892" />
            </div>
          </div>
          <div className="preview-layout-footer">
            <div className="footer-dowload">
              <p>
                <FontAwesomeIcon icon={faArrowDown} /> Download
              </p>
            </div>
            <div>
              <p>
                <FontAwesomeIcon icon={faAngleLeft} /> <FontAwesomeIcon icon={faAngleRight} />
                Embed
              </p>
            </div>
            <div>
              <img src={ExplanatoryH5P} />
            </div>
          </div>
          {/* <div className="dialogcard-subtitle">
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
          </div> */}
        </div>
        <div className="preview-layout-project">
          <div className="project-title-link">
            <div className="project-title">
              <HeadingTwo text="Project: " color="#084892" className="project-heading" />
              <HeadingText text="Project title here" color="#515151" />
              <HeadingTwo text="Playlist:" color="#084892" className="playlist-heading" />
              <HeadingText text="Playlist name here" color="#515151" />
            </div>
            <div className="project-link">
              <Link className="get-link">
                {/* <FontAwesomeIcon icon="link" className="icon-link" />*/}
                Get link
              </Link>
            </div>
          </div>
          <div className="dialog-card-box">
            <img src={DialogCardImage} alt="" />
            <HeadingText text="Dialog Cards" color="#084892" className="ml-15" />
          </div>
          {/* <div className="add-more-activity">
            <div className="more-activity-icon">
              <FontAwesomeIcon icon="link" className="icon-link" />
            </div>
            <Link className="more-activity-link" to="/">
              Add More Activity
            </Link>
          </div> */}
          <div className="project-link-button">
            <Buttons text="Back to Editor" primary={true} width="126px" height="43px" hover={true} onClick={() => changeScreenHandler('addactivity')} />
            <Buttons text="Finish Layout" secondary={true} width="126px" height="43px" hover={true} onClick={() => changeScreenHandler('')} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewLayout;
