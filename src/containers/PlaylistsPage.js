import React from "react";
import { connect } from "react-redux";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import validator from "validator";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  BrowserRouter as Router,
  withRouter,
  Switch,
  Route,
  Link,
} from "react-router-dom";

import {
  createPlaylistAction,
  deletePlaylistAction,
  showCreatePlaylistModalAction,
  hideCreatePlaylistModalAction,
  loadProjectPlaylistsAction,
  reorderPlaylistsAction,
  reorderPlaylistActivitiesAction,
} from "../actions/playlist";
import { showDeletePopupAction, hideDeletePopupAction } from "./../actions/ui";
import {
  deleteResourceAction,
  createResourceAction,
  showCreateResourceModalAction,
  hideCreateResourceModalAction,
  previewResourceAction,
  hidePreviewResourceModalAction,
  createResourceByH5PUploadAction,
  editResourceAction,
  showCreateResourceActivityAction,
  onChangeActivityTypeAction,
  onChangeActivityAction,
  uploadResourceThumbnailAction,
  showDescribeActivityAction,
  showBuildActivityAction,
} from "../actions/resource";
import {
  showCreateProjectModalAction,
  loadProjectAction,
} from "../actions/project";
import { LoadLMS } from "../actions/project";
import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import PreviewResourcePage from "./PreviewResourcePage";
import DeletePopup from "./../components/DeletePopup/DeletePopup";
import PlaylistCard from "../components/Playlist/PlaylistCard";
import PlaylistsLoading from "./../components/Loading/PlaylistsLoading";
import CreatePlaylistPopup from "../components/CreatePlaylistPopup/CreatePlaylistPopup";
import AddResource from "../components/Resource/AddResource";
import EditResource from "../components/Resource/EditResource";

