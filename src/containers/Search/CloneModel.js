/* eslint-disable */
import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { useHistory } from 'react-router-dom';

import { loadMyCloneProjectsAction, addCloneProjectsAction } from 'store/actions/project';
import { clonePlaylist, cloneActivity } from 'store/actions/search';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import MyProjectsCreate from 'containers/Projects/CreateProjectPopup';
import { addActivityPlaylistSearch, moveActivityPlaylist } from 'store/actions/playlist';
import Buttons from 'utils/Buttons/buttons';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import loader from 'assets/images/loader.svg';
const ImgLoader = () => <img src={loader} alt="loader" />;
function LtiProjectShared(props) {
  const { clone, searchView } = props;
  const [setShowProjectCard, setShowCreateProject] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setpage] = useState(1);
  const [size, setSize] = useState(10);
  const [defaultSize, setdefaultSize] = useState(10);
  const scrollerRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  let project = useSelector((state) => state.project);
  const { currentOrganization } = useSelector((state) => state.organization);
  console.log('prop', clone);

  const onScroll = () => {
    if (scrollerRef.current && page < project?.projectMeta?.last_page) {
      const { scrollTop, scrollHeight, clientHeight } = scrollerRef.current;
      if (scrollTop + clientHeight >= scrollHeight) {
        setSize(10);
        setpage(page + 1);
      }
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      loadMyCloneProjectsAction(page, defaultSize, searchQuery),
      // loadMyProjectsAction(),
    );
  }, [dispatch, defaultSize, searchQuery]);

  useEffect(() => {
    if (page > 1) {
      dispatch(
        addCloneProjectsAction(page, size, searchQuery),
        // loadMyProjectsAction(),
      );
    }
  }, [dispatch, page]);

  const primaryColor = getGlobalColor('--main-primary-color');
  const secondaryColor = getGlobalColor('--main-secondary-color');

  return (
    <>
      <div className="lti-all-project">
        {!setShowProjectCard && (
          <div className="information-clone-model">
            {!clone.selectedProjectstoAdd && (
              <>
                <p>
                  Select a {clone.clone.model === 'Activity' ? 'Playlist' : 'Project'} from your library that you would like to place this {clone.clone.model}.
                </p>

                <div className="active-resource-update active-resource-update-space">
                  <div
                    className="backgroundimg-clone"
                    style={{
                      backgroundImage: clone.clone.thumb_url?.includes('pexels.com')
                        ? `url(${clone.clone.thumb_url})`
                        : `url(${global.config.resourceUrl}${clone.clone.thumb_url})`,
                    }}
                  />
                  <div className="active-resource-detail">
                    <h6>{clone.clone.title}</h6>
                    {clone.clone.model === 'Activity' && <p>Explore America’s national parks. Discover our most treasured places. From science t...</p>}
                    <p>
                      By:
                      <span>{clone.clone.user?.first_name + ' ' + clone.clone.user?.last_name}</span>
                    </p>

                    <p>
                      Type:<span>{clone.clone.model}</span>
                    </p>
                  </div>
                </div>
              </>
            )}
            <div className={`clone-searching-section ${clone.ind ? 'clone-searching-section-margin-ind' : 'clone-searching-section-margin'}`}>
              <div className="search-and-filters">
                <div className="search-bar">
                  <input
                    type="text"
                    className="search-input"
                    placeholder="Search Project..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setpage(1);
                      // handlerSearchResult(e.target.value);
                    }}
                  />

                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    // onClick={searchQueryHandler}
                    onClick={() =>
                      dispatch(
                        loadMyCloneProjectsAction(page, defaultSize, searchQuery),
                        // loadMyProjectsAction(),
                      )
                    }
                  >
                    <path
                      d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58175 3 3.00003 6.58172 3.00003 11C3.00003 15.4183 6.58175 19 11 19Z"
                      stroke={primaryColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M21 20.9984L16.65 16.6484" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>

                <div>
                  <Buttons primary text="Create Project" icon={faPlus} iconColor={secondaryColor} width="155px" height="32px" hover onClick={() => setShowCreateProject(true)} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* className information-clone*/}
        {setShowProjectCard && (
          <div className=" information-clone-model information-clone-model-project ">
            <div onClick={() => setShowCreateProject(false)} className="clone-back-option-project">
              <FontAwesomeIcon icon={faArrowLeft} color={primaryColor} /> <span>Back</span>
            </div>
            <h3 className="clone-create-project-headng">Create New Project</h3>
            <MyProjectsCreate project={project} activity={clone} searchView={searchView} addtoProject selectedProjectstoAdd={clone.selectedProjectstoAdd} />
          </div>
        )}

        {/* Next Update Start */}
        {!setShowProjectCard && (
          <>
            {clone.clone.model === 'Activity' || clone.ind ? (
              <div>
                {' '}
                <Accordion className="list-add-project-activity-accordion">
                  <div className="list-add-project-activity" ref={scrollerRef} onScroll={onScroll} style={{ overflowY: 'auto' }}>
                    {!!project.clone &&
                      project.clone.map((data, counterTop) => (
                        <>
                          <Accordion.Toggle as={Button} variant="link" eventKey={counterTop + 1} className="top-card-btn">
                            <span
                              onClick={() => {
                                if (activeProject === counterTop + 1) {
                                  setActiveProject(null);
                                  setCurrentProject(null);
                                } else {
                                  setActiveProject(counterTop + 1);
                                  setCurrentProject(data);
                                  setCurrentPlaylist(null);
                                }
                                // setActivePlaylist(null);
                              }}
                            >
                              <div className="playlist-list-update">
                                <div className="active-resource-update">
                                  <div
                                    className="backgroundimg-clone"
                                    style={{
                                      backgroundImage: data.thumb_url.includes('pexels.com') ? `url(${data.thumb_url})` : `url(${global.config.resourceUrl}${data.thumb_url})`,
                                    }}
                                  />
                                  <div className="active-resource-detail">
                                    <h6> {data.name}</h6>
                                    {clone.clone.model === 'Activity' && <p>{data.description}</p>}

                                    <div className="model-name-activity-selection">
                                      <div className="model-name-activity">
                                        <p>
                                          Type: <span>{clone.clone.model}</span>
                                        </p>
                                      </div>
                                      {(clone.clone.model === 'Activity' || clone.ind) && (
                                        <>
                                          <div className="model-name-activity-playlist ">
                                            {/* View playlists */}
                                            <span>View playlists</span>
                                            {(clone.clone.model === 'Activity' || clone.ind) &&
                                              (activeProject === counterTop + 1 ? (
                                                <FontAwesomeIcon
                                                  icon="chevron-right"
                                                  color={primaryColor}
                                                  // style={{
                                                  //   marginLeft: '12px',
                                                  // }}
                                                />
                                              ) : (
                                                <FontAwesomeIcon
                                                  icon="chevron-down"
                                                  color={primaryColor}
                                                  // style={{
                                                  //   marginLeft: '12px',
                                                  // }}
                                                />
                                              ))}
                                          </div>
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </span>
                          </Accordion.Toggle>
                          <div className="activity-project-playlist-section">
                            <Accordion.Collapse eventKey={counterTop + 1}>
                              <Card.Body>
                                {(clone.clone.model === 'Activity' || clone.ind) &&
                                  (!!data.playlists && data.playlists.length > 0 ? (
                                    <Accordion>
                                      {data.playlists.map((data2, counterPlaylist) => (
                                        <>
                                          <div
                                            className={`activity-project-playlist ${
                                              activePlaylist === counterPlaylist + counterTop + 1 ? 'activity-project-playlist-selected' : 'activity-project-playlist-unselected'
                                            }`}
                                          >
                                            <Accordion.Toggle as={Button} variant="link" eventKey={counterPlaylist + counterTop + 1}>
                                              <span
                                                onClick={() => {
                                                  if (activePlaylist === counterPlaylist + counterTop + 1) {
                                                    setActivePlaylist(null);
                                                    setCurrentPlaylist(null);
                                                  } else {
                                                    setActivePlaylist(counterPlaylist + counterTop + 1);
                                                    setCurrentPlaylist(data2);
                                                  }
                                                }}
                                              >
                                                {/* <div className="flex-b">

                                              </div> */}
                                                <div className="playlist-title-copy-text">
                                                  <div>
                                                    <span className="activity-project-playlist-title ">{data2.title}</span>
                                                  </div>
                                                  <div
                                                    onClick={() => {
                                                      Swal.fire({
                                                        html: `Are you sure you want to move these activities?`,
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: 'Yes',
                                                        icon: 'info',
                                                      }).then(async (result) => {
                                                        console.log(clone);
                                                        if (result.isConfirmed) {
                                                          if (clone.ind) {
                                                            if (clone.selectedProjectstoAdd) {
                                                              const result = await dispatch(moveActivityPlaylist(data2.id, clone.selectedProjectstoAdd));
                                                              if (result?.message) {
                                                                history.push(`/org/${currentOrganization?.domain}/project/${data.id}`);
                                                              }
                                                            } else {
                                                              dispatch(addActivityPlaylistSearch(clone.clone.id, data2.id));
                                                            }
                                                          } else {
                                                            cloneActivity(data2.id, clone.clone.id);
                                                          }
                                                        }
                                                      });
                                                    }}
                                                    className={`copy-here ${activePlaylist === counterPlaylist + counterTop + 1 ? 'copy-here-selected' : 'copy-here-unselected'}`}
                                                  >
                                                    <span>Move Here</span>
                                                  </div>
                                                </div>
                                              </span>
                                            </Accordion.Toggle>
                                          </div>
                                        </>
                                      ))}{' '}
                                    </Accordion>
                                  ) : (
                                    clone.clone.model === 'Activity' && <span className="error">No Playlists found</span>
                                  ))}
                              </Card.Body>
                            </Accordion.Collapse>
                          </div>
                        </>
                      ))}
                  </div>
                </Accordion>
                {project?.islazyLoader && page > 1 && (
                  <div className="col-md-12 text-center">
                    <ImgLoader />
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="list-add-project-activity">
                  {!!project.clone &&
                    project.clone.map((data, counterTop) => (
                      <>
                        <span
                          onClick={() => {
                            if (activeProject === counterTop + 1) {
                              setActiveProject(null);
                              setCurrentProject(null);
                            } else {
                              setActiveProject(counterTop + 1);
                              setCurrentProject(data);
                              setCurrentPlaylist(null);
                            }
                          }}
                        >
                          <div className="playlist-list-update">
                            <div className="active-resource-update">
                              <div
                                className="backgroundimg-clone"
                                style={{
                                  backgroundImage: data.thumb_url.includes('pexels.com') ? `url(${data.thumb_url})` : `url(${global.config.resourceUrl}${data.thumb_url})`,
                                }}
                              />
                              <div className="active-resource-detail">
                                <h6> {data.name}</h6>
                                {clone.clone.model === 'Activity' && <p>{data.description}</p>}
                                <p>Playlist Count: {data.playlists?.length}</p>
                              </div>
                            </div>
                            <div className="activity-project-playlist" style={{ height: '38px', cursor: 'pointer' }}>
                              <div className="playlist-title-copy-text">
                                <div
                                  onClick={() => {
                                    Swal.fire({
                                      html: `Are you sure you want to copy this playlist?`,
                                      showCancelButton: true,
                                      confirmButtonColor: '#3085d6',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'Yes',
                                      icon: 'info',
                                    }).then(async (result) => {
                                      if (result.isConfirmed) {
                                        clonePlaylist(currentProject.id, clone?.clone?.id);
                                      }
                                    });
                                  }}
                                  className={`copy-here copy-here-unselected`}
                                >
                                  <span>Copy Here</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </span>
                      </>
                    ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
}

LtiProjectShared.propTypes = {
  clone: PropTypes.object.isRequired,
};

export default LtiProjectShared;
