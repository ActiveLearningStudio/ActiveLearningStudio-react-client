/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../helpers/xapi";
export const Xapi = () => {
  return (
    <>
      <Tabview
        componentName="Xapi"
        path="\src\helpers\xapi.js"
        description="This component is used to link H5P activities to their
         supported platoform. On the specific inoformation check, activity will
          be attached to their respective platform.
         For example if the platform is the Google Classroom then  activity will be used
         for the Google Classroom and will be used same like for LTI Client and Generic LMS."
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
