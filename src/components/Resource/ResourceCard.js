import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";

import {
	showDeletePlaylistPopupAction,
	hideDeletePlaylistModalAction,
} from "../../actions/ui";
import './ResourceCard.scss';

export class ResourceCard extends React.Component {
	constructor(props) {
		super(props);
	}

	handleDelete = (e) => {
		e.preventDefault();
		// This function is overloaded. Should redefine it to not be related to playlist
		this.props.showDeletePlaylistPopupAction(
			this.props.resource._id,
			this.props.resource.title,
			"Activity"
		);
	};

	dragStart = (e) => {
		e.target.classList.add("resource-drag-gray");
		e.dataTransfer.setData("draggableId", this.props.resource._id);
		e.dataTransfer.setData(
			this.props.resource._id,
			this.props.resource._id
		);
	};

	dragEnd = (e) => {
		e.target.classList.remove("resource-drag-gray");
	};

	dragEnter = (e) => {
		const draggableId = e.dataTransfer.getData("text/plain");
		if (!e.dataTransfer.types.includes(this.props.resource._id))
			e.target.classList.add("resource-drag-dashed");
	};

	dragLeave = (e) => {
		e.target.classList.remove("resource-drag-dashed");
	};

	dropped = (e) => {
		e.target.classList.remove("resource-drag-dashed");
		if (!this.props.resourceDropped)
			return console.log("No drop event handler defined");

		this.props.resourceDropped(
			e.dataTransfer.getData("draggableId"),
			this.props.resource._id
		);
	};

	dragOver = (e) => {
		e.preventDefault();
	};

	render() {
		return (
			<div
				className="playlist-resource"
				key={this.props.resource._id}
				draggable="true"
				onDragStart={this.dragStart}
				onDragEnd={this.dragEnd}
				onDragEnter={this.dragEnter}
				onDragLeave={this.dragLeave}
				onDrop={this.dropped}
				onDragOver={this.dragOver}
			>
				<div className="row">
					<div className="col-md-3">
						<Link
							to={
								"/resource/preview/" +
								this.props.resource.id
							}>
							{
								this.props.resource.metadata ?
									<div className="activity-thumb" style={{ 'background-image': 'url(' + this.props.resource.metadata.thumb_url + ')' }}></div>
									: null
							}

						</Link>
					</div>
					<div className="col-md-7">
						<h3 className="title">
							<Link
								to={
									"/resource/preview/" +
									this.props.resource.id
								}>{this.props.resource.title}
							</Link>
						</h3>
					</div>
					<div className="col-md-2">
						<div className="activity-options">
							<div className="dropdown pull-right">
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
											"/resource/preview/" +
											this.props.resource.id
										}
									>
										<i
											className="fa fa-eye"
											aria-hidden="true"
										></i>{" "}
										Preview
									</Link>
									<Link className="dropdown-item"
										to={"/project/" + this.props.match.params.projectid + "/playlist/" + this.props.playlist._id + "/activity/create/" + this.props.resource._id}>
										<i
											className="fa fa-pencil"
											aria-hidden="true"
										></i>{" "}
										Edit
									</Link>
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
						</div>
					</div>
				</div>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => ({
	loadPlaylistAction: (playlistid) =>
		dispatch(loadPlaylistAction(playlistid)),
	showDeletePlaylistPopupAction: (id, title, deleteType) =>
		dispatch(showDeletePlaylistPopupAction(id, title, deleteType)),
	hideDeletePlaylistModalAction: () =>
		dispatch(hideDeletePlaylistModalAction()),
});

const mapStateToProps = (state) => {
	return {};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(ResourceCard)
);
