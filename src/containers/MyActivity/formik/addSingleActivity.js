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
  const { changeScreenHandler } = props;
  const history = useHistory();
  const [layout, setLayout] = useState({ title: "Interactive Book" });
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSingleLayoutActivities());
  }, []);
  const allActivity = useSelector((state) => state.myactivities.singleLayout);
  useEffect(
    () => () => {
      setLayout(allActivity?.[0] || null);
    },
    [allActivity]
  );
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
        <div className="activity-layout-cards" style={{ width: "100%" }}>
          {allActivity
            ? (toast.dismiss(),
              allActivity.map((data) => {
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
              }))
            : toast.info("Loading Activities ...", {
                className: "project-loading",
                closeOnClick: false,
                closeButton: false,
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 100000,
                icon: ImgLoader,
              })}
        </div>
      </div>
      <div className="activity-layout-btns" style={{ display: "flex" }}>
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
    </div>
  );
};

export default ActivityLayout;
