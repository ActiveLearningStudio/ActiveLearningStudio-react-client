/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../store/index";
import StoreSnippet from "!!raw-loader!../../../store/reducers/index";

export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\store\index.js"
        description="This is the main component that is used to create the Redux store for the whole project.
         Root reducers will be imported in this component then by using the function of createstore, 
         a redux store will be created. CreateStore will take three-parameter which are root reducers, initial state, and object which is optional."
        codeSnippet={CodeSnippet}
        libraryUsed={["redux-thunk"]}
        customHooks={[]}
        reduxStore={[
          { path: "/src/store/reducers/index", pathCode: StoreSnippet },
        ]}
        apiUsed={[]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
