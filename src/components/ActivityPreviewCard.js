import React from "react";
import { Link } from "react-router-dom";
import "./ActivityPreviewCard.scss";

const ActivityPreviewCard = (props) => {
	console.log(props);
	const activity = props.activity;
    return (
        <li>
            <a href={"/resource/preview/" + activity._id}>
                <div className="playimg">
                    <Link to={"/resource/preview/" + activity._id}
                        style={{ background: 'url(' + global.config.laravelAPIUrl + activity.thumb_url + ') no-repeat center center', display: 'block', backgroundSize: 'cover' }}>
                    </Link>
                </div>
                <div className="plydet">
                    {activity.title}
                </div>
            </a>
        </li>
  	);
}

export default ActivityPreviewCard;