/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/actions/admin";
import ApiCode from "!!raw-loader!../../../../services/admin.service";
import StoreSnippet from "!!raw-loader!../../../../store/actions/admin";
export const Admin = () => {
  return (
    <>
      <Tabview
        componentName="Admin"
        path="\src\store\actions\admin.js"
        description="The action components for the admin module are present in this file. 
        All these actions will import into the reducer component of the admin module. 
        In some components, the API will be called and then the component will send API 
         response data to the reducer component as a payload.
         Then reducer component of the admin module will change states according to the payload."
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
        customHooks={[
          {
            name: "/src/store/actionTypes",
            url: "?path=/story/store-actiontypes--component",
          },
        ]}
        reduxStore={[
          { path: "/src/store/action/admin", pathCode: StoreSnippet },
        ]}
        apiUsed={[{ path: "/src/services/admin.service", apicode: ApiCode }]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
