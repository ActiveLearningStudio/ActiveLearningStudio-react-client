import React from "react";
import { connect } from "react-redux";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import validator from "validator";
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
  editResourceAction
} from "../actions/resource";
import {
  showCreateProjectModalAction,
  loadProjectAction,
} from "../actions/project";
import { startLogin } from "../actions/auth";

import Header from "../components/Header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import NewResourcePage from "./NewResourcePage";
import PreviewResourcePage from "./PreviewResourcePage";
import DeletePopup from "./../components/DeletePopup/DeletePopup";
import PlaylistCard from "../components/Playlist/PlaylistCard";
import PlaylistsLoading from "./../components/Loading/PlaylistsLoading";
import CreatePlaylistPopup from "../components/CreatePlaylistPopup/CreatePlaylistPopup";

import "./PlaylistsPage.scss";

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
    payload
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
          editorType
        );
      }

      this.props.history.push("/project/" + this.props.match.params.projectid);
      // this.props.hideCreatePlaylistModal();
    } catch (e) {
      console.log(e.message);
    }
  };

  handleEditResourceSubmit = async (
    currentPlaylistId,
    editor,
    editorType) => {
      await this.props.editResourceAction(
        currentPlaylistId,
        editor,
        editorType
      );
  }

  render() {
    const { playlists } = this.props.playlists;
    const { showDeletePlaylistPopup } = this.props.ui;

    return (
      <>
        <Header {...this.props} />
        <ReactPlaceholder
          type="media"
          showLoadingAnimation
          customPlaceholder={PlaylistsLoading}
          ready={!this.props.ui.pageLoading}
        >
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
                <div
                  id="board"
                  className="u-fancy-scrollbar js-no-higher-edits js-list-sortable ui-sortable"
                >
                  {playlists.map((playlist) => (
                    <PlaylistCard
                      key={playlist._id}
                      playlist={playlist}
                      handleCreateResource={this.handleShowCreateResourceModal}
                    />
                  ))}
                </div>
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
            <NewResourcePage
              {...this.props}
              handleHideCreateResourceModal={this.handleHideCreateResourceModal}
              handleCreateResourceSubmit={this.handleCreateResourceSubmit}
              handleEditResourceSubmit = {this.handleEditResourceSubmit}
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
        </ReactPlaceholder>
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
  createResourceAction: (playlistid, editor, editorType) =>
    dispatch(createResourceAction(playlistid, editor, editorType)),
  editResourceAction: (playlistid, editor, editorType) =>
    dispatch(editResourceAction(playlistid, editor, editorType)),
  createResourceByH5PUploadAction: (playlistid, editor, editorType, payload) =>
    dispatch(
      createResourceByH5PUploadAction(playlistid, editor, editorType, payload)
    ),
  loadProjectAction: (projectid) => dispatch(loadProjectAction(projectid)),
  deleteResourceAction: (resourceid) =>
    dispatch(deleteResourceAction(resourceid)),
  showDeletePlaylistPopupAction: (id, title, deleteType) =>
    dispatch(showDeletePlaylistPopupAction(id, title, deleteType)),
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