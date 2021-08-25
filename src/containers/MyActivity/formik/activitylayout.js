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
const ActivityLayout = (props) => {
  const { changeScreenHandler } = props;
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
      <div className="activity-layout-cards">
        <LayoutCard
          image={InteractivevideoImage}
          text="Interactive video"
          className={
            layout == "Interactivevideo" ? "activity-layoutCard-active" : null
          }
          onClick={() => setLayout("Interactivevideo")}
        />
        <LayoutCard
          image={ColoumImage}
          text="ColumnLayout"
          className={
            layout == "ColumnLayout"
              ? "activity-layoutCard-active ml-30"
              : "ml-30"
          }
          onClick={() => setLayout("ColumnLayout")}
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
          image={PresentationImage}
          text="Course Presentation"
          className={
            layout == "Presentation"
              ? "activity-layoutCard-active ml-30"
              : "ml-30"
          }
          onClick={() => setLayout("Presentation")}
        />
        <LayoutCard
          image={QuizImage}
          text="Quiz"
          className={
            layout == "Quiz" ? "activity-layoutCard-active ml-30" : "ml-30"
          }
          onClick={() => setLayout("Quiz")}
        />
        <LayoutCard
          image={ColoumImage1}
          text="Column Layout"
          className={
            layout == "ColumnLayout1"
              ? "activity-layoutCard-active ml-30"
              : "ml-30"
          }
          onClick={() => setLayout("ColumnLayout1")}
        />
      </div>
      <div className="activity-layout-process-box">
        <HeadingThree text="Interactive Video" color="#084892" />
        <HeadingText
          text="An HTML5-based interactive video content type allowing users to add multiple choice and fill in the blank questions, pop-up text and other types of interactions to their videos using only a web browser. Make your videos more engaging with H5P and interactive video in publishing systems like Canvas, Brightspace, Blackboard, Moodle and WordPress."
          color="#515151"
        />
      </div>
      <div className="activity-layout-btns">
        <Buttons
          text="Continue without Layout"
          secondary={true}
          width="240px"
          height="36px"
        />
        <Buttons
          text="Select Layout"
          defaultgrey={layout ? false : true}
          width="147px"
          height="36px"
          disabled={layout ? false : true}
          onClick={() => changeScreenHandler("addactivity")}
          hover={true}
        />
      </div>
    </div>
  );
};

export default ActivityLayout;
