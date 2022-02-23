/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/reducers/organization";
import StoreSnippet from "!!raw-loader!../../../../store/actionTypes";
export const Organization = () => {
  return (
    <>
      <Tabview
        componentName="Organization"
        path="\src\store\reducers\organization.js"
        description="This is the reducer component for the organization module. 
        In this component, all the states for the organization module will be set as default.
         When an actor wants to change the state from the UI side then this reducer component will perform an action according to the state. 
        The component has a switch statement that will decide which action needs to be called."
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
