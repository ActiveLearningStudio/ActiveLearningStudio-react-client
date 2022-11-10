/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../components/ComingSoon/index";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="ComingSoon"
        path="\src\components\ComingSoon\index.js"
        description="This is the Description of Compoennt"
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
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
