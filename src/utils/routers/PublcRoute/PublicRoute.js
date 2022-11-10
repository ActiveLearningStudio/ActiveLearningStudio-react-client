/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../routers/PublicRoute";
export const PublicRoute = () => {
  return (
    <>
      <Tabview
        componentName="PublicRoute"
        path="\src\routers\PublicRoute.js"
        description="This is the component for showing all public routes.
        Through the app route, you will pass props to the public route and move to the exact page where you want to move.
        After login in to the project, you will find a lot of routes that are public for the authenticated user.
         So this component will give you access to those components."
        codeSnippet={CodeSnippet}
        libraryUsed={["prop-types", "react-redux", "react-router-dom"]}
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
