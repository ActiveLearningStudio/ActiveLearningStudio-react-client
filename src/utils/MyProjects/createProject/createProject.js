/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import codeSnippet from "!!raw-loader!../../../containers/Projects/CreateProjectPopup/index";
import CreateProjectimg from "./createProject.png";
import ProjectStore from "!!raw-loader!../../../store/actions/project";
import Stylesheetused from "!!raw-loader!../../../containers/Projects/CreateProjectPopup/style.scss";
export const CreateProject = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Projects\CreateProjectPopup/index.js"
        description="In this component, you will see a popup to create a new project. In the popup, you will see a form to create a new project. There is a form to create a new project, where you will enter a project name, project description and then upload a project thumbnail. You can also set project visibility by selecting from the drop-down list. After this, you will see a button labeled with 'create project' to save your project information."
        codeSnippet={codeSnippet}
        libraryUsed={[
          "react-bootstrap",
          "react-redux",
          "react-router-dom",
          "prop-types",
          "Swal",
        ]}
        customHooks={[
          {
            name: "/src/components/InputField/index",
            url: "?path=/story/component-inputfield--component",
          },
          {
            name: "/src/components/TextareaField/index",
            url: "",
          },
          {
            name: "/src/components/TextareaField/index",
            url: "",
          },
        ]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[{ path: "store/actions/project", pathCode: ProjectStore }]}
        apiUsed={[]}
        images={CreateProjectimg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio"
      />
    </>
  );
};
