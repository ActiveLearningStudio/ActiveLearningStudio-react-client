/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../services/http.service";
export const HttpServices = () => {
  return (
    <>
      <Tabview
        componentName="HttpServices"
        path="\src\services\http.services.js"
        description="In the HTTP services module, you will see the necessary information to call any API. 
        You will see the auth Header which will be set in this module.
        Also, authentication tokens and base URL will be given in this module to run other APIs.
         So this is the main file to access your APIs data. You will use this file as a bridge every
          time to access any of your API files."
        codeSnippet={CodeSnippet}
        libraryUsed={["axios", "socket.io-client"]}
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
