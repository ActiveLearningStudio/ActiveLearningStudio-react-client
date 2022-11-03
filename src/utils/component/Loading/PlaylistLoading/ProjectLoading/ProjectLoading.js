/* eslint-disable */
import React from "react";
import Tabview from "../../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../../components/Loading/ProjectsLoading";
//import Screenshot from "./ActivityCard.png";
export const ProjectLoading = () => {
  return (
    <>
      <Tabview
        componentName="ProjectLoading"
        path="\src\components\Loading\ProjectLoading.js"
        description="This is the Description of Compoennt"
        codeSnippet={CodeSnippet}
        libraryUsed={["lib/placeholders"]}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[]}
        images=""
        stylesheetUsed=""
        example="https://dev.currikistudio.org/"
      />
    </>
  );
};
