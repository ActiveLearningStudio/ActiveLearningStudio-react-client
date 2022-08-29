/*eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as actionTypes from 'store/actionTypes';
import { changePlaylistTitleAction, clearFormData } from 'store/actions/playlist';
import { clearSearch } from 'store/actions/search';
import { showDeletePopupAction, hideDeletePopupAction } from 'store/actions/ui';
import ResourceCard from 'components/ResourceCard';
import PlaylistCardDropdown from './PlaylistCardDropdown';
import UploadLogo from '../../../assets/images/upload-active.svg';

import './style.scss';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import { faPlus, faServer, faUpload } from '@fortawesome/free-solid-svg-icons';
import OverlayTriggerPop from 'utils/OverlayTiggerPop/overlaytiggerpop';
import PlusSmSvg from 'iconLibrary/mainContainer/PlusSmSvg';
import MyActivitySmSvg from 'iconLibrary/mainContainer/MyActivitySmSvg';
import UploadSmSvg from 'iconLibrary/mainContainer/UploadSmSvg';

// TODO: need to clean up attributes, update to functional component
// need to refactor template functions
class PlaylistCard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
    };
  }
  handleDelete = (e) => {
    e.preventDefault();

    const { playlist, showDeletePopup } = this.props;
    showDeletePopup(playlist.id, playlist.title, 'Playlist');
  };

  handleAddNewResourceClick = () => {
    const { playlist, handleCreateResource, clearForm } = this.props;
    clearForm();
    if (!handleCreateResource) {
      // console.log('Event handler handleCreateResource() not defined.');
    } else {
      handleCreateResource(playlist);
    }
  };

  renderResources = () => {
    const { playlist, organization, teamPermission, handleShow, setProjectId, setProjectPlaylistId, setProjectPlaylistActivityId } = this.props;

    if (!playlist.activities || playlist.activities.length === 0) {
      return <div className="playlist-no-resource">No activities yet.</div>;
    }

    return playlist.activities.map(
      (resource, index) =>
        (Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:view-activity') : organization?.permission?.Activity?.includes('activity:view')) && (
          <ResourceCard
            {...this.props}
            resource={resource}
            key={resource.id}
            index={index}
            teamPermission={teamPermission || {}}
            handleShow={handleShow}
            setProjectId={setProjectId}
            setProjectPlaylistId={setProjectPlaylistId}
            setProjectPlaylistActivityId={setProjectPlaylistActivityId}
          />
        ),
    );
  };

  onEnterPress = (e) => {
    if (e.charCode === 13) {
      this.titleInput.blur();
    }
  };

  onBlur = (e) => {
    const title = e.target.value;
    if (title.length > 50) {
      Swal.fire('The title may not be greater than 50 characters.');
      return;
    }
    const { playlist, projectId, changePlaylistTitle } = this.props;

    this.setState({
      editMode: false,
    });

    if (playlist.title !== title) {
      changePlaylistTitle(projectId, playlist.id, title).catch((err) => {
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
      });
    }
  };

  handleClickPlaylistTitle = async () => {
    if (this.props.organization?.permission?.Playlist?.includes('playlist:edit') || this.props.teamPermission?.Team?.includes('team:edit-playlist')) {
      this.setState(
        {
          editMode: true,
        },
        () => {
          this.titleInput.focus();
        },
      );
    }
  };

  render() {
    const { editMode } = this.state;
    const { index, playlist, projectId, organization, teamPermission, handleShow, setProjectId, setProjectPlaylistId, setProjectPlaylistActivityId } = this.props;
    const { permission } = organization;
    const primaryColor = getGlobalColor('--main-primary-color');
    return (
      <Draggable key={playlist.id} draggableId={`${playlist.id}`} index={index}>
        {(provided) => (
          <div className="list-wrapper" ref={provided.innerRef} {...provided.draggableProps}>
            <div className="list playlist-bg">
              <div className="list-header" {...provided.dragHandleProps}>
                <h2 className="playlist-header-name d-flex align-items-center">
                  <div className={`playlist-title-wrapper d-flex align-items-center ${editMode ? 'hide' : 'show'}`} onClick={this.handleClickPlaylistTitle}>
                    <span title={playlist.title}>{playlist.title}</span>
                    {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:edit-playlist') : permission?.Playlist?.includes('playlist:edit')) && (
                      <FontAwesomeIcon icon="pencil-alt" className="ml-2 edit-icon" />
                    )}
                  </div>

                  <textarea
                    ref={(input) => {
                      this.titleInput = input;
                    }}
                    name="playlist-title"
                    className={editMode ? 'show' : 'hide'}
                    onBlur={this.onBlur}
                    onKeyPress={this.onEnterPress}
                    defaultValue={playlist.title}
                  />

                  <PlaylistCardDropdown
                    playlist={playlist}
                    handleClickPlaylistTitle={this.handleClickPlaylistTitle}
                    teamPermission={teamPermission || {}}
                    handleShow={handleShow}
                    setProjectId={setProjectId}
                    setProjectPlaylistId={setProjectPlaylistId}
                    setProjectPlaylistActivityId={setProjectPlaylistActivityId}
                  />
                </h2>
              </div>
              <div className="playlist-header-icon-section">
                {(Object.keys(teamPermission).length
                  ? teamPermission?.Team?.includes('team:add-activity')
                  : permission?.Activity?.includes('activity:create') || permission?.Activity?.includes('activity:upload')) && (
                  <div className="mr-30 hover-text">
                    <PlusSmSvg
                      primaryColor={primaryColor}
                      onClick={() => {
                        const { clearSearchform } = this.props;

                        this.props.clear();
                        this.props.openActivity(playlist, projectId);
                        clearSearchform();

                        this.props.clearEditState();
                      }}
                    />
                    {/* <FontAwesomeIcon
                      icon={faPlus}
                      color={primaryColor}
                      onClick={() => {
                        const { clearSearchform } = this.props;

                        this.props.clear();
                        this.props.openActivity(playlist, projectId);
                        clearSearchform();

                        this.props.clearEditState();
                      }}
                    /> */}
                    <span className="span-show">Create</span>
                  </div>
                )}
                <div className="mr-30-add hover-text">
                  <MyActivitySmSvg
                    primaryColor={primaryColor}
                    onClick={() => {
                      this.props.setPlaylistIdForSearchingTab(playlist.id);
                      this.props.setSelectSearchModule(true);
                    }}
                  />

                  <span className="span-show">Add existing</span>
                </div>

                <div className="mr-30  hover-text">
                  <UploadSmSvg
                    primaryColor={primaryColor}
                    onClick={() => {
                      const { clearSearchform } = this.props;

                      this.props.clear();
                      this.props.openActivityUpload(playlist, projectId);
                      clearSearchform();

                      this.props.clearEditState();
                    }}
                  />
                  <span className="span-show">Upload</span>
                </div>
              </div>

              <Droppable key={playlist.id} droppableId={`${playlist.id}`} type="resource">
                {(provd) => (
                  <div className="list-body playlist-body-bg" {...provd.droppableProps} ref={provd.innerRef}>
                    <div className="playlist-resources">
                      {this.renderResources()}
                      {provd.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
              {/* {(Object.keys(teamPermission).length
                ? teamPermission?.Team?.includes("team:add-activity")
                : permission?.Activity?.includes("activity:create") ||
                  permission?.Activity?.includes("activity:upload")) && (
                <div className="playlist-add-res-button">
                  <button
                    type="button"
                    className="add-resource-to-playlist-btn"
                    onClick={() => {
                      const { clearSearchform } = this.props;

                      this.props.clear();
                      this.props.openActivity(playlist, projectId);
                      clearSearchform();

                      this.props.clearEditState();
                    }}
                  >

                    <svg
                      width="17"
                      height="16"
                      viewBox="0 0 17 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2"
                    >
                      <path
                        d="M1.5 8C1.51004 8 10.8375 8.00009 15.5 8.00014"
                        stroke={primaryColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.5 15C8.5 14.99 8.5 5.66248 8.5 0.999999"
                        stroke={primaryColor}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Create or upload activity
                  </button>
                </div>
              )} */}
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}

PlaylistCard.propTypes = {
  index: PropTypes.number.isRequired,
  playlist: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
  selectedProject: PropTypes.object.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
  hideDeletePopup: PropTypes.func.isRequired,
  changePlaylistTitle: PropTypes.func.isRequired,
  handleCreateResource: PropTypes.func,
  clearForm: PropTypes.func.isRequired,
  clearSearchform: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  teamPermission: PropTypes.object.isRequired,
};

PlaylistCard.defaultProps = {
  handleCreateResource: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  showDeletePopup: (id, title, deleteType) => dispatch(showDeletePopupAction(id, title, deleteType)),
  hideDeletePopup: () => dispatch(hideDeletePopupAction()),
  changePlaylistTitle: (projectId, id, title) => dispatch(changePlaylistTitleAction(projectId, id, title)),
  clearForm: () => dispatch(clearFormData()),
  clearSearchform: () => dispatch(clearSearch()),
  clearEditState: () =>
    dispatch({
      type: 'SET_ACTIVE_VIDEO_SCREEN',
      payload: '',
    }),
  openActivity: (playlist, project) =>
    dispatch({
      type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
      payload: 'layout',
      playlist: playlist,
      project: project,
    }),
  openActivityUpload: (playlist, project) =>
    dispatch({
      type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
      payload: 'layoutActivityUpload',
      playlist: playlist,
      project: project,
    }),
  // openSearchActivity: (playlist, project) =>
  //   dispatch({
  //     type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
  //     payload: "searchingModule",
  //     playlist: playlist,
  //     project: project,
  //   }),
  clear: () => dispatch({ type: actionTypes.CLEAR_STATE }),
});

const mapStateToProps = (state) => ({
  selectedProject: state.project.selectedProject,
  organization: state.organization,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistCard));
