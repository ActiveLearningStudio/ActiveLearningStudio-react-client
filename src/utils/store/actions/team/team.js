/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/actions/team";
import ApiCode from "!!raw-loader!../../../../services/team.service";
import StoreSnippet from "!!raw-loader!../../../../store/actions/team";
export const Team = () => {
  return (
    <>
      <Tabview
        componentName="Team"
        path="\src\store\actions\team.js"
        description="To update the team module, all these actions will be called.
         Each action will call API to get response data then will dispatch API response
          and action type. So update team action will be used to update the state of the team
           and load team action will be used to load team data. 
        In this way, all other actions will also be used to change the state of the team module."
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
        customHooks={[
          {
            name: "/src/store/actionTypes",
            url: "?path=/story/store-actiontypes--component",
          },
        ]}
        reduxStore={[
          { path: "/src/store/action/team", pathCode: StoreSnippet },
        ]}
        apiUsed={[{ path: "/src/services/team.service", apicode: ApiCode }]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
