/* eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dropdown } from "react-bootstrap";
import { toast } from "react-toastify";
import { getProjectId, googleShare } from "store/actions/gapi";
import { cloneProject } from "store/actions/search";
import { getProjectCourseFromLMS } from "store/actions/project";
import { lmsPlaylist } from "store/actions/playlist";
import "./style.scss";
import loader from "assets/images/loader.svg";
import { addProjectsAction } from "store/actions/team";
import Swal from "sweetalert2";
import Duplicate from "../../../assets/images/menu-dupli.svg";
import Delete from "../../../assets/images/menu-dele.svg";
import Publish from "../../../assets/images/menu-publish.svg";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";

const ProjectCardDropdown = (props) => {
  const {
    project,
    handleShow,
    setProjectId,
    showDeletePopup,
    teamPermission,
    // text,
    iconColor,
  } = props;
  const ImgLoader = () => <img src={loader} alt="loader" />;
  const organization = useSelector((state) => state.organization);
  const { selectedTeam } = useSelector((state) => state.team);
  const { permission } = organization;
  const dispatch = useDispatch();
  const AllLms = useSelector((state) => state.share);
  const [allLms, setAllLms] = useState([]);
  useEffect(() => {
    setAllLms(AllLms);
  }, [AllLms]);
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <Dropdown className="project-dropdown check d-flex  align-items-center text-added-project-dropdown">
      <Dropdown.Toggle className="project-dropdown-btn project d-flex justify-content-center align-items-center">
        <FontAwesomeIcon
          icon="ellipsis-v"
          style={{
            fontSize: "13px",
            color: iconColor || "#084892",
            marginLeft: "5px",
          }}
        />
        {/* <span>{text}</span> */}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {/* {!previewMode && (
          <Dropdown.Item
            as={Link}
            to={`/org/${organization.currentOrganization?.domain}/project/${project.id}/preview`}
          >
            <FontAwesomeIcon icon="eye" className="mr-2" />
            Preview
          </Dropdown.Item>
        )} */}
        {/* {(teamPermission && Object.keys(teamPermission).length
          ? teamPermission?.Team?.includes("team:edit-project")
          : permission?.Project?.includes("project:edit")) && (
          <Dropdown.Item
            as={Link}
            onClick={() => {
              setCreateProject(true);
              seteditMode(true);
              dispatch(setSelectedProject(project));
            }}
            // to={`/org/${organization.currentOrganization?.domain}/project/${project.id}/edit`}
          >
            <FontAwesomeIcon icon="pen" className="mr-2" />
            Edit
          </Dropdown.Item>
        )} */}

        {(teamPermission && Object.keys(teamPermission).length
          ? teamPermission?.Team?.includes("team:add-project")
          : permission?.Project?.includes("project:clone")) && (
          <Dropdown.Item
            to="#"
            onClick={() => {
              toast.info("Duplicating project...", {
                className: "project-loading",
                closeOnClick: false,
                closeButton: false,
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 10000,
                icon: ImgLoader,
              });
              if (
                Object.keys(teamPermission).length &&
                teamPermission?.Team?.includes("team:add-project")
              ) {
                dispatch(addProjectsAction(selectedTeam?.id, [project.id]))
                  .then((result) => {
                    Swal.fire({
                      icon: "success",
                      title: result?.message,
                    });
                  })
                  .catch((err) => {
                    Swal.fire({
                      icon: "error",
                      title: err?.message,
                    });
                  });
              } else {
                cloneProject(project.id);
              }
              toast.dismiss();
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7 4.33325V9.66659"
                stroke={primaryColor}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.33301 7H9.66634"
                stroke={primaryColor}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Duplicate
          </Dropdown.Item>
        )}
        {/* {(teamPermission && Object.keys(teamPermission).length
          ? teamPermission?.Team?.includes("team:share-project")
          : permission?.Project?.includes("project:share")) && (
          <Dropdown.Item
            to="#"
            onClick={async () => {
              const protocol = `${window.location.href.split("/")[0]}//`;
              const url = `${protocol + window.location.host}/project/${
                project.id
              }/shared`;
              if (!project.shared) {
                toast.info("Sharing project...", {
                  className: "project-loading",
                  closeOnClick: false,
                  closeButton: false,
                  position: toast.POSITION.BOTTOM_RIGHT,
                  autoClose: 10000,
                  icon: ImgLoader,
                });
                await dispatch(
                  toggleProjectShareAction(project.id, project.name)
                );
                toast.dismiss();
                SharePreviewPopup(url, project.name);
              } else {
                SharePreviewPopup(url, project.name);
              }
            }}
          >
            <FontAwesomeIcon icon="share" className="mr-2" />
            Share
          </Dropdown.Item>
        )} */}
        {(teamPermission && Object.keys(teamPermission).length
          ? teamPermission?.Team?.includes("team:publish-project")
          : permission?.Project?.includes("project:publish")) && (
          <li className="dropdown-submenu send">
            <a tabIndex="-1">
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
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.41602 8.5631C4.38251 8.5631 5.16602 7.77302 5.16602 6.7984C5.16602 5.82378 4.38251 5.03369 3.41602 5.03369C2.44952 5.03369 1.66602 5.82378 1.66602 6.7984C1.66602 7.77302 2.44952 8.5631 3.41602 8.5631Z"
                  stroke={primaryColor}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10.583 13.0001C11.5495 13.0001 12.333 12.21 12.333 11.2354C12.333 10.2608 11.5495 9.4707 10.583 9.4707C9.61651 9.4707 8.83301 10.2608 8.83301 11.2354C8.83301 12.21 9.61651 13.0001 10.583 13.0001Z"
                  stroke={primaryColor}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M5.27148 7.96411L9.06593 10.3722"
                  stroke={primaryColor}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M9.06037 3.72876L5.27148 6.13683"
                  stroke={primaryColor}
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Publish
            </a>
            <ul className="dropdown-menu check">
              {project?.gcr_project_visibility && (
                <li
                  key={`googleclassroom +${project.id}`}
                  onClick={() => {
                    handleShow();
                    getProjectId(project.id);
                    // eslint-disable-next-line react/destructuring-assignment
                    setProjectId(props.project.id);
                    dispatch(googleShare(false));
                  }}
                >
                  <a>Google Classroom</a>
                </li>
              )}

              {allLms.shareVendors &&
                allLms.shareVendors.map(
                  (data) =>
                    data.project_visibility && (
                      <li key={data.id}>
                        <a
                          onClick={async () => {
                            const allPlaylist = await dispatch(
                              lmsPlaylist(project.id)
                            );
                            if (allPlaylist) {
                              dispatch(
                                getProjectCourseFromLMS(
                                  data.lms_name.toLowerCase(),
                                  data.id,
                                  project.id,
                                  allPlaylist.playlists,
                                  data.lms_url
                                )
                              );
                            }
                          }}
                        >
                          {data.site_name}
                        </a>
                      </li>
                    )
                )}
            </ul>
          </li>
        )}
        {(teamPermission && Object.keys(teamPermission).length
          ? teamPermission?.Team?.includes("team:remove-project")
          : permission?.Project?.includes("project:delete")) && (
          <Dropdown.Item
            to="#"
            onClick={() => showDeletePopup(project.id, project.name, "Project")}
          >
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
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                stroke={primaryColor}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M4.83301 6.39966V9.99966"
                stroke={primaryColor}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M7.16699 6.39966V9.99966"
                stroke={primaryColor}
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Delete
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

ProjectCardDropdown.propTypes = {
  project: PropTypes.object.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
  teamPermission: PropTypes.object,
  iconColor: PropTypes.string.isRequired,
  // text: propTypes.string,
};

ProjectCardDropdown.defaultProps = {
  teamPermission: {},
};

export default ProjectCardDropdown;
