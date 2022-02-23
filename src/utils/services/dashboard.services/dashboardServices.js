/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../services/dashboard.service";
import ApiCode from "!!raw-loader!../../../services/http.service";
export const DashboardServices = () => {
  return (
    <>
      <Tabview
        componentName="DashboarServices"
        path="\src\services\dasboard.services.js"
        description="In dashboard services, you will get project data by calling two APIs named with getUserProject and getProject. After calling these APIs,
         you can use this data in a further area where you will need project details."
        codeSnippet={CodeSnippet}
        libraryUsed={["config"]}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[{ path: "/src/services/http.service", apicode: ApiCode }]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
