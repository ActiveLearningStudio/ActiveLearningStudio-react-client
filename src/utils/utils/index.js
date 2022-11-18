/* eslint-disable */
import React from "react";
import Tabview from "../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../utils/index";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="getErrors"
        path="\src\utils\index.js"
        description="In this component, you will see mostly animation. 
        Here we are using fade-in animation for the div element. 
        Whenever you need to use a smooth animation for any element,
         you can use this component to apply animation."
        codeSnippet={CodeSnippet}
        libraryUsed={["react-animations", "styled-components"]}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[]}
        images=""
        stylesheetUsed=""
        examples=""
      />
    </>
  );
};
