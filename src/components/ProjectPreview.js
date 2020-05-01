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
						<div className="col-md-3">
							<ActivityPreviewCard activity={activity} key={activity._id}/>
						</div>						
					)
				});
			} else {
				var activities = (
					<div className="col-md-12">
						<div className="alert alert-info" role="alert">
							No activities defined for this playlist.
						</div>
					</div>
				);
			}

			return (
				<div className="row" key={playlist._id}>
					<div className="col-md-12">
						<div className="row">
							<div className="col-md-12">
								<h4 className="playlist-title">{playlist.title}</h4>
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
			<div className="col-md-12">
				<div className="alert alert-info" role="alert">
  					No playlists defined for this project.
				</div>
			</div>
		);
	}

	return (
		
	<div className="row">
		<div className="container">
			<div className="row">
				<div className="col-md-2">
					<div className="">
						<Link to={"/project/"+currentProject._id}>
							<img src={currentProject.thumb_url} className="img-fluid project-preview-thumbnail" />
						</Link>
						<h2>{currentProject.name}</h2>
						<p>{currentProject.description}</p>
					</div>
				</div>
				<div className="col-md-10">
					<div className="playlist-preview-wrapper">
						<div className="preview-header">
							Playlists
						</div>
						<div className="playlist-preview-content">
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