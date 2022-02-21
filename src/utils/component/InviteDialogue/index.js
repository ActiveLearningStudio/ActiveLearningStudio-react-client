/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import CodeSnippet from "!!raw-loader!../../../components/InviteDialog/index";
import Screenshot from "./InviteTeam.png";
import StoreSnippet from "!!raw-loader!../../../store/actions/team";
import Stylesheetused from "!!raw-loader!../../../components/InviteDialogGroup/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="InviteDialog"
        path="\src\components\InviteDialog\index.js"
        description="In the Invite dialogue box, you can invite any team member through
         this component. There is a search box where a user can search for any team member 
         and then click on the invite button to invite that selected team member. 
        After this, you can also add a special note with your invite to personalize your invitation."
        codeSnippet={CodeSnippet}
        libraryUsed={[
          "prop-types",
          "react-redux",
          "validator",
          "react-fontawesome",
          "_sortBy",
          "_debounce",
        ]}
        customHooks={[]}
        reduxStore={[
          { path: "/src/store/actions/team", pathCode: StoreSnippet },
        ]}
        apiUsed={[]}
        images={Screenshot}
        stylesheetUsed={Stylesheetused}
        example="https://dev.currikistudio.org/org/testsuborg/teams/create-team"
      />
    </>
  );
};
