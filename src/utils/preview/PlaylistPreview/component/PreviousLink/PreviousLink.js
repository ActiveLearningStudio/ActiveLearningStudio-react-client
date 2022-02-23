/* eslint-disable */
import React from "react";
import Tabview from "../../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../../containers/Preview/PlaylistPreview/components/PreviousLink";
import Screenshot from "./prevLink.png";
export const PreviousLink = () => {
  return (
    <>
      <Tabview
        componentName="PreviousLink"
        path="\src\containers\Preview\PlaylistPreview\component\PreviousLink.js"
        description="In this,there is an arrow button in the playlist preview where the user
         can move to the previous activity. 
        This component will ease your work and give you access to previous activities
         which you have already seen. In the end, when there is no activity remaining in the previous 
         list then a message will be shown below the button that will tell us you are at the beginning 
         of the playlist. Furthermore, you can also switch to the previous playlist through this component."
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
