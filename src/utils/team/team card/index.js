/* eslint-disable */
import React from "react";
import Tabview from "../../tabview/Tabview";
import IndexSnippet from "!!raw-loader!../../../containers/Teams/TeamCard/index";
import TeamCard from "./teamcard.png";
import IndexStore from "!!raw-loader!../../../store/actions/team";
import IndexStyle from "!!raw-loader!../../../containers/Teams/TeamCard/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Teams\TeamCard\index.js"
        description="This component is used to show team details in card design. 
    At the top, you will see the title of the team. After this, there is also
     an edit option where you can easily edit your team details. Below this team 
     member and strength of team member will also be shown. In the end, you will
      see a count of projects present in the respective team and also a delete button
       through which you can easily delete your team."
        codeSnippet={IndexSnippet}
        libraryUsed={[
          "prop-types",
          "react-redux",
          "react-router-dom",
          "react-bootstrap",
          "swal",
          "react-fontawesome",
        ]}
        customHooks={[]}
        //customHooks={['./formik/createOrg','removeActiveAdminForm']}
        reduxStore={[{ path: "/src/store/actions/team", pathCode: IndexStore }]}
        apiUsed={[]}
        images={TeamCard}
        stylesheetUsed={IndexStyle}
        example="https://dev.currikistudio.org/org/currikistudio/teams"
      />
    </>
  );
};
