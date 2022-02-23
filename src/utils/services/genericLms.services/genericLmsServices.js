/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../services/genericLMS.service";
import ApiCode from "!!raw-loader!../../../services/http.service";
export const GenericLmsServices = () => {
  return (
    <>
      <Tabview
        componentName="GenericLmsServices"
        path="\src\services\genericLMS.services.js"
        description="In GenericLmsSetting, you will see two APIs related to loadH5PSetting and safarimontagePublishTool which will set some generic settings for LMS.
         The data obtained through these APIs will also be used for H5P and safari-montage tool."
        codeSnippet={CodeSnippet}
        libraryUsed={["config"]}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[{ path: "/src/services/http.service", apicode: ApiCode }]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
