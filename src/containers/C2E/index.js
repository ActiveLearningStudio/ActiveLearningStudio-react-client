/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, Tab } from "react-bootstrap";
import Headline from "./headline";
import Buttons from "utils/Buttons/buttons";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import "../Projects/style.scss";
import SearchInputMdSvg from "iconLibrary/mainContainer/SearchInputMdSvg";
import C2eCard from "./c2eCard";
import "./style.scss";

export const C2ePage = (props) => {
  const { ui } = props;

  const hideShowSideBar = useSelector(
    (state) => state.msTeams.toggle_sidebar,
  );
  const isMsTeam = useSelector((state) => state.msTeams.is_msteam);
  const [activeFilter, setActiveFilter] = useState("small-grid");
  const [sortNumber, setSortNumber] = useState(5);
  const [startSearching, setStartSearching] = useState("");
  const [customCardWidth, setCustomCardWidth] = useState(
    "customcard20",
  );

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
        className={`content-wrapper content-wrapper-project c2e-wrapper ${activeFilter} ${
          hideShowSideBar == true ? "expend-content-menu" : ""
        }`}
        style={{ marginLeft: isMsTeam ? "223px" : "136px" }}
      >
        <div
          className={`inner-content  ${customCardWidth} my-c2e-main-container`}
        >
          <div className="">
            <Headline />

            <Tabs
              className="main-tabs"
              defaultActiveKey={"All C2E"}
              id="uncontrolled-tab-example"
            >
              <Tab eventKey="All C2E" title="All C2E">
                <div className="my-project-cards-top-search-filter">
                  <div className="search-bar">
                    <input
                      className=""
                      type="text"
                      placeholder="Search"
                      value={startSearching}
                      onChange={(e) => {
                        setStartSearching(e.target.value);
                      }}
                    />
                    <SearchInputMdSvg
                      primaryColor={primaryColor}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div>
                    <Buttons
                      text="Clear"
                      className="clr-btn"
                      onClick={() => {
                        // setSearchQuery("");
                      }}
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12">
                    <div className="project-list-all">
                      <div>
                        <div className="check-home">
                          <div className="playlist-resource">
                            <C2eCard key={1} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab eventKey="Live C2E" title="My Favorites">
                <div className="row">
                  <div
                    className="col-md-12"
                    style={{ display: "none" }}
                  >
                    <div className="program-page-title">
                      <h1>Live C2E</h1>
                    </div>
                  </div>
                </div>
              </Tab>

              <Tab eventKey="Draft C2E" title="My Draft C2E">
                <div className="row">
                  <div
                    className="col-md-12"
                    style={{ display: "none" }}
                  >
                    <div className="program-page-title">
                      <h1>Draft C2E</h1>
                    </div>
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default C2ePage;
