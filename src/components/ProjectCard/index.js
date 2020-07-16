import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import logo from 'assets/images/logo.svg';
import ProjectPreviewModal from '../ProjectPreviewModal';

import './style.scss';

// TODO: need to clean up attributes
const ProjectCard = ({ showPreview, project, showDeletePopup }) => (
  <div className="col-md-3 check">
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
                  className="btn project-dropdown-btn"
                  type="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <FontAwesomeIcon icon="ellipsis-v" />
                </button>

                <div className="dropdown-menu">
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

                  <a
                    className="dropdown-item"
                    onClick={() => {
                      Swal({
                        title: 'STAY TUNED!',
                        text: 'COMING SOON',
                        imageUrl: logo,
                        imageWidth: 400,
                        imageHeight: 200,
                        imageAlt: 'Custom image',
                      });
                    }}
                  >
                    <FontAwesomeIcon icon="share" />
                    {' '}
                    Send To
                  </a>

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

        <div className="buttonbottom">
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

ProjectCard.propTypes = {
  showPreview: PropTypes.bool.isRequired,
  project: PropTypes.object.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
};

export default ProjectCard;
