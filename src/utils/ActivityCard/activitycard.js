/* eslint-disable */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Jeshoots from "assets/images/jeshoots.svg";
import "./activitycard.scss";
import CardImage from "assets/images/activitycard.png";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faShare, faShareAlt } from "@fortawesome/free-solid-svg-icons";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import PropTypes from "prop-types";
import { icon } from "@fortawesome/fontawesome-svg-core";
import ActivityCardDropDown from "utils/ActivityCardDropDown/activitycarddropdown";

const ActivityCardBox = ({ img, title, description, listView }) => {
  return (
    <div className="curriki-utility-activity-card">
      <div
        className={
          listView
            ? "published_card  "
            : "published_card published-card-detail-body  "
        }
      >
        <div className="published_card_header">
          <div className="published_card_text">
            <p>
              <span></span> Published
            </p>
          </div>
          <div className="published_card_icon">
            <ActivityCardDropDown />
          </div>
        </div>
        <div
          className={listView ? "published-card-detail-body-listview" : null}
        >
          <div className="published-card-image">
            <img src={img} alt="" />
          </div>
          <div className="published-card-detail">
            <div className="published-card-title">
              <h4>{title}</h4>
            </div>
            <div className="published-card-dialog">
              <img src={Jeshoots} alt="" />
              <p>Dialog Card</p>
            </div>
            <div className="published-card-descrption">
              <p>{description}</p>
              {/* <h3>Completed: 100%</h3> */}
            </div>
            <div
              className={
                listView
                  ? "published-card-in-links published-card-in-links-list-view"
                  : "published-card-in-links"
              }
            >
              {/* <h3>Published in</h3> */}
              <div className="published-card-complete-status">
                <h3>Completed: 100%</h3>
              </div>

              <div
                className={
                  listView
                    ? "published-card-links published-card-links-list-view"
                    : "published-card-links"
                }
              >
                <div className="published-title">
                  <span>Published in</span>
                </div>

                <a className="card-links list-view-ml-5" href="#">
                  Project #4
                </a>
                <a className="card-links" href="#">
                  Project #2
                </a>
                <FontAwesomeIcon
                  icon={faShareAlt}
                  className="published-share-icon"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ActivityCardBox.prototype = {
  img: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  listView: PropTypes.bool,
};
export default ActivityCardBox;
