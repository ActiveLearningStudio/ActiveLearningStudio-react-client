/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../store/genericLMSActionTypes";

export const GenericLms = () => {
  return (
    <>
      <Tabview
        componentName="genericLMSActionTypes"
        path="\src\store\genericLMSActionTypes.js"
        description="This is not the component 
        but components related to  Generic LMS Setting will be exported here in this file."
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
