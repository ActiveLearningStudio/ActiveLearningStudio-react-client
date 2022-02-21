/* eslint-disable */
import React from "react";
import Tabview from "../../../../../tabview/Tabview";
import IndexSnippet from "!!raw-loader!../../../../../../containers/Groups/CreateGroup/components/Creation/index";
import Creation from "./CreateGroup.png";
import IndexStyle from "!!raw-loader!../../../../../../containers/Groups/CreateGroup/components/Creation/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Groups\CreateGroup\components\Creation\index.js"
        description="This component is used for the creation of a group. In this part, 
         you will create a group by filling a  form where you will enter 
         the group name and group description. After this, you will click on the continue button."
        codeSnippet={IndexSnippet}
        libraryUsed={["prop-types", "react-redux", "redux-form"]}
        customHooks={[
          {
            name: "/src/utils/index",
            url: "?path=/story/utils-index--component",
          },
          {
            name: "/src/components/InputField/index",
            url: "?path=/story/component-inputfield--component",
          },
          {
            name: "/src/components/TextareaField/index",
            url: "",
          },
        ]}
        reduxStore={[]}
        apiUsed={[]}
        images={Creation}
        stylesheetUsed={IndexStyle}
        example="https://dev.currikistudio.org/org/currikistudio/groups/create-group"
      />
    </>
  );
};
