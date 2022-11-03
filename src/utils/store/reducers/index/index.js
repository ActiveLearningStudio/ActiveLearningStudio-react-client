/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/reducers/index";

export const Index = () => {
  return (
    <>
      <Tabview
        componentName="combineReducers"
        path="\src\store\reducers\index.js"
        description="This is the index component for the reducer module.
         In this component, all the components in the reducers folder will be imported and then combine through a function named combineReducers which will come from the redux.
         After this, the combine reducer is also exported for use in the store component"
        codeSnippet={CodeSnippet}
        libraryUsed={["redux-form"]}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
