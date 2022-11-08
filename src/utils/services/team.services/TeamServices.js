/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../services/team.service";
import ApiCode from "!!raw-loader!../../../services/http.service";
export const TeamServices = () => {
  return (
    <>
      <Tabview
        componentName="TeamServices"
        path="\src\services\team.services.js"
        description="In this service module, you will call all those APIs that are related to the team section area.
         Whenever you will create a team then create API will be called in this module. 
         If you want to update team data then you will call update team API. 
         In this way, other APIs used in this module are invite members, remove members, add a project, remove a member from the project, etc."
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
