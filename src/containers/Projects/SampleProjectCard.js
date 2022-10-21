/* eslint-disable */
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import QueryString from 'query-string';
import { deleteFavObj, toggleProjectShareAction, getProjectCourseFromLMS, clearProjectSelected } from 'store/actions/project';
import { cloneProject } from 'store/actions/search';
import ProjectPreviewShared from 'containers/Preview/ProjectPreview/ProjectPreviewShared';
import MyVerticallyCenteredModal from 'components/models/activitySample';
import SharePreviewPopup from 'components/SharePreviewPopup';
import { lmsPlaylist } from 'store/actions/playlist';
import { getProjectId } from 'store/actions/gapi';
import { useLocation } from 'react-router-dom';
import Preview from '../../assets/images/menu-pre.svg';
import Publish from '../../assets/images/menu-publish.svg';
import Duplicate from '../../assets/images/menu-dupli.svg';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';

const SampleProjectCard = (props) => {
  const { projects, type, activeTab, setShowSampleSort, handleShow, setProjectId, setTabToggle, setType } = props;

  const dispatch = useDispatch();
  const location = useLocation();
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
  useMemo(() => {
    const query = QueryString.parse(location.search);
    if (query.active === 'fav') {
      setTabToggle('Favorite Projects');
      setType('fav');
    }
  }, [location, setTabToggle, setType]);
  useEffect(() => {
    setAllLms(AllLms);
  }, [AllLms, AllLms.shareVendors]);
  useEffect(() => {
    if (selectId) {
      setShowSampleSort(false);
    }
  }, [selectId, setShowSampleSort]);
  const primaryColor = getGlobalColor('--main-primary-color');
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
                    setShowSampleSort(false);
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
                  {project.thumb_url && (
                    <div
                      className="project-thumb"
                      style={{
                        backgroundImage: !project.thumb_url.includes('/storage/') ? `url(${project.thumb_url})` : `url(${global.config.resourceUrl}${project.thumb_url})`,
                      }}
                    />
                  )}
                </div>

                <div className="program-content" style={{ padding: '10px 15px' }}>
                  <div>
                    <div className="row">
                      <div className="col-md-10">
                        <h3 className="program-title">
                          <a
                            onClick={() => {
                              setShowSampleSort(false);
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
                            {project.name}
                          </a>
                        </h3>
                      </div>

                      <div className="col-md-2">
                        <Dropdown className="project-dropdown check d-flex justify-content-center align-items-center">
                          <Dropdown.Toggle className="project-dropdown-btn project d-flex justify-content-center align-items-center">
                            <FontAwesomeIcon icon="ellipsis-v" />
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            <Dropdown.Item
                              // as={Link}
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
                              {/* <img src={Preview} alt="Preview" className="menue-img" /> */}
                              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                                <path
                                  d="M1.125 6C1.125 6 3.625 1 8 1C12.375 1 14.875 6 14.875 6C14.875 6 12.375 11 8 11C3.625 11 1.125 6 1.125 6Z"
                                  stroke={primaryColor}
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path
                                  d="M8 7.875C9.03553 7.875 9.875 7.03553 9.875 6C9.875 4.96447 9.03553 4.125 8 4.125C6.96447 4.125 6.125 4.96447 6.125 6C6.125 7.03553 6.96447 7.875 8 7.875Z"
                                  stroke={primaryColor}
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
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
                                  {/* <img
                                      src={Publish}
                                      alt="Preview"
                                      className="menue-img"
                                    /> */}
                                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                                    <path
                                      d="M10.583 4.52941C11.5495 4.52941 12.333 3.73933 12.333 2.76471C12.333 1.79009 11.5495 1 10.583 1C9.61651 1 8.83301 1.79009 8.83301 2.76471C8.83301 3.73933 9.61651 4.52941 10.583 4.52941Z"
                                      stroke={primaryColor}
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M3.41602 8.5631C4.38251 8.5631 5.16602 7.77302 5.16602 6.7984C5.16602 5.82378 4.38251 5.03369 3.41602 5.03369C2.44952 5.03369 1.66602 5.82378 1.66602 6.7984C1.66602 7.77302 2.44952 8.5631 3.41602 8.5631Z"
                                      stroke={primaryColor}
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M10.583 13.0001C11.5495 13.0001 12.333 12.21 12.333 11.2354C12.333 10.2608 11.5495 9.4707 10.583 9.4707C9.61651 9.4707 8.83301 10.2608 8.83301 11.2354C8.83301 12.21 9.61651 13.0001 10.583 13.0001Z"
                                      stroke={primaryColor}
                                      strokeWidth="1.5"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path d="M5.27148 7.96411L9.06593 10.3722" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M9.06037 3.72876L5.27148 6.13683" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                  </svg>
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

                                  {allLms?.shareVendors &&
                                    allLms.shareVendors.map(
                                      (data, key) =>
                                        data.lms_name !== 'safarimontage' && (
                                          <li key={key}>
                                            <a
                                              onClick={async () => {
                                                const allPlaylist = await dispatch(lmsPlaylist(project.id));
                                                if (allPlaylist) {
                                                  dispatch(getProjectCourseFromLMS(data.lms_name.toLowerCase(), data.id, project.id, allPlaylist.playlists, data.lms_url));
                                                }
                                              }}
                                            >
                                              {data.site_name}
                                            </a>
                                          </li>
                                        ),
                                    )}
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
                              {/* <img
                                src={Duplicate}
                                alt="Preview"
                                className="menue-img"
                              /> */}
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                                <path
                                  d="M11.6667 1H2.33333C1.59695 1 1 1.59695 1 2.33333V11.6667C1 12.403 1.59695 13 2.33333 13H11.6667C12.403 13 13 12.403 13 11.6667V2.33333C13 1.59695 12.403 1 11.6667 1Z"
                                  stroke={primaryColor}
                                  strokeWidth="1.5"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                                <path d="M7 4.33325V9.66659" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M4.33301 7H9.66634" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                              Duplicate
                            </Dropdown.Item>

                            {type === 'fav' && (
                              <Dropdown.Item to="#" onClick={() => dispatch(deleteFavObj(project.id))}>
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
                          <div>
                            {type === 'team' && (
                              <div>
                                Team Name:
                                <strong>{` ${project?.team?.name}`}</strong>
                              </div>
                            )}
                            {project.description && project.description.length > 130 ? `${project.description.substring(0, 130)} ...` : project.description}
                          </div>
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
              dispatch(clearProjectSelected());
              setShowSampleSort(true);
              if (type === 'fav') {
                setSelectFavId(null);
                setSelectId(null);
              } else if (type === 'sample') {
                setSelectSampleId(null);
                setSelectId(null);
              } else if (type === 'team') {
                setSelectedTeamProjectId(null);
                setSelectId(null);
              }
            }}
          >
            Back
          </div>

          {type === 'fav' && activeTab === 'Favorite Projects' && (
            <ProjectPreviewShared sampleId={selectFavId} setModalShow={setModalShow} setCurrentActivity={setCurrentActivity} mainPageProjectView />
          )}
          {type === 'sample' && activeTab === 'Sample Projects' && (
            <ProjectPreviewShared sampleId={selectSampleId} setModalShow={setModalShow} setCurrentActivity={setCurrentActivity} mainPageProjectView />
          )}
          {type === 'team' && activeTab === 'Team Projects' && (
            <ProjectPreviewShared sampleId={selectTeamProjectId} setModalShow={setModalShow} setCurrentActivity={setCurrentActivity} mainPageProjectView />
          )}
        </div>
      )}
      <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} activity={currentActivity} />
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
  setType: PropTypes.func.isRequired,
  setTabToggle: PropTypes.func.isRequired,
};

export default SampleProjectCard;
