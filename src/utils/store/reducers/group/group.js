/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/reducers/group";
import StoreSnippet from "!!raw-loader!../../../../store/actionTypes";

export const Group = () => {
  return (
    <>
      <Tabview
        componentName="Group"
        path="\src\store\reducers\group.js"
        description="This reducer component will use to update the states of the group module. 
        Initially, all the states for this component will be set false. Whenever you will call
         the action for this reducer from the UI side then this component will trigger that action
          in the switch statement of this component. For example, if the action type is
           updateSelectGroup then that case will be called and update the state with relative payload from the action."
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
