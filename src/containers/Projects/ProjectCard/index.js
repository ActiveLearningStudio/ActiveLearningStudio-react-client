/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setSelectedProject } from 'store/actions/project';
import viewIcon from 'assets/images/project-view.svg';
import editIcon from 'assets/images/project-edit.svg';
import linkIcon from 'assets/images/project-link.svg';
import SharePreviewPopup from 'components/SharePreviewPopup';
import loader from 'assets/images/loader.svg';
import { useHistory } from 'react-router';
import ProjectCardDropdown from './ProjectCardDropdown';

import './style.scss';
import './projectcardstyle.scss';

const ProjectCard = (props) => {
  const { project, showDeletePopup, handleShow, setProjectId, setCreateProject, seteditMode } = props;
  const ImgLoader = () => <img src={loader} alt="" />;
  const organization = useSelector((state) => state.organization);
  const dispatch = useDispatch();
  const history = useHistory();
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
              <Link to={`/org/${organization?.currentOrganization?.domain}/project/${project.id}`}>
                <div className="myproject-card-title">
                  <h2>{project.name && project.name.length > 50 ? `${project.name.substring(0, 50)}...` : project.name}</h2>
                </div>
              </Link>
            </div>
          </>
        )}
      </div>
      <Link className="project-description" to={`/org/${organization?.currentOrganization?.domain}/project/${project.id}`}>
        <div className="myproject-card-detail">
          <p>{project.description && project.description.length > 130 ? `${project.description.substring(0, 130)} ...` : project.description}</p>
        </div>
      </Link>

      <div className="myproject-card-add-share">
        <button
          type="button"
        // title="view project"
        >
          <Link to={`/org/${organization?.currentOrganization?.domain}/project/${project.id}/preview`} style={{ textDecoration: 'none', color: '#084892' }}>
            <img src={viewIcon} alt="" className="mr-3" />
            <span className="textinButton">Preview</span>
          </Link>
        </button>
        {organization?.permission?.Project?.includes('project:edit') && (
          <button
            type="button"
            // title="edit project"
            onClick={() => {
              // setCreateProject(true)
              // seteditMode(true)
              dispatch(setSelectedProject(project));
              history.push(`/org/${organization?.currentOrganization?.domain}/project/${project.id}`);
            }}
          >
            <img src={editIcon} alt="" className="mr-3" />
            <span className="textinButton">Edit</span>
          </button>
        )}
        {project.shared && (
          <button
            title="view shared link"
            type="button"
            onClick={() => {
              if (window.gapi && window.gapi.sharetoclassroom) {
                window.gapi.sharetoclassroom.go('croom');
              }
              const protocol = `${window.location.href.split('/')[0]}//`;
              const url = `${protocol}${window.location.host}/project/${project.id}/shared`;
              return SharePreviewPopup(url, project.name);
            }}
          >

            <img src={linkIcon} alt="" className="mr-3" />
            <span className="textinButton">Get external link</span>
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
