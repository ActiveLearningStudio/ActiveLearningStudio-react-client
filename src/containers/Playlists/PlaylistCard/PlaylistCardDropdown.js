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
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';

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
      setProjectPlaylistActivityId,
      enablePlaylistShared,
      selectedProject,
    } = this.props;
    const { permission } = organization;
    const primaryColor = getGlobalColor('--main-primary-color');
    return (
      <Dropdown className="pull-right playlist-dropdown check">
        <Dropdown.Toggle className="playlist-dropdown-btn">
          {/* <img src={MenuLogo} alt="logo" /> */}
          <svg width="6" height="20" viewBox="0 0 6 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.00001 11.125C3.62133 11.125 4.12501 10.6213 4.12501 10C4.12501 9.37868 3.62133 8.875 3.00001 8.875C2.37868 8.875 1.875 9.37868 1.875 10C1.875 10.6213 2.37868 11.125 3.00001 11.125Z"
              stroke={primaryColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.00001 3.25001C3.62133 3.25001 4.12501 2.74633 4.12501 2.12501C4.12501 1.50368 3.62133 1 3.00001 1C2.37868 1 1.875 1.50368 1.875 2.12501C1.875 2.74633 2.37868 3.25001 3.00001 3.25001Z"
              stroke={primaryColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.00001 19C3.62133 19 4.12501 18.4963 4.12501 17.875C4.12501 17.2537 3.62133 16.75 3.00001 16.75C2.37868 16.75 1.875 17.2537 1.875 17.875C1.875 18.4963 2.37868 19 3.00001 19Z"
              stroke={primaryColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
              {/* <img src={Preview} alt="Preview" className="menue-img" /> */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                <path
                  d="M1.125 6C1.125 6 3.625 1 8 1C12.375 1 14.875 6 14.875 6C14.875 6 12.375 11 8 11C3.625 11 1.125 6 1.125 6Z"
                  stroke={primaryColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 7.875C9.03553 7.875 9.875 7.03553 9.875 6C9.875 4.96447 9.03553 4.125 8 4.125C6.96447 4.125 6.125 4.96447 6.125 6C6.125 7.03553 6.96447 7.875 8 7.875Z"
                  stroke={primaryColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
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
              {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                <path
                  d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                  stroke={primaryColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                  stroke={primaryColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Edit
            </Dropdown.Item>
          )}
          {permission?.Playlist?.includes('playlist:edit') && (
            <Dropdown.Item
              to="#"
              onClick={() => {
                Swal.showLoading();
                clonePlaylist(playlist.project_id, playlist.id);
              }}
            >
              {/* <img src={Duplicate} alt="Preview" className="menue-img" /> */}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                <path
                  d="M11.6667 1H2.33333C1.59695 1 1 1.59695 1 2.33333V11.6667C1 12.403 1.59695 13 2.33333 13H11.6667C12.403 13 13 12.403 13 11.6667V2.33333C13 1.59695 12.403 1 11.6667 1Z"
                  stroke={primaryColor}
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M7 4.33325V9.66659" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4.33301 7H9.66634" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Duplicate
            </Dropdown.Item>
          )}
          {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:share-playlist') : permission?.Playlist?.includes('playlist:publish')) &&
            selectedProject.shared && (
              <Dropdown.Item
                to="#"
                onClick={() => {
                  const protocol = `${window.location.href.split('/')[0]}//`;
                  const url = `${protocol + window.location.host}/project/${playlist.project_id}/playlist/${playlist.id}/shared`;
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
          <>
            {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:publish-playlist') : permission?.Playlist?.includes('playlist:publish')) && (
              <ShareLink
                playlistId={playlist.id}
                gcr_playlist_visibility={playlist.gcr_playlist_visibility}
                projectId={playlist.project_id}
                handleShow={handleShow}
                setProjectId={setProjectId}
                setProjectPlaylistId={setProjectPlaylistId}
                setProjectPlaylistActivityId={setProjectPlaylistActivityId}
              />
            )}
            {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:delete-playlist') : permission?.Playlist?.includes('playlist:delete')) && (
              <Dropdown.Item onClick={this.handleDelete}>
                {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                  <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Delete
              </Dropdown.Item>
            )}
          </>
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
