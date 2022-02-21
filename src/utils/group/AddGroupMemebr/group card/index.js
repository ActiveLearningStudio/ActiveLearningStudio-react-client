/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import IndexSnippet from "!!raw-loader!../../../../containers/Groups/GroupCard/index";
import GroupCard from "./GroupCard.png";
import GroupStore from "../../../../store/actions/group";
import IndexStyle from "!!raw-loader!../../../../containers/Groups/GroupCard/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Groups\GroupCard\index.js"
        description="This is the component to show the detail of the group on a card. 
         In the card, you will see the group name, edit button, and the number of group members,
          which are added to this group. You can also see the number of projects which are added
           to that group. In the end,
          you will find a delete button to delete the group and data related to that group."
        codeSnippet={IndexSnippet}
        libraryUsed={["prop-types", "react-redux", "swal", "react-fontawesome"]}
        customHooks={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[
          { path: "/src/store/actions/group", pathCode: GroupStore },
        ]}
        apiUsed={[]}
        images={GroupCard}
        stylesheetUsed={IndexStyle}
        example="https://dev.currikistudio.org/org/currikistudio/groups"
      />
    </>
  );
};
