/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../services/resource.service";
import ApiCode from "!!raw-loader!../../../services/http.service";
export const ResourceServices = () => {
  return (
    <>
      <Tabview
        componentName="ResourceServices"
        path="\src\services\resource.services.js"
        description="In the Resource Services module, you will see all the APIs 
        related to resource activity. Whenever you will need data related to activity then you will use this service module. You can create, edit and delete activities through this service module. On the other hand,
         you can also get the H5P token and H5P settings details through this service module."
        codeSnippet={CodeSnippet}
        libraryUsed={["config", "swal"]}
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
