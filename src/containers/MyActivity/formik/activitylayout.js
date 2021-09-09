/* eslint-disable */
import React, { useState } from "react";
import HeadingText from "utils/HeadingText/headingtext";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import LayoutCard from "utils/LayoutCard/layoutcard";
import ColoumImage from "assets/images/Group 648.png";
import PresentationImage from "assets/images/Group 646.png";
import InteractivevideoImage from "assets/images/layout/interactive-video.png";
import InteractivebookImage from "assets/images/layout/timeline.png";
import QuizImage from "assets/images/layout/questionsquiz.png";
import ColoumImage1 from "assets/images/layout/singleactivit.png";
import Tabs from "utils/Tabs/tabs";
import Buttons from "utils/Buttons/buttons";
import HeadingThree from "utils/HeadingThree/headingthree";
import PlayIcon from "assets/images/play.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from 'react-router-dom';

const ActivityLayout = (props) => {
  const { changeScreenHandler } = props;
  const history = useHistory();
  const [layout, setLayout] = useState("Interactivevideo");
  return (
    <div className="activity-layout-form">
      <div className="activity-layout-tabs">
        <Tabs text="1. Select a layout" tabActive={true} />
        <Tabs text="2. Add activities to Layout" className="ml-10 mt-10" />
        <Tabs text="3. Preview Layout" className="ml-10" />
      </div>
      <div className="activity-layout-title">
        <HeadingTwo text="Select a layout" color="#084892" />
      </div>
      <div className="activity-layout-detail">
        <HeadingText
          text="Start creating by selecting a layout and then add activity types."
          color="#515151"
        />
      </div>
      <div className="layout-cards-process-btn">
        <div className="activity-layout-cards">
          <LayoutCard
            image={ColoumImage}
            text="Column Layout"
            className={
              layout == "ColumnLayout" ? "activity-layoutCard-active" : null
            }
            onClick={() => setLayout("ColumnLayout")}
          />
          <LayoutCard
            image={PresentationImage}
            text="course Presentation"
            className={
              layout == "Presentation"
                ? "activity-layoutCard-active ml-30"
                : "ml-30"
            }
            onClick={() => setLayout("Presentation")}
          />
          <LayoutCard
            image={InteractivevideoImage}
            text="Interactive Video"
            className={
              layout == "Interactivevideo" ? "activity-layoutCard-active " : null
            }
            onClick={() => setLayout("Interactivevideo")}
          />
          <LayoutCard
            image={InteractivebookImage}
            text="Interactive book"
            className={
              layout == "Interactivebook"
                ? "activity-layoutCard-active ml-30"
                : "ml-30"
            }
            onClick={() => setLayout("Interactivebook")}
          />
          <LayoutCard
            image={QuizImage}
            text="Quiz"
            className={layout == "Quiz" ? "activity-layoutCard-active" : null}
            onClick={() => setLayout("Quiz")}
          />
          <LayoutCard
            image={ColoumImage1}
            text="Single Activity"
            className={
              layout == "SingleActivity"
                ? "activity-layoutCard-active ml-30"
                : "ml-30"
            }
            onClick={() => {
              setLayout("SingleActivity");
              history.push(`/org/currikistudio/project/6510/playlist/13623/activity/create`);
            }}
          />
        </div>
        <div className="layout-process-btn">
          <HeadingThree text="Interactive Video" color="#084892" />
          <div className="activity-layout-process-box">
            <iframe
              width="100%"
              height="100%"
              frameborder="0"
              src="https://www.youtube.com/embed/ngXSzWNYzU4"
              title="https://youtu.be/ngXSzWNYzU4"
            ></iframe>
            {/* <img src={PlayIcon} /> */}
          </div>
          <HeadingText
            text="An HTML5-based interactive video content type allowing users to add multiple choice and fill in the blank questions, pop-up text and other types of interactions"
            color="#515151"
          />
          <div className="layout-useful-box">
            <div className="useful-box">
              <HeadingThree text="Useful for" color="#084892" />
              <FontAwesomeIcon icon={faArrowRight} className="useful-icon" />
            </div>
            <HeadingText
              text="Guided onboardings, Corporated presentations"
              color="#515151"
            />
          </div>
          <div className="activity-layout-btns">
            <Buttons
              text="Cancel"
              secondary={true}
              width="153px"
              height="36px"
              onClick={() => changeScreenHandler("")}
            />

            <div className="btns-margin">
              <Buttons
                text="Select Layout"
                defaultgrey={layout ? false : true}
                width="153px"
                height="36px"
                disabled={layout ? false : true}
                onClick={() => changeScreenHandler("addactivity")}
                hover={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityLayout;
