/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/reducers/ui";
import StoreSnippet from "!!raw-loader!../../../../store/actionTypes";
export const Ui = () => {
  return (
    <>
      <Tabview
        componentName="Ui"
        path="\src\store\reducers\ui.js"
        description="In this component, some states of UI will be changed for better 
        response to the end-user. To change the states of delete popup SHOW_DELETE_POPUP and 
        HIDE_DELETE_POPUP actions will be called. All other states which are mentioned below 
        also change through this component. Other states are as follows: PAGE_LOADING,
        DELETE_PROJECT_SUCCESS,
        DELETE_PLAYLIST_SUCCESS, and 
        DELETE_RESOURCE_SUCCESS, etc."
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
