import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { Alert } from 'react-bootstrap';
import Switch from 'react-switch';

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
  getIndexed,
  getElastic,
} from 'store/actions/project';
import Footer from 'components/Footer';
import DeletePopup from 'components/DeletePopup';
import AddResource from 'components/ResourceCard/AddResource';
import { getTeamPermission } from 'store/actions/team';
import EditResource from 'components/ResourceCard/EditResource';
import PlaylistCard from './PlaylistCard';
import PreviewResourcePage from './PreviewResourcePage';
import CreatePlaylistPopup from './CreatePlaylistPopup';

import './style.scss';

function PlaylistsPage(props) {
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState(false);
  const [error, setError] = useState(null);
  const [indexStatus, setIndexStatus] = useState(null);
  const organization = useSelector((state) => state.organization);
  const team = useSelector((state) => state.team);
  const { teamPermission } = team;
  const { permission, activeOrganization } = organization;
  const state = useSelector((s) => s.project.selectedProject);

  const {
    match,
    history,
    showCreatePlaylistModal,
    showCreateResourceModal,
    hideCreatePlaylistModal,
    hideCreateResourceModal,
    openCreatePopup,
    openCreateResourcePopup,
    openEditResourcePopup,
    loadProject,
    loadProjectPlaylists,
    createPlaylist,
    createResource,
    createResourceByH5PUpload,
    editResource,
    reorderPlaylists,
    loadLms,
    project: { selectedProject },
    resource,
    playlist: { playlists },
    ui,
    getIndexedData,
    getElasticData,
    getTeamPermissions,
  } = props;
  useEffect(() => {
    if (Object.keys(teamPermission).length === 0 && selectedProject.team_id && organization?.currentOrganization?.id) {
      getTeamPermissions(organization?.currentOrganization?.id, selectedProject?.team_id);
    }
  }, [teamPermission, organization?.currentOrganization, selectedProject]);
  useEffect(() => {
    loadLms();
    window.scrollTo(0, 0);

    if (
      !openCreatePopup
      && !openCreateResourcePopup
      && !openEditResourcePopup
      && activeOrganization
    ) {
      loadProject(match.params.projectId);
      loadProjectPlaylists(match.params.projectId);
    }
  }, [loadLms, loadProject, loadProjectPlaylists, match.params.projectId, openCreatePopup, openCreateResourcePopup, openEditResourcePopup, activeOrganization]);
  useEffect(() => {
    if (state.status === 2) {
      setChecked(true);
    } else {
      setChecked(false);
    }

    setIndexStatus(state.indexing);
  }, [state]);

  const handleChange = async (chked) => {
    if (chked) {
      Swal.fire({
        html: '<b>SHOWCASE THIS PROJECT?</b><br><br><p>The Curriki Team is reviewing and selecting projects likes yours'
          + ' to be showcased in the CurrikiStudio repository.</p><p>If selected, your project will be available for other authors'
          + ' to search, preview and reuse/remix.</p>',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes! Review This Project',
        cancelButtonText: 'Not Right Now',
      })
        .then(async (result) => {
          if (result.isConfirmed) {
            Swal.showLoading();
            await getIndexedData(match.params.projectId);
            Swal.showLoading();
            const res = await getElasticData(match.params.projectId);
            loadProject(match.params.projectId);
            if (res.message) {
              Swal.fire(res.message);
            } else if (res.errors) {
              Swal.fire(res.errors[0]);
            }
          }
        });
    } else {
      Swal.showLoading();
      await getIndexedData(match.params.projectId);
      loadProject(match.params.projectId);
    }
  };

  const handleShowCreatePlaylistModal = async (e) => {
    e.preventDefault();

    try {
      await showCreatePlaylistModal();
      history.push(`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}/playlist/create`);
    } catch (err) {
      // console.log(err.message);
    }
  };

  const handleShowCreateResourceModal = (playlist) => {
    try {
      showCreateResourceModal(playlist.id);
      history.push(`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}/playlist/${playlist.id}/activity/create`);
    } catch (e) {
      // console.log(e.message);
    }
  };

  const handleHideCreatePlaylistModal = async (e) => {
    e.preventDefault();

    try {
      await hideCreatePlaylistModal();
      history.push(`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}`);
    } catch (err) {
      // console.log(err.message);
    }
  };

  const handleHideCreateResourceModal = async (e) => {
    e.preventDefault();

    if (!resource.saved) {
      Swal.fire({
        icon: 'warning',
        title: 'You are exiting without saving your data. Are you sure to exit?',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Yes',
        confirmButtonAriaLabel: 'Yes',
        cancelButtonText: 'Cancel',
        cancelButtonAriaLabel: 'Cancel',
      })
        .then(async (resp) => {
          if (resp.isConfirmed) {
            await hideCreateResourceModal();
            history.push(`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}`);
          }
        });
    } else {
      try {
        await hideCreateResourceModal();
        history.push(`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}`);
      } catch (err) {
        // console.log(err.message);
      }
    }
  };

  const onPlaylistTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value) setError(null);
  };

  const handleCreatePlaylistSubmit = async (e) => {
    e.preventDefault();
    if (!/^ *$/.test(title) && title) {
      try {
        await createPlaylist(match.params.projectId, title);
        history.push(`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}`);
      } catch (err) {
        if (err.errors) {
          if (err.errors.title.length > 0) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.errors.title[0],
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message,
          });
        }
      }
    } else {
      setError('* Required');
    }
  };

  const handleCreateResourceSubmit = async (
    currentPlaylistId,
    editor,
    editorType,
    payload,
    metadata,
    projectId,
  ) => {
    try {
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

      history.push(`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}`);
    } catch (e) {
      // console.log(e.message);
    }
  };

  const handleEditResourceSubmit = async (
    currentPlaylistId,
    editor,
    editorType,
    activityId,
    metadata,
  ) => {
    try {
      await editResource(
        currentPlaylistId,
        editor,
        editorType,
        activityId,
        metadata,
      );

      history.push(`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}`);
    } catch (e) {
      // console.log(e);
    }
  };

  const onDragEnd = (e) => {
    if (
      !e.destination
      || (e.destination.index === e.source.index && e.source.droppableId === e.destination.droppableId)
    ) {
      return;
    }

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

  const { showDeletePlaylistPopup, pageLoading } = ui;

  return (
    <>
      <div className="content-wrapper">
        <div className="content">
          <div>
            {pageLoading !== false ? (
              <Alert style={{ marginTop: '15px' }} variant="primary">Loading ...</Alert>
            ) : (
              <>
                <div style={{ marginLeft: '15px' }}>
                  {selectedProject?.team?.name ? `Team Name: ${selectedProject?.team?.name}` : null}
                </div>
                <div className="col playlist-page-project-title project-each-view">
                  <div className="flex-se">
                    <h1>
                      {selectedProject ? selectedProject.name : ''}
                    </h1>
                    {permission?.Project?.includes('project:request-indexing') && (
                      <div className="react-touch">
                        <div className="publish-btn">
                          <span style={{ color: checked ? '#333' : '$mine-shaft' }}>Showcase</span>
                          <Switch checked={checked} onChange={handleChange} />
                        </div>
                      </div>
                    )}
                    {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:add-playlist') : permission?.Playlist?.includes('playlist:create')) && (
                      <button
                        type="button"
                        className="create-playlist-btn"
                        onClick={handleShowCreatePlaylistModal}
                      >
                        <FontAwesomeIcon icon="plus" className="mr-2" />
                        Create new playlist
                      </button>
                    )}
                  </div>

                  <div className="project-preview">
                    <Link
                      className="dropdown-item"
                      to={`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}/preview`}
                    >
                      <FontAwesomeIcon icon="eye" className="mr-2" />
                      Project Preview
                    </Link>
                  </div>
                </div>

                <div className="index-text">
                  {indexStatus === 1 && (
                    <Alert variant="warning">
                      Thank you for submitting this project for inclusion in our Showcase!
                      Your project has been queued up! As soon as our review is completed,
                      we will notify you right here.
                    </Alert>
                  )}
                  {indexStatus === 2 && (
                    <Alert variant="danger">
                      Your project was not selected for inclusion in the Showcase.
                      You are welcome to contact our support team, and revise
                      and resubmit your project at any time.
                    </Alert>
                  )}
                  {indexStatus === 3 && (
                    <Alert variant="success">
                      This project has been selected for inclusion in the CurrikiStudio Showcase
                      and is available for other content authors to find, preview, reuse and remix.
                    </Alert>
                  )}
                </div>

                {!!playlists && playlists.length > 0 ? (
                  <DragDropContext onDragEnd={onDragEnd}>
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
                            (Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:view-playlist') : permission?.Playlist?.includes('playlist:view'))
                            && (
                              <PlaylistCard
                                key={playlist.id}
                                index={index}
                                playlist={playlist}
                                projectId={parseInt(match.params.projectId, 10)}
                                handleCreateResource={handleShowCreateResourceModal}
                                teamPermission={teamPermission || {}}
                              />
                            )
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                ) : (
                  <Alert variant="success">
                    No playlist available, kindly create your playlist.
                  </Alert>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {openCreatePopup && (
        <CreatePlaylistPopup
          handleHideCreatePlaylistModal={handleHideCreatePlaylistModal}
          handleCreatePlaylistSubmit={handleCreatePlaylistSubmit}
          onPlaylistTitleChange={onPlaylistTitleChange}
          error={error}
        />
      )}

      {openCreateResourcePopup && (
        <AddResource
          {...props}
          handleHideCreateResourceModal={handleHideCreateResourceModal}
          handleCreateResourceSubmit={handleCreateResourceSubmit}
          handleEditResourceSubmit={handleEditResourceSubmit}
        />
      )}

      {openEditResourcePopup && (
        <EditResource
          {...props}
          handleHideCreateResourceModal={handleHideCreateResourceModal}
          handleCreateResourceSubmit={handleCreateResourceSubmit}
          handleEditResourceSubmit={handleEditResourceSubmit}
        />
      )}

      {resource.showPreviewResourcePopup && (
        <PreviewResourcePage {...props} />
      )}

      {showDeletePlaylistPopup && (
        <DeletePopup
          {...props}
          deleteType="Playlist"
          selectedProject={selectedProject}
        />
      )}

      <Footer />
    </>
  );
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
  getIndexedData: PropTypes.func.isRequired,
  getElasticData: PropTypes.func.isRequired,
  getTeamPermissions: PropTypes.func.isRequired,
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
  getIndexedData: (id) => dispatch(getIndexed(id)),
  getElasticData: (id) => dispatch(getElastic(id)),
  getTeamPermissions: (orgId, teamId) => dispatch(getTeamPermission(orgId, teamId)),
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
