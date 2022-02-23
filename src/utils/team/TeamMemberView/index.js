/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import IndexSnippet from "!!raw-loader!../../../containers/Teams/TeamMemberView/index";
import MemberView from "./teamMemberView.png";
import IndexStore from "!!raw-loader!../../../store/actions/team";
import IndexStyle from "!!raw-loader!../../../containers/Teams/TeamMemberView/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Teams\TeamMemberView\index.js"
        description="In the teamMemebrview component, you will see a search box where 
    you can search any member and invite him/her to join your team. There is also 
    a remove button in front of the member name, from where you can easily remove 
    the team member with one click."
        codeSnippet={IndexSnippet}
        libraryUsed={[
          "prop-types",
          "react-redux",
          "swal",
          "react-fontawesome",
          "react-router-dom",
        ]}
        customHooks={[
          {
            name: "/src/components/InviteDialog/index",
            url: "?path=/story/component-invitedialogue--component",
          },
          { name: " /src/containers/Teams/TeamMemberView/TeamMember", url: "" },
        ]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[{ path: "/src/store/actions/team", pathCode: IndexStore }]}
        apiUsed={[]}
        images={MemberView}
        stylesheetUsed={IndexStyle}
        example="https://dev.currikistudio.org/org/currikistudio/teams/88"
      />
    </>
  );
};
