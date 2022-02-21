/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../components/models/activitySample";
import Screenshot from "./activityOption.png";
import Stylesheetused from "!!raw-loader!../../../../components/models/styles.scss";
export const ActivityOption = () => {
  return (
    <>
      <Tabview
        componentName="MyVerticallyCenteredModal"
        path="\src\components\models\activityOptions.js"
        description="In the activity option component, you will see two options related to 
        the activity where you will check the demo of the activity and video related to that activity.
         In the demo, you can see all the data related to that activity."
        codeSnippet={CodeSnippet}
        libraryUsed={["prop-types", "react-bootstrap"]}
        customHooks={[
          {
            name: "/src/containers/H5PPreview",
            url: "",
          },
        ]}
        reduxStore={[]}
        apiUsed={[]}
        images={Screenshot}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/testsuborg/project/6091/playlist/12960/activity/create"
      />
    </>
  );
};
