/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/reducers/gapi";
import StoreSnippet from "!!raw-loader!../../../../store/actionTypes";
export const Gapi = () => {
  return (
    <>
      <Tabview
        componentName="Gapi"
        path="\src\store\reducers\gapi.js"
        description="For updating states of Google login modal, this reducers component will be used.
         The component will accept an object of action and states which will update through this
          reducer. The component will match the action type and then update that state accordingly. 
          The states of the google login modal are as follows: get_student_course,get_student_auth,get_h5p_settings, etc."
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
