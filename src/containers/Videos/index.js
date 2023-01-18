/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
/* eslint-disable */
import React, { useState, useEffect } from "react";
import TopHeading from "utils/TopHeading/topheading";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { clearSearch } from "store/actions/search";
import Pagination from "react-js-pagination";
import Swal from "sweetalert2";
import "./style.scss";
import "../Admin/style.scss";
import { useHistory } from "react-router-dom";

import MyActivity from "containers/MyActivity";
import VideoImage from "assets/images/svg/Interactivevideos.svg";
import * as actionTypes from "store/actionTypes";
import { Alert, Dropdown } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  getAllVideos,
  getSearchVideoCard,
} from "store/actions/videos";
import { allIndActivity } from "store/actions/indActivities";
import AddVideoCard from "utils/AddVideoCard/addvideocard";
import MyVerticallyCenteredModals from "components/models/videoH5pmodal";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import GoogleModel from "components/models/GoogleLoginModal";
import OverlayTriggerPop from "utils/OverlayTiggerPop/overlaytiggerpop";
import SearchForm from "components/Header/searchForm";
import ProjectCardSkeleton from "components/Skeletons/projectCard";
import {
  googleShare,
  msTeamShare,
  shareToCanvas,
} from "store/actions/gapi";
import StartingPage from "utils/StartingPage/startingpage";
import { MyVerticallyCenteredModal } from "containers/Search";
import Buttons from "utils/Buttons/buttons";
import DescribeVideo from "./formik/describevideo";
import AddVideo from "./formik/addvideo";
import loader from "assets/images/loader.svg";
import MyActivityLgSvg from "iconLibrary/mainContainer/MyActivityLgSvg";
import SearchInputMdSvg from "iconLibrary/mainContainer/SearchInputMdSvg";
import PlusXlSvg from "iconLibrary/mainContainer/PlusXlSvg";
import MyInteractiveVideoLgSvg from "iconLibrary/mainContainer/MyInteractiveVideoLgSvg";
import ReactJoyride, {
  CallBackProps,
  STATUS,
  Step,
} from "react-joyride";

const ImgLoader = () => <img src={loader} alt="loader" />;

