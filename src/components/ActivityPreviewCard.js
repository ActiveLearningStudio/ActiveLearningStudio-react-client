import React from "react";
// import { Link } from "react-router-dom";
import "./ActivityPreviewCard.scss";
import gifloader from "../images/276.gif";
const ActivityPreviewCard = (props) => {
  const activity = props.activity;

  function onSelect(id) {
    const { handleSelect } = props;
    if (handleSelect) {
      handleSelect(id);
    }
  }

  return (
    <li
      onClick={() => {
        onSelect(activity._id);
        try {
          document.getElementById(
            "curriki-h5p-wrapper"
          ).innerHTML = ` <div class="loader_gif">
            <img src='${gifloader}' alt="" />
          </div>`;
        } catch (e) {}
      }}
    >
      <div>
        <i className="fa fa-play-circle-o" aria-hidden="true"></i>
        <div className="title">{activity.title}</div>
      </div>
      <div className="dated">
        {new Date(activity.created_at).toDateString()}
      </div>
    </li>
  );
};

export default ActivityPreviewCard;
