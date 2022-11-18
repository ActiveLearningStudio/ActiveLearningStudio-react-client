/* eslint-disable */
import React from "react";
import Tabview from "../../../../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../../../../components/ResourceCard/EditResource/ResourceSelectActivity";
import ResourceStore from "!!raw-loader!../../../../../../../store/actions/resource";
import Stylesheetused from "!!raw-loader!../../../../../../../components/ResourceCard/AddResource/style.scss";
export const SelectActivity = () => {
  return (
    <>
      <Tabview
        componentName="ResourceSelectActivity"
        path="\src\components\ResourceCard\EditResource\ResourceSelectActivity.js"
        description="This component is used to change the activity from the given activity list. 
        There is a list of activities that will be available in the form of this component
         through which you can update the activity. After selecting the new activity you will 
         see a continue button at the end of the form to move to the next step of the activity."
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "prop-types",
          "react-redux",
          "react-router-dom",
          "redux-form",
        ]}
        customHooks={[
          {
            name: "/src/utils/index",
            url: "?path=/story/utils-index--component",
          },
          {
            name:
              "/src/components/ResourceCard/EditResource/EditResourceSidebar",
            url:
              "?path=/story/component-resourcecard-editresource-editresourcesidebar--component",
          },
          {
            name:
              "/src/components/ResourceCard/fields/ResourceActivityTypeField",
            url: "",
          },
        ]}
        reduxStore={[
          { path: "/src/store/actions/resource", pathCode: ResourceStore },
        ]}
        apiUsed={[]}
        images=""
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/project/3501/playlist/9280/activity/41679/edit"
      />
    </>
  );
};
