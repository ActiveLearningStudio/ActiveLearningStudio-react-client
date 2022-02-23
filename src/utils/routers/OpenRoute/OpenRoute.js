/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../routers/OpenRoute";
export const OpenRoute = () => {
  return (
    <>
      <Tabview
        componentName="OpenRoute"
        path="\src\routers\OpenRoute.js"
        description="In any project, most of the pages/components are accessible to everyone without 
        authenticated user. These components will be placed in an open route. In this open route component, 
        you will see all those components which are accessible to everyone without a login credential. "
        codeSnippet={CodeSnippet}
        libraryUsed={["prop-types", "react-redux", "react-router-dom"]}
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
