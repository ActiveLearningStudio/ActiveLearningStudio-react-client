/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/actions/group";
import ApiCode from "!!raw-loader!../../../../services/group.service";
import StoreSnippet from "!!raw-loader!../../../../store/actions/group";

export const Group = () => {
  return (
    <>
      <Tabview
        componentName="Group"
        path="\src\store\actions\group.js"
        description="In this file, all the action components related to the group module are present.
         In order to create a group, update the group, and invite group members these components will call API and then send response data to the reducer to update 
        the state of group module like create, update, delete, invite group member, etc."
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
        customHooks={[
          {
            name: "/src/store/actionTypes",
            url: "?path=/story/store-actiontypes--component",
          },
        ]}
        reduxStore={[
          { path: "/src/store/action/group", pathCode: StoreSnippet },
        ]}
        apiUsed={[{ path: "/src/services/group.service", apicode: ApiCode }]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
