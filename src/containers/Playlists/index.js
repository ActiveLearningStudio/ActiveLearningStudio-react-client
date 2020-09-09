import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

import loaderImg from 'assets/images/loader.svg';
import {
  createPlaylistAction,
  deletePlaylistAction,
  showCreatePlaylistModalAction,
  hideCreatePlaylistModalAction,
  loadProjectPlaylistsAction,
  reorderPlaylistsAction,
} from 'store/actions/playlist';
import { showDeletePopupAction, hideDeletePopupAction } from 'store/actions/ui';
import {
  deleteResourceAction,
  createResourceAction,
  showCreateResourceModalAction,
  hideCreateResourceModalAction,
  hidePreviewResourceModalAction,
  createResourceByH5PUploadAction,
  editResourceAction,
  showCreateResourceActivityAction,
  onChangeActivityTypeAction,
  onChangeActivityAction,
  uploadResourceThumbnailAction,
  showDescribeActivityAction,
  showBuildActivityAction,
} from 'store/actions/resource';
import {
  showCreateProjectModalAction,
  loadProjectAction,
  loadLmsAction,
} from 'store/actions/project';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import DeletePopup from 'components/DeletePopup';
import AddResource from 'components/ResourceCard/AddResource';
import EditResource from 'components/ResourceCard/EditResource';
import PlaylistCard from './PlaylistCard';
import PreviewResourcePage from './PreviewResourcePage';
import CreatePlaylistPopup from './CreatePlaylistPopup';

class PlaylistsPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      shareLoading: false,
    };
  }

  componentDidMount() {
    const {
      match,
      openCreatePopup,
      openCreateResourcePopup,
      openEditResourcePopup,
      loadProject,
      loadProjectPlaylists,
      loadLms,
    } = this.props;

    // scroll to top
    loadLms();
    window.scrollTo(0, 0);

    if (
      !openCreatePopup
      && !openCreateResourcePopup
      && !openEditResourcePopup
    ) {
      loadProject(match.params.projectId);
      loadProjectPlaylists(match.params.projectId);
    }
  }

  handleShowCreatePlaylistModal = async (e) => {
    e.preventDefault();

    try {
      const { match, history, showCreatePlaylistModal } = this.props;
      await showCreatePlaylistModal();

      history.push(`/project/${match.params.projectId}/playlist/create`);
    } catch (err) {
      // console.log(err.message);
    }
  };

  handleShowCreateResourceModal = (playlist) => {
    try {
      const { match, history, showCreateResourceModal } = this.props;
      showCreateResourceModal(playlist.id);
      history.push(`/project/${match.params.projectId}/playlist/${playlist.id}/activity/create`);
    } catch (e) {
      // console.log(e.message);
    }
  };

  handleHideCreatePlaylistModal = async (e) => {
    e.preventDefault();

    try {
      const { match, history, hideCreatePlaylistModal } = this.props;
      await hideCreatePlaylistModal();
      history.push(`/project/${match.params.projectId}`);
    } catch (err) {
      // console.log(err.message);
    }
  };

  handleHideCreateResourceModal = async (e) => {
    e.preventDefault();

    try {
      const { match, history, hideCreateResourceModal } = this.props;
      await hideCreateResourceModal();
      history.push(`/project/${match.params.projectId}`);
    } catch (err) {
      // console.log(err.message);
    }
  };

  onPlaylistTitleChange = (e) => {
    this.setState({ title: e.target.value });
  };

  handleCreatePlaylistSubmit = async (e) => {
    e.preventDefault();

    try {
      const { title } = this.state;
      const { match, history, createPlaylist } = this.props;

      await createPlaylist(match.params.projectId, title);

      history.push(`/project/${match.params.projectId}`);
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to create playlist.',
      });
    }
  };

  handleCreateResourceSubmit = async (
    currentPlaylistId,
    editor,
    editorType,
    payload,
    metadata,
    projectId,
  ) => {
    try {
      const {
        resource,
        match,
        history,
        createResource,
        createResourceByH5PUpload,
      } = this.props;

      if (payload.submitAction === 'upload') {
        payload.event.preventDefault();
        await createResourceByH5PUpload(
          currentPlaylistId,
          editor,
          editorType,
          payload,
          metadata,
          projectId,
        );
      } else {
        await createResource(
          currentPlaylistId,
          editor,
          editorType,
          metadata,
          projectId,
        );
      }

      if (!resource.showCreateResourcePopup) {
        history.push(`/project/${match.params.projectId}`);
      }
    } catch (e) {
      // console.log(e.message);
    }
  };

  handleEditResourceSubmit = async (
    currentPlaylistId,
    editor,
    editorType,
    activityId,
    metadata,
  ) => {
    try {
      const { match, history, editResource } = this.props;
      await editResource(
        currentPlaylistId,
        editor,
        editorType,
        activityId,
        metadata,
      );

      history.push(`/project/${match.params.projectId}`);
    } catch (e) {
      // console.log(e);
    }
  };

  onDragEnd = (e) => {
    if (
      !e.destination
      || (e.destination.index === e.source.index && e.source.droppableId === e.destination.droppableId)
    ) {
      return;
    }

    const {
      match,
      playlist: { playlists },
      reorderPlaylists,
    } = this.props;
    const orgPlaylists = Array.from(playlists);

    if (e.type === 'resource') {
      // resource dropped
      if (e.source.droppableId === e.destination.droppableId) {
        // Resource dropped within the same list
        const playlist = playlists.find((pl) => pl.id === parseInt(e.source.droppableId, 10));
        const activities = Array.from(playlist.activities);
        const [removed] = activities.splice(e.source.index, 1);
        activities.splice(e.destination.index, 0, removed);
        // update playlist with new activities
        playlist.activities = activities;
      } else {
        // Rsc dropped on a different list
        const sourceList = playlists.find((pl) => pl.id === parseInt(e.source.droppableId, 10));
        const destinationList = playlists.find((pl) => pl.id === parseInt(e.destination.droppableId, 10));
        const sourceActivities = Array.from(sourceList.activities);
        const destActivities = destinationList.activities
          ? Array.from(destinationList.activities)
          : [];

        const [removed] = sourceActivities.splice(e.source.index, 1);
        destActivities.splice(e.destination.index, 0, removed);
        // Update both playlists with new activities
        sourceList.activities = sourceActivities;
        destinationList.activities = destActivities;
      }

      // Previous block caused changes to playlists
      reorderPlaylists(match.params.projectId, orgPlaylists, playlists);
    } else {
      // playlist dropped
      const pLists = Array.from(playlists);
      const [removed] = pLists.splice(e.source.index, 1);
      pLists.splice(e.destination.index, 0, removed);
      reorderPlaylists(match.params.projectId, orgPlaylists, pLists);
    }
  };

  render() {
    const { shareLoading } = this.state;
    const {
      match,
      project: { selectedProject },
      resource,
      playlist: { playlists },
      ui,
      openCreatePopup,
      openCreateResourcePopup,
      openEditResourcePopup,
    } = this.props;

    const { showDeletePlaylistPopup } = ui;

    return (
      <>
        <Header {...this.props} />

        {shareLoading ? (
          <div className="loader-share">
            <img src={loaderImg} alt="" />
            <h1>Sharing...</h1>
          </div>
        ) : (
          <>
            <div className="main-content-wrapper">
              <div className="sidebar-wrapper">
                <Sidebar />
              </div>

              <div className="content-wrapper">
                <div className="content">
                  <div className="row ">
                    <div className="col playlist-page-project-title project-each-view">
                      <div className="flex-se">
                        <h1>{selectedProject ? selectedProject.name : ''}</h1>

                        <button
                          type="button"
                          className="create-playlist-btn"
                          onClick={this.handleShowCreatePlaylistModal}
                        >
                          <FontAwesomeIcon icon="plus" className="mr-2" />
                          Create new playlist
                        </button>
                      </div>

                      <span>
                        <Link
                          className="dropdown-item"
                          to={`/project/${match.params.projectId}/preview`}
                        >
                          <FontAwesomeIcon icon="eye" className="mr-2" />
                          Project Preview
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
                              key={playlist.id}
                              index={index}
                              playlist={playlist}
                              projectId={parseInt(match.params.projectId, 10)}
                              handleCreateResource={this.handleShowCreateResourceModal}
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

            {openCreatePopup && (
              <CreatePlaylistPopup
                handleHideCreatePlaylistModal={this.handleHideCreatePlaylistModal}
                handleCreatePlaylistSubmit={this.handleCreatePlaylistSubmit}
                onPlaylistTitleChange={this.onPlaylistTitleChange}
              />
            )}

            {openCreateResourcePopup && (
              <AddResource
                {...this.props}
                handleHideCreateResourceModal={this.handleHideCreateResourceModal}
                handleCreateResourceSubmit={this.handleCreateResourceSubmit}
                handleEditResourceSubmit={this.handleEditResourceSubmit}
              />
            )}

            {openEditResourcePopup && (
              <EditResource
                {...this.props}
                handleHideCreateResourceModal={this.handleHideCreateResourceModal}
                handleCreateResourceSubmit={this.handleCreateResourceSubmit}
                handleEditResourceSubmit={this.handleEditResourceSubmit}
              />
            )}

            {resource.showPreviewResourcePopup && (
              <PreviewResourcePage {...this.props} />
            )}

            {showDeletePlaylistPopup && (
              <DeletePopup
                {...this.props}
                deleteType="Playlist"
                selectedProject={selectedProject}
              />
            )}
          </>
        )}

        <Footer />
      </>
    );
  }
}

PlaylistsPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  openCreatePopup: PropTypes.bool,
  openCreateResourcePopup: PropTypes.bool,
  openEditResourcePopup: PropTypes.bool,
  playlist: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  loadProject: PropTypes.func.isRequired,
  loadProjectPlaylists: PropTypes.func.isRequired,
  reorderPlaylists: PropTypes.func.isRequired,
  reorderPlaylistActivities: PropTypes.func.isRequired,
  editResource: PropTypes.func.isRequired,
  createResource: PropTypes.func.isRequired,
  createResourceByH5PUpload: PropTypes.func.isRequired,
  createPlaylist: PropTypes.func.isRequired,
  showCreateResourceModal: PropTypes.func.isRequired,
  hideCreateResourceModal: PropTypes.func.isRequired,
  showCreatePlaylistModal: PropTypes.func.isRequired,
  hideCreatePlaylistModal: PropTypes.func.isRequired,
  showCreateResourceActivity: PropTypes.func.isRequired,
  showResourceDescribeActivity: PropTypes.func.isRequired,
  loadLms: PropTypes.func.isRequired,
};

PlaylistsPage.defaultProps = {
  openCreatePopup: false,
  openCreateResourcePopup: false,
  openEditResourcePopup: false,
};

const mapDispatchToProps = (dispatch) => ({
  createPlaylist: (id, title) => dispatch(createPlaylistAction(id, title)),
  deletePlaylist: (projectId, id) => dispatch(deletePlaylistAction(projectId, id)),
  showCreatePlaylistModal: () => dispatch(showCreatePlaylistModalAction()),
  hideCreatePlaylistModal: () => dispatch(hideCreatePlaylistModalAction()),
  hideDeletePopup: () => dispatch(hideDeletePopupAction()),
  showCreateResourceModal: (id) => dispatch(showCreateResourceModalAction(id)),
  hideCreateResourceModal: () => dispatch(hideCreateResourceModalAction()),
  hidePreviewResourceModal: () => dispatch(hidePreviewResourceModalAction()),
  showCreateProjectModal: () => dispatch(showCreateProjectModalAction()),
  loadProjectPlaylists: (id) => dispatch(loadProjectPlaylistsAction(id)),
  createResource: (id, editor, editorType, metadata, playlistId) => dispatch(createResourceAction(id, editor, editorType, metadata, playlistId)),
  editResource: (id, editor, editorType, actId, metadata) => dispatch(editResourceAction(id, editor, editorType, actId, metadata)),
  createResourceByH5PUpload: (id, editor, editorType, payload, mdata, projId) => dispatch(createResourceByH5PUploadAction(id, editor, editorType, payload, mdata, projId)),
  loadProject: (id) => dispatch(loadProjectAction(id)),
  deleteResource: (activityId) => dispatch(deleteResourceAction(activityId)),
  showDeletePopup: (id, title, deleteType) => dispatch(showDeletePopupAction(id, title, deleteType)),
  showCreateResourceActivity: () => dispatch(showCreateResourceActivityAction()),
  showResourceDescribeActivity: (activity, id) => dispatch(showDescribeActivityAction(activity, id)),
  showBuildActivity: (editor, editorType, id) => dispatch(showBuildActivityAction(editor, editorType, id)),
  onChangeActivityType: (activityTypeId) => dispatch(onChangeActivityTypeAction(activityTypeId)),
  onChangeActivity: (e, activity) => dispatch(onChangeActivityAction(e, activity)),
  uploadResourceThumbnail: () => dispatch(uploadResourceThumbnailAction()),
  reorderPlaylists: (projectId, orgPlaylists, playlists) => dispatch(reorderPlaylistsAction(projectId, orgPlaylists, playlists)),
  loadLms: () => dispatch(loadLmsAction()),
});

const mapStateToProps = (state) => ({
  playlist: state.playlist,
  resource: state.resource,
  project: state.project,
  ui: state.ui,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistsPage),
);
