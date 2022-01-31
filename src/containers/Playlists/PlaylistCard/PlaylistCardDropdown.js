/*eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';
import linkIcon from 'assets/images/project-link.svg';
import ShareLink from 'components/ResourceCard/ShareLink';
import ResourceCardDropdownShare from 'components/ResourceCard/shareResource';
import { deletePlaylistAction, changePlaylistTitleAction, enablePlaylistShare } from 'store/actions/playlist';
import { showDeletePopupAction, hideDeletePopupAction } from 'store/actions/ui';
import { clonePlaylist } from 'store/actions/search';
import Preview from '../../../assets/images/menu-pre.svg';
import Edit from '../../../assets/images/menu-edit.svg';
import Duplicate from '../../../assets/images/menu-dupli.svg';
import Delete from '../../../assets/images/menu-dele.svg';
import MenuLogo from '../../../assets/images/menu-logo.svg';

import './style.scss';
import SharePreviewPopup from 'components/SharePreviewPopup';

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
      handleShow,
      setProjectId,
      setProjectPlaylistId,
      enablePlaylistShared,
      selectedProject,
    } = this.props;
    const { permission } = organization;
    return (
      <Dropdown className="pull-right playlist-dropdown check">
        <Dropdown.Toggle className="playlist-dropdown-btn">
          <img src={MenuLogo} alt="logo" />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {(Object.keys(teamPermission).length
            ? teamPermission?.Team?.includes('team:view-playlist')
            : permission?.Playlist?.includes('playlist:view') && permission?.Activity?.includes('activity:view')) && (
            <Dropdown.Item
              as={Link}
              className="hidden"
              to={`/org/${organization.currentOrganization?.domain}/project/${playlist.project_id}/playlist/${playlist.id}/activity/${playlist?.activities[0]?.id}/preview`}
            >
              <img src={Preview} alt="Preview" className="menue-img" />
              Preview
            </Dropdown.Item>
          )}
          {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:edit-playlist') : permission?.Playlist?.includes('playlist:edit')) && (
            <Dropdown.Item
              onClick={() => {
                handleClickPlaylistTitle();
                if (setSelectedForEdit) {
                  setSelectedForEdit(playlist);
                }
              }}
            >
              <img src={Edit} alt="Preview" className="menue-img" />
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
              <img src={Duplicate} alt="Preview" className="menue-img" />
              Duplicate
            </Dropdown.Item>
          )}
          {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:share-playlist') : permission?.Playlist?.includes('playlist:publish')) &&
            selectedProject.shared && (
              <Dropdown.Item
                to="#"
                onClick={() => {
                  const protocol = `${window.location.href.split('/')[0]}//`;
                  const url = `${protocol + window.location.host}/project/${playlist?.project?.id}/playlist/${playlist.id}/shared`;
                  if (!playlist.shared) {
                    Swal.showLoading();
                    enablePlaylistShared(playlist?.project.id, playlist.id);
                    Swal.close();
                    SharePreviewPopup(url, null, playlist.title);
                  } else {
                    SharePreviewPopup(url, null, playlist.title);
                  }
                }}
              >
                {playlist?.shared ? (
                  <>
                    <FontAwesomeIcon icon="link" className="mr-2" />
                    Get link
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon="share" className="mr-2" />
                    Share
                  </>
                )}
              </Dropdown.Item>
            )}
          {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:publish-playlist') : permission?.Playlist?.includes('playlist:delete')) && (
            <>
              <ShareLink
                playlistId={playlist.id}
                gcr_playlist_visibility={playlist.gcr_playlist_visibility}
                projectId={playlist.project_id}
                handleShow={handleShow}
                setProjectId={setProjectId}
                setProjectPlaylistId={setProjectPlaylistId}
              />
              <Dropdown.Item onClick={this.handleDelete}>
                <img src={Delete} alt="Preview" className="menue-img" />
                Delete
              </Dropdown.Item>
            </>
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
  handleShow: PropTypes.func.isRequired,
  enablePlaylistShared: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deletePlaylist: (projectId, id) => dispatch(deletePlaylistAction(projectId, id)),
  showDeletePopup: (id, title, deleteType) => dispatch(showDeletePopupAction(id, title, deleteType)),
  hideDeletePopup: () => dispatch(hideDeletePopupAction()),
  changePlaylistTitle: (projectId, id, title) => dispatch(changePlaylistTitleAction(projectId, id, title)),
  enablePlaylistShared: (projectId, playlistId) => dispatch(enablePlaylistShare(projectId, playlistId)),
});

const mapStateToProps = (state) => ({
  selectedProject: state.project.selectedProject,
  organization: state.organization,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlaylistCardDropdown));
