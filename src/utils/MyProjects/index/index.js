/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import codeSnippet from "!!raw-loader!../../../containers/Projects/index";
import Indeximg from "./projectIndex.png";
import ProjectStore from "!!raw-loader!../../../store/actions/project";
import Stylesheetused from "!!raw-loader!../../../containers/Projects/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Projects\index.js"
        description="This is the main component of my project module.
         In this component, you will see a panel to show all projects
          with some necessary information. You will see a card of every
           project where the project title, project description, and project thumbnails are shown.
         In the other two tabs, you will see sample projects and favorite projects.
      As this is the main component of the project module, that's why a lot of others components 
      are imported into this component, which are used further to show project's information."
        codeSnippet={codeSnippet}
        libraryUsed={[
          "react-bootstrap",
          "react-redux",
          "react-fontawesome",
          "react-router-dom",
          "prop-types",
          "react-placeholder",
          "react-beautiful-dnd",
        ]}
        customHooks={[
          {
            name: "/src/components/Footer/index",
            url: "?path=/story/component-footer-index--component",
          },
          {
            name: "/src/components/DeletePopup/index",
            url: "?path=/story/component-deletepopup-index--component",
          },
          { name: "components/Loading/ProjectsLoading", url: "" },
          {
            name: "components/models/GoogleLoginModal",
            url: "?path=/story/component-modals-googleloginmodal--component",
          },
          {
            name: "./ProjectCard",
            url: "?path=/story/my-projects-projectcard--index",
          },
          {
            name: "./SampleProjectCard",
            url: "?path=/story/my-projects-sampleproject--component",
          },
          { name: "./NewProjectPage", url: "" },
        ]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[{ path: "store/actions/project", pathCode: ProjectStore }]}
        apiUsed={[]}
        images={Indeximg}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/currikistudio"
      />
    </>
  );
};
