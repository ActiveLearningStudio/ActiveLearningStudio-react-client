import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { Accordion, Card, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {loadMyProjectsltiAction} from "store/actions/project";
 
import "./style.scss" 

const  LTIProjectShared = (props) => {
 
  const [activeProject, setActiveProject] = useState("");
  const [activePlaylist, setActivePlaylist] = useState("");
  const [activeactivity, setactiveactivity] = useState("");
  const [allproject, setAllproject] = useState(null);
  const [formdata, setformdata] = useState("");
  const dispatch = useDispatch();
  const allProjects = useSelector((state) =>  state);
  const {match} = props
 
  useEffect(() => {
    dispatch(
      loadMyProjectsltiAction(
        decodeURIComponent(match.params.lms_url),
        decodeURIComponent(match.params.lti_client_id)
      )
    );
  }, []);

  useEffect(() => {
    allProjects.project.projects && setAllproject(allProjects.project.projects);
  }, [allProjects]);

  return (
    <div className="ltiallproject">
      <Accordion>
        {!!allproject &&
          allproject.map((data, counterTop) => {
            return (
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
                        } else {
                          setActiveProject(counterTop + 1);
                          setactiveactivity();
                        }
                        // setActivePlaylist();
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
                        {data.playlists.map((data2, counterPlaylist) => {
                          return (
                            <Card>
                              <Card.Header className="middlecard">
                                <Accordion.Toggle
                                  as={Button}
                                  variant="link"
                                  eventKey={counterPlaylist + counterTop + 1}
                                >
                                  <span
                                    onClick={() => {
                                      if (
                                        activePlaylist ===
                                        counterPlaylist + counterTop + 1
                                      ) {
                                        setActivePlaylist();
                                        // setactiveactivitydefault(true);
                                        setformdata({});
                                      } else {
                                        !activeactivity &&
                                          setActivePlaylist(
                                            counterPlaylist + counterTop + 1
                                          );
                                        setactiveactivity();
                                        // setactiveactivitydefault(true);
                                        setformdata({
                                          name: data2.title,
                                          _id: data2.id,
                                          entity: "playlist",
                                        });
                                      }
                                    }}
                                  >
                                    <div className="flex-bar">
                                      <div>
                                        <span>
                                          {" "}
                                          {activePlaylist ===
                                          counterPlaylist + counterTop + 1 ? (
                                            <FontAwesomeIcon icon="stop-circle" className="mr-2" />
                                            ) : (
                                              <FontAwesomeIcon icon="circle" className="mr-2" />
                                            )}
                                          {data2.title}
                                        </span>
                                      </div>
                                      {activePlaylist ===
                                      counterPlaylist + counterTop + 1 ? (
                                        <FontAwesomeIcon icon="chevron-up" />
                                        ) : (
                                        <FontAwesomeIcon icon="chevron-down" />
                                      )}
                                    </div>
                                  </span>
                                </Accordion.Toggle>
                              </Card.Header>
                              <Accordion.Collapse
                                eventKey={counterPlaylist + counterTop + 1}
                              >
                                <Card.Body className="lastecard">
                                  {!!data2.activities &&
                                  data2.activities.length > 0 ? (
                                    <ul>
                                      {data2.activities.map(
                                        (data3, counter3) => {
                                          return (
                                            <li
                                              onClick={() => {
                                                if (
                                                  activeactivity === counter3
                                                ) {
                                                  setactiveactivity();
                                                  setformdata();
                                                  setActivePlaylist(
                                                    counterPlaylist +
                                                      counterTop +
                                                      1
                                                  );
                                                  setformdata({
                                                    name: data2.title,
                                                    _id: data2.id,
                                                    entity: "playlist",
                                                  });
                                                } else {
                                                  setactiveactivity(counter3);
                                                  // //  setactiveactivitydefault(
                                                  //     false
                                                  //   );
                                                  setActivePlaylist();
                                                  setformdata({
                                                    name: data3.title,
                                                    _id: data3.id,
                                                    entity: "activity",
                                                  });
                                                }
                                              }}
                                              key={counter3}
                                            >
                                              {activeactivity === counter3 ? (
                                                  <FontAwesomeIcon icon="stop-circle" className="mr-2" />
                                                  ) : (
                                                  <FontAwesomeIcon icon="circle" className="mr-2" />
                                             
                                              )}
                                              {data3.title}
                                            </li>
                                          );
                                        }
                                      )}
                                    </ul>
                                  ) : (
                                    <span className="error">
                                      No activities found
                                    </span>
                                  )}
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          );
                        })}{" "}
                      </Accordion>
                    ) : (
                      <span className="error">No Playlists found</span>
                    )}
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            );
          })}
      </Accordion>

      <button
        className="button-submit"
        onClick={() => {
          
          const finalUrl =
            decodeURIComponent(match.params.redirect_url) +
            "&title=" +
            encodeURIComponent(formdata.name) +
            "&entity=" +
            formdata.entity +
            "&id=" +
            formdata._id;
            //console.log(formdata)
          if (!!formdata._id) {
            Swal.fire({
              html: `You have selected <strong>${formdata.entity}:
              ${formdata.name}
              </strong><br>Do you want to continue ?`,
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Ok",
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
}

LTIProjectShared.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(LTIProjectShared)