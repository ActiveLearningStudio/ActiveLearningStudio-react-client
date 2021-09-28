import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { deleteFavObj, toggleProjectShareAction, getProjectCourseFromLMS } from 'store/actions/project';
import { cloneProject } from 'store/actions/search';
import ProjectPreviewShared from 'containers/Preview/ProjectPreview/ProjectPreviewShared';
import MyVerticallyCenteredModal from 'components/models/activitySample';
import SharePreviewPopup from 'components/SharePreviewPopup';
import { lmsPlaylist } from 'store/actions/playlist';
import { getProjectId } from 'store/actions/gapi';

const SampleProjectCard = (props) => {
  const {
    projects,
    type,
    activeTab,
    setShowSampleSort,
    handleShow,
    setProjectId,
  } = props;

  const dispatch = useDispatch();
  const [selectId, setSelectId] = useState(null);
  const [selectFavId, setSelectFavId] = useState(null);
  const [selectSampleId, setSelectSampleId] = useState(null);
  const [selectTeamProjectId, setSelectedTeamProjectId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  const organization = useSelector((state) => state.organization);
  const { permission } = organization;
  const AllLms = useSelector((state) => state.share);
  const [allLms, setAllLms] = useState([]);
  useEffect(() => {
    setAllLms(AllLms);
  }, [AllLms, AllLms.shareVendors]);
  useEffect(() => {
    if (selectId) {
      setShowSampleSort(false);
    }
  }, [selectId, setShowSampleSort]);

  return (
    <>
      {!selectId ? (
        projects.map((project) => (
          <div className="playlist-resource" key={project.id}>
            <div className="col-md-3 check">
              <div className="program-tile">
                <div
                  className="program-thumb"
                  onClick={() => {
                    setSelectId(project.id);
                    setShowSampleSort(false);
                    setSelectSampleId(project.id);
                    setSelectFavId(project.id);
                    setSelectedTeamProjectId(project.id);
                  }}
                >
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
                </div>

                <div className="program-content" style={{ padding: '10px 15px' }}>
                  <div>
                    <div className="row">
                      <div className="col-md-10">
                        <h3 className="program-title">
                          <Link
                            onClick={() => {
                              setSelectId(project.id);
                              setShowSampleSort(false);
                              setSelectSampleId(project.id);
                              setSelectFavId(project.id);
                              setSelectedTeamProjectId(project.id);
                            }}
                          >
                            {project.name}
                          </Link>
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
                              onClick={() => {
                                if (type === 'fav') {
                                  setSelectFavId(project.id);
                                  setSelectId(project.id);
                                } else if (type === 'sample') {
                                  setSelectSampleId(project.id);
                                  setSelectId(project.id);
                                } else if (type === 'team') {
                                  setSelectedTeamProjectId(project.id);
                                  setSelectId(project.id);
                                }
                              }}
                            >
                              <FontAwesomeIcon icon="eye" className="mr-2" />
                              Preview
                            </Dropdown.Item>
                            {permission?.Project?.includes('project:share') && type === 'team' && (
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
                            )}
                            {permission?.Project?.includes('project:publish') && type === 'team' && (
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
                                      setProjectId(project.id);
                                    }}
                                  >
                                    <a>Google Classroom</a>
                                  </li>

                                  {allLms?.shareVendors && allLms.shareVendors.map((data) => (
                                    data.lms_name !== 'safarimontage' && (
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
                                  )))}
                                </ul>
                              </li>
                            )}
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

                            {type === 'fav' && (
                              <Dropdown.Item
                                to="#"
                                onClick={() => dispatch(deleteFavObj(project.id))}
                              >
                                <FontAwesomeIcon icon="times-circle" className="mr-2" />
                                Remove
                              </Dropdown.Item>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>

                    </div>

                    <div className="lessons-duration">
                      <div className="row">
                        <div className="col-md-12">
                          <p>
                            {type === 'team' && (
                              <div>
                                Team Name:
                                <strong>
                                  {` ${project?.team?.name}`}
                                </strong>
                              </div>
                            )}
                            {project.description && project.description.length > 130
                              ? `${project.description.substring(0, 130)} ...`
                              : project.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="project-sample-share">
          <div
            className="btn-back"
            onClick={() => {
              setShowSampleSort(true);
              setSelectId(null);
            }}
          >
            Back
          </div>

          {type === 'fav' && activeTab === 'Favorite Projects' && (
            <ProjectPreviewShared
              sampleId={selectFavId}
              setModalShow={setModalShow}
              setCurrentActivity={setCurrentActivity}
            />
          )}
          {type === 'sample' && activeTab === 'Sample Projects' && (
            <ProjectPreviewShared
              sampleId={selectSampleId}
              setModalShow={setModalShow}
              setCurrentActivity={setCurrentActivity}
            />
          )}
          {type === 'team' && activeTab === 'Team Projects' && (
            <ProjectPreviewShared
              sampleId={selectTeamProjectId}
              setModalShow={setModalShow}
              setCurrentActivity={setCurrentActivity}
            />
          )}
        </div>
      )}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        activity={currentActivity}
      />
    </>
  );
};

SampleProjectCard.propTypes = {
  projects: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
  setShowSampleSort: PropTypes.func.isRequired,
  activeTab: PropTypes.string.isRequired,
  handleShow: PropTypes.func.isRequired,
  setProjectId: PropTypes.func.isRequired,
};

export default SampleProjectCard;
