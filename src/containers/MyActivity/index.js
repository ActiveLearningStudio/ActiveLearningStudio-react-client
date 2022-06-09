/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import TopHeading from 'utils/TopHeading/topheading';
import TopHeadingImage from 'assets/images/svg/myProject.svg';
import './styles.scss';
import Buttons from 'utils/Buttons/buttons';
import * as actionTypes from 'store/actionTypes';
import { useSelector, useDispatch } from 'react-redux';
import { faBoxTissue, faList, faListAlt, faPlus, faTh } from '@fortawesome/free-solid-svg-icons';
import HeadingText from 'utils/HeadingText/headingtext';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import HeadingThree from 'utils/HeadingThree/headingthree';
import NewActivity from './formik/newactivity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ActivityLayout from './formik/activitylayout';
import SingleActivity from './formik/addSingleActivity';
import AddActivity from './formik/addactivity';
import PreviewLayout from './formik/previewlayout';
import UploadInteractiveVideo from './formik/uploadinteractivevideo';
import MyVerticallyCenteredModal from 'components/models/activityOptions';
import AddVideo from 'containers/Videos/formik/addvideo';
import DescribeVideo from 'containers/Videos/formik/describevideo';
import 'containers/Videos/style.scss';
import Swal from 'sweetalert2';
// import H5PEditor from "components/ResourceCard/AddResource/Editors/H5PEditorV2";
const MyActivity = ({ playlistPreview, activityPreview }) => {
  const [edit, setEdit] = useState(false);
  const [addActivityPopUp, setAddActivityPopUp] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (params.statusbool) {
      setEdit(params.statusbool);
    }
  }, []);
  const [cardShow, setCardShow] = useState(true);
  const [uploadImageStatus, setUploadImageStatus] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [listView, setListView] = useState(false);
  const [activtyMethod, setActivityMethod] = useState('create');
  const [activeType, setActiveType] = useState('');
  const [currentActivity, setCurrentActivity] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const { screenState, activity } = useSelector((state) => state.myactivities);
  const dispatch = useDispatch();
  const changeScreenHandler = (payload, method) => {
    dispatch({
      type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
      payload: payload,
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
                      }
                    });
                  }}
                />
              </div>

              {/* {screenState === "newactivity" && (
              <NewActivity
                changeScreenHandler={changeScreenHandler}
                screenState={screenState}
              />
             )} */}
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
                  <AddVideo showback={true} changeScreenHandler={changeScreenHandler} />
                </div>
              )}
              {screenState === 'describevideo' && (
                <div className="form-new-popup-myvideo ">
                  <DescribeVideo
                    playlistPreview={activity ? true : false}
                    reverseType
                    showback={true}
                    changeScreenHandler={changeScreenHandler}
                    setUploadImageStatus={setUploadImageStatus}
                    activityPreview={activityPreview}
                  />
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
                  <Buttons primary={true} text="New Activity" icon={faPlus} width="163px" height="35px" onClick={() => changeScreenHandler('layout')} hover={true} />
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
