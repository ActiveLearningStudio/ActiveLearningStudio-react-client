/* eslint-disable */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Tabs, Tab, Modal, Alert, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import Pagination from 'react-js-pagination';
import QueryString from 'query-string';
import { simpleSearchAction, cloneProject, setSearchTypeAction, searchIndependentActivitiesAction } from 'store/actions/search';
import { loadResourceTypesAction } from 'store/actions/resource';
import { addProjectFav, loadLmsAction } from 'store/actions/project';
import Skeleton from 'react-loading-skeleton';

import GoogleModel from 'components/models/GoogleLoginModal';
import { getSubjects, getEducationLevel, getAuthorTag } from 'store/actions/admin';
import { addActivityPlaylistSearch } from 'store/actions/playlist';
import SubSearchBar from 'utils/SubSearchBar/subsearchbar';
import teamicon from 'assets/images/sidebar/users-team.svg';
import Footer from 'components/Footer';
import { faArrowLeft, faPlus } from '@fortawesome/free-solid-svg-icons';
import SearchLibrary from 'components/Search/SearchLibrary';
import RefineSearch from 'components/Search/RefineSearch';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import Buttons from 'utils/Buttons/buttons';

import { toast } from 'react-toastify';
import intActivityServices from 'services/indActivities.service';
import MyVerticallyCenteredModalForActivity from 'components/models/videoH5pmodal';
import CloneModel from './CloneModel';
import './style.scss';
import 'react-loading-skeleton/dist/skeleton.css';

let paginationStarter = true;

