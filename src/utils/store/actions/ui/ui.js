/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/actions/ui";
export const Ui = () => {
  return (
    <>
      <Tabview
        componentName="Ui"
        path="\src\store\actions\ui.js"
        description="To change the state of some UI related to the delete popup, these actions will be used. 
        When any actor clicks on the delete button attached to any resource then the delete popup action will be called. In this way to collapse the sidebar left, collapsed sidebar action will be called. And the last one is the hide delete button action is used to hide the button. 
        So the states of the delete button and sidebar are changed through these actions components."
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
        customHooks={[
          {
            name: "/src/store/actionTypes",
            url: "?path=/story/store-actiontypes--component",
          },
        ]}
        reduxStore={[]}
        apiUsed={[]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
