/* eslint-disable */
import React from "react";
import Tabview from "../../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../../containers/Preview/PlaylistPreview/components/NextLink";
import Screenshot from "./NextLink.png";
export const NextLink = () => {
  return (
    <>
      <Tabview
        componentName="NextLink"
        path="\src\containers\Preview\PlaylistPreview\component\NextLink.js"
        description="In this component,there is an arrow button in the playlist preview where
         the user can move to the next activity. This component will ease your
          work and give you access to all activities in any project by just clicking
          on only the next button. In the end, when there is no activity to show then
          a message will be shown below the button 
        that will tell us there is no more activity to show or you can switch to the next playlist."
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "prop-types",
          "react-router-dom",
          "react-fontawesome",
          "swal",
          "react-redux",
        ]}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[]}
        images={Screenshot}
        stylesheetUsed=""
        example="hhttps://dev.currikistudio.org/org/testsuborg/project/6091/playlist/12960/activity/47553/preview"
      />
    </>
  );
};
