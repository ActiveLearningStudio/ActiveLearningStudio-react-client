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
  reorderPlaylistsAction
} from "../actions/playlist";
import {
  showDeletePlaylistPopupAction,
  hideDeletePlaylistModalAction,
} from "./../actions/ui";
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
  showBuildActivityAction,
} from "../actions/resource";
import {
  showCreateProjectModalAction,
  loadProjectAction,
} from "../actions/project";


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
    window.scrollTo(0, 0);
    this.props.loadProjectPlaylistsAction(this.props.match.params.projectid);
    this.props.loadProjectAction(this.props.match.params.projectid);
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

  createNewResourceModal = () => {
    this.showNewResourceModal();
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
    this.props.showDeletePlaylistPopupAction(id, title, deleteType);
  };

  handlePreviewResource = (id) => {
    this.props.previewResourceAction(id);
  };

  handleCreateResourceSubmit = async (
    currentPlaylistId,
    editor,
    editorType,
    payload,
    metaData
  ) => {
    try {
      if (payload.submitAction === "upload") {
        payload.event.preventDefault();
        await this.props.createResourceByH5PUploadAction(
          currentPlaylistId,
          editor,
          editorType,
          payload
        );
      } else {
        await this.props.createResourceAction(
          currentPlaylistId,
          editor,
          editorType,
          metaData
        );
        console.log((this.props.resource))
        if(!this.props.resource.showCreateResourcePopup){
          this.props.history.push("/project/" + this.props.match.params.projectid);
        }
      }
      
      
      // this.props.hideCreatePlaylistModal();
    } catch (e) {
      console.log(e.message);
    }
  };

  handleEditResourceSubmit = async (
    currentPlaylistId,
    editor,
    editorType,
    activityid
  ) => {
    try {
      await this.props.editResourceAction(
        currentPlaylistId,
        editor,
        editorType,
        activityid
      );
      this.props.history.push("/project/" + this.props.match.params.projectid);
    } catch (e) {
      console.log(e);
    }
  };

  onDragEnd = (e) => {
    if (e.destination.index == e.source.index) return;

    let playlists = Array.from(this.props.playlists.playlists);
    const [removed] = playlists.splice(e.source.index, 1);
    playlists.splice(e.destination.index, 0, removed);
    this.props.reorderPlaylistsAction(playlists);
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
            <div className="content-wrapper">
              <div className="content">
                <div className="row">
                  <div className="col playlist-page-project-title">
                    <h1>
                      {this.props.project.selectedProject
                        ? this.props.project.selectedProject.name
                        : ""}
                      <span>
                        <Link
                          className="dropdown-item"
                          to={
                            "/project/preview2/" +
                            this.props.match.params.projectid
                          }
                        >
                          <i className="fa fa-eye" aria-hidden="true"></i>{" "}
                          Project Preview
                        </Link>
                      </span>
                    </h1>
                  </div>
                </div>
                <button
                  onClick={this.handleShowCreatePlaylistModal}
                  className="create-playlist-btn"
                >
                  Create New Playlist
                </button>

                <DragDropContext onDragEnd={this.onDragEnd}>
                  <Droppable droppableId="project-droppable-id" direction="horizontal">
                    {(provided) => (
                      <div
                        id="board"
                        className=""
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {playlists.map((playlist, index) => (
                          <PlaylistCard
                            key={playlist._id}
                            index={index}
                            playlist={playlist}
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
  hideDeletePlaylistModalAction: () =>
    dispatch(hideDeletePlaylistModalAction()),
  showCreateResourceModalAction: (id) =>
    dispatch(showCreateResourceModalAction(id)),
  hideCreateResourceModal: () => dispatch(hideCreateResourceModalAction()),
  previewResourceAction: (id) => dispatch(previewResourceAction(id)),
  hidePreviewResourceModalAction: () =>
    dispatch(hidePreviewResourceModalAction()),
  showCreateProjectModalAction: () => dispatch(showCreateProjectModalAction()),
  loadProjectPlaylistsAction: (projectid) =>
    dispatch(loadProjectPlaylistsAction(projectid)),
  createResourceAction: (playlistid, editor, editorType, metaData) =>
    dispatch(createResourceAction(playlistid, editor, editorType, metaData)),
  editResourceAction: (playlistid, editor, editorType, activityid) =>
    dispatch(editResourceAction(playlistid, editor, editorType, activityid)),
  createResourceByH5PUploadAction: (playlistid, editor, editorType, payload) =>
    dispatch(
      createResourceByH5PUploadAction(playlistid, editor, editorType, payload)
    ),
  loadProjectAction: (projectid) => dispatch(loadProjectAction(projectid)),
  deleteResourceAction: (resourceid) =>
    dispatch(deleteResourceAction(resourceid)),
  showDeletePlaylistPopupAction: (id, title, deleteType) =>
    dispatch(showDeletePlaylistPopupAction(id, title, deleteType)),
  showCreateResourceActivity: () =>
    dispatch(showCreateResourceActivityAction()),
  showBuildActivityAction: (editor, editorType, activityid) =>
    dispatch(showBuildActivityAction(editor, editorType, activityid)),
  onChangeActivityTypeAction: (e) => dispatch(onChangeActivityTypeAction(e)),
  onChangeActivityAction: (e, activity) =>
    dispatch(onChangeActivityAction(e, activity)),
  uploadResourceThumbnailAction: () =>
    dispatch(uploadResourceThumbnailAction()),
  reorderPlaylistsAction: (playlist) =>
    dispatch(reorderPlaylistsAction(playlist))
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
