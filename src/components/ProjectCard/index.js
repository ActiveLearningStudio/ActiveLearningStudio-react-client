import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import logo from 'assets/images/logo.svg';
import { getProjectId, googleShare } from 'store/actions/gapi';
import { getProjectCourseFromLMS } from 'store/actions/project';
import SharePreviewPopup from 'helpers/SharePreviewPopup';
import GoogleModel from '../models/googleSign';
import ProjectPreviewModal from '../ProjectPreviewModal';

import './style.scss';

const ProjectCard = (props) => {
  const { showPreview, project, showDeletePopup } = props;

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const AllLms = useSelector((state) => state.defaultShareState);

  const [allLms, setAllLms] = useState([]);
  useEffect(() => {
    setAllLms(AllLms);
  }, [AllLms]);

  return (
    <div className="col-md-3 check">
      <GoogleModel
        projectId={project._id}
        show={show}
        onHide={() => setShow(false)}
      />

      <div className="program-tile">
        <div className="program-thumb">
          <Link to={`/project/${project._id}`}>
            {project.thumbUrl && (
              <div
                className="project-thumb"
                style={{
                  backgroundImage: `url(${global.config.laravelAPIUrl}${project.thumbUrl})`,
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
                  <Link to={`/project/${project._id}`}>
                    {project.name}
                  </Link>
                </h3>
              </div>

              <div className="col-md-2">
                <div className="dropdown pull-right check">
                  <button
                    className="btn project-dropdown-btn project"
                    type="button"
                    id="dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FontAwesomeIcon icon="ellipsis-v" />
                  </button>

                  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                    <Link
                      className="dropdown-item"
                      to={`/project/preview2/${project._id}`}
                    >
                      <FontAwesomeIcon icon="eye" />
                      {' '}
                      Preview
                    </Link>
                    <Link
                      className="dropdown-item"
                      to={`/project/create/${project._id}`}
                    >
                      <FontAwesomeIcon icon="pencil" />
                      {' '}
                      Edit
                    </Link>
                    {/*
                    <a
                      className="dropdown-item"
                      onClick={(e) => {
                        Swal.fire({
                          title: "STAY TUNED!",
                          text: "COMING SOON",
                          imageUrl: logo,
                          imageWidth: 400,
                          imageHeight: 200,
                          imageAlt: "Custom image",
                        });
                      }}
                    >
                      <FontAwesomeIcon icon="share" />
                      {' '}
                      Send To
                    </a>
                    */}
                    <li className="dropdown-submenu send">
                      <a className="test" tabIndex="-1">
                        <FontAwesomeIcon icon="newspaper" />
                        {' '}
                        Publish
                      </a>
                      <ul className="dropdown-menu check">
                        <li
                          onClick={() => {
                            handleShow();
                            getProjectId(project._id);
                            dispatch(googleShare(false));
                          }}
                        >
                          <a>Google Classroom</a>
                        </li>

                        {allLms.shareVendors && allLms.shareVendors.map((data) => (
                          <li>
                            <a
                              onClick={() => {
                                dispatch(
                                  getProjectCourseFromLMS(
                                    data.lmsName.toLowerCase(),
                                    data._id,
                                    project._id,
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

                    <li className="dropdown-submenu send">
                      <a
                        className="test"
                        tabIndex="-1"
                        onClick={() => {
                          const protocol = `${window.location.href.split('/')[0]}//`;
                          const url = `${protocol + window.location.host}/project/shared/${project._id.trim()}`;
                          SharePreviewPopup(url, project.name);
                        }}
                      >
                        <FontAwesomeIcon icon="share" />
                        {' '}
                        Share
                      </a>
                    </li>

                    {/*
                    <a
                      className="dropdown-item"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(`/api/download/project/${project._id}`);
                      }}
                    >
                      <FontAwesomeIcon icon="cloud-download" />
                      {' '}
                      Executable
                    </a>
                    */}
                    <a
                      className="dropdown-item"
                      onClick={() => showDeletePopup(
                        project._id,
                        project.name,
                        'Project',
                      )}
                    >
                      <FontAwesomeIcon icon="times-circle-o" />
                      {' '}
                      Delete
                    </a>
                  </div>
                </div>
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
            <Link to={`/project/preview2/${project._id}`}>
              <FontAwesomeIcon icon="eye" />
              {' '}
              Preview
            </Link>
            <Link to={`/project/${project._id}`}>
              <FontAwesomeIcon icon="cubes" />
              {' '}
              Build
            </Link>

            <Link to={`/project/create/${project._id}`}>
              <FontAwesomeIcon icon="pencil" />
              {' '}
              Edit
            </Link>
          </div>
        </div>
      </div>

      {showPreview && (
        <ProjectPreviewModal key={project._id} project={project} />
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
