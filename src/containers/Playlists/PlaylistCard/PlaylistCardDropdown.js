import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';

import ShareLink from 'components/ResourceCard/ShareLink';
import ResourceCardDropdownShare from 'components/ResourceCard/shareResource';
import { deletePlaylistAction, changePlaylistTitleAction } from 'store/actions/playlist';
import { showDeletePopupAction, hideDeletePopupAction } from 'store/actions/ui';
import { clonePlaylist } from 'store/actions/search';

import './style.scss';

// TODO: need to clean up attributes, update to functional component
// need to refactor template functions
class PlaylistCardDropdown extends React.Component {
  handleDelete = (e) => {
    e.preventDefault();
    const { playlist, showDeletePopup } = this.props;
    showDeletePopup(playlist.id, playlist.title, 'Playlist');
  };

  render() {
    const {
      playlist,
      handleClickPlaylistTitle,
      setSelectedForEdit,
      organization,
      teamPermission,
    } = this.props;
    const { permission } = organization;
    return (
      <Dropdown className="pull-right playlist-dropdown check">
        <Dropdown.Toggle className="playlist-dropdown-btn">
          <FontAwesomeIcon icon="ellipsis-v" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {(Object.keys(teamPermission).length
            ? teamPermission?.Team?.includes('team:view-playlist') : (permission?.Playlist?.includes('playlist:view') && permission?.Activity?.includes('activity:view'))) && (
            <Dropdown.Item
              as={Link}
              className="hidden"
              to={`/studio/org/${organization.currentOrganization?.domain}/project/${playlist.project_id}/playlist/${playlist.id}/activity/${playlist?.activities[0]?.id}/preview`}
            >
              <FontAwesomeIcon icon="eye" className="mr-2" />
              Preview
            </Dropdown.Item>
          )}
          {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:edit-playlist') : permission?.Playlist?.includes('playlist:edit')) && (
            <Dropdown.Item onClick={() => {
              handleClickPlaylistTitle();
              if (setSelectedForEdit) {
                setSelectedForEdit(playlist);
              }
            }}
            >
              <FontAwesomeIcon icon="edit" className="mr-2" />
              Edit
            </Dropdown.Item>
          )}
          {permission?.Playlist?.includes('playlist:duplicate') && (
            <Dropdown.Item
              to="#"
              onClick={() => {
                Swal.showLoading();
                clonePlaylist(playlist.project_id, playlist.id);
              }}
            >
              <FontAwesomeIcon icon="clone" className="mr-2" />
              Duplicate
            </Dropdown.Item>
          )}
          {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:share-playlist') : permission?.Playlist?.includes('playlist:share')) && (
            playlist.activities.length > 0
              ? <ResourceCardDropdownShare resource={playlist.activities[0]} />
              : (
                <Dropdown.Item
                  to="#"
                  onClick={() => {
                    Swal.fire('Kindly add Activity First.');
                  }}
                >
                  <FontAwesomeIcon icon="share" className="mr-2" />
                  Share
                </Dropdown.Item>
              )
          )}
          {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:publish-playlist') : permission?.Playlist?.includes('playlist:publish')) && (
            <ShareLink
              playlistId={playlist.id}
              projectId={playlist.project_id}
            />
          )}
          {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:delete-playlist') : permission?.Playlist?.includes('playlist:delete')) && (
            <Dropdown.Item onClick={this.handleDelete}>
              <FontAwesomeIcon icon="times-circle" className="mr-2" />
              Delete
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

PlaylistCardDropdown.propTypes = {
  playlist: PropTypes.object.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
  handleClickPlaylistTitle: PropTypes.func.isRequired,
  setSelectedForEdit: PropTypes.func.isRequired,
  organization: PropTypes.string.isRequired,
  teamPermission: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deletePlaylist: (projectId, id) => dispatch(deletePlaylistAction(projectId, id)),
  showDeletePopup: (id, title, deleteType) => dispatch(showDeletePopupAction(id, title, deleteType)),
  hideDeletePopup: () => dispatch(hideDeletePopupAction()),
  changePlaylistTitle: (projectId, id, title) => dispatch(changePlaylistTitleAction(projectId, id, title)),
});

const mapStateToProps = (state) => ({
  // selectedProject: state.project.selectedProject,
  organization: state.organization,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistCardDropdown),
);
