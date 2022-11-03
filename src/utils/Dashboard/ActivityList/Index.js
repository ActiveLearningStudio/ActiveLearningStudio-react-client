/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../containers/Dashboard/ActivityList/index";
import Stylesheetused from "!!raw-loader!../../../containers/Dashboard/ActivityList/styles.scss";
import StoreSnippet from "!!raw-loader!../../../store/actions/dashboard";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Dashboard\ActivityList\index.js"
        description="This is the Description of Compoennt"
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "react-redux",
          "prop-types",
          "react-fontawesome",
          "react-bootstrap",
        ]}
        customHooks={[]}
        reduxStore={[
          { path: "/src/store/actions/dashboard", pathCode: StoreSnippet },
        ]}
        apiUsed={[]}
        images=""
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio"
      />
    </>
  );
};
