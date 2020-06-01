import React from "react";
import { Link } from "react-router-dom";
import "./ActivityPreviewCard.scss";

const ActivityPreviewCard = (props) => {
	console.log(props);
	const activity = props.activity;
    return (
        <li>
            <Link href={"/resource/preview/" + activity._id}>
                <div className="playimg">
                    <img src={ global.config.laravelAPIUrl + activity.thumb_url }></img>
                </div>
                <div className="plydet">
                    {activity.title}
                </div>
            </Link>
        </li>
  	);
}

export default ActivityPreviewCard;