/* eslint-disable */
import React, { useState } from "react";
import HeadingText from "utils/HeadingText/headingtext";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import LayoutCard from "utils/LayoutCard/layoutcard";
import ColoumImage from "assets/images/Group 648.png";
import PresentationImage from "assets/images/Group 646.png";
import Tabs from "utils/Tabs/tabs";
import Buttons from "utils/Buttons/buttons";
const ActivityLayout = (props) => {
  const {
    changeScreenHandler,
  } = props;
  const [layout, setLayout] = useState("");
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
          text="Within the six categories, there are over 50 learning activity types. These range from Interactive Video, Flashcards, to Memory Games. We also have special activity types that we will refer to as layouts. "
          color="#515151"
        />
      </div>
      <div className="activity-layout-cards">
        <LayoutCard
          image={ColoumImage}
          text="Column Layout"
          className={layout == "column" ? "activity-layoutCard-active" : null}
          onClick={() => setLayout("column")}
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
          image={ColoumImage}
          text="Interactive book"
          className={
            layout == "book" ? "activity-layoutCard-active ml-30" : "ml-30"
          }
          onClick={() => setLayout("book")}
        />
        <LayoutCard
          image={PresentationImage}
          text="Interactive Video"
          className={
            layout == "Video" ? "activity-layoutCard-active ml-30" : "ml-30"
          }
          onClick={() => setLayout("Video")}
        />
        <LayoutCard
          image={ColoumImage}
          text="Quiz"
          className={
            layout == "Quiz" ? "activity-layoutCard-active ml-30" : "ml-30"
          }
          onClick={() => setLayout("Quiz")}
        />
      </div>
      <div className="activity-layout-process-box">
        <HeadingText
          text="Start your creation process by selecting a layout."
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
          onClick={() => changeScreenHandler('addactivity')}
        />
      </div>
    </div>
  );
};

export default ActivityLayout;
