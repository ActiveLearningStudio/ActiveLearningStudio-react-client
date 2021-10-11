/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { toggleProjectShareAction } from 'store/actions/project';
import SharePreviewPopup from 'components/SharePreviewPopup';
import loader from 'assets/images/loader.svg';
import ProjectCardDropdown from './ProjectCardDropdown';
import './style.scss';
import './projectcardstyle.scss';
const ProjectCard = (props) => {
  const { project, showDeletePopup, handleShow, setProjectId, setCreateProject, seteditMode } = props;
  const ImgLoader = () => <img src={loader} alt="" />;
  const organization = useSelector((state) => state.organization);
  const dispatch = useDispatch();

  return (
    <div className="main-myproject-card">
      <div>
        {project.thumb_url && (
          <>
            <div
              className="myproject-card-top"
              style={{
                backgroundImage: project.thumb_url.includes('pexels.com') ? `url(${project.thumb_url})` : `url(${global.config.resourceUrl}${project.thumb_url})`,
              }}
            >
              <div className="myproject-card-dropdown">
                <ProjectCardDropdown
                  project={project}
                  showDeletePopup={showDeletePopup}
                  handleShow={handleShow}
                  setProjectId={setProjectId}
                  iconColor="#ffffff"
                  setCreateProject={setCreateProject}
                  seteditMode={seteditMode}
                />
              </div>
              <Link to={`/org/${organization?.currentOrganization?.domain}/project/${project.id}/preview`}>
                <div className="myproject-card-title">
                  <h2>{project.name && project.name.length > 50 ? `${project.name.substring(0, 50)}...` : project.name}</h2>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>

      <div className="myproject-card-detail">
        <p>{project.description && project.description.length > 130 ? `${project.description.substring(0, 130)} ...` : project.description}</p>
      </div>
      {project.shared && (
        <div className="myproject-card-status">
          <p>Shared</p>
        </div>
      )}

      <div className="myproject-card-add-share">
        <button
          type="button"
          style={{
            width: '86px',
            height: '32px',
            marginRight: '24px',
            textAlign: 'left',
          }}
        >
          <Link to={`/org/${organization?.currentOrganization?.domain}/project/${project.id}`} style={{ textDecoration: 'none', color: '#084892' }}>
            <FontAwesomeIcon icon="plus" className="mr-2" />
            Add
          </Link>
        </button>
        {organization?.permission?.Project?.includes('project:share') && (
          <button type="button" style={{ width: '108px', height: '32px', textAlign: 'right' }}>
            <Link
              to="#"
              style={{ textDecoration: 'none', color: '#084892' }}
              onClick={async () => {
                const protocol = `${window.location.href.split('/')[0]}//`;
                const url = `${protocol + window.location.host}/project/${project.id}/shared`;
                if (!project.shared) {
                  toast.info('Sharing project...', {
                    className: 'project-loading',
                    closeOnClick: false,
                    closeButton: false,
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 10000,
                    icon: ImgLoader,
                  });
                  await dispatch(toggleProjectShareAction(project.id, project.name));
                  toast.dismiss();
                  SharePreviewPopup(url, project.name);
                } else {
                  SharePreviewPopup(url, project.name);
                }
              }}
            >
              <FontAwesomeIcon icon="share" className="mr-2" />
              Share
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,

  showDeletePopup: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
  setCreateProject: PropTypes.func.isRequired,
  seteditMode: PropTypes.func.isRequired,
};

export default ProjectCard;
