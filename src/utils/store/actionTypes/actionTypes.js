/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../store/actionTypes";

export const ActionTypes = () => {
  return (
    <>
      <Tabview
        componentName="ActionTypes"
        path="\src\store\actionTypes.js"
        description="In this component, all the action components used in the actions folder are exported.
         In this way, you can use all the actions outside of this directory"
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
