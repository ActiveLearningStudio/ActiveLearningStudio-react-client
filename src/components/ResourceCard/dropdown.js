import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';

import { deleteResourceAction } from 'store/actions/resource';
import { cloneActivity } from 'store/actions/search';
import ResourceCardDropdownShare from './shareResource';

import './style.scss';

const ResourceCardDropdown = (props) => {
  const {
    resource,
    deleteResource,
    playlist,
    match,
    teamPermission,
  } = props;
  const organization = useSelector((state) => state.organization);
  const { permission } = organization;
  const handleDelete = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Are you sure you want to delete this activity?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteResource(resource.id, playlist.id);
      }
    });
  };

  return (
    <Dropdown className="pull-right resource-dropdown check">
      <Dropdown.Toggle className="resource-dropdown-btn">
        <FontAwesomeIcon icon="ellipsis-v" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:view-activity') : permission?.Activity?.includes('activity:view')) && (
          <Dropdown.Item
            as={Link}
            to={`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}/playlist/${playlist.id}/activity/${resource.id}/preview`}
          >
            <FontAwesomeIcon icon="eye" className="mr-2" />
            Preview
          </Dropdown.Item>
        )}
        {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:edit-activity') : permission?.Activity?.includes('activity:edit')) && (
          <Dropdown.Item
            as={Link}
            to={`/studio/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}/playlist/${playlist.id}/activity/${resource.id}/edit`}
          >
            <FontAwesomeIcon icon="pen" className="mr-2" />
            Edit
          </Dropdown.Item>
        )}
        {permission?.Activity?.includes('activity:duplicate') && (
          <Dropdown.Item
            to="#"
            onClick={() => {
              Swal.showLoading();
              cloneActivity(playlist.id, resource.id);
            }}
          >
            <FontAwesomeIcon icon="clone" className="mr-2" />
            Duplicate
          </Dropdown.Item>
        )}
        {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:share-activity') : permission?.Activity?.includes('activity:share')) && (
          <ResourceCardDropdownShare resource={resource} />
        )}
        {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:delete-activity') : permission?.Activity?.includes('activity:delete')) && (
          <Dropdown.Item onClick={handleDelete}>
            <FontAwesomeIcon icon="times-circle" className="mr-2" />
            Delete
          </Dropdown.Item>
        )}

      </Dropdown.Menu>
    </Dropdown>
  );
};

ResourceCardDropdown.propTypes = {
  resource: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  deleteResource: PropTypes.func.isRequired,
  teamPermission: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteResource: (activityId, playlistId) => dispatch(deleteResourceAction(activityId, playlistId)),
});

export default withRouter(connect(null, mapDispatchToProps)(ResourceCardDropdown));
