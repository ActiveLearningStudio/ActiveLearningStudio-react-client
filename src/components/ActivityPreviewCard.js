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
        <a href="#" onClick={()=>onSelect(activity._id)}>
            <li data-attr={activity._id}>
                <div className="small-thumb">
                    <img src={ global.config.laravelAPIUrl + activity.thumb_url } alt="thumb"></img>
                </div>
                <div className="panel-heading">{activity.title}</div>
                <div className="list-inline">
                    <div className="inline-img">
                        {/* <Link to="#"> */}
                            <img src="/images/icon-pic.png" alt="icon-pic"></img>
                        {/* </Link> */}
                        {/* <Link to="#"> */}
                            <img src="/images/icon-play.png" alt="icon-play"></img>
                        {/* </Link>
                        <Link to="#"> */}
                            <img src="/images/icon-list.png" alt="icon-list"></img>
                        {/* </Link> */}
                    </div>
                </div>
            </li>
        </a>
    );
}

export default ActivityPreviewCard;