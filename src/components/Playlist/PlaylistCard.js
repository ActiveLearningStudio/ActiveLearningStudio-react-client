import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import {
	loadProjectPlaylistsAction,
	reorderPlaylistActivitiesAction,
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

	onDragEnd = (e) => {
		if(e.destination.index == e.source.index)
			return;

		let resources = Array.from(this.props.playlist.resources);
		const [removed] = resources.splice(e.source.index, 1);
		resources.splice(e.destination.index, 0, removed);
		const reorderedPlaylist = {...this.props.playlist, resources: resources};
		this.props.reorderPlaylistActivitiesAction(reorderedPlaylist);
	}

	renderResources() {
		if (
			!this.props.playlist.resources ||
			this.props.playlist.resources.length == 0
		)
			return (
				<div className="alert alert-info m-3">No resources yet.</div>
			);

		return this.props.playlist.resources.map((resource, index) => (
			<ResourceCard
				resource={resource}
				key={resource.id}
				index={index}
			/>
		));
	}

	render() {
		return (
			<div
				className="list-wrapper"
				key={this.props.playlist._id}
			>
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
					<DragDropContext onDragEnd={this.onDragEnd}>
						<Droppable droppableId={this.props.playlist._id}>
							{(provided) => (
								<div
									className="list-body"
									{...provided.droppableProps}
									ref={provided.innerRef}
								>
									{this.renderResources()}
									{provided.placeholder}
									<button
										onClick={this.handleAddNewResourceClick}
										className="add-resource-to-playlist-btn"
									>
										New Resource
									</button>
								</div>
							)}
						</Droppable>
					</DragDropContext>
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
	reorderPlaylistActivitiesAction: (playlist) =>
		dispatch(
			reorderPlaylistActivitiesAction(playlist)
		),
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
