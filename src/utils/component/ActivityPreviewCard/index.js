/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../components/ActivityPreviewCard/index";
import Stylesheetused from "!!raw-loader!../../../components/ActivityPreviewCard/style.scss";
import Screenshot from "./ActivityPreviewCard.png";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="ActivityPreviewCard"
        path="\src\components\ActivityPreviewCard\index.js"
        description="In this component, you will see the preview of the activity in LTI. 
        All the data related to one activity will be display at one time in LTI and there 
        are options to move to the next and previous activity. In this way, you will be able 
        to see all activities related to the respective playlist in LTI Modal."
        codeSnippet={CodeSnippet}
        libraryUsed={["prop-types", "react-router-dom", "react-redux"]}
        customHooks={[
          {
            name: "/src/components/ResourceCard/dropdown",
            url:
              "?path=/story/component-resourcecard-resourcecarddropdown--component",
          },
        ]}
        reduxStore={[]}
        apiUsed={[]}
        images={Screenshot}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/testsuborg/project/6091/playlist/12960/activity/47536/preview"
      />
    </>
  );
};
