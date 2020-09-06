import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadMyProjectsAction } from 'store/actions/project';
import { clonePlaylist, cloneActivity } from 'store/actions/search';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Accordion, Card, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

export default function LTIProjectShared(props) {
  const { clone } = props;
  const [activeProject, setActiveProject] = useState('');
  const [activePlaylist, setActivePlaylist] = useState('');
  // const [activeactivity, setactiveactivity] = useState("");
  // const [activeactivitydefault, setactiveactivitydefault] = useState(true);
  const [allproject, setAllproject] = useState(null);
  const [currentProject, setCurrentProject] = useState();
  const [currentPlaylist, setCurrentPlaylist] = useState();
  const dispatch = useDispatch();
  const allProjects = useSelector((state) => state);
  useEffect(() => {
    dispatch(
      loadMyProjectsAction(),
    );
  }, [dispatch]);

  useEffect(() => {
    if (allProjects.project.projects) {
      setAllproject(allProjects.project.projects);
    }
  }, [allProjects]);
  return (
    <div className="ltiallproject">
      <Accordion className="top-box-project">
        {!!allproject
          && allproject.map((data, counterTop) => (
            <Card>
              <Card.Header className="topcard">
                <Accordion.Toggle
                  as={Button}
                  variant="link"
                  eventKey={counterTop + 1}
                  className="topcardbtn"
                >
                  <span
                    onClick={() => {
                      if (activeProject === counterTop + 1) {
                        setActiveProject();
                        setCurrentProject();
                      } else {
                        setActiveProject(counterTop + 1);
                        setCurrentProject(data);
                        setCurrentPlaylist();
                        // setactiveactivity();
                      }
                      // setActivePlaylist();
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
                  {clone.clone.model === 'Activity' && !!data.playlists && data.playlists.length > 0 ? (
                    <Accordion>
                      {data.playlists.map((data2, counterPlaylist) => (
                        <Card>
                          <Card.Header className="middlecard">
                            <Accordion.Toggle
                              as={Button}
                              variant="link"
                              eventKey={counterPlaylist + counterTop + 1}
                            >
                              <span
                                onClick={() => {
                                  if (activePlaylist === counterPlaylist + counterTop + 1) {
                                    setActivePlaylist();
                                    setCurrentPlaylist();
                                  } else {
                                    setActivePlaylist(counterPlaylist + counterTop + 1);
                                    setCurrentPlaylist(data2);
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
                    clone.clone.model === 'Activity' && (<span className="error">No Playlists found</span>)
                  )}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          ))}
      </Accordion>

      <button
        className="button-submit"
        onClick={() => {
          if (!currentProject && !currentPlaylist) {
            Swal.fire('Kindly select Project or playlist');
            return;
          }
          let activeAssetDriection;
          if (!currentPlaylist) {
            activeAssetDriection = currentProject.name;
          } else { activeAssetDriection = currentPlaylist.title; }

          Swal.fire({
            html: `You have selected <strong>${activeAssetDriection} 
              </strong><br>Do you want to continue ?`,

            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok',
          }).then((result) => {
            if (result.value) {
              if (currentPlaylist) {
                cloneActivity(currentPlaylist.id, props.clone.clone.id);
              } else {
                clonePlaylist(currentProject.id, props.clone.clone.id);
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
