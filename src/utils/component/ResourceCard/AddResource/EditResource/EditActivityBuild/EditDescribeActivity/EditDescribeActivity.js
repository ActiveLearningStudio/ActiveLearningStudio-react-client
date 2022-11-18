/* eslint-disable */
import React from "react";
import Tabview from "../../../../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../../../../components/ResourceCard/EditResource/ResourceDescribeActivity";
import Screenshot from "./DescribeActivity.png";
import ResourceStore from "!!raw-loader!../../../../../../../store/actions/resource";
import Stylesheetused from "!!raw-loader!../../../../../../../components/ResourceCard/AddResource/style.scss";
export const DescribeActivity = () => {
  return (
    <>
      <Tabview
        componentName="ResourceDescribeActivity"
        path="\src\components\ResourceCard\EditResource\ResourceDescribeActivity.js"
        description="In order to edit the description of a resource activity, this component 
        will be more helpful. Through this component, you can easily edit the description of the
         resource activity. When you click on edit activity then a form will be opened with data 
         related to the respective activity. You can edit this form to update the data of the 
         respective activity. You can change the title, subject,  education level, and thumbnail 
         of the resource activity. After filling this form you will see a save button at the end
          of the form. Click that button to save your changes."
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
            name: "/src/components/ResourceCard/fields/MetaTitleInputField",
            url:
              "?path=/story/component-resourcecard-field-metatitleinputfield--component",
          },
          {
            name: "/src/components/models/pexels",
            url: "path=/story/component-modals-pexels--component",
          },
          {
            name: "/src/components/ResourceCard/AddResource/dropdownData",
            url:
              "?path=/story/component-resourcecard-resourcecarddropdown--component",
          },
          {
            name: "/src/components/ResourceCard/fields/MetaSubjectsField",
            url:
              "?path=/story/component-resourcecard-field-metasubjectfield--component",
          },
          {
            name:
              "/src/components/ResourceCard/fields/MetaEducationLevelInputField",
            url:
              "?path=/story/component-resourcecard-field-metaeducationlevelinputfield--component",
          },
        ]}
        reduxStore={[
          { path: "/src/store/actions/resource", pathCode: ResourceStore },
        ]}
        apiUsed={[]}
        images={Screenshot}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio/project/3501/playlist/9280/activity/41679/edit"
      />
    </>
  );
};
