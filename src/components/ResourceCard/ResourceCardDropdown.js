/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector, useDispatch } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';
import * as actionTypes from 'store/actionTypes';
import resourceService from 'services/resource.service';
import config from 'config';
import { shareActivity, deleteResourceAction } from 'store/actions/resource';
import { cloneActivity } from 'store/actions/search';
import { getUserLmsSettingsAction } from 'store/actions/account';
import { getProjectId, googleShare, shareToCanvas, msTeamShare, publishLmsSettings } from 'store/actions/gapi';
import { loadSafariMontagePublishToolAction } from 'store/actions/LMS/genericLMS';

import Preview from '../../assets/images/menu-pre.svg';
import Edit from '../../assets/images/menu-edit.svg';
import Duplicate from '../../assets/images/menu-dupli.svg';
import Delete from '../../assets/images/menu-dele.svg';
import Publish from '../../assets/images/menu-publish.svg';
import Xapi from '../../assets/images/menu-xapi.svg';
import MenuLogo from '../../assets/images/menu-logo-2.svg';
import { toast } from 'react-toastify';
import './style.scss';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import MenuMdSvg from 'iconLibrary/dropDown/MenuMdSvg';
import PreviewSmSvg from 'iconLibrary/dropDown/PreviewSmSvg';
import EditDpDnMdSvg from 'iconLibrary/dropDown/EditDpDnMdSvg';
import DuplicateSmSvg from 'iconLibrary/dropDown/DuplicateSmSvg';
import PublishSmSvg from 'iconLibrary/dropDown/PublishSmSvg';
import DownloadSmSvg from 'iconLibrary/dropDown/DownloadSmSvg';
import DeleteSmSvg from 'iconLibrary/dropDown/DeleteSmSvg';

