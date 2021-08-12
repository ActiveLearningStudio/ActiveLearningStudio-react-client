import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Badge } from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';

import './style.scss';
import Swal from 'sweetalert2';
import { toggleProjectShareAction } from 'store/actions/project';
import SharePreviewPopup from 'components/SharePreviewPopup';
import ProjectCardDropdown from './ProjectCardDropdown';
import ProjectPreviewModal from '../ProjectPreviewModal';

const ProjectCard = (props) => {
  const {
    showPreview,
    project,
    showDeletePopup,
    handleShow,
    setProjectId,
    activeFilter,
  } = props;
  const organization = useSelector((state) => state.organization);
  const dispatch = useDispatch();
  return (
    <div className="col-md-3 check" id={activeFilter}>
      <div className="program-tile">
        <div className="program-thumb">
          <Link to={`/studio/org/${organization?.currentOrganization?.domain}/project/${project.id}/preview`}>
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
                  <Link to={`/studio/org/${organization?.currentOrganization?.domain}/project/${project.id}/preview`}>
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
                      <div className="col-md-12">
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
            <Link to={`/studio/org/${organization?.currentOrganization?.domain}/project/${project.id}`}>
              <FontAwesomeIcon icon="plus" className="mr-2" />
              Add
            </Link>
            {organization?.permission?.Project?.includes('project:share') && (
              <Link
                to="#"
                onClick={async () => {
                  const protocol = `${window.location.href.split('/')[0]}//`;
                  const url = `${protocol + window.location.host}/studio/project/${project.id}/shared`;
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
              </Link>
            )}
            <Link style={{ padding: '0px' }}>
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
