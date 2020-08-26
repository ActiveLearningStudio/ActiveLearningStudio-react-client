import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';

import logo from 'assets/images/logo.svg';
import {
  changePlaylistTitleAction,
  reorderPlaylistActivitiesAction,
} from 'store/actions/playlist';
import { showDeletePopupAction, hideDeletePopupAction } from 'store/actions/ui';
import ResourceCard from 'components/ResourceCard';
import ShareLink from 'components/ResourceCard/ShareLink';

import './style.scss';

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
    const { playlist, handleCreateResource } = this.props;
    if (!handleCreateResource) {
      // console.log('Event handler handleCreateResource() not defined.');
    } else {
      handleCreateResource(playlist);
    }
  };

  renderResources = () => {
    const { playlist } = this.props;
    if (!playlist.resources || playlist.resources.length === 0) {
      return (
        <div className="alert alert-info m-3">No resources yet.</div>
      );
    }

    return playlist.resources.map((resource, index) => (
      <ResourceCard
        {...this.props}
        resource={resource}
        key={resource.id}
        index={index}
      />
    ));
  };

  onEnterPress = (e) => {
    if (e.charCode === 13) {
      this.titleInput.blur();
    }
  };

  onBlur = (e) => {
    const title = e.target.value;
    const { playlist, projectId, changePlaylistTitle } = this.props;

    this.setState({
      editMode: false,
    });

    if (playlist.title !== title) {
      changePlaylistTitle(projectId, playlist.id, title)
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to update playlist title',
          });
        });
    }
  };

  handleClickPlaylistTitle = async () => {
    this.setState({
      editMode: true,
    }, () => {
      this.titleInput.focus();
    });
  };

  render() {
    const { editMode } = this.state;
    const {
      index,
      playlist,
      projectId,
      selectedProject,
    } = this.props;

    return (
      <Draggable
        key={playlist.id}
        draggableId={`${playlist.id}`}
        index={index}
      >
        {(provided) => (
          <div
            className="list-wrapper"
            ref={provided.innerRef}
            {...provided.draggableProps}
          >
            <div className="list">
              <div className="list-header" {...provided.dragHandleProps}>
                <h2 className="list-header-name d-flex align-items-center">
                  <div
                    className={`list-title-wrapper d-flex align-items-center ${editMode ? 'hide' : 'show'}`}
                    onClick={this.handleClickPlaylistTitle}
                  >
                    <span>{playlist.title}</span>

                    <FontAwesomeIcon icon="pencil-alt" className="ml-2 edit-icon" />
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

                  <Dropdown className="pull-right playlist-dropdown check">
                    <Dropdown.Toggle className="project-dropdown-btn">
                      <FontAwesomeIcon icon="ellipsis-v" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        className="hidden"
                        to={`/project/${projectId}/playlist/${playlist.id}/preview`}
                      >
                        <FontAwesomeIcon icon="eye" className="mr-2" />
                        Preview
                      </Dropdown.Item>

                      {/*
                      <Dropdown.Item href="#">
                        <FontAwesomeIcon icon="pen" className="mr-2" />
                        Edit
                      </a>
                      */}

                      <Dropdown.Item
                        onClick={() => {
                          Swal.fire({
                            title: 'STAY TUNED!',
                            text: 'COMING SOON',
                            imageUrl: logo,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: 'Custom image',
                          });
                        }}
                      >
                        <FontAwesomeIcon icon="share" className="mr-2" />
                        Send To
                      </Dropdown.Item>

                      <ShareLink
                        playlistId={playlist.id}
                        playlistName={playlist.title}
                        projectName={selectedProject && selectedProject.name}
                      />

                      <Dropdown.Item onClick={this.handleDelete}>
                        <FontAwesomeIcon icon="times-circle" className="mr-2" />
                        Delete
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </h2>
              </div>

              <Droppable
                key={playlist.id}
                droppableId={`${playlist.id}`}
                type="resource"
              >
                {(provd) => (
                  <div
                    className="list-body"
                    {...provd.droppableProps}
                    ref={provd.innerRef}
                  >
                    <div className="playlist-resources">
                      {this.renderResources()}
                      {provd.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>

              <div className="playlist-add-res-button">
                <button
                  type="button"
                  className="add-resource-to-playlist-btn"
                  onClick={this.handleAddNewResourceClick}
                >
                  <FontAwesomeIcon icon="plus-circle" className="mr-2" />
                  Add new resource
                </button>
              </div>
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
  reorderPlaylistActivities: PropTypes.func.isRequired,
  changePlaylistTitle: PropTypes.func.isRequired,
  handleCreateResource: PropTypes.func,
};

PlaylistCard.defaultProps = {
  handleCreateResource: undefined,
};

const mapDispatchToProps = (dispatch) => ({
  showDeletePopup: (id, title, deleteType) => dispatch(showDeletePopupAction(id, title, deleteType)),
  hideDeletePopup: () => dispatch(hideDeletePopupAction()),
  reorderPlaylistActivities: (playlist) => dispatch(reorderPlaylistActivitiesAction(playlist)),
  changePlaylistTitle: (e, id) => dispatch(changePlaylistTitleAction(e, id)),
});

const mapStateToProps = (state) => ({
  selectedProject: state.project.selectedProject,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistCard),
);