export class PlaylistsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: "",
      playlists: [
        {
          resources: [],
        },
      ],
      title: "",
    };
  }

  escFunction(event) {
    if (event.keyCode === 27) this.props.hideCreatePlaylistModal();
  }

  componentDidMount() {
    //scroll to top
    this.props.LoadLMS();
    window.scrollTo(0, 0);
    if (
      this.props.openCreatePopup == true ||
      this.props.openCreateResourcePopup == true ||
      this.props.openEditResourcePopup == true
    ) {
    } else {
      this.props.loadProjectPlaylistsAction(this.props.match.params.projectid);
      this.props.loadProjectAction(this.props.match.params.projectid);
    }
  }

  handleShowCreatePlaylistModal = async (e) => {
    e.preventDefault();
    try {
      await this.props.showCreatePlaylistModal();
      this.props.history.push(
        "/project/" + this.props.match.params.projectid + "/playlist/create"
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  handleShowCreateResourceModal = (playlist) => {
    try {
      this.props.showCreateResourceModalAction(playlist._id);
      this.props.history.push(
        "/project/" +
          this.props.match.params.projectid +
          "/playlist/" +
          playlist._id +
          "/activity/create"
      );
    } catch (e) {
      console.log(e.message);
    }
  };

  handleHideCreatePlaylistModal = async (e) => {
    e.preventDefault();
    try {
      await this.props.hideCreatePlaylistModal();
      this.props.history.push("/project/" + this.props.match.params.projectid);
    } catch (e) {
      console.log(e.message);
    }
  };

  handleHideCreateResourceModal = async (e) => {
    e.preventDefault();
    try {
      await this.props.hideCreateResourceModal();
      this.props.history.push("/project/" + this.props.match.params.projectid);
    } catch (e) {
      console.log(e.message);
    }
  };

  onPlaylistTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleCreatePlaylistSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title } = this.state;

      await this.props.createPlaylistAction(
        this.props.match.params.projectid,
        title
      );
      this.props.history.push("/project/" + this.props.match.params.projectid);
    } catch (e) {
      console.log(e.message);
    }
  };

  handleShowDeletePopup = (id, title, deleteType) => {
    this.props.showDeletePopupAction(id, title, deleteType);
  };

  handlePreviewResource = (id) => {
    this.props.previewResourceAction(id);
  };

  handleCreateResourceSubmit = async (
    currentPlaylistId,
    editor,
    editorType,
    payload,
    metadata
  ) => {
    try {
      if (payload.submitAction === "upload") {
        payload.event.preventDefault();
        await this.props.createResourceByH5PUploadAction(
          currentPlaylistId,
          editor,
          editorType,
          payload,
          metadata
        );
      } else {
        await this.props.createResourceAction(
          currentPlaylistId,
          editor,
          editorType,
          metadata
        );
      }
      if (!this.props.resource.showCreateResourcePopup) {
        this.props.history.push(
          "/project/" + this.props.match.params.projectid
        );
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  handleEditResourceSubmit = async (
    currentPlaylistId,
    editor,
    editorType,
    activityid,
    metadata
  ) => {
    try {
      await this.props.editResourceAction(
        currentPlaylistId,
        editor,
        editorType,
        activityid,
        metadata
      );
      this.props.history.push("/project/" + this.props.match.params.projectid);
    } catch (e) {
      console.log(e);
    }
  };

  onDragEnd = (e) => {
    if (
      !e.destination ||
      (e.destination.index == e.source.index &&
        e.source.droppableId == e.destination.droppableId)
    )
      return;

    if (e.type == "resource") {
      // resource dropped
      if (e.source.droppableId == e.destination.droppableId) {
        // Resource dropped within the same list
        let playlist = this.props.playlists.playlists.find((pl) => {
          return pl._id == e.source.droppableId;
        });
        let resources = Array.from(playlist.resources);
        const [removed] = resources.splice(e.source.index, 1);
        resources.splice(e.destination.index, 0, removed);
        this.props.reorderPlaylistActivitiesAction({
          ...playlist,
          resources: resources,
        });
      } else {
        // Rsc dropped on a different list
        let sourceList = this.props.playlists.playlists.find((pl) => {
          return pl._id == e.source.droppableId;
        });
        let destinationList = this.props.playlists.playlists.find((pl) => {
          return pl._id == e.destination.droppableId;
        });
        let sourceResources = Array.from(sourceList.resources);
        let destResources = destinationList.resources
          ? Array.from(destinationList.resources)
          : [];

        const [removed] = sourceResources.splice(e.source.index, 1);
        destResources.splice(e.destination.index, 0, removed);

        this.props.reorderPlaylistActivitiesAction({
          ...sourceList,
          resources: sourceResources,
        });
        this.props.reorderPlaylistActivitiesAction({
          ...destinationList,
          resources: destResources,
        });
      }
    } else {
      // playlist dropped
      let playlists = Array.from(this.props.playlists.playlists);
      const [removed] = playlists.splice(e.source.index, 1);
      playlists.splice(e.destination.index, 0, removed);
      this.props.reorderPlaylistsAction(playlists);
    }
  };

  render() {
    const { playlists } = this.props.playlists;
    const { showDeletePlaylistPopup } = this.props.ui;
    return (
      <>
        <Header {...this.props} />
        <>
          <div className="main-content-wrapper">
            <div className="sidebar-wrapper">
              <Sidebar />
            </div>
            <div className="content-wrapper  ">
              <div className="content">
                <div className="row ">
                  <div className="col playlist-page-project-title project-each-view">
                    <div className="flex-se">
                      <h1>
                        {this.props.project.selectedProject
                          ? this.props.project.selectedProject.name
                          : ""}
                      </h1>

                      <button
                        onClick={this.handleShowCreatePlaylistModal}
                        className="create-playlist-btn"
                      >
                        <i className="fa fa-plus" /> Create new playlist
                      </button>
                    </div>
                    <span>
                      <Link
                        className="dropdown-item"
                        to={
                          "/project/preview2/" +
                          this.props.match.params.projectid
                        }
                      >
                        <i className="fa fa-eye" aria-hidden="true"></i> Project
                        Preview
                      </Link>
                    </span>
                  </div>
                </div>

                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable
                    droppableId="project-droppable-id"
                    direction="horizontal"
                    type="column"
                  >
                    {(provided) => (
                      <div
                        id="board"
                        className="board-custom"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {playlists.map((playlist, index) => (
                          <PlaylistCard
                            key={playlist._id}
                            index={index}
                            playlist={playlist}
                            playlistTitleClicked={playlist.playlistTitleClicked}
                            title={playlist.title}
                            handleCreateResource={
                              this.handleShowCreateResourceModal
                            }
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </div>
            </div>
          </div>

          {this.props.openCreatePopup ? (
            <CreatePlaylistPopup
              escFunction={this.escFunction.bind(this)}
              handleShowCreatePlaylistModal={this.handleShowCreatePlaylistModal.bind(
                this
              )}
              handleHideCreatePlaylistModal={this.handleHideCreatePlaylistModal.bind(
                this
              )}
              handleCreatePlaylistSubmit={this.handleCreatePlaylistSubmit.bind(
                this
              )}
              onPlaylistTitleChange={this.onPlaylistTitleChange.bind(this)}
            />
          ) : null}

          {this.props.openCreateResourcePopup ? (
            <AddResource
              {...this.props}
              handleHideCreateResourceModal={this.handleHideCreateResourceModal}
              handleCreateResourceSubmit={this.handleCreateResourceSubmit}
              handleEditResourceSubmit={this.handleEditResourceSubmit}
            />
          ) : null}

          {this.props.openEditResourcePopup ? (
            <EditResource
              {...this.props}
              handleHideCreateResourceModal={this.handleHideCreateResourceModal}
              handleCreateResourceSubmit={this.handleCreateResourceSubmit}
              handleEditResourceSubmit={this.handleEditResourceSubmit}
            />
          ) : null}

          {this.props.resource.showPreviewResourcePopup ? (
            <PreviewResourcePage {...this.props} />
          ) : null}
          {showDeletePlaylistPopup ? (
            <DeletePopup
              res={this.props.ui}
              deleteType="Playlist"
              {...this.props}
            />
          ) : null}
        </>
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createPlaylistAction: (projectid, title) =>
    dispatch(createPlaylistAction(projectid, title)),
  deletePlaylistAction: (id) => dispatch(deletePlaylistAction(id)),
  showCreatePlaylistModal: () => dispatch(showCreatePlaylistModalAction()),
  hideCreatePlaylistModal: () => dispatch(hideCreatePlaylistModalAction()),
  hideDeletePopupAction: () => dispatch(hideDeletePopupAction()),
  showCreateResourceModalAction: (id) =>
    dispatch(showCreateResourceModalAction(id)),
  hideCreateResourceModal: () => dispatch(hideCreateResourceModalAction()),
  previewResourceAction: (id) => dispatch(previewResourceAction(id)),
  hidePreviewResourceModalAction: () =>
    dispatch(hidePreviewResourceModalAction()),
  showCreateProjectModalAction: () => dispatch(showCreateProjectModalAction()),
  loadProjectPlaylistsAction: (projectid) =>
    dispatch(loadProjectPlaylistsAction(projectid)),
  createResourceAction: (playlistid, editor, editorType, metadata) =>
    dispatch(createResourceAction(playlistid, editor, editorType, metadata)),
  editResourceAction: (playlistid, editor, editorType, activityid, metadata) =>
    dispatch(
      editResourceAction(playlistid, editor, editorType, activityid, metadata)
    ),
  createResourceByH5PUploadAction: (
    playlistid,
    editor,
    editorType,
    payload,
    metadata
  ) =>
    dispatch(
      createResourceByH5PUploadAction(
        playlistid,
        editor,
        editorType,
        payload,
        metadata
      )
    ),
  loadProjectAction: (projectid) => dispatch(loadProjectAction(projectid)),
  deleteResourceAction: (resourceid) =>
    dispatch(deleteResourceAction(resourceid)),
  showDeletePopupAction: (id, title, deleteType) =>
    dispatch(showDeletePopupAction(id, title, deleteType)),
  showCreateResourceActivity: () =>
    dispatch(showCreateResourceActivityAction()),
  showDescribeActivityAction: (activity, activityid) =>
    dispatch(showDescribeActivityAction(activity, activityid)),
  showBuildActivityAction: (editor, editorType, activityid) =>
    dispatch(showBuildActivityAction(editor, editorType, activityid)),
  onChangeActivityTypeAction: (activityTypeId) =>
    dispatch(onChangeActivityTypeAction(activityTypeId)),
  onChangeActivityAction: (e, activity) =>
    dispatch(onChangeActivityAction(e, activity)),
  uploadResourceThumbnailAction: () =>
    dispatch(uploadResourceThumbnailAction()),
  reorderPlaylistsAction: (playlist) =>
    dispatch(reorderPlaylistsAction(playlist)),
  reorderPlaylistActivitiesAction: (playlist) =>
    dispatch(reorderPlaylistActivitiesAction(playlist)),
  LoadLMS: () => dispatch(LoadLMS()),
});

const mapStateToProps = (state) => {
  return {
    playlists: state.playlist,
    resource: state.resource,
    project: state.project,
    ui: state.ui,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistsPage)
);
