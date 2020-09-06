/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  Accordion,
  Card,
  Tabs,
  Tab,
  Modal,
  Dropdown,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from "sweetalert2"

import { simpleSearchAction, cloneProject } from 'store/actions/search';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Sidebar from 'components/Sidebar';
import CloneModel from './CloneModel';

import './style.scss';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Please select where you would like
          {' '}
          <b>{props.clone ? props.clone.title : ''}</b>
          {' '}
          {props.clone ? props.clone.model : ''}
          {' '}
          to be cloned
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <CloneModel clone={props} />
      </Modal.Body>
    </Modal>
  );
}

MyVerticallyCenteredModal.propTypes = {
  clone: PropTypes.object,
};

MyVerticallyCenteredModal.defaultProps = {
  clone: null,
};

function SearchInterface() {
  const allState = useSelector((state) => state.search);
  const [modalShow, setModalShow] = useState(false);
  const [search, setSearch] = useState();
  const [searchQueries, SetSearchQuerry] = useState('');
  const [searchInput, setSearchInput] = useState();
  const [meta, setMeta] = useState();
  const [clone, setClone] = useState();

  useEffect(() => {
    if (allState.searchResult.length > 0) {
      setSearch(allState.searchResult);
      SetSearchQuerry(allState.searchQuery);
      setMeta(allState.searchMeta);
      localStorage.setItem('loading', 'false');
      Swal.close();
    } else if (allState.searchResult.length === 0) {
      setSearch([]);
      SetSearchQuerry(allState.searchQuery);
      setMeta({});
      localStorage.setItem('loading', 'false');
      Swal.close();
    }
}, [allState.searchMeta, allState.searchQuery, allState.searchResult]);

  useEffect(() => {
    if (localStorage.getItem('loading') === 'true') {
      Swal.fire({
        html: 'Searching...', // add html attribute if you want or remove
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
    }
  });

  useEffect(() => {
    setTimeout(() => {
      Swal.close();
      localStorage.setItem('loading', 'false');
    }, 5000);
  });

  // useEffect(() => {
  //   console.log(more.current.getBoundingClientRect());
  // }, [window.screenY]);

  const dispatch = useDispatch();
  return (
    <>
      <Header />
      <div className="main-content-wrapper">
        <div className="sidebar-wrapper">
          <Sidebar />
        </div>

        <div className="content-wrapper">
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            className="clone-lti"
            clone={clone}
          />
          <div className="content">
            <div className="search-result-main">
              <div className="total-count">
                {!!search && (
                  <div>
                    Showing
                    {' '}
                    {search ? meta.total : '0'}
                    {' '}
                    results For
                    {' '}
                    <span>{searchQueries}</span>
                  </div>
                )}
              </div>
              <div className="main-content-search">
                <div className="left-search">
                  <div className="search-library">
                    <Accordion defaultActiveKey="0">
                      <Card>
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          Search Library
                          <i className="fa fa-plus" />
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <div className="body-search">
                              <input
                                value={searchInput}
                                onChange={(e) => {
                                  setSearchInput(e.target.value);
                                }}
                                type="text"
                                placeholder="Search"
                              />

                              <div
                                onClick={() => {
                                  if (searchInput) {
                                    Swal.fire({
                                      html: 'Searching...', // add html attribute if you want or remove
                                      allowOutsideClick: false,
                                      onBeforeOpen: () => {
                                        Swal.showLoading();
                                      },
                                    });
                                    dispatch(
                                      simpleSearchAction(searchInput, 0, 1000),
                                    );
                                  }
                                  // setModalShow(true)
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
                  {/*
                  <div className="refine-search">
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
                  */}
                </div>
                <div className="right-search">
                  <Tabs defaultActiveKey="all" id="uncontrolled-tab-example">
                    <Tab
                      eventKey="all"
                      title={
                        !!search && !!meta.total
                          ? `all (${meta.total})`
                          : 'all (0)'
                      }
                    >
                      <div className="results_search">
                        {!!search && search.length > 0 ? (
                          search.map((res) => (
                            <div className="box">
                              <div className="imgbox">
                                <div
                                  style={{
                                    backgroundImage: !!res.thumb_url && res.thumb_url.includes('pexels.com')
                                      ? `url(${res.thumb_url})`
                                      : `url(${global.config.resourceUrl}${res.thumb_url})`,
                                  }}
                                />
                                {/* <h5>CALCULUS</h5> */}
                              </div>
                              <div className="content">
                                <div className="search-content">
                                  <a
                                    href={
                                      res.model === 'Activity'
                                        ? `/activity/lti/preview/${res.id}`
                                        : res.model === 'Playlist'
                                          ? `/playlist/lti/preview/${res.id}`
                                          : `/project/${res.id}/shared`
                                    }
                                    target="_blank"
                                    rel="noreferrer"
                                  >
                                    <h2>{res.title || res.name}</h2>
                                  </a>
                                  <ul>
                                    <li>
                                      by
                                      {' '}
                                      <span className="author">
                                        {res.user_name}
                                      </span>
                                    </li>
                                    <li>
                                      Type
                                      {' '}
                                      <span className="type">{res.model}</span>
                                    </li>
                                    {/* <li>
                                          Member Rating{" "}
                                          <span className="type">Project</span>
                                        </li> */}
                                  </ul>
                                  <p>{res.description}</p>
                                </div>
                                <Dropdown>
                                  <Dropdown.Toggle>
                                    <FontAwesomeIcon icon="ellipsis-v" />
                                  </Dropdown.Toggle>

                                  <Dropdown.Menu>
                                    <div onClick={() => {
                                      if (res.model === 'Project') {
                                        Swal.fire({
                                          html: `You have selected <strong>${res.title} 
                                       
                                          </strong> ${res.model}<br>Do you want to continue ?`,

                                          showCancelButton: true,
                                          confirmButtonColor: '#3085d6',
                                          cancelButtonColor: '#d33',
                                          confirmButtonText: 'Ok',
                                        }).then((result) => {
                                          if (result.value) {
                                            cloneProject(res.id);
                                          }
                                        });
                                      } else {
                                        setModalShow(true);
                                        setClone(res);
                                      }
                                    }}
                                    >
                                      <FontAwesomeIcon className="ml-2" icon="clone" />
                                      {' '}
                                      Clone
                                    </div>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="box">No result found !</div>
                        )}
                      </div>
                    </Tab>

                    <Tab
                      eventKey="project"
                      title={
                        !!search && !!meta.projects
                          ? `project (${meta.projects})`
                          : 'project (0)'
                      }
                    >
                      <div className="results_search">
                        {!!search && search.length > 0 ? (
                          search.map((res) => (
                            <>
                              {res.model === 'Project' && (
                              <div className="box">
                                <div className="imgbox">
                                  <div
                                    style={{
                                      backgroundImage: !!res.thumb_url && res.thumb_url.includes('pexels.com')
                                        ? `url(${res.thumb_url})`
                                        : `url(${global.config.resourceUrl}${res.thumb_url})`,
                                    }}
                                  />
                                  {/* <h5>CALCULUS</h5> */}
                                </div>
                                <div className="content">
                                  <div className="search-content">
                                    <a
                                      href={
                                      res.model === 'Activity'
                                        ? `/activity/lti/preview/${res.id}`
                                        : res.model === 'Playlist'
                                          ? `/playlist/lti/preview/${res.id}`
                                          : `/project/${res.id}/shared`
                                    }
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <h2>{res.title || res.name}</h2>
                                    </a>
                                    <ul>
                                      <li>
                                        by
                                        {' '}
                                        <span className="author">
                                          {res.user_name}
                                        </span>
                                      </li>
                                      <li>
                                        Type
                                        {' '}
                                        <span className="type">{res.model}</span>
                                      </li>
                                      {/* <li>
                                          Member Rating{" "}
                                          <span className="type">Project</span>
                                        </li> */}
                                    </ul>
                                    <p>{res.description}</p>
                                  </div>
                                  <Dropdown>
                                    <Dropdown.Toggle>
                                      <FontAwesomeIcon icon="ellipsis-v" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <div onClick={() => {
                                        if (res.model === 'Project') {
                                          Swal.fire({
                                            html: `You have selected <strong>${res.title} 
                                       
                                          </strong> ${res.model}<br>Do you want to continue ?`,

                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Ok',
                                          }).then((result) => {
                                            if (result.value) {
                                              cloneProject(res.id);
                                            }
                                          });
                                        } else {
                                          setModalShow(true);
                                          setClone(res);
                                        }
                                      }}
                                      >
                                        <FontAwesomeIcon className="ml-2" icon="clone" />
                                        {' '}
                                        Clone
                                      </div>
                                    </Dropdown.Menu>
                                  </Dropdown>

                                </div>
                                </div>
                              )}
                            </>
                          ))
                        ) : (
                          <div className="box">No result found !</div>
                        )}
                      </div>
                    </Tab>
                    <Tab
                      eventKey="playlist"
                      title={
                        !!search && !!meta.playlists
                          ? `playlist (${meta.playlists})`
                          : 'playlist (0)'
                      }
                    >
                      <div className="results_search">
                        {!!search && search.length > 0 ? (
                          search.map((res) => (
                            <>
                              {res.model === 'Playlist' && (
                              <div className="box">
                                <div className="imgbox">
                                  <div
                                    style={{
                                      backgroundImage: !!res.thumb_url && res.thumb_url.includes('pexels.com')
                                        ? `url(${res.thumb_url})`
                                        : `url(${global.config.resourceUrl}${res.thumb_url})`,
                                    }}
                                  />
                                  {/* <h5>CALCULUS</h5> */}
                                </div>
                                <div className="content">
                                  <div className="search-content">
                                    <a
                                      href={
                                      res.model === 'Activity'
                                        ? `/activity/lti/preview/${res.id}`
                                        : res.model === 'Playlist'
                                          ? `/playlist/lti/preview/${res.id}`
                                          : `/project/${res.id}/shared`
                                    }
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <h2>{res.title || res.name}</h2>
                                    </a>
                                    <ul>
                                      <li>
                                        by
                                        {' '}
                                        <span className="author">
                                          {res.user_name}
                                        </span>
                                      </li>
                                      <li>
                                        Type
                                        {' '}
                                        <span className="type">{res.model}</span>
                                      </li>
                                      {/* <li>
                                          Member Rating{" "}
                                          <span className="type">Project</span>
                                        </li> */}
                                    </ul>
                                    <p>{res.description}</p>
                                  </div>
                                  <Dropdown>
                                    <Dropdown.Toggle>
                                      <FontAwesomeIcon icon="ellipsis-v" />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      <div onClick={() => {
                                        if (res.model === 'Project') {
                                          Swal.fire({
                                            html: `You have selected <strong>${res.title} 
                                       
                                          </strong> ${res.model}<br>Do you want to continue ?`,

                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Ok',
                                          }).then((result) => {
                                            if (result.value) {
                                              cloneProject(res.id);
                                            }
                                          });
                                        } else {
                                          setModalShow(true);
                                          setClone(res);
                                        }
                                      }}
                                      >
                                        <FontAwesomeIcon className="ml-2" icon="clone" />
                                        {' '}
                                        Clone
                                      </div>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>

                              </div>
                              )}
                            </>
                          ))
                        ) : (
                          <div className="box">No result found !</div>
                        )}
                      </div>
                    </Tab>

                    <Tab
                      eventKey="activity"
                      title={
                        !!search && !!meta.activities
                          ? `activity (${meta.activities})`
                          : 'activity (0)'
                      }
                    >
                      <div className="content">
                        <div className="results_search">
                          {!!search && search.length > 0 ? (
                            search.map((res) => (
                              <>
                                {res.model === 'Activity' && (
                                <div className="box">
                                  <div className="imgbox">
                                    <div
                                      style={{
                                      backgroundImage: !!res.thumb_url && res.thumb_url.includes('pexels.com')
                                        ? `url(${res.thumb_url})`
                                        : `url(${global.config.resourceUrl}${res.thumb_url})`,
                                    }}
                                    />
                                    {/* <h5>CALCULUS</h5> */}
                                  </div>
                                  <div className="content">
                                    <div className="search-content">
                                      <a
                                      href={
                                      res.model === 'Activity'
                                        ? `/activity/lti/preview/${res.id}`
                                        : res.model === 'Playlist'
                                          ? `/playlist/lti/preview/${res.id}`
                                          : `/project/${res.id}/shared`
                                    }
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <h2>{res.title || res.name}</h2>
                                    </a>
                                      <ul>
                                      <li>
                                        by
                                        {' '}
                                        <span className="author">
                                          {res.user_name}
                                        </span>
                                      </li>
                                      <li>
                                        Type
                                        {' '}
                                        <span className="type">{res.model}</span>
                                      </li>
                                      {/* <li>
                                          Member Rating{" "}
                                          <span className="type">Project</span>
                                        </li> */}
                                    </ul>
                                      <p>{res.description}</p>
                                    </div>
                                    <Dropdown>
                                      <Dropdown.Toggle>
                                      <FontAwesomeIcon icon="ellipsis-v" />
                                    </Dropdown.Toggle>

                                      <Dropdown.Menu>
                                      <div onClick={() => {
                                        if (res.model === 'Project') {
                                          Swal.fire({
                                            html: `You have selected <strong>${res.title} 
                                       
                                          </strong> ${res.model}<br>Do you want to continue ?`,

                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Ok',
                                          }).then((result) => {
                                            if (result.value) {
                                              cloneProject(res.id);
                                            }
                                          });
                                        } else {
                                          setModalShow(true);
                                          setClone(res);
                                        }
                                      }}
                                      >
                                        <FontAwesomeIcon className="ml-2" icon="clone" />
                                        {' '}
                                        Clone
                                      </div>
                                    </Dropdown.Menu>
                                    </Dropdown>
                                  </div>
                                </div>

                                )}
                              </>
                            ))
                          ) : (
                            <div className="box">no result found !</div>
                          )}
                        </div>
                      </div>
                    </Tab>
                  </Tabs>
                  {/*
                  <div ref={more} className="">
                    Loading More
                  </div>
                  */}
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


export default SearchInterface;
