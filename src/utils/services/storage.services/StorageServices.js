/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../services/storage.service";
export const StorageServices = () => {
  return (
    <>
      <Tabview
        componentName="StorageServices"
        path="\src\services\storage.services.js"
        description=" You will set data in local storage through API used in this service module. 
        When you will set some data in local storage then you will call setItem API and whenever you want to delete local storage then you will call removeItem API. 
        For getting storage data, then you will call getItem API."
        codeSnippet={CodeSnippet}
        libraryUsed={[]}
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
