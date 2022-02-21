/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import IndexSnippet from "!!raw-loader!../../../containers/Groups/AddMembers/index";
import AddGroupMember from "./AddGroupMember.png";
import GroupStore from "!!raw-loader!../../../store/actions/group";
import IndexStyle from "!!raw-loader!../../../containers/Groups/AddMembers/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Groups\AddMember\index.js"
        description="In Add Group Member, you will see a search box and one button to 
        add any member to your group.
         You can search an  email of any  members and then add to your group."
        codeSnippet={IndexSnippet}
        libraryUsed={[
          "prop-types",
          "react-redux",
          "swal",
          "react-fontawesome",
          "lodash",
        ]}
        customHooks={[
          {
            name: "/src/containers/Groups/AddMembers/GroupMember",
            url: "",
          },
        ]}
        reduxStore={[
          { path: "/src/store/actions/group", pathCode: GroupStore },
        ]}
        apiUsed={[]}
        images={AddGroupMember}
        stylesheetUsed={IndexStyle}
        example="https://dev.currikistudio.org/org/currikistudio/groups"
      />
    </>
  );
};
