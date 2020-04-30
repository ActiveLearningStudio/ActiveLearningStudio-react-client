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
import { createPlaylistAction, deletePlaylistAction, showCreatePlaylistModalAction, hideCreatePlaylistModalAction } from "../actions/playlist";
import { showCreateProjectSubmenuAction, showCreateProjectModalAction, hideCreateProjectModalAction, createProjectAction, loadMyProjectsAction} from "../actions/project";
import NewResourcePage from "./NewResourcePage";
import { NewProjectPage } from "./NewProjectPage";

import ProjectCard from "../components/ProjectCard";
import ProjectPreviewModal from "../components/ProjectPreviewModal";

export class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);



    

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
    this.props.loadMyProjectsAction();
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
  onProjectNameChange = e => {
    this.setState({ name: e.target.value });
  };
  onProjectDescriptionChange = e => {
    this.setState({ description: e.target.value });
  };


  handleCreateProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, description } = this.state;
      var thumb_url = this.textInput.value;
      await this.props.createProjectAction(name, description, thumb_url);
      this.props.history.push("/");

      
    } catch (e) {
      console.log(e.message);
    }
  };

  handleCloseProjectModal = (e) => {
    e.preventDefault();
    try {
      this.props.history.push("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const { projects } = this.props.project;


    const projectCards = projects.map(project => (
      <ProjectCard key={project._id} project={project} showPreview={(this.props.showPreview == project._id)}/>
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
                <div className="col-md-12">                  
                  <div className="program-page-title">
                    <h1>My Projects</h1>
                  </div>
                </div>
              </div>
              <div className="row">
                {projectCards}
              </div>
            </div>
          </div>
        </div>
        {this.props.showCreateProjectPopup ?
          <NewProjectPage
            {...this.props}
            onProjectNameChange={this.onProjectNameChange}
            onProjectDescriptionChange = {this.onProjectDescriptionChange}
            handleCreateProjectSubmit = {this.handleCreateProjectSubmit}
            handleCloseProjectModal = {this.handleCloseProjectModal}
            onThumbUrlChange = {this.onThumbUrlChange}
            inputRef={(input) => this.textInput = input} 
          />
          : null
        }
      </div>

    );
  }
}

const mapDispatchToProps = dispatch => ({
  showCreateProjectModalAction: () => dispatch(showCreateProjectModalAction()),
  loadMyProjectsAction: () =>dispatch(loadMyProjectsAction()),
  createProjectAction: (name, description, thumb_url) =>dispatch(createProjectAction(name, description, thumb_url)),
  // hideCreateProjectModalAction: () => dispatch(hideCreateProjectModalAction()),
  showCreateProjectSubmenuAction: () => dispatch(showCreateProjectSubmenuAction())

});

const mapStateToProps = (state) => {
  return {
    project: state.project
  };
}




export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(ProjectsPage))