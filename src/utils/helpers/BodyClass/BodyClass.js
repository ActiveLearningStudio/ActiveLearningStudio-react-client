/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../helpers/BodyClass";
export const BodyClass = () => {
  return (
    <>
      <Tabview
        componentName="useBodyClass"
        path="\src\helpers\BodyClass.js"
        description="Basically, this component is used for adding or removing classes 
        from the body of the pages. This component will expect one parameter which will
         be className. After checking specific criteria,
         className will be added to the body of that page that will use this component."
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
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
