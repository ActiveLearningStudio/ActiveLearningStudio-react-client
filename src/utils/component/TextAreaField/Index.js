/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../components/TextareaField/index";
//import { Stylesheetused } from "./stylesheetUsed";
//import Screenshot from "./ActivityCard.png";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="TextareaField"
        path="\src\components\TextareaField\index.js"
        description="This is the Description of Compoennt"
        codeSnippet={CodeSnippet}
        libraryUsed={["prop-types"]}
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
