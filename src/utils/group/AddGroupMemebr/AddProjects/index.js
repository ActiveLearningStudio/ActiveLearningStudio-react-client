/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import IndexSnippet from "!!raw-loader!../../../../containers/Teams/AddProjects/index";
import AddProject from "./AddProject.png";
import GroupStore from "!!raw-loader!../../../../store/actions/group";
import IndexStyle from "!!raw-loader!../../../../containers/Groups/AddProjects/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Groups\AddProjects\index.js"
        description="In this component, you will see the heading of the Add Project Section.
          After this, you will find a section where we have a search box and panel to display the project.
           You can search through the search
          box and select any project from the list to add to the group which you are creating."
        codeSnippet={IndexSnippet}
        libraryUsed={[
          "prop-types",
          "react-redux",
          "react-router-dom",
          "react-fontawesome",
        ]}
        customHooks={[
          {
            name:
              "/src/containers/Groups/CreateGroup/components/AssignProject/index",
            url: "?path=/story/groups-creategroup-assignproject--index",
          },
        ]}
        reduxStore={[
          { path: "/src/store/actions/group", pathCode: GroupStore },
        ]}
        apiUsed={[]}
        images={AddProject}
        stylesheetUsed={IndexStyle}
        example="https://dev.currikistudio.org/org/currikistudio/groups"
      />
    </>
  );
};
