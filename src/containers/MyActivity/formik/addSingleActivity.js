/* eslint-disable */
import React, { useState, useEffect } from "react";
import HeadingText from "utils/HeadingText/headingtext";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import LayoutCard from "utils/LayoutCard/layoutcard";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

import Tabs from "utils/Tabs/tabs";
import Buttons from "utils/Buttons/buttons";

import { useHistory } from "react-router-dom";
import { getSingleLayoutActivities } from "store/actions/resource";
import * as actionTypes from "store/actionTypes";
import loader from "assets/images/loader.svg";

const ImgLoader = () => <img style={{ width: "100px" }} src={loader} />;
const ActivityLayout = (props) => {
  const [allActivitiesSingle, setAllSingleActivities] = useState(null);
  const { changeScreenHandler } = props;
  const history = useHistory();
  const [layout, setLayout] = useState({ title: "Interactive Book" });
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
    dispatch(getSingleLayoutActivities());
  }, []);
  const allActivity = useSelector((state) => state.myactivities.singleLayout);
  useEffect(() => {
    setLayout(allActivity?.[0] || null);
    setAllSingleActivities(allActivity);
    if (allActivity) {
      toast.dismiss();
    }
  }, [allActivity]);
  return (
    <div className="activity-layout-form">
      <div className="activity-layout-tabs">
        <Tabs text="1. Select a layout" tabActive={true} />
        <Tabs text="2.Layout description + activities" className="ml-10 " />
      </div>
      <div className="activity-layout-title">
        <HeadingTwo text="Select a layout" color="#084892" />
      </div>

      <div className="search-card-singleActivity">
        <input
          type="text"
          placeholder="Search Activities"
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
          {allActivitiesSingle?.map((data) => {
            return (
              <LayoutCard
                image={data.image}
                text={data.title}
                className={
                  layout?.title == data.title
                    ? "activity-layoutCard-active mr-3"
                    : "mr-3"
                }
                onClick={() => setLayout(data)}
              />
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
    <Buttons
      text="Back"
      secondary={true}
      width="153px"
      height="36px"
      onClick={() => changeScreenHandler("layout")}
      hover={true}
    />

    <div className="btns-margin ml-3">
      <Buttons
        text="Select Layout"
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
