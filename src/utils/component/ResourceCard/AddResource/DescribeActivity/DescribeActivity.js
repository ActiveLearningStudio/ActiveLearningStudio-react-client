/* eslint-disable */
import React from "react";
import Tabview from "../../../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../../../components/ResourceCard/AddResource/ResourceDescribeActivity";
import Screenshot from "./DescribeActivity.png";
import ResourceStore from "!!raw-loader!../../../../../store/actions/resource";
import Stylesheetused from "!!raw-loader!../../../../../components/ResourceCard/AddResource/style.scss";
export const DescribeActivity = () => {
  return (
    <>
      <Tabview
        componentName="ResourceDescribeActivity"
        path="\src\components\ResourceCard\AddResource\ResourceDescribeActivity.js"
        description="In this component, you will see a form describing the new activity.
        In this form, you will enter your activity title, subject, education level, and in the end,
         you will select the thumbnail of that activity. 
        After filling in these details you will see a  continue button to move to the next step."
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
            name: "/src/components/ResourceCard/fields/MetaTitleInputField",
            url:
              "?path=/story/component-resourcecard-field-metatitleinputfield--component",
          },
          {
            name: "/src/components/models/pexels",
            url: "?path=/story/component-modals-pexels--component",
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
        example="https://dev.currikistudio.org/org/testsuborg/project/6091/playlist/12960/activity/create"
      />
    </>
  );
};
