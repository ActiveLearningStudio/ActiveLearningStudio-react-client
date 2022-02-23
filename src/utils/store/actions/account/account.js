/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../store/actions/account";
import ApiCode from "!!raw-loader!../../../../services/account.service";
export const Account = () => {
  return (
    <>
      <Tabview
        componentName="Account"
        path="\src\store\actions\account.js"
        description="In this component, the LMS setting service will be called. After this,
         the response of service and type of action will be dispatch for the reducer.
          Then reducer will use that action to change the state. "
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
        customHooks={[
          {
            name: "/src/store/actionTypes",
            url: "?path=/story/store-actiontypes--component",
          },
        ]}
        reduxStore={[]}
        apiUsed={[{ path: "/src/services/account.service", apicode: ApiCode }]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
