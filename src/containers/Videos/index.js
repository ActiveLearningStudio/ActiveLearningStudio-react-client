/* eslint-disable */
/* eslint-disable max-len */
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

import StartingPage from 'utils/StartingPage/startingpage';
import { MyVerticallyCenteredModal } from 'containers/Search';
import DescribeVideo from './formik/describevideo';
import AddVideo from './formik/addvideo';

// eslint-disable-next-line react/prop-types
const Index = ({ activities }) => {
  const [openMyVideo, setOpenVideo] = useState(false);
  const [selectedProjectstoAdd, setSelectedProjectstoAdd] = useState([]);
  const [uploadImageStatus, setUploadImageStatus] = useState(false);
  const [screenStatus, setScreenStatus] = useState('');
  const [modalShow, setModalShow] = useState(false);
  const [modalShowClone, setModalShowClone] = useState(false);
  const [addToProjectCheckbox, setAddToProjectCheckbox] = useState(false);

  const videos = useSelector((state) => state.videos);
  const { activeOrganization, permission } = useSelector((state) => state.organization);
  const { allActivities, isLoading } = useSelector((state) => state.activities);
  const [activescreenType, setActiveScreenPage] = useState('');
  const { allVideos } = videos;
  const [searchQuery, setSearchQuery] = useState('');
  const [ActivePage, setActivePage] = useState(1);
  const [currentActivity, setCurrentActivity] = useState(null);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedActivityId, setSelectedActivityId] = useState(0);

  useEffect(() => {
    if (activeOrganization && !activities) {
      dispatch(getAllVideos(activeOrganization.id));
    }
    if (activeOrganization && activities) {
      dispatch(allIndActivity(activeOrganization.id));
    }
    if (activities) {
      setActiveScreenPage('allActivities');
    } else {
      setActiveScreenPage('allVideos');
    }
  }, [activeOrganization, activities]);

  useEffect(() => {
    if (activities) {
      setActiveScreenPage(allActivities);
    } else {
      setActiveScreenPage(allVideos);
    }
  }, [allActivities, allVideos]);

  console.log('allActivities-allActivities', allActivities);

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
                }
              });
            }}
          />
          <div className="inner-form-content">
            {screenStatus === 'AddVideo' && <AddVideo setScreenStatus={setScreenStatus} hideallothers />}
            {screenStatus === 'DescribeVideo' && (
              <DescribeVideo activityPreview={activities} setOpenVideo={setOpenVideo} setScreenStatus={setScreenStatus} setUploadImageStatus={setUploadImageStatus} />
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
                              <svg width="36" height="32" viewBox="0 0 36 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M2 6.9375V28.6875C2 29.6885 2.81149 30.5 3.8125 30.5H32.8125C33.8136 30.5 34.625 29.6885 34.625 28.6875V9.44715C34.625 8.44614 33.8136 7.63465 32.8125 7.63465H19.9856"
                                  stroke={primaryColor}
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M19.9856 7.63465L14.9529 1.76544C14.783 1.59548 14.5525 1.5 14.3121 1.5H2.90625C2.40575 1.5 2 1.90575 2 2.40625V6.9375"
                                  stroke={primaryColor}
                                  strokeWidth="2.5"
                                  strokeLinecap="round"
                                />
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
                        heading={activities ? 'Activities' : 'My interactive videos'}
                        color="#084892"
                        className={activeOrganization && 'video-top-heading-custom'}
                      />
                    </div>
                    <div className="search-bar-btn">
                      {/* Search Start */}
                      {activities && (
                        <div className="project-headline">
                          <div className="search-main-relaced">
                            <div className="search-div">
                              <SearchForm activities />
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
                      <HeadingText
                        text={
                          activities
                            ? 'Create new activities, manage them and organize them in playlists and projects.'
                            : 'Create and organize your activities into projects to create complete courses.'
                        }
                        color="#515151"
                      />
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
                          if (activeOrganization) {
                            if (e.target.value.trim()) {
                              dispatch(getSearchVideoCard(activeOrganization.id, e.target.value));
                            } else {
                              dispatch(getAllVideos(activeOrganization.id));
                            }
                          }
                        }}
                        placeholder="Search"
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
                    {/* <div className="filter-dropdown-project">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M13.8334 3H2.16669L6.83335 8.25556V11.8889L9.16669 13V8.25556L13.8334 3Z"
                          stroke={primaryColor}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      Filter
                    </div> */}
                    {/* <div className="video-filter-bar">
                            <FontAwesomeIcon icon={faFilter} color="#084892" />
                            <span>Filter</span>
                          </div> */}
                  </div>
                ) : (
                  <>
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
                                dispatch(getSearchVideoCard(activeOrganization.id, e.target.value));
                              } else {
                                dispatch(getAllVideos(activeOrganization.id));
                              }
                            }
                          }}
                          placeholder="Search"
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
                      {/* <div className="activity-counter">
                        <div className="pagination-counter drop-counter ">
                          Activities per page
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
                      </div> */}
                      {/* <div className="filter-dropdown-project">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M13.8334 3H2.16669L6.83335 8.25556V11.8889L9.16669 13V8.25556L13.8334 3Z"
                            stroke={primaryColor}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        Filter
                      </div> */}
                      {/* <div className="video-filter-bar">
                            <FontAwesomeIcon icon={faFilter} color="#084892" />
                            <span>Filter</span>
                          </div> */}
                      {/* <div className="move_activities">
                        <input type="checkbox" onChange={() => setAddToProjectCheckbox(!addToProjectCheckbox)} />
                        <p>move activities to project</p>
                        {addToProjectCheckbox && (
                          <button onClick={() => setModalShowClone(true)} type="button">
                            Next
                          </button>
                        )}
                      </div> */}
                    </div>
                  </>
                )}
                <div className="my-interactive-videos">
                  {!activescreenType?.data?.length ? (
                    <>
                      {activities ? (
                        <>
                          {' '}
                          <StartingPage
                            createBtnTitle="Create new activity"
                            createTitle="Start creating engaging activities."
                            createDetail="We have a library of over 40 “interactive-by-design” learning activities to create inmersive experiences.
                            Start by creating a new Activity or choose a guide from the right to learn more."
                            helpBtnTitle="Help center"
                            helpTitle="Learn how it works"
                            helpDetail="Create your learning content using interactive activities.
                            Organize your content by projects."
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
                        </>
                      ) : (
                        <>
                          <StartingPage
                            createBtnTitle="Create a video"
                            createTitle="Start creating engaging activities."
                            createDetail="We have a library of over 40 “interactive-by-design” learning activities to create inmersive experiences.
                            Start by creating a new Activity or choose a guide from the right to learn more."
                            helpBtnTitle="Help center"
                            helpTitle="Learn how it works"
                            helpDetail="Create your learning content using interactive activities.
                            Organize your content by projects."
                            onClick={() => {
                              setOpenVideo(!openMyVideo);
                              setScreenStatus('AddVideo');
                              dispatch({
                                type: 'SET_ACTIVE_VIDEO_SCREEN',
                                payload: '',
                              });
                            }}
                          />
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {isLoading ? (
                        <Alert mt="10px" variant="primary">
                          Loading data...
                        </Alert>
                      ) : (
                        <>
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
                                    <span>Create new activity</span>
                                  </div>
                                )
                              ) : (
                                <div
                                  className="Add-video-interaction-section"
                                  onClick={() => {
                                    setOpenVideo(!openMyVideo);
                                    setScreenStatus('AddVideo');
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
                            {allActivities?.data && activities && (
                              <div style={{}} className="admin-panel ">
                                <Pagination
                                  activePage={ActivePage}
                                  pageRangeDisplayed={5}
                                  itemsCountPerPage={allActivities?.meta?.per_page}
                                  totalItemsCount={allActivities?.meta?.total}
                                  onChange={(e) => {
                                    setActivePage(e);
                                    dispatch(allIndActivity(activeOrganization.id, e));
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </>
            ) : (
              <Alert variant="danger">You are not authorized to view this page.</Alert>
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
