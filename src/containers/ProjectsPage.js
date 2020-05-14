import React from "react";
import { connect } from "react-redux";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

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
import { showDeletePlaylistPopupAction, hideDeletePlaylistModalAction } from "../actions/ui";
import { deleteProjectAction, showCreateProjectModalAction, loadProjectAction, createProjectAction, loadMyProjectsAction} from "../actions/project";

import { NewProjectPage } from "./NewProjectPage";

import ProjectCard from "../components/ProjectCard";
import ProjectPreviewModal from "../components/ProjectPreviewModal";
import DeletePopup from "../components/DeletePopup/DeletePopup"
import ProjectsLoading from "../components/Loading/ProjectsLoading";

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
    

    if(this.props.showEditProjectPopup){
      this.getProjectData(this.props.match.params.projectid);
    } else {
      this.props.showCreateProjectModalAction();
    }
  }

  // get the data of project for showing into edit form
  getProjectData(projectid){
    this.props.loadProjectAction(projectid);
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



  handleCloseProjectModal = (e) => {
    e.preventDefault();
    try {
      this.props.history.push("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  handleDeleteProject = (projectid) => {
    if(confirm("Are you Sure?")){
      this.props.deleteProjectAction(projectid);
    }
    
  }

  render() {
    
    const { projects } = this.props.project;
    const { showDeletePlaylistPopup } = this.props.ui;

    
    
    

    const projectCards = projects.map(project => {
      let res = {title:project.name, id: project._id, deleteType:"Project"};
      return (
      <ProjectCard
        key={project._id}
        project={project}
        res = {res}
        handleDeleteProject = {this.handleDeleteProject}
        showDeletePlaylistPopupAction = {this.props.showDeletePlaylistPopupAction}
        showPreview={(this.props.showPreview == project._id)}/>
    )});
    
    return (
      <>
        <Header {...this.props} />
        <ReactPlaceholder type='media' showLoadingAnimation customPlaceholder={ProjectsLoading} ready={!this.props.ui.pageLoading}>
        
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
          {this.props.showCreateProjectPopup || this.props.showEditProjectPopup ?
            <NewProjectPage
              {...this.props}
              onProjectNameChange={this.onProjectNameChange}
              onProjectDescriptionChange = {this.onProjectDescriptionChange}
              handleCloseProjectModal = {this.handleCloseProjectModal}
              onThumbUrlChange = {this.onThumbUrlChange}
              inputRef={(input) => this.textInput = input} 
            />
            : null
          }
          
          
          {showDeletePlaylistPopup ?
            <DeletePopup
              res = {this.props.project}
              deleteType = 'Project'
              {...this.props}
            />
            : null
          }
        </ReactPlaceholder>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  showCreateProjectModalAction: () => dispatch(showCreateProjectModalAction()),
  loadMyProjectsAction: () =>dispatch(loadMyProjectsAction()),
  createProjectAction: (name, description, thumb_url) =>dispatch(createProjectAction(name, description, thumb_url)),
  showDeletePlaylistPopupAction: (id, title, deleteType) => dispatch(showDeletePlaylistPopupAction(id, title, deleteType)),
  deleteProjectAction: (projectid) => dispatch(deleteProjectAction(projectid)),
  hideDeletePlaylistModalAction: () => dispatch(hideDeletePlaylistModalAction()),
  loadProjectAction: (projectid) => dispatch(loadProjectAction(projectid))

});

const mapStateToProps = (state) => {
  return {
    project: state.project,
    ui: state.ui
  };
}




export default withRouter(connect(mapStateToProps,
  mapDispatchToProps)(ProjectsPage))