import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';

import { loadMyProjectsAction } from 'store/actions/project';
import { clonePlaylist, cloneActivity } from 'store/actions/search';

function LtiProjectShared(props) {
  const [activeProject, setActiveProject] = useState(null);
  const [activePlaylist, setActivePlaylist] = useState(null);

  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [currentPlaylistId, setCurrentPlaylistId] = useState(null);

  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);

  useEffect(() => {
    dispatch(
      loadMyProjectsAction(),
    );
  }, [dispatch]);

  return (
    <div className="lti-all-project">
      <Accordion className="top-box-project">
        {project.projects && project.projects.map((data, counterTop) => (
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
                    } else {
                      setActiveProject(counterTop + 1);
                      setCurrentProjectId(data.id);
                      setCurrentPlaylistId(null);
                    }
                  }}
                >
                  <div className="flex-bar">
                    <div>
                      {activeProject === counterTop + 1 ? (
                        <FontAwesomeIcon icon="check-square" />
                      ) : (
                        <FontAwesomeIcon icon="square" />
                      )}
                      {data.name}
                    </div>
                    {activeProject === counterTop + 1 ? (
                      <FontAwesomeIcon icon="chevron-up" />
                    ) : (
                      <FontAwesomeIcon icon="chevron-down" />
                    )}
                  </div>
                </span>
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={counterTop + 1}>
              <Card.Body>
                {!!data.playlists && data.playlists.length > 0 ? (
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
                                } else {
                                  setActivePlaylist(counterPlaylist + counterTop + 1);
                                  setCurrentPlaylistId(data2.id);
                                }
                              }}
                            >
                              <div className="flex-bar">
                                <div>
                                  <span>
                                    {activePlaylist === counterPlaylist + counterTop + 1 ? (
                                      <FontAwesomeIcon icon="stop-circle" />
                                    ) : (
                                      <FontAwesomeIcon icon="circle" />
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
                  <span className="error">No Playlists found</span>
                )}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>

      <button
        type="button"
        className="button-submit"
        onClick={() => {
          Swal.fire({
            html: `You have selected <strong>${props.title}
              </strong> ${props.model}<br>Do you want to continue ?`,
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok',
          })
            .then((result) => {
              if (result.value) {
                if (currentPlaylistId) {
                  cloneActivity(currentPlaylistId, props.id);
                } else {
                  clonePlaylist(currentProjectId, props.id);
                }
              }
            });
        }}
      >
        Proceed
      </button>
    </div>
  );
}

LtiProjectShared.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
};

export default LtiProjectShared;
