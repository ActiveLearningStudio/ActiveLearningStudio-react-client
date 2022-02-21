/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import SidebarSnippet from "!!raw-loader!../../../components/Sidebar/index";
import sidebarimg from "./sidebar.png";
import SidebarStore from "!!raw-loader!../../../store/actions/project";
import Stylesheet from "!!raw-loader!../../../components/Sidebar/style.scss";
export const Sidebar = () => {
  return (
    <>
      <Tabview
        componentName="Sidebar"
        path="\src\components\Sidebar\index.js"
        description="All the links in the sidebar are managed through this component. 
        There is also a toggle button to move the sidebar left for maximizing screen width.
        All the links in the sidebar are managed through the router. In the sidebar, 
        you will see links related to my projects, teams, groups, etc."
        codeSnippet={SidebarSnippet}
        libraryUsed={[
          "prop-types",
          "react-router-dom",
          "react-redux",
          "react-fontawesome",
          "react-bootstrap",
        ]}
        customHooks={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[
          { path: "/src/store/actions/project", pathCode: SidebarStore },
        ]}
        apiUsed={[]}
        images={sidebarimg}
        stylesheetUsed={Stylesheet}
        example="https://dev.currikistudio.org/org/currikistudio"
      />
    </>
  );
};
