/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/reducers/resource";
import StoreSnippet from "!!raw-loader!../../../../store/actionTypes";

export const Resource = () => {
  return (
    <>
      <Tabview
        componentName="Resource"
        path="\src\store\reducers\resource.js"
        description="Mostly reducer component is used as a bridge between redux store 
        and component. So in this case, the reducer is used to change the state for the
         resource module. It means if you will change the state of resource activity then 
         this component will be used to call the action to change the state. These are some
          default states for resource activity; isLoading:false,types: [ ],selectedType: null,
          selectedItem: null,items: [ ],newActivityType: null,"
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
