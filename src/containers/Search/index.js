/* eslint-disable */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-unused-vars */
/* eslint-disable object-curly-newline */
import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import {
  Tabs,
  Tab,
  Modal,
  Alert,
  Dropdown,
  Accordion,
  Card,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import Pagination from "react-js-pagination";
import QueryString from "query-string";
import {
  simpleSearchAction,
  cloneProject,
  setSearchTypeAction,
  searchIndependentActivitiesAction,
  simpleSearchProjectPreview,
} from "store/actions/search";
import { loadResourceTypesAction } from "store/actions/resource";
import { addProjectFav, loadLmsAction } from "store/actions/project";
import Skeleton from "react-loading-skeleton";

import GoogleModel from "components/models/GoogleLoginModal";
import {
  getSubjects,
  getEducationLevel,
  getAuthorTag,
} from "store/actions/admin";
import { addActivityPlaylistSearch } from "store/actions/playlist";
import SubSearchBar from "utils/SubSearchBar/subsearchbar";
import teamicon from "assets/images/sidebar/users-team.svg";
import Footer from "components/Footer";
import {
  faArrowLeft,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import SearchLibrary from "components/Search/SearchLibrary";
import RefineSearch from "components/Search/RefineSearch";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import Buttons from "utils/Buttons/buttons";

import { toast } from "react-toastify";
import intActivityServices from "services/indActivities.service";
import MyVerticallyCenteredModalForActivity from "components/models/videoH5pmodal";
import CloneModel from "./CloneModel";
import "./style.scss";
import "react-loading-skeleton/dist/skeleton.css";
import PreviewSmSvg from "iconLibrary/dropDown/PreviewSmSvg";
import MyProjectSmSvg from "iconLibrary/dropDown/MyProjectSmSvg";
import MyActivitySmSvg from "iconLibrary/mainContainer/MyActivitySmSvg";
import SearchLibraryLgSvg from "iconLibrary/mainContainer/SearchLibraryLgSvg";
import MyActivitySvg from "iconLibrary/sideBar/MyActivitySvg";
import url from "socket.io-client/lib/url";

export function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* Duplicate <b>{clone ? clone.title : ""}</b> {clone ? clone.model : ""}{" "} */}
          <h5>Move To Project</h5>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div>
          <CloneModel clone={props} searchView={props.searchView} />
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
  const {
    history,
    fromTeam,
    selectProject,
    setSelectProject,
    showBackOption,
    setSelectSearchModule,
    playlistIdForSearchingTab,
    setReloadPlaylist,
    reloadPlaylist,
  } = props;
  const primaryColor = getGlobalColor("--main-primary-color");
  const [currentActivity, setCurrentActivity] = useState(null);
  const [toggleStates, setToggleStates] = useState({
    searchLibrary: true,
    subject: true,
    education: false,
    authorTag: false,
    type: false,
  });
  const allState = useSelector((state) => state.search);
  const activityTypesState = useSelector(
    (state) => state.resource.types,
  );
  const { currentOrganization, permission } = useSelector(
    (state) => state.organization,
  );

  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [
    selectedProjectPlaylistId,
    setSelectedProjectPlaylistId,
  ] = useState(0);
  const [activityTypes, setActivityTypes] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowActivity, setModalShowActivity] = useState(false);
  const [search, setSearch] = useState(null);
  const [searchQueries, SetSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [meta, setMeta] = useState({});
  const [clone, setClone] = useState();
  const [activePage, setActivePage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [activeModel, setActiveModel] = useState(
    fromTeam ? "projects" : "Independent activities",
  );
  const [activeType, setActiveType] = useState([]);
  const [activeSubject, setActiveSubject] = useState([]);
  const [activeEducation, setActiveEducation] = useState([]);
  const [activeAuthorTag, setActiveAuthorTag] = useState([]);
  const [searchType, setSearchType] = useState("showcase_projects");
  const [authorName, SetAuthor] = useState("");
  const [noWords, setNoWords] = useState("");
  const [activetab, setActiveTab] = useState(
    fromTeam ? "projects" : "Independent activities",
  );
  const [todate, Settodate] = useState(undefined);
  const [fromdate, Setfromdate] = useState(undefined);
  const [subjects, setSubjects] = useState([]);
  const [authorTags, setAuthorTags] = useState([]);
  const [educationLevels, setEducationLevels] = useState([]);
  const [indClone, setIndClone] = useState(false);
  const [isLoader, setisLoader] = useState(false);
  const [projectTogglestate, setprojectTogglestate] = useState(null);
  const [playlistTogglestate, setplaylistTogglestate] = useState(
    null,
  );
  const [playlistdata, setplaylistdata] = useState(null);
  const hideShowSideBar = useSelector(
    (state) => state.msTeams.toggle_sidebar,
  );
  const isMsTeam = useSelector((state) => state.msTeams.is_msteam);

  useEffect(() => {
    if (currentOrganization) {
      const searchData = {
        standardArray: activeType,
        from: 0,
        size: 20,
      };
    }
  }, [currentOrganization]);

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
      setActiveType(query.h5p.split(","));
    }
    if (query.grade) {
      setActiveSubject(query?.grade?.split(",").map(Number));
    }
    if (query.education) {
      setActiveEducation(query?.education?.split(",").map(Number));
    }
    if (query.authorTag) {
      setActiveAuthorTag(query?.authorTag?.split(",").map(Number));
    }
    if (query.author) {
      SetAuthor(query.author);
    }
    if (query.fromDate && query.fromDate !== "undefined") {
      Setfromdate(query.fromDate);
    } else {
      Setfromdate(undefined);
    }
    if (query.toDate && query.fromDate !== "undefined") {
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
    localStorage.setItem("refreshPage", "true");
  };

  useEffect(() => {
    if (allState?.searchResult) {
      if (allState.searchResult?.length > 0) {
        setSearch(allState.searchResult);
        SetSearchQuery(allState.searchQuery);
        setSearchInput(allState.searchQuery);
        setMeta(allState.searchMeta);
        localStorage.setItem("loading", "false");
        Swal.close();
      } else if (allState.searchMeta.total === 0) {
        setSearch([]);
        SetSearchQuery(allState.searchQuery);
        setSearchInput(allState.searchQuery);
        setMeta({});
        localStorage.setItem("loading", "false");
        Swal.close();
      } else if (
        allState.searchResult?.length === 0 &&
        allState.searchMeta.total > 0
      ) {
        setSearch([]);
      }
    }
  }, [
    allState.searchMeta,
    allState.searchQuery,
    allState?.searchResult,
  ]);

  useEffect(() => {
    console.log("activeModel", activeModel);
    if (allState.searchResult) {
      if (allState.searchResult?.length > 0) {
        if (activeModel == "Independent activities") {
          setTotalCount(allState.searchMeta.total);
        } else {
          setTotalCount(allState?.searchMeta?.projects);
          // setActivePage(1);
        }
      }
    }
  }, [allState.searchMeta, allState.searchResult, activeModel]);

  useEffect(() => {
    if (localStorage.getItem("loading") === "true") {
      Swal.fire({
        html: "Searching...", // add html attribute if you want or remove
        allowOutsideClick: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
    }
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
    activityTypesState?.data?.map((data) =>
      data.activityItems.map((itm) => allItems.push(itm)),
    );
    setActivityTypes(allItems.sort(compare));
  }, [activityTypesState]);

  useEffect(() => {
    if (currentOrganization?.id) {
      if (subjects?.length === 0) {
        const resultSub = dispatch(
          getSubjects(currentOrganization?.id || 1),
        );
        resultSub.then((data) => setSubjects(data));
      }
      if (authorTags?.length === 0) {
        const resultAuth = dispatch(
          getAuthorTag(currentOrganization?.id || 1),
        );
        resultAuth.then((data) => setAuthorTags(data));
      }
      if (educationLevels?.length === 0) {
        const resultEdu = dispatch(
          getEducationLevel(currentOrganization?.id || 1),
        );
        resultEdu.then((data) => setEducationLevels(data));
      }
    }
  }, [
    authorTags?.length,
    currentOrganization?.id,
    dispatch,
    educationLevels?.length,
    subjects?.length,
  ]);
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 500,
    slidesToShow: 5.5,
    slidesToScroll: 1,
  };
  return (
    <>
      <div>
        <div
          className={`${!fromTeam && "search-wrapper"} ${
            hideShowSideBar == true ? "expend-content-menu" : ""
          }`}
          style={{ marginLeft: isMsTeam ? "223px" : "136px" }}
        >
          <MyVerticallyCenteredModal
            ind={indClone}
            searchView={true}
            show={modalShow}
            onHide={() => setModalShow(false)}
            className="clone-lti"
            clone={clone}
          />

          <div className="content-search">
            {true ? (
              <div className="search-result-main">
                {!fromTeam && (
                  <div className="current-org-search">
                    {currentOrganization?.name}
                  </div>
                )}
                {!fromTeam && (
                  <div className="search-top-header">
                    <div className="exp-lib-cnt">
                      <SearchLibraryLgSvg
                        primaryColor={primaryColor}
                      />
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
                          <FontAwesomeIcon
                            icon={faArrowLeft}
                            color={primaryColor}
                            className="mr-12"
                          />
                          <span> Back to Playlist</span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                <div className="main-tabs">
                  <div className="main-content-search">
                    <div className="left-search">
                      <div className="search-library">
                        <SearchLibrary
                          currentOrganization={currentOrganization}
                          simpleSearchAction={simpleSearchAction}
                          searchIndependentActivitiesAction={
                            searchIndependentActivitiesAction
                          }
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
                          setActiveType={setActiveType}
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
                          setisLoader={setisLoader}
                          activeModel={activeModel}
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

                    <div
                      className="right-search"
                      id="right-search-branding-style"
                    >
                      <Tabs
                        className="main-tabs"
                        onSelect={async (eventKey) => {
                          setisLoader(true);
                          if (eventKey === "Independent activities") {
                            setActiveModel("Independent activities");
                            const searchData = {
                              query: searchInput?.trim(),
                              subjectArray: activeSubject,
                              gradeArray: activeEducation,
                              authorTagsArray: activeAuthorTag,
                              authors: authorName || undefined,
                              standardArray: activeType,
                              from: 0,
                              size: 20,
                              no_words: noWords || undefined,
                            };

                            setSearch(null);
                            await dispatch(
                              searchIndependentActivitiesAction(
                                searchData,
                                "showcase_activities",
                              ),
                            );
                          } else {
                            setActiveModel("");
                            // if (allState.searchType === "Projects") {
                            // if (activeModel === "projects") {
                            //   {
                            const searchData = {
                              phrase: searchQueries?.trim(),
                              from: 0,
                              size: 20,
                              type: searchType,
                              model: eventKey,
                              subjectArray:
                                activeSubject || undefined,
                              gradeArray:
                                activeEducation || undefined,
                              authorTagsArray:
                                activeAuthorTag || undefined,
                              standardArray: activeType || undefined,
                              author: authorName || undefined,
                              no_words: noWords || undefined,
                            };
                            setSearch(null);
                            await dispatch(
                              simpleSearchAction(searchData),
                            );
                            Swal.close();
                            // }
                            // }
                          }
                          dispatch(setSearchTypeAction(eventKey));
                          // setSearchInput("");

                          // setNoWords("");
                          setSearchType("");
                          // setSearch(null);
                          // setTotalCount(0);
                          setActivePage(1);
                          // setMeta({});
                          setToggleStates({
                            searchLibrary: true,
                            subject: true,
                            education: false,
                            authorTag: false,
                            type: false,
                          });
                          // setActiveSubject([]);
                          // setActiveEducation([]);
                          // setActiveAuthorTag([]);
                          // SetAuthor([]);
                          Settodate([]);
                          Setfromdate([]);
                          setisLoader(false);
                          // setActiveType([]);
                        }}
                        defaultActiveKey={
                          !fromTeam ? allState.searchType : "Projects"
                        }
                      >
                        {!fromTeam && (
                          <Tab
                            eventKey="Independent activities"
                            title={
                              !!search &&
                              !!meta.total &&
                              activeModel === "Independent activities"
                                ? `Activities (${meta.total})`
                                : "Activities (0)"
                            }
                          >
                            <div className="content">
                              <div className="results_search">
                                {!!search ? (
                                  search?.length > 0 ? (
                                    search.map((res) => (
                                      <>
                                        <div className="box">
                                          <div className="imgbox">
                                            {res?.thumb_url ? (
                                              <div
                                                style={{
                                                  backgroundImage: !res.thumb_url.includes(
                                                    "/storage/",
                                                  )
                                                    ? `url(${res.thumb_url})`
                                                    : `url(${global.config.resourceUrl}${res.thumb_url})`,
                                                }}
                                              />
                                            ) : (
                                              <div
                                                style={{
                                                  backgroundImage:
                                                    // eslint-disable-next-line max-len
                                                    "https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280",
                                                }}
                                              />
                                            )}

                                            {/* <h5>CALCULUS</h5> */}
                                          </div>

                                          <div className="contentbox">
                                            <div className="search-content">
                                              <a
                                                href={`/activity/${res?.id}/preview?type=ind-search`}
                                                target="_blank"
                                                rel="noreferrer"
                                              >
                                                <h2>
                                                  {res.title ||
                                                    res.name}
                                                </h2>
                                              </a>
                                              <p>{res.description}</p>
                                              {res.user && (
                                                <div className="search-content-by">
                                                  By:{" "}
                                                  <span>
                                                    {
                                                      res.user
                                                        .first_name
                                                    }
                                                  </span>
                                                </div>
                                              )}
                                              <div className="search-content-type">
                                                Type:{" "}
                                                <span className="type">
                                                  {res.activity_type}
                                                </span>
                                              </div>
                                              {/* <p>{res.description}</p> */}
                                            </div>

                                            {true && (
                                              <Dropdown className="playlist-dropdown check learning_activity_tab">
                                                <Dropdown.Toggle>
                                                  <FontAwesomeIcon icon="ellipsis-v" />
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                  <>
                                                    <a
                                                      href={`/activity/${res.id}/preview?type=ind-search`}
                                                      target="_blank"
                                                      rel="noreferrer"
                                                    >
                                                      {/* <FontAwesomeIcon className="mr-2" icon={faEye} />
                                                      Preview */}
                                                      <div className="dropDown-item-name-icon">
                                                        <PreviewSmSvg
                                                          primaryColor={
                                                            primaryColor
                                                          }
                                                        />
                                                        <span>
                                                          Preview
                                                        </span>
                                                      </div>
                                                    </a>
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
                                                              toast
                                                                .POSITION
                                                                .BOTTOM_RIGHT,
                                                            autoClose: 10000,
                                                            icon: "",
                                                          },
                                                        );

                                                        const result = await intActivityServices.indActivityClone(
                                                          currentOrganization?.id,
                                                          res.id,
                                                        );

                                                        toast.dismiss();
                                                        Swal.fire({
                                                          html:
                                                            result.message,
                                                          icon:
                                                            "success",
                                                        });
                                                      }}
                                                    >
                                                      <div className="dropDown-item-name-icon">
                                                        <MyActivitySvg
                                                          primaryColor={
                                                            primaryColor
                                                          }
                                                        />
                                                        Copy to My
                                                        Activities
                                                      </div>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item
                                                      onClick={() => {
                                                        setIndClone(
                                                          true,
                                                        );
                                                        setModalShow(
                                                          true,
                                                        );
                                                        setClone(res);
                                                      }}
                                                    >
                                                      {/* <FontAwesomeIcon className="mr-2" icon={faPlus} />
                                                      Add to Projects */}
                                                      <div className="dropDown-item-name-icon">
                                                        <MyProjectSmSvg
                                                          primaryColor={
                                                            primaryColor
                                                          }
                                                        />
                                                        Copy to My
                                                        projects
                                                      </div>
                                                    </Dropdown.Item>
                                                  </>
                                                </Dropdown.Menu>
                                              </Dropdown>
                                            )}
                                          </div>
                                        </div>
                                      </>
                                    ))
                                  ) : (
                                    <Alert variant="danger">
                                      No result found !
                                    </Alert>
                                  )
                                ) : isLoader ? (
                                  <Skeleton count="3" />
                                ) : (
                                  <Alert variant="warning">
                                    Start Searching CurrikiStudio
                                    Search Library.
                                  </Alert>
                                )}
                              </div>
                            </div>
                          </Tab>
                        )}

                        <Tab
                          eventKey="projects"
                          title={
                            !!search && !!meta.projects
                              ? `projects (${meta.projects})`
                              : "projects (0)"
                          }
                        >
                          <Accordion>
                            {!!search ? (
                              search?.length > 0 ? (
                                search?.map((res, counterTop) => (
                                  <>
                                    {res.model === "Project" && (
                                      <Card>
                                        <Accordion.Toggle
                                          as={Card.Header}
                                          eventKey={counterTop + 1}
                                          className="d-flex align-items-center search-project-card-head"
                                          onClick={async () => {
                                            if (
                                              projectTogglestate ===
                                              counterTop + 1
                                            ) {
                                              setprojectTogglestate(
                                                null,
                                              );
                                            } else {
                                              setprojectTogglestate(
                                                counterTop + 1,
                                              );

                                              setplaylistdata(null);
                                              const results = await dispatch(
                                                simpleSearchProjectPreview(
                                                  currentOrganization?.id,
                                                  res.id,
                                                ),
                                              );
                                              if (results) {
                                                setplaylistdata(
                                                  results,
                                                );
                                              }
                                            }
                                          }}
                                        >
                                          <FontAwesomeIcon
                                            className="ml-2"
                                            icon={
                                              projectTogglestate ===
                                              counterTop + 1
                                                ? "chevron-up"
                                                : "chevron-down"
                                            }
                                          />
                                          <div className="results_search">
                                            <div class="box">
                                              <div class="imgbox">
                                                {res.thumb_url ? (
                                                  <div
                                                    style={{
                                                      // eslint-disable-next-line max-len
                                                      backgroundImage: !res.thumb_url.includes(
                                                        "/storage/",
                                                      )
                                                        ? `url(${res.thumb_url})`
                                                        : `url(${global.config.resourceUrl}${res.thumb_url})`,
                                                    }}
                                                  />
                                                ) : (
                                                  <div
                                                    style={{
                                                      backgroundImage:
                                                        // eslint-disable-next-line max-len
                                                        `url("https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280")`,
                                                    }}
                                                  />
                                                )}
                                              </div>
                                              <div class="contentbox align-items-center">
                                                <div class="search-content">
                                                  <a
                                                    href={`/project/${res.id}/preview`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                  >
                                                    <h2>
                                                      {res?.title}
                                                    </h2>
                                                  </a>
                                                  <p>
                                                    {res?.description}
                                                  </p>
                                                  <div className="d-flex mt-1">
                                                    <div class="search-content-by mr-3">
                                                      By:{" "}
                                                      <span>
                                                        {
                                                          res?.user
                                                            ?.first_name
                                                        }
                                                      </span>
                                                    </div>
                                                    <div class="search-content-type">
                                                      Type:{" "}
                                                      <span class="type">
                                                        {res?.model}
                                                      </span>
                                                    </div>
                                                  </div>
                                                  {/* {permission?.Project?.includes(
                                                    "project:favorite",
                                                  ) && (
                                                    <div
                                                      className={`btn-fav ${res.favored}`}
                                                      onClick={(
                                                        e,
                                                      ) => {
                                                        if (
                                                          e.target.classList.contains(
                                                            " true",
                                                          )
                                                        ) {
                                                          e.target.classList.remove(
                                                            "true",
                                                          );
                                                        } else {
                                                          e.target.classList.add(
                                                            "true",
                                                          );
                                                        }
                                                        dispatch(
                                                          addProjectFav(
                                                            res.id,
                                                          ),
                                                        );
                                                      }}
                                                    >
                                                      <FontAwesomeIcon
                                                        className="mr-2"
                                                        icon="star"
                                                      />
                                                      Favorite
                                                    </div>
                                                  )} */}
                                                </div>
                                                {(permission?.Project?.includes(
                                                  "project:clone",
                                                ) ||
                                                  permission?.Project?.includes(
                                                    "project:publish",
                                                  )) && (
                                                  <Dropdown className="playlist-dropdown check">
                                                    <Dropdown.Toggle>
                                                      <FontAwesomeIcon icon="ellipsis-v" />
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu>
                                                      {permission?.Project?.includes(
                                                        "project:clone",
                                                      ) && (
                                                        <>
                                                          <Dropdown.Item
                                                            onClick={() =>
                                                              window.open(
                                                                `/project/${res.id}/preview`,
                                                                "_blank",
                                                              )
                                                            }
                                                          >
                                                            <div className="dropDown-item-name-icon">
                                                              <PreviewSmSvg
                                                                primaryColor={
                                                                  primaryColor
                                                                }
                                                              />
                                                              <span>
                                                                Preview
                                                              </span>
                                                            </div>
                                                          </Dropdown.Item>

                                                          <Dropdown.Item
                                                            onClick={() => {
                                                              Swal.fire(
                                                                {
                                                                  html: `You have selected <strong>${res.title}</strong> ${res.model}<br>Do you want to continue ?`,
                                                                  showCancelButton: true,
                                                                  confirmButtonColor:
                                                                    "#3085d6",
                                                                  cancelButtonColor:
                                                                    "#d33",
                                                                  confirmButtonText:
                                                                    "Ok",
                                                                },
                                                              ).then(
                                                                (
                                                                  result,
                                                                ) => {
                                                                  if (
                                                                    result.value
                                                                  ) {
                                                                    cloneProject(
                                                                      res.id,
                                                                    );
                                                                  }
                                                                },
                                                              );
                                                            }}
                                                          >
                                                            {/* <FontAwesomeIcon className="mr-2" icon="clone" />
                                                  Add to projects */}
                                                            <div className="dropDown-item-name-icon">
                                                              <MyProjectSmSvg
                                                                primaryColor={
                                                                  primaryColor
                                                                }
                                                              />
                                                              Copy to
                                                              My
                                                              projects
                                                            </div>
                                                          </Dropdown.Item>
                                                        </>
                                                      )}
                                                      {fromTeam && (
                                                        <Dropdown.Item
                                                          onClick={() => {
                                                            if (
                                                              selectProject?.length ===
                                                                0 &&
                                                              fromTeam
                                                            ) {
                                                              setSelectProject(
                                                                [
                                                                  res.id,
                                                                ],
                                                              );
                                                            } else if (
                                                              selectProject[0] ===
                                                                res.id &&
                                                              fromTeam
                                                            ) {
                                                              setSelectProject(
                                                                [],
                                                              );
                                                            } else {
                                                              Swal.fire(
                                                                {
                                                                  icon:
                                                                    "warning",
                                                                  title:
                                                                    "Action Prohibited",
                                                                  text:
                                                                    "You are only allowed to select 1 project.",
                                                                },
                                                              );
                                                            }
                                                          }}
                                                        >
                                                          <img
                                                            src={
                                                              teamicon
                                                            }
                                                            alt="teams_logo"
                                                            className="teams-logo"
                                                          />
                                                          {selectProject.includes(
                                                            res.id,
                                                          )
                                                            ? "Remove from "
                                                            : "Add to "}
                                                          team
                                                        </Dropdown.Item>
                                                      )}
                                                    </Dropdown.Menu>
                                                  </Dropdown>
                                                )}
                                              </div>
                                            </div>
                                          </div>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse
                                          eventKey={counterTop + 1}
                                        >
                                          <Card.Body className="playlist-card">
                                            <Accordion>
                                              {!!playlistdata ? (
                                                search?.length > 0 ? (
                                                  playlistdata?.playlists?.map(
                                                    (
                                                      playlist,
                                                      innerCounter,
                                                    ) => (
                                                      <>
                                                        {res.id ===
                                                          playlist.project_id && (
                                                          <Card>
                                                            <Accordion.Toggle
                                                              as={
                                                                Card.Header
                                                              }
                                                              eventKey={
                                                                innerCounter +
                                                                1
                                                              }
                                                              onClick={() => {
                                                                if (
                                                                  playlistTogglestate ===
                                                                  innerCounter +
                                                                    1
                                                                ) {
                                                                  setplaylistTogglestate(
                                                                    null,
                                                                  );
                                                                } else {
                                                                  setplaylistTogglestate(
                                                                    innerCounter +
                                                                      1,
                                                                  );
                                                                }
                                                              }}
                                                            >
                                                              <ul className="search-playllist-content">
                                                                <li
                                                                  className={
                                                                    playlistTogglestate ===
                                                                    playlist.id
                                                                      ? "active-li"
                                                                      : "non-active-li"
                                                                  }
                                                                >
                                                                  <div className="search-playlist-title">
                                                                    <FontAwesomeIcon
                                                                      className="ml-2"
                                                                      icon={
                                                                        playlistTogglestate ===
                                                                        innerCounter +
                                                                          1
                                                                          ? "chevron-up"
                                                                          : "chevron-down"
                                                                      }
                                                                    />

                                                                    <h3 className="playlist-title">
                                                                      {
                                                                        playlist.title
                                                                      }
                                                                    </h3>
                                                                  </div>
                                                                  {permission?.Playlist?.includes(
                                                                    "playlist:duplicate",
                                                                  ) && (
                                                                    <Dropdown className="playlist-dropdown check">
                                                                      <Dropdown.Toggle>
                                                                        <FontAwesomeIcon icon="ellipsis-v" />
                                                                      </Dropdown.Toggle>
                                                                      <Dropdown.Menu>
                                                                        <Dropdown.Item
                                                                          onClick={() =>
                                                                            window.open(
                                                                              `/playlist/${playlist.id}/preview/lti`,
                                                                              "_blank",
                                                                            )
                                                                          }
                                                                        >
                                                                          <div className="dropDown-item-name-icon">
                                                                            <PreviewSmSvg
                                                                              primaryColor={
                                                                                primaryColor
                                                                              }
                                                                            />
                                                                            <span>
                                                                              Preview
                                                                            </span>
                                                                          </div>
                                                                        </Dropdown.Item>
                                                                        <Dropdown.Item
                                                                          onClick={() => {
                                                                            setIndClone(
                                                                              false,
                                                                            );
                                                                            setModalShow(
                                                                              true,
                                                                            );
                                                                            setClone(
                                                                              playlist,
                                                                            );
                                                                          }}
                                                                        >
                                                                          <div className="dropDown-item-name-icon">
                                                                            <MyProjectSmSvg
                                                                              primaryColor={
                                                                                primaryColor
                                                                              }
                                                                            />
                                                                            Copy
                                                                            to
                                                                            My
                                                                            projects
                                                                          </div>
                                                                        </Dropdown.Item>
                                                                      </Dropdown.Menu>
                                                                    </Dropdown>
                                                                  )}
                                                                </li>
                                                              </ul>
                                                            </Accordion.Toggle>
                                                            {playlist
                                                              ?.activities
                                                              ?.length >
                                                            0 ? (
                                                              playlist?.activities?.map(
                                                                (
                                                                  activity,
                                                                  act_counter,
                                                                ) => (
                                                                  <Accordion.Collapse
                                                                    eventKey={
                                                                      innerCounter +
                                                                      1
                                                                    }
                                                                  >
                                                                    <Card.Body className="search-activity-content">
                                                                      <div className="activity-box">
                                                                        <div className="activity-thumb">
                                                                          {activity?.thumb_url ? (
                                                                            <div
                                                                              style={{
                                                                                backgroundImage: !activity?.thumb_url.includes(
                                                                                  "/storage/",
                                                                                )
                                                                                  ? `url(${activity?.thumb_url})`
                                                                                  : `url(${global.config.resourceUrl}${activity.thumb_url})`,
                                                                              }}
                                                                            />
                                                                          ) : (
                                                                            <div
                                                                              style={{
                                                                                backgroundImage:
                                                                                  // eslint-disable-next-line max-len
                                                                                  `url("https://images.pexels.com/photos/5022849/pexels-photo-5022849.jpeg?auto=compress&cs=tinysrgb&dpr=1&fit=crop&h=200&w=280")`,
                                                                              }}
                                                                            />
                                                                          )}
                                                                        </div>
                                                                        <p className="m-0">
                                                                          {
                                                                            activity.title
                                                                          }
                                                                        </p>
                                                                      </div>
                                                                      {/* {showBackOption ? (
                                                                        <>
                                                                          {permission?.Activity?.includes(
                                                                            "activity:duplicate",
                                                                          ) &&
                                                                            res.model ===
                                                                              "Activity" && (
                                                                              <Buttons
                                                                                text="Add"
                                                                                primary
                                                                                width="56px"
                                                                                height="36px"
                                                                                onClick={() => {
                                                                                  dispatch(
                                                                                    addActivityPlaylistSearch(
                                                                                      21,
                                                                                      playlistIdForSearchingTab,
                                                                                    ),
                                                                                  );
                                                                                }}
                                                                                hover
                                                                              />
                                                                            )}
                                                                        </>
                                                                      ) : ( */}
                                                                      <>
                                                                        {permission?.Activity?.includes(
                                                                          "activity:duplicate",
                                                                        ) && (
                                                                          <Dropdown className="playlist-dropdown check">
                                                                            <Dropdown.Toggle>
                                                                              <FontAwesomeIcon icon="ellipsis-v" />
                                                                            </Dropdown.Toggle>
                                                                            <Dropdown.Menu>
                                                                              <>
                                                                                <Dropdown.Item
                                                                                  onClick={() =>
                                                                                    window.open(
                                                                                      `/activity/${activity.id}/preview`,

                                                                                      "_blank",
                                                                                    )
                                                                                  }
                                                                                >
                                                                                  <div className="dropDown-item-name-icon">
                                                                                    <PreviewSmSvg
                                                                                      primaryColor={
                                                                                        primaryColor
                                                                                      }
                                                                                    />
                                                                                    <span>
                                                                                      Preview
                                                                                    </span>
                                                                                  </div>
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
                                                                                          toast
                                                                                            .POSITION
                                                                                            .BOTTOM_RIGHT,
                                                                                        autoClose: 10000,
                                                                                        icon:
                                                                                          "",
                                                                                      },
                                                                                    );
                                                                                    const result = await intActivityServices.copyToIndependentActivity(
                                                                                      currentOrganization?.id,
                                                                                      activity.id,
                                                                                    );
                                                                                    toast.dismiss();
                                                                                    Swal.fire(
                                                                                      {
                                                                                        html:
                                                                                          result.message,
                                                                                        icon:
                                                                                          "success",
                                                                                      },
                                                                                    );
                                                                                  }}
                                                                                >
                                                                                  <div className="dropDown-item-name-icon">
                                                                                    <MyActivitySmSvg
                                                                                      primaryColor={
                                                                                        primaryColor
                                                                                      }
                                                                                    />
                                                                                    <span>
                                                                                      Copy
                                                                                      to
                                                                                      My
                                                                                      Activities
                                                                                    </span>
                                                                                  </div>
                                                                                </Dropdown.Item>
                                                                                <Dropdown.Item
                                                                                  onClick={() => {
                                                                                    setIndClone(
                                                                                      false,
                                                                                    );
                                                                                    setModalShow(
                                                                                      true,
                                                                                    );
                                                                                    setClone(
                                                                                      activity,
                                                                                    );
                                                                                  }}
                                                                                >
                                                                                  <div className="dropDown-item-name-icon">
                                                                                    <MyProjectSmSvg
                                                                                      primaryColor={
                                                                                        primaryColor
                                                                                      }
                                                                                    />
                                                                                    Copy
                                                                                    to
                                                                                    My
                                                                                    projects
                                                                                  </div>
                                                                                </Dropdown.Item>
                                                                              </>
                                                                            </Dropdown.Menu>
                                                                          </Dropdown>
                                                                        )}
                                                                      </>
                                                                      {/* )} */}
                                                                    </Card.Body>
                                                                  </Accordion.Collapse>
                                                                ),
                                                              )
                                                            ) : (
                                                              <Accordion.Collapse
                                                                eventKey={
                                                                  innerCounter +
                                                                  1
                                                                }
                                                              >
                                                                <Card.Body
                                                                  className="search-activity-content"
                                                                  style={{
                                                                    marginTop:
                                                                      "-10px",
                                                                  }}
                                                                >
                                                                  <div className="activity-box w-100">
                                                                    <Alert variant="warning my-0 w-100">
                                                                      No
                                                                      result
                                                                      found
                                                                      !
                                                                    </Alert>
                                                                  </div>
                                                                </Card.Body>
                                                              </Accordion.Collapse>
                                                            )}
                                                          </Card>
                                                        )}
                                                      </>
                                                    ),
                                                  )
                                                ) : (
                                                  <Alert variant="danger">
                                                    No result found !
                                                  </Alert>
                                                )
                                              ) : (
                                                <>
                                                  <Skeleton count="3" />
                                                </>
                                              )}
                                            </Accordion>
                                          </Card.Body>
                                        </Accordion.Collapse>
                                      </Card>
                                    )}
                                  </>
                                ))
                              ) : (
                                <Alert variant="danger">
                                  No result found !
                                </Alert>
                              )
                            ) : (
                              <>
                                {!isLoader ? (
                                  <Alert variant="warning">
                                    Start Searching CurrikiStudio
                                    Search Library.
                                  </Alert>
                                ) : (
                                  <Skeleton count="3" />
                                )}
                              </>
                            )}
                          </Accordion>
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                </div>
                {totalCount > 20 && (
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={20}
                    totalItemsCount={
                      totalCount > 10000 ? 10000 : totalCount
                    }
                    pageRangeDisplayed={8}
                    onChange={async (e) => {
                      setisLoader(true);
                      setActivePage(e);
                      if (
                        allState.searchType === "Projects" ||
                        allState.searchType === "projects"
                      ) {
                        const searchData = {
                          phrase: searchQueries?.trim(),
                          from: e * 20 - 20,
                          size: 20,
                          type: searchType,
                          model: "projects",
                          subjectArray: activeSubject || undefined,
                          gradeArray: activeEducation || undefined,
                          authorTagsArray:
                            activeAuthorTag || undefined,
                          standardArray: activeType || undefined,
                          author: authorName || undefined,
                          no_words: noWords || undefined,
                        };
                        setSearch(null);
                        await dispatch(
                          simpleSearchAction(searchData),
                        );
                        Swal.close();
                      } else if (
                        allState.searchType ===
                        "Independent activities"
                      ) {
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
                        await dispatch(
                          searchIndependentActivitiesAction(
                            searchData,
                            "showcase_activities",
                          ),
                        );
                      }
                    }}
                    itemClass="page-item"
                    linkClass="page-link"
                  />
                )}
              </div>
            ) : (
              <Alert variant="danger">
                You are not authorized to view this page!
              </Alert>
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
  playlistIdForSearchingTab: "",
  reloadPlaylist: false,
};

export default SearchInterface;
