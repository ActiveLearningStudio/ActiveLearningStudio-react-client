import React from "react";
import { Link } from "react-router-dom";
import "./ActivityCard.scss";

const ActivityCard = (props) => {
  const activity = props.activity;
  const playlist_id = props.playlist_id || "";

  return (
    <li>
      <Link
        to={"/playlist/preview/" + playlist_id + "/resource/" + activity._id}
      >
        <div
          className="playimg"
          style={{
            backgroundImage:
              "url(" + global.config.laravelAPIUrl + activity.metadata.thumb_url + ")",
          }}
        ></div>
        <div className="plydet">{activity.metadata.title}</div>
      </Link>
    </li>
  );
};

export default ActivityCard;
