/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../components/Microsoft/ImmersiveReaderPreview";
import Stylesheetused from "!!raw-loader!../../../components/Microsoft/style.scss";
//import Screenshot from "./ActivityCard.png";
export const ImmersiveReaderPreview = () => {
  return (
    <>
      <Tabview
        componentName="ImmersiveReaderPreview"
        path="\src\components\Microsoft\ImmersiveReaderPreview.js"
        description="This is the Description of Compoennt"
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "prop-types",
          "react-router-dom",
          "axios",
          "@microsoft/immersive-reader-sdk",
        ]}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[]}
        images=""
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/"
      />
    </>
  );
};
