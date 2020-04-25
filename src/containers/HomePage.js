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

import { startLogin } from "./../actions/auth";
import { createPlaylistAction, deletePlaylistAction, showCreatePlaylistModalAction, hideCreatePlaylistModalAction } from "./../actions/playlist";
import { showCreateResourceModalAction, hideCreateResourceModalAction } from "./../actions/resource";
import NewResourcePage from "./NewResourcePage";

export class HomePage extends React.Component {
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
      this.props.history.push("/");
    }
  }


 

  componentDidMount() {
    //scroll to top
    window.scrollTo(0, 0);
  }

  handleShowCreatePlaylistModal = async (e) => {
    e.preventDefault();
    try {
      await this.props.showCreatePlaylistModal();
      this.props.history.push("/playlist/create");

      
    } catch (e) {
      console.log(e.message);
    }

  };

  handleShowCreateResourceModal = (id) => {
    try {
      this.props.showCreateResourceModalAction(id);
      this.props.history.push("/playlist/activity/create/"+id);

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
      this.props.history.push("/");

      
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
      
      await this.props.createPlaylistAction(title);
      this.props.history.push("/");
      this.props.hideCreatePlaylistModal();

    } catch (e) {
      console.log(e.message);
    }
  };

  // This function handles delete playlist
  handleDeletePlayList = (id) => {
    this.props.deletePlaylistAction(id);
  }

  populateResources(resources) {
    
    return (
      resources.map(function(resource) {
        return (
          <div className="playlist-resource" key={resource.id}>
            <h3 className="title">{resource.title}</h3>
          </div>
        )
      })
    );
  }
  render() {
    const { playlists } = this.props.playlists;

    

    const headArray = playlists.map(playlist => (
      <div className="list-wrapper" key={playlist.id}>
        <div className="list">
          <div className="list-header">
            <h2 className="list-header-name">{playlist.title}
              <button className="remove-playlist-btn" onClick={() => this.handleDeletePlayList(playlist.id)}>x</button>
            </h2>
            
          </div>
          <div className="list-body">
            {playlist.resources ?
              this.populateResources(playlist.resources)
              : null
            }
            
            <button onClick={() => this.handleShowCreateResourceModal(playlist.id)} className="add-resource-to-playlist-btn">
              Add new resource
                          </button>
            {/* </Link>  */}
          </div>
        </div>
      </div>
    ));
    return (
      <div>
        <Header />
        <div className="row ">
          <div className="col-md-2">
            <Sidebar />
          </div>
          <div className="col-md-10">
            <div className="content">
              <div className="playlist-search">
                <input type="text" name="search" className="search" placeholder="Search..." />
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

        {(this.props.playlists.showCreatePlaylistPopup || this.props.openCreatePopup) ?
          <CreatePlaylistPopup
            escFunction={this.escFunction.bind(this)}
            handleShowCreatePlaylistModal={this.handleShowCreatePlaylistModal.bind(this)}
            handleHideCreatePlaylistModal={this.handleHideCreatePlaylistModal.bind(this)}
            handleCreatePlaylistSubmit={this.handleCreatePlaylistSubmit.bind(this)}
            onPlaylistTitleChange={this.onPlaylistTitleChange.bind(this)}
          />
          : null
        }

        {this.props.resource.showCreateResourcePopup ?
          <NewResourcePage
            {...this.props}
          />
          : null
        }

      </div>

    );
  }
}

const mapDispatchToProps = dispatch => ({
  createPlaylistAction: (title) => dispatch(createPlaylistAction(title)),
  deletePlaylistAction: (id) => dispatch(deletePlaylistAction(id)),
  showCreatePlaylistModal: () => dispatch(showCreatePlaylistModalAction()),
  hideCreatePlaylistModal: () => dispatch(hideCreatePlaylistModalAction()),
  showCreateResourceModalAction: (id) => dispatch(showCreateResourceModalAction(id)),
  hideCreateResourceModal: () => dispatch(hideCreateResourceModalAction())
  //   dispatch({ type: APP_LOAD, payload, token, skipTracking: true })
});

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    playlists: state.playlist,
    resource: state.resource
  };
}




export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(HomePage))