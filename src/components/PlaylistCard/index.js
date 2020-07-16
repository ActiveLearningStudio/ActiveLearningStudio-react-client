import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from 'assets/images/logo.svg';
import {
  changePlaylistTitleAction,
  reorderPlaylistActivitiesAction,
  clickPlaylistTitleAction,
} from 'store/actions/playlist';
import { showDeletePopupAction, hideDeletePopupAction } from 'store/actions/ui';
import ResourceCard from '../ResourceCard';
import ShareLink from '../ResourceCard/ShareLink';

// TODO: need to clean up attributes, update to functional component
// need to refactor template functions
class PlaylistCard extends React.Component {
  handleDelete = (e) => {
    e.preventDefault();

    const { playlist, showDeletePopup } = this.props;
    showDeletePopup(playlist._id, playlist.title, 'Playlist');
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
      projectId,
      playlistTitleClicked,
      changePlaylistTitle,
    } = this.props;

    return (
      <Draggable
        key={playlist._id}
        draggableId={playlist._id}
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
                    onClick={() => this.handleClickPlaylistTitle(playlist._id)}
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
                    onBlur={(e) => changePlaylistTitle(e, playlist._id)}
                    onKeyPress={this.onEnterPress}
                    defaultValue={title}
                  />

                  <div className="dropdown pull-right playlist-dropdown check">
                    <button
                      className="btn project-dropdown-btn"
                      type="button"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <FontAwesomeIcon icon="ellipsis-v" />
                    </button>

                    <div className="dropdown-menu">
                      <Link
                        className="dropdown-item hidden"
                        to={
                          `/playlist/preview/${playlist._id}`
                          // "/project/preview2/" +
                          // this.props.match.params.projectId
                        }
                      >
                        <FontAwesomeIcon icon="eye" />
                        {' '}
                        Preview
                      </Link>

                      {/*
                      <a className="dropdown-item" href="#">
                        <FontAwesomeIcon icon="pencil" />
                        {' '}
                        Edit
                      </a>
                      */}

                      <a
                        className="dropdown-item"
                        onClick={() => {
                          Swal({
                            title: 'STAY TUNED!',
                            text: 'COMING SOON',
                            imageUrl: logo,
                            imageWidth: 400,
                            imageHeight: 200,
                            imageAlt: 'Custom image',
                          });
                        }}
                      >
                        <FontAwesomeIcon icon="share" />
                        {' '}
                        Send To
                      </a>

                      <ShareLink
                        playlistId={playlist._id}
                        playlistName={title}
                        projectName={projectId.selectedProject && projectId.selectedProject.name}
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
                        <FontAwesomeIcon icon="cloud-download" />
                        {' '}
                        Executable
                      </a>
                      */}

                      <a className="dropdown-item" onClick={this.handleDelete}>
                        <FontAwesomeIcon icon="times-circle-o" />
                        {' '}
                        Delete
                      </a>
                    </div>
                  </div>
                </h2>
              </div>

              <Droppable
                key={playlist._id}
                droppableId={playlist._id}
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
  projectId: PropTypes.object.isRequired,
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
  projectId: state.project,
  ui: state.ui,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistCard),
);
