/* eslint-disable */
import React from "react";
import Tabview from "../../../tabview/Tabview";
import IndexSnippet from "!!raw-loader!../../../../containers/Teams/CreateTeam/components/CreateTeamSidebar/index";
import TeamSlider from "./teamSlider.png";
import IndexStyle from "!!raw-loader!../../../../containers/Teams/CreateTeam/components/CreateTeamSidebar/style.scss";
export const Index = () => {
  return (
    <>
      <Tabview
        componentName="Index"
        path="\src\containers\Teams\CreateTeam\components\CreateTeamSlider\index.js"
        description="In this component, you will create a slider bar for the creation of a team 
    where you will see three links create team, invite members and add a project. 
    When you click on one of them then,that link will be active and show the respective form for creation of team."
        codeSnippet={IndexSnippet}
        libraryUsed={["prop-types", "classnames"]}
        customHooks={[]}
        reduxStore={[]}
        apiUsed={[]}
        images={TeamSlider}
        stylesheetUsed={IndexStyle}
        example="https://dev.currikistudio.org/org/currikistudio/teams/create-team"
      />
    </>
  );
};
