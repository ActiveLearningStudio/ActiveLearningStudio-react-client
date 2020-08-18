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
  clickPlaylistTitleAction,
} from 'store/actions/playlist';
import { showDeletePopupAction, hideDeletePopupAction } from 'store/actions/ui';
import ResourceCard from 'components/ResourceCard';
import ShareLink from 'components/ResourceCard/ShareLink';

// TODO: need to clean up attributes, update to functional component
// need to refactor template functions
class PlaylistCard extends React.Component {
  handleDelete = (e) => {
    e.preventDefault();

    const { playlist, showDeletePopup } = this.props;
    showDeletePopup(playlist.id, playlist.title, 'Playlist');
  };

  handleAddNewResourceClick = () => {
    const { playlist, handleCreateResource } = this.props;
    if (!handleCreateResource) {
      console.log('Event handler handleCreateResource() not defined.');
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
        key={resource._id}
        index={index}
      />
    ));
  }

  onEnterPress = (e) => {
    if (e.charCode === 13) {
      this.titleInput.blur();
    }
  }

  handleClickPlaylistTitle = async (playlistId) => {
    const { clickPlaylistTitle } = this.props;
    await clickPlaylistTitle(playlistId);
    this.titleInput.focus();
  }

  render() {
    const {
      index,
      playlist,
      title,
      project,
      playlistTitleClicked,
      changePlaylistTitle,
    } = this.props;

    return (
      <Draggable
        key={playlist.id}
        draggableId={playlist.id}
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
                <h2 className="list-header-name">
                  <span
                    className={playlistTitleClicked ? 'hide' : 'show'}
                    onClick={() => this.handleClickPlaylistTitle(playlist.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {title}
                  </span>

                  <textarea
                    ref={(input) => {
                      this.titleInput = input;
                    }}
                    name="playlist-title"
                    className={playlistTitleClicked ? 'show' : 'hide'}
                    onBlur={(e) => changePlaylistTitle(e, playlist.id)}
                    onKeyPress={this.onEnterPress}
                    defaultValue={title}
                  />

                  <Dropdown className="pull-right playlist-dropdown check">
                    <Dropdown.Toggle className="project-dropdown-btn">
                      <FontAwesomeIcon icon="ellipsis-v" />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item
                        as={Link}
                        className="hidden"
                        to={`/project/${playlist.project.id}/playlist/${playlist.id}/preview`}
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
                        playlistName={title}
                        projectName={project.selectedProject && project.selectedProject.name}
                      />

                      {/*
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open('/api/download/project/123');
                        }}
                      >
                        <FontAwesomeIcon icon="cloud-download" className="mr-2" />
                        Executable
                      </a>
                      */}

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
                droppableId={playlist.id}
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
                  <FontAwesomeIcon icon="plus-circle" />
                  {' '}
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
  title: PropTypes.string.isRequired,
  playlist: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  playlistTitleClicked: PropTypes.bool.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
  hideDeletePopup: PropTypes.func.isRequired,
  reorderPlaylistActivities: PropTypes.func.isRequired,
  changePlaylistTitle: PropTypes.func.isRequired,
  clickPlaylistTitle: PropTypes.func.isRequired,
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
  clickPlaylistTitle: (playlistId) => dispatch(clickPlaylistTitleAction(playlistId)),
});

const mapStateToProps = (state) => ({
  project: state.project,
  ui: state.ui,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistCard),
);
