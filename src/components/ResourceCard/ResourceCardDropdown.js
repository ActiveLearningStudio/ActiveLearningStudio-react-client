import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';

import logo from 'assets/images/logo.svg';
import { shareActivity, deleteResourceAction } from 'store/actions/resource';
import { cloneActivity } from 'store/actions/search';

import './style.scss';

const ResourceCardDropdown = (props) => {
  const handleDelete = (e) => {
    e.preventDefault();

    const { resource, deleteResource } = props;

    Swal.fire({
      title: 'Are you sure you want to delete this activity?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteResource(resource.id);
      }
    });
  };

  const {
    resource,
    playlist,
    match,
  } = props;

  return (
    <Dropdown className="pull-right resource-dropdown check">
      <Dropdown.Toggle className="resource-dropdown-btn">
        <FontAwesomeIcon icon="ellipsis-v" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          as={Link}
          to={`/project/${match.params.projectId}/playlist/${playlist.id}/activity/${resource.id}/preview`}
        >
          <FontAwesomeIcon icon="eye" className="mr-2" />
          Preview
        </Dropdown.Item>

        <Dropdown.Item
          as={Link}
          to={`/project/${match.params.projectId}/playlist/${playlist.id}/activity/${resource.id}/edit`}
        >
          <FontAwesomeIcon icon="pen" className="mr-2" />
          Edit
        </Dropdown.Item>

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

        <Dropdown.Item
          onClick={() => {
            shareActivity(resource.id);
            const protocol = `${window.location.href.split('/')[0]}//`;
            confirmAlert({
              /* eslint-disable react/prop-types */
              customUI: ({ onClose }) => (
                <div className="share-project-preview-url project-share-check">
                  <br />
                  <h3>
                    You can now share Activity
                    {' '}
                    <strong>{resource.title}</strong>
                    <br />
                    Anyone with the link below can access your activity:
                  </h3>

                  <a
                    target="_blank"
                    href={`/activity/${resource.id}/shared`}
                    rel="noopener noreferrer"
                  >
                    <input
                      id="urllink_clip"
                      value={`${protocol + window.location.host}/activity/${resource.id}/shared`}
                    />
                  </a>

                  <span
                    title="copy to clipboard"
                    aria-hidden="true"
                    onClick={() => {
                      /* Get the text field */
                      const copyText = document.getElementById('urllink_clip');

                      /* Select the text field */
                      copyText.focus();
                      copyText.select();
                      // copyText.setSelectionRange(0, 99999); /*For mobile devices*/

                      /* Copy the text inside the text field */
                      document.execCommand('copy');

                      /* Alert the copied text */
                      Swal.fire({
                        title: 'Link Copied',
                        showCancelButton: false,
                        showConfirmButton: false,
                        timer: 1500,
                        allowOutsideClick: false,
                      });
                    }}
                  >
                    <FontAwesomeIcon icon="clipboard" />
                  </span>
                  <br />

                  <div className="close-btn">
                    <button type="button" onClick={onClose}>
                      Ok
                    </button>
                  </div>
                </div>
              ),
              /* eslint-enable react/prop-types */
            });
          }}
        >
          <FontAwesomeIcon icon="share" className="mr-2" />
          Share
        </Dropdown.Item>

        <Dropdown.Item
          href="#"
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
          <FontAwesomeIcon icon="times-circle" className="mr-2" />
          Executable
        </Dropdown.Item>

        <Dropdown.Item onClick={handleDelete}>
          <FontAwesomeIcon icon="times-circle" className="mr-2" />
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

ResourceCardDropdown.propTypes = {
  resource: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
  deleteResource: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  deleteResource: (activityId) => dispatch(deleteResourceAction(activityId)),
});

export default withRouter(connect(null, mapDispatchToProps)(ResourceCardDropdown));
