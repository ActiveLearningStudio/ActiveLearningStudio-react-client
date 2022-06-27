/*eslint-disable*/
import React, { useEffect, useState } from "react";
import {
  faArrowLeft,
  faArrowRight,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import { Tabs, Tab, Alert } from "react-bootstrap";
import { getAllVideos, getSearchVideoCard } from "store/actions/videos";
import "./style.scss";
import Buttons from "utils/Buttons/buttons";
import TeamProjectCard from "utils/TeamProjectCard/teamprojectcard";
import { useDispatch, useSelector } from "react-redux";
import {
  allIndActivity,
  adminIntActivities,
} from "store/actions/indActivities";
import { addActivityPlaylistSearch } from "store/actions/playlist";

const SelectActivity = ({
  setSelectSearchModule,
  playlistIdForSearchingTab,
  setReloadPlaylist,
  reloadPlaylist,
}) => {
  const primaryColor = getGlobalColor("--main-primary-color");
  const secondaryColor = getGlobalColor("--main-secondary-color");
  const [activeTab, setActiveTab] = useState("Ind. Activities");
  const [selectProject, setSelectProject] = useState([]);
  const dispatch = useDispatch();
  const { allActivities, isLoading } = useSelector((state) => state.activities);
  const { activeOrganization, permission } = useSelector(
    (state) => state.organization
  );

  useEffect(() => {
    dispatch(allIndActivity(activeOrganization.id));
  }, [activeOrganization]);

  // useEffect(() => {
  //   console.log("allActivities", allActivities);
  //   allActivities?.data.map((item) => {
  //     console.log("Detail", item.title);
  //   });
  // }, [allActivities]);

  // useEffect(() => {
  //   console.log("selectProject", selectProject[0]);
  // }, [selectProject]);

  return (
    <>
      <div className="content-wrapper">
        <div className="inner-content">
          <div className="content" style={{ minHeight: "764px" }}>
            <div className="organization-name">Curriki Studio</div>
            <div>
              <div className="activity-header">
                <div>
                  <h1 className="title-activity">Add existing activity</h1>
                </div>
                <div
                  className="back-to-project"
                  onClick={() => {
                    setReloadPlaylist(!reloadPlaylist);
                    setSelectSearchModule(false);
                  }}
                >
                  <FontAwesomeIcon
                    icon={faArrowLeft}
                    className="mr-18"
                    color={primaryColor}
                  />
                  <span>Back to project </span>
                </div>
              </div>
              <Tabs
                onSelect={(eventKey) => {}}
                className="main-tabs"
                defaultActiveKey={activeTab}
                id="uncontrolled-tab-example"
              >
                <Tab eventKey="Ind. Activities" title="Ind. Activities">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="flex-button-top">
                        <div className="team-controller">
                          <div className="search-and-filters">
                            <div className="search-bar">
                              <input
                                type="text"
                                className="search-input"
                                placeholder="Search team"
                                // value={searchQuery}
                              />

                              <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                // onClick={searchQueryHandler}
                              >
                                <path
                                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58175 3 3.00003 6.58172 3.00003 11C3.00003 15.4183 6.58175 19 11 19Z"
                                  stroke={primaryColor}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M21 20.9984L16.65 16.6484"
                                  stroke={primaryColor}
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            </div>
                          </div>

                          <div>
                            <Buttons
                              icon={faPlus}
                              iconColor={secondaryColor}
                              type="button"
                              text="Add activity to project"
                              primary
                              width="220px"
                              height="32px"
                              hover
                              onClick={() => {
                                dispatch(
                                  addActivityPlaylistSearch(
                                    selectProject[0],
                                    playlistIdForSearchingTab
                                  )
                                );
                                setSelectProject([]);
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      {isLoading ? (
                        <>
                          <Alert variant="primary" className="alert">
                            Loading...
                          </Alert>
                        </>
                      ) : (
                        <>
                          <div className="list-of-team-projects">
                            {allActivities?.data.map((item) => {
                              return (
                                <TeamProjectCard
                                  backgroundImg={item?.thumb_url}
                                  title={item?.title}
                                  className="mrt"
                                  key={item?.id}
                                  selectProject={selectProject}
                                  setSelectProject={setSelectProject}
                                  project={item}
                                />
                              );
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectActivity;
