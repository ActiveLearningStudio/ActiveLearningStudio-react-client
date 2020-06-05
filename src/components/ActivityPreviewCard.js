import React from "react";
// import { Link } from "react-router-dom";
import "./ActivityPreviewCard.scss";

const ActivityPreviewCard = (props) => {
  const activity = props.activity;

  function onSelect(id) {
    const {
      handleSelect
    } = props;
    if (handleSelect) {
      handleSelect(id);
    }
  }

  return (
    <li onClick={()=>onSelect(activity._id)}>
        <div className="small-thumb">
            <img src={ global.config.laravelAPIUrl + activity.thumb_url } alt="thumb"></img>
        </div>
        <div className="panel-heading">{activity.title}</div>
        <div className="list-inline">
            <div className="inline-img">
                {/* <img src="/images/icon-pic.png" alt="icon-pic"></img>
                <img src="/images/icon-play.png" alt="icon-play"></img>
                <img src="/images/icon-list.png" alt="icon-list"></img> */}
            </div>
      </div>
      <div class="date">Thu Apr 30 2020</div>
    </li>
  );
}

export default ActivityPreviewCard;