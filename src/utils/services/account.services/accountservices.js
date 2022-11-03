/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../services/account.service";
import ApiCode from "!!raw-loader!../../../services/http.service";
export const AccountServices = () => {
  return (
    <>
      <Tabview
        componentName="AccountServices"
        path="\src\services\account.services.js"
        description="This component is used for services where you will call API for getting account-related details.
         After calling this API you will get the User LMS setting which we will use when we needed."
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
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
