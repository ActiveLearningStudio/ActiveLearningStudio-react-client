/* eslint-disable */
import React from "react";
import Tabview from "../../../../../tabview/Tabview";
import IndexSnippet from "!!raw-loader!../../../../../../containers/Groups/CreateGroup/components/CreateGroupSidebar/index";
import GroupSlider from "./GroupSlider.png";
import IndexStyle from "!!raw-loader!../../../../../../containers/Groups/CreateGroup/components/CreateGroupSidebar/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Groups\CreateGroup\components\CreateGroupSlider\index.js"
        description="This component will be used for creating a slider of the group module.
          Group will be created in three steps, which you will see on the left-hand side during
           the creation of the group. In the slider component,
          you will see the title of each section which are used for the creation of the group."
        codeSnippet={IndexSnippet}
        libraryUsed={["prop-types", "classnames"]}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[]}
        images={GroupSlider}
        stylesheetUsed={IndexStyle}
        example="https://dev.currikistudio.org/org/currikistudio/groups/create-group"
      />
    </>
  );
};
