import React from "react";
import { Link } from "react-router-dom";

const ResourceCard = (props) => {
	return (
		<div className="playlist-resource" key={props.resource.id}>
			<div className="row">
				<div className="col-md-10">
					<h3 className="title">{props.resource.title}</h3>
				</div>
				<div className="col-md-2">
					<div className="activity-options">
					<div className="dropdown pull-right">
						<button className="btn project-dropdown-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
							<i className="fa fa-ellipsis-v" aria-hidden="true"></i>
						</button>
						<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
							<Link className="dropdown-item" to={"/resource/preview/"+props.resource.id}><i className="fa fa-eye" aria-hidden="true"></i> Preview</Link>
							<a className="dropdown-item" href="#"><i className="fa fa-pencil" aria-hidden="true"></i> Edit</a>
							<a className="dropdown-item" href="#"><i className="fa fa-share" aria-hidden="true"></i> Send To</a>
							<a className="dropdown-item" href="#"><i className="fa fa-times-circle-o" aria-hidden="true"></i> Delete</a>
						</div>
					</div>
				</div>
				</div>
			</div>
		</div>
	)
}

export default ResourceCard;