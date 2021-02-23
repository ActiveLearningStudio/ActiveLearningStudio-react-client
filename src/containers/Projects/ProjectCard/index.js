import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'react-bootstrap';

import ProjectPreviewModal from '../ProjectPreviewModal';
import ProjectCardDropdown from './ProjectCardDropdown';

import './style.scss';

const ProjectCard = (props) => {
  const {
    showPreview,
    project,
    showDeletePopup,
    handleShow,
    setProjectId,
    activeFilter,
  } = props;

  return (
    <div className="col-md-3 check" id={activeFilter}>
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
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h3 className="program-title">
                  <Link to={`/project/${project.id}/preview`}>
                    {project.name && project.name.length > 50 ? `${project.name.substring(0, 50)}...` : project.name}
                  </Link>
                </h3>

                {/* {(project.shared && activeFilter === 'list-grid') && (
                  <Badge pill variant="success">
                    Shared
                  </Badge>
                )} */}
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
                  {project.shared && (
                    <div className="row">
                      <div className="col-md-12 text-right">
                        <Badge pill variant="success">
                          Shared
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="button-bottom">
            <Link to={`/project/${project.id}/preview`}>
              <FontAwesomeIcon icon="plus" className="mr-2" />
              Add Playlist
            </Link>

            <Link to={`/project/${project.id}`}>
              <FontAwesomeIcon icon="share" className="mr-2" />
              share
            </Link>

            <Link>
              <ProjectCardDropdown
                project={project}
                showDeletePopup={showDeletePopup}
                handleShow={handleShow}
                setProjectId={setProjectId}
                text="More"
              />
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
  handleShow: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
  activeFilter: PropTypes.string.isRequired,
};

ProjectCard.defaultProps = {
  showPreview: false,
};

export default ProjectCard;