const ResourceCardDropdown = (props) => {
  const {
    lmsSettings,
    lmsSettingsLoaded,
    getLmsSettings,
    resource,
    playlist,
    deleteResource,
    loadSafariMontagePublishTool,
    match,
    teamPermission,
    previewPage,
    handleShow,
    setProjectId,
    setProjectPlaylistId,
    setProjectPlaylistActivityId,
    setselectedProjectPlaylistName,
    setselectedPlaylistActivityName,
  } = props;
  const organization = useSelector((state) => state.organization);
  const { selectedProject } = useSelector((state) => state.project);
  const { permission, activeOrganization } = organization;
  const dispatch = useDispatch();

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
  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <Dropdown className="pull-right resource-dropdown check">
      <Dropdown.Toggle className="resource-dropdown-btn">
        <MenuMdSvg primaryColor={primaryColor} />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:view-activity') : permission?.Activity?.includes('activity:view')) && (
          <Dropdown.Item
            as={Link}
            to={`/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}/playlist/${playlist.id}/activity/${resource.id}/preview?view=activity`}
            onClick={() => {
              if (previewPage === 'projectPreview') {
                localStorage.setItem('projectPreview', true);
              } else {
                localStorage.setItem('projectPreview', false);
              }
            }}
          >
            <PreviewSmSvg primaryColor={primaryColor} className="menue-img" />
            Preview
          </Dropdown.Item>
        )}

        {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:edit-activity') : permission?.Activity?.includes('activity:edit')) && (
          <Dropdown.Item
            onClick={async () => {
              toast.dismiss();
              toast.info('Loading Activity ...', {
                className: 'project-loading',
                closeOnClick: false,
                closeButton: false,
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 10000,
                icon: '',
              });
              const result = await resourceService.activityH5p(resource.id);
              toast.dismiss();

              dispatch({
                type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
                payload: result.activity?.source_type ? 'addvideo' : 'addactivity',
                playlist: playlist,
                project: match.params.projectId,
                activity: result.activity,
              });
              if (result.activity?.source_type) {
                dispatch({
                  type: 'SET_ACTIVE_VIDEO_SCREEN',
                  payload: result.activity,
                });
              }
            }}
          >
            <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
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
            <DuplicateSmSvg primaryColor={primaryColor} className="menue-img" />
            Duplicate
          </Dropdown.Item>
        )}
        {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:publish-activity') : permission?.Activity?.includes('activity:share')) &&
          lmsSettings.length !== 0 && (
            <li className="dropdown-submenu send">
              <a tabIndex="-1" className="dropdown-item">
                <PublishSmSvg primaryColor={primaryColor} className="menue-img" />
                Publish
              </a>
              <ul className="dropdown-menu check overflow-enhancment">
                {activeOrganization?.gcr_activity_visibility && (
                  <li
                    onClick={() => {
                      handleShow();
                      getProjectId(match.params.projectId);
                      setProjectId(match.params.projectId);
                      setProjectPlaylistId(playlist.id);
                      setProjectPlaylistActivityId(resource.id);
                      dispatch(googleShare(false));
                      dispatch(shareToCanvas(false));
                    }}
                  >
                    <a>Google Classroom</a>
                  </li>
                )}
                {activeOrganization?.msteam_activity_visibility && (
                  <li
                    onClick={() => {
                      handleShow();
                      // getProjectId(match.params.projectId);
                      // setProjectId(match.params.projectId);
                      // setProjectPlaylistId(playlist.id);
                      setProjectPlaylistActivityId(resource.id);
                      dispatch(msTeamShare(true));
                      dispatch(googleShare(true));
                      dispatch(shareToCanvas(false));
                    }}
                  >
                    <a>Microsoft Teams</a>
                  </li>
                )}
                {/* <li
                  onClick={() => {
                    handleShow();
                    console.log('res', resource);
                    setselectedPlaylistActivityName(resource.title);
                    getProjectId(match.params.projectId);
                    setProjectId(match.params.projectId);
                    setProjectPlaylistId(playlist.id);
                    dispatch(publishLmsSettings(data));
                    setselectedProjectPlaylistName(playlist.title);
                    setProjectPlaylistActivityId(resource.id);
                    dispatch(googleShare(true));
                    dispatch(shareToCanvas(true));
                  }}
                >
                  <a>Curriki Canvas</a>
                </li> */}
                {lmsSettings.map((data) => {
                  if ((data.lms_name === 'canvas' && data.activity_visibility) || (data.lms_name === 'canvas' && data.activity_visibility)) {
                    return (
                      <li>
                        <a
                          onClick={() => {
                            if (data.lms_name === 'canvas') {
                              handleShow();
                              console.log('res', resource);
                              setselectedPlaylistActivityName(resource.title);
                              getProjectId(match.params.projectId);
                              setProjectId(match.params.projectId);
                              setProjectPlaylistId(playlist.id);
                              dispatch(publishLmsSettings(data));
                              setselectedProjectPlaylistName(playlist.title);
                              setProjectPlaylistActivityId(resource.id);
                              dispatch(googleShare(true));
                              dispatch(shareToCanvas(true));
                            } else {
                              loadSafariMontagePublishTool(playlist.project.id, playlist.id, resource.id, data.id);
                            }
                          }}
                        >
                          {data.site_name}
                        </a>
                      </li>
                    );
                  }
                })}
              </ul>
            </li>
          )}
        {selectedProject.shared && (
          <>
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
                          You can now share Activity <strong>{resource.title}</strong>
                          <br />
                          Anyone with the link below can access your activity:
                        </h3>

                        <a target="_blank" href={`/activity/${resource.id}/shared`} rel="noopener noreferrer">
                          <input id="urllink_clip" value={`${protocol + window.location.host}/activity/${resource.id}/shared`} />
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

                        <div className="close-btn flex-center">
                          <button className="curriki-btn-extra" type="button" onClick={onClose}>
                            Ok
                          </button>
                        </div>
                      </div>
                    ),
                    /* eslint-enable react/prop-types */
                  });
                }}
              >
                <FontAwesomeIcon icon="link" className="mr-2" />
                Get link
              </Dropdown.Item>
            )}
          </>
        )}
        {permission?.Activity?.includes('activity:share') && (
          <Dropdown.Item href={`${window.__RUNTIME_CONFIG__.REACT_APP_API_URL}/${config.apiVersion}/go/getxapifile/${resource.id}`} onClick={() => shareActivity(resource.id)}>
            <DownloadSmSvg primaryColor={primaryColor} className="menue-img" />
            xAPI Download
          </Dropdown.Item>
        )}
        {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:delete-activity') : permission?.Activity?.includes('activity:delete')) && (
          <Dropdown.Item onClick={handleDelete}>
            <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
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
  teamPermission: PropTypes.object.isRequired,
  previewPage: PropTypes.string.isRequired,
  handleShow: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
  setProjectPlaylistId: PropTypes.func.isRequired,
  setProjectPlaylistActivityId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  lmsSettings: state.account.userLmsSettings,
  lmsSettingsLoaded: state.account.userLmsSettingsLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  deleteResource: (activityId, playlistId) => dispatch(deleteResourceAction(activityId, playlistId)),
  getLmsSettings: () => dispatch(getUserLmsSettingsAction()),
  loadSafariMontagePublishTool: (projectId, playlistId, activityId, lmsSettingId) => dispatch(loadSafariMontagePublishToolAction(projectId, playlistId, activityId, lmsSettingId)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResourceCardDropdown));
