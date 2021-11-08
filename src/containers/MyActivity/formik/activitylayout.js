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
import * as Taber from 'react-bootstrap';
import H5PPreview from '../../H5PPreview';

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
  const allActivity = useSelector((state) => state.myactivities.layout);
  useMemo(() => {
    setLayout(allActivity?.[0] || null);
    if (allActivity) {
      toast.dismiss();
    }
  }, [allActivity]);
  return (
    <div className="activity-layout-form">
      <div className="activity-layout-tabs">
        <Tabs text="1. Select an activity" tabActive />
        <Tabs text="2.Activity description + activities" className="ml-10 " />
        {/* mt-10 */}
        {/* <Tabs text="3. Preview Layout" className="ml-10" /> */}
      </div>
      <div className="activity-layout-title">
        <HeadingTwo text="Select a layout" color="#084892" />
      </div>

      <form className="radio-group ">
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
      </form>
      <div className="activity-layout-detail">
        <HeadingText text="Start creating by selecting a layout and then add activity types." color="#515151" />
      </div>
      <div className="layout-cards-process-btn">
        <div className="activity-layout-cards">
          {!!allActivity &&
            allActivity.map((data) => {
              return (
                <LayoutCard
                  image={data.image}
                  text={data.title}
                  className={layout?.title == data.title ? 'activity-layoutCard-active mr-3' : 'mr-3'}
                  onClick={() => setLayout(data)}
                />
              );
            })}

          {!!allActivity && (
            <LayoutCard
              image={ColoumImage1}
              text="All Activities"
              importImg
              className={layout == 'SingleActivity' ? 'activity-layoutCard-active mr-30' : 'mr-30'}
              onClick={() => {
                setLayout('SingleActivity');
                dispatch({
                  type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
                  payload: 'singleActivity',
                });
              }}
            />
          )}
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
              <Taber.Tab eventKey="layout" title={layout.title}>
                <div className="activity-layout-process-box">
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ borderRadius: '8px' }}
                    src={layout.demo_video_id || 'https://www.youtube-nocookie.com/embed/lgzsJDcMvPI'}
                    title={layout.title}
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allow="fullscreen;"
                  ></iframe>
                </div>
                <HeadingText text={layout.description} color="#515151" />
              </Taber.Tab>
              <Taber.Tab eventKey="demo" title="Demo">
                {layout.demo_activity_id ? (
                  <H5PPreview activityId={layout.demo_activity_id.trim()} tokenrequire={false} showltipreview />
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
                    changeScreenHandler('addactivity');
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
