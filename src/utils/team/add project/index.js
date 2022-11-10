/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import IndexSnippet from "!!raw-loader!../../../containers/Groups/AddProjects/index";
import AddProject from "./addproject.png";
import IndexStore from "!!raw-loader!../../../store/actions/group";
import IndexStyle from "!!raw-loader!../../../containers/Groups/AddProjects/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Teams\AddProjects\index.js"
        description="In AddProject component, you can add a project to the team. 
    There is a search box on the top where you can search for your most favorite project 
    and add it to the team. On the other hand, if you didn't want to search then a list of 
    all projects will be open where you can easily choose your project and then add it to the team.
     In this component, we are calling another component with the name 'AssignProject' 
     which is used to show details for all projects."
        codeSnippet={IndexSnippet}
        libraryUsed={[
          "prop-types",
          "react-redux",
          "react-router-dom",
          "react-bootstrap",
        ]}
        customHooks={[
          {
            name:
              "/src/containers/Teams/CreateTeam/components/AssignProject/index",
            url: "?path=/story/teams-createteam-assignproject--index",
          },
        ]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[
          { path: "/src/store/actions/group", pathCode: IndexStore },
        ]}
        apiUsed={[]}
        images={AddProject}
        stylesheetUsed={IndexStyle}
        example="https://dev.currikistudio.org/org/currikistudio/teams/96/add-projects"
      />
    </>
  );
};
