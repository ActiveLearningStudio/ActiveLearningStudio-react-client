/* eslint-disable */
import React from "react";
import Tabview from "../../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../../components/ResourceCard/AddResource/ResourceSelectActivity";
import Screenshot from "./SelectActivity.png";
import ResourceStore from "!!raw-loader!../../../../../store/actions/resource";
import Stylesheetused from "!!raw-loader!../../../../../components/ResourceCard/AddResource/style.scss";
export const SelectActivity = () => {
  return (
    <>
      <Tabview
        componentName="ResourceSelectActivity"
        path="\src\components\ResourceCard\AddResource\ResourceSelectActivity.js"
        description="In this component, the resource activity navbar is imported and will
         display the navbar at the top. After this, you will see the list of activities and 
         a search option in the top right corner. You can also search for any activity there 
        and then pick your most favorite activity which you want to add to your project. "
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "prop-types",
          "react-redux",
          "react-router-dom",
          "redux-form",
          "react-fontawesome",
        ]}
        customHooks={[
          {
            name: "/src/utils/index",
            url: "?path=/story/utils-index--component",
          },
          {
            name:
              "/src/components/ResourceCard/fields/ResourceActivityTypeField",
            url: "",
          },
          {
            name: "/src/components/models/activityOptions",
            url: "?path=/story/component-modals-activityoptions--component",
          },
        ]}
        reduxStore={[
          { path: "/src/store/actions/resource", pathCode: ResourceStore },
        ]}
        apiUsed={[]}
        images={Screenshot}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/testsuborg/project/6091/playlist/12960/activity/create"
      />
    </>
  );
};
