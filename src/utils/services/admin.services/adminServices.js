/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../services/admin.service";
import ApiCode from "!!raw-loader!../../../services/http.service";
export const AdminServices = () => {
  return (
    <>
      <Tabview
        componentName="AdmintServices"
        path="\src\services\admin.services.js"
        description="In the admin.services component, you will call those APIs that will be used for admin purposes.
         The details which you will get will be used in the admin area."
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
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
