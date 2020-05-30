import React from "react";
import { connect } from "react-redux";
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

import { withRouter } from 'react-router-dom';
import Header from "../components/Header/Header";

import Sidebar from "../components/Sidebar/Sidebar";
import { showDeletePopupAction, hideDeletePopupAction } from "../actions/ui";
import { deleteProjectAction, showCreateProjectModalAction, loadProjectAction, createProjectAction, loadMyProjectsAction} from "../actions/project";
import { NewProjectPage } from "./NewProjectPage";
import ProjectCard from "../components/ProjectCard";
import DeletePopup from "../components/DeletePopup/DeletePopup"
import ProjectsLoading from "../components/Loading/ProjectsLoading";

export class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    
    //scroll to top
    window.scrollTo(0, 0);
    if(this.props.showCreateProjectPopup == undefined && this.props.showEditProjectPopup == undefined){
      this.props.loadMyProjectsAction();
    }
      

    
    if(this.props.showEditProjectPopup){
      // loads the data of project for showing into edit form
      this.props.loadProjectAction(this.props.match.params.projectid);
    } else if(this.props.showCreateProjectPopup) {
      this.props.showCreateProjectModalAction();
    }
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
        showDeletePopupAction = {this.props.showDeletePopupAction}
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
  showDeletePopupAction: (id, title, deleteType) => dispatch(showDeletePopupAction(id, title, deleteType)),
  deleteProjectAction: (projectid) => dispatch(deleteProjectAction(projectid)),
  hideDeletePopupAction: () => dispatch(hideDeletePopupAction()),
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