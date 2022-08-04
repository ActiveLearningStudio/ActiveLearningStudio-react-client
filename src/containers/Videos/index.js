/* eslint-disable react/jsx-indent */
/* eslint-disable max-len */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import TopHeading from 'utils/TopHeading/topheading';

import { useDispatch, useSelector } from 'react-redux';
import { clearSearch } from 'store/actions/search';
import Pagination from 'react-js-pagination';
import Swal from 'sweetalert2';
import './style.scss';
import '../Admin/style.scss';
import HeadingText from 'utils/HeadingText/headingtext';

import MyActivity from 'containers/MyActivity';
import VideoImage from 'assets/images/svg/Interactivevideos.svg';
import * as actionTypes from 'store/actionTypes';
import { Alert, Dropdown } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getAllVideos, getSearchVideoCard } from 'store/actions/videos';
import { allIndActivity } from 'store/actions/indActivities';
import AddVideoCard from 'utils/AddVideoCard/addvideocard';
import MyVerticallyCenteredModals from 'components/models/videoH5pmodal';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import GoogleModel from 'components/models/GoogleLoginModal';
import SearchForm from 'components/Header/searchForm';
import ProjectCardSkeleton from 'components/Skeletons/projectCard';

import StartingPage from 'utils/StartingPage/startingpage';
import { MyVerticallyCenteredModal } from 'containers/Search';
import Buttons from 'utils/Buttons/buttons';
import DescribeVideo from './formik/describevideo';
import AddVideo from './formik/addvideo';
import loader from 'assets/images/loader.svg';
const ImgLoader = () => <img src={loader} alt="loader" />;
// eslint-disable-next-line react/prop-types
const Index = ({ activities }) => {
  const [videoTitle, setVideoTitle] = useState('');
  const [videodesc, setvideodesc] = useState('');
  const [subName, setsubName] = useState('');
  const [authortagName, setauthortagName] = useState('');
  const [eduLevel, seteduLevel] = useState('');
  const [openMyVideo, setOpenVideo] = useState(false);
  const [selectedProjectstoAdd, setSelectedProjectstoAdd] = useState([]);
  const [uploadImageStatus, setUploadImageStatus] = useState(false);
  const [screenStatus, setScreenStatus] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [modalShowClone, setModalShowClone] = useState(false);
  const [addToProjectCheckbox, setAddToProjectCheckbox] = useState(false);

  const videos = useSelector((state) => state.videos);
  const { activeOrganization, permission } = useSelector((state) => state.organization);
  const { allActivities, isLoading, islazyLoader } = useSelector((state) => state.activities);
  const [activescreenType, setActiveScreenPage] = useState(null);
  const { allVideos } = videos;
  const [searchQuery, setSearchQuery] = useState('');
  const [ActivePage, setActivePage] = useState(1);
  const [currentActivity, setCurrentActivity] = useState(null);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(0);
  const [defaultSize, setdefaultSize] = useState(30);
  const [hideallothers, sethideallothers] = useState(true);
  const [isbackHide, setisbackHide] = useState(true);
  useEffect(() => {
    window.scrollTo(0, 0);
    if (activeOrganization && !activities) {
      dispatch(getAllVideos(activeOrganization.id));
    }
    if (activeOrganization && activities) {
      dispatch(allIndActivity(activeOrganization.id, ActivePage, defaultSize));
    }
  }, [activeOrganization, activities]);

  useEffect(() => {
    if (activities) {
      setActiveScreenPage(allActivities);
    } else {
      setActiveScreenPage(allVideos);
    }
  }, [allActivities, allVideos]);

  useEffect(() => {
    if (!screenStatus) {
      setVideoTitle('');
      setvideodesc('');
      setsubName('');
      seteduLevel('');
      setauthortagName('');
    }
  }, [screenStatus]);

  const primaryColor = getGlobalColor('--main-primary-color');

  const handleShow = () => {
    setShow(true); //! state.show
  };

  const handleClose = () => {
    setShow(false);
  };

  const setActivityId = (activityId) => {
    setSelectedActivityId(activityId);
  };
  window.onscroll = function () {
    var scrollerHeight = document.body.scrollHeight - 1;
    if (allActivities && activescreenType === allActivities && ActivePage < allActivities?.meta?.last_page) {
      if (window.innerHeight + Math.ceil(window.scrollY) >= scrollerHeight) {
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
      dispatch(allIndActivity(activeOrganization?.id, ActivePage, 10, searchQuery));
    }
  }, [ActivePage]);

  return (
    <>
      {openMyVideo && (
        <div className={uploadImageStatus ? 'form-new-popup-myvideo z-index' : 'form-new-popup-myvideo'}>
          <FontAwesomeIcon
            icon="times"
            className="cross-all-pop"
            onClick={() => {
              Swal.fire({
                text: 'All changes will be lost if you don’t save them',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#084892',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Close it!',
                allowOutsideClick: false,
              }).then(async (result) => {
                if (result.isConfirmed) {
                  setOpenVideo(!openMyVideo);
                  setScreenStatus('');
                  sethideallothers(true);
                  dispatch({
                    type: 'ADD_VIDEO_URL',
                    payload: '',
                  });
                }
              });
            }}
          />
          <div className="inner-form-content">
            {screenStatus === 'AddVideo' && <AddVideo setScreenStatus={setScreenStatus} hideallothers={hideallothers} setisbackHide={setisbackHide} />}
            {screenStatus === 'DescribeVideo' && (
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
          <div style={{ paddingBottom: ' 66px' }} className="inner-content">
            {permission?.[activities ? 'Independent Activity' : 'Video']?.includes(activities ? 'independent-activity:view-author' : 'video:view') ? (
              <>
                <div className="topHeading-video-detail">
                  <div className="topHeading">
                    <div>
                      <TopHeading
                        description={activeOrganization.name}
                        image={VideoImage}
                        svgImage={
                          activities ? (
                            <>
                              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M27.2 2H4.8C3.2536 2 2 3.2536 2 4.8V10.4C2 11.9464 3.2536 13.2 4.8 13.2H27.2C28.7464 13.2 30 11.9464 30 10.4V4.8C30 3.2536 28.7464 2 27.2 2Z"
                                  stroke={primaryColor}
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M27.2 18.8H4.8C3.2536 18.8 2 20.0536 2 21.6V27.2C2 28.7464 3.2536 30 4.8 30H27.2C28.7464 30 30 28.7464 30 27.2V21.6C30 20.0536 28.7464 18.8 27.2 18.8Z"
                                  stroke={primaryColor}
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path d="M7.6001 7.59967H7.6148" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M7.6001 24.3997H7.6148" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            </>
                          ) : (
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="1" y="1.5" width="20" height="12" rx="2" stroke={primaryColor} strokeWidth="2" />
                              <path d="M1 18.5H21" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
                              <circle cx="15" cy="18.5" r="2" fill="white" stroke={primaryColor} strokeWidth="2" />
                              <path
                                d="M9 9.66667V5.43426C9 5.03491 9.44507 4.79672 9.77735 5.01823L13.3044 7.36957C13.619 7.5793 13.5959 8.04885 13.2623 8.22677L9.73529 10.1078C9.40224 10.2855 9 10.0441 9 9.66667Z"
                                stroke={primaryColor}
                                strokeWidth="2"
                                strokeLinecap="round"
                              />
                            </svg>
                          )
                        }
                        heading={activities ? 'My Activities' : 'My interactive videos'}
                        color="#084892"
                        className={activeOrganization && 'video-top-heading-custom'}
                      />
                    </div>
                    <div className="search-bar-btn">
                      {/* Search Start */}
                      {activities && (
                        <div className="project-headline">
                          <div className="search-main-relaced">
                            <div className="search-div">{/* <SearchForm activities /> */}</div>
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
                          if (activeOrganization) {
                            if (!e.target.value.trim()) {
                              setActiveScreenPage(null);
                              dispatch(getAllVideos(activeOrganization.id));
                            }
                          }
                        }}
                        placeholder="Search My Videos..."
                      />

                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          if (activeOrganization) {
                            setActiveScreenPage(null);
                            dispatch(getSearchVideoCard(activeOrganization.id, searchQuery));
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
                        <path d="M21 20.9984L16.65 16.6484" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div className="activity-counter">
                      <div className="pagination-counter drop-counter ">
                        My Interactive per page
                        <span>
                          <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">10</Dropdown.Toggle>

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
                  (allActivities?.data?.length > 0 || allActivities?.links?.first?.includes('query')) && (
                    <>
                      <div className="video-cards-top-search-filter">
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
                                dispatch(allIndActivity(activeOrganization?.id, 1, defaultSize, ''));
                              }
                            }}
                            placeholder="Search My Activities..."
                          />

                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              if (activeOrganization) {
                                setActiveScreenPage(null);
                                dispatch(allIndActivity(activeOrganization?.id, ActivePage, defaultSize, searchQuery));
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
                            <path d="M21 20.9984L16.65 16.6484" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>

                        <div className="searc_bar_move_activities">
                          <div className="move_activities">
                            <label className="cutom_checkbox">
                              <input type="checkbox" onChange={() => setAddToProjectCheckbox(!addToProjectCheckbox)} />

                              <span />
                            </label>

                            <p className="move_text" id="move_text_id_branding">
                              Move to Project
                            </p>
                          </div>
                          {addToProjectCheckbox && (
                            <div className="next_btn_activity">
                              <Buttons
                                disabled={!selectedProjectstoAdd.length}
                                defaultgrey={!selectedProjectstoAdd.length}
                                primary
                                text="Continue"
                                iconColor={primaryColor}
                                width="111px"
                                height="32px"
                                hover
                                onClick={() => setModalShowClone(true)}
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
                            {allActivities?.links?.first?.includes('query') ? (
                              <Alert variant="danger">No results found.</Alert>
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
                                    type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
                                    payload: 'layout',
                                    playlist: {},
                                    project: {},
                                  });

                                  dispatch(clearSearch());

                                  dispatch({
                                    type: 'SET_ACTIVE_VIDEO_SCREEN',
                                    payload: '',
                                  });
                                }}
                              />
                            )}
                          </>
                        ) : (
                          <>
                            {allVideos?.links?.first?.includes('query') ? (
                              <Alert variant="danger">No results found.</Alert>
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
                                  setScreenStatus('AddVideo');
                                  dispatch({
                                    type: 'SET_ACTIVE_VIDEO_SCREEN',
                                    payload: '',
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
                          {/* Adding New Design Add  */}

                          {activities ? (
                            permission?.['Independent Activity']?.includes('independent-activity:edit-author') && (
                              <div
                                className="Add-video-interaction-section"
                                onClick={() => {
                                  dispatch({
                                    type: actionTypes.CLEAR_STATE,
                                  });

                                  dispatch({
                                    type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
                                    payload: 'layout',
                                    playlist: {},
                                    project: {},
                                  });

                                  dispatch(clearSearch());

                                  dispatch({
                                    type: 'SET_ACTIVE_VIDEO_SCREEN',
                                    payload: '',
                                  });
                                }}
                              >
                                <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <path d="M2 26C2.03441 26 34.0143 26.0003 50 26.0005" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                  <path d="M26 50C26 49.9656 26 17.9857 26 2" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                                <span>Create New Activity</span>
                              </div>
                            )
                          ) : (
                            <div
                              className="Add-video-interaction-section"
                              onClick={() => {
                                setOpenVideo(!openMyVideo);
                                setScreenStatus('AddVideo');
                                setisbackHide(true);
                                dispatch({
                                  type: 'SET_ACTIVE_VIDEO_SCREEN',
                                  payload: '',
                                });
                              }}
                            >
                              <svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2 26C2.03441 26 34.0143 26.0003 50 26.0005" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M26 50C26 49.9656 26 17.9857 26 2" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              <span>Create a video</span>
                            </div>
                          )}

                          {activities
                            ? allActivities?.data.map((activityData) => (
                                <AddVideoCard
                                  setModalShow={setModalShow}
                                  setCurrentActivity={setCurrentActivity}
                                  setScreenStatus={setScreenStatus}
                                  setOpenVideo={setOpenVideo}
                                  title={activityData.title}
                                  data={activityData}
                                  className="card-spacing"
                                  activities={activities}
                                  isActivityCard
                                  permission={permission}
                                  handleShow={handleShow}
                                  setSelectedActivityId={setActivityId}
                                  addToProjectCheckbox={addToProjectCheckbox}
                                  selectedProjectstoAdd={selectedProjectstoAdd}
                                  setSelectedProjectstoAdd={setSelectedProjectstoAdd}
                                  sethideallothers={sethideallothers}
                                  setisbackHide={setisbackHide}
                                />
                              ))
                            : allVideos?.data?.map((video) => (
                                <>
                                  <AddVideoCard
                                    setModalShow={setModalShow}
                                    setCurrentActivity={setCurrentActivity}
                                    setScreenStatus={setScreenStatus}
                                    setOpenVideo={setOpenVideo}
                                    title={video.title}
                                    data={video}
                                    className="card-spacing"
                                    sethideallothers={sethideallothers}
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
                              itemsCountPerPage={allVideos?.meta?.per_page}
                              totalItemsCount={allVideos?.meta?.total}
                              onChange={(e) => {
                                setActivePage(e);
                                dispatch(getAllVideos(activeOrganization.id, e));
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )
                  ) : (
                    <div className="d-flex " style={{ marginTop: '40px' }}>
                      <br />
                      <ProjectCardSkeleton />
                      <ProjectCardSkeleton />
                      <ProjectCardSkeleton />
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Alert variant="danger">You are not authorized to view this page.</Alert>
            )}

            {allActivities?.data?.length > 0 && ActivePage !== 1 && islazyLoader && activities && (
              <div className="col-md-12 text-center mt-4">
                <ImgLoader />
              </div>
            )}
          </div>
        </div>
      </div>
      <MyActivity playlistPreview activityPreview />
      <MyVerticallyCenteredModals show={modalShow} onHide={() => setModalShow(false)} activity={currentActivity} showvideoH5p activeType="demo" activities={activities} />
      <MyVerticallyCenteredModal ind selectedProjectstoAdd={selectedProjectstoAdd} show={modalShowClone} onHide={() => setModalShowClone(false)} className="clone-lti" clone="" />
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
