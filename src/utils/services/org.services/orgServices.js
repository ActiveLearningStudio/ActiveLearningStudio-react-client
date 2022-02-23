/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../services/organizations.services";
import ApiCode from "!!raw-loader!../../../services/http.service";
export const OrgServices = () => {
  return (
    <>
      <Tabview
        componentName="OrganizationsServices"
        path="\src\services\organizations.services.js"
        description="To get any detail related to the organization and sub-organization 
        you will use this service module. In this services module, you will see different 
        APIs related to organization data. First of all, you will call get organization API 
        to show all organizations in the panel. In this way, there are a lot of other APIs
         used in this module where you can update, delete and search any of your organization. 
         On the other hand, you can also get your sub-organization details here which will be 
         used in the organization section."
        codeSnippet={CodeSnippet}
        libraryUsed={["config"]}
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
