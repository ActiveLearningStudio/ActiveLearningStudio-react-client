/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/reducers/search";
import StoreSnippet from "!!raw-loader!../../../../store/actionTypes";

export const Search = () => {
  return (
    <>
      <Tabview
        componentName="Search"
        path="\src\store\reducers\search.js"
        description="In this component, the state of the search module will be changed. 
        Whenever the user will search for any query then this component will change three 
        states searchResults will be set as an object, the search query will be any string 
        statement that will be searched and the last one is metasearch which is also an object.
         All these states are changed through this component which will handle action in the switch statement."
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
