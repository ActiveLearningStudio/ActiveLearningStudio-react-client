/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../routers/PrivateRoute";
export const PrivateRoute = () => {
  return (
    <>
      <Tabview
        componentName="PrivateRoute"
        path="\src\routers\PrivateRoute.js"
        description="In the private route component, you will see all those components which 
        are private for that project. In this, you will see the login and subscribe component.
         These components are placed in a private route for security reasons.
         An only authenticated users can get access to this component. "
        codeSnippet={CodeSnippet}
        libraryUsed={["prop-types", "react-redux", "react-router-dom"]}
        customHooks={[
          {
            name: "/src/containers/Auth/SubscribePage",
            url: "",
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
