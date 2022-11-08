/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/reducers/canvas";
import StoreSnippet from "!!raw-loader!../../../../store/actionTypes";
export const Canvas = () => {
  return (
    <>
      <Tabview
        componentName="Canvas"
        path="\src\store\reducers\canvas.js"
        description="This reducer will update the state of the canvas component.
         Action called from the UI side will be placed in this component.
          Then this component will filter that action through a switch and 
          will update that state accordingly."
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
