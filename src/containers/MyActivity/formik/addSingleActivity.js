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
import BackToSmSvg from "iconLibrary/mainContainer/BackToSmSvg";
import SearchInputMdSvg from "iconLibrary/mainContainer/SearchInputMdSvg";

const ActivityLayout = (props) => {
  const [allActivitiesSingle, setAllSingleActivities] = useState(
    null,
  );
  const {
    changeScreenHandler,
    setActiveType,
    setModalShow,
    setCurrentActivity,
  } = props;
  const history = useHistory();
  const [layout, setLayout] = useState({ title: "Interactive Book" });
  const [filterData, setFilterData] = useState([]);
  const [inputSearch, setInputSearch] = useState("");
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
    dispatch(
      getSingleLayoutActivities(organization?.activeOrganization?.id),
    );
  }, []);
  const allActivity = useSelector(
    (state) => state.myactivities.singleLayout,
  );
  const screenSelectionType = useSelector(
    (state) => state.myactivities.screenSelectionType,
  );
  const allActivitytypes = useSelector(
    (state) => state.resource.types,
  );
  useEffect(() => {
    setAllSingleActivities(allActivity);
    if (allActivity) {
      toast.dismiss();
    }
  }, [allActivity]);

  useEffect(() => {
    setLayout(allActivitiesSingle?.[0] || null);
  }, [allActivitiesSingle]);

  useEffect(() => {
    const setData = [];
    allActivitytypes?.data?.forEach((data) => {
      setData.push(data.id);
    });
    // setFilterData(setData);
  }, [allActivitytypes]);

  useEffect(() => {
    if (inputSearch || filterData.length) {
      setAllSingleActivities(
        allActivity?.filter((data) => {
          if (inputSearch && filterData.length) {
            return (
              filterData
                .map((d) => d?.id)
                .includes(data?.activityType.id) &&
              data.title
                .toLowerCase()
                .includes(inputSearch.trim().toLowerCase())
            );
          }
          if (inputSearch) {
            return data.title
              .toLowerCase()
              .includes(inputSearch.trim().toLowerCase());
          } else {
            return filterData
              .map((d) => d?.id)
              .includes(data?.activityType.id);
          }
        }),
      );
    } else {
      setAllSingleActivities(allActivity);
    }
  }, [inputSearch, filterData]);

  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <div className="activity-layout-form ">
      <div className="activity-layout-tabs">
        <Tabs text="1. Select Activity" tabActive={true} />
        <Tabs
          text="2. Describe and Create Activity"
          className="ml-10 "
        />
        <Tabs text="3. Add interactions" className="ml-10 " />
      </div>
      <div className="upload-back-button">
        <div className="activity-layout-title ">
          <HeadingOne text="Select Activity" color="#084892" />
        </div>
        <div
          className="back-button"
          id="back-button-none-bg"
          onClick={() => changeScreenHandler("layout")}
        >
          <BackToSmSvg primaryColor={primaryColor} />
          <p style={{ marginLeft: "8px" }}>Cancel</p>
        </div>
      </div>
      <div className="activity-layout-paragraph">
        <Headings
          headingType="body2"
          color="#515151"
          text="Preview an example of each activity type by selecting Sample. Use the filter below to assist in choosing the best activity type for your content."
        />
      </div>
      <div className="search-card-singleActivity">
        <div className="search_filter_div">
          <div className="input-group search-input-singleActivity">
            <input
              type="text"
              placeholder="Search activity types..."
              onChange={(e) => setInputSearch(e.target.value)}
            />

            <SearchInputMdSvg
              primaryColor={primaryColor}
              className="search-icon"
            />
          </div>
          <div class="dropdown-activity-select filter_ml_50">
            <div className="dropdown-activity-select-inner-div">
              <div>
                <span className="filter_title">Filter by</span>
              </div>
              <div>
                <div className="dropdown-title">
                  <div
                    style={{
                      width: "160px",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {filterData?.length
                      ? filterData?.map((item, i) => (
                          <span key={i}>{item.title}</span>
                        ))
                      : "-----"}
                  </div>
                  <img src={arrowdark} alt="arrow" />
                </div>
                <div class="dropdown-content-select">
                  {allActivitytypes?.data?.length > 0 &&
                    allActivitytypes?.data?.map((data, counter) => {
                      return (
                        <label>
                          <input
                            value={data.id}
                            checked={filterData
                              .filter((data) => data.id)
                              .map((data) => data.id)
                              .includes(data.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFilterData([...filterData, data]);
                              } else {
                                setFilterData(
                                  filterData.filter(
                                    (ids) => ids.id !== data.id,
                                  ),
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
            </div>
          </div>
        </div>

        {/*<ConfigButtons
          count={allActivitiesSingle?.length}
          changeScreenHandler={changeScreenHandler}
          layout={layout}
          dispatch={dispatch}
          screenSelectionType={screenSelectionType}
                  />*/}
      </div>
      <div className="layout-cards-process-btn">
        <div
          className="activity-layout-cards"
          style={{ width: "100%" }}
        >
          {allActivitiesSingle?.length > 0 &&
            allActivitiesSingle?.map((data) => (
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
                    dispatch({
                      type: actionTypes.SET_SELECTED_ACTIVITY,
                      payload: data,
                    });
                    changeScreenHandler("addvideo");
                  } else {
                    changeScreenHandler("addactivity");
                    dispatch({
                      type: actionTypes.SET_SELECTED_ACTIVITY,
                      payload: data,
                    });
                  }
                }}
                btnTextOne="Demo"
                btnTextTwo="Video"
                setCurrentActivity={setCurrentActivity}
                setActiveType={setActiveType}
                setModalShow={setModalShow}
                activity={data}
              />
            ))}
        </div>
      </div>
      {/* {allActivitiesSingle?.length > 10 && !filterData.length && (
        <ConfigButtons count={allActivitiesSingle?.length} changeScreenHandler={changeScreenHandler} layout={layout} dispatch={dispatch} />
      )} */}
    </div>
  );
};

const ConfigButtons = ({
  changeScreenHandler,
  layout,
  dispatch,
  count,
  screenSelectionType,
}) => (
  <div className="activity-layout-btns" style={{ display: "flex" }}>
    {/* <Buttons text="Back" secondary={true} width="153px" height="36px" onClick={() => changeScreenHandler('layout')} hover={true} /> */}

    <div className="btns-margin ml-3">
      <Buttons
        disabled={count > 0 ? false : true}
        text="Select"
        defaultgrey={count > 0 ? false : true}
        width="91px"
        height="36px"
        onClick={() => {
          changeScreenHandler("addactivity");
          dispatch({
            type: actionTypes.SET_SELECTED_ACTIVITY,
            payload: layout,
            // screenSelectionType: screenSelectionType || '',
          });
        }}
        className="mr-3"
      />
    </div>
  </div>
);
export default ActivityLayout;
