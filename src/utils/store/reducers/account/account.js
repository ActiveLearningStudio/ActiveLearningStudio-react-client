/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/reducers/account";
import StoreSnippet from "!!raw-loader!../../../../store/actionTypes";
export const Account = () => {
  return (
    <>
      <Tabview
        componentName="Account"
        path="\src\store\reducers\account.js"
        description="his is the reducer component for the account module.
         In the start, initial states are mentioned for an account while these states are also changed through this component by using actions. Action types are placed in the switch statement and 
        the component will perform that action which will match in the switch statement."
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
