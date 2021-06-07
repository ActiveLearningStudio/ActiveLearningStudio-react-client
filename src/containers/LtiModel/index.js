import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { loadMyProjectsLtiAction } from 'store/actions/project';

import './style.scss';

const LTIProjectShared = (props) => {
  const [activeProject, setActiveProject] = useState(null);
  const [activePlaylist, setActivePlaylist] = useState(null);
  const [activeActivity, setActiveActivity] = useState(null);
  const [defaultPlaylist, setDefaultPlaylist] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [formData, setFormData] = useState({});

  const dispatch = useDispatch();
  const project = useSelector((state) => state.project);

  const { match } = props;

  useEffect(() => {
    dispatch(
      loadMyProjectsLtiAction(
        decodeURIComponent(match.params.lmsUrl),
        decodeURIComponent(match.params.ltiClientId),
      ),
    );
  }, [dispatch, match.params.lmsUrl, match.params.ltiClientId]);

  useEffect(() => {
    if (project.projects) {
      setAllProjects(project.projects);
    }
  }, [project.projects]);

  return (
    <div className="lti-all-project">
      <Accordion>
        {!!allProjects && allProjects.map((data, counterTop) => (
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
                      setActiveActivity(null);
                    }
                    // setActivePlaylist(null);
                  }}
                >
                  <div className="flex-bar">
                    <div>
                      {/* {activeProject === counterTop + 1 ? (
                        <i
                          className="fa fa-check-square"
                          aria-hidden="true"
                        />
                      ) : (
                        <i className="fa fa-square" aria-hidden="true" />
                      )} */}
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
                                  setFormData({});
                                } else {
                                  if (!activeActivity) {
                                    setActivePlaylist(counterPlaylist + counterTop + 1);
                                  }
                                  setActiveActivity(null);
                                  setDefaultPlaylist(data2.id);
                                  setFormData({
                                    name: data2.title,
                                    id: data2.id,
                                    entity: 'playlist',
                                  });
                                }
                              }}
                            >
                              <div className="flex-bar">
                                <div>
                                  <span>
                                    {activePlaylist === (counterPlaylist + counterTop + 1) ? (
                                      <FontAwesomeIcon icon="stop-circle" className="mr-2" />
                                    ) : (
                                      <FontAwesomeIcon icon="circle" className="mr-2" />
                                    )}
                                    {data2.title}
                                  </span>
                                </div>
                                {activePlaylist === (counterPlaylist + counterTop + 1) ? (
                                  <FontAwesomeIcon icon="chevron-up" />
                                ) : (
                                  <FontAwesomeIcon icon="chevron-down" />
                                )}
                              </div>
                            </span>
                          </Accordion.Toggle>
                        </Card.Header>

                        <Accordion.Collapse eventKey={counterPlaylist + counterTop + 1}>
                          <Card.Body className="last-card">
                            {!!data2.activities && data2.activities.length > 0 ? (
                              <ul>
                                {data2.activities.map(
                                  (data3, counter3) => (
                                    <li
                                      onClick={() => {
                                        if (activeActivity === counter3) {
                                          setActiveActivity(null);
                                          setFormData(null);
                                          setDefaultPlaylist(data2.id);
                                          setActivePlaylist(counterPlaylist + counterTop + 1);
                                          setFormData({
                                            name: data2.title,
                                            id: data2.id,
                                            entity: 'playlist',
                                          });
                                        } else {
                                          setActiveActivity(counter3);
                                          setActivePlaylist(null);
                                          setFormData({
                                            name: data3.title,
                                            id: data3.id,
                                            entity: 'activity',
                                          });
                                        }
                                      }}
                                      key={counter3}
                                    >
                                      {activeActivity === counter3 ? (
                                        <FontAwesomeIcon icon="stop-circle" className="mr-2" />
                                      ) : (
                                        <FontAwesomeIcon icon="circle" className="mr-2" />
                                      )}
                                      {data3.title}
                                    </li>
                                  ),
                                )}
                              </ul>
                            ) : (
                              <span className="error">
                                No activity found
                              </span>
                            )}
                          </Card.Body>
                        </Accordion.Collapse>
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
          let finalUrl;
          if (activePlaylist) {
            finalUrl = `${decodeURIComponent(match.params.redirectUrl)}&title=${
              encodeURIComponent(formData.name)}&entity=${formData.entity}&id=${formData.id}`;
          } else {
            finalUrl = `${decodeURIComponent(match.params.redirectUrl)}&title=${
              encodeURIComponent(formData.name)}&entity=${formData.entity}&id=${formData.id}&playlist=${defaultPlaylist}`;
          }

          if (formData.id) {
            Swal.fire({
              html: `You have selected <strong>${formData.entity}: ${formData.name}</strong><br>Do you want to continue ?`,
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.value) {
                window.location.href = finalUrl;
              }
            });
          }
        }}
      >
        Proceed
      </button>
    </div>
  );
};

LTIProjectShared.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(LTIProjectShared);
