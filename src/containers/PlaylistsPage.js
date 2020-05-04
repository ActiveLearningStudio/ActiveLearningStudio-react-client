import React from "react";
import { connect } from "react-redux";
import validator from "validator";

import { withRouter } from 'react-router-dom';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import Header from "../components/Header/Header";
import CreatePlaylistPopup from "../components/CreatePlaylistPopup/CreatePlaylistPopup";
import Sidebar from "../components/Sidebar/Sidebar";

import { startLogin } from "../actions/auth";
import { createPlaylistAction, deletePlaylistAction, showCreatePlaylistModalAction, hideCreatePlaylistModalAction, loadProjectPlaylistsAction } from "../actions/playlist";
import { deleteResourceAction, createResourceAction, showCreateResourceModalAction, hideCreateResourceModalAction, previewResourceAction, hidePreviewResourceModalAction } from "../actions/resource";
import {
  showCreateProjectModalAction, 
  showCreateProjectSubmenuAction,
  loadProjectAction
} from "../actions/project";
import NewResourcePage from "./NewResourcePage";
import PreviewResourcePage from "./PreviewResourcePage";

import ResourceCard from "../components/ResourceCard";

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
          resources: []
        }
      ],
      title: ""
    };

    //binding escape function for modal close
    // this.escFunction = this.escFunction.bind(this);


  }
  escFunction(event) {
    if (event.keyCode === 27) {
      this.props.hideCreatePlaylistModal();
      // this.props.history.push("/");
    }
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
      this.props.history.push("/project/"+this.props.match.params.projectid+"/playlist/create");

      
    } catch (e) {
      console.log(e.message);
    }

  };

  handleShowCreateResourceModal = (playlist) => {
    try {
      this.props.showCreateResourceModalAction(playlist._id);
      this.props.history.push("/project/"+this.props.match.params.projectid+"/playlist/"+playlist._id+"/activity/create");

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
      this.props.history.push("/project/"+this.props.match.params.projectid);

      
    } catch (e) {
      console.log(e.message);
    }
  };

  handleHideCreateResourceModal = async (e) => {
    e.preventDefault();
    try {
      await this.props.hideCreateResourceModal();
      this.props.history.push("/project/"+this.props.match.params.projectid);
      
    } catch (e) {
      console.log(e.message);
    }
  };

  


  onPlaylistTitleChange = e => {
    this.setState({ title: e.target.value });
  };
  handleCreatePlaylistSubmit = async (e) => {
    e.preventDefault();
    try {
      const { title } = this.state;
      
      await this.props.createPlaylistAction(this.props.match.params.projectid, title);
      this.props.history.push("/project/"+this.props.match.params.projectid);
      // this.props.hideCreatePlaylistModal();

    } catch (e) {
      console.log(e.message);
    }
  };

  // This function handles delete playlist
  handleDeletePlayList = (id) => {
    if(confirm("Are you Sure?")){
      this.props.deletePlaylistAction(id);
    }
  }

  handlePreviewResource = (id) => {
    this.props.previewResourceAction(id);
  }

  handleDeleteResource = (resourceid) => {
    if(confirm("Are you Sure?")){
      this.props.deleteResourceAction(resourceid);
    }
  }

  populateResources = (resources) => {
    return resources.map(resource => (
        <ResourceCard key={resource._id} 
        resource={resource}
        handleDeleteResource = {this.handleDeleteResource} />
    ));
  }

  handleCreateResourceSubmit = async (currentPlaylistId, editor, editorType) => {
    try {
      
      await this.props.createResourceAction(currentPlaylistId, editor, editorType)
      this.props.history.push("/project/"+this.props.match.params.projectid);
      // this.props.hideCreatePlaylistModal();

    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const { playlists } = this.props.playlists;
    const headArray = playlists.map(playlist => (
      <div className="list-wrapper" key={playlist._id}>
        <div className="list">
          <div className="list-header">
            <h2 className="list-header-name">{playlist.title}

              <div className="dropdown pull-right playlist-dropdown">
                <button className="btn project-dropdown-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i className="fa fa-ellipsis-v" aria-hidden="true"></i>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <Link className="dropdown-item" to={"/playlist/preview/"+playlist._id}><i className="fa fa-eye" aria-hidden="true"></i> Preview</Link>
                  <a className="dropdown-item" href="#"><i className="fa fa-pencil" aria-hidden="true"></i> Edit</a>
                  <a className="dropdown-item" href="#"><i className="fa fa-share" aria-hidden="true"></i> Send To</a>
                  <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); window.open("/api/download/project/123"); }}><i className="fa fa-cloud-download" aria-hidden="true"></i> Executable</a>
                  <a className="dropdown-item" onClick={() => this.handleDeletePlayList(playlist._id)}><i className="fa fa-times-circle-o" aria-hidden="true"></i> Delete</a>
                </div>
              </div>


            </h2>
            
          </div>
          <div className="list-body">
            {playlist.resources ?
              this.populateResources(playlist.resources)
              : null
            }
            
            <button onClick={() => this.handleShowCreateResourceModal(playlist)} className="add-resource-to-playlist-btn">
              Add new resource
                          </button>
            {/* </Link>  */}
          </div>
        </div>
      </div>
    ));

    return (
      <div>
        <Header {...this.props} />
        <div className="main-content-wrapper">
          <div className="sidebar-wrapper">
            <Sidebar />
          </div>
          <div className="content-wrapper">
            <div className="content">
              <div className="row">
                <div className="col">
                  <h1>{(this.props.project.selectedProject) ? this.props.project.selectedProject.name : ''}</h1>
                </div>
              </div>
              <button onClick={this.handleShowCreatePlaylistModal} className="create-playlist-btn">
                Create New Playlist
                        </button>
              <div id="board" className="u-fancy-scrollbar js-no-higher-edits js-list-sortable ui-sortable">
                {headArray}

              </div>
            </div>
          </div>
        </div>

        {(this.props.openCreatePopup) ?
          <CreatePlaylistPopup
            escFunction={this.escFunction.bind(this)}
            handleShowCreatePlaylistModal={this.handleShowCreatePlaylistModal.bind(this)}
            handleHideCreatePlaylistModal={this.handleHideCreatePlaylistModal.bind(this)}
            handleCreatePlaylistSubmit={this.handleCreatePlaylistSubmit.bind(this)}
            onPlaylistTitleChange={this.onPlaylistTitleChange.bind(this)}
          />
          : null
        }

        {this.props.openCreateResourcePopup ?
          <NewResourcePage
            {...this.props}
            handleHideCreateResourceModal = {this.handleHideCreateResourceModal}
            handleCreateResourceSubmit = {this.handleCreateResourceSubmit}
          />
          : null
        }

      {this.props.resource.showPreviewResourcePopup ?
          <PreviewResourcePage
            {...this.props}
          />
          : null
        }

      </div>

    );
  }
}

