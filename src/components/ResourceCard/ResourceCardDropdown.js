/*eslint-disable*/
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { confirmAlert } from "react-confirm-alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import * as actionTypes from "store/actionTypes";
import resourceService from "services/resource.service";
import config from "config";
import { shareActivity, deleteResourceAction } from "store/actions/resource";
import { cloneActivity } from "store/actions/search";
import { getUserLmsSettingsAction } from "store/actions/account";
import { getProjectId, googleShare } from "store/actions/gapi";
import { loadSafariMontagePublishToolAction } from "store/actions/LMS/genericLMS";

import Preview from "../../assets/images/menu-pre.svg";
import Edit from "../../assets/images/menu-edit.svg";
import Duplicate from "../../assets/images/menu-dupli.svg";
import Delete from "../../assets/images/menu-dele.svg";
import Publish from "../../assets/images/menu-publish.svg";
import Xapi from "../../assets/images/menu-xapi.svg";
import MenuLogo from "../../assets/images/menu-logo-2.svg";
import { toast } from "react-toastify";
import "./style.scss";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

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
  } = props;
  const organization = useSelector((state) => state.organization);
  const { selectedProject } = useSelector((state) => state.project);
  const { permission } = organization;
  const dispatch = useDispatch();

  useEffect(() => {
    if (lmsSettingsLoaded) return;

    getLmsSettings();
  }, [match]);

  const handleDelete = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Are you sure you want to delete this activity?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteResource(resource.id, playlist.id);
      }
    });
  };
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <Dropdown className="pull-right resource-dropdown check">
      <Dropdown.Toggle className="resource-dropdown-btn">
        {/* <img src={MenuLogo} alt="logo" /> */}
        <svg
          width="4"
          height="14"
          viewBox="0 0 4 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2 7.75001C2.41422 7.75001 2.75001 7.41422 2.75001 7C2.75001 6.58579 2.41422 6.25 2 6.25C1.58579 6.25 1.25 6.58579 1.25 7C1.25 7.41422 1.58579 7.75001 2 7.75001Z"
            fill="#767676"
            stroke={primaryColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 2.50001C2.41422 2.50001 2.75001 2.16422 2.75001 1.75C2.75001 1.33579 2.41422 1 2 1C1.58579 1 1.25 1.33579 1.25 1.75C1.25 2.16422 1.58579 2.50001 2 2.50001Z"
            fill="#767676"
            stroke={primaryColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 13C2.41422 13 2.75001 12.6642 2.75001 12.25C2.75001 11.8358 2.41422 11.5 2 11.5C1.58579 11.5 1.25 11.8358 1.25 12.25C1.25 12.6642 1.58579 13 2 13Z"
            fill="#767676"
            stroke={primaryColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {(Object.keys(teamPermission).length
          ? teamPermission?.Team?.includes("team:view-activity")
          : permission?.Activity?.includes("activity:view")) && (
          <Dropdown.Item
            as={Link}
            to={`/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}/playlist/${playlist.id}/activity/${resource.id}/preview`}
            onClick={() => {
              if (previewPage === "projectPreview") {
                localStorage.setItem("projectPreview", true);
              } else {
                localStorage.setItem("projectPreview", false);
              }
            }}
          >
            {/* <img src={Preview} alt="Preview" className="menue-img" /> */}
            <svg
              width="16"
              height="12"
              viewBox="0 0 16 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="menue-img"
            >
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

        {(Object.keys(teamPermission).length
          ? teamPermission?.Team?.includes("team:edit-activity")
          : permission?.Activity?.includes("activity:edit")) && (
          <Dropdown.Item
            onClick={async () => {
              toast.dismiss();
              toast.info("Loading Activity ...", {
                className: "project-loading",
                closeOnClick: false,
                closeButton: false,
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 10000,
                icon: "",
              });
              const result = await resourceService.activityH5p(resource.id);
              toast.dismiss();

              dispatch({
                type: actionTypes.SET_ACTIVE_ACTIVITY_SCREEN,
                payload: result.activity?.source_type
                  ? "addvideo"
                  : "addactivity",
                playlist: playlist,
                project: match.params.projectId,
                activity: result.activity,
              });
              if (result.activity?.source_type) {
                dispatch({
                  type: "SET_ACTIVE_VIDEO_SCREEN",
                  payload: result.activity,
                });
              }
            }}
          >
            {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="menue-img"
            >
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
        {permission?.Activity?.includes("activity:duplicate") && (
          <Dropdown.Item
            to="#"
            onClick={() => {
              Swal.showLoading();
              cloneActivity(playlist.id, resource.id);
            }}
          >
            {/* <img src={Duplicate} alt="Preview" className="menue-img" /> */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="menue-img"
            >
              <path
                d="M11.6667 1H2.33333C1.59695 1 1 1.59695 1 2.33333V11.6667C1 12.403 1.59695 13 2.33333 13H11.6667C12.403 13 13 12.403 13 11.6667V2.33333C13 1.59695 12.403 1 11.6667 1Z"
                stroke={primaryColor}
                strokeidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 4.33325V9.66659"
                stroke={primaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.33301 7H9.66634"
                stroke={primaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Duplicate
          </Dropdown.Item>
        )}
        {(Object.keys(teamPermission).length
          ? teamPermission?.Team?.includes("team:publish-activity")
          : permission?.Activity?.includes("activity:share")) &&
          lmsSettings.length !== 0 && (
            <li className="dropdown-submenu send">
              <a tabIndex="-1" className="dropdown-item">
                {/* <img src={Publish} alt="Preview" className="menue-img" /> */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="menue-img"
                >
                  <path
                    d="M10.583 4.52941C11.5495 4.52941 12.333 3.73933 12.333 2.76471C12.333 1.79009 11.5495 1 10.583 1C9.61651 1 8.83301 1.79009 8.83301 2.76471C8.83301 3.73933 9.61651 4.52941 10.583 4.52941Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.41602 8.5631C4.38251 8.5631 5.16602 7.77302 5.16602 6.7984C5.16602 5.82378 4.38251 5.03369 3.41602 5.03369C2.44952 5.03369 1.66602 5.82378 1.66602 6.7984C1.66602 7.77302 2.44952 8.5631 3.41602 8.5631Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.583 13.0001C11.5495 13.0001 12.333 12.21 12.333 11.2354C12.333 10.2608 11.5495 9.4707 10.583 9.4707C9.61651 9.4707 8.83301 10.2608 8.83301 11.2354C8.83301 12.21 9.61651 13.0001 10.583 13.0001Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.27148 7.96411L9.06593 10.3722"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9.06037 3.72876L5.27148 6.13683"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Publish
              </a>
              <ul className="dropdown-menu check overflow-enhancment">
                {resource?.gcr_activity_visibility && (
                  <li
                    onClick={() => {
                      handleShow();
                      getProjectId(match.params.projectId);
                      setProjectId(match.params.projectId);
                      setProjectPlaylistId(playlist.id);
                      setProjectPlaylistActivityId(resource.id);
                      dispatch(googleShare(false));
                    }}
                  >
                    <a>Google Classroom</a>
                  </li>
                )}
                {lmsSettings.map((data) => {
                  return (
                    data.lms_name === "safarimontage" &&
                    data.activity_visibility && (
                      <li>
                        <a
                          onClick={() => {
                            loadSafariMontagePublishTool(
                              playlist.project.id,
                              playlist.id,
                              resource.id,
                              data.id
                            );
                          }}
                        >
                          {data.site_name}
                        </a>
                      </li>
                    )
                  );
                })}
              </ul>
            </li>
          )}
        {selectedProject.shared && (
          <>
            {(Object.keys(teamPermission).length
              ? teamPermission?.Team?.includes("team:share-activity")
              : permission?.Activity?.includes("activity:share")) && (
              <Dropdown.Item
                onClick={() => {
                  shareActivity(resource.id);
                  const protocol = `${window.location.href.split("/")[0]}//`;
                  confirmAlert({
                    /* eslint-disable react/prop-types */
                    customUI: ({ onClose }) => (
                      <div className="share-project-preview-url project-share-check">
                        <br />
                        <h3>
                          You can now share Activity{" "}
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
                            value={`${
                              protocol + window.location.host
                            }/activity/${resource.id}/shared`}
                          />
                        </a>

                        <span
                          title="copy to clipboard"
                          aria-hidden="true"
                          onClick={() => {
                            /* Get the text field */
                            const copyText =
                              document.getElementById("urllink_clip");

                            /* Select the text field */
                            copyText.focus();
                            copyText.select();
                            // copyText.setSelectionRange(0, 99999); /*For mobile devices*/

                            /* Copy the text inside the text field */
                            document.execCommand("copy");

                            /* Alert the copied text */
                            Swal.fire({
                              title: "Link Copied",
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
                          <button
                            className="curriki-btn-extra"
                            type="button"
                            onClick={onClose}
                          >
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
          </>
        )}
        {permission?.Activity?.includes("activity:share") && (
          <Dropdown.Item
            href={`${window.__RUNTIME_CONFIG__.REACT_APP_API_URL}/${config.apiVersion}/go/getxapifile/${resource.id}`}
            onClick={() => shareActivity(resource.id)}
          >
            {/* <img src={Xapi} alt="Preview" className="menue-img" /> */}
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="menue-img"
            >
              <path
                d="M13 9V11.6667C13 12.0203 12.8595 12.3594 12.6095 12.6095C12.3594 12.8595 12.0203 13 11.6667 13H2.33333C1.97971 13 1.64057 12.8595 1.39052 12.6095C1.14048 12.3594 1 12.0203 1 11.6667V9"
                stroke={primaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.66699 5.66675L7.00033 9.00008L10.3337 5.66675"
                stroke={primaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7 9V1"
                stroke={primaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            xAPI Download
          </Dropdown.Item>
        )}
        {(Object.keys(teamPermission).length
          ? teamPermission?.Team?.includes("team:delete-activity")
          : permission?.Activity?.includes("activity:delete")) && (
          <Dropdown.Item onClick={handleDelete}>
            {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
            <svg
              width="12"
              height="14"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="menue-img"
            >
              <path
                d="M0.75 3.39966H1.91667H11.25"
                stroke={primaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                stroke={primaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4.83301 6.39966V9.99966"
                stroke={primaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.16699 6.39966V9.99966"
                stroke={primaryColor}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
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
  deleteResource: (activityId, playlistId) =>
    dispatch(deleteResourceAction(activityId, playlistId)),
  getLmsSettings: () => dispatch(getUserLmsSettingsAction()),
  loadSafariMontagePublishTool: (
    projectId,
    playlistId,
    activityId,
    lmsSettingId
  ) =>
    dispatch(
      loadSafariMontagePublishToolAction(
        projectId,
        playlistId,
        activityId,
        lmsSettingId
      )
    ),
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ResourceCardDropdown)
);
