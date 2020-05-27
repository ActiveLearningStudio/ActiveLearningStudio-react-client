import React from "react";
import { Link } from "react-router-dom";
import "./ProjectPreviewModal.scss";

const ProjectPreviewModal = (props) => {
	if(props.project.playlists.length > 0){
		var playlists = props.project.playlists.map(playlist => {
			if(playlist.activities.length > 0){
				var activities = playlist.activities.map(activity => (<p>this is an activity</p>));
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
					<div className="col">
						<h4>{playlist.title}</h4>
						{activities}
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
	<div className="resource-modal">
		<div className="modal fade right" id="createPlaylistModal"  role="dialog" aria-labelledby="createPlaylistModalLabel" aria-hidden="true">
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
						<div className="row">
							<div className="col-4">
								<div className="row">
									<div className="col">
										<img src={global.config.laravelAPIUrl+props.project.thumb_url} className="img-fluid project-preview-thumbnail" />
									</div>
								</div>
								<div className="row mt-4">
									<div className="col">
										<h2>{props.project.name}</h2>
										<p>{props.project.description}</p>
									</div>
								</div>
							</div>
							<div className="col-8">
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
			</div>
		</div>
	</div>
	);
}

export default ProjectPreviewModal;