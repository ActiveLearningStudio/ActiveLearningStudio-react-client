/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/reducers/auth";
import StoreSnippet from "!!raw-loader!../../../../store/actionTypes";

export const Auth = () => {
  return (
    <>
      <Tabview
        componentName="Auth"
        path="\src\store\reducers\auth.js"
        description="To change the states of auth component this reducers component will be used. Default states are mentioned in this component and then this component will update states of auth component dynamically according to action called from the UI side. 
        The component will filter that action through a switch and then perform that action."
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
