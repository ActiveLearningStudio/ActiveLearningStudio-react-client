/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import Headline from "./headline";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import "../Projects/style.scss";
import SearchInputMdSvg from "iconLibrary/mainContainer/SearchInputMdSvg";
import C2eCard from "./card";
import C2eDetailModal from "./c2eDetailModal";

export const C2eEditPage = (props) => {
  const { ui } = props;

  const hideShowSideBar = useSelector(
    (state) => state.msTeams.toggle_sidebar
  );
  const isMsTeam = useSelector((state) => state.msTeams.is_msteam);
  const [activeFilter, setActiveFilter] = useState("small-grid");
  const [sortNumber, setSortNumber] = useState(5);
  const [startSearching, setStartSearching] = useState("");
  const [customCardWidth, setCustomCardWidth] = useState(
    "customcard20"
  );
  const [createProject, setCreateProject] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const sw = window.innerWidth;
    if (sw < 1200) {
      setSortNumber(3);
      setCustomCardWidth("customcard30");
    } else if (sw < 1600) {
      setSortNumber(5);
      setCustomCardWidth("customcard50");
    } else if (sw > 1600) {
      setSortNumber(6);
      setCustomCardWidth("customcard60");
    }
  }, [window.innerWidth]);

  // const { showDeletePlaylistPopup } = ui;
  const primaryColor = getGlobalColor("--main-primary-color");

  return (
    <>
      <div
        className={`content-wrapper content-wrapper-project ${activeFilter} ${
          hideShowSideBar == true ? "expend-content-menu" : ""
        }`}
        style={{ marginLeft: isMsTeam ? "223px" : "136px" }}
      >
        <div className={`inner-content  ${customCardWidth}`}>
          <div className="">
            <Headline setCreateProject={setCreateProject} />
            <Tabs
              className="main-tabs"
              defaultActiveKey={"All"}
              id="uncontrolled-tab-example"
            >
              <Tab eventKey="All" title="All">
                <div className="row">
                  <div className="col-md-12">
                    <div className="project-list-all">
                      <div>
                        <div className="mt-4">
                          <C2eCard key={1} />
                          <C2eCard key={1} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab eventKey="Playlists" title="Playlists">
                <div className="row">
                  <div
                    className="col-md-12"
                    style={{ display: "none" }}
                  >
                    <div className="program-page-title">
                      <h1>Playlists</h1>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab eventKey="Activities" title="Activities">
                <div className="row">
                  <div
                    className="col-md-12"
                    style={{ display: "none" }}
                  >
                    <div className="program-page-title">
                      <h1>Activities</h1>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>

      <C2eDetailModal
        show={createProject}
        handleCloseProjectModal={setCreateProject}
      />
    </>
  );
};

export default C2eEditPage;
