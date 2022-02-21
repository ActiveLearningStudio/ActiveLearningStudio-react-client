/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import IndexSnippet from "!!raw-loader!../../../../containers/Groups/GroupProjectView/index";
import GroupProjView from "./GroupprojectView.png";
import GroupStore from "!!raw-loader!../../../../store/actions/group";
import IndexStyle from "!!raw-loader!../../../../containers/Groups/GroupProjectView/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Groups\GroupProjectView\index.js"
        description="In the Group Project view, you will see the list of projects
          which are related to that group. In the project card, you will see the project
           name and number of group members which are present in that project. You will also 
           see the dropdown list to work with other functionalities
          like preview build, edit and remove the project, which you can do easily."
        codeSnippet={IndexSnippet}
        libraryUsed={[
          "prop-types",
          "react-redux",
          "swal",
          "react-fontawesome",
          "react-router-dom",
          "react-bootstrap",
        ]}
        customHooks={[
          {
            name: "/src/utils/index",
            url: "?path=/story/utils-index--component",
          },
        ]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[
          { path: "/src/store/actions/group", pathCode: GroupStore },
        ]}
        apiUsed={[]}
        images={GroupProjView}
        stylesheetUsed={IndexStyle}
        example="https://dev.currikistudio.org/org/currikistudio/groups/28/projects"
      />
    </>
  );
};
