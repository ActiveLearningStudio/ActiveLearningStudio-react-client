import React from "react";
import { Link } from "react-router-dom";
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
						<div className="item">
							<div className="icon-box mb-2 justify-content-center align-items-center ">
								{/* <i className="fa fa-check active"></i> */}
								<Link to={"/resource/preview/" + activity.mysqlid}>
									<img className="activity-image-thumb img-fluid img-radius-all" src="http://learn.curriki.org/storage/lesson_thumbnails/VDiZoNsO7hHW6iBrU2lF2pYP55KFNmJD84AJpgq0.png" width="50" height="50" alt="Introduction to Avengers: The Story of Globalization" />
								</Link>
							</div>
							<p>
								<Link to={"/resource/preview/" + activity.mysqlid}>
									{activity.title}
								</Link>
							</p>
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
						<h4>{playlist.title}</h4>
						{activities}
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
		{/* <div className="" id="createPlaylistModal"  role="dialog" aria-labelledby="createPlaylistModalLabel" aria-hidden="true">
			<div className="modal-dialog" role="document">
				<div className="modal-content">
					<div className="modal-title">
						<h1>
							Project Preview
					        <Link to="/" className="close" data-dismiss="modal" aria-label="Close">
					          <span aria-hidden="true">&times;</span>
					        </Link>
						</h1>
						<hr />
					</div>

					<div className="modal-body">
						
					</div>
				</div>
			</div>
		</div> */}
	</div>
	);
}

export default ProjectPreview;