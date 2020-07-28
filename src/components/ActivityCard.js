import React from "react";
import { Link } from "react-router-dom";
import "./ActivityCard.scss";

const ActivityCard = (props) => {
  const activity = props.activity;
  const playlist_id = props.playlist_id || "";

  return (
    <li>
      <Link
        to={
          !!props.lti
            ? "/playlist/shared/preview/" +
              playlist_id +
              "/resource/" +
              activity._id
            : "/playlist/preview/" + playlist_id + "/resource/" + activity._id
        }
      >
        <div
          className="playimg"
          style={{
            backgroundImage: !!activity.metadata
              ? "url(" +
                global.config.laravelAPIUrl +
                activity.metadata.thumb_url +
                ")"
              : "url(" + global.config.laravelAPIUrl + activity.thumb_url + ")",
          }}
        ></div>
        <div className="plydet">
          {!!activity.metadata ? activity.metadata.title : activity.title}
        </div>
      </Link>
    </li>
  );
};

export default ActivityCard;