const mapDispatchToProps = dispatch => ({
  createPlaylistAction: (projectid, title) => dispatch(createPlaylistAction(projectid, title)),
  deletePlaylistAction: (id) => dispatch(deletePlaylistAction(id)),
  showCreatePlaylistModal: () => dispatch(showCreatePlaylistModalAction()),
  hideCreatePlaylistModal: () => dispatch(hideCreatePlaylistModalAction()),
  showCreateResourceModalAction: (id) => dispatch(showCreateResourceModalAction(id)),
  hideCreateResourceModal: () => dispatch(hideCreateResourceModalAction()),
  previewResourceAction: (id) => dispatch(previewResourceAction(id)),
  hidePreviewResourceModalAction: () => dispatch(hidePreviewResourceModalAction()),
  showCreateProjectSubmenuAction: () => dispatch(showCreateProjectSubmenuAction()),
  showCreateProjectModalAction: () => dispatch(showCreateProjectModalAction()),
  loadProjectPlaylistsAction: (projectid) => dispatch(loadProjectPlaylistsAction(projectid)),
  createResourceAction: (playlistid, editor, editorType) => dispatch(createResourceAction(playlistid, editor, editorType)),
  loadProjectAction: (projectid) => dispatch(loadProjectAction(projectid)),
  deleteResourceAction: (resourceid) => dispatch(deleteResourceAction(resourceid)),
  
});

const mapStateToProps = (state) => {
  return {
    playlists: state.playlist,
    resource: state.resource,
    project: state.project
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistsPage))