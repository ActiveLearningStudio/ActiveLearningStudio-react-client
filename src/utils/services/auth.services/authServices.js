/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../services/auth.service";
import ApiCode from "!!raw-loader!../../../services/http.service";
export const AuthServices = () => {
  return (
    <>
      <Tabview
        componentName="AuthServices"
        path="\src\services\auth.services.js"
        description="In auth. services, you will call those APIs that will be used for authentication purposes. 
        So in this service, you will call login API to login into your account. You will call register API for creating a new account.
        Other APIs which are using in this service have reset the password, update profile, 
        forget the password, subscribe and search users, etc."
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
        customHooks={[
          {
            name: "/src/services/errors",
            url: "?path=/story/services-error--component",
          },
        ]}
        reduxStore={[]}
        apiUsed={[{ path: "/src/services/http.service", apicode: ApiCode }]}
        images=""
        stylesheetUsed=""
        example=""
      />
    </>
  );
};
