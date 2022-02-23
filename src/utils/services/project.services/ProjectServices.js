/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../services/project.service";
import ApiCode from "!!raw-loader!../../../services/http.service";
export const ProjectServices = () => {
  return (
    <>
      <Tabview
        componentName="ProjectServices"
        path="\src\services\project.services.js"
        description="In the project services module, you will call those APIs that are important for project data. 
        For example, if you want to create, update, remove and clone your project then this service module will be used.
         You can also add your project to your favorite through this service module. 
         So to get a shared project, you will also use this service module to get shared data.
        In this way, you will call APIs used in this module to get project data whenever 
        you need details related to the project on the front end side."
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
