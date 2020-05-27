import React from "react";
import { Link } from "react-router-dom";
import "./ActivityPreviewCard.scss";

const ActivityPreviewCard = (props) => {
	console.log(props);
	const activity = props.activity;
	return (
	    <div className="preview-box">
	      <Link to={"/resource/preview/" + activity._id} style={{background: 'url('+global.config.laravelAPIUrl+activity.thumb_url+') no-repeat center center', display:'block', backgroundSize:'cover'}}>
			  	
	            {/* {activity.library_name == 'H5P.InteractiveVideo' ? <img className="activity-image-thumb img-fluid img-radius-all" src="/images/interactive-video-overlay.png"   />:null }
	            {activity.library_name == 'H5P.Flashcards' ? <img className="activity-image-thumb img-fluid img-radius-all" src="/images/flash-cards-overlay.png"   />:null }
	            {activity.library_name == 'H5P.DragQuestion' ? <img className="activity-image-thumb img-fluid img-radius-all" src="/images/drag-and-drop-overlay.png"   />:null }
	            {activity.library_name == 'H5P.Timeline' ? <img className="activity-image-thumb img-fluid img-radius-all" src="/images/timeline-overlay.png"   />:null }
	            {activity.library_name == 'H5P.Accordion' ? <img className="activity-image-thumb img-fluid img-radius-all" src="/images/accordion-overlay.png"   />:null }
	            {activity.library_name == 'H5P.CoursePresentation' ? <img className="activity-image-thumb img-fluid img-radius-all" src="/images/course-presentation-overlay.png"   />:null } */}
	      </Link>
	      <div className="preview-box-content">
	        <h5 className="card-title">
	          <Link to={"/resource/preview/" + activity._id}>
	            {activity.title}
	          </Link>
	        </h5>
	        {/* <Link className="btn btn-primary" to={"/resource/preview/" + activity.mysqlid}>
	          <i className="fa fa-arrow-right" aria-hidden="true"></i>
	        </Link> */}
	      </div>
	    </div>
  	);
}

export default ActivityPreviewCard;