/* eslint-disable */
import React from "react";
import Tabview from "../../../../../tabview/Tabview";
import IndexSnippet from "!!raw-loader!../../../../../../containers/Groups/CreateGroup/components/InviteGroup/index";
import GroupStore from "!!raw-loader!../../../../../../store/actions/group";
import InviteGroup from "./inviteGroup.png";
import IndexStyle from "!!raw-loader!../../../../../../containers/Groups/CreateGroup/components/InviteGroup/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Groups\components\InviteGroup\index.js"
        description="In this component, you can add any member to your group.
          There is a button to invite any member to your group. When you click on it,
           then you will see the email list of members from where you can select any
            to send the invite to your group.
          In the end, you will see a continue button to submit your group-related data."
        codeSnippet={IndexSnippet}
        libraryUsed={["prop-types", "react-redux"]}
        customHooks={[
          {
            name: "/src/components/InviteDialogGroup/index",
            url: "?path=/story/component-invitedialogue--component",
          },
          {
            name: "/src/utils/index",
            url: "?path=/story/utils-index--component",
          },
          {
            name:
              "/src/containers/Groups/CreateGroup/components/InviteGroup/MemberItem",
            url: "",
          },
        ]}
        reduxStore={[
          { path: "/src/store/actions/group", pathCode: GroupStore },
        ]}
        apiUsed={[]}
        images={InviteGroup}
        stylesheetUsed={IndexStyle}
        example="https://dev.currikistudio.org/org/currikistudio/groups/create-group"
      />
    </>
  );
};
