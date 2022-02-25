/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/actions/auth";
import ApiCode from "!!raw-loader!../../../../services/auth.service";
import StoreSnippet from "!!raw-loader!../../../../store/actions/auth";
export const Auth = () => {
  return (
    <>
      <Tabview
        componentName="Auth"
        path="\src\store\actions\auth.js"
        description="All the auth actions are present in this file.
          Which will be called through the reducer component of auth module. 
          Each action will send response data and an error message to the reducer
           component then the reducer component of auth module will process accordingly. 
           In these action components, mostly each action will call API and then send data
            through the dispatch function.
         The dispatch function contains an object of action type and action payload."
        codeSnippet={CodeSnippet}
        libraryUsed={["swal"]}
        customHooks={[
          {
            name: "/src/store/actionTypes",
            url: "?path=/story/store-actiontypes--component",
          },
        ]}
        reduxStore={[
          { path: "/src/store/action/auth", pathCode: StoreSnippet },
        ]}
        apiUsed={[{ path: "/src/services/auth.service", apicode: ApiCode }]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
