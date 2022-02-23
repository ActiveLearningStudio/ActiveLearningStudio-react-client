/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/reducers/admin";
import StoreSnippet from "!!raw-loader!../../../../store/actionTypes";

export const Admin = () => {
  return (
    <>
      <Tabview
        componentName="Admin"
        path="\src\store\Reducers\admin.js"
        description="In this component, all the states for the admin module will be changed. In the start, initial states are mentioned and these states will change through this component by using action. In this component,
         the switch statement will match the exact action which needs to be changed."
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
        customHooks={[]}
        reduxStore={[
          { path: "/src/store/actionTypes", pathCode: StoreSnippet },
        ]}
        apiUsed={[]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
