/* eslint-disable */
import React from "react";
import Tabview from "../../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../../containers/Preview/PlaylistPreview/components/ActivitiesList";
import Screenshot from "./ActivitiesList.png";
export const ActivitiesList = () => {
  return (
    <>
      <Tabview
        componentName="ActivitiesList"
        path="\src\containers\Preview\PlaylistPreview\component\ActivitiesList.js"
        description="When you view playlist preview then you will find a list of 
        activities on the right sidebar, where you can see all the activities related to that playlist.
        This component is used to show all the activities in the list column.
        You can see the name of the activities in the list and
         the onclick dropdown to perform different actions."
        codeSnippet={CodeSnippet}
        libraryUsed={["prop-types"]}
        customHooks={[
          {
            name: "/src/components/ActivityPreviewCard/index",
            url: "?path=/story/component-activitypreviewcard--component",
          },
        ]}
        reduxStore={[]}
        apiUsed={[]}
        images={Screenshot}
        stylesheetUsed=""
        example="hhttps://dev.currikistudio.org/org/testsuborg/project/6091/playlist/12960/activity/47553/preview"
      />
    </>
  );
};
