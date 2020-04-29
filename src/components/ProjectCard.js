import React from "react";
import { Link } from "react-router-dom";
import "./ProjectCard.scss";

const ProjectCard = (props) => (
	<div className="col-md-3" key={props.project._id}>
		<div className="program-tile">
		  <div className="program-thumb">
		    <Link to={"/project/"+props.project._id}>
		      <img src="/images/program-thumb.png" className="img-fluid" />
		    </Link>
		  </div>
		  <div className="program-content">
		    <div className="row">
		      <div className="col">
		        <h3 className="program-title">
		          <Link to={"/project/"+props.project._id}>
		            {props.project.name}
		          </Link>
		        </h3>
		        <div className="program-creator">
		          <span>Created by <Link to="/">Leo</Link></span>
		        </div>
		      </div>
		      <div className="col">
		        <div className="dropdown pull-right">
		          <button className="btn project-dropdown-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		            <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
		          </button>
		          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
		            <a className="dropdown-item" href="#"><i class="fa fa-eye" aria-hidden="true"></i> Preview</a>
		            <a className="dropdown-item" href="#"><i class="fa fa-pencil" aria-hidden="true"></i> Edit</a>
		            <a className="dropdown-item" href="#"><i class="fa fa-share" aria-hidden="true"></i> Send To</a>
		            <a className="dropdown-item" href="#"><i class="fa fa-times-circle-o" aria-hidden="true"></i> Delete</a>
		          </div>
		        </div>
		      </div>
		    </div>
		    <div className="lessons-duration">
		      <div className="lessons">
		        <span className="icon"></span><span>Lesson: 07</span>
		      </div>
		      <div className="duration">
		        <span className="icon"></span><span>Duration: 4 Hr</span>
		      </div>
		    </div>
		    <div className="go-to-playlist">
		      <Link to={"/project/"+props.project._id}>
		        <img src="/images/program-playlist-arrow.png" alt="Go to Playlist" />
		      </Link>
		    </div>
		  </div>
		</div>
	</div>
  )

export default ProjectCard;