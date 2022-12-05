/* eslint-disable */
import React, { useState, useMemo } from 'react';
import HeadingText from 'utils/HeadingText/headingtext';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import LayoutCard from 'utils/LayoutCard/layoutcard';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ColoumImage1 from 'assets/images/layout/singleactivit.png';
import Tabs from 'utils/Tabs/tabs';
import Buttons from 'utils/Buttons/buttons';
import HeadingThree from 'utils/HeadingThree/headingthree';
import PlayIcon from 'assets/images/play.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { getLayoutActivities } from 'store/actions/resource';
import * as actionTypes from 'store/actionTypes';
import loader from 'assets/images/loader.svg';
import SearchImage from '../../../assets/images/Search.svg';
import UpLoadImage from '../../../assets/images/UpLoad.svg';
import * as Taber from 'react-bootstrap';
import H5PPreview from '../../H5PPreview';
import AddVideo from '../../Videos/formik/addvideo';
import DescribeVideo from '../../Videos/formik/describevideo';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import UploadSmSvg from 'iconLibrary/mainContainer/UploadSmSvg';
import SearchSmSvg from 'iconLibrary/mainContainer/SearchSmSvg';

const ImgLoader = () => <img style={{ width: '100px' }} src={loader} />;
const ActivityLayout = (props) => {
  const { changeScreenHandler } = props;
  const history = useHistory();
  const [layout, setLayout] = useState({ title: 'Interactive Book' });
  const dispatch = useDispatch();
  const [activeRadio, setActiveRadio] = useState('create');
  const [key, setKey] = useState('layout');

  useMemo(() => {
    // Clearing course presentation pdf import storage every time activity creation
    // flow starts to avoid accidentally importing residual data from previous
    // attempts
    localStorage.removeItem('coursePresentationFromFile');
    toast.info('Loading Activities ...', {
      className: 'project-loading',
      closeOnClick: false,
      closeButton: false,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 10000,
      icon: '',
    });
    dispatch(getLayoutActivities());
  }, []);
  const activityLayouts = useSelector((state) => state.myactivities.layout);

  useMemo(() => {
    setLayout(activityLayouts?.[0] || null);
    if (activityLayouts) {
      toast.dismiss();
    }
  }, [activityLayouts]);
  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <div className="activity-layout-form">
      <div className="activity-layout-tabs">
        <Tabs text="1. Select Activity" tabActive />
        <Tabs text="2. Describe and Create Activity" className="ml-10 " />
        <Tabs text="3. Add interactions" className="ml-10 " />
      </div>
      <div className="activity-layout-title">
        <HeadingTwo text="Select layout" color="#084892" className="select_activity_title_style" />
      </div>

      {/* <form className="radio-group ">
        <div className="radio-button active-radio2 ">
          <input name="selecttype" checked type="radio" className="input" id="Create new activity" />
          <label for="Create new activity">Create new activity</label>
        </div>
        <div className="radio-button">
          <input
            onClick={() => {
              changeScreenHandler('addactivity', 'upload');
              setActiveRadio('upload');
              dispatch({
                type: actionTypes.SET_SELECTED_ACTIVITY,
                payload: layout,
              });
            }}
            name="selecttype"
            type="radio"
            className="input"
            id="Upload activity"
          />
          <label for="Upload activity">Upload activity</label>
        </div>
      </form> */}
      <div className="activity-layout-detail">
        <h5>Use each Activity's information tabs to find the experience that best suits your content.</h5>
        <HeadingText text="Combine media and interactive questions by selecting one of our Layout Activity types displayed here." color="#515151" className="activity_layout_des" />
      </div>
      <div className="layout-cards-process-btn">
        <div>
          <div className="activity-layout-cards">
            {!!activityLayouts &&
              activityLayouts.map((data) => {
                return (
                  <LayoutCard
                    image={data.image}
                    text={data.title}
                    className={layout?.title == data.title ? 'activity-layoutCard-active mr-3' : 'mr-3'}
                    onClick={() => setLayout(data)}
                  />
                );
              })}

            {/* {!!allActivity && (
            <LayoutCard
              image={ColoumImage1}
              text="Explore All Activities"
              importImg
              className={layout == 'SingleActivity' ? 'activity-layoutCard-active mr-3' : 'mr-3'}
              onClick={() => {
                setLayout('SingleActivity');
                dispatch({
                  type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
                  payload: 'singleActivity',
                });
              }}
            />
          )} */}
          </div>
          <div className="explore-upload-buttons">
            <div
              className="ex-up-button expiore show_activity"
              onClick={() => {
                setLayout('SingleActivity');
                dispatch({
                  type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
                  payload: 'singleActivity',
                });
              }}
            >
              {/* <img src={SearchImage} alt="Search" /> */}
              <SearchSmSvg primaryColor={primaryColor} />
              <p className="">Show All Activities</p>
            </div>
            <div
              className="ex-up-button"
              onClick={() => {
                changeScreenHandler('addactivity', 'upload');
                setActiveRadio('upload');
                dispatch({
                  type: actionTypes.SET_SELECTED_ACTIVITY,
                  payload: layout,
                });
              }}
            >
              {/* <img src={UpLoadImage} alt="UpLoad" /> */}
              <UploadSmSvg primaryColor={primaryColor} />
              <p className="">Upload </p>
            </div>
          </div>
        </div>

        {!!layout && (
          <div className="layout-process-btn">
            <Taber.Tabs
              defaultActiveKey="layout"
              activeKey={key}
              onSelect={(k) => {
                setKey(k);

                if (k === 'demo') {
                  let tempStorage = layout;
                  setLayout();
                  setTimeout(() => {
                    setLayout(tempStorage);
                  }, 300);
                }
              }}
              id="controlled-tab-example"
            >
              {/* <Taber.Tab eventKey="activity_description" title={'Activity Description'}>
                <div className="activity-des-taber">
                  <div className="activity-des-taber-detail">
                    <h6>Description</h6>
                    <p>
                      An HTML5-based interactive video content type allowing users to add multiple choice and fill in the blank questions, pop-up text and other types of
                      interactions to their videos using only a web browser. Make your videos more engaging with H5P and interactive video in publishing systems like Canvas,
                      Brightspace, Blackboard, Moodle and WordPress.
                    </p>
                  </div>
                  <div className="activity-des-taber-detail">
                    <h6>When to Use It</h6>
                    <p>
                      An HTML5-based interactive video content type allowing users to add multiple choice and fill in the blank questions, pop-up text and other types of
                      interactions to their videos using only a web browser. Make your videos more engaging with H5P and interactive video in publishing systems like Canvas,
                      Brightspace, Blackboard, Moodle and WordPress.
                    </p>
                  </div>
                  <div className="activity-des-taber-useful">
                    <div>
                      <span className="useful-title">Useful for</span>
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 5L13 5" stroke="#084892" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M9 9L13 5L9 1" stroke="#084892" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      </svg>
                    </div>
                    <p>Guided onboardings, Corporated presentations</p>
                  </div>
                </div>
              </Taber.Tab> */}
              <Taber.Tab eventKey="layout" title={'How-to video'}>
                <div className="activity-layout-process-box">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ borderRadius: '8px' }}
                    src={layout.demo_video_id || 'https://www.youtube-nocookie.com/embed/lgzsJDcMvPI'}
                    title={layout.title}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  ></iframe>
                </div>
                <HeadingText text={layout.description} color="#515151" />
              </Taber.Tab>
              <Taber.Tab eventKey="demo" title="Sample activity">
                {layout.demo_activity_id ? (
                  <>
                    <H5PPreview activityId={layout.demo_activity_id.trim()} tokenrequire={false} showltipreview />
                    <HeadingText text={layout.description} color="#515151" />
                  </>
                ) : (
                  <Taber.Alert variant="warning">Demo is not Available.</Taber.Alert>
                )}
              </Taber.Tab>
            </Taber.Tabs>
            <div className="activity-layout-btns">
              {/* <Buttons text="Cancel" secondary={true} width="153px" height="36px" onClick={() => changeScreenHandler('')} hover={true} /> */}

              <div className="btns-margin">
                <Buttons
                  text="Select"
                  defaultgrey={!layout}
                  width="91px"
                  height="32px"
                  disabled={!layout}
                  onClick={() => {
                    if (layout.title === 'Interactive Video') {
                      changeScreenHandler('addvideo');
                    } else if (layout.title === 'Course Presentation') {
                      changeScreenHandler('coursepresentation');
                    } else {
                      changeScreenHandler('addactivity');
                    }

                    dispatch({
                      type: actionTypes.SET_SELECTED_ACTIVITY,
                      payload: layout,
                    });
                  }}
                  hover
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityLayout;
