/*eslint-disable*/
import React, { useState } from 'react';
import Buttons from 'utils/Buttons/buttons';
import TopHeading from 'utils/TopHeading/topheading';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';

import './style.scss';
import HeadingText from 'utils/HeadingText/headingtext';
import VideoImage from 'assets/images/svg/Interactivevideos.svg';
import Footer from 'components/Footer';
import { Tabs, Tab } from 'react-bootstrap';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import HeadingThree from 'utils/HeadingThree/headingthree';
import AddVideo from './formik/addvideo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DescribeVideo from './formik/describevideo';
import { useEffect } from 'react';
import { getAllVideos } from 'store/actions/videos';

const Index = () => {
  const [openMyVideo, setOpenVideo] = useState(false);
  const [uploadImageStatus, setUploadImageStatus] = useState(false);
  const [screenStatus, setScreenStatus] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllVideos());
  }, []);
  return (
    <>
      {openMyVideo && (
        <div className={uploadImageStatus ? 'form-new-popup-myvideo z-index' : 'form-new-popup-myvideo'}>
          <FontAwesomeIcon
            icon="times"
            className="cross-all-pop"
            onClick={() => {
              setOpenVideo(!openMyVideo);
              setScreenStatus('');
            }}
          />
          <div className="inner-form-content">
            {screenStatus == 'AddVideo' && <AddVideo setScreenStatus={setScreenStatus} />}
            {screenStatus == 'DescribeVideo' && <DescribeVideo setOpenVideo={setOpenVideo} setScreenStatus={setScreenStatus} setUploadImageStatus={setUploadImageStatus} />}
          </div>
        </div>
      )}
      <div className="myvideomain">
        <div className="content-wrapper">
          <div className="inner-content">
            <div className="topHeading-video-detail">
              <div className="topHeading">
                <TopHeading description="Curriki Studio" image={VideoImage} heading="My interactive videos" color="#084892" />
                <Buttons
                  primary={true}
                  text="Create a video"
                  icon={faPlus}
                  width="163px"
                  height="35px"
                  onClick={() => {
                    setOpenVideo(!openMyVideo);
                    setScreenStatus('AddVideo');
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
            <div>
              <Tabs className="main-tabs" defaultActiveKey="default" id="uncontrolled-tab-example">
                <Tab eventKey="default" title="My videos">
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
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Index;
