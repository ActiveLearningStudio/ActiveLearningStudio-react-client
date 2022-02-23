/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/actions/gapi";
import ApiCode from "!!raw-loader!../../../../services/gapi.service";
export const Gapi = () => {
  return (
    <>
      <Tabview
        componentName="Gapi"
        path="\src\store\actions\gapi.js"
        description="To get google API data all the action components present in this
         file will be used. Each component first fetch data through API
         then send API response and action type to the reducer components."
        codeSnippet={CodeSnippet}
        libraryUsed={["swal"]}
        customHooks={[
          {
            name: "/src/store/actionTypes",
            url: "?path=/story/store-actiontypes--component",
          },
        ]}
        reduxStore={[]}
        apiUsed={[{ path: "/src/services/gapi.service", apicode: ApiCode }]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
