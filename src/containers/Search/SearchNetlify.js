/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Accordion,
  Card,
  Tabs,
  Tab,
  Alert,
} from 'react-bootstrap';
import { educationLevels, subjects } from 'components/ResourceCard/AddResource/dropdownData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import Pagination from 'react-js-pagination';
import { openprojectsearch } from 'store/actions/search';
import { loadResourceTypesAction } from 'store/actions/resource';

import './style.scss';

let paginationStarter = true;

function SearchInterface() {
  // const { history } = props;
  const allState = useSelector((state) => state.search);
  const activityTypesState = useSelector((state) => state.resource.types);
  // const { currentOrganization } = useSelector((state) => state.organization);
  const dispatch = useDispatch();
  const [activityTypes, setActivityTypes] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchQueries, SetSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [meta, setMeta] = useState({});
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [activeModel, setActiveModel] = useState('');
  const [activeType, setActiveType] = useState([]);
  const [activeSubject, setActiveSubject] = useState([]);
  const [activeEducation, setActiveEducation] = useState([]);
  const [searchType] = useState(null);
  const [authorName] = useState('');
  useEffect(() => {
    if (allState.searchResult) {
      if (allState.searchResult.length > 0) {
        setSearch(allState.searchResult);
        SetSearchQuery(allState.searchQuery);
        setSearchInput(allState.searchQuery);
        setMeta(allState.searchMeta);
        localStorage.setItem('loading', 'false');
        Swal.close();
      } else if (allState.searchMeta.total === 0) {
        setSearch([]);
        SetSearchQuery(allState.searchQuery);
        setSearchInput(allState.searchQuery);
        setMeta({});
        localStorage.setItem('loading', 'false');
        Swal.close();
      }
    }
  }, [allState.searchMeta, allState.searchQuery, allState.searchResult]);

  useEffect(() => {
    if (allState.searchResult) {
      if (allState.searchResult.length > 0 && paginationStarter) {
        paginationStarter = false;
        setTotalCount(allState.searchMeta.total);
      }
    }
  }, [allState.searchMeta, allState.searchResult, totalCount]);

  useEffect(() => {
    setActiveEducation([]);
    setActiveSubject([]);
    setActiveType([]);
    if (activityTypesState.length === 0) {
      dispatch(loadResourceTypesAction());
    }
  }, []);

  const compare = (a, b) => {
    // Use toUpperCase() to ignore character casing
    const bandA = a.title.toUpperCase();
    const bandB = b.title.toUpperCase();

    let comparison = 0;
    if (bandA > bandB) {
      comparison = 1;
    } else if (bandA < bandB) {
      comparison = -1;
    }
    return comparison;
  };

  useEffect(() => {
    const allItems = [];
    activityTypesState.map((data) => data.activityItems.map((itm) => allItems.push(itm)));
    setActivityTypes(allItems.sort(compare));
  }, [activityTypesState]);
  // console.log(activeSubject, activeEducation);
  return (
    <>
      <div>
        <div className="content-wrapper">
          <div className="content">
            {true
                ? (
                  <div className="search-result-main">
                    <div className="total-count">
                      {totalCount > 10000
                        ? (
                          <div>
                            Your search returned more than
                            {' '}
                            <span>10,000</span>
                            {' '}
                            results. Please refine your search criteria.
                          </div>
                        )
                        : null}
                      {!!searchQueries && (
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
                                <FontAwesomeIcon className="ml-2" icon="plus" />
                              </Accordion.Toggle>

                              <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                  <div className="body-search">
                                    <input
                                      value={searchInput}
                                      onChange={(e) => {
                                        setSearchInput(e.target.value);
                                      }}
                                      onKeyPress={async (e) => {
                                        if (e.key === 'Enter') {
                                          if (!searchInput.trim()) {
                                            Swal.fire('Search field is required.');
                                          } else if (searchInput.length > 255) {
                                            Swal.fire('Character limit should be less than 255.');
                                          } else {
                                            Swal.fire({
                                              title: 'Searching...', // add html attribute if you want or remove
                                              html: 'We are fetching results for you!',
                                              allowOutsideClick: false,
                                              onBeforeOpen: () => {
                                                Swal.showLoading();
                                              },
                                            });
                                            const dataSend = {
                                              phrase: searchInput.trim(),
                                              subjectArray: activeSubject,
                                              gradeArray: activeEducation,
                                              authors: authorName || undefined,
                                              standardArray: activeType,
                                              size: 20,
                                            };
                                            const result = await dispatch(openprojectsearch(dataSend));
                                            setTotalCount(result.meta?.total);
                                            const tempEducation = [];
                                            const tempSubject = [];
                                            if (activeEducation) {
                                              activeEducation.forEach((edu) => {
                                                if (String(edu).includes('&')) {
                                                  const temp = String(edu).replace('&', 'and');
                                                  tempEducation.push(temp);
                                                } else {
                                                  tempEducation.push(edu);
                                                }
                                              });
                                              setActiveEducation(tempEducation);
                                            }
                                            if (activeSubject) {
                                              activeSubject.forEach((sub) => {
                                                if (String(sub).includes('&')) {
                                                  const temp = String(sub).replace('&', 'and');
                                                  tempSubject.push(temp);
                                                } else {
                                                  tempSubject.push(sub);
                                                }
                                              });
                                              setActiveSubject(tempSubject);
                                            }
                                            // // eslint-disable-next-line max-len
                                            // history.push(`/org/${currentOrganization?.domain}/search?q=${searchInput.trim()}&type=${searchType}&grade=${tempSubject}&education=${tempEducation}&h5p=${activeType}&author=${authorName}`);
                                          }
                                        }
                                      }}
                                      type="search"
                                      placeholder="Search"
                                    />
                                    <div
                                      className="src-btn"
                                      onClick={async () => {
                                        if (!searchInput.trim()) {
                                          Swal.fire('Search field is required.');
                                        } else if (searchInput.length > 255) {
                                          Swal.fire('Character limit should be less than 255.');
                                        } else {
                                          Swal.fire({
                                            title: 'Searching...', // add html attribute if you want or remove
                                            html: 'We are fetching results for you!',
                                            allowOutsideClick: false,
                                            onBeforeOpen: () => {
                                              Swal.showLoading();
                                            },
                                          });
                                          const dataSend = {
                                            phrase: searchInput.trim(),
                                            subjectArray: activeSubject,
                                            author: authorName || undefined,
                                            gradeArray: activeEducation,
                                            standardArray: activeType,
                                            from: 0,
                                            size: 20,
                                          };
                                          const result = await dispatch(openprojectsearch(dataSend));
                                          setTotalCount(result.meta?.total);
                                          const tempEducation = [];
                                          const tempSubject = [];
                                          if (activeEducation) {
                                            activeEducation.forEach((edu) => {
                                              if (String(edu).includes('&')) {
                                                const temp = String(edu).replace('&', 'and');
                                                tempEducation.push(temp);
                                              } else {
                                                tempEducation.push(edu);
                                              }
                                            });
                                            setActiveEducation(tempEducation);
                                          }
                                          if (activeSubject) {
                                            activeSubject.forEach((sub) => {
                                              if (String(sub).includes('&')) {
                                                const temp = String(sub).replace('&', 'and');
                                                tempSubject.push(temp);
                                              } else {
                                                tempSubject.push(sub);
                                              }
                                            });
                                            setActiveSubject(tempSubject);
                                          }
                                          // eslint-disable-next-line max-len
                                         // history.push(`/org/${currentOrganization?.domain}/search?q=${searchInput.trim()}&type=${searchType}&grade=${tempSubject}&education=${tempEducation}&h5p=${activeType}&author=${authorName}`);
                                        }
                                        // setModalShow(true);
                                      }}
                                    >
                                      Search
                                    </div>
                                  </div>
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </div>

                        <div className="refine-search" style={{ display: 'none' }}>
                          <div className="headline">Refine your search</div>

                          <Accordion defaultActiveKey="0">
                            <Card>
                              <Accordion.Toggle as={Card.Header} eventKey="0">
                                Subject
                                <FontAwesomeIcon className="ml-2" icon="plus" />
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                  {subjects.map((data) => (
                                    <div
                                      className="list-item-keys"
                                      key={data.value}
                                      value={data.subject}
                                      onClick={() => {
                                        if (activeSubject.includes(data.subject)) {
                                          if (data.subject === 'Career & Technical Education') {
                                            setActiveSubject(activeSubject.filter((index) => {
                                              if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                                return false;
                                              }
                                              return true;
                                            }));
                                          } else {
                                            setActiveSubject(activeSubject.filter((index) => index !== data.subject));
                                          }
                                        } else {
                                          setActiveSubject([...activeSubject, data.subject]);
                                        }
                                      }}
                                    >
                                      {data.subject === 'Career & Technical Education'
                                        ? (activeSubject.includes('Career & Technical Education') || activeSubject.includes('Career and Technical Education'))
                                          ? <FontAwesomeIcon icon="check-square" /> : <FontAwesomeIcon icon="square" />
                                      : activeSubject.includes(data.subject) ? (
                                        <FontAwesomeIcon icon="check-square" />
                                      ) : (
                                        <FontAwesomeIcon icon="square" />
                                      )}
                                      <span>{data.subject}</span>
                                    </div>
                                  ))}
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>

                            <Card>
                              <Accordion.Toggle as={Card.Header} eventKey="1">
                                Education Level
                                <FontAwesomeIcon className="ml-2" icon="plus" />
                              </Accordion.Toggle>

                              <Accordion.Collapse eventKey="1">
                                <Card.Body>
                                  {educationLevels.map((data) => (
                                    <div
                                      className="list-item-keys"
                                      key={data.value}
                                      value={data.name}
                                      onClick={() => {
                                        if (activeEducation.includes(data.name)) {
                                          if (data.name === 'College & Beyond') {
                                            setActiveSubject(activeEducation.filter((index) => {
                                              if (index === 'College & Beyondn' || index === 'College and Beyond') {
                                                return false;
                                              }
                                              return true;
                                            }));
                                          } else {
                                            setActiveEducation(activeEducation.filter((index) => index !== data.name));
                                          }
                                        } else {
                                          setActiveEducation([...activeEducation, data.name]);
                                        }
                                      }}
                                    >
                                      {data.name === 'College & Beyond'
                                        ? (activeEducation.includes('College & Beyond') || activeEducation.includes('College and Beyond'))
                                          ? <FontAwesomeIcon icon="check-square" /> : <FontAwesomeIcon icon="square" />
                                      : activeEducation.includes(data.name) ? (
                                        <FontAwesomeIcon icon="check-square" />
                                      ) : (
                                        <FontAwesomeIcon icon="square" />
                                      )}

                                      <span>{data.name}</span>
                                    </div>
                                  ))}
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>

                            <Card>
                              <Accordion.Toggle as={Card.Header} eventKey="3">
                                Type of Activity
                                <FontAwesomeIcon className="ml-2" icon="plus" />
                              </Accordion.Toggle>
                              <Accordion.Collapse eventKey="3">
                                <Card.Body
                                  style={{
                                    'max-height': '300px',
                                    'overflow-y': 'auto',
                                  }}
                                >
                                  {activityTypes.map((data) => (
                                    <div
                                      className="list-item-keys"
                                      key={data.id}
                                      value={data.h5pLib}
                                      onClick={() => {
                                        if (activeType.includes(data.h5pLib)) {
                                          // eslint-disable-next-line eqeqeq
                                          setActiveType(activeType.filter((index) => index != data.h5pLib));
                                        } else {
                                          setActiveType([...activeType, data.h5pLib]);
                                        }
                                      }}
                                    >
                                      {activeType.includes(data.h5pLib) ? (
                                        <FontAwesomeIcon icon="check-square" />
                                      ) : (
                                        <FontAwesomeIcon icon="square" />
                                      )}
                                      <span>{data.title}</span>
                                    </div>
                                  ))}
                                </Card.Body>
                              </Accordion.Collapse>
                            </Card>
                          </Accordion>
                        </div>
                      </div>

                      <div className="right-search">
                        <Tabs
                          defaultActiveKey="total"
                          id="uncontrolled-tab-example"
                          onSelect={async (e) => {
                            if (e === 'total') {
                              let searchData;
                              if (searchType === 'orgSearch') {
                                searchData = {
                                from: 0,
                                size: 20,
                                type: searchType,
                                author: authorName || undefined,

                                subjectArray: activeSubject,
                                gradeArray: activeEducation,
                                standardArray: activeType,
                              };
                              } else {
                                searchData = {
                                  phrase: searchQueries.trim(),
                                  from: 0,
                                  size: 20,
                                  author: authorName || undefined,
                                  type: searchType,
                                  subjectArray: activeSubject,
                                  gradeArray: activeEducation,
                                  standardArray: activeType,
                                };
                              }
                              Swal.fire({
                                title: 'Loading...', // add html attribute if you want or remove
                                allowOutsideClick: false,
                                onBeforeOpen: () => {
                                  Swal.showLoading();
                                },
                              });
                              const resultModel = await dispatch(openprojectsearch(searchData));
                              Swal.close();
                              setTotalCount(resultModel.meta[e]);
                              setActiveModel(e);
                              setActivePage(1);
                            } else {
                              let searchData;
                              if (searchType === 'orgSearch') {
                                searchData = {
                                from: 0,
                                size: 20,
                                author: authorName || undefined,
                                model: e,
                                type: searchType,
                                subjectArray: activeSubject,
                                gradeArray: activeEducation,
                                standardArray: activeType,
                              };
                              } else {
                                searchData = {
                                  phrase: searchQueries.trim(),
                                  from: 0,
                                  size: 20,
                                  model: e,
                                  author: authorName || undefined,
                                  type: searchType,
                                  subjectArray: activeSubject,
                                  gradeArray: activeEducation,
                                  standardArray: activeType,
                                };
                              }
                              Swal.fire({
                                title: 'Loading...', // add html attribute if you want or remove
                                allowOutsideClick: false,
                                onBeforeOpen: () => {
                                  Swal.showLoading();
                                },
                              });
                              const resultModel = await dispatch(openprojectsearch(searchData));
                              Swal.close();
                              setTotalCount(resultModel.meta[e]);
                              setActiveModel(e);
                              setActivePage(1);
                            }
                          }}
                        >
                          <Tab
                            eventKey="total"
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
                                      {res.thumb_url ? (
                                        <div
                                          style={{
                                            backgroundImage: res.thumb_url.includes('pexels.com')
                                              ? `url(${res.thumb_url})`
                                              : `url(${global.config.resourceUrl}${res.thumb_url})`,
                                          }}
                                        />
                                      ) : (
                                        <div
                                          style={{
                                            // eslint-disable-next-line max-len
                                            backgroundImage: 'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
                                          }}
                                        />
                                      )}

                                      {/* <h5>CALCULUS</h5> */}
                                    </div>
                                    <div className="content">
                                      <div className="search-content">
                                        <a
                                          href={
                                            res.model === 'Activity'
                                              // eslint-disable-next-line max-len
                                              ? `/studio/activity/${res.id}/shared`
                                              : res.model === 'Playlist'
                                                ? `/studio/playlist/${res.id}/preview/lti`
                                                : `/studio/project/${res.id}/shared`
                                          }
                                          target="_blank"
                                          rel="noreferrer"
                                        >
                                          <h2>{res.title || res.name}</h2>
                                        </a>
                                        <ul>
                                          {res.user && (
                                            <li>
                                              by
                                              {' '}
                                              <span>
                                                {res.user.first_name}
                                              </span>
                                            </li>
                                          )}
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
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <div className="box">No result found !</div>
                              )}
                            </div>
                          </Tab>

                          <Tab
                            eventKey="projects"
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
                                          {res.thumb_url ? (
                                            <div
                                              style={{
                                                backgroundImage: res.thumb_url.includes('pexels.com')
                                                  ? `url(${res.thumb_url})`
                                                  : `url(${global.config.resourceUrl}${res.thumb_url})`,
                                              }}
                                            />
                                          ) : (
                                            <div
                                              style={{
                                                // eslint-disable-next-line max-len
                                                backgroundImage: 'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
                                              }}
                                            />
                                          )}

                                          {/* <h5>CALCULUS</h5> */}
                                        </div>
                                        <div className="content">
                                          <div className="search-content">
                                            <a
                                              href={
                                                res.model === 'Activity'
                                                  ? `/studio/activity/${res.id}/shared`
                                                  : res.model === 'Playlist'
                                                    ? `/studio/playlist/${res.id}/preview/lti`
                                                    : `/studio/project/${res.id}/shared`
                                              }
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              <h2>{res.title || res.name}</h2>
                                            </a>
                                            <ul>
                                              {res.user && (
                                                <li>
                                                  by
                                                  {' '}
                                                  <span>
                                                    {res.user.first_name}
                                                  </span>
                                                </li>
                                              )}
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
                            eventKey="playlists"
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
                                          {res.thumb_url ? (
                                            <div
                                              style={{
                                                backgroundImage: res.thumb_url.includes('pexels.com')
                                                  ? `url(${res.thumb_url})`
                                                  : `url(${global.config.resourceUrl}${res.thumb_url})`,
                                              }}
                                            />
                                          ) : (
                                            <div
                                              style={{
                                                // eslint-disable-next-line max-len
                                                backgroundImage: 'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
                                              }}
                                            />
                                          )}

                                          {/* <h5>CALCULUS</h5> */}
                                        </div>

                                        <div className="content">
                                          <div className="search-content">
                                            <a
                                              href={
                                                res.model === 'Activity'
                                                  // eslint-disable-next-line max-len
                                                  ? `/studio/activity/${res.id}/shared`
                                                  : res.model === 'Playlist'
                                                    ? `/studio/playlist/${res.id}/preview/lti`
                                                    : `/studio/project/${res.id}/shared`
                                              }
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              <h2>{res.title || res.name}</h2>
                                            </a>
                                            <ul>
                                              {res.user && (
                                                <li>
                                                  by
                                                  {' '}
                                                  <span>
                                                    {res.user.first_name}
                                                  </span>
                                                </li>
                                              )}
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
                            eventKey="activities"
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
                                            {res.thumb_url ? (
                                              <div
                                                style={{
                                                  backgroundImage: res.thumb_url.includes('pexels.com')
                                                    ? `url(${res.thumb_url})`
                                                    : `url(${global.config.resourceUrl}${res.thumb_url})`,
                                                }}
                                              />
                                            ) : (
                                              <div
                                                style={{
                                                  // eslint-disable-next-line max-len
                                                  backgroundImage: 'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
                                                }}
                                              />
                                            )}

                                            {/* <h5>CALCULUS</h5> */}
                                          </div>

                                          <div className="content">
                                            <div className="search-content">
                                              <a
                                                href={
                                                  res.model === 'Activity'
                                                    ? `/studio/activity/${res.id}/shared`
                                                    : res.model === 'Playlist'
                                                      ? `/studio/playlist/${res.id}/preview/lti`
                                                      : `/studio/project/${res.id}/shared`
                                                }
                                                target="_blank"
                                                rel="noreferrer"
                                              >
                                                <h2>{res.title || res.name}</h2>
                                              </a>
                                              <ul>
                                                {res.user && (
                                                  <li>
                                                    by
                                                    {' '}
                                                    <span>
                                                      {res.user.first_name}
                                                    </span>
                                                  </li>
                                                )}
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
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  ))
                                ) : (
                                  <div className="box">No result found !</div>
                                )}
                              </div>
                            </div>
                          </Tab>
                        </Tabs>
                        {totalCount > 20 && (
                          <Pagination
                            activePage={activePage}
                            itemsCountPerPage={20}
                            totalItemsCount={totalCount > 10000 ? 10000 : totalCount}
                            pageRangeDisplayed={8}
                            onChange={async (e) => {
                              setActivePage(e);
                              if (activeModel === 'total') {
                                const searchData = {
                                  phrase: searchQueries.trim(),
                                  from: e * 20 - 20,
                                  size: 20,
                                  type: searchType,
                                };
                                Swal.fire({
                                  title: 'Loading...',
                                  allowOutsideClick: false,
                                  onBeforeOpen: () => {
                                    Swal.showLoading();
                                  },
                                });
                                await dispatch(openprojectsearch(searchData));
                                Swal.close();
                              } else {
                                const searchData = {
                                  phrase: searchQueries.trim(),
                                  from: e * 20 - 20,
                                  size: 20,
                                  type: searchType,
                                  model: activeModel,
                                };
                                Swal.fire({
                                  title: 'Loading...',
                                  allowOutsideClick: false,
                                  onBeforeOpen: () => {
                                    Swal.showLoading();
                                  },
                                });
                                await dispatch(openprojectsearch(searchData));
                                Swal.close();
                              }
                            }}
                            itemClass="page-item"
                            linkClass="page-link"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )
                : (
                  <Alert variant="danger">You are not authorized to view this page!</Alert>
                )}
          </div>
        </div>
      </div>
    </>
  );
}

// SearchInterface.propTypes = {
//   history: PropTypes.object.isRequired,
// };

export default SearchInterface;