export function MyVerticallyCenteredModal(props) {
  return (
    <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* Duplicate <b>{clone ? clone.title : ""}</b> {clone ? clone.model : ""}{" "} */}
          <h5>Add to projects</h5>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <CloneModel clone={props} />
        </div>
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

function SearchInterface(props) {
  const { history, fromTeam, selectProject, setSelectProject, showBackOption, setSelectSearchModule, playlistIdForSearchingTab, setReloadPlaylist, reloadPlaylist } = props;
  const primaryColor = getGlobalColor('--main-primary-color');
  const [currentActivity, setCurrentActivity] = useState(null);
  const [toggleStates, setToggleStates] = useState({
    searchLibrary: true,
    subject: true,
    education: false,
    authorTag: false,
    type: false,
  });
  const allState = useSelector((state) => state.search);
  const activityTypesState = useSelector((state) => state.resource.types);
  const { currentOrganization, permission } = useSelector((state) => state.organization);

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [selectedProjectPlaylistId, setSelectedProjectPlaylistId] = useState(0);
  const [activityTypes, setActivityTypes] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowActivity, setModalShowActivity] = useState(false);
  const [search, setSearch] = useState(null);
  const [searchQueries, SetSearchQuery] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [meta, setMeta] = useState({});
  const [clone, setClone] = useState();
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [activeModel, setActiveModel] = useState('');
  const [activeType, setActiveType] = useState([]);
  const [activeSubject, setActiveSubject] = useState([]);
  const [activeEducation, setActiveEducation] = useState([]);
  const [activeAuthorTag, setActiveAuthorTag] = useState([]);
  const [searchType, setSearchType] = useState('showcase_projects');
  const [authorName, SetAuthor] = useState('');
  const [noWords, setNoWords] = useState('');
  const [activetab, setActiveTab] = useState(fromTeam ? 'projects' : 'total');
  const [todate, Settodate] = useState(undefined);
  const [fromdate, Setfromdate] = useState(undefined);
  const [subjects, setSubjects] = useState([]);
  const [authorTags, setAuthorTags] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [indClone, setIndClone] = useState(false);
  const [isLoader, setisLoader] = useState(false);

  useEffect(() => {
    // window.onscroll = function () {
    //   if (window.innerHeight + Math.ceil(window.scrollY) >= document.body.scrollHeight) {
    //     console.log('reached');
    //   }
    // };
    if (currentOrganization) {
      const searchData = {
        standardArray: activeType,
        from: 0,
        size: 20,
      };

      dispatch(searchIndependentActivitiesAction(searchData, 'showcase_activities'));
    }
  }, [currentOrganization]);

  // const projectVisibilityLMS = allLms?.shareVendors?.map((data) => {
  //   if (data.project_visibility === true) {
  //     return true;
  //   }
  //   return false;
  // });
  // const playlistVisibilityLMS = allLms?.shareVendors?.filter((data) => data.playlist_visibility === true);
  // const activityVisibilityLMS = allLms?.shareVendors?.map((data) => {
  //   if (data.activity_visibility === true) {
  //     return true;
  //   }
  //   return false;
  // });

  useMemo(() => {
    dispatch(loadLmsAction());
  }, []);
  useMemo(() => {
    setActiveEducation([]);
    setActiveSubject([]);
    setActiveAuthorTag([]);
    setActiveType([]);
    // eslint-disable-next-line no-restricted-globals
    const query = QueryString.parse(location.search);
    if (query.type) {
      setSearchType(query.type);
    }
    if (query.h5p) {
      setActiveType(query.h5p.split(','));
    }
    if (query.grade) {
      // if (query.grade.includes('and')) {
      //   query.grade = query.grade.replace('and', '&');
      // }
      setActiveSubject(query?.grade?.split(',').map(Number));
    }
    if (query.education) {
      // if (query.education.includes('and')) {
      //   query.education = query.education.replace('and', '&');
      // }
      setActiveEducation(query?.education?.split(',').map(Number));
    }
    if (query.authorTag) {
      setActiveAuthorTag(query?.authorTag?.split(',').map(Number));
    }
    if (query.author) {
      SetAuthor(query.author);
    }
    if (query.fromDate && query.fromDate !== 'undefined') {
      Setfromdate(query.fromDate);
    } else {
      Setfromdate(undefined);
    }
    if (query.toDate && query.fromDate !== 'undefined') {
      Settodate(query.toDate);
    } else {
      Settodate(undefined);
    }
    if (query?.q) {
      setSearchInput(query?.q);
    }
    // eslint-disable-next-line no-restricted-globals
  }, [location.search]);
  window.onbeforeunload = () => {
    localStorage.setItem('refreshPage', 'true');
  };
  // useEffect(() => {
  //   if (localStorage.getItem('refreshPage') === 'true' && currentOrganization && searchType) {
  //     let dataSend;
  //     if (searchType === 'orgSearch') {
  //       dataSend = {
  //         phrase: searchInput.trim(),
  //         subjectArray: activeSubject,
  //         gradeArray: activeEducation,
  //         authorTagsArray: activeAuthorTag,
  //         standardArray: activeType,
  //         author: authorName || undefined,
  //         type: searchType,
  //         from: 0,
  //         size: 20,
  //       };
  //     } else {
  //       dataSend = {
  //         phrase: searchInput.trim(),
  //         subjectArray: activeSubject,
  //         gradeArray: activeEducation,
  //         authorTagsArray: activeAuthorTag,
  //         standardArray: activeType,
  //         author: authorName || undefined,
  //         type: searchType,
  //         from: 0,
  //         size: 20,
  //       };
  //     }
  //     let result;
  //     (async () => {
  //       result = await dispatch(simpleSearchAction(dataSend));
  //     })();
  //     setTotalCount(result?.meta?.total);
  //     const tempEducation = [];
  //     const tempSubject = [];
  //     const tempTag = [];
  //     if (activeEducation) {
  //       activeEducation.forEach((edu) => {
  //         if (String(edu).includes('&')) {
  //           const temp = String(edu).replace('&', 'and');
  //           tempEducation.push(temp);
  //         } else {
  //           tempEducation.push(edu);
  //         }
  //       });
  //       setActiveEducation(tempEducation);
  //     }
  //     if (activeSubject) {
  //       activeSubject.forEach((sub) => {
  //         if (String(sub).includes('&')) {
  //           const temp = String(sub).replace('&', 'and');
  //           tempSubject.push(temp);
  //         } else {
  //           tempSubject.push(sub);
  //         }
  //       });
  //       setActiveSubject(tempSubject);
  //     }
  //     if (activeAuthorTag) {
  //       activeAuthorTag.forEach((sub) => {
  //         if (String(sub).includes('&')) {
  //           const temp = String(sub).replace('&', 'and');
  //           tempTag.push(temp);
  //         } else {
  //           tempTag.push(sub);
  //         }
  //       });
  //       setActiveAuthorTag(tempTag);
  //     }
  //     // eslint-disable-next-line max-len
  //     // if (!fromTeam) {
  //     //   // eslint-disable-next-line max-len
  //     //   history.push(
  //     //     `/org/${
  //     //       currentOrganization?.domain
  //     //     }/search?q=${searchInput.trim()}&type=${searchType}&grade=${tempSubject}&education=${tempEducation}&authorTag=${tempTag}&h5p=${activeType}&author=${authorName}`,
  //     //   );
  //     // }
  //   }
  // }, [currentOrganization]);
  useEffect(() => {
    if (allState.searchResult) {
      if (allState.searchResult?.length > 0) {
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
      if (allState.searchResult?.length > 0 && paginationStarter) {
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
    // setTimeout(() => {
    //   Swal.close();
    //   localStorage.setItem('loading', 'false');
    // }, 5000);
  });

  useEffect(() => {
    if (activityTypesState?.length === 0 && currentOrganization?.id) {
      dispatch(loadResourceTypesAction());
    }
  }, [activityTypesState?.length, dispatch, currentOrganization]);

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

  useEffect(() => {
    if (currentOrganization?.id) {
      if (subjects?.length === 0) {
        const resultSub = dispatch(getSubjects(currentOrganization?.id || 1));
        resultSub.then((data) => setSubjects(data));
      }
      if (authorTags?.length === 0) {
        const resultAuth = dispatch(getAuthorTag(currentOrganization?.id || 1));
        resultAuth.then((data) => setAuthorTags(data));
      }
      if (educationLevels?.length === 0) {
        const resultEdu = dispatch(getEducationLevel(currentOrganization?.id || 1));
        resultEdu.then((data) => setEducationLevels(data));
      }
    }
  }, [authorTags?.length, currentOrganization?.id, dispatch, educationLevels?.length, subjects?.length]);
  return (
    <>
      <div>
        <div className={!fromTeam && 'search-wrapper'}>
          <MyVerticallyCenteredModal ind={indClone} show={modalShow} onHide={() => setModalShow(false)} className="clone-lti" clone={clone} />

          <div className="content-search">
            {true ? (
              <div className="search-result-main">
                {!fromTeam && <div className="current-org-search">{currentOrganization?.name}</div>}
                {!fromTeam && (
                  <div className="search-top-header">
                    <div className="exp-lib-cnt">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M14.4444 26.8889C21.3173 26.8889 26.8889 21.3173 26.8889 14.4444C26.8889 7.57157 21.3173 2 14.4444 2C7.57157 2 2 7.57157 2 14.4444C2 21.3173 7.57157 26.8889 14.4444 26.8889Z"
                          stroke={primaryColor}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M29.9998 29.9999L23.2332 23.2333" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span> Search library</span>
                    </div>
                    {showBackOption && (
                      <>
                        <div
                          className="back-option-sectioin"
                          onClick={() => {
                            setSelectSearchModule(false);
                            setReloadPlaylist(!reloadPlaylist);
                          }}
                        >
                          <FontAwesomeIcon icon={faArrowLeft} color={primaryColor} className="mr-12" />
                          <span> Back to Playlist</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
                {/* <div
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
                </div> */}
                <Tabs
                  className="main-tabs"
                  onSelect={(eventKey) => {
                    dispatch(setSearchTypeAction(eventKey));
                    setSearchInput('');
                    setSearchType('');
                    setSearch(null);
                    setTotalCount(0);
                    setMeta({});
                    setToggleStates({
                      searchLibrary: true,
                      subject: true,
                      education: false,
                      authorTag: false,
                      type: false,
                    });
                    setActiveSubject([]);
                    setActiveEducation([]);
                    setActiveAuthorTag([]);
                    SetAuthor([]);
                    Settodate([]);
                    Setfromdate([]);
                    if (eventKey === 'Independent activities') {
                      const searchData = {
                        standardArray: activeType,
                        from: 0,
                        size: 20,
                      };

                      dispatch(searchIndependentActivitiesAction(searchData, 'showcase_activities'));
                    } else {
                      const searchData = {
                        standardArray: activeType,
                        from: 0,
                        size: 20,
                      };

                      dispatch(simpleSearchAction(searchData));
                    }
                  }}
                  defaultActiveKey={allState.searchType}
                >
                  {!fromTeam && (
                    <Tab eventKey="Independent activities" title="Learning activities">
                      <div className="main-content-search">
                        <div className="left-search">
                          <div className="search-library">
                            <SearchLibrary
                              currentOrganization={currentOrganization}
                              simpleSearchAction={simpleSearchAction}
                              searchIndependentActivitiesAction={searchIndependentActivitiesAction}
                              setToggleStates={setToggleStates}
                              searchInput={searchInput}
                              searchType={searchType}
                              activeSubject={activeSubject}
                              activeEducation={activeEducation}
                              activeAuthorTag={activeAuthorTag}
                              activeType={activeType}
                              authorName={authorName}
                              fromdate={fromdate}
                              todate={todate}
                              fromTeam={fromTeam}
                              setActiveTab={setActiveTab}
                              setSearchInput={setSearchInput}
                              setSearchType={setSearchType}
                              setActiveEducation={setActiveEducation}
                              setActiveSubject={setActiveSubject}
                              setActiveAuthorTag={setActiveAuthorTag}
                              setAuthor={SetAuthor}
                              setFromDate={Setfromdate}
                              setToDate={Settodate}
                              setTotalCount={setTotalCount}
                              history={history}
                              dispatch={dispatch}
                              permission={permission}
                              activities
                              activeMainSearchType={allState?.searchType}
                              setSearch={setSearch}
                              noWords={noWords}
                              setNoWords={setNoWords}
                            />
                            <RefineSearch
                              setActiveAuthorTag={setActiveAuthorTag}
                              authorTags={authorTags}
                              educationLevels={educationLevels}
                              subjects={subjects}
                              setActiveSubject={setActiveSubject}
                              activeAuthorTag={activeAuthorTag}
                              activityTypes={activityTypes}
                              activeType={activeType}
                              activeEducation={activeEducation}
                              setActiveEducation={setActiveEducation}
                              setActiveType={setActiveType}
                              activeSubject={activeSubject}
                              toggleStates={toggleStates}
                              setToggleStates={setToggleStates}
                            />
                          </div>
                        </div>
                        <div className="right-search" id="right-search-branding-style">
                          <Tabs activeKey="Learning activities" id="controlled-tab-example">
                            <Tab eventKey="Learning activities" title="Learning activities">
                              {/* <SubSearchBar pageCounterTitle={'Results per page'} /> */}
                              <div className="content">
                                <div className="results_search">
                                  {!!search ? (
                                    search?.length > 0 ? (
                                      search.map((res) => (
                                        <>
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
                                                    backgroundImage:
                                                      // eslint-disable-next-line max-len
                                                      'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
                                                  }}
                                                />
                                              )}

                                              {/* <h5>CALCULUS</h5> */}
                                            </div>

                                            <div className="contentbox">
                                              <div className="search-content">
                                                <a href={`/activity/${res.id}/preview?type=ind-search`} target="_blank" rel="noreferrer">
                                                  <h2>{res.title || res.name}</h2>
                                                </a>
                                                <p>{res.description}</p>
                                                {res.user && (
                                                  <div>
                                                    By: <span>{res.user.first_name}</span>
                                                  </div>
                                                )}
                                                <div>
                                                  Type: <span className="type">{res.activity_type}</span>
                                                </div>
                                                {/* <p>{res.description}</p> */}
                                              </div>
                                              {/* <Dropdown className="playlist-dropdown check">
                                              <Dropdown.Toggle>
                                                <FontAwesomeIcon icon="ellipsis-v" />
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu>
                                                <>
                                                  <Dropdown.Item
                                                    onClick={() => {}}
                                                  >
                                                    <FontAwesomeIcon
                                                      className="mr-2"
                                                      icon={faEye}
                                                    />
                                                    Preview
                                                  </Dropdown.Item>
                                                  <Dropdown.Item
                                                    onClick={() => {}}
                                                  >
                                                    <FontAwesomeIcon
                                                      className="mr-2"
                                                      icon={faPlus}
                                                    />
                                                    Add to My Projects
                                                  </Dropdown.Item>
                                                  <Dropdown.Item
                                                    onClick={async () => {
                                                      toast.info(
                                                        "Duplicating Activity...",
                                                        {
                                                          className:
                                                            "project-loading",
                                                          closeOnClick: false,
                                                          closeButton: false,
                                                          position:
                                                            toast.POSITION
                                                              .BOTTOM_RIGHT,
                                                          autoClose: 10000,
                                                          icon: "",
                                                        }
                                                      );
                                                      const result = await intActivityServices.indActivityClone(
                                                        currentOrganization?.id,
                                                        res.id
                                                      );

                                                      toast.dismiss();
                                                      Swal.fire({
                                                        html: result.message,
                                                        icon: "success",
                                                      });
                                                    }}
                                                  >
                                                    <FontAwesomeIcon
                                                      className="mr-2"
                                                      icon={faPlus}
                                                    />
                                                    Add to My Ind.Activities
                                                  </Dropdown.Item>
                                                </>
                                              </Dropdown.Menu>
                                            </Dropdown> */}
                                              {true && (
                                                <Dropdown className="playlist-dropdown check">
                                                  <Dropdown.Toggle>
                                                    <FontAwesomeIcon icon="ellipsis-v" />
                                                  </Dropdown.Toggle>
                                                  <Dropdown.Menu>
                                                    <>
                                                      <a href={`/activity/${res.id}/preview?type=ind-search`} target="_blank" rel="noreferrer">
                                                        {/* <FontAwesomeIcon className="mr-2" icon={faEye} />
                                                      Preview */}
                                                        <div className="dropDown-item-name-icon">
                                                          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                              d="M1.125 6C1.125 6 3.625 1 8 1C12.375 1 14.875 6 14.875 6C14.875 6 12.375 11 8 11C3.625 11 1.125 6 1.125 6Z"
                                                              stroke={primaryColor}
                                                              strokeWidth="1.5"
                                                              strokeLinecap="round"
                                                              strokeLinejoin="round"
                                                            />
                                                            <path
                                                              d="M8 7.875C9.03553 7.875 9.875 7.03553 9.875 6C9.875 4.96447 9.03553 4.125 8 4.125C6.96447 4.125 6.125 4.96447 6.125 6C6.125 7.03553 6.96447 7.875 8 7.875Z"
                                                              stroke={primaryColor}
                                                              strokeWidth="1.5"
                                                              strokeLinecap="round"
                                                              strokeLinejoin="round"
                                                            />
                                                          </svg>
                                                          <span>Preview</span>
                                                        </div>
                                                      </a>
                                                      <Dropdown.Item
                                                        onClick={() => {
                                                          setIndClone(true);
                                                          setModalShow(true);
                                                          setClone(res);
                                                        }}
                                                      >
                                                        {/* <FontAwesomeIcon className="mr-2" icon={faPlus} />
                                                      Add to Projects */}
                                                        <div className="dropDown-item-name-icon">
                                                          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                              d="M1 3.11108V12.4444C1 12.874 1.34823 13.2222 1.77778 13.2222H14.2222C14.6518 13.2222 15 12.874 15 12.4444V4.18802C15 3.75847 14.6518 3.41024 14.2222 3.41024H8.71795"
                                                              stroke={primaryColor}
                                                              strokeWidth="1.5"
                                                              strokeLinecap="round"
                                                            />
                                                            <path
                                                              d="M8.71795 3.41032L6.55831 0.891738C6.48543 0.818805 6.3865 0.777832 6.28336 0.777832H1.38889C1.17411 0.777832 1 0.951945 1 1.16672V3.11116"
                                                              stroke={primaryColor}
                                                              strokeWidth="1.5"
                                                              strokeLinecap="round"
                                                            />
                                                          </svg>
                                                          Copy to My projects
                                                        </div>
                                                      </Dropdown.Item>
                                                      <Dropdown.Item
                                                        onClick={async () => {
                                                          toast.info('Duplicating Activity...', {
                                                            className: 'project-loading',
                                                            closeOnClick: false,
                                                            closeButton: false,
                                                            position: toast.POSITION.BOTTOM_RIGHT,
                                                            autoClose: 10000,
                                                            icon: '',
                                                          });

                                                          const result = await intActivityServices.indActivityClone(currentOrganization?.id, res.id);

                                                          toast.dismiss();
                                                          Swal.fire({
                                                            html: result.message,
                                                            icon: 'success',
                                                          });
                                                        }}
                                                      >
                                                        <FontAwesomeIcon className="mr-2" icon={faPlus} />
                                                        Add to My Ind.Activities
                                                      </Dropdown.Item>

                                                      {/* {permission?.Activity?.includes(
                                                        "activity:share"
                                                      ) &&
                                                        allLms?.length !==
                                                          0 && (
                                                          <li
                                                            className="dropdown-submenu send"
                                                            style={{
                                                              display:
                                                                activityVisibilityLMS.includes(
                                                                  true
                                                                ) &&
                                                                safariMontageActivity.includes(
                                                                  true
                                                                )
                                                                  ? "block"
                                                                  : "none",
                                                            }}
                                                          >
                                                            <a
                                                              tabIndex="-1"
                                                              className="dropdown-item"
                                                            >
                                                              <FontAwesomeIcon
                                                                icon="newspaper"
                                                                className="mr-2"
                                                              />
                                                              Publish
                                                            </a>
                                                            <ul className="dropdown-menu check">
                                                              {allLms?.shareVendors.map(
                                                                (data) => {
                                                                  if (
                                                                    data.lms_name !==
                                                                    "safarimontage"
                                                                  )
                                                                    return false;
                                                                  return (
                                                                    data?.activity_visibility && (
                                                                      <li>
                                                                        <a
                                                                          onClick={() => {
                                                                            dispatch(
                                                                              loadSafariMontagePublishToolAction(
                                                                                res.project_id,
                                                                                res.playlist_id,
                                                                                res.id,
                                                                                data.id
                                                                              )
                                                                            );
                                                                          }}
                                                                        >
                                                                          {
                                                                            data.site_name
                                                                          }
                                                                        </a>
                                                                      </li>
                                                                    )
                                                                  );
                                                                }
                                                              )}
                                                              <Modal
                                                                dialogClassName="safari-modal"
                                                                show={
                                                                  safariMontagePublishTool
                                                                }
                                                                onHide={() =>
                                                                  dispatch(
                                                                    closeSafariMontageToolAction()
                                                                  )
                                                                }
                                                                aria-labelledby="example-modal-sizes-title-lg"
                                                              >
                                                                <Modal.Header
                                                                  closeButton
                                                                >
                                                                  <Modal.Title id="example-modal-sizes-title-lg">
                                                                    Safari
                                                                    Montage
                                                                  </Modal.Title>
                                                                </Modal.Header>
                                                                <Modal.Body>
                                                                  <iframe
                                                                    title="Safari Montage"
                                                                    src={`data:text/html;charset=utf-8,${safariMontagePublishTool}`}
                                                                  />
                                                                </Modal.Body>
                                                              </Modal>
                                                            </ul>
                                                          </li>
                                                        )} */}
                                                    </>
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              )}
                                            </div>
                                          </div>
                                        </>
                                      ))
                                    ) : (
                                      <Alert variant="danger">No result found !</Alert>
                                    )
                                  ) : (
                                    <Skeleton count="3" />
                                  )}
                                </div>
                              </div>
                            </Tab>
                          </Tabs>
                        </div>
                      </div>
                    </Tab>
                  )}
                  <Tab eventKey="Projects" title="Projects">
                    <div className="main-content-search">
                      <div className="left-search">
                        <div className="search-library">
                          <SearchLibrary
                            currentOrganization={currentOrganization}
                            simpleSearchAction={simpleSearchAction}
                            searchIndependentActivitiesAction={searchIndependentActivitiesAction}
                            setToggleStates={setToggleStates}
                            toggleStates={toggleStates}
                            searchInput={searchInput}
                            searchType={searchType}
                            activeSubject={activeSubject}
                            activeEducation={activeEducation}
                            activeAuthorTag={activeAuthorTag}
                            activeType={activeType}
                            authorName={authorName}
                            fromdate={fromdate}
                            todate={todate}
                            fromTeam={fromTeam}
                            setActiveTab={setActiveTab}
                            setSearchInput={setSearchInput}
                            setSearchType={setSearchType}
                            setActiveEducation={setActiveEducation}
                            setActiveSubject={setActiveSubject}
                            setActiveAuthorTag={setActiveAuthorTag}
                            setAuthor={SetAuthor}
                            setFromDate={Setfromdate}
                            setToDate={Settodate}
                            setTotalCount={setTotalCount}
                            history={history}
                            dispatch={dispatch}
                            permission={permission}
                            activeMainSearchType={allState?.searchType}
                            setSearch={setSearch}
                            noWords={noWords}
                            setNoWords={setNoWords}
                          />
                        </div>
                        <RefineSearch
                          setActiveAuthorTag={setActiveAuthorTag}
                          authorTags={authorTags}
                          educationLevels={educationLevels}
                          subjects={subjects}
                          setActiveSubject={setActiveSubject}
                          activeAuthorTag={activeAuthorTag}
                          activityTypes={activityTypes}
                          activeType={activeType}
                          activeEducation={activeEducation}
                          setActiveEducation={setActiveEducation}
                          setActiveType={setActiveType}
                          activeSubject={activeSubject}
                          toggleStates={toggleStates}
                          setToggleStates={setToggleStates}
                        />
                      </div>

                      <div className="right-search" id="right-search-branding-style">
                        <Tabs
                          activeKey={activetab}
                          id="uncontrolled-tab-example"
                          onSelect={async (e) => {
                            setSearch(null);
                            setActiveTab(e);
                            if (e === 'total') {
                              const searchData = {
                                phrase: searchQueries?.trim() || searchInput || undefined,
                                from: 0,
                                size: 20,
                                author: authorName || undefined,
                                fromDate: fromdate || undefined,
                                toDate: todate || undefined,
                                type: searchType,
                                subjectArray: activeSubject,
                                gradeArray: activeEducation,
                                authorTagsArray: activeAuthorTag,
                                standardArray: activeType,
                                no_words: noWords || undefined,
                              };

                              // Swal.fire({
                              //   title: 'Loading...', // add html attribute if you want or remove
                              //   allowOutsideClick: false,
                              //   onBeforeOpen: () => {
                              //     Swal.showLoading();
                              //   },
                              // });
                              const resultModel = await dispatch(simpleSearchAction(searchData));
                              Swal.close();
                              setTotalCount(resultModel.meta[e]);
                              setActiveModel(e);
                              setActivePage(1);
                            } else {
                              const searchData = {
                                phrase: searchQueries?.trim() || searchInput || undefined,
                                from: 0,
                                size: 20,
                                model: e,
                                author: authorName || undefined,
                                fromDate: fromdate || undefined,
                                toDate: todate || undefined,
                                type: searchType,
                                subjectArray: activeSubject,
                                gradeArray: activeEducation,
                                authorTagsArray: activeAuthorTag,
                                standardArray: activeType,
                                no_words: noWords || undefined,
                              };

                              // Swal.fire({
                              //   title: 'Loading...', // add html attribute if you want or remove
                              //   allowOutsideClick: false,
                              //   onBeforeOpen: () => {
                              //     Swal.showLoading();
                              //   },
                              // });
                              const resultModel = await dispatch(simpleSearchAction(searchData));
                              Swal.close();
                              setTotalCount(resultModel.meta[e]);
                              setActiveModel(e);
                              setActivePage(1);
                            }
                          }}
                        >
                          {!fromTeam && (
                            <Tab eventKey="total" title={!!search && !!meta.total ? `all (${meta.total})` : 'all (0)'}>
                              <div className="results_search">
                                {!!search ? (
                                  search?.length > 0 ? (
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
                                                backgroundImage:
                                                  // eslint-disable-next-line max-len
                                                  'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
                                              }}
                                            />
                                          )}

                                          {/* <h5>CALCULUS</h5> */}
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
                                            <p>{res.description}</p>
                                            <ul>
                                              {res.user && (
                                                <li>
                                                  By: <span>{res.user.first_name}</span>
                                                </li>
                                              )}
                                              {res?.team_name && (
                                                <li>
                                                  By: <span> `(T) ${res?.team_name}</span>
                                                </li>
                                              )}
                                              <li>
                                                Type: <span>{res.model}</span>
                                              </li>

                                              {/* <li>
                                            Member Rating{" "}
                                            <span className="type">Project</span>
                                          </li> */}
                                              {res.model === 'Project' && permission?.Project?.includes('project:favorite') && (
                                                <div
                                                  className={`btn-fav ${res.favored}`}
                                                  onClick={(e) => {
                                                    if (e.target.classList.contains('true')) {
                                                      e.target.classList.remove('true');
                                                      e.target.classList.add('false');
                                                    } else {
                                                      e.target.classList.add('true');
                                                    }
                                                    dispatch(addProjectFav(res.id));
                                                  }}
                                                >
                                                  <FontAwesomeIcon
                                                    className="mr-2"
                                                    icon="star"
                                                    style={{
                                                      pointerEvents: 'none',
                                                    }}
                                                  />{' '}
                                                  Favorite
                                                </div>
                                              )}
                                            </ul>
                                            {/* <p>{res.description}</p> */}
                                          </div>
                                          {(permission?.Project?.includes('project:clone') || permission?.Project?.includes('project:publish')) && res.model === 'Project' && (
                                            <Dropdown className="playlist-dropdown check">
                                              <Dropdown.Toggle>
                                                <FontAwesomeIcon icon="ellipsis-v" />
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu>
                                                <Dropdown.Item
                                                  onClick={() =>
                                                    window.open(
                                                      res.model === 'Activity'
                                                        ? `/activity/${res.id}/preview`
                                                        : res.model === 'Playlist'
                                                        ? `/playlist/${res.id}/preview/lti`
                                                        : `/project/${res.id}/preview`,
                                                      '_blank',
                                                    )
                                                  }
                                                >
                                                  {/* <FontAwesomeIcon className="mr-2" icon={faEye} />
                                                Preview */}
                                                  <div className="dropDown-item-name-icon">
                                                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path
                                                        d="M1.125 6C1.125 6 3.625 1 8 1C12.375 1 14.875 6 14.875 6C14.875 6 12.375 11 8 11C3.625 11 1.125 6 1.125 6Z"
                                                        stroke={primaryColor}
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                      />
                                                      <path
                                                        d="M8 7.875C9.03553 7.875 9.875 7.03553 9.875 6C9.875 4.96447 9.03553 4.125 8 4.125C6.96447 4.125 6.125 4.96447 6.125 6C6.125 7.03553 6.96447 7.875 8 7.875Z"
                                                        stroke={primaryColor}
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                      />
                                                    </svg>
                                                    <span>Preview</span>
                                                  </div>
                                                </Dropdown.Item>
                                                {permission?.Project?.includes('project:clone') && (
                                                  <Dropdown.Item
                                                    onClick={() => {
                                                      Swal.fire({
                                                        html: `You have selected <strong>${res.title}</strong> ${res.model}<br>Do you want to continue ?`,
                                                        showCancelButton: true,
                                                        confirmButtonColor: '#3085d6',
                                                        cancelButtonColor: '#d33',
                                                        confirmButtonText: 'Ok',
                                                      }).then((result) => {
                                                        if (result.value) {
                                                          cloneProject(res.id);
                                                        }
                                                      });
                                                    }}
                                                  >
                                                    {/* <FontAwesomeIcon className="mr-2" icon="clone" />
                                                  Add to projects */}
                                                    <div className="dropDown-item-name-icon">
                                                      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                          d="M1 3.11108V12.4444C1 12.874 1.34823 13.2222 1.77778 13.2222H14.2222C14.6518 13.2222 15 12.874 15 12.4444V4.18802C15 3.75847 14.6518 3.41024 14.2222 3.41024H8.71795"
                                                          stroke={primaryColor}
                                                          strokeWidth="1.5"
                                                          strokeLinecap="round"
                                                        />
                                                        <path
                                                          d="M8.71795 3.41032L6.55831 0.891738C6.48543 0.818805 6.3865 0.777832 6.28336 0.777832H1.38889C1.17411 0.777832 1 0.951945 1 1.16672V3.11116"
                                                          stroke={primaryColor}
                                                          strokeWidth="1.5"
                                                          strokeLinecap="round"
                                                        />
                                                      </svg>
                                                      Copy to My projects
                                                    </div>
                                                  </Dropdown.Item>
                                                )}

                                                {/* {permission?.Project?.includes(
                                                  "project:publish"
                                                ) && (
                                                  <li
                                                    className="dropdown-submenu send"
                                                    style={{
                                                      display:
                                                        projectVisibilityLMS[0] ||
                                                        currentOrganization?.gcr_project_visibility
                                                          ? "block"
                                                          : "none",
                                                    }}
                                                  >
                                                    <a tabIndex="-1">
                                                      <FontAwesomeIcon
                                                        icon="newspaper"
                                                        className="mr-2"
                                                      />
                                                      Publish
                                                    </a>
                                                    <ul className="dropdown-menu check">
                                                      {currentOrganization?.gcr_project_visibility && (
                                                        // eslint-disable-next-line react/jsx-indent
                                                        <li
                                                          onClick={() => {
                                                            setShow(true);
                                                            getProjectId(
                                                              res.id
                                                            );
                                                            setSelectedProjectId(
                                                              res.id
                                                            );
                                                            dispatch(
                                                              googleShare(false)
                                                            );
                                                          }}
                                                        >
                                                          <a>
                                                            Google Classroom
                                                          </a>
                                                        </li>
                                                      )}
                                                      {allLms.shareVendors &&
                                                        allLms.shareVendors.map(
                                                          (data) =>
                                                            data?.project_visibility && (
                                                              <li>
                                                                <a
                                                                  onClick={async () => {
                                                                    const allPlaylist = await dispatch(
                                                                      lmsPlaylist(
                                                                        res.id
                                                                      )
                                                                    );
                                                                    if (
                                                                      allPlaylist
                                                                    ) {
                                                                      dispatch(
                                                                        getProjectCourseFromLMS(
                                                                          data.lms_name.toLowerCase(),
                                                                          data.id,
                                                                          res.id,
                                                                          allPlaylist.playlists,
                                                                          data.lms_url
                                                                        )
                                                                      );
                                                                    }
                                                                  }}
                                                                >
                                                                  {
                                                                    data.site_name
                                                                  }
                                                                </a>
                                                              </li>
                                                            )
                                                        )}
                                                    </ul>
                                                  </li>
                                                )} */}
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          )}
                                        </div>
                                        {permission?.Playlist?.includes('playlist:duplicate') && res.model === 'Playlist' && (
                                          <Dropdown className="playlist-dropdown check">
                                            <Dropdown.Toggle>
                                              <FontAwesomeIcon icon="ellipsis-v" />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                              <Dropdown.Item
                                                onClick={() =>
                                                  window.open(
                                                    res.model === 'Activity'
                                                      ? `/activity/${res.id}/preview`
                                                      : res.model === 'Playlist'
                                                      ? `/playlist/${res.id}/preview/lti`
                                                      : `/project/${res.id}/preview`,
                                                    '_blank',
                                                  )
                                                }
                                              >
                                                {/* <FontAwesomeIcon className="mr-2" icon={faEye} />
                                              Preview */}
                                                <div className="dropDown-item-name-icon">
                                                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                      d="M1.125 6C1.125 6 3.625 1 8 1C12.375 1 14.875 6 14.875 6C14.875 6 12.375 11 8 11C3.625 11 1.125 6 1.125 6Z"
                                                      stroke={primaryColor}
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                    <path
                                                      d="M8 7.875C9.03553 7.875 9.875 7.03553 9.875 6C9.875 4.96447 9.03553 4.125 8 4.125C6.96447 4.125 6.125 4.96447 6.125 6C6.125 7.03553 6.96447 7.875 8 7.875Z"
                                                      stroke={primaryColor}
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                    />
                                                  </svg>
                                                  <span>Preview</span>
                                                </div>
                                              </Dropdown.Item>
                                              <Dropdown.Item
                                                onClick={() => {
                                                  setIndClone(false);
                                                  setModalShow(true);
                                                  setClone(res);
                                                }}
                                              >
                                                {/* <FontAwesomeIcon className="mr-2" icon="clone" />
                                              Add to projects */}
                                                <div className="dropDown-item-name-icon">
                                                  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                      d="M1 3.11108V12.4444C1 12.874 1.34823 13.2222 1.77778 13.2222H14.2222C14.6518 13.2222 15 12.874 15 12.4444V4.18802C15 3.75847 14.6518 3.41024 14.2222 3.41024H8.71795"
                                                      stroke={primaryColor}
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                    />
                                                    <path
                                                      d="M8.71795 3.41032L6.55831 0.891738C6.48543 0.818805 6.3865 0.777832 6.28336 0.777832H1.38889C1.17411 0.777832 1 0.951945 1 1.16672V3.11116"
                                                      stroke={primaryColor}
                                                      strokeWidth="1.5"
                                                      strokeLinecap="round"
                                                    />
                                                  </svg>
                                                  Copy to My projects
                                                </div>
                                              </Dropdown.Item>
                                              {/* {permission?.Playlist?.includes(
                                                "playlist:publish"
                                              ) && (
                                                <ShareLink
                                                  playlistId={res.id}
                                                  projectId={res.project_id}
                                                  setProjectId={setProjectId}
                                                  handleShow={handleShow}
                                                  gcr_playlist_visibility={
                                                    currentOrganization.gcr_playlist_visibility
                                                  }
                                                  setProjectPlaylistId={
                                                    setProjectPlaylistId
                                                  }
                                                />
                                              )} */}
                                            </Dropdown.Menu>
                                          </Dropdown>
                                        )}
                                        {permission?.Activity?.includes('activity:duplicate') && res.model === 'Activity' && (
                                          <Dropdown className="playlist-dropdown check">
                                            <Dropdown.Toggle>
                                              <FontAwesomeIcon icon="ellipsis-v" />
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                              <>
                                                <Dropdown.Item
                                                  onClick={() =>
                                                    window.open(
                                                      res.model === 'Activity'
                                                        ? `/activity/${res.id}/preview`
                                                        : res.model === 'Playlist'
                                                        ? `/playlist/${res.id}/preview/lti`
                                                        : `/project/${res.id}/preview`,
                                                      '_blank',
                                                    )
                                                  }
                                                >
                                                  {/* <FontAwesomeIcon className="mr-2" icon={faEye} />
                                                Preview */}
                                                  <div className="dropDown-item-name-icon">
                                                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path
                                                        d="M1.125 6C1.125 6 3.625 1 8 1C12.375 1 14.875 6 14.875 6C14.875 6 12.375 11 8 11C3.625 11 1.125 6 1.125 6Z"
                                                        stroke={primaryColor}
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                      />
                                                      <path
                                                        d="M8 7.875C9.03553 7.875 9.875 7.03553 9.875 6C9.875 4.96447 9.03553 4.125 8 4.125C6.96447 4.125 6.125 4.96447 6.125 6C6.125 7.03553 6.96447 7.875 8 7.875Z"
                                                        stroke={primaryColor}
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                      />
                                                    </svg>
                                                    <span>Preview</span>
                                                  </div>
                                                </Dropdown.Item>
                                                <Dropdown.Item
                                                  onClick={() => {
                                                    setIndClone(false);
                                                    setModalShow(true);
                                                    setClone(res);
                                                  }}
                                                >
                                                  {/* <FontAwesomeIcon className="mr-2" icon="clone" />
                                                Add to projects */}
                                                  <div className="dropDown-item-name-icon">
                                                    <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                      <path
                                                        d="M1 3.11108V12.4444C1 12.874 1.34823 13.2222 1.77778 13.2222H14.2222C14.6518 13.2222 15 12.874 15 12.4444V4.18802C15 3.75847 14.6518 3.41024 14.2222 3.41024H8.71795"
                                                        stroke={primaryColor}
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                      />
                                                      <path
                                                        d="M8.71795 3.41032L6.55831 0.891738C6.48543 0.818805 6.3865 0.777832 6.28336 0.777832H1.38889C1.17411 0.777832 1 0.951945 1 1.16672V3.11116"
                                                        stroke={primaryColor}
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                      />
                                                    </svg>
                                                    Copy to My projects
                                                  </div>
                                                </Dropdown.Item>
                                                {/* {permission?.Activity?.includes(
                                                  "activity:share"
                                                ) &&
                                                  allLms?.length !== 0 && (
                                                    <li
                                                      className="dropdown-submenu send"
                                                      style={{
                                                        display:
                                                          activityVisibilityLMS.includes(
                                                            true
                                                          ) &&
                                                          safariMontageActivity.includes(
                                                            true
                                                          )
                                                            ? "block"
                                                            : "none",
                                                      }}
                                                    >
                                                      <a
                                                        tabIndex="-1"
                                                        className="dropdown-item"
                                                      >
                                                        <FontAwesomeIcon
                                                          icon="newspaper"
                                                          className="mr-2"
                                                        />
                                                        Publish
                                                      </a>
                                                      <ul className="dropdown-menu check">
                                                        {allLms?.shareVendors.map(
                                                          (data) =>
                                                            data.lms_name !==
                                                            "safarimontage" ? null : (
                                                              <>
                                                                {data?.activity_visibility && (
                                                                  <li>
                                                                    <a
                                                                      onClick={() => {
                                                                        dispatch(
                                                                          loadSafariMontagePublishToolAction(
                                                                            res.project_id,
                                                                            res.playlist_id,
                                                                            res.id,
                                                                            data.id
                                                                          )
                                                                        );
                                                                      }}
                                                                    >
                                                                      {
                                                                        data.site_name
                                                                      }
                                                                    </a>
                                                                  </li>
                                                                )}
                                                              </>
                                                            )
                                                        )}
                                                        <Modal
                                                          dialogClassName="safari-modal"
                                                          show={
                                                            safariMontagePublishTool
                                                          }
                                                          onHide={() =>
                                                            dispatch(
                                                              closeSafariMontageToolAction()
                                                            )
                                                          }
                                                          aria-labelledby="example-modal-sizes-title-lg"
                                                        >
                                                          <Modal.Header
                                                            closeButton
                                                          >
                                                            <Modal.Title id="example-modal-sizes-title-lg">
                                                              Safari Montage
                                                            </Modal.Title>
                                                          </Modal.Header>
                                                          <Modal.Body>
                                                            <iframe
                                                              title="Safari Montage"
                                                              src={`data:text/html;charset=utf-8,${safariMontagePublishTool}`}
                                                            />
                                                          </Modal.Body>
                                                        </Modal>
                                                      </ul>
                                                    </li>
                                                  )} */}
                                              </>
                                            </Dropdown.Menu>
                                          </Dropdown>
                                        )}
                                      </div>
                                    ))
                                  ) : (
                                    <Alert variant="danger">No result found !</Alert>
                                  )
                                ) : (
                                  <Skeleton count="3" />
                                )}
                              </div>
                            </Tab>
                          )}

                          <Tab eventKey="projects" title={!!search && !!meta.projects ? `project (${meta.projects})` : 'project (0)'}>
                            {/* <SubSearchBar pageCounterTitle={'Results per page'} /> */}
                            <div className="results_search">
                              {!!search ? (
                                search?.length > 0 ? (
                                  search.map((res) => (
                                    <>
                                      {res.model === 'Project' && (
                                        <div className="box">
                                          <div className="imgbox">
                                            {res.thumb_url ? (
                                              <div
                                                style={{
                                                  // eslint-disable-next-line max-len
                                                  backgroundImage: res.thumb_url.includes('pexels.com')
                                                    ? `url(${res.thumb_url})`
                                                    : `url(${global.config.resourceUrl}${res.thumb_url})`,
                                                }}
                                              />
                                            ) : (
                                              <div
                                                style={{
                                                  backgroundImage:
                                                    // eslint-disable-next-line max-len
                                                    'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
                                                }}
                                              />
                                            )}

                                            {/* <h5>CALCULUS</h5> */}
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
                                              <p>{res.description}</p>
                                              <ul>
                                                {res.user && (
                                                  <li>
                                                    By: <span>{res?.team_name ? `(T) ${res?.team_name}` : res.user.first_name}</span>
                                                  </li>
                                                )}
                                                <li>
                                                  Type: <span className="type">{res.model}</span>
                                                </li>
                                                {/* <li>
                                                Member Rating{" "}
                                                <span className="type">Project</span>
                                              </li> */}
                                                {permission?.Project?.includes('project:favorite') && (
                                                  <div
                                                    className={`btn-fav ${res.favored}`}
                                                    onClick={(e) => {
                                                      if (e.target.classList.contains(' true')) {
                                                        e.target.classList.remove('true');
                                                      } else {
                                                        e.target.classList.add('true');
                                                      }
                                                      dispatch(addProjectFav(res.id));
                                                    }}
                                                  >
                                                    <FontAwesomeIcon className="mr-2" icon="star" />
                                                    Favorite
                                                  </div>
                                                )}
                                              </ul>
                                              {/* <p>{res.description}</p> */}
                                            </div>
                                            {(permission?.Project?.includes('project:clone') || permission?.Project?.includes('project:publish')) && (
                                              <Dropdown className="playlist-dropdown check">
                                                <Dropdown.Toggle>
                                                  <FontAwesomeIcon icon="ellipsis-v" />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                  {permission?.Project?.includes('project:clone') && (
                                                    <>
                                                      <Dropdown.Item
                                                        onClick={() =>
                                                          window.open(
                                                            res.model === 'Activity'
                                                              ? `/activity/${res.id}/preview`
                                                              : res.model === 'Playlist'
                                                              ? `/playlist/${res.id}/preview/lti`
                                                              : `/project/${res.id}/preview`,
                                                            '_blank',
                                                          )
                                                        }
                                                      >
                                                        {/* <FontAwesomeIcon className="mr-2" icon={faEye} /> */}
                                                        <div className="dropDown-item-name-icon">
                                                          <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                              d="M1.125 6C1.125 6 3.625 1 8 1C12.375 1 14.875 6 14.875 6C14.875 6 12.375 11 8 11C3.625 11 1.125 6 1.125 6Z"
                                                              stroke={primaryColor}
                                                              strokeWidth="1.5"
                                                              strokeLinecap="round"
                                                              strokeLinejoin="round"
                                                            />
                                                            <path
                                                              d="M8 7.875C9.03553 7.875 9.875 7.03553 9.875 6C9.875 4.96447 9.03553 4.125 8 4.125C6.96447 4.125 6.125 4.96447 6.125 6C6.125 7.03553 6.96447 7.875 8 7.875Z"
                                                              stroke={primaryColor}
                                                              strokeWidth="1.5"
                                                              strokeLinecap="round"
                                                              strokeLinejoin="round"
                                                            />
                                                          </svg>
                                                          <span>Preview</span>
                                                        </div>
                                                      </Dropdown.Item>
                                                      <Dropdown.Item
                                                        onClick={() => {
                                                          Swal.fire({
                                                            html: `You have selected <strong>${res.title}</strong> ${res.model}<br>Do you want to continue ?`,
                                                            showCancelButton: true,
                                                            confirmButtonColor: '#3085d6',
                                                            cancelButtonColor: '#d33',
                                                            confirmButtonText: 'Ok',
                                                          }).then((result) => {
                                                            if (result.value) {
                                                              cloneProject(res.id);
                                                            }
                                                          });
                                                        }}
                                                      >
                                                        {/* <FontAwesomeIcon className="mr-2" icon="clone" /> */}
                                                        <div className="dropDown-item-name-icon">
                                                          <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path
                                                              d="M1 3.11108V12.4444C1 12.874 1.34823 13.2222 1.77778 13.2222H14.2222C14.6518 13.2222 15 12.874 15 12.4444V4.18802C15 3.75847 14.6518 3.41024 14.2222 3.41024H8.71795"
                                                              stroke={primaryColor}
                                                              strokeWidth="1.5"
                                                              strokeLinecap="round"
                                                            />
                                                            <path
                                                              d="M8.71795 3.41032L6.55831 0.891738C6.48543 0.818805 6.3865 0.777832 6.28336 0.777832H1.38889C1.17411 0.777832 1 0.951945 1 1.16672V3.11116"
                                                              stroke={primaryColor}
                                                              strokeWidth="1.5"
                                                              strokeLinecap="round"
                                                            />
                                                          </svg>
                                                          Copy to My projects
                                                        </div>
                                                      </Dropdown.Item>
                                                    </>
                                                  )}
                                                  <Dropdown.Item>
                                                    <div className="dropDown-item-name-icon">
                                                      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path
                                                          d="M5.11676 8.35535C7.1477 8.35535 8.79406 6.70899 8.79406 4.67804C8.79406 2.64712 7.1477 1.00073 5.11676 1.00073C3.08584 1.00073 1.43945 2.64712 1.43945 4.67804C1.43945 6.70899 3.08584 8.35535 5.11676 8.35535Z"
                                                          stroke="#2E68BF"
                                                          strokeWidth="1.5"
                                                          stroke-miterlimit="10"
                                                        />
                                                        <path
                                                          d="M9.88477 1.13782C10.3905 0.995317 10.921 0.962853 11.4404 1.04262C11.9598 1.12238 12.4561 1.31252 12.8957 1.60023C13.3355 1.88794 13.7084 2.26653 13.9895 2.71052C14.2705 3.1545 14.4532 3.65356 14.5252 4.17409C14.5972 4.69462 14.5568 5.22452 14.4067 5.72812C14.2566 6.23173 14.0003 6.69732 13.6552 7.09347C13.31 7.48969 12.8839 7.80733 12.4056 8.02506C11.9274 8.24272 11.408 8.35537 10.8825 8.35546"
                                                          stroke={primaryColor}
                                                          strokeWidth="1.5"
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                        />
                                                        <path
                                                          d="M0.0253906 11.0001C0.599713 10.1831 1.36216 9.51641 2.24837 9.05608C3.13457 8.59584 4.11851 8.35547 5.11712 8.35547C6.11572 8.35547 7.09968 8.59567 7.98592 9.05592C8.87217 9.51608 9.63467 10.1828 10.209 10.9997"
                                                          stroke={primaryColor}
                                                          strokeWidth="1.5"
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                        />
                                                        <path
                                                          d="M10.8828 8.35547C11.8815 8.35473 12.8657 8.59469 13.752 9.05493C14.6383 9.51526 15.4007 10.1823 15.9745 10.9997"
                                                          stroke={primaryColor}
                                                          strokeWidth="1.5"
                                                          strokeLinecap="round"
                                                          strokeLinejoin="round"
                                                        />
                                                      </svg>
                                                      Copy to My teams
                                                    </div>
                                                  </Dropdown.Item>
                                                  {/* {permission?.Project?.includes(
                                                  "project:publish"
                                                ) && (
                                                  <li
                                                    className="dropdown-submenu send"
                                                    style={{
                                                      display:
                                                        projectVisibilityLMS[0] ||
                                                        currentOrganization?.gcr_project_visibility
                                                          ? "block"
                                                          : "none",
                                                    }}
                                                  >
                                                    <a tabIndex="-1">
                                                      <FontAwesomeIcon
                                                        icon="newspaper"
                                                        className="mr-2"
                                                      />
                                                      Publish
                                                    </a>
                                                    <ul className="dropdown-menu check">
                                                      {currentOrganization.gcr_project_visibility && (
                                                        <li
                                                          onClick={() => {
                                                            setShow(true);
                                                            getProjectId(
                                                              res.id
                                                            );
                                                            setSelectedProjectId(
                                                              res.id
                                                            );
                                                            dispatch(
                                                              googleShare(false)
                                                            );
                                                          }}
                                                        >
                                                          <a>
                                                            Google Classroom
                                                          </a>
                                                        </li>
                                                      )}
                                                      {allLms.shareVendors &&
                                                        allLms.shareVendors.map(
                                                          (data) =>
                                                            data.project_visibility && (
                                                              <li>
                                                                <a
                                                                  onClick={async () => {
                                                                    const allPlaylist = await dispatch(
                                                                      lmsPlaylist(
                                                                        res.id
                                                                      )
                                                                    );
                                                                    if (
                                                                      allPlaylist
                                                                    ) {
                                                                      dispatch(
                                                                        getProjectCourseFromLMS(
                                                                          data.lms_name.toLowerCase(),
                                                                          data.id,
                                                                          res.id,
                                                                          allPlaylist.playlists,
                                                                          data.lms_url
                                                                        )
                                                                      );
                                                                    }
                                                                  }}
                                                                >
                                                                  {
                                                                    data.site_name
                                                                  }
                                                                </a>
                                                              </li>
                                                            )
                                                        )}
                                                    </ul>
                                                  </li>
                                                )} */}
                                                  {fromTeam && (
                                                    <Dropdown.Item
                                                      onClick={() => {
                                                        if (selectProject?.length === 0 && fromTeam) {
                                                          setSelectProject([res.id]);
                                                        } else if (selectProject[0] === res.id && fromTeam) {
                                                          setSelectProject([]);
                                                        } else {
                                                          Swal.fire({
                                                            icon: 'warning',
                                                            title: 'Action Prohibited',
                                                            text: 'You are only allowed to select 1 project.',
                                                          });
                                                        }
                                                      }}
                                                    >
                                                      <img src={teamicon} alt="teams_logo" className="teams-logo" />
                                                      {selectProject.includes(res.id) ? 'Remove from ' : 'Add to '}
                                                      team
                                                    </Dropdown.Item>
                                                  )}
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </>
                                  ))
                                ) : (
                                  <Alert variant="danger">No result found !</Alert>
                                )
                              ) : (
                                <Skeleton count="3" />
                              )}
                            </div>
                          </Tab>

                          {!fromTeam && (
                            <Tab eventKey="playlists" title={!!search && !!meta.playlists ? `playlist (${meta.playlists})` : 'playlist (0)'}>
                              {/* <SubSearchBar pageCounterTitle={'Results per page'} /> */}
                              <div className="results_search">
                                {!!search ? (
                                  search?.length > 0 ? (
                                    search.map((res) => (
                                      <>
                                        {res.model === 'Playlist' && (
                                          <div className="box">
                                            <div className="imgbox">
                                              {res.thumb_url ? (
                                                <div
                                                  style={{
                                                    // eslint-disable-next-line max-len
                                                    backgroundImage: res.thumb_url.includes('pexels.com')
                                                      ? `url(${res.thumb_url})`
                                                      : `url(${global.config.resourceUrl}${res.thumb_url})`,
                                                  }}
                                                />
                                              ) : (
                                                <div
                                                  style={{
                                                    backgroundImage:
                                                      // eslint-disable-next-line max-len
                                                      'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
                                                  }}
                                                />
                                              )}

                                              {/* <h5>CALCULUS</h5> */}
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
                                                <p>{res.description}</p>
                                                <ul>
                                                  {res.user && (
                                                    <li>
                                                      By: <span>{res.user.first_name}</span>
                                                    </li>
                                                  )}
                                                  <li>
                                                    Type: <span className="type">{res.model}</span>
                                                  </li>
                                                  {/* <li>
                                                Member Rating{" "}
                                                <span className="type">Project</span>
                                              </li> */}
                                                </ul>
                                                {/* <p>{res.description}</p> */}
                                              </div>
                                              {permission?.Playlist?.includes('playlist:duplicate') && (
                                                <Dropdown className="playlist-dropdown check">
                                                  <Dropdown.Toggle>
                                                    <FontAwesomeIcon icon="ellipsis-v" />
                                                  </Dropdown.Toggle>

                                                  <Dropdown.Menu>
                                                    <Dropdown.Item
                                                      onClick={() =>
                                                        window.open(
                                                          res.model === 'Activity'
                                                            ? `/activity/${res.id}/preview`
                                                            : res.model === 'Playlist'
                                                            ? `/playlist/${res.id}/preview/lti`
                                                            : `/project/${res.id}/preview`,
                                                          '_blank',
                                                        )
                                                      }
                                                    >
                                                      <div className="dropDown-item-name-icon">
                                                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                          <path
                                                            d="M1.125 6C1.125 6 3.625 1 8 1C12.375 1 14.875 6 14.875 6C14.875 6 12.375 11 8 11C3.625 11 1.125 6 1.125 6Z"
                                                            stroke={primaryColor}
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                          />
                                                          <path
                                                            d="M8 7.875C9.03553 7.875 9.875 7.03553 9.875 6C9.875 4.96447 9.03553 4.125 8 4.125C6.96447 4.125 6.125 4.96447 6.125 6C6.125 7.03553 6.96447 7.875 8 7.875Z"
                                                            stroke={primaryColor}
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                          />
                                                        </svg>
                                                        <span>Preview</span>
                                                      </div>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      onClick={() => {
                                                        setIndClone(false);
                                                        setModalShow(true);
                                                        setClone(res);
                                                      }}
                                                    >
                                                      {/* <FontAwesomeIcon className="mr-2" icon="clone" />
                                                    Add to projects */}
                                                      <div className="dropDown-item-name-icon">
                                                        <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                          <path
                                                            d="M1 3.11108V12.4444C1 12.874 1.34823 13.2222 1.77778 13.2222H14.2222C14.6518 13.2222 15 12.874 15 12.4444V4.18802C15 3.75847 14.6518 3.41024 14.2222 3.41024H8.71795"
                                                            stroke={primaryColor}
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                          />
                                                          <path
                                                            d="M8.71795 3.41032L6.55831 0.891738C6.48543 0.818805 6.3865 0.777832 6.28336 0.777832H1.38889C1.17411 0.777832 1 0.951945 1 1.16672V3.11116"
                                                            stroke={primaryColor}
                                                            strokeWidth="1.5"
                                                            strokeLinecap="round"
                                                          />
                                                        </svg>
                                                        Copy to My projects
                                                      </div>
                                                    </Dropdown.Item>
                                                    {/* {permission?.Playlist?.includes(
                                                    "playlist:publish"
                                                  ) && (
                                                    <ShareLink
                                                      playlistId={res.id}
                                                      projectId={res.project_id}
                                                      setProjectId={
                                                        setSelectedProjectId
                                                      }
                                                      handleShow={handleShow}
                                                      gcr_playlist_visibility={
                                                        currentOrganization.gcr_playlist_visibility
                                                      }
                                                      setProjectPlaylistId={
                                                        setSelectedProjectPlaylistId
                                                      }
                                                    />
                                                  )} */}
                                                  </Dropdown.Menu>
                                                </Dropdown>
                                              )}
                                            </div>
                                          </div>
                                        )}
                                      </>
                                    ))
                                  ) : (
                                    <Alert variant="danger">No result found !</Alert>
                                  )
                                ) : (
                                  <Skeleton count="3" />
                                )}
                              </div>
                            </Tab>
                          )}

                          {!fromTeam && (
                            <Tab eventKey="activities" title={!!search && !!meta.activities ? `activity (${meta.activities})` : 'activity (0)'}>
                              {/* <SubSearchBar pageCounterTitle={'Results per page'} /> */}
                              <div className="content">
                                <div className="results_search">
                                  {!!search ? (
                                    search?.length > 0 ? (
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
                                                      backgroundImage:
                                                        // eslint-disable-next-line max-len
                                                        'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280',
                                                    }}
                                                  />
                                                )}

                                                {/* <h5>CALCULUS</h5> */}
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
                                                  <p>{res.description}</p>
                                                  <ul>
                                                    {res.user && (
                                                      <li>
                                                        By: <span>{res.user.first_name}</span>
                                                      </li>
                                                    )}
                                                    <li>
                                                      Type: <span className="type">{res.model}</span>
                                                    </li>
                                                    {/* <li>
                                                  Member Rating{" "}
                                                  <span className="type">Project</span>
                                                </li> */}
                                                  </ul>
                                                  {/* <p>{res.description}</p> */}
                                                </div>
                                                {showBackOption ? (
                                                  <>
                                                    {permission?.Activity?.includes('activity:duplicate') && res.model === 'Activity' && (
                                                      <Buttons
                                                        text="Add"
                                                        primary
                                                        width="56px"
                                                        height="36px"
                                                        onClick={() => {
                                                          dispatch(addActivityPlaylistSearch(21, playlistIdForSearchingTab));
                                                        }}
                                                        hover
                                                      />
                                                    )}
                                                  </>
                                                ) : (
                                                  <>
                                                    {permission?.Activity?.includes('activity:duplicate') && res.model === 'Activity' && (
                                                      <Dropdown className="playlist-dropdown check">
                                                        <Dropdown.Toggle>
                                                          <FontAwesomeIcon icon="ellipsis-v" />
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                          <>
                                                            <Dropdown.Item
                                                              onClick={() =>
                                                                window.open(
                                                                  res.model === 'Activity'
                                                                    ? `/activity/${res.id}/preview`
                                                                    : res.model === 'Playlist'
                                                                    ? `/playlist/${res.id}/preview/lti`
                                                                    : `/project/${res.id}/preview`,
                                                                  '_blank',
                                                                )
                                                              }
                                                            >
                                                              <div className="dropDown-item-name-icon">
                                                                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                  <path
                                                                    d="M1.125 6C1.125 6 3.625 1 8 1C12.375 1 14.875 6 14.875 6C14.875 6 12.375 11 8 11C3.625 11 1.125 6 1.125 6Z"
                                                                    stroke={primaryColor}
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                  />
                                                                  <path
                                                                    d="M8 7.875C9.03553 7.875 9.875 7.03553 9.875 6C9.875 4.96447 9.03553 4.125 8 4.125C6.96447 4.125 6.125 4.96447 6.125 6C6.125 7.03553 6.96447 7.875 8 7.875Z"
                                                                    stroke={primaryColor}
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                  />
                                                                </svg>
                                                                <span>Preview</span>
                                                              </div>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item>
                                                              <div className="dropDown-item-name-icon">
                                                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                  <path
                                                                    d="M13.6 1H2.4C1.6268 1 1 1.6268 1 2.4V5.2C1 5.9732 1.6268 6.6 2.4 6.6H13.6C14.3732 6.6 15 5.9732 15 5.2V2.4C15 1.6268 14.3732 1 13.6 1Z"
                                                                    stroke={primaryColor}
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                  />
                                                                  <path
                                                                    d="M13.6 9.40015H2.4C1.6268 9.40015 1 10.0269 1 10.8001V13.6001C1 14.3733 1.6268 15.0001 2.4 15.0001H13.6C14.3732 15.0001 15 14.3733 15 13.6001V10.8001C15 10.0269 14.3732 9.40015 13.6 9.40015Z"
                                                                    stroke={primaryColor}
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                  />
                                                                  <path
                                                                    d="M3.7998 3.7998H3.80925"
                                                                    stroke={primaryColor}
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                  />
                                                                  <path
                                                                    d="M3.7998 12.1997H3.80925"
                                                                    stroke={primaryColor}
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                  />
                                                                </svg>
                                                                <span>Copy to My Activities</span>
                                                              </div>
                                                            </Dropdown.Item>
                                                            <Dropdown.Item
                                                              onClick={() => {
                                                                setIndClone(false);
                                                                setModalShow(true);
                                                                setClone(res);
                                                              }}
                                                            >
                                                              <div className="dropDown-item-name-icon">
                                                                <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                  <path
                                                                    d="M1 3.11108V12.4444C1 12.874 1.34823 13.2222 1.77778 13.2222H14.2222C14.6518 13.2222 15 12.874 15 12.4444V4.18802C15 3.75847 14.6518 3.41024 14.2222 3.41024H8.71795"
                                                                    stroke={primaryColor}
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                  />
                                                                  <path
                                                                    d="M8.71795 3.41032L6.55831 0.891738C6.48543 0.818805 6.3865 0.777832 6.28336 0.777832H1.38889C1.17411 0.777832 1 0.951945 1 1.16672V3.11116"
                                                                    stroke={primaryColor}
                                                                    strokeWidth="1.5"
                                                                    strokeLinecap="round"
                                                                  />
                                                                </svg>
                                                                Copy to My projects
                                                              </div>
                                                            </Dropdown.Item>
                                                            {/* {permission?.Activity?.includes(
                                                              "activity:share"
                                                            ) &&
                                                              allLms?.length !==
                                                                0 && (
                                                                <li
                                                                  className="dropdown-submenu send"
                                                                  style={{
                                                                    display:
                                                                      activityVisibilityLMS.includes(
                                                                        true
                                                                      ) &&
                                                                      safariMontageActivity.includes(
                                                                        true
                                                                      )
                                                                        ? "block"
                                                                        : "none",
                                                                  }}
                                                                >
                                                                  <a
                                                                    tabIndex="-1"
                                                                    className="dropdown-item"
                                                                  >
                                                                    <FontAwesomeIcon
                                                                      icon="newspaper"
                                                                      className="mr-2"
                                                                    />
                                                                    Publish
                                                                  </a>
                                                                  <ul className="dropdown-menu check">
                                                                    {allLms?.shareVendors.map(
                                                                      (
                                                                        data
                                                                      ) => {
                                                                        if (
                                                                          data.lms_name !==
                                                                          "safarimontage"
                                                                        )
                                                                          return false;
                                                                        return (
                                                                          data?.activity_visibility && (
                                                                            <li>
                                                                              <a
                                                                                onClick={() => {
                                                                                  dispatch(
                                                                                    loadSafariMontagePublishToolAction(
                                                                                      res.project_id,
                                                                                      res.playlist_id,
                                                                                      res.id,
                                                                                      data.id
                                                                                    )
                                                                                  );
                                                                                }}
                                                                              >
                                                                                {
                                                                                  data.site_name
                                                                                }
                                                                              </a>
                                                                            </li>
                                                                          )
                                                                        );
                                                                      }
                                                                    )}
                                                                    <Modal
                                                                      dialogClassName="safari-modal"
                                                                      show={
                                                                        safariMontagePublishTool
                                                                      }
                                                                      onHide={() =>
                                                                        dispatch(
                                                                          closeSafariMontageToolAction()
                                                                        )
                                                                      }
                                                                      aria-labelledby="example-modal-sizes-title-lg"
                                                                    >
                                                                      <Modal.Header
                                                                        closeButton
                                                                      >
                                                                        <Modal.Title id="example-modal-sizes-title-lg">
                                                                          Safari
                                                                          Montage
                                                                        </Modal.Title>
                                                                      </Modal.Header>
                                                                      <Modal.Body>
                                                                        <iframe
                                                                          title="Safari Montage"
                                                                          src={`data:text/html;charset=utf-8,${safariMontagePublishTool}`}
                                                                        />
                                                                      </Modal.Body>
                                                                    </Modal>
                                                                  </ul>
                                                                </li>
                                                              )} */}
                                                          </>
                                                        </Dropdown.Menu>
                                                      </Dropdown>
                                                    )}
                                                  </>
                                                )}
                                              </div>
                                            </div>
                                          )}
                                        </>
                                      ))
                                    ) : (
                                      <Alert variant="danger">No result found !</Alert>
                                    )
                                  ) : (
                                    <Skeleton count="3" />
                                  )}
                                </div>
                              </div>
                            </Tab>
                          )}
                        </Tabs>
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
                      if (allState.searchType === 'Projects') {
                        if (activeModel === 'total') {
                          const searchData = {
                            phrase: searchQueries?.trim(),
                            from: e * 20 - 20,
                            size: 20,
                            type: searchType,
                            subjectArray: activeSubject || undefined,
                            gradeArray: activeEducation || undefined,
                            authorTagsArray: activeAuthorTag || undefined,
                            standardArray: activeType || undefined,
                            author: authorName || undefined,
                            no_words: noWords || undefined,
                          };
                          setSearch(null);
                          await dispatch(simpleSearchAction(searchData));
                          Swal.close();
                        } else {
                          const searchData = {
                            phrase: searchQueries?.trim(),
                            from: e * 20 - 20,
                            size: 20,
                            type: searchType,
                            model: activeModel,
                            subjectArray: activeSubject || undefined,
                            gradeArray: activeEducation || undefined,
                            authorTagsArray: activeAuthorTag || undefined,
                            standardArray: activeType || undefined,
                            author: authorName || undefined,
                            no_words: noWords || undefined,
                          };
                          setSearch(null);
                          await dispatch(simpleSearchAction(searchData));
                          Swal.close();
                        }
                      } else if (allState.searchType === 'Independent Activities') {
                        const searchData = {
                          query: searchInput?.trim(),
                          subjectArray: activeSubject,
                          gradeArray: activeEducation,
                          authorTagsArray: activeAuthorTag,
                          authors: authorName || undefined,
                          standardArray: activeType,
                          from: e * 20 - 20,
                          size: 20,
                          no_words: noWords || undefined,
                        };

                        setSearch(null);
                        await dispatch(searchIndependentActivitiesAction(searchData, 'showcase_activities'));
                      }
                    }}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                )}
              </div>
            ) : (
              <Alert variant="danger">You are not authorized to view this page!</Alert>
            )}
          </div>
        </div>
        <GoogleModel
          projectId={selectedProjectId}
          playlistId={selectedProjectPlaylistId}
          activityId={0}
          show={show} // {props.show}
          onHide={() => {
            setShow(false);
          }}
        />
      </div>
      <MyVerticallyCenteredModalForActivity
        show={modalShowActivity}
        onHide={() => setModalShowActivity(false)}
        activity={currentActivity}
        showvideoH5p
        activeType="demo"
        // activities={activities}
      />

      <Footer />
    </>
  );
}

SearchInterface.propTypes = {
  history: PropTypes.object.isRequired,
  fromTeam: PropTypes.bool,
  selectProject: PropTypes.func.isRequired,
  setSelectProject: PropTypes.func.isRequired,
  showBackOption: PropTypes.bool,
  playlistIdForSearchingTab: PropTypes.string,
  setReloadPlaylist: PropTypes.func.isRequired,
  setSelectSearchModule: PropTypes.func.isRequired,
  reloadPlaylist: PropTypes.bool,
};

SearchInterface.defaultProps = {
  fromTeam: false,
  showBackOption: false,
  playlistIdForSearchingTab: '',
  reloadPlaylist: false,
};

export default SearchInterface;
