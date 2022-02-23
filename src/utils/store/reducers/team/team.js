/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/reducers/team";
import StoreSnippet from "!!raw-loader!../../../../store/actionTypes";

export const Team = () => {
  return (
    <>
      <Tabview
        componentName="Team"
        path="\src\store\reducers\team.js"
        description="This component is used to change the states of the team module.
         The states of the team module are as follows: isLoading, isInviting, showCreation,
          and showInviting, etc. ALl thee states will change through this reducer component with the help of case match to the switch statement."
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
        customHooks={[
          {
            name: "/src/store/actionTypes",
            url: "?path=/story/store-actiontypes--component",
          },
        ]}
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
