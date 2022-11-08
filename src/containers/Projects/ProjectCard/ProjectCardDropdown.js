/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getProjectId, googleShare, shareToCanvas, msTeamShare, publishLmsSettings } from 'store/actions/gapi';
import { cloneProject } from 'store/actions/search';
import { exportProjectsToNoovo, getProjectCourseFromLMS } from 'store/actions/project';
import { lmsPlaylist } from 'store/actions/playlist';
import './style.scss';
import loader from 'assets/images/loader.svg';
import { addProjectsAction } from 'store/actions/team';
import Swal from 'sweetalert2';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import DuplicateSmSvg from 'iconLibrary/dropDown/DuplicateSmSvg';
import PublishSmSvg from 'iconLibrary/dropDown/PublishSmSvg';
import DeleteSmSvg from 'iconLibrary/dropDown/DeleteSmSvg';
import PublishSatelliteSmSvg from 'iconLibrary/dropDown/PublishSatelliteSmSvg';

const ProjectCardDropdown = (props) => {
  const {
    project,
    handleShow,
    setProjectId,
    showDeletePopup,
    teamPermission,
    // text,
    iconColor,
    setprojectPublishtoCanvas,
    setcanvasProjectName,
  } = props;
  const ImgLoader = () => <img src={loader} alt="loader" />;
  const organization = useSelector((state) => state.organization);
  const { selectedTeam } = useSelector((state) => state.team);
  const { permission, activeOrganization } = organization;
  const dispatch = useDispatch();
  const AllLms = useSelector((state) => state.share);
  const [allLms, setAllLms] = useState([]);
  useEffect(() => {
    const filteredShareVendors = AllLms.shareVendors.filter((vendor) => !vendor.lms_url.includes('oauth'));
    // QUICK FIX: filtering out wordpress integration from this component
    // find better solution
    setAllLms({
      ...AllLms,
      shareVendors: filteredShareVendors,
    });

    // setAllLms(AllLms);
  }, [AllLms]);
  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <Dropdown className="project-dropdown check d-flex  align-items-center text-added-project-dropdown">
      <Dropdown.Toggle className="project-dropdown-btn project d-flex justify-content-center align-items-center">
        <FontAwesomeIcon
          icon="ellipsis-v"
          style={{
            fontSize: '13px',
            color: iconColor || '#084892',
            marginLeft: '5px',
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

        {(teamPermission && Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:add-project') : permission?.Project?.includes('project:clone')) && (
          <Dropdown.Item
            to="#"
            onClick={() => {
              toast.info('Duplicating project...', {
                className: 'project-loading',
                closeOnClick: false,
                closeButton: false,
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 10000,
                icon: ImgLoader,
              });
              if (Object.keys(teamPermission).length && teamPermission?.Team?.includes('team:add-project')) {
                dispatch(addProjectsAction(selectedTeam?.id, [project.id]))
                  .then((result) => {
                    Swal.fire({
                      icon: 'success',
                      title: result?.message,
                    });
                  })
                  .catch((err) => {
                    Swal.fire({
                      icon: 'error',
                      title: err?.message,
                    });
                  });
              } else {
                cloneProject(project.id);
              }
              toast.dismiss();
            }}
          >
            <DuplicateSmSvg primaryColor={primaryColor} className="menue-img" />
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
        {(teamPermission && Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:publish-project') : permission?.Project?.includes('project:publish')) && (
          <li className="dropdown-submenu send">
            <a tabIndex="-1">
              <PublishSmSvg primaryColor={primaryColor} className="menue-img" />
              Publish
            </a>
            <ul className="dropdown-menu check">
              {activeOrganization?.gcr_project_visibility && (
                <li
                  key={`googleclassroom +${project.id}`}
                  onClick={() => {
                    dispatch(shareToCanvas(false));
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
              {activeOrganization?.msteam_project_visibility && (
                <li
                  onClick={() => {
                    handleShow();
                    setProjectId(props.project.id);
                    setcanvasProjectName(project.name);
                    dispatch(msTeamShare(true));
                    dispatch(googleShare(true));
                    dispatch(shareToCanvas(false));
                  }}
                >
                  <a>Microsoft Teams</a>
                </li>
              )}

              {allLms.shareVendors &&
                allLms.shareVendors.map(
                  (data) =>
                    data.project_visibility && (
                      <li key={data.id}>
                        <a
                          onClick={async () => {
                            const allPlaylist = await dispatch(lmsPlaylist(project.id));
                            if (allPlaylist) {
                              if (data.lms_name === 'canvas') {
                                setprojectPublishtoCanvas(true);
                                handleShow();
                                dispatch(googleShare(true));
                                dispatch(shareToCanvas(true));
                                dispatch(publishLmsSettings(data));
                                setProjectId(props.project.id);
                                setcanvasProjectName(project.name);
                              } else {
                                dispatch(getProjectCourseFromLMS(data.lms_name.toLowerCase(), data.id, project.id, allPlaylist.playlists, data.lms_url));
                              }
                            }
                          }}
                        >
                          {data.site_name}
                        </a>
                      </li>
                    ),
                )}
            </ul>
          </li>
        )}
        {(teamPermission && Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:remove-project') : permission?.Project?.includes('project:delete')) && (
          <Dropdown.Item to="#" onClick={() => showDeletePopup(project.id, project.name, 'Project')}>
            <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
            Delete
          </Dropdown.Item>
        )}
        {teamPermission && Object.keys(teamPermission).length > 0 && (
          <Dropdown.Item
            to="#"
            onClick={async () => {
              Swal.showLoading();
              const result = await dispatch(exportProjectsToNoovo(project.id, selectedTeam.id));
              if (result) {
                Swal.fire({
                  title: 'Publishing project to Noovo',
                  text: `${result}`,
                  showConfirmButton: false,
                });
              }
            }}
          >
            <PublishSatelliteSmSvg primaryColor={primaryColor} className="menue-img" />
            Publish to satellite
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
  // setprojectPublishtoCanvas: PropTypes.func.isRequired,
  // text: propTypes.string,
};

ProjectCardDropdown.defaultProps = {
  teamPermission: {},
};

export default ProjectCardDropdown;
