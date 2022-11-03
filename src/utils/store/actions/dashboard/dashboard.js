/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/actions/dashboard";
import ApiCode from "!!raw-loader!../../../../services/dashboard.service";
export const Dashboard = () => {
  return (
    <>
      <Tabview
        componentName="Dashboard"
        path="\src\store\actions\dashboard.js"
        description="In this, action components of the dashboard module are present.
         In each component API in dashboard service will be called and then each component will 
        send API response data and action type to the reducer component."
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
        customHooks={[
          {
            name: "/src/store/actionTypes",
            url: "?path=/story/store-actiontypes--component",
          },
        ]}
        reduxStore={[]}
        apiUsed={[
          { path: "/src/services/dashboard.service", apicode: ApiCode },
        ]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
