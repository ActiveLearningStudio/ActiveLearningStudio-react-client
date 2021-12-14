import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getProjectId, googleShare } from 'store/actions/gapi';
import { cloneProject } from 'store/actions/search';
import {
  getProjectCourseFromLMS,
} from 'store/actions/project';
import { lmsPlaylist } from 'store/actions/playlist';
import './style.scss';
import loader from 'assets/images/loader.svg';
import Duplicate from '../../../assets/images/menu-dupli.svg';
import Delete from '../../../assets/images/menu-dele.svg';
import Publish from '../../../assets/images/menu-publish.svg';

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
  const { permission } = organization;
  const dispatch = useDispatch();
  const AllLms = useSelector((state) => state.share);
  const [allLms, setAllLms] = useState([]);
  useEffect(() => {
    setAllLms(AllLms);
  }, [AllLms]);

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

        {permission?.Project?.includes('project:clone') && (
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
              cloneProject(project.id);
              toast.dismiss();
            }}
          >
            <img src={Duplicate} alt="Preview" className="menue-img" />
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
          ? teamPermission?.Team?.includes('team:publish-project')
          : permission?.Project?.includes('project:publish')) && (
            <li className="dropdown-submenu send">
              <a tabIndex="-1">
                <img src={Publish} alt="Preview" className="menue-img" />
                Publish
              </a>
              <ul className="dropdown-menu check">
                {project?.gcr_project_visibility && (
                  <li
                    key={`googleclassroom +${project.id}`}
                    onClick={() => {
                      handleShow();
                      getProjectId(project.id);
                      setProjectId(props.project.id);
                      dispatch(googleShare(false));
                    }}
                  >
                    <a>Google Classroom</a>
                  </li>
                )}

                {allLms.shareVendors
                  && allLms.shareVendors.map(
                    (data) => data.project_visibility && (
                      <li key={data.id}>
                        <a
                          onClick={async () => {
                            const allPlaylist = await dispatch(
                              lmsPlaylist(project.id),
                            );
                            if (allPlaylist) {
                              dispatch(
                                getProjectCourseFromLMS(
                                  data.lms_name.toLowerCase(),
                                  data.id,
                                  project.id,
                                  allPlaylist.playlists,
                                  data.lms_url,
                                ),
                              );
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
        {(teamPermission && Object.keys(teamPermission).length
          ? teamPermission?.Team?.includes('team:remove-project')
          : permission?.Project?.includes('project:delete')) && (
            <Dropdown.Item
              to="#"
              onClick={() => showDeletePopup(project.id, project.name, 'Project')}
            >
              <img src={Delete} alt="Preview" className="menue-img" />
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
  teamPermission: PropTypes.object.isRequired,
  iconColor: PropTypes.string.isRequired,
  // text: propTypes.string,
};

// ProjectCardDropdown.defaultProps = {
//   text: propTypes.string,
// };

export default ProjectCardDropdown;
