import React from "react";
// import { Link } from "react-router-dom";
import "./ActivityPreviewCard.scss";

const ActivityPreviewCard = (props) => {
  const activity = props.activity;

  function onSelect(id) {
    const { handleSelect } = props;
    if (handleSelect) {
      handleSelect(id);
    }
  }

  return (
    <li onClick={() => onSelect(activity._id)}>
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
