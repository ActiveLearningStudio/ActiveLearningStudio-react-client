/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import TopHeading from "utils/TopHeading/topheading";
import TopHeadingImage from "assets/images/svg/myProject.svg";
import "./styles.scss";
import Buttons from "utils/Buttons/buttons";
import * as actionTypes from "store/actionTypes";
import { useSelector, useDispatch } from "react-redux";
import {
  faBoxTissue,
  faList,
  faListAlt,
  faPlus,
  faTh,
} from "@fortawesome/free-solid-svg-icons";
import HeadingText from "utils/HeadingText/headingtext";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import HeadingThree from "utils/HeadingThree/headingthree";
import NewActivity from "./formik/newactivity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ActivityLayout from "./formik/activitylayout";
import SingleActivity from './formik/addSingleActivity';
import AddActivity from "./formik/addactivity";
import PreviewLayout from "./formik/previewlayout";
import { Link } from "react-router-dom";
import { Formik, Field } from "formik";
import CardImage from "assets/images/activitycard.png";
import ActivityCardBox from "utils/ActivityCard/activitycard";
import UploadInteractiveVideo from "./formik/uploadinteractivevideo";
import ActivityCardV2 from "utils/ActivityCardV2/activitycardv2";
import Footer from "components/Footer";
import AddActivityPopup from "utils/AddActivityPopup/addactivitypopup";
// import H5PEditor from "components/ResourceCard/AddResource/Editors/H5PEditorV2";
const MyActivity = ({playlistPreview}) => {
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

  const { screenState } = useSelector((state) => state.myactivities);
  const dispatch = useDispatch();
  const changeScreenHandler = (payload) => {
    dispatch({
      type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
      payload: payload,
    });
  };
  return (
    <>
      {screenState && (
        <div
          className={
            uploadImageStatus
              ? "form-new-popup-activity z-index"
              : "form-new-popup-activity"
          }
        >
          <div className="inner-form-content">
            <div className="inner-form-content-box">
              <div className="cross-all-pop-box">
                <FontAwesomeIcon
                  icon="times"
                  className="cross-all-pop"
                  onClick={() => changeScreenHandler("")}
                />
              </div>

              {/* {screenState === "newactivity" && (
              <NewActivity
                changeScreenHandler={changeScreenHandler}
                screenState={screenState}
              />
            )} */}
              {screenState === "layout" && (
                <ActivityLayout
                  changeScreenHandler={changeScreenHandler}
                  screenState={screenState}
                />
              )}
              {screenState === "addactivity" && (
                <AddActivity
                  changeScreenHandler={changeScreenHandler}
                  screenState={screenState}
                  setUploadImageStatus={setUploadImageStatus}
                />
              )}
              {screenState === "uploadinteractivevideo" && (
                <UploadInteractiveVideo
                  changeScreenHandler={changeScreenHandler}
                  screenState={screenState}
                />
              )}
              {screenState === "preview" && (
                <PreviewLayout
                  changeScreenHandler={changeScreenHandler}
                  screenState={screenState}
              />
              )}
               {screenState === "singleActivity" && (
                <SingleActivity
                  changeScreenHandler={changeScreenHandler}
                  screenState={screenState}
              />
              )}
            </div>
          </div>
        </div>
      )}
      {!playlistPreview 
      && (
      <div className="myactivity">
        <div className="content-wrapper">
          <div className="inner-content">
            {/* <H5PEditor /> */}
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
                  onClick={() => changeScreenHandler("layout")}
                  hover={true}
                />
              </div>
            </div>
            <div className="topDescription">
              <HeadingText
                text="Create new activities, control, manage and organize them in playlists and projects."
                color="#515151"
              />
            </div>
            <div className="activityTitle">
              {edit ? (
                <HeadingTwo
                  text="Select Activies to add to a project or create a new one."
                  color="#285AA5"
                />
              ) : (
                <HeadingTwo text="Activities" color="#285AA5" />
              )}
            </div>

            {cardShow ? (
              <div className="activity-cards-show">
                <div className="activity-cards-search">
                  <div className="search-textfield">
                    <input type="text" placeholder="Search activity..." />
                    <FontAwesomeIcon icon="search" />
                  </div>
                  <div className="search-filter">
                    {/* <Link to="#" className="primary-color search-filter-link " >
                      Sort & Filter
                    </Link> */}
                    <span
                      className="primary-color search-filter-link"
                      onClick={() => setShowFilter(!showFilter)}
                    >
                      Sort & Filter
                    </span>
                  </div>
                  <div className="create-project-portion">
                    {/* <Link to="#" className="primary-color">
                      <FontAwesomeIcon
                        icon="plus-square"
                        className="project-portion-icon"
                      />
                      Create project
                    </Link> */}
                    <FontAwesomeIcon
                      icon={faList}
                      className="project-portion-icon primary-color"
                      onClick={() => setListView(true)}
                    />
                    <FontAwesomeIcon
                      icon={faTh}
                      className="project-portion-icon primary-color"
                      onClick={() => setListView(false)}
                    />
                  </div>
                </div>
                {showFilter && (
                  <div className="search-filter-form">
                    <Formik
                      initialValues={{
                        method: "",
                        layoutTitle: "",
                        picked: "create",
                      }}
                    >
                      <form>
                        <div className="sort-filter-form">
                          <div className="sortby">
                            <label>Sort by</label>
                            <select>
                              <option>A to Z</option>
                              <option>A to Z</option>
                              <option>A to Z</option>
                            </select>
                          </div>
                          <div className="sortby">
                            <label>Subject</label>
                            <select>
                              <option>Analisis</option>
                              <option>Analisis</option>
                              <option>Analisis</option>
                            </select>
                          </div>
                          <div className="sortby">
                            <label>Best for</label>
                            <select>
                              <option>Analisis</option>
                              <option>Analisis</option>
                              <option>Analisis</option>
                            </select>
                          </div>
                        </div>
                        <div className="filter-form-radio">
                          <label className="check-input">
                            <Field type="radio" name="sort" value="sort" />
                            Image based
                          </label>
                          <label className="check-input ml-35">
                            <Field type="radio" name="sort" value="sort" />
                            Accesible
                          </label>
                          <label className="check-input ml-35">
                            <Field type="radio" name="sort" value="sort" />
                            Multimedia
                          </label>
                        </div>
                      </form>
                    </Formik>
                  </div>
                )}
                {/* <div className="activity-cards-box">
                  <div className={listView ? "width-100" : "ml-20"}>
                    <ActivityCardBox
                      img={CardImage}
                      title="My first activity"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                      listView={listView}
                    />
                  </div>
                  <div className={listView ? "width-100" : "ml-20"}>
                    <ActivityCardBox
                      img={CardImage}
                      title="My first activity"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                      listView={listView}
                    />
                  </div>
                  <div className={listView ? "width-100" : "ml-20"}>
                    <ActivityCardBox
                      img={CardImage}
                      title="My first activity"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                      listView={listView}
                    />
                  </div>
                  <div className={listView ? "width-100" : "ml-20"}>
                    <ActivityCardBox
                      img={CardImage}
                      title="My first activity"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                      listView={listView}
                    />
                  </div>
                  <div className={listView ? "width-100" : "ml-20"}>
                    <ActivityCardBox
                      img={CardImage}
                      title="My first activity"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                      listView={listView}
                    />
                  </div>
                  <div className={listView ? "width-100" : "ml-20"}>
                    <ActivityCardBox
                      img={CardImage}
                      title="My first activity"
                      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor."
                      listView={listView}
                    />
                  </div>
                </div> */}
                <div className="activity-cards-box">
                  <div className={listView ? "width-100" : "mt-36"}>
                    <ActivityCardV2
                      backgroundImg={CardImage}
                      title="My first activity"
                      listView={listView}
                      selectionStatus={edit}
                      setAddActivityPopUp={setAddActivityPopUp}
                    />
                  </div>
                  <div className={listView ? "width-100" : "mt-36"}>
                    <ActivityCardV2
                      backgroundImg={CardImage}
                      title="My first activity"
                      listView={listView}
                      selectionStatus={edit}
                      setAddActivityPopUp={setAddActivityPopUp}
                    />
                  </div>
                  <div className={listView ? "width-100" : "mt-36"}>
                    <ActivityCardV2
                      backgroundImg={CardImage}
                      title="My first activity"
                      listView={listView}
                      selectionStatus={edit}
                      setAddActivityPopUp={setAddActivityPopUp}
                    />
                  </div>
                  <div className={listView ? "width-100" : "mt-36"}>
                    <ActivityCardV2
                      backgroundImg={CardImage}
                      title="My first activity"
                      listView={listView}
                      selectionStatus={edit}
                      setAddActivityPopUp={setAddActivityPopUp}
                    />
                  </div>
                  <div className={listView ? "width-100" : "mt-36"}>
                    <ActivityCardV2
                      backgroundImg={CardImage}
                      title="My first activity"
                      listView={listView}
                      selectionStatus={edit}
                      setAddActivityPopUp={setAddActivityPopUp}
                    />
                  </div>
                </div>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
      )}
      {/* {addActivityPopUp ? <AddActivityPopup /> : <Footer />} */}
    </>
  );
};

export default MyActivity;