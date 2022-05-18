/* eslint-disable */
import React, { useState, useEffect } from "react";

import HeadingOne from "utils/HeadingTwo/headingtwo";
import LayoutCard from "utils/LayoutCard/layoutcard";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Headings from "curriki-design-system/dist/utils/Headings/headings";
import arrowdark from "assets/images/arrowdark.png";
import searchicon from "assets/images/nteractiveactionssearch.png";
import BackButton from "../../../assets/images/left-arrow.svg";
import Tabs from "utils/Tabs/tabs";
import Buttons from "utils/Buttons/buttons";
import { useHistory } from "react-router-dom";
import {
  getSingleLayoutActivities,
  loadResourceTypesAction,
} from "store/actions/resource";
import * as actionTypes from "store/actionTypes";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

const ActivityLayout = (props) => {
  const [allActivitiesSingle, setAllSingleActivities] = useState(null);
  const {
    changeScreenHandler,
    setActiveType,
    setModalShow,
    setCurrentActivity,
  } = props;
  const history = useHistory();
  const [layout, setLayout] = useState({ title: "Interactive Book" });
  const [filterData, setFilterData] = useState([]);
  const organization = useSelector((state) => state.organization);

  const dispatch = useDispatch();
  useEffect(() => {
    toast.dismiss();
    toast.info("Loading Activities ...", {
      className: "project-loading",
      closeOnClick: false,
      closeButton: false,
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 10000,
      icon: "",
    });
    dispatch(loadResourceTypesAction());
    dispatch(getSingleLayoutActivities(organization?.activeOrganization?.id));
  }, []);
  const allActivity = useSelector((state) => state.myactivities.singleLayout);
  const allActivitytypes = useSelector((state) => state.resource.types);
  useEffect(() => {
    setLayout(allActivity?.[0] || null);
    setAllSingleActivities(allActivity);
    if (allActivity) {
      toast.dismiss();
    }
  }, [allActivity]);
  useEffect(() => {
    const setData = [];
    allActivitytypes?.data?.forEach((data) => {
      setData.push(data.id);
    });
    setFilterData(setData);
  }, [allActivitytypes]);
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <div className="activity-layout-form ">
      <div className="activity-layout-tabs">
        <Tabs text="1. Select layout" tabActive={true} />
        <Tabs text="2. Select activity" tabActive={true} className="ml-10 " />
        <Tabs text="3. Create activity" className="ml-10 " />
      </div>
      <div className="upload-back-button">
        <div className="activity-layout-title ">
          <HeadingOne text="Select activity" color="#084892" />
        </div>
        <div
          className="back-button"
          id="back-button-none-bg"
          onClick={() => changeScreenHandler("layout")}
        >
          {/* <img src={BackButton} alt="back button " /> */}
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ marginRight: "8px", marginTop: "4px" }}
          >
            <path
              d="M13 5L1 5"
              stroke={primaryColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 1L1 5L5 9"
              stroke={primaryColor}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="">Back to options</p>
        </div>
      </div>
      <div className="activity-layout-paragraph">
        <Headings
          headingType="body2"
          color="#515151"
          text="Preview each activity in the library by selecting Demo. Utilize the filter below to assist in choosing the best activity type for your content."
        />
      </div>
      <div className="search-card-singleActivity">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search activity"
            onChange={(e) => {
              if (e.target.value == "") {
                setAllSingleActivities(allActivity);
              } else {
                setAllSingleActivities(
                  allActivity?.filter((data) =>
                    data.title
                      .toLowerCase()
                      .includes(e.target.value.trim().toLowerCase())
                  )
                );
              }
            }}
          />
          <img src={searchicon} className="search-icon" alt="" />
        </div>
        <div class="dropdown-activity-select">
          <div className="dropdown-title">
            Filter by activity type
            <img src={arrowdark} alt="arrow" />
          </div>

          <div class="dropdown-content-select">
            {allActivitytypes?.data?.length > 0 &&
              allActivitytypes?.data?.map((data, counter) => {
                return (
                  <label>
                    <input
                      checked={filterData.includes(data.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilterData([...filterData, data.id]);
                        } else {
                          setFilterData(
                            filterData.filter((ids) => ids !== data.id)
                          );
                        }
                      }}
                      type="checkbox"
                      name={counter}
                    />
                    {data.title}
                  </label>
                );
              })}
          </div>
        </div>

        {allActivitiesSingle?.length > 10 && (
          <ConfigButtons
            changeScreenHandler={changeScreenHandler}
            layout={layout}
            dispatch={dispatch}
          />
        )}
      </div>
      <div className="layout-cards-process-btn">
        <div className="activity-layout-cards" style={{ width: "100%" }}>
          {allActivitiesSingle?.length > 0 &&
            allActivitiesSingle?.map((data) => {
              return (
                filterData.includes(data.activityType?.id) && (
                  <LayoutCard
                    image={data.image}
                    text={data.title}
                    className={
                      layout?.title == data.title
                        ? "activity-layoutCard-active mr-3 add-card"
                        : "mr-3 add-card"
                    }
                    onClick={() => {
                      if (data?.title === "Interactive Video") {
                        setLayout(data);
                        changeScreenHandler("addvideo");
                      } else {
                        setLayout(data);
                      }
                    }}
                    btnTextOne="Demo"
                    btnTextTwo="Video"
                    setCurrentActivity={setCurrentActivity}
                    setActiveType={setActiveType}
                    setModalShow={setModalShow}
                    activity={data}
                  />
                )
              );
            })}
        </div>
      </div>
      <ConfigButtons
        changeScreenHandler={changeScreenHandler}
        layout={layout}
        dispatch={dispatch}
      />
    </div>
  );
};

const ConfigButtons = ({ changeScreenHandler, layout, dispatch }) => (
  <div className="activity-layout-btns" style={{ display: "flex" }}>
    {/* <Buttons text="Back" secondary={true} width="153px" height="36px" onClick={() => changeScreenHandler('layout')} hover={true} /> */}

    <div className="btns-margin ml-3">
      <Buttons
        text="Select Activity"
        defaultgrey={layout ? false : true}
        width="153px"
        height="36px"
        disabled={layout ? false : true}
        onClick={() => {
          changeScreenHandler("addactivity");
          dispatch({
            type: actionTypes.SET_SELECTED_ACTIVITY,
            payload: layout,
          });
        }}
        className="mr-3"
      />
    </div>
  </div>
);
export default ActivityLayout;
