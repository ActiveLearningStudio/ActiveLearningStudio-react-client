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

const ImgLoader = () => <img style={{ width: '100px' }} src={loader} />;
const ActivityLayout = (props) => {
  const { changeScreenHandler } = props;
  const history = useHistory();
  const [layout, setLayout] = useState({ title: 'Interactive Book' });
  const dispatch = useDispatch();
  const [activeRadio, setActiveRadio] = useState('create');
  const [key, setKey] = useState('layout');

  useMemo(() => {
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
      </div>
      <div className="activity-layout-title">
        <HeadingTwo text="Select Activity" color="#084892" />
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
        <HeadingText
          text="Assemble multiple interactions into one of the layout activities below or select Explore all to tour the full library of activity types."
          color="#515151"
        />
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
              className="ex-up-button expiore"
              onClick={() => {
                setLayout('SingleActivity');
                dispatch({
                  type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
                  payload: 'singleActivity',
                });
              }}
            >
              {/* <img src={SearchImage} alt="Search" /> */}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                  stroke={primaryColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M21.0004 21.0004L16.6504 16.6504" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <p className="">Explore all</p>
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
              <svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1.5 7V10.2C1.5 10.4122 1.65804 10.6157 1.93934 10.7657C2.22064 10.9157 2.60218 11 3 11H12C12.3978 11 12.7794 10.9157 13.0607 10.7657C13.342 10.6157 13.5 10.4122 13.5 10.2V7"
                  stroke={primaryColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M10.1499 3.39999L7.5249 1L4.8999 3.39999" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7.5 1V8.79997" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

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
              <Taber.Tab eventKey="demo" title="Video Tutorial">
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
              <Buttons text="Cancel" secondary={true} width="153px" height="36px" onClick={() => changeScreenHandler('')} hover={true} />

              <div className="btns-margin">
                <Buttons
                  text="Select Layout"
                  defaultgrey={!layout}
                  width="153px"
                  height="36px"
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
