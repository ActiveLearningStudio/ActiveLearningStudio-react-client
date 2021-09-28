import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown, Modal } from 'react-bootstrap';

// import logo from 'assets/images/logo.svg';
import config from 'config';
import { shareActivity, deleteResourceAction } from 'store/actions/resource';
import { cloneActivity } from 'store/actions/search';
import { getUserLmsSettingsAction } from 'store/actions/account';
import { loadSafariMontagePublishToolAction, closeSafariMontageToolAction } from 'store/actions/LMS/genericLMS';

import './style.scss';

const ResourceCardDropdown = (props) => {
  const {
    lmsSettings,
    lmsSettingsLoaded,
    getLmsSettings,
    resource,
    playlist,
    deleteResource,
    loadSafariMontagePublishTool,
    closeSafariMontageTool,
    safariMontagePublishTool,
    match,
    teamPermission,
    previewPage,
  } = props;
  const organization = useSelector((state) => state.organization);
  const { permission } = organization;
  const [safariToolHtml, setSafariToolHtml] = useState(null);

  useEffect(() => {
    setSafariToolHtml(encodeURI(safariMontagePublishTool));
  }, [safariMontagePublishTool]);

  useEffect(() => {
    if (lmsSettingsLoaded) return;

    getLmsSettings();
  }, [match]);

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
          onClick={() => { if (previewPage === 'projectPreview') { localStorage.setItem('projectPreview', true); } else { localStorage.setItem('projectPreview', false); } }}
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
        {(Object.keys(teamPermission).length
        ? teamPermission?.Team?.includes('team:publish-activity') : permission?.Activity?.includes('activity:share')) && lmsSettings.length !== 0 && (
          <li className="dropdown-submenu send">
            <a tabIndex="-1" className="dropdown-item">
              <FontAwesomeIcon icon="newspaper" className="mr-2" />
              Publish
            </a>
            <ul className="dropdown-menu check">
              {lmsSettings.map((data) => {
                if (data.lms_name !== 'safarimontage') return false;

                return (
                  <li>
                    <a
                      onClick={() => {
                        loadSafariMontagePublishTool(
                          playlist.project.id,
                          playlist.id,
                          resource.id,
                          data.id,
                        );
                      }}
                    >
                      {data.site_name}
                    </a>
                    <Modal
                      dialogClassName="safari-modal"
                      show={safariMontagePublishTool}
                      onHide={() => closeSafariMontageTool()}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          Safari Montage
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <iframe title="Safari Montage" src={`data:text/html;charset=utf-8,${safariToolHtml}`} />
                      </Modal.Body>
                    </Modal>
                  </li>
                );
              })}
            </ul>
          </li>
        )}
        {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:share-activity') : permission?.Activity?.includes('activity:share')) && (
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
                      href={`/studio/activity/${resource.id}/shared`}
                      rel="noopener noreferrer"
                    >
                      <input
                        id="urllink_clip"
                        value={`${protocol + window.location.host}/studio/activity/${resource.id}/shared`}
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
        )}
        {permission?.Activity?.includes('activity:share') && (
          <Dropdown.Item
            href={`${process.env.REACT_APP_API_URL}/${config.apiVersion}/go/getxapifile/${resource.id}`}
            onClick={() => shareActivity(resource.id)}
          >
            <FontAwesomeIcon icon="download" className="mr-2" />
            xAPI Download
          </Dropdown.Item>
        )}
        {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:delete-activity') : permission?.Activity?.includes('activity:delete')) && (
          <Dropdown.Item onClick={handleDelete}>
            <FontAwesomeIcon icon="times-circle" className="mr-2" />
            Delete
          </Dropdown.Item>
        )}

        {/* <Dropdown.Item
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
        </Dropdown.Item> */}
      </Dropdown.Menu>
    </Dropdown>
  );
};

ResourceCardDropdown.propTypes = {
  lmsSettings: PropTypes.array.isRequired,
  lmsSettingsLoaded: PropTypes.bool.isRequired,
  resource: PropTypes.object.isRequired,
  playlist: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
  deleteResource: PropTypes.func.isRequired,
  getLmsSettings: PropTypes.func.isRequired,
  loadSafariMontagePublishTool: PropTypes.func.isRequired,
  closeSafariMontageTool: PropTypes.func.isRequired,
  safariMontagePublishTool: PropTypes.string.isRequired,
  teamPermission: PropTypes.object.isRequired,
  previewPage: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  lmsSettings: state.account.userLmsSettings,
  lmsSettingsLoaded: state.account.userLmsSettingsLoaded,
  safariMontagePublishTool: state.genericLMS.safariMontagePublishTool,
});

const mapDispatchToProps = (dispatch) => ({
  deleteResource: (activityId, playlistId) => dispatch(deleteResourceAction(activityId, playlistId)),
  getLmsSettings: () => dispatch(getUserLmsSettingsAction()),
  loadSafariMontagePublishTool: (projectId, playlistId, activityId, lmsSettingId) => dispatch(loadSafariMontagePublishToolAction(projectId, playlistId, activityId, lmsSettingId)),
  closeSafariMontageTool: () => dispatch(closeSafariMontageToolAction()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResourceCardDropdown));
