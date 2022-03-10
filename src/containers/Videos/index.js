/*eslint-disable*/
import React, { useState } from 'react';
import Buttons from 'utils/Buttons/buttons';
import TopHeading from 'utils/TopHeading/topheading';
import { faFilter, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import searchimg from 'assets/images/svg/search-icon-admin-panel.svg';
import Pagination from 'react-js-pagination';
import Swal from 'sweetalert2';
import './style.scss';
import '../Admin/style.scss';

import HeadingText from 'utils/HeadingText/headingtext';
import VideoImage from 'assets/images/svg/Interactivevideos.svg';
import Footer from 'components/Footer';
import { Tabs, Tab, Alert } from 'react-bootstrap';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import HeadingThree from 'utils/HeadingThree/headingthree';
import AddVideo from './formik/addvideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DescribeVideo from './formik/describevideo';
import { useEffect } from 'react';
import { getAllVideos, getSearchVideoCard } from 'store/actions/videos';
import AddVideoCard from 'utils/AddVideoCard/addvideocard';
import MyVerticallyCenteredModal from 'components/models/videoH5pmodal';

const Index = () => {
  const [openMyVideo, setOpenVideo] = useState(false);
  const [uploadImageStatus, setUploadImageStatus] = useState(false);
  const [screenStatus, setScreenStatus] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const videos = useSelector((state) => state.videos);
  const { activeOrganization, permission } = useSelector((state) => state.organization);
  const { allVideos } = videos;
  const [searchQuery, setSearchQuery] = useState('');
  const [ActivePage, setActivePage] = useState(1);
  const [currentActivity, setCurrentActivity] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (activeOrganization) {
      dispatch(getAllVideos(activeOrganization.id));
    }
  }, [activeOrganization]);
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
            {screenStatus == 'AddVideo' && <AddVideo setScreenStatus={setScreenStatus} hideallothers />}
            {screenStatus == 'DescribeVideo' && <DescribeVideo setOpenVideo={setOpenVideo} setScreenStatus={setScreenStatus} setUploadImageStatus={setUploadImageStatus} />}
          </div>
        </div>
      )}
      <div className="myvideomain">
        <div className="content-wrapper">
          <div style={{ paddingBottom: ' 66px' }} className="inner-content">
            {permission?.Video?.includes('video:view') ? (
              <>
                <div className="topHeading-video-detail">
                  <div className="topHeading">
                    <TopHeading description={activeOrganization.name} image={VideoImage} heading="My interactive videos" color="#084892" />
                    <Buttons
                      primary={true}
                      text="Create a video"
                      icon={faPlus}
                      width="163px"
                      height="35px"
                      onClick={() => {
                        setOpenVideo(!openMyVideo);
                        setScreenStatus('AddVideo');
                        dispatch({
                          type: 'SET_ACTIVE_VIDEO_SCREEN',
                          payload: '',
                        });
                      }}
                      hover={true}
                    />
                  </div>
                  <div className="top-video-detail">
                    <div className="video-detail">
                      <HeadingText text="Create and organize your activities into projects to create complete courses." color="#515151" />
                    </div>
                  </div>
                </div>
                <div className="my-interactive-videos">
                  <Tabs className="main-tabs top-tabs" defaultActiveKey="default" id="uncontrolled-tab-example">
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
                                  dispatch(getSearchVideoCard(activeOrganization.id, e.target.value));
                                } else {
                                  dispatch(getAllVideos(activeOrganization.id));
                                }
                              }
                            }}
                            placeholder="Search"
                          />
                          <img
                            src={searchimg}
                            alt="search"
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              if (activeOrganization) {
                                dispatch(getSearchVideoCard(activeOrganization.id, searchQuery));
                              }
                            }}
                          />
                        </div>
                        {/* <div className="video-filter-bar">
                            <FontAwesomeIcon icon={faFilter} color="#084892" />
                            <span>Filter</span>
                          </div> */}
                      </div>
                      {!allVideos?.data?.length ? (
                        <>
                          <div className="video-default-contianer">
                            <HeadingTwo text="Start creating awesome interactive videos." className="video-heading-1" />
                            <HeadingText
                              text="Make your video engaging for your viewers and gather information
Interactive video has over xx interactions that can be added to video, It allows you move forward or back and provide grading if desired."
                              className="video-heading-2"
                            />
                            <HeadingThree text="Start by pressing “Create a video” and make your content live!" className="video-heading-3" />
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
                                    dispatch(getAllVideos(activeOrganization.id, e));
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
              <Alert variant="danger">You are not authorized to view this page.</Alert>
            )}
          </div>
        </div>
      </div>
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} activity={currentActivity} showvideoH5p={true} activeType={'demo'} />
    </>
  );
};

export default Index;
