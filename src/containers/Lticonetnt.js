import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadMyProjectsltiAction,
  loadMyProjectsAction,
} from "../actions/project";
import { Accordion, Card, Button } from "react-bootstrap";
import swal from "sweetalert2";
export default function LTIProjectShared(props) {
  console.log(props);

  const [activeProject, setActiveProject] = useState("");
  const [activePlaylist, setActivePlaylist] = useState("");
  const [activeactivity, setactiveactivity] = useState("");
  const [activeactivitydefault, setactiveactivitydefault] = useState(true);
  const [allproject, setAllproject] = useState(null);
  const [formdata, setformdata] = useState("");
  const dispatch = useDispatch();
  const allProjects = useSelector((state) => {
    return state;
  });
  useEffect(() => {
    dispatch(
      loadMyProjectsltiAction(
        decodeURIComponent(props.match.params.lms_url),
        decodeURIComponent(props.match.params.lti_client_id)
      )
    );
  }, []);
  useEffect(() => {
    allProjects.project.projects && setAllproject(allProjects.project.projects);
    console.log(allproject);
  }, [allProjects]);
  return (
    <div className="ltiallproject">
      <Accordion>
        {!!allproject &&
          allproject.map((data, counter_top) => {
            return (
              <Card>
                <Card.Header className="topcard">
                  <Accordion.Toggle
                    as={Button}
                    variant="link"
                    eventKey={counter_top + 1}
                    className="topcardbtn"
                  >
                    <span
                      onClick={() => {
                        if (activeProject === counter_top + 1) {
                          setActiveProject();
                        } else {
                          setActiveProject(counter_top + 1);
                          setactiveactivity();
                        }
                        // setActivePlaylist();
                      }}
                    >
                      {activeProject === counter_top + 1 ? (
                        <i className="fa fa-check-square" aria-hidden="true" />
                      ) : (
                        <i className="fa fa-square" aria-hidden="true" />
                      )}
                      {data.name}
                    </span>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={counter_top + 1}>
                  <Card.Body>
                    {!!data.playlists && data.playlists.length > 0 ? (
                      <Accordion>
                        {data.playlists.map((data2, counter_playlist) => {
                          return (
                            <Card>
                              <Card.Header className="middlecard">
                                <Accordion.Toggle
                                  as={Button}
                                  variant="link"
                                  eventKey={counter_playlist + counter_top + 1}
                                >
                                  <span
                                    onClick={() => {
                                      if (
                                        activePlaylist ===
                                        counter_playlist + counter_top + 1
                                      ) {
                                        setActivePlaylist();
                                        setactiveactivitydefault(true);
                                        setformdata({});
                                      } else {
                                        setActivePlaylist(
                                          counter_playlist + counter_top + 1
                                        );
                                        setactiveactivity();
                                        setactiveactivitydefault(true);
                                        setformdata({
                                          name: data2.title,
                                          _id: data2._id,
                                          entity: "playlist",
                                        });
                                        swal.fire({
                                          text:
                                            "By default all activities are slected from current playlist. If you want to select any specific activity, kindly select from below.",
                                        });
                                      }
                                    }}
                                  >
                                    <span>
                                      {" "}
                                      {activePlaylist ===
                                      counter_playlist + counter_top + 1 ? (
                                        <i
                                          className="fa fa-check-square"
                                          aria-hidden="true"
                                        />
                                      ) : (
                                        <i
                                          className="fa fa-square"
                                          aria-hidden="true"
                                        />
                                      )}
                                      {data2.title}
                                    </span>
                                  </span>
                                </Accordion.Toggle>
                              </Card.Header>
                              <Accordion.Collapse
                                eventKey={counter_playlist + counter_top + 1}
                              >
                                <Card.Body className="lastecard">
                                  {!!data2.activities &&
                                  data2.activities.length > 0 ? (
                                    <ul>
                                      {data2.activities.map(
                                        (data3, counter_3) => {
                                          return (
                                            <li
                                              onClick={() => {
                                                if (
                                                  activeactivity === counter_3
                                                ) {
                                                  setactiveactivity();
                                                  setformdata();
                                                } else {
                                                  setactiveactivity(counter_3);
                                                  setactiveactivitydefault(
                                                    false
                                                  );
                                                  setformdata({
                                                    name: data3.title,
                                                    _id: data3._id,
                                                    entity: "activity",
                                                  });
                                                }
                                              }}
                                              key={counter_3}
                                            >
                                              {activeactivity === counter_3 ||
                                              activeactivitydefault ? (
                                                <i
                                                  className="fa fa-stop-circle-o"
                                                  aria-hidden="true"
                                                />
                                              ) : (
                                                <i
                                                  className="fa fa-circle-o"
                                                  aria-hidden="true"
                                                />
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
          const final_url =
            decodeURIComponent(props.match.params.redirect_url) +
            "&title=" +
            encodeURIComponent(formdata.name) +
            "&entity=" +
            formdata.entity +
            "&id=" +
            formdata._id;
          if (!!formdata._id) {
            window.location.href = formdata._id;
          }
        }}
      >
        Proceed
      </button>
    </div>
  );
}
