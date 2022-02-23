/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/actions/resource";
import ApiCode from "!!raw-loader!../../../../services/resource.service";
export const Resource = () => {
  return (
    <>
      <Tabview
        componentName="Resource"
        path="\src\store\actions\resource.js"
        description="All the actions related to resource activity will be used here. 
        Mostly used actions are loaded resource activity, create activity, and edit activity.
         These actions will call the API
         for getting data and then use that as a payload to send to the reducer component."
        codeSnippet={CodeSnippet}
        libraryUsed={["swal", "axios", "laravel-echo"]}
        customHooks={[
          {
            name: "/src/store/actionTypes",
            url: "?path=/story/store-actiontypes--component",
          },
        ]}
        reduxStore={[]}
        apiUsed={[{ path: "/src/services/resource.service", apicode: ApiCode }]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
