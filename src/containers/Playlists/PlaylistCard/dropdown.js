import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';
import {deletePlaylistAction} from 'store/actions/playlist';
import { changePlaylistTitleAction } from 'store/actions/playlist';
import { showDeletePopupAction, hideDeletePopupAction } from 'store/actions/ui';

import ShareLink from 'components/ResourceCard/ShareLink';
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
      projectId,
    } = this.props;
   
    return (
     
      <Dropdown className="pull-right playlist-dropdown check">
        <Dropdown.Toggle className="playlist-dropdown-btn">
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
          <ShareLink
            playlistId={playlist.id}
            projectId={projectId}
          />

          <Dropdown.Item
            to="#"
            onClick={() => {
                Swal.showLoading();
                clonePlaylist(projectId, playlist.id);
            }}
          >
          <FontAwesomeIcon icon="clone" className="mr-2" />
            Duplicate
          </Dropdown.Item>

          <Dropdown.Item onClick={this.handleDelete}>
            <FontAwesomeIcon icon="times-circle" className="mr-2" />
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

PlaylistCardDropdown.propTypes = {
  playlist: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deletePlaylist: (projectId, id) => dispatch(deletePlaylistAction(projectId, id)),
  showDeletePopup: (id, title, deleteType) => dispatch(showDeletePopupAction(id, title, deleteType)),
  hideDeletePopup: () => dispatch(hideDeletePopupAction()),
  changePlaylistTitle: (projectId, id, title) => dispatch(changePlaylistTitleAction(projectId, id, title)),
});

const mapStateToProps = () => ({
 // selectedProject: state.project.selectedProject,
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PlaylistCardDropdown),
);