// eslint-disable-next-line react/prop-types
const Index = ({ activities }) => {
  const [videoTitle, setVideoTitle] = useState("");
  const [videodesc, setvideodesc] = useState("");
  const [subName, setsubName] = useState("");
  const [authortagName, setauthortagName] = useState("");
  const [eduLevel, seteduLevel] = useState("");
  const [openMyVideo, setOpenVideo] = useState(false);
  const [selectedProjectstoAdd, setSelectedProjectstoAdd] = useState(
    []
  );
  const [uploadImageStatus, setUploadImageStatus] = useState(false);
  const [screenStatus, setScreenStatus] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [modalShowClone, setModalShowClone] = useState(false);
  const [addToProjectCheckbox, setAddToProjectCheckbox] = useState(
    false
  );
  const videos = useSelector((state) => state.videos);
  const { currentOrganization, permission } = useSelector(
    (state) => state.organization
  );
  const { allActivities, isLoading, islazyLoader } = useSelector(
    (state) => state.activities
  );
  const [activescreenType, setActiveScreenPage] = useState(null);
  const { allVideos } = videos;
  const [searchQuery, setSearchQuery] = useState("");
  const [ActivePage, setActivePage] = useState(1);
  const [currentActivity, setCurrentActivity] = useState(null);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(0);
  const [defaultSize, setdefaultSize] = useState(30);
  const [hideallothers, sethideallothers] = useState(true);
  const [isbackHide, setisbackHide] = useState(true);
  const history = useHistory();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (currentOrganization && !activities) {
      dispatch(getAllVideos(currentOrganization.id));
    }
    if (currentOrganization && activities) {
      dispatch(
        allIndActivity(
          currentOrganization.id,
          ActivePage,
          defaultSize
        )
      );
    }
  }, [currentOrganization, activities]);

  useEffect(() => {
    if (activities) {
      setActiveScreenPage(allActivities);
    } else {
      setActiveScreenPage(allVideos);
    }
  }, [allActivities, allVideos]);

  useEffect(() => {
    if (!screenStatus) {
      setVideoTitle("");
      setvideodesc("");
      setsubName("");
      seteduLevel("");
      setauthortagName("");
    }
  }, [screenStatus]);

  const primaryColor = getGlobalColor("--main-primary-color");

  const handleShow = () => {
    setShow(true); //! state.show
  };

  const handleClose = () => {
    setShow(false);
    dispatch(shareToCanvas(false));
    dispatch(msTeamShare(false));
    dispatch(googleShare(false));
  };

  const setActivityId = (activityId) => {
    setSelectedActivityId(activityId);
  };
  window.onscroll = function () {
    var scrollerHeight = document.body.scrollHeight - 1;
    if (
      allActivities &&
      activescreenType === allActivities &&
      ActivePage < allActivities?.meta?.last_page
    ) {
      if (
        window.innerHeight + Math.ceil(window.scrollY) >=
        scrollerHeight
      ) {
        if (ActivePage === 1) {
          setActivePage(ActivePage + 3);
        } else {
          setActivePage(ActivePage + 1);
        }
      }
    }
  };

  useEffect(() => {
    if (ActivePage !== 1) {
      dispatch(
        allIndActivity(
          currentOrganization?.id,
          ActivePage,
          10,
          searchQuery
        )
      );
    }
  }, [ActivePage]);

  useEffect(() => {
    if (activities && Object.keys(permission)?.length) {
      if (
        !permission?.["Independent Activity"]?.includes(
          "independent-activity:view-author"
        )
      ) {
        history.push(`/org/${currentOrganization.domain}`);
      }
    }
  }, [activities, permission]);

  const [steps, setSteps] = useState([
    // {
    //   target: '.searc_bar_move_activities',
    //   content: 'This another awesome featuess!',
    //   event: 'hover',
    //   placement: 'left-end',
    // },
    {
      content: (
        <div>
          <h6>Move To Project</h6>
          <p>
            Click on this checkbox and select activities which you
            want to add to My projects
          </p>
          <p>
            <strong>Note:</strong> To move activities, sharing should
            be disabled and library preference should be private.
          </p>
        </div>
      ),
      target: ".searc_bar_move_activities",
      event: "hover",
      placement: "left-end",
    },
  ]);

  const [run, setRun] = useState(true);

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
                text:
                  "All changes will be lost if you don’t save them",
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
                  sethideallothers(true);
                  dispatch({
                    type: "ADD_VIDEO_URL",
                    payload: "",
                  });
                }
              });
            }}
          />
          <div className="inner-form-content">
            {screenStatus === "AddVideo" && (
              <AddVideo
                setScreenStatus={setScreenStatus}
                hideallothers={hideallothers}
                setisbackHide={setisbackHide}
              />
            )}
            {screenStatus === "DescribeVideo" && (
              <DescribeVideo
                activityPreview={activities}
                setOpenVideo={setOpenVideo}
                setScreenStatus={setScreenStatus}
                setUploadImageStatus={setUploadImageStatus}
                setVideoTitle={setVideoTitle}
                videoTitle={videoTitle}
                setvideodesc={setvideodesc}
                videodesc={videodesc}
                setsubName={setsubName}
                subName={subName}
                authortagName={authortagName}
                setauthortagName={setauthortagName}
                eduLevel={eduLevel}
                seteduLevel={seteduLevel}
                isbackHide={isbackHide}
              />
            )}
          </div>
        </div>
      )}
      <div className="myvideomain">
        <div className="content-wrapper">
          <div
            style={{ paddingBottom: " 66px" }}
            className="inner-content m-auto"
          >
            {permission?.[
              activities ? "Independent Activity" : "Video"
            ]?.includes(
              activities
                ? "independent-activity:view-author"
                : "video:view"
            ) ? (
              <>
                <div className="topHeading-video-detail">
                  <div className="topHeading">
                    <div>
                      <TopHeading
                        description={currentOrganization.name}
                        image={VideoImage}
                        svgImage={
                          activities ? (
                            <>
                              <MyActivityLgSvg
                                primaryColor={primaryColor}
                              />
                            </>
                          ) : (
                            <MyInteractiveVideoLgSvg
                              primaryColor={primaryColor}
                            />
                          )
                        }
                        heading={
                          activities
                            ? "My Activities"
                            : "My interactive videos"
                        }
                        color="#084892"
                        className={
                          currentOrganization &&
                          "video-top-heading-custom"
                        }
                      />
                    </div>
                    <div className="search-bar-btn">
                      {/* Search Start */}
                      {activities && (
                        <div className="project-headline">
                          <div className="search-main-relaced">
                            <div className="search-div">
                              {/* <SearchForm activities /> */}
                            </div>
                          </div>
                        </div>
                      )}
                      {/* Search End */}
                      {/* <div>
                        {activities ? (
                          permission?.["Independent Activity"]?.includes(
                            "independent-activity:edit-author"
                          ) && (
                            <Buttons
                              primary={true}
                              text={"Create an activity"}
                              icon={faPlus}
                              iconColor={secondaryColor}
                              width="183px"
                              height="35px"
                              onClick={() => {
                                dispatch({ type: actionTypes.CLEAR_STATE });
                                dispatch({
                                  type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
                                  payload: "layout",
                                  playlist: {},
                                  project: {},
                                });
                                dispatch(clearSearch());
                                dispatch({
                                  type: "SET_ACTIVE_VIDEO_SCREEN",
                                  payload: "",
                                });
                              }}
                              hover={true}
                            />
                          )
                        ) : (
                          <Buttons
                            primary={true}
                            text={"Create a video"}
                            icon={faPlus}
                            iconColor={secondaryColor}
                            width="183px"
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
                        )}
                      </div> */}
                    </div>
                  </div>
                  <div className="top-video-detail">
                    <div className="video-detail">
                      {/* <HeadingText text={activities ? '' : 'Create and organize your activities into projects to create complete courses.'} color="#515151" /> */}
                    </div>
                  </div>
                </div>
                {!activities ? (
                  <div className="video-cards-top-search-filter">
                    <div className="search-bar">
                      <input
                        className=""
                        type="text"
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setActivePage(1);
                          if (currentOrganization) {
                            if (!e.target.value.trim()) {
                              setActiveScreenPage(null);
                              dispatch(
                                getAllVideos(currentOrganization.id)
                              );
                            }
                          }
                        }}
                        placeholder="Search My Videos..."
                      />
                      <SearchInputMdSvg
                        primaryColor={primaryColor}
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          if (currentOrganization) {
                            setActiveScreenPage(null);
                            dispatch(
                              getSearchVideoCard(
                                currentOrganization.id,
                                searchQuery
                              )
                            );
                          }
                        }}
                      />
                    </div>
                    <div className="activity-counter">
                      <div className="pagination-counter drop-counter ">
                        My Interactive per page
                        <span>
                          <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                              10
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item>10</Dropdown.Item>
                              <Dropdown.Item>25</Dropdown.Item>
                              <Dropdown.Item>50</Dropdown.Item>
                              <Dropdown.Item>100</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  (allActivities?.data?.length > 0 ||
                    allActivities?.links?.first?.includes(
                      "query"
                    )) && (
                    <>
                      <div className="video-cards-top-search-filter">
                        <div className="search-bar-clear-btn">
                          <div className="search-bar">
                            <input
                              className=""
                              type="text"
                              value={searchQuery}
                              onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setActivePage(1);
                                if (!e.target.value) {
                                  setActiveScreenPage(null);
                                  dispatch(
                                    allIndActivity(
                                      currentOrganization?.id,
                                      1,
                                      defaultSize,
                                      ""
                                    )
                                  );
                                }
                              }}
                              placeholder="Search My Activities..."
                            />
                            <SearchInputMdSvg
                              primaryColor={primaryColor}
                              onClick={() => {
                                if (currentOrganization) {
                                  setActiveScreenPage(null);
                                  dispatch(
                                    allIndActivity(
                                      currentOrganization?.id,
                                      ActivePage,
                                      defaultSize,
                                      searchQuery
                                    )
                                  );
                                }
                              }}
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                          <div>
                            <Buttons
                              text="Clear"
                              className="clr-btn"
                              onClick={() => {
                                setSearchQuery("");
                                setActiveScreenPage(null);
                                dispatch(
                                  allIndActivity(
                                    currentOrganization?.id,
                                    1,
                                    defaultSize,
                                    ""
                                  )
                                );
                              }}
                            />
                          </div>
                        </div>

                        <div className="searc_bar_move_activities">
                          <div className="move_activities">
                            {/* <ReactJoyride
                              callback={(data) => {
                                const { status, type } = data;

                                const finishedStatuses = [
                                  STATUS.FINISHED,
                                  STATUS.SKIPPED,
                                ];

                                if (
                                  finishedStatuses.includes(status)
                                ) {
                                  setRun(false);
                                }
                                if (STATUS.PAUSED === status) {
                                  setRun(true);
                                }
                              }}
                              steps={steps}
                              disableCloseOnEsc={true}
                              continuous
                              disableScrolling={true}
                              // hideBackButton={true}
                              showSkipButton={true}
                              run={run}
                              // scrollToFirstStep
                              // showProgress
                              styles={{
                                options: {
                                  // width: '300px',
                                  primaryColor: primaryColor,
                                  zIndex: 1000,
                                },
                              }}
                              locale={{
                                last: "OK",
                              }}
                            /> */}
                            <OverlayTriggerPop
                              showMessage={"left"}
                              icon={faExclamationCircle}
                              className="mr-3"
                            >
                              Click on this checkbox and select
                              activities which you want to add to My
                              projects Note: To move activities,
                              sharing should be disabled and library
                              preference should be private.
                            </OverlayTriggerPop>
                            <label className="cutom_checkbox">
                              <input
                                type="checkbox"
                                onChange={() => {
                                  setRun(!run);
                                  setAddToProjectCheckbox(
                                    !addToProjectCheckbox
                                  );
                                }}
                              />

                              <span />
                            </label>

                            <p
                              className="move_text"
                              id="move_text_id_branding"
                            >
                              Move To Project
                            </p>
                          </div>
                          {addToProjectCheckbox && (
                            <div className="next_btn_activity">
                              <Buttons
                                disabled={
                                  !selectedProjectstoAdd.length
                                }
                                defaultgrey={
                                  !selectedProjectstoAdd.length
                                }
                                primary
                                text="Continue"
                                iconColor={primaryColor}
                                width="111px"
                                height="32px"
                                hover
                                onClick={() =>
                                  setModalShowClone(true)
                                }
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )
                )}
                <div className="my-interactive-videos">
                  {!!activescreenType ? (
                    !activescreenType?.data?.length ? (
                      <>
                        {activities ? (
                          <>
                            {allActivities?.links?.first?.includes(
                              "query"
                            ) ? (
                              <Alert variant="danger">
                                No results found.
                              </Alert>
                            ) : (
                              <StartingPage
                                welcome="Let's Build a CurrikiStudio Activity!"
                                createBtnTitle="Create New Activity"
                                createTitle="Create your first learning activity."
                                createDetail='We have a library of over 40 "interactive-by-design" learning activities to create immersive learning experiences.'
                                helpBtnTitle="Help Center"
                                helpTitle="How to start?"
                                type="activity"
                                primaryColor={primaryColor}
                                onClick={() => {
                                  dispatch({
                                    type: actionTypes.CLEAR_STATE,
                                  });

                                  dispatch({
                                    type:
                                      actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
                                    payload: "layout",
                                    playlist: {},
                                    project: {},
                                    screenSelectionType:
                                      "MY_ACTIVITY_SCREEN",
                                  });

                                  dispatch(clearSearch());

                                  dispatch({
                                    type: "SET_ACTIVE_VIDEO_SCREEN",
                                    payload: "",
                                  });
                                }}
                              />
                            )}
                          </>
                        ) : (
                          <>
                            {allVideos?.links?.first?.includes(
                              "query"
                            ) ? (
                              <Alert variant="danger">
                                No results found.
                              </Alert>
                            ) : (
                              <StartingPage
                                welcome=""
                                createBtnTitle="Create New Video"
                                createTitle="Start creating awesome interactive videos."
                                createDetail="Make your video engaging for your viewers and gather information Interactive video has over xx interactions that can be added to video, It allows you move forward or back and provide grading if desired."
                                helpBtnTitle="Help center"
                                helpTitle="How to start?"
                                primaryColor={primaryColor}
                                onClick={() => {
                                  setOpenVideo(!openMyVideo);
                                  setScreenStatus("AddVideo");
                                  dispatch({
                                    type: "SET_ACTIVE_VIDEO_SCREEN",
                                    payload: "",
                                  });
                                }}
                              />
                            )}
                          </>
                        )}
                      </>
                    ) : (
                      <div className="video-cards-contianer">
                        <div className="video-cards-detail">
                          <div className="row">
                            {/* Adding New Design Add  */}

                            {activities ? (
                              permission?.[
                                "Independent Activity"
                              ]?.includes(
                                "independent-activity:edit-author"
                              ) && (
                                <div
                                  className="Add-video-interaction-section"
                                  onClick={() => {
                                    dispatch({
                                      type: actionTypes.CLEAR_STATE,
                                    });

                                    dispatch({
                                      type:
                                        actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
                                      payload: "layout",
                                      playlist: {},
                                      project: {},
                                      screenSelectionType:
                                        "MY_ACTIVITY_SCREEN",
                                    });

                                    dispatch(clearSearch());

                                    dispatch({
                                      type: "SET_ACTIVE_VIDEO_SCREEN",
                                      payload: "",
                                    });
                                  }}
                                >
                                  <PlusXlSvg
                                    primaryColor={primaryColor}
                                  />
                                  <span>Create New Activity</span>
                                </div>
                              )
                            ) : (
                              <div
                                className="Add-video-interaction-section"
                                onClick={() => {
                                  setOpenVideo(!openMyVideo);
                                  setScreenStatus("AddVideo");
                                  setisbackHide(true);
                                  dispatch({
                                    type: "SET_ACTIVE_VIDEO_SCREEN",
                                    payload: "",
                                  });
                                }}
                              >
                                <PlusXlSvg
                                  primaryColor={primaryColor}
                                />
                                <span>Create a video</span>
                              </div>
                            )}

                            {activities
                              ? allActivities?.data.map(
                                  (activityData) => (
                                    <AddVideoCard
                                      setModalShow={setModalShow}
                                      setCurrentActivity={
                                        setCurrentActivity
                                      }
                                      setScreenStatus={
                                        setScreenStatus
                                      }
                                      setOpenVideo={setOpenVideo}
                                      title={activityData.title}
                                      data={activityData}
                                      className="card-spacing"
                                      activities={activities}
                                      isActivityCard
                                      permission={permission}
                                      handleShow={handleShow}
                                      setSelectedActivityId={
                                        setActivityId
                                      }
                                      addToProjectCheckbox={
                                        addToProjectCheckbox
                                      }
                                      selectedProjectstoAdd={
                                        selectedProjectstoAdd
                                      }
                                      setSelectedProjectstoAdd={
                                        setSelectedProjectstoAdd
                                      }
                                      sethideallothers={
                                        sethideallothers
                                      }
                                      setisbackHide={setisbackHide}
                                    />
                                  )
                                )
                              : allVideos?.data?.map((video) => (
                                  <>
                                    <AddVideoCard
                                      setModalShow={setModalShow}
                                      setCurrentActivity={
                                        setCurrentActivity
                                      }
                                      setScreenStatus={
                                        setScreenStatus
                                      }
                                      setOpenVideo={setOpenVideo}
                                      title={video.title}
                                      data={video}
                                      className="card-spacing"
                                      sethideallothers={
                                        sethideallothers
                                      }
                                      setisbackHide={setisbackHide}
                                    />
                                  </>
                                ))}
                          </div>
                          {allVideos?.data && !activities && (
                            <div style={{}} className="admin-panel ">
                              <Pagination
                                activePage={ActivePage}
                                pageRangeDisplayed={5}
                                itemsCountPerPage={
                                  allVideos?.meta?.per_page
                                }
                                totalItemsCount={
                                  allVideos?.meta?.total
                                }
                                onChange={(e) => {
                                  setActivePage(e);
                                  dispatch(
                                    getAllVideos(
                                      currentOrganization.id,
                                      e
                                    )
                                  );
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  ) : (
                    <div
                      className="d-flex "
                      style={{ marginTop: "40px" }}
                    >
                      <br />
                      <ProjectCardSkeleton />
                      <ProjectCardSkeleton />
                      <ProjectCardSkeleton />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Alert variant="danger">
                You are not authorized to view this page.
              </Alert>
            )}

            {allActivities?.data?.length > 0 &&
              ActivePage !== 1 &&
              islazyLoader &&
              activities && (
                <div className="col-md-12 text-center mt-4">
                  <ImgLoader />
                </div>
              )}
          </div>
        </div>
      </div>
      <MyActivity playlistPreview activityPreview />
      <MyVerticallyCenteredModals
        show={modalShow}
        onHide={() => setModalShow(false)}
        activity={currentActivity}
        showvideoH5p
        activeType="demo"
        activities={activities}
      />
      <MyVerticallyCenteredModal
        ind
        selectedProjectstoAdd={selectedProjectstoAdd}
        show={modalShowClone}
        onHide={() => setModalShowClone(false)}
        className="clone-lti"
        clone=""
      />
      <GoogleModel
        playlistId={999999} // pass just for showing activity selectbox on google share popup
        activityId={selectedActivityId}
        show={show} // {props.show}
        onHide={handleClose}
      />
    </>
  );
};

export default Index;
