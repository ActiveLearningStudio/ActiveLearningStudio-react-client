import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'react-bootstrap';

import { getProjectId, googleShare } from 'store/actions/gapi';
import { getProjectCourseFromLMS } from 'store/actions/project';
import SharePreviewPopup from 'components/SharePreviewPopup';
import GoogleModel from 'components/models/googleSign';
import ProjectPreviewModal from '../ProjectPreviewModal';

import './style.scss';

const ProjectCard = (props) => {
  const { showPreview, project, showDeletePopup } = props;

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const AllLms = useSelector((state) => state.defaultShareState);

  const [allLms, setAllLms] = useState([]);
  useEffect(() => {
    setAllLms(AllLms);
  }, [AllLms]);

  return (
    <div className="col-md-3 check">
      <GoogleModel projectId={project.id} show={show} onHide={handleClose} />

      <div className="program-tile">
        <div className="program-thumb">
          <Link to={`/project/${project.id}/preview`}>
            {project.thumb_url && (
              <div
                className="project-thumb"
                style={{
                  backgroundImage: project.thumb_url.includes('pexels.com')
                    ? `url(${project.thumb_url})`
                    : `url(${global.config.resourceUrl}${project.thumb_url})`,
                }}
              />
            )}
          </Link>
        </div>

        <div className="program-content">
          <div>
            <div className="row">
              <div className="col-md-10">
                <h3 className="program-title">
                  <Link to={`/project/${project.id}`}>{project.name}</Link>
                </h3>
              </div>

              <div className="col-md-2">
                <Dropdown className="project-dropdown check d-flex justify-content-center align-items-center">
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
                            dispatch(googleShare(false));
                          }}
                        >
                          <a>Google Classroom</a>
                        </li>

                        {allLms.shareVendors
                          && allLms.shareVendors.map((data) => (
                            <li>
                              <a
                                onClick={() => {
                                  dispatch(
                                    getProjectCourseFromLMS(
                                      data.lmsName.toLowerCase(),
                                      data.id,
                                      project.id,
                                      project.playlists,
                                      data.lmsUrl,
                                    ),
                                  );
                                }}
                              >
                                {data.description}
                              </a>
                            </li>
                          ))}
                      </ul>
                    </li>

                    {project.shared && (
                      <Dropdown.Item
                        to="#"
                        onClick={() => {
                          const protocol = `${window.location.href.split('/')[0]}//`;
                          const url = `${protocol + window.location.host}/project/shared/${project.id}`;
                          SharePreviewPopup(url, project.name);
                        }}
                      >
                        <FontAwesomeIcon icon="share" className="mr-2" />
                        Share
                      </Dropdown.Item>
                    )}

                    <Dropdown.Item
                      to="#"
                      onClick={() => showDeletePopup(project.id, project.name, 'Project')}
                    >
                      <FontAwesomeIcon icon="times-circle" className="mr-2" />
                      Delete
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>

            <div className="lessons-duration">
              <div className="row">
                <div className="col-md-12">
                  <p>
                    {project.description && project.description.length > 130
                      ? `${project.description.substring(0, 130)} ...`
                      : project.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="button-bottom">
            <Link to={`/project/${project.id}/preview`}>
              <FontAwesomeIcon icon="eye" className="mr-2" />
              Preview
            </Link>

            <Link to={`/project/${project.id}`}>
              <FontAwesomeIcon icon="cubes" className="mr-2" />
              Build
            </Link>

            <Link to={`/project/${project.id}/edit`}>
              <FontAwesomeIcon icon="pen" className="mr-2" />
              Edit
            </Link>
          </div>
        </div>
      </div>

      {showPreview && (
        <ProjectPreviewModal key={project.id} project={project} />
      )}
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  showPreview: PropTypes.bool,
  showDeletePopup: PropTypes.func.isRequired,
};

ProjectCard.defaultProps = {
  showPreview: false,
};

export default ProjectCard;
