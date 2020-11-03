import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { getProjectId, googleShare } from 'store/actions/gapi';
import { cloneProject } from 'store/actions/search';
import { getProjectCourseFromLMS, toggleProjectShareAction } from 'store/actions/project';
import { lmsPlaylist } from 'store/actions/playlist';
import SharePreviewPopup from 'components/SharePreviewPopup';

import './style.scss';

const ProjectCardDropdown = (props) => {
  const {
    project,
    handleShow,
    setProjectId,
    showDeletePopup,
  } = props;

  const dispatch = useDispatch();
  const AllLms = useSelector((state) => state.share);
  const [allLms, setAllLms] = useState([]);
  useEffect(() => {
    setAllLms(AllLms);
  }, [AllLms]);

  return (
    <Dropdown className="project-dropdown check d-flex  align-items-center">
      <Dropdown.Toggle className="project-dropdown-btn project d-flex justify-content-center align-items-center">
        <FontAwesomeIcon icon="ellipsis-v" />
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item
          as={Link}
          to={`/project/${project.id}/preview`}
        >
          <FontAwesomeIcon icon="eye" className="mr-2" />
          Preview
        </Dropdown.Item>

        <Dropdown.Item as={Link} to={`/project/${project.id}/edit`}>
          <FontAwesomeIcon icon="pen" className="mr-2" />
          Edit
        </Dropdown.Item>

        <Dropdown.Item
          to="#"
          onClick={() => {
            Swal.showLoading();
            cloneProject(project.id);
          }}
        >
          <FontAwesomeIcon icon="clone" className="mr-2" />
          Duplicate
        </Dropdown.Item>

        <Dropdown.Item
          to="#"
          onClick={async () => {
            const protocol = `${window.location.href.split('/')[0]}//`;
            const url = `${protocol + window.location.host}/project/${project.id}/shared`;
            if (!project.shared) {
              Swal.showLoading();
              await dispatch(toggleProjectShareAction(project.id, project.name));
              Swal.close();
              SharePreviewPopup(url, project.name);
            } else {
              SharePreviewPopup(url, project.name);
            }
          }}
        >
          <FontAwesomeIcon icon="share" className="mr-2" />
          Share
        </Dropdown.Item>

        <li className="dropdown-submenu send">
          <a tabIndex="-1">
            <FontAwesomeIcon icon="newspaper" className="mr-2" />
            Publish
          </a>
          <ul className="dropdown-menu check">
            <li
              onClick={() => {
                handleShow();
                getProjectId(project.id);
                setProjectId(props.project.id);
                dispatch(googleShare(false));
              }}
            >
              <a>Google Classroom</a>
            </li>

            {allLms.shareVendors && allLms.shareVendors.map((data) => (
              <li>
                <a
                  onClick={async () => {
                    const allPlaylist = await dispatch(lmsPlaylist(project.id));
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
            ))}
          </ul>
        </li>

        <Dropdown.Item
          to="#"
          onClick={() => showDeletePopup(project.id, project.name, 'Project')}
        >
          <FontAwesomeIcon icon="times-circle" className="mr-2" />
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

ProjectCardDropdown.propTypes = {
  project: PropTypes.object.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
};

export default ProjectCardDropdown;
