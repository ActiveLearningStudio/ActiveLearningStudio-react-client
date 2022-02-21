/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../logic/lmsCourse";
export const LmsCourse = () => {
  return (
    <>
      <Tabview
        componentName="prepareLmsCourse"
        path="\src\logic\lmsCourse.js"
        description="LMS course will be prepared through this component. 
        Project details will be received through props of this component.
         There is a condition for checking project and activity if the component
          found any project then it will prepare an LMS for that project.
           It will bind all activities related to that project. 
        In this way, You can use this component for creating the LMS of any project."
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
