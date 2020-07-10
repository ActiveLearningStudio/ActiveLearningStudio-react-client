import React from "react";
// import { Link } from "react-router-dom";
import "./ActivityPreviewCard.scss";

import { Link } from "react-router-dom";
const ActivityPreviewCarddropdown = (props) => {
  const activity = props.activity;

  function onSelect(id) {
    const { handleSelect } = props;
    if (handleSelect) {
      handleSelect(id);
    }
  }

  return (
    <>
      {!!props.shared ? (
        <Link
          to={
            "/playlist/shared/preview/" +
            props.playlist +
            "/resource/" +
            activity._id
          }
        >
          <li className="drpdown">
            <div>
              <i class="fa fa-play-circle" aria-hidden="true"></i>
              <div className="title">{activity.title}</div>
            </div>
          </li>
        </Link>
      ) : (
        <Link
          to={
            props.lti
              ? "/playlist/lti/preview/" +
                props.playlist +
                "/resource/" +
                activity._id
              : "/playlist/preview/" +
                props.playlist +
                "/resource/" +
                activity._id
          }
        >
          <li className="drpdown">
            <div>
              <i class="fa fa-play-circle" aria-hidden="true"></i>
              <div className="title">{activity.title}</div>
            </div>
          </li>
        </Link>
      )}
    </>
  );
};

export default ActivityPreviewCarddropdown;
