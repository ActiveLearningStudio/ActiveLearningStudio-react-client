/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import IndexSnippet from "!!raw-loader!../../../containers/Groups/AddMembers/index";
import AddMember from "./addMember.png";
import IndexStore from "!!raw-loader!../../../store/actions/group";
import IndexStyle from "!!raw-loader!../../../containers/Groups/AddMembers/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Teams\AddMembers\index.js"
        description="In this component, we can add members to the team during the creation of a new team.
     Simply you need to enter the member name/email in the search box and then click on add button. 
     In this way, you can easily add a member to the team."
        codeSnippet={IndexSnippet}
        libraryUsed={["prop-types", "react-redux", "swal", "react-fontawesome"]}
        customHooks={[
          { name: "/src/containers/Teams/AddMembers/TeamMember", url: "" },
        ]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[
          { path: "/src/store/actions/group", pathCode: IndexStore },
        ]}
        apiUsed={[]}
        images={AddMember}
        stylesheetUsed={IndexStyle}
        example="https://dev.currikistudio.org/org/currikistudio/teams/88/projects/4756/add-member"
      />
    </>
  );
};
