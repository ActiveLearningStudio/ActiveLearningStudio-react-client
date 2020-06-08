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
      <div className="small-thumb">
        <div
          className="list-img-thumbnail"
          style={{
            backgroundImage:
              "url(" + global.config.laravelAPIUrl + activity.thumb_url + ")",
          }}
        ></div>
      </div>
      <div className="panel-heading">{activity.title}</div>
      <div className="list-inline">
        <div className="inline-img">
          {/* <img src="/images/icon-pic.png" alt="icon-pic"></img>
                <img src="/images/icon-play.png" alt="icon-play"></img>
                <img src="/images/icon-list.png" alt="icon-list"></img> */}
        </div>
      </div>
      <div class="date">{new Date(activity.created_at).toDateString()}</div>
    </li>
  );
};

export default ActivityPreviewCard;
