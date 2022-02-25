/* eslint-disable */
import React from "react";
import Tabview from "../../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../../components/ResourceCard/AddResource/ResourceActivityBuild";
import ResourceStore from "!!raw-loader!../../../../../store/actions/resource";
import Stylesheetused from "!!raw-loader!../../../../../components/ResourceCard/AddResource/style.scss";
export const Activitybuild = () => {
  return (
    <>
      <Tabview
        componentName="ResourceActivityBuild"
        path="\src\components\ResourceCard\AddResource\ResourceActivityBuild.js"
        description="This component is used to build activity. This is the last step to create your new atcivity. In this component,
         you just need to click on build activity to create your new activity."
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
            name: "/src/components/ResourceCard/AddResource/Editors/TinyEditor",
            url:
              "?path=/story/component-resourcecard-addresource-editors-tinyeditor--component",
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
        example="https://dev.currikistudio.org/org/testsuborg/project/6091/playlist/12960/activity/create"
      />
    </>
  );
};
