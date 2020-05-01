import React from "react";
import { Link } from "react-router-dom";
import ActivityPreviewCard from "./ActivityPreviewCard";
import "./ProjectPreviewModal.scss";


const ProjectPreview = (props) => {
	var currentProject = {
		'name':'',
		'description':'',
		'thumb_url':'',
		'playlists':[]
	};
	
	props.project.projects.forEach((project, i) => {
		if( project._id == props.match.params.projectid ){
			currentProject = project;
		};
	});
	
	if(currentProject != null ){
		var playlists = currentProject.playlists.map(playlist => {
			if(playlist.activities.length > 0){
				var activities = playlist.activities.map(activity => {
					return (
						<div className="col">
							<ActivityPreviewCard activity={activity} key={activity._id}/>
						</div>						
					)
				});
			} else {
				var activities = (
					<div className="alert alert-info" role="alert">
		  				No activities defined for this playlist.
					</div>
				);
			}

			return (
				<div className="row" key={playlist._id}>
					<div className="col">
						<div className="row">
							<div className="col">
								<h4>{playlist.title}</h4>
							</div>
						</div>
						<div className="row">
							{activities}
						</div>
					</div>
				</div>
			);
		});
	} else {
		var playlists = (
			<div className="alert alert-info" role="alert">
  				No playlists defined for this project.
			</div>
		);
	}

	return (
		
	<div className="row">
		<div className="container">
			<div className="row">
				<div className="col-3">
					<div className="row">
						<div className="col">
							<Link to={"/project/"+currentProject._id}>
								<img src={currentProject.thumb_url} className="img-fluid project-preview-thumbnail" />
							</Link>
						</div>
					</div>
					<div className="row mt-4">
						<div className="col">
							<h2>{currentProject.name}</h2>
							<p>{currentProject.description}</p>
						</div>
					</div>
				</div>
				<div className="col-9">
					<div className="card">
						<div className="card-header">
							Playlists
						</div>
						<div className="card-body">
							{playlists}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	);
}

export default ProjectPreview;