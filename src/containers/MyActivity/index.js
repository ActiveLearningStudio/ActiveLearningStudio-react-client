/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import TopHeading from 'utils/TopHeading/topheading';
import TopHeadingImage from 'assets/images/svg/myProject.svg';
import Swal from 'sweetalert2';

import Buttons from 'utils/Buttons/buttons';
import * as actionTypes from 'store/actionTypes';
import { useSelector, useDispatch } from 'react-redux';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import HeadingText from 'utils/HeadingText/headingtext';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import HeadingThree from 'utils/HeadingThree/headingthree';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MyVerticallyCenteredModal from 'components/models/activityOptions';
import AddVideo from 'containers/Videos/formik/addvideo';
import DescribeVideo from 'containers/Videos/formik/describevideo';
import AddCoursePresentation from 'containers/MyActivity/AddCoursePresentation';

import ActivityLayout from './formik/activitylayout';
import SingleActivity from './formik/addSingleActivity';
import AddActivity from './formik/addactivity';
import PreviewLayout from './formik/previewlayout';
import UploadInteractiveVideo from './formik/uploadinteractivevideo';
import 'containers/Videos/style.scss';
import './styles.scss';

const MyActivity = ({ playlistPreview, activityPreview }) => {
  const [edit, setEdit] = useState(false);

  const params = useParams();
  useEffect(() => {
    if (params.statusbool) {
      setEdit(params.statusbool);
    }
  }, []);
  const [videoTitle, setVideoTitle] = useState('');
  const [videodesc, setvideodesc] = useState('');
  const [subName, setsubName] = useState('');
  const [authortagName, setauthortagName] = useState('');
  const [eduLevel, seteduLevel] = useState('');
  const [cardShow, setCardShow] = useState(true);
  const [uploadImageStatus, setUploadImageStatus] = useState(false);

  const [activtyMethod, setActivityMethod] = useState('create');
  const [activeType, setActiveType] = useState('');
  const [currentActivity, setCurrentActivity] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [isbackHide, setisbackHide] = useState(true);
  const { screenState, activity } = useSelector((state) => state.myactivities);
  const dispatch = useDispatch();
  const changeScreenHandler = (payload, method) => {
    dispatch({
      type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
      payload,
    });
    if (method === 'upload') {
      setActivityMethod('upload');
    } else {
      setActivityMethod('create');
    }
  };
  return (
    <>
      {screenState && (
        <div className={uploadImageStatus ? 'form-new-popup-activity z-index' : 'form-new-popup-activity '}>
          <div style={{ paddingTop: '100px' }} className="inner-form-content ">
            <div className="inner-form-content-box ">
              <div className="cross-all-pop-box ">
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
                        changeScreenHandler('');
                        setVideoTitle('');
                        setvideodesc('');
                        setsubName('');
                        seteduLevel('');
                        setauthortagName('');
                        dispatch({
                          type: 'ADD_VIDEO_URL',
                          payload: '',
                        });
                      }
                    });
                  }}
                />
              </div>

              {screenState === 'layout' && <ActivityLayout changeScreenHandler={changeScreenHandler} screenState={screenState} />}
              {screenState === 'addactivity' && (
                <AddActivity
                  setActivityMethod={setActivityMethod}
                  changeScreenHandler={changeScreenHandler}
                  screenState={screenState}
                  activtyMethod={activtyMethod}
                  setUploadImageStatus={setUploadImageStatus}
                  activityPreview={activityPreview}
                />
              )}
              {screenState === 'layoutActivityUpload' && (
                <AddActivity
                  setActivityMethod={setActivityMethod}
                  changeScreenHandler={changeScreenHandler}
                  screenState="addactivity"
                  activtyMethod="upload"
                  setUploadImageStatus={setUploadImageStatus}
                  activityPreview={activityPreview}
                />
              )}
              {screenState === 'uploadinteractivevideo' && <UploadInteractiveVideo changeScreenHandler={changeScreenHandler} screenState={screenState} />}
              {screenState === 'preview' && <PreviewLayout changeScreenHandler={changeScreenHandler} screenState={screenState} />}
              {screenState === 'singleActivity' && (
                <SingleActivity
                  setCurrentActivity={setCurrentActivity}
                  setActiveType={setActiveType}
                  setModalShow={setModalShow}
                  changeScreenHandler={changeScreenHandler}
                  screenState={screenState}
                />
              )}
              {screenState === 'addvideo' && (
                <div className="form-new-popup-myvideo ">
                  <AddVideo showback changeScreenHandler={changeScreenHandler} setisbackHide={setisbackHide} />
                </div>
              )}
              {screenState === 'describevideo' && (
                <div className="form-new-popup-myvideo ">
                  <DescribeVideo
                    playlistPreview={!!activity}
                    reverseType
                    showback
                    changeScreenHandler={changeScreenHandler}
                    setUploadImageStatus={setUploadImageStatus}
                    activityPreview={activityPreview}
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
                </div>
              )}
              {screenState === 'coursepresentation' && (
                <div className="form-new-popup-myvideo ">
                  <AddCoursePresentation showback changeScreenHandler={changeScreenHandler} />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!playlistPreview && (
        <div className="myactivity">
          <div className="content-wrapper">
            <div className="inner-content">
              <div className="topHeadingBtn">
                <div className="topHeading">
                  <TopHeading description="Nevada Department of Education" image={TopHeadingImage} heading="My Activities" color="#084892" />
                </div>
                <div className="topBtn">
                  <Buttons primary text="New Activity" icon={faPlus} width="163px" height="35px" onClick={() => changeScreenHandler('layout')} hover />
                </div>
              </div>
              <div className="topDescription">
                <HeadingText text="Create new activities, control, manage and organize them in playlists and projects." color="#515151" />
              </div>
              <div className="activityTitle">
                {edit ? <HeadingTwo text="Select Activies to add to a project or create a new one." color="#285AA5" /> : <HeadingTwo text="Activities" color="#285AA5" />}
              </div>

              <div className="activityBlocks">
                <div className="blockBody">
                  <div className="blockBody-detail">
                    <HeadingThree text="How to create Activities" color="#515151" className="mb-20" />
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
                    <HeadingText text="How to organize Activities into Projects" color="#515151" className="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} activity={currentActivity} activeType={activeType} />
    </>
  );
};

export default MyActivity;
