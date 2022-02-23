/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../services/errors";
export const Error = () => {
  return (
    <>
      <Tabview
        componentName="errorCatcher"
        path="\src\services\error.js"
        description="This service will be used for general error handling during the calling of APIs. 
        Whenever your APIs will be failed then this service will be called to show some error in swal. 
        Swal is a small box to show any prompt message."
        codeSnippet={CodeSnippet}
        libraryUsed={["swal"]}
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
