/* eslint-disable */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Accordion, Card, Tabs, Tab, Modal, Alert, Dropdown } from 'react-bootstrap';
import Buttons from 'utils/Buttons/buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import Pagination from 'react-js-pagination';
import { simpleSearchAction } from 'store/actions/search';
import { loadResourceTypesAction } from 'store/actions/resource';
import { educationLevels, subjects } from 'components/ResourceCard/AddResource/dropdownData';
import './styles.scss';

let paginationStarter = true;

function ExistingActivitySearch(props) {
  const { fromTeam, addActivity, libraries } = props;
  const [toggleStates, setToggleStates] = useState({
    searchLibrary: true,
    subject: true,
    education: false,
    type: false,
  });
  const allState = useSelector((state) => state.search);
  const activityTypesState = useSelector((state) => state.resource.types);
  const { currentOrganization, permission } = useSelector((state) => state.organization);
  const dispatch = useDispatch();
  const [activityTypes, setActivityTypes] = useState([]);
  const [search, setSearch] = useState([]);
  const [searchQueries, SetSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [meta, setMeta] = useState({});
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [activeModel, setActiveModel] = useState('activities');
  const [activeType, setActiveType] = useState([]);
  const [activeSubject, setActiveSubject] = useState([]);
  const [activeEducation, setActiveEducation] = useState([]);
  const [searchType, setSearchType] = useState(null);
  const [authorName, SetAuthor] = useState('');
  const [activetab, setActiveTab] = useState('activities');
  const [todate, Settodate] = useState(undefined);
  const [fromdate, Setfromdate] = useState(undefined);

  useEffect(() => {
    if (localStorage.getItem('refreshPage') === 'true' && currentOrganization && searchType) {
      let dataSend;
      if (searchType === 'orgSearch') {
        dataSend = {
          phrase: searchInput.trim(),
          subjectArray: activeSubject,
          gradeArray: activeEducation,
          standardArray: activeType,
          author: authorName || undefined,
          type: searchType,
          from: 0,
          size: 20,
          model: 'activities',
          standardArray: libraries,
        };
      } else {
        dataSend = {
          phrase: searchInput.trim(),
          subjectArray: activeSubject,
          gradeArray: activeEducation,
          standardArray: activeType,
          author: authorName || undefined,
          type: searchType,
          from: 0,
          size: 20,
          model: 'activities',
          standardArray: libraries,
        };
      }
      let result;
      (async () => {
        result = await dispatch(simpleSearchAction(dataSend));
      })();
      setTotalCount(result?.meta?.total);
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
    }
  }, [currentOrganization]);

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
    activityTypesState?.data?.map((data) => data.activityItems.map((itm) => allItems.push(itm)));
    setActivityTypes(allItems.sort(compare));
  }, [activityTypesState]);

  return (
    <>
      <div>
        <div className={!fromTeam && 'search-wrapper'}>
          <div className="content-search">
            {true ? (
              <div className="search-result-main">
                {!fromTeam && <div className="current-org-search">{currentOrganization?.name}</div>}
                {!fromTeam && <div className="exp-lib-cnt">Explore library content</div>}
                <div
                  className="total-count"
                  style={{
                    display: totalCount > 1000 || !!searchQueries ? 'block' : 'none',
                  }}
                >
                  {totalCount > 10000 ? (
                    <div>
                      Your search returned more than <span>10,000</span> results. Please refine your search criteria.
                    </div>
                  ) : null}
                  {!!searchQueries && (
                    <div>
                      Showing {search ? meta.total : '0'} results For <span>{searchQueries}</span>
                    </div>
                  )}
                </div>

                <div className="main-content-search">
                  <div className="left-search">
                    <div className="search-library">
                      <Accordion defaultActiveKey="0">
                        <Card>
                          <Accordion.Toggle
                            as={Card.Header}
                            eventKey="0"
                            onClick={() =>
                              setToggleStates({
                                ...toggleStates,
                                searchLibrary: !toggleStates.searchLibrary,
                              })
                            }
                          >
                            Search Library
                            <FontAwesomeIcon className="ml-2" icon={toggleStates.searchLibrary ? 'chevron-up' : 'chevron-down'} />
                          </Accordion.Toggle>

                          <Accordion.Collapse eventKey="0">
                            <Card.Body>
                              <div className="body-search">
                                <input
                                  // style={{ display: searchType === 'orgSearch' ? 'none' : 'block' }}
                                  value={searchInput}
                                  onChange={(e) => {
                                    setSearchInput(e.target.value);
                                  }}
                                  onKeyPress={async (e) => {
                                    if (e.key === 'Enter') {
                                      if (!searchInput.trim() && searchType !== 'orgSearch') {
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
                                        let dataSend;
                                        if (searchType === 'orgSearch') {
                                          dataSend = {
                                            phrase: searchInput.trim(),
                                            subjectArray: activeSubject,
                                            gradeArray: activeEducation,
                                            authors: authorName || undefined,
                                            standardArray: activeType,
                                            type: searchType,
                                            from: 0,
                                            size: 20,
                                            model: 'activities',
                                            standardArray: libraries,
                                          };
                                        } else {
                                          dataSend = {
                                            phrase: searchInput.trim(),
                                            subjectArray: activeSubject,
                                            gradeArray: activeEducation,
                                            authors: authorName || undefined,
                                            standardArray: activeType,
                                            type: searchType,
                                            from: 0,
                                            size: 20,
                                            model: 'activities',
                                            standardArray: libraries,
                                          };
                                        }
                                        const result = await dispatch(simpleSearchAction(dataSend));
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
                                      }
                                    }
                                  }}
                                  type="search"
                                  placeholder="Search"
                                />

                                <div className="form-group">
                                  <div className="radio-btns">
                                    {true && (
                                      <label>
                                        <input
                                          name="type"
                                          onChange={(e) => {
                                            setSearchType(e.target.value);
                                          }}
                                          value="private"
                                          checked={searchType === 'private'}
                                          type="radio"
                                        />
                                        <span>My Projects</span>
                                      </label>
                                    )}
                                    {true && (
                                      <label>
                                        <input
                                          name="type"
                                          onChange={(e) => {
                                            setSearchType(e.target.value);
                                          }}
                                          value="public"
                                          checked={searchType === 'public'}
                                          type="radio"
                                        />
                                        <span>All Shared Projects</span>
                                      </label>
                                    )}
                                    {true && (
                                      <label>
                                        <input
                                          name="type"
                                          onChange={(e) => {
                                            setSearchType(e.target.value);
                                          }}
                                          value="orgSearch"
                                          checked={searchType === 'orgSearch'}
                                          type="radio"
                                        />
                                        <span>All Shared Projects In My Org</span>
                                      </label>
                                    )}
                                  </div>
                                </div>
                                {permission?.Organization?.includes('organization:view-user') && searchType !== 'private' && <div className="author-label">Author</div>}
                                <div
                                  className="form-group"
                                  style={{
                                    display: permission?.Organization?.includes('organization:view-user') && searchType !== 'private' ? 'block' : 'none',
                                  }}
                                >
                                  <input
                                    placeholder="Enter author name"
                                    className="authorName"
                                    value={authorName}
                                    onChange={({ target }) => {
                                      if (target.value) {
                                        SetAuthor(target.value);
                                      } else {
                                        SetAuthor('');
                                      }
                                    }}
                                  />
                                </div>
                                <div
                                  className="src-btn"
                                  onClick={async () => {
                                    Setfromdate(undefined);
                                    Settodate(undefined);
                                    setActiveTab('activities');
                                    if (!searchInput.trim() && searchType !== 'orgSearch') {
                                      Swal.fire('Search field is required.');
                                    } else if (searchInput.length > 255) {
                                      Swal.fire('Character limit should be less than 255.');
                                    } else if (!searchType) {
                                      Swal.fire('Search type is required. Click one of the radio buttons.');
                                    } else {
                                      Swal.fire({
                                        title: 'Searching...', // add html attribute if you want or remove
                                        html: 'We are fetching results for you!',
                                        allowOutsideClick: false,
                                        onBeforeOpen: () => {
                                          Swal.showLoading();
                                        },
                                      });
                                      let dataSend;
                                      if (searchType === 'orgSearch') {
                                        dataSend = {
                                          phrase: searchInput.trim(),
                                          subjectArray: activeSubject,
                                          gradeArray: activeEducation,
                                          standardArray: activeType,
                                          author: authorName || undefined,
                                          fromDate: fromdate || undefined,
                                          toDate: todate || undefined,
                                          type: searchType,
                                          from: 0,
                                          size: 20,
                                          model: 'activities',
                                          standardArray: libraries,
                                        };
                                      } else {
                                        dataSend = {
                                          phrase: searchInput.trim(),
                                          subjectArray: activeSubject,
                                          author: authorName || undefined,
                                          fromDate: fromdate || undefined,
                                          toDate: todate || undefined,
                                          gradeArray: activeEducation,
                                          standardArray: activeType,
                                          type: searchType,
                                          from: 0,
                                          size: 20,
                                          model: 'activities',
                                          standardArray: libraries,
                                        };
                                      }
                                      const result = await dispatch(simpleSearchAction(dataSend));
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
                                    }
                                  }}
                                >
                                  <FontAwesomeIcon icon="search" />
                                  Search
                                </div>
                              </div>
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    </div>

                    <div className="refine-search">
                      <div className="headline">Refine your search</div>

                      <Accordion defaultActiveKey="0">
                        <Card>
                          <Accordion.Toggle
                            as={Card.Header}
                            eventKey="0"
                            onClick={() =>
                              setToggleStates({
                                ...toggleStates,
                                type: false,
                                education: false,
                                subject: !toggleStates.subject,
                              })
                            }
                          >
                            Subject
                            <FontAwesomeIcon className="ml-2" icon={toggleStates.subject ? 'chevron-up' : 'chevron-down'} />
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
                                        setActiveSubject(
                                          activeSubject.filter((index) => {
                                            if (index === 'Career & Technical Education' || index === 'Career and Technical Education') {
                                              return false;
                                            }
                                            return true;
                                          }),
                                        );
                                      } else {
                                        setActiveSubject(activeSubject.filter((index) => index !== data.subject));
                                      }
                                    } else {
                                      setActiveSubject([...activeSubject, data.subject]);
                                    }
                                  }}
                                >
                                  {data.subject === 'Career & Technical Education' ? (
                                    activeSubject.includes('Career & Technical Education') || activeSubject.includes('Career and Technical Education') ? (
                                      <FontAwesomeIcon icon="check-square" />
                                    ) : (
                                      <FontAwesomeIcon icon="square" />
                                    )
                                  ) : activeSubject.includes(data.subject) ? (
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
                          <Accordion.Toggle
                            as={Card.Header}
                            eventKey="1"
                            onClick={() =>
                              setToggleStates({
                                ...toggleStates,
                                type: false,
                                subject: false,
                                education: !toggleStates.education,
                              })
                            }
                          >
                            Education Level
                            <FontAwesomeIcon className="ml-2" icon={toggleStates.education ? 'chevron-up' : 'chevron-down'} />
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
                                        setActiveEducation(
                                          activeEducation.filter((index) => {
                                            if (index === 'College & Beyond' || index === 'College and Beyond') {
                                              return false;
                                            }
                                            return true;
                                          }),
                                        );
                                      } else {
                                        setActiveEducation(activeEducation.filter((index) => index !== data.name));
                                      }
                                    } else {
                                      setActiveEducation([...activeEducation, data.name]);
                                    }
                                  }}
                                >
                                  {data.name === 'College & Beyond' ? (
                                    activeEducation.includes('College & Beyond') || activeEducation.includes('College and Beyond') ? (
                                      <FontAwesomeIcon icon="check-square" />
                                    ) : (
                                      <FontAwesomeIcon icon="square" />
                                    )
                                  ) : activeEducation.includes(data.name) ? (
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
                          <Accordion.Toggle
                            as={Card.Header}
                            eventKey="3"
                            onClick={() =>
                              setToggleStates({
                                ...toggleStates,
                                subject: false,
                                education: false,
                                type: !toggleStates.type,
                              })
                            }
                          >
                            Type of Activity
                            <FontAwesomeIcon className="ml-2" icon={toggleStates.type ? 'chevron-up' : 'chevron-down'} />
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
                                  {activeType.includes(data.h5pLib) ? <FontAwesomeIcon icon="check-square" /> : <FontAwesomeIcon icon="square" />}
                                  <span>{data.title}</span>
                                </div>
                              ))}
                            </Card.Body>
                          </Accordion.Collapse>
                        </Card>
                      </Accordion>
                    </div>
                  </div>

                  <div className="right-search" id="right-search-branding-style">
                    <Tabs
                      activeKey={activetab}
                      id="uncontrolled-tab-example"
                      onSelect={async (e) => {
                        if (!searchInput && searchType !== 'orgSearch') {
                          Swal.fire('Search field is required.');
                        } else {
                          setActiveTab(e);
                          if (e === 'total') {
                            let searchData;
                            if (searchType === 'orgSearch') {
                              searchData = {
                                phrase: searchQueries.trim() || searchInput,
                                from: 0,
                                size: 20,
                                type: searchType,
                                author: authorName || undefined,
                                fromDate: fromdate || undefined,
                                toDate: todate || undefined,
                                subjectArray: activeSubject,
                                gradeArray: activeEducation,
                                standardArray: activeType,
                              };
                            } else {
                              searchData = {
                                phrase: searchQueries.trim() || searchInput,
                                from: 0,
                                size: 20,
                                author: authorName || undefined,
                                fromDate: fromdate || undefined,
                                toDate: todate || undefined,
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
                            const resultModel = await dispatch(simpleSearchAction(searchData));
                            Swal.close();
                            setTotalCount(resultModel.meta[e]);
                            setActiveModel(e);
                            setActivePage(1);
                          } else {
                            let searchData;
                            if (searchType === 'orgSearch') {
                              searchData = {
                                phrase: searchQueries.trim() || searchInput,
                                from: 0,
                                size: 20,
                                author: authorName || undefined,
                                fromDate: fromdate || undefined,
                                toDate: todate || undefined,
                                model: e,
                                type: searchType,
                                subjectArray: activeSubject,
                                gradeArray: activeEducation,
                                standardArray: activeType,
                                standardArray: libraries,
                              };
                            } else {
                              searchData = {
                                phrase: searchQueries.trim() || searchInput,
                                from: 0,
                                size: 20,
                                model: e,
                                author: authorName || undefined,
                                fromDate: fromdate || undefined,
                                toDate: todate || undefined,
                                type: searchType,
                                subjectArray: activeSubject,
                                gradeArray: activeEducation,
                                standardArray: activeType,
                                standardArray: libraries,
                              };
                            }
                            Swal.fire({
                              title: 'Loading...', // add html attribute if you want or remove
                              allowOutsideClick: false,
                              onBeforeOpen: () => {
                                Swal.showLoading();
                              },
                            });
                            const resultModel = await dispatch(simpleSearchAction(searchData));
                            Swal.close();
                            setTotalCount(resultModel.meta[e]);
                            setActiveModel(e);
                            setActivePage(1);
                          }
                        }
                      }}
                    >
                      {!fromTeam && (
                        <Tab eventKey="activities" title={!!search && !!meta.activities ? `activity (${meta.activities})` : 'activity (0)'}>
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
                                                backgroundImage: !res.thumb_url.includes('/storage/')
                                                  ? `url(${res.thumb_url})`
                                                  : `url(${global.config.resourceUrl}${res.thumb_url})`,
                                              }}
                                            />
                                          ) : (
                                            <div
                                              style={{
                                                // eslint-disable-next-line max-len
                                                backgroundImage:
                                                  'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
                                              }}
                                            />
                                          )}
                                        </div>

                                        <div className="contentbox">
                                          <div className="search-content">
                                            <a
                                              href={
                                                res.model === 'Activity'
                                                  ? `/activity/${res.id}/preview`
                                                  : res.model === 'Playlist'
                                                  ? `/playlist/${res.id}/preview/lti`
                                                  : `/project/${res.id}/preview`
                                              }
                                              target="_blank"
                                              rel="noreferrer"
                                            >
                                              <h2>{res.title || res.name}</h2>
                                            </a>
                                            <ul>
                                              {res.user && (
                                                <li>
                                                  by <span>{res.user.first_name}</span>
                                                </li>
                                              )}
                                              <li>
                                                Type <span className="type">{res.model}</span>
                                              </li>
                                            </ul>
                                            <p>{res.description}</p>
                                          </div>
                                          <Buttons text="Add" secondary={true} width="153px" height="36px" onClick={() => addActivity(res)} hover={true} />
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
                      )}
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
                              subjectArray: activeSubject || undefined,
                              gradeArray: activeEducation || undefined,
                              standardArray: activeType || undefined,
                              author: authorName || undefined,
                            };
                            Swal.fire({
                              title: 'Loading...',
                              allowOutsideClick: false,
                              onBeforeOpen: () => {
                                Swal.showLoading();
                              },
                            });
                            await dispatch(simpleSearchAction(searchData));
                            Swal.close();
                          } else {
                            const searchData = {
                              phrase: searchQueries.trim(),
                              from: e * 20 - 20,
                              size: 20,
                              type: searchType,
                              model: activeModel,
                              subjectArray: activeSubject || undefined,
                              gradeArray: activeEducation || undefined,
                              standardArray: activeType || undefined,
                              author: authorName || undefined,
                              standardArray: libraries,
                            };
                            Swal.fire({
                              title: 'Loading...',
                              allowOutsideClick: false,
                              onBeforeOpen: () => {
                                Swal.showLoading();
                              },
                            });
                            await dispatch(simpleSearchAction(searchData));
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
            ) : (
              <Alert variant="danger">You are not authorized to view this page!</Alert>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

ExistingActivitySearch.propTypes = {
  fromTeam: PropTypes.bool,
};

ExistingActivitySearch.defaultProps = {
  fromTeam: false,
};

export default ExistingActivitySearch;
