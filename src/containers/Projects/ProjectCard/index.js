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
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';

const ProjectCard = (props) => {
  const { project, showDeletePopup, handleShow, setProjectId, setCreateProject, teamPermission, adminPanel } = props;
  const ImgLoader = () => <img src={loader} alt="" />;
  const organization = useSelector((state) => state.organization);
  const dispatch = useDispatch();
  const history = useHistory();
  const primaryColor = getGlobalColor('--main-primary-color');
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
                {!adminPanel && (
                  <ProjectCardDropdown
                    project={project}
                    showDeletePopup={showDeletePopup}
                    handleShow={handleShow}
                    setProjectId={setProjectId}
                    iconColor="#ffffff"
                    setCreateProject={setCreateProject}
                    teamPermission={teamPermission || {}}
                  />
                )}
              </div>
              {(teamPermission && Object.keys(teamPermission).length
                ? teamPermission?.Team?.includes('team:view-project')
                : organization?.permission?.Project?.includes('project:view')) && (
                <Link to={adminPanel ? '#' : `/org/${organization?.currentOrganization?.domain}/project/${project.id}`}>
                  <div className="myproject-card-title">
                    <h2>{project.name && project.name.length > 50 ? `${project.name.substring(0, 50)}...` : project.name}</h2>
                  </div>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
      <Link className="project-description" to={adminPanel ? '#' : `/org/${organization?.currentOrganization?.domain}/project/${project.id}`}>
        <div className="myproject-card-detail">
          <p>{project.description && project.description.length > 130 ? `${project.description.substring(0, 130)} ...` : project.description}</p>
        </div>
      </Link>
      {project?.updated_at && <div className="updated-date">Updated date: {project?.updated_at?.split('T')[0]}</div>}
      <div className="myproject-card-add-share">
        {(teamPermission && Object.keys(teamPermission).length
          ? teamPermission?.Team?.includes('team:view-project')
          : organization?.permission?.Project?.includes('project:view')) && (
          <button
            type="button"
            // title="view project"
          >
            <Link to={`/org/${organization?.currentOrganization?.domain}/project/${project.id}/preview`} style={{ textDecoration: 'none', color: '#084892' }}>
              {/* <img src={viewIcon} alt="" className="mr-3" /> */}
              <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                <path d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V28C24 30.2091 22.2091 32 20 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="white" />
                <path
                  d="M2.375 16C2.375 16 5.875 9 12 9C18.125 9 21.625 16 21.625 16C21.625 16 18.125 23 12 23C5.875 23 2.375 16 2.375 16Z"
                  stroke={primaryColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 18.625C13.4497 18.625 14.625 17.4497 14.625 16C14.625 14.5503 13.4497 13.375 12 13.375C10.5503 13.375 9.375 14.5503 9.375 16C9.375 17.4497 10.5503 18.625 12 18.625Z"
                  stroke={primaryColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="textinButton">Preview</span>
            </Link>
          </button>
        )}
        {(teamPermission && Object.keys(teamPermission).length
          ? teamPermission?.Team?.includes('team:edit-project')
          : organization?.permission?.Project?.includes('project:edit')) &&
          !adminPanel && (
            <button
              type="button"
              onClick={() => {
                dispatch(setSelectedProject(project));
                history.push(`/org/${organization?.currentOrganization?.domain}/project/${project.id}`);
              }}
            >
              {/* <img src={editIcon} alt="" className="mr-3" /> */}
              <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
                <path d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V28C24 30.2091 22.2091 32 20 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="white" />
                <path
                  d="M11.0513 8.89767H4.78927C4.31476 8.89767 3.85968 9.08617 3.52415 9.4217C3.18862 9.75723 3.00012 10.2123 3.00012 10.6868V23.2108C3.00012 23.6854 3.18862 24.1404 3.52415 24.476C3.85968 24.8115 4.31476 25 4.78927 25H17.3133C17.7878 25 18.2429 24.8115 18.5784 24.476C18.9139 24.1404 19.1024 23.6854 19.1024 23.2108V16.9488"
                  stroke={primaryColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.7605 7.55582C18.1163 7.19993 18.599 7 19.1023 7C19.6056 7 20.0883 7.19993 20.4442 7.55582C20.8001 7.9117 21 8.39438 21 8.89768C21 9.40097 20.8001 9.88365 20.4442 10.2395L11.9457 18.738L8.36743 19.6326L9.262 16.0543L17.7605 7.55582Z"
                  stroke={primaryColor}
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="textinButton">Edit</span>
            </button>
          )}
        {project.shared && !adminPanel && organization?.permission?.Project?.includes('project:share') && (
          <button
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
            {/* <img src={linkIcon} alt="" className="mr-3" /> */}
            <svg width="24" height="32" viewBox="0 0 24 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
              <path d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V28C24 30.2091 22.2091 32 20 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="white" />
              <path
                d="M10.1899 16.906C10.5786 17.4262 11.0746 17.8566 11.644 18.168C12.2135 18.4795 12.8433 18.6647 13.4905 18.7111C14.1378 18.7575 14.7875 18.664 15.3955 18.437C16.0035 18.21 16.5557 17.8547 17.0144 17.3953L19.7298 14.6772C20.5541 13.8228 21.0103 12.6785 21 11.4907C20.9897 10.303 20.5137 9.16675 19.6746 8.32683C18.8356 7.48692 17.7005 7.01049 16.5139 7.00017C15.3273 6.98985 14.1842 7.44646 13.3307 8.27165L11.7739 9.82094"
                stroke={primaryColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.8101 15.094C13.4214 14.5738 12.9255 14.1434 12.356 13.832C11.7865 13.5205 11.1567 13.3353 10.5095 13.2889C9.86218 13.2425 9.2125 13.336 8.60449 13.563C7.99648 13.7901 7.44435 14.1453 6.98557 14.6048L4.27025 17.3228C3.44589 18.1772 2.98974 19.3215 3.00005 20.5093C3.01036 21.6971 3.48631 22.8333 4.32538 23.6732C5.16445 24.5131 6.29951 24.9895 7.48609 24.9999C8.67267 25.0102 9.81583 24.5536 10.6694 23.7284L12.2171 22.1791"
                stroke={primaryColor}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <span className="textinButton">Shared link</span>
          </button>
        )}
      </div>
    </div>
  );
};

ProjectCard.propTypes = {
  project: PropTypes.object.isRequired,
  teamPermission: PropTypes.object,
  showDeletePopup: PropTypes.func.isRequired,
  handleShow: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
  setCreateProject: PropTypes.func.isRequired,
};

ProjectCard.defaultProps = {
  teamPermission: {},
};

export default ProjectCard;
