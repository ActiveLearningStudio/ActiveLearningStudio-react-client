import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

import { loadMyCloneProjectsAction } from 'store/actions/project';
import { clonePlaylist, cloneActivity } from 'store/actions/search';

function LtiProjectShared(props) {
  const { clone } = props;

  const [activeProject, setActiveProject] = useState(null);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [currentProject, setCurrentProject] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState(null);

  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(
      loadMyCloneProjectsAction(),
      // loadMyProjectsAction(),
    );
  }, [dispatch]);

  return (
    <>
      <div className="lti-all-project">
        <div className="information-clone">
          <p>
            Select a
            {' '}
            {clone.clone.model === 'Activity' ? 'Playlist' : 'Project'}
            {' '}
            from your library that you would like to place this
            {' '}
            {clone.clone.model}
            .
          </p>
          <div className="active-resource">
            <h2>{clone.clone.title}</h2>
            <h3>
              Type:
              <span>{clone.clone.model}</span>
            </h3>
          </div>
        </div>
        <Accordion className="top-box-project">
          {!!project.clone && project.clone.map((data, counterTop) => (
            <Card>
              <Card.Header className="top-card">
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey={counterTop + 1}
                  className="top-card-btn"
                >
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
                    <div className="flex-bar">
                      <div className="text-align-left">
                        {activeProject === counterTop + 1 ? (

                          <FontAwesomeIcon icon="check-square" />
                        ) : (
                          <FontAwesomeIcon icon="square" />
                        )}
                        {data.name}
                      </div>
                      {clone.clone.model === 'Activity' && (activeProject === counterTop + 1 ? (
                        <FontAwesomeIcon icon="chevron-up" />
                      ) : (
                        <FontAwesomeIcon icon="chevron-down" />
                      ))}
                    </div>
                  </span>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={counterTop + 1}>
                <Card.Body>
                  {clone.clone.model === 'Activity' && (!!data.playlists && data.playlists.length > 0 ? (
                    <Accordion>
                      {data.playlists.map((data2, counterPlaylist) => (
                        <Card>
                          <Card.Header className="middle-card">
                            <Accordion.Toggle
                              as={Button}
                              variant="link"
                              eventKey={counterPlaylist + counterTop + 1}
                            >
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
                                <div className="flex-bar">
                                  <div className="text-align-left">
                                    <span>
                                      {activePlaylist === counterPlaylist + counterTop + 1 ? (
                                        <FontAwesomeIcon icon="stop-circle" className="mr-2" />
                                      ) : (
                                        <FontAwesomeIcon icon="circle" className="mr-2" />
                                      )}
                                      {data2.title}
                                    </span>
                                  </div>
                                </div>
                              </span>
                            </Accordion.Toggle>
                          </Card.Header>
                        </Card>
                      ))}
                      {' '}
                    </Accordion>
                  ) : (
                    clone.clone.model === 'Activity' && (<span className="error">No Playlists found</span>)
                  ))}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
        </Accordion>
      </div>
      <div className="footer-model">
        <button
          type="button"
          className="button-submit"
          onClick={() => {
            if (!currentProject && !currentPlaylist) {
              Swal.fire('Kindly select Project or playlist');
              return;
            }

            let activeAssetDirection;
            if (!currentPlaylist) {
              activeAssetDirection = currentProject.name;
            } else {
              activeAssetDirection = currentPlaylist.title;
            }

            Swal.fire({
              html: `You have selected <strong>${activeAssetDirection}</strong><br>Do you want to continue ?`,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.value) {
                if (currentPlaylist) {
                  cloneActivity(currentPlaylist.id, clone.clone.id);
                } else {
                  clonePlaylist(currentProject.id, clone.clone.id);
                }
              }
            });
          }}
        >
          Done
        </button>
      </div>
    </>
  );
}

LtiProjectShared.propTypes = {
  clone: PropTypes.object.isRequired,
};

export default LtiProjectShared;
