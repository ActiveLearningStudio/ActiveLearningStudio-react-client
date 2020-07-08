import React from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import logo from "../../images/logo.svg";
import {
  changePlaylistTitleAction,
  reorderPlaylistActivitiesAction,
  clickPlaylistTitleAction,
} from "../../actions/playlist";
import { showDeletePopupAction, hideDeletePopupAction } from "../../actions/ui";
import ResourceCard from "../Resource/ResourceCard";
import Sharelink from "../Resource/sharelinks";
export class PlaylistCard extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete = (e) => {
    e.preventDefault();
    this.props.showDeletePopupAction(
      this.props.playlist._id,
      this.props.playlist.title,
      "Playlist"
    );
  };

  handleAddNewResourceClick = () => {
    if (!this.props.handleCreateResource)
      return console.log("Event handler handleCreateResource() not defined.");

    this.props.handleCreateResource(this.props.playlist);
  };

  renderResources() {
    if (
      !this.props.playlist.resources ||
      this.props.playlist.resources.length == 0
    )
      return <div className="alert alert-info m-3">No resources yet.</div>;

    return this.props.playlist.resources.map((resource, index) => (
      <ResourceCard
        {...this.props}
        resource={resource}
        key={resource._id}
        index={index}
      />
    ));
  }

  async handleClickPlaylistTitle(playlistid) {
    await this.props.clickPlaylistTitleAction(playlistid);
    this.titleInput.focus();
  }

  onEnterPress(e) {
    if (e.charCode == 13) {
      this.titleInput.blur();
    }
  }

  render() {
    console.log(this.props);
    return (
      <Draggable
        key={this.props.playlist._id}
        draggableId={this.props.playlist._id}
        index={this.props.index}
      >
        {(provided) => (
          <div
            className="list-wrapper"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div className="list">
              <div className="list-header" {...provided.dragHandleProps}>
                <h2 className="list-header-name">
                  <span
                    onClick={(id) =>
                      this.handleClickPlaylistTitle(this.props.playlist._id)
                    }
                    style={{ cursor: "pointer" }}
                    className={
                      this.props.playlistTitleClicked ? "hide" : "show"
                    }
                  >
                    {this.props.title}
                  </span>
                  <textarea
                    ref={(input) => {
                      this.titleInput = input;
                    }}
                    name="playlist-title"
                    className={
                      this.props.playlistTitleClicked ? "show" : "hide"
                    }
                    onBlur={(e, id) =>
                      this.props.changePlaylistTitleAction(
                        e,
                        this.props.playlist._id
                      )
                    }
                    onKeyPress={(e) => this.onEnterPress(e)}
                    defaultValue={this.props.title}
                  ></textarea>
                  <div className="dropdown pull-right playlist-dropdown check">
                    <button
                      className="btn project-dropdown-btn"
                      type="button"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <Link
                        className="dropdown-item hidden"
                        to={
                          "/playlist/preview/" + this.props.playlist._id
                          // "/project/preview2/" +
                          // this.props.match.params.projectid
                        }
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i> Preview
                      </Link>
                      {/* <a
												className="dropdown-item"
												href="#"
											>
												<i
													className="fa fa-pencil"
													aria-hidden="true"
												></i>{" "}
												Edit
											</a> */}
                      {/* <a
                        className="dropdown-item"
                        onClick={() => {
                          Swal.fire({
                            title: "STAY TUNED!",
                            text: "COMING SOON",
                            imageUrl: logo,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: "Custom image",
                          });
                        }}
                      >
                        <i className="fa fa-share" aria-hidden="true"></i> Send
                        To
                      </a> */}
                      <Sharelink
                        playlistID={this.props.playlist._id}
                        playlistName={this.props.title}
                        projectName={
                          this.props.projectId.selectedProject &&
                          this.props.projectId.selectedProject.name
                        }
                      />
                      {/*} <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open("/api/download/project/123");
                        }}
                      >
                        <i
                          className="fa fa-cloud-download"
                          aria-hidden="true"
                        ></i>{" "}
                        Executable
                      </a> */}
                      <a className="dropdown-item" onClick={this.handleDelete}>
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
              <Droppable
                droppableId={this.props.playlist._id}
                type="resource"
                key={this.props.playlist._id}
              >
                {(provided) => (
                  <div
                    className="list-body"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <div className="playlist-resources">
                      {this.renderResources()}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
              <div className="playlist-add-res-button">
                <button
                  onClick={this.handleAddNewResourceClick}
                  className="add-resource-to-playlist-btn"
                >
                  <i className="fa fa-plus-circle" aria-hidden="true"></i> Add
                  new resource
                </button>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  showDeletePopupAction: (id, title, deleteType) =>
    dispatch(showDeletePopupAction(id, title, deleteType)),
  hideDeletePopupAction: () => dispatch(hideDeletePopupAction()),
  reorderPlaylistActivitiesAction: (playlist) =>
    dispatch(reorderPlaylistActivitiesAction(playlist)),
  changePlaylistTitleAction: (e, id) =>
    dispatch(changePlaylistTitleAction(e, id)),
  clickPlaylistTitleAction: (playlistid) =>
    dispatch(clickPlaylistTitleAction(playlistid)),
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
