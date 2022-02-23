/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../services/search.service";
import ApiCode from "!!raw-loader!../../../services/http.service";
export const SearchServices = () => {
  return (
    <>
      <Tabview
        componentName="SearchServices"
        path="\src\services\search.services.js"
        description="This service module is used for search purposes. 
        You can get your advanced search data through this service module.
         Whenever you will search through the front end then APIs used
          in this module will be called and then provide you the search result."
        codeSnippet={CodeSnippet}
        libraryUsed={["config", "swal"]}
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
