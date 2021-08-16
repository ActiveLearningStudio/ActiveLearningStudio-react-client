/*eslint-disable*/
import React, { useState } from "react";
import TopHeading from "utils/TopHeading/topheading";
import TopHeadingImage from "assets/images/svg/Vector.svg";
import "./styles.scss";
import Buttons from "utils/Buttons/buttons";
import * as actionTypes from 'store/actionTypes';
import { useSelector, useDispatch} from 'react-redux';
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import HeadingText from "utils/HeadingText/headingtext";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import HeadingThree from "utils/HeadingThree/headingthree";
import NewActivity from "./formik/newactivity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActivityLayout from "./formik/activitylayout";
import AddActivity from "./formik/addactivity";
import PreviewLayout from "./formik/previewlayout";

const MyActivity = () => {
  const { screenState } =  useSelector((state) => state.myactivities);
  const dispatch = useDispatch();
  const changeScreenHandler = (payload) => {
    dispatch({
      type:actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
      payload: payload,
    })
  }
  return (
    <>
      {screenState  && (
        <div className="form-new-popup-activity">
          <FontAwesomeIcon
            icon="times"
            className="cross-all-pop"
            onClick={() => changeScreenHandler('')}
          />
          <div className="inner-form-content">
            {screenState === 'newactivity'
            && (
              <NewActivity
                changeScreenHandler={changeScreenHandler}
                screenState={screenState}
              />
            )}
            {screenState === 'layout'
            && (
              <ActivityLayout
                changeScreenHandler={changeScreenHandler}
                screenState={screenState}
              />
            )}
            {screenState === 'addactivity'
            && (
              <AddActivity
                changeScreenHandler={changeScreenHandler}
                screenState={screenState}
              />
            )}
            {screenState === 'preview'
            && (
              <PreviewLayout
                changeScreenHandler={changeScreenHandler}
                screenState={screenState}
              />
            )}
          </div>
        </div>
      )}
      <div className="myactivity">
        <div className="content-wrapper">
          <div className="inner-content">
            <div className="topHeadingBtn">
              <div className="topHeading">
                <TopHeading
                  description="Nevada Department of Education"
                  image={TopHeadingImage}
                  heading="My Activities"
                  color="#084892"
                />
              </div>
              <div className="topBtn">
                <Buttons
                  primary={true}
                  text="New Activity"
                  icon={faPlus}
                  width="163px"
                  height="35px"
                  onClick={() => changeScreenHandler('newactivity')}
                />
              </div>
            </div>
            <div className="topDescription">
              <HeadingText
                text="Create new activities, control, manage and organize them in playlists and projects."
                color="#515151
"
              />
            </div>
            <div className="activityTitle">
              <HeadingTwo text="Activities" color="#285AA5" />
            </div>
            <div className="activityBlocks">
              <div className="blockBody">
                <div className="blockBody-detail">
                  <HeadingThree
                    text="How to create Activities"
                    color="#515151"
                    className="mb-20"
                  />
                  <HeadingText
                    text="Learn how to create awesome 
                    activities using +50 Activty Types
                    like Dialog Cards, Interactive Videos 
                    and more..."
                    color="#515151"
                    className="mb-13"
                  />
                  <HeadingThree text="Learn" color="#515151" />
                </div>
              </div>

              <div className="blockBody ml-54">
                <div className="blockBody-text">
                  <HeadingText
                    text="How to organize Activities into Projects"
                    color="#515151"
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyActivity;
