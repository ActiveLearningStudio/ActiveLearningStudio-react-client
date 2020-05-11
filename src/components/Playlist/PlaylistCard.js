import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import {
	loadProjectPlaylistsAction,
	switchActivitiesAction,
} from "../../actions/playlist";
import {
	showDeletePlaylistPopupAction,
	hideDeletePlaylistModalAction,
} from "../../actions/ui";
import ResourceCard from "../Resource/ResourceCard";

export class PlaylistCard extends React.Component {
	constructor(props) {
		super(props);
	}

	handleDelete = (e) => {
		e.preventDefault();
		this.props.showDeletePlaylistPopupAction(
			this.props.playlist._id,
			this.props.playlist.title,
			"Playlist"
		);
	};

	handleAddNewResourceClick = () => {
		if (!this.props.handleCreateResource)
			return console.log(
				"Event handler handleCreateResource() not defined."
			);

		this.props.handleCreateResource(this.props.playlist);
	};

	resourceDropped = (source, destination) => {
		this.props.switchActivitiesAction(
			this.props.match.params.projectid,
			this.props.playlist._id,
			source,
			destination
		);
	};

	renderResources() {
		if (
			!this.props.playlist.resources ||
			this.props.playlist.resources.length == 0
		)
			return (
				<div className="alert alert-info m-3">No resources yet.</div>
			);

		return this.props.playlist.resources.map((resource) => (
			<ResourceCard
				{...this.props}
				resource={resource}
				key={resource.id}
				resourceDropped={this.resourceDropped}
			/>
		));
	}

	render() {
		return (
			<div className="list-wrapper" key={this.props.playlist._id}>
				<div className="list">
					<div className="list-header">
						<h2 className="list-header-name">
							{this.props.playlist.title}
							<div className="dropdown pull-right playlist-dropdown">
								<button
									className="btn project-dropdown-btn"
									type="button"
									id="dropdownMenuButton"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									<i
										className="fa fa-ellipsis-v"
										aria-hidden="true"
									></i>
								</button>
								<div
									className="dropdown-menu"
									aria-labelledby="dropdownMenuButton"
								>
									<Link
										className="dropdown-item"
										to={
											"/playlist/preview/" +
											this.props.playlist._id
										}
									>
										<i
											className="fa fa-eye"
											aria-hidden="true"
										></i>{" "}
										Preview
									</Link>
									<a className="dropdown-item" href="#">
										<i
											className="fa fa-pencil"
											aria-hidden="true"
										></i>{" "}
										Edit
									</a>
									<a className="dropdown-item" href="#">
										<i
											className="fa fa-share"
											aria-hidden="true"
										></i>{" "}
										Send To
									</a>
									<a
										className="dropdown-item"
										href="#"
										onClick={(e) => {
											e.preventDefault();
											window.open(
												"/api/download/project/123"
											);
										}}
									>
										<i
											className="fa fa-cloud-download"
											aria-hidden="true"
										></i>{" "}
										Executable
									</a>
									<a
										className="dropdown-item"
										onClick={this.handleDelete}
									>
										<i
											className="fa fa-times-circle-o"
											aria-hidden="true"
										></i>{" "}
										Delete
									</a>
								</div>
							</div>
						</h2>
					</div>
					<div className="list-body">
						{this.renderResources()}
						<button
							onClick={this.handleAddNewResourceClick}
							className="add-resource-to-playlist-btn"
						>
							New Resource
						</button>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	showDeletePlaylistPopupAction: (id, title, deleteType) =>
		dispatch(showDeletePlaylistPopupAction(id, title, deleteType)),
	hideDeletePlaylistModalAction: () =>
		dispatch(hideDeletePlaylistModalAction()),
	switchActivitiesAction: (project_id, playlist_id, source, destination) =>
		dispatch(switchActivitiesAction(project_id, playlist_id, source, destination)),
});

const mapStateToProps = (state) => {
	return {
		projectId: state.project,
		ui: state.ui,
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(PlaylistCard)
);
