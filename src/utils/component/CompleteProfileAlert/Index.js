/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../components/CompleteProfileAlert/index";
import Stylesheetused from "!!raw-loader!../../../components/CompleteProfileAlert/style.scss";
import Screenshot from "./ActivityCard.png";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="CompleteProfileAlert"
        path="\src\components\CompleteProfileAlert\index.js"
        description="This is the Description of Compoennt"
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "react-fontawesome",
          "react-router-dom",
          "react-bootstrap",
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
