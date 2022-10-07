/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { connect, useSelector, useDispatch } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import * as actionTypes from "store/actionTypes";
import MenuLogo from "../../assets/images/menu-logo-2.svg";
import Duplicate from "../../assets/images/menu-dupli.svg";
import resourceService from "services/resource.service";
import { deleteResourceAction, shareActivity } from "store/actions/resource";
import { cloneActivity } from "store/actions/search";
import ResourceCardDropdownShare from "./shareResource";
import { toast } from "react-toastify";
import "./style.scss";
import { confirmAlert } from "react-confirm-alert";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

const ResourceCardDropdown = (props) => {
  const { resource, deleteResource, playlist, match, teamPermission } = props;
  const organization = useSelector((state) => state.organization);
  const { permission } = organization;
  const dispatch = useDispatch();
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
        <img src={MenuLogo} alt="logo" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:view-activity') : permission?.Activity?.includes('activity:view')) && (
					<Dropdown.Item
						as={Link}
						to={`/org/${organization.currentOrganization?.domain}/project/${match.params.projectId}/playlist/${playlist.id}/activity/${resource.id}/preview`}
					>
						<FontAwesomeIcon icon="eye" className="mr-2" />
						Preview
					</Dropdown.Item>
				)} */}
        {/* {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:edit-activity') : permission?.Activity?.includes('activity:edit')) && (
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
								payload: "addactivity",
								playlist: playlist,
								project: match.params.projectId,
								activity: result.activity,
							});
						}}
					>
						<FontAwesomeIcon icon="pen" className="mr-2" />
						Edit
					</Dropdown.Item>
				)} */}
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
                strokeWidth="1.5"
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
        {playlist?.project?.shared && (
          <>
            {(Object.keys(teamPermission).length
              ? teamPermission?.Team?.includes("team:share-activity")
              : permission?.Activity?.includes("activity:share")) && (
              <Dropdown.Item
                onClick={() => {
                  console.log(resource, "resource");
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
        {/* {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:delete-activity') : permission?.Activity?.includes('activity:delete')) && (
					<Dropdown.Item onClick={handleDelete}>
						<FontAwesomeIcon icon="times-circle" className="mr-2" />
						Delete
					</Dropdown.Item>
				)} */}
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
  deleteResource: (activityId, playlistId) =>
    dispatch(deleteResourceAction(activityId, playlistId)),
});

export default withRouter(
  connect(null, mapDispatchToProps)(ResourceCardDropdown)
);
