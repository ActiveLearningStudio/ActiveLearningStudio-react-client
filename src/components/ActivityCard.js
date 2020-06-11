import React from "react";
import { Link } from "react-router-dom";
import "./ActivityCard.scss";

const ActivityCard = (props) => {
  const activity = props.activity;
  return (
    <li>
      <Link to={"/resource/preview/" + activity._id}>
        <div
          className="playimg"
          style={{
            backgroundImage:
              "url(" + global.config.laravelAPIUrl + activity.thumb_url + ")",
          }}
        ></div>
        <div className="plydet">{activity.title}</div>
      </Link>
    </li>
  );
};

export default ActivityCard;
