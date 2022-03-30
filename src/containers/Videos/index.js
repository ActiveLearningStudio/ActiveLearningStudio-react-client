/*eslint-disable*/
import React, { useState } from "react";
import Buttons from "utils/Buttons/buttons";
import TopHeading from "utils/TopHeading/topheading";
import { faFilter, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import searchimg from "assets/images/svg/search-icon-admin-panel.svg";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import "./style.scss";
import "../Admin/style.scss";

import HeadingText from "utils/HeadingText/headingtext";
import VideoImage from "assets/images/svg/Interactivevideos.svg";
import Footer from "components/Footer";
import { Tabs, Tab, Alert } from "react-bootstrap";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import HeadingThree from "utils/HeadingThree/headingthree";
import AddVideo from "./formik/addvideo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DescribeVideo from "./formik/describevideo";
import { useEffect } from "react";
import { getAllVideos, getSearchVideoCard } from "store/actions/videos";
import AddVideoCard from "utils/AddVideoCard/addvideocard";
import MyVerticallyCenteredModal from "components/models/videoH5pmodal";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

const Index = () => {
  const [openMyVideo, setOpenVideo] = useState(false);
  const [uploadImageStatus, setUploadImageStatus] = useState(false);
  const [screenStatus, setScreenStatus] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const videos = useSelector((state) => state.videos);
  const { activeOrganization, permission } = useSelector(
    (state) => state.organization
  );
  const { allVideos } = videos;
  const [searchQuery, setSearchQuery] = useState("");
  const [ActivePage, setActivePage] = useState(1);
  const [currentActivity, setCurrentActivity] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeOrganization) {
      dispatch(getAllVideos(activeOrganization.id));
    }
  }, [activeOrganization]);
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <>
      {openMyVideo && (
        <div
          className={
            uploadImageStatus
              ? "form-new-popup-myvideo z-index"
              : "form-new-popup-myvideo"
          }
        >
          <FontAwesomeIcon
            icon="times"
            className="cross-all-pop"
            onClick={() => {
              Swal.fire({
                text: "All changes will be lost if you don’t save them",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#084892",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Close it!",
                allowOutsideClick: false,
              }).then(async (result) => {
                if (result.isConfirmed) {
                  setOpenVideo(!openMyVideo);
                  setScreenStatus("");
                }
              });
            }}
          />
          <div className="inner-form-content">
            {screenStatus == "AddVideo" && (
              <AddVideo setScreenStatus={setScreenStatus} hideallothers />
            )}
            {screenStatus == "DescribeVideo" && (
              <DescribeVideo
                setOpenVideo={setOpenVideo}
                setScreenStatus={setScreenStatus}
                setUploadImageStatus={setUploadImageStatus}
              />
            )}
          </div>
        </div>
      )}
      <div className="myvideomain">
        <div className="content-wrapper">
          <div style={{ paddingBottom: " 66px" }} className="inner-content">
            {permission?.Video?.includes("video:view") ? (
              <>
                <div className="topHeading-video-detail">
                  <div className="topHeading">
                    <TopHeading
                      description={activeOrganization.name}
                      image={VideoImage}
                      svgImage={
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="1"
                            y="1.5"
                            width="20"
                            height="12"
                            rx="2"
                            stroke={primaryColor}
                            strokeWidth="2"
                          />
                          <path
                            d="M1 18.5H21"
                            stroke={primaryColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                          <circle
                            cx="15"
                            cy="18.5"
                            r="2"
                            fill="white"
                            stroke={primaryColor}
                            strokeWidth="2"
                          />
                          <path
                            d="M9 9.66667V5.43426C9 5.03491 9.44507 4.79672 9.77735 5.01823L13.3044 7.36957C13.619 7.5793 13.5959 8.04885 13.2623 8.22677L9.73529 10.1078C9.40224 10.2855 9 10.0441 9 9.66667Z"
                            stroke={primaryColor}
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      }
                      heading="My interactive videos"
                      color="#084892"
                    />
                    <Buttons
                      primary={true}
                      text="Create a video"
                      icon={faPlus}
                      width="163px"
                      height="35px"
                      onClick={() => {
                        setOpenVideo(!openMyVideo);
                        setScreenStatus("AddVideo");
                        dispatch({
                          type: "SET_ACTIVE_VIDEO_SCREEN",
                          payload: "",
                        });
                      }}
                      hover={true}
                    />
                  </div>
                  <div className="top-video-detail">
                    <div className="video-detail">
                      <HeadingText
                        text="Create and organize your activities into projects to create complete courses."
                        color="#515151"
                      />
                    </div>
                  </div>
                </div>
                <div className="my-interactive-videos">
                  <Tabs
                    className="main-tabs top-tabs"
                    defaultActiveKey="default"
                    id="uncontrolled-tab-example"
                  >
                    <Tab eventKey="default" title="My videos">
                      <div className="video-cards-top-search-filter">
                        <div className="search-bar">
                          <input
                            className=""
                            type="text"
                            value={searchQuery}
                            onChange={(e) => {
                              setSearchQuery(e.target.value);
                              if (activeOrganization) {
                                if (e.target.value.trim()) {
                                  dispatch(
                                    getSearchVideoCard(
                                      activeOrganization.id,
                                      e.target.value
                                    )
                                  );
                                } else {
                                  dispatch(getAllVideos(activeOrganization.id));
                                }
                              }
                            }}
                            placeholder="Search"
                          />
                          {/* <img
                            src={searchimg}
                            alt="search"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              if (activeOrganization) {
                                dispatch(
                                  getSearchVideoCard(
                                    activeOrganization.id,
                                    searchQuery
                                  )
                                );
                              }
                            }}
                          /> */}
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              if (activeOrganization) {
                                dispatch(
                                  getSearchVideoCard(
                                    activeOrganization.id,
                                    searchQuery
                                  )
                                );
                              }
                            }}
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
                        {/* <div className="video-filter-bar">
                            <FontAwesomeIcon icon={faFilter} color="#084892" />
                            <span>Filter</span>
                          </div> */}
                      </div>
                      {!allVideos?.data?.length ? (
                        <>
                          <div className="video-default-contianer">
                            <HeadingTwo
                              text="Start creating awesome interactive videos."
                              className="video-heading-1"
                            />
                            <HeadingText
                              text="Make your video engaging for your viewers and gather information
Interactive video has over xx interactions that can be added to video, It allows you move forward or back and provide grading if desired."
                              className="video-heading-2"
                            />
                            <HeadingThree
                              text="Start by pressing “Create a video” and make your content live!"
                              className="video-heading-3"
                            />
                            <div className="vedio-help">
                              <p>
                                Feeling lost? Go to <span>Help Center</span>
                              </p>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="video-cards-contianer">
                            <div className="video-cards-detail">
                              {allVideos?.data?.map((video) => {
                                return (
                                  <>
                                    <AddVideoCard
                                      setModalShow={setModalShow}
                                      setCurrentActivity={setCurrentActivity}
                                      setScreenStatus={setScreenStatus}
                                      setOpenVideo={setOpenVideo}
                                      title={video.title}
                                      data={video}
                                      className="card-spacing"
                                    />
                                  </>
                                );
                              })}
                            </div>
                            {allVideos?.data && (
                              <div style={{}} className="admin-panel ">
                                <Pagination
                                  activePage={ActivePage}
                                  pageRangeDisplayed={5}
                                  itemsCountPerPage={allVideos?.meta?.per_page}
                                  totalItemsCount={allVideos?.meta?.total}
                                  onChange={(e) => {
                                    console.log(e);
                                    setActivePage(e);
                                    dispatch(
                                      getAllVideos(activeOrganization.id, e)
                                    );
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </Tab>
                  </Tabs>
                </div>
              </>
            ) : (
              <Alert variant="danger">
                You are not authorized to view this page.
              </Alert>
            )}
          </div>
        </div>
      </div>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        activity={currentActivity}
        showvideoH5p={true}
        activeType={"demo"}
      />
    </>
  );
};

export default Index;
