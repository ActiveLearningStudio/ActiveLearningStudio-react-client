/* eslint-disable */
import React from "react";
import Tabview from "../../../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../../../components/ResourceCard/EditResource/ResourceActivityBuild";
import ResourceStore from "!!raw-loader!../../../../../../store/actions/resource";
import Stylesheetused from "!!raw-loader!../../../../../../components/ResourceCard/AddResource/style.scss";
export const Activitybuild = () => {
  return (
    <>
      <Tabview
        componentName="ResourceActivityBuild"
        path="\src\components\ResourceCard\EditResource\ResourceActivityBuild.js"
        description="In the edit resource module, you will see a component regarding edit
         build activity.  Through this component, you will call the H5P editor
         and send some props to that editor for updating data of any resource activity."
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "prop-types",
          "react-redux",
          "react-router-dom",
          "react-fontawesome",
        ]}
        customHooks={[
          {
            name: "/src/utils/index",
            url: "?path=/story/utils-index--component",
          },
          {
            name: "/src/components/ResourceCard/AddResource/Editors/H5PEditor",
            url:
              "?path=/story/component-resourcecard-addresource-editors-h5peditor--component",
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
