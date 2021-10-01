/* eslint-disable */
import React, { useState, useEffect } from "react";
import HeadingText from "utils/HeadingText/headingtext";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import LayoutCard from "utils/LayoutCard/layoutcard";
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import ColoumImage1 from "assets/images/layout/singleactivit.png";
import Tabs from "utils/Tabs/tabs";
import Buttons from "utils/Buttons/buttons";
import HeadingThree from "utils/HeadingThree/headingthree";
import PlayIcon from "assets/images/play.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useHistory } from "react-router-dom";
import { getSingleLayoutActivities } from 'store/actions/resource';
import * as actionTypes from 'store/actionTypes';

const ActivityLayout = (props) => {
  const { changeScreenHandler } = props;
  const history = useHistory();
  const [layout, setLayout] = useState({title:'Interactive Book'});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleLayoutActivities());
  },[])
  const allActivity =  useSelector((state) => state.myactivities.layout);
  useEffect(() => () => {

     
      setLayout(allActivity?.[0] || null)
      
    
  },[allActivity]);
  return (
    <div className="activity-layout-form">
      <div className="activity-layout-tabs">
        <Tabs text="1. Select a layout" tabActive={true} />
        <Tabs text="2.Layout description + activities" className="ml-10 " />
        {/* mt-10 */}
        {/* <Tabs text="3. Preview Layout" className="ml-10" /> */}
      </div>
      <div className="activity-layout-title">
        <HeadingTwo text="Select a layout" color="#084892" />
      </div>
      <div className="activity-layout-detail">
        <HeadingText
          text="Start creating by selecting a layout and then add activity types."
          color="#515151"
        />
      </div>
      <div className="layout-cards-process-btn">
        <div className="activity-layout-cards">
          
            {allActivity ? (
            toast.dismiss(),
            allActivity.map((data) => {
             return (
              <LayoutCard
                image={data.image}
                text={data.title}
                className={
                  layout?.title == data.title
                    ? "activity-layoutCard-active ml-30"
                    : "ml-30"
                }
                onClick={() => setLayout(data)}
              />
             );
            })):  toast.info(' Loading Activities ...', {
              position: 'top-center',
              hideProgressBar: false,
              icon: '',
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
            })}
        </div>
        {!!layout &&
        (<div className="layout-process-btn">
          <HeadingThree text={layout.title} color="#084892" />
          <div className="activity-layout-process-box">
            <iframe
              width="100%"
              height="100%"
              frameborder="0"
              src={layout.demo_video_id | 'https://www.youtube.com/embed/ngXSzWNYzU4'}
              title={layout.title}
            ></iframe>
            {/* <img src={PlayIcon} /> */}
          </div>
          <HeadingText
            text={layout.description}
            color="#515151"
          />
          <div className="layout-useful-box">
            <div className="useful-box">
              <HeadingThree text="Useful for" color="#084892" />
              <FontAwesomeIcon icon={faArrowRight} className="useful-icon" />
            </div>
            <HeadingText
              text="Guided onboardings, Corporated presentations"
              color="#515151"
            />
          </div>
          <div className="activity-layout-btns">
            <Buttons
              text="Cancel"
              secondary={true}
              width="153px"
              height="36px"
              onClick={() => changeScreenHandler("")}
              hover={true}
            />

            <div className="btns-margin">
              <Buttons
                text="Select Layout"
                defaultgrey={layout ? false : true}
                width="153px"
                height="36px"
                disabled={layout ? false : true}
                onClick={() => {
                  changeScreenHandler("addactivity")
                  dispatch({
                    type:actionTypes.SET_SELECTED_ACTIVITY,
                    payload: layout,
                  })
                }}
                hover={true}
              />
            </div>
          </div>
        </div>)}
      </div>
    </div>
  );
};

export default ActivityLayout;
