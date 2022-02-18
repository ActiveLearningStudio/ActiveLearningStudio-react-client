/*eslint-disable */
import React, { useState } from "react";
import AddTeamProjects from "./addteamprojects";
import TeamDetail from "./teamDetail";
import "./style.scss";

const Index = () => {
  const [pageLoad, setPageLoad] = useState(true);
  return (
    <>
      <div className="content-wrapper">
        <div className="inner-content">
          <div>
            {pageLoad ? (
              <TeamDetail setPageLoad={setPageLoad} />
            ) : (
              <AddTeamProjects setPageLoad={setPageLoad} />
            )}
            {/* <AddTeams setPageLoad={setPageLoad}  />
            <AddTeamProjects setPageLoad={setPageLoad} /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
