/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../containers/CreateActivity/ActivityMeter";
import ActivityMeterImg from "./ActivityMeter.png";
import Stylesheetused from "!!raw-loader!../../../containers/CreateActivity/style.scss";
export const ActivityMeter = () => {
  return (
    <>
      <Tabview
        componentName="ActivityMeter"
        path="\src\containers\CreateActivity\ActivityMeter.js"
        description="In the activity meter component, you will see tabs like navbar for the creation of activity. There are four steps to create any activity. You will find the path of these four steps in the activity meter.
          The heading of these four steps is mentioned in this activity meter."
        codeSnippet={CodeSnippet}
        libraryUsed={["props-types"]}
        customHooks={
          [
            // {name:'/src/utils/index',url:'www.google.com'},
          ]
        }
        reduxStore={[]}
        apiUsed={[]}
        images={ActivityMeterImg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/project/6031/playlist/12875/activity/create"
      />
    </>
  );
};
