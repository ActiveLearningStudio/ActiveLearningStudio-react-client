import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { Accordion, Card, Tabs, Tab } from "react-bootstrap";
import Header from "../components/Header/Header";
import Footer from "../components/Footer.js";
import Sidebar from "../components/Sidebar/Sidebar";
import placeholder from "../images/loginbg.png";
import { simpleSearchfunction, advancedSearches } from "../actions/search";
import { useSelector, useDispatch } from "react-redux";

export default function SearchU(props) {
  const allstate = useSelector((state) => state.search.searchresult);
  const searchquerry = useSelector((state) => state.search.searchquerry);

  const [search, setsearch] = useState();
  const [searchquerryes, Setsearchquerry] = useState("");
  const [searchinput, setsearchinput] = useState();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (Object.keys(allstate).length > 0) {
      setsearch(allstate);

      Setsearchquerry(searchquerry);
      localStorage.setItem("loading", "false");
      Swal.close();
    }
  }, [allstate]);
  useEffect(() => {
    localStorage.getItem("loading") == "true" &&
      Swal.fire({
        html: "Searching...", // add html attribute if you want or remove
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
  });
  const dispatch = useDispatch();
  return (
    <>
      <Header />

      <div className="main-content-wrapper">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>
        <div className="content-wrapper">
          <div className="content">
            <div className="searchresultmain">
              <div className="totalcount">
                {!!search && (
                  <div>
                    {" "}
                    Showing {search.total ? search.total : "0"} results For{" "}
                    <span>{searchquerryes}</span>
                  </div>
                )}
              </div>
              <div className="mian-content-search">
                <div className="left-search">
                  <div className="searchlibrary">
                    <Accordion defaultActiveKey="0">
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          Search Library
                          <i className="fa fa-plus"></i>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <div className="body-search">
                              <input
                                value={searchinput}
                                onChange={(e) => {
                                  setsearchinput(e.target.value);
                                }}
                                type="text"
                                placeholder="Search"
                              />
                              <div className="check-box-search">
                                <i
                                  class="fa fa-square-o"
                                  aria-hidden="true"
                                ></i>
                                Student Facing
                              </div>
                              <div
                                onClick={() => {
                                  if (!!searchinput) {
                                    Swal.fire({
                                      html: "Searching...", // add html attribute if you want or remove
                                      allowOutsideClick: false,
                                      onBeforeOpen: () => {
                                        Swal.showLoading();
                                      },
                                    });
                                    dispatch(simpleSearchfunction(searchinput));
                                  }
                                }}
                                className="src-btn"
                              >
                                Search
                              </div>
                            </div>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                  <div className="refinesearch">
                    <div className="headline">Refine your search</div>
                    <Accordion defaultActiveKey="">
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          Subject
                          <i className="fa fa-plus"></i>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body></Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                          Education Level
                          <i className="fa fa-plus"></i>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body></Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                          Rating
                          <i className="fa fa-plus"></i>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                          <Card.Body></Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="3">
                          Type
                          <i className="fa fa-plus"></i>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="3">
                          <Card.Body></Card.Body>
                        </Accordion.Collapse>
                      </Card>
                    </Accordion>
                  </div>
                </div>
                <div className="right-search">
                  <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
                    <Tab
                      eventKey="all"
                      title={
                        !!search && !!search.total
                          ? "all (" + search.total + ")"
                          : "all (0)"
                      }
                    >
                      <div className="results_search">
                        {!!search && search.data.length > 0 ? (
                          search.data.map((res) => {
                            return (
                              <div className="box">
                                <div className="imgbox">
                                  <div
                                    style="thumbnail-bg"
                                    style={{
                                      backgroundImage: !!res.thumb_url
                                        ? !!res.thumb_url.includes("pexels.com")
                                          ? "url(" + res.thumb_url + ")"
                                          : "url(" +
                                            global.config.laravelAPIUrl +
                                            res.thumb_url +
                                            ")"
                                        : "url(data:image/jpeg;base64,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)",
                                    }}
                                  />
                                  {/* <h5>CALCULUS</h5> */}
                                </div>
                                <div className="content">
                                  <h2>{res.title}</h2>
                                  <ul>
                                    <li>
                                      by{" "}
                                      <span className="author">
                                        {res.user_name}
                                      </span>
                                    </li>
                                    <li>
                                      Type{" "}
                                      <span className="type">
                                        {res.model_type}
                                      </span>
                                    </li>
                                    {/* <li>
                                      Member Rating{" "}
                                      <span className="type">Project</span>
                                    </li> */}
                                  </ul>
                                  <p>{res.description}</p>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="box">no result found !</div>
                        )}
                      </div>
                    </Tab>
                    <Tab
                      eventKey="project"
                      title={
                        !!search && !!search.projects
                          ? "project (" + search.projects + ")"
                          : "project (0)"
                      }
                    >
                      <div className="results_search">
                        {!!search && search.data.length > 0 ? (
                          search.data.map((res) => {
                            return (
                              <>
                                {res.model_type === "Project" && (
                                  <div className="box">
                                    <div className="imgbox">
                                      <div
                                        style="thumbnail-bg"
                                        style={{
                                          backgroundImage: !!res.thumb_url
                                            ? !!res.thumb_url.includes(
                                                "pexels.com"
                                              )
                                              ? "url(" + res.thumb_url + ")"
                                              : "url(" +
                                                global.config.laravelAPIUrl +
                                                res.thumb_url +
                                                ")"
                                            : "url(data:image/jpeg;base64,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)",
                                        }}
                                      />
                                      {/* <h5>CALCULUS</h5> */}
                                    </div>
                                    <div className="content">
                                      <h2>{res.title}</h2>
                                      <ul>
                                        <li>
                                          by{" "}
                                          <span className="author">
                                            {res.user_name}
                                          </span>
                                        </li>
                                        <li>
                                          Type{" "}
                                          <span className="type">
                                            {res.model_type}
                                          </span>
                                        </li>
                                        {/* <li>
                                      Member Rating{" "}
                                      <span className="type">Project</span>
                                    </li> */}
                                      </ul>
                                      <p>{res.description}</p>
                                    </div>
                                  </div>
                                )}
                              </>
                            );
                          })
                        ) : (
                          <div className="box">no result found !</div>
                        )}
                      </div>
                    </Tab>
                    <Tab
                      eventKey="playlist"
                      title={
                        !!search && !!search.playlists
                          ? "playlist (" + search.playlists + ")"
                          : "playlist (0)"
                      }
                    >
                      <div className="results_search">
                        {!!search && search.data.length > 0 ? (
                          search.data.map((res) => {
                            return (
                              <>
                                {res.model_type === "Playlist" && (
                                  <div className="box">
                                    <div className="imgbox">
                                      <div
                                        style="thumbnail-bg"
                                        style={{
                                          backgroundImage: !!res.thumb_url
                                            ? !!res.thumb_url.includes(
                                                "pexels.com"
                                              )
                                              ? "url(" + res.thumb_url + ")"
                                              : "url(" +
                                                global.config.laravelAPIUrl +
                                                res.thumb_url +
                                                ")"
                                            : "url(data:image/jpeg;base64,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)",
                                        }}
                                      />
                                      {/* <h5>CALCULUS</h5> */}
                                    </div>
                                    <div className="content">
                                      <h2>{res.title}</h2>
                                      <ul>
                                        <li>
                                          by{" "}
                                          <span className="author">
                                            {res.user_name}
                                          </span>
                                        </li>
                                        <li>
                                          Type{" "}
                                          <span className="type">
                                            {res.model_type}
                                          </span>
                                        </li>
                                        {/* <li>
                                      Member Rating{" "}
                                      <span className="type">Project</span>
                                    </li> */}
                                      </ul>
                                      <p>{res.description}</p>
                                    </div>
                                  </div>
                                )}
                              </>
                            );
                          })
                        ) : (
                          <div className="box">no result found !</div>
                        )}
                      </div>
                    </Tab>

                    <Tab
                      eventKey="activity"
                      title={
                        !!search && !!search.activities
                          ? "activity (" + search.activities + ")"
                          : "activity (0)"
                      }
                    >
                      <div className="results_search">
                        {!!search && search.data.length > 0 ? (
                          search.data.map((res) => {
                            return (
                              <>
                                {res.model_type === "Activity" && (
                                  <div className="box">
                                    <div className="imgbox">
                                      <div
                                        style="thumbnail-bg"
                                        style={{
                                          backgroundImage: !!res.thumb_url
                                            ? !!res.thumb_url.includes(
                                                "pexels.com"
                                              )
                                              ? "url(" + res.thumb_url + ")"
                                              : "url(" +
                                                global.config.laravelAPIUrl +
                                                res.thumb_url +
                                                ")"
                                            : "url(data:image/jpeg;base64,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)",
                                        }}
                                      />
                                      {/* <h5>CALCULUS</h5> */}
                                    </div>
                                    <div className="content">
                                      <h2>{res.title}</h2>
                                      <ul>
                                        <li>
                                          by{" "}
                                          <span className="author">
                                            {res.user_name}
                                          </span>
                                        </li>
                                        <li>
                                          Type{" "}
                                          <span className="type">
                                            {res.model_type}
                                          </span>
                                        </li>
                                        {/* <li>
                                      Member Rating{" "}
                                      <span className="type">Project</span>
                                    </li> */}
                                      </ul>
                                      <p>{res.description}</p>
                                    </div>
                                  </div>
                                )}
                              </>
                            );
                          })
                        ) : (
                          <div className="box">no result found !</div>
                        )}
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
