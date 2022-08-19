/* eslint-disable */
import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { searchLtiTool, setActiveAdminForm, ltiToolType } from 'store/actions/admin';
import filterSearchIcon from 'assets/images/svg/filter-placeholder.svg';
import loader from 'assets/images/dotsloader.gif';
import * as actionTypes from 'store/actionTypes';
import indActivityService from 'services/indActivities.service';
import adminService from 'services/admin.service';
import { getRoles, roleDetail, searchUserInOrganization } from 'store/actions/organization';
import { toolTypeArray } from 'utils';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import { integratedLMS } from '../../components/ResourceCard/AddResource/dropdownData';
import Filter from './filter';
import SearchInputMdSvg from 'iconLibrary/mainContainer/SearchInputMdSvg';
import FilterMdSvg from 'iconLibrary/mainContainer/FilterMdSvg';
import PreviewSmSvg from 'iconLibrary/dropDown/PreviewSmSvg';

function Controller(props) {
  const {
    paginationCounter,
    search,
    // print,
    btnText,
    btnAction,
    importUser,

    subTypeState,
    filter,
    activeRole,
    setActiveRole,
    setActivePage,
    type,
    // searchQueryActivities,
    // setSearchQueryActivities,
    searchQuery,
    searchQueryProject,
    setSearchQueryProject,
    // searchQueryStats,
    // setSearchQueryStats,
    setSearchQuery,
    searchQueryChangeHandler,
    searchProjectQueryChangeHandler,
    // searchActivitiesQueryHandler,
    setSearchQueryTeam,
    // searchUserReportQueryHandler,
    size,
    setSize,
    searchQueryChangeHandlerLtiTool,
    searchLtiquery,
    // tableHead,
    roles,
    // inviteUser,
    subType,
    setChangeIndexValue,
    // selectedActivityType,
    libraryReqSelected,
    setLibraryReqSelected,
    // setSubTypeState,
    projectFilterObj,
    setProjectFilterObj,
    filterSearch,
    resetProjectFilter,
    filteredItems,
    setSearchKey,
    setfilterLtiSettings,
    filterLtiSettings,
  } = props;
  const importProject = useRef();
  const dispatch = useDispatch();
  // const [allUsersAdded, setAllUsersAdded] = useState([]);
  const adminState = useSelector((state) => state.admin);
  const [activeRoleInComponent, setActiveRoleInComponent] = useState('');
  const organization = useSelector((state) => state.organization);
  const { permission, activeOrganization } = organization;
  const { activityTypes } = useSelector((state) => state.admin);
  const [selectedIndexValue, setSelectedIndexValue] = useState('ALL');
  const [selectedIndexValueid, setSelectedIndexValueid] = useState(0);
  const [authorName, setAuthorName] = useState('');
  const [authorsArray, setAuthorsArray] = useState([]);
  const [loaderImgUser, setLoaderImgUser] = useState(false);
  const [selectedFilterItem, setSelectedFilterItem] = useState('');
  const [ltiToolTypes, setLtiToolTypes] = useState();
  const { ltiToolsTypes } = useSelector((state) => state.admin);
  useMemo(() => {
    if (type === 'Users') {
      dispatch(getRoles());
    }
  }, [dispatch, type]);
  useEffect(() => {
    if (roles?.length > 0 && subTypeState !== 'Manage Roles' && adminState?.activeTab === 'Users') {
      // console.log(roles, 'roles');
      // if(!activeRoleInComponent) setActiveRoleInComponent(roles[0]?.display_name);
      if (!activeRole) {
        setActiveRole(roles[0]?.id);
        setActiveRoleInComponent(roles[0]?.display_name);
      } else if (roles?.length > 0 && activeRole) {
        setActiveRoleInComponent(roles?.filter((role) => role.id === activeRole)[0]?.display_name);
      }
    } else if (roles?.length > 0 && subTypeState === 'Manage Roles') {
      setActiveRoleInComponent(roles[0]?.display_name);
    }
  }, [roles, adminState?.activeTab, subTypeState, activeRole, setActiveRole]);
  // sabtype
  // const sab = subType;
  // console.log(subTypeState);
  // console.log(subType);
  const searchUserProjectFilter = useCallback(async () => {
    if (authorName.length >= 2) {
      setLoaderImgUser(true);
      const result = await dispatch(searchUserInOrganization(activeOrganization?.id, authorName));
      // console.log(result?.data, 'result');
      if (result?.data?.length > 0) {
        setLoaderImgUser(false);
        setAuthorsArray(result?.data);
      } else {
        setLoaderImgUser(false);
        setAuthorsArray([]);
      }
    } else if (authorName.length < 2) {
      setLoaderImgUser(false);
      setAuthorsArray([]);
    }
  }, [activeOrganization?.id, authorName, dispatch]);
  const updateIndexAction = (value, id) => {
    setSelectedIndexValue(value);
    setChangeIndexValue(id);
    setSelectedIndexValueid(id);
  };
  const primaryColor = getGlobalColor('--main-primary-color');
  // const secondaryColor = getGlobalColor('--main-secondary-color');

  useEffect(() => {
    setLtiToolTypes(ltiToolsTypes?.filter((t) => t.name != 'My device' && t.name != 'BrightCove'));
  }, [ltiToolsTypes]);
  return (
    <div className="controller">
      {/* {(currentOrganization?.id !== activeOrganization?.id && type !== 'Users' ) && (
        <div className="btn-text">
          <button
            onClick={async () => {
              await dispatch(getOrganization(currentOrganization?.id));
              dispatch(clearOrganizationState());
              dispatch(getRoles());
            }}
          >
            Go to root organization
          </button>
        </div>
      )} */}

      {/* {!!filter && (
        <div className="filter-dropdown drop-counter ">
          Fillter by:
          <span>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                Select value
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <form className="radio-filter">
                  {tableHead?.map((head) => (
                    <div className="group">
                      <label>{head}</label>
                      <input type="checkbox" name="filter-table" />
                    </div>
                  ))}
                </form>
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </div>
      )} */}
      {/* LEFT SIDE OF CONTROLLER GOES HERE */}
      <div className="controller-left-side">
        {!!search && type === 'Users' && (
          <>
            <div className="search-bar" style={{ display: 'flex', flexDirection: 'column' }}>
              <input
                className=""
                type="text"
                // title="Enter at least 2 characters"
                placeholder="Search"
                value={searchQuery}
                onChange={searchQueryChangeHandler}
              />
              {/* <img src={searchimg} alt="search" /> */}
              <SearchInputMdSvg primaryColor={primaryColor} />
              {searchQuery.trim().length > 0 && searchQuery.trim().length < 2 && (
                <label className="flex" style={{ color: 'red' }}>
                  Enter at least 2 characters
                </label>
              )}
            </div>
          </>
        )}
        {!!search && type === 'LMS' && subType === 'LMS settings' && (
          <div className="search-bar">
            <input className="" type="text" placeholder="Search" onChange={searchQueryChangeHandler} />
            {/* <img src={searchimg} alt="search" /> */}
            <SearchInputMdSvg primaryColor={primaryColor} />
          </div>
        )}

        {!!search && type === 'LMS' && subType === 'LTI Tools' && (
          <div className="search-bar">
            <input className="" type="text" placeholder="Search" value={searchLtiquery} onChange={searchQueryChangeHandlerLtiTool} />
            {/* <img src={searchimg} alt="search" /> */}
            <SearchInputMdSvg primaryColor={primaryColor} />
          </div>
        )}
        {!!search && type === 'LMS' && subType === 'BrightCove' && (
          <div className="search-bar">
            <input className="" type="text" placeholder="Search" onChange={searchQueryChangeHandler} />
            {/* <img src={searchimg} alt="search" /> */}
            <SearchInputMdSvg primaryColor={primaryColor} />
          </div>
        )}

        {!!search && type === 'DefaultSso' && (
          <div className="search-bar">
            <input className="" type="text" placeholder="Search by Site name,URL or Client id" onChange={searchQueryChangeHandler} />
            <SearchInputMdSvg primaryColor={primaryColor} />
          </div>
        )}
        {!!search && type === 'Teams' && (
          <div className="search-bar">
            <input className="" type="text" placeholder="Search" onChange={({ target }) => setSearchQueryTeam(target.value)} />
            <SearchInputMdSvg primaryColor={primaryColor} />
          </div>
        )}
        {/* {!!search && type === 'Stats' && (
          <div className="search-bar">
            <input
              className=""
              type="text"
              placeholder="Search"
              value={searchQueryStats}
              onChange={(e) => {
                if (e.target.value && alphaNumeric(e.target.value)) {
                  setSearchQueryStats(e.target.value);
                } else if (e.target.value === '') {
                  setSearchQueryStats('');
                  searchUserReportQueryHandler('', subTypeState);
                }
              }}
            />
            <img src={searchimg} alt="search" onClick={() => searchUserReportQueryHandler(searchQueryStats, subTypeState)} />
          </div>
        )} */}

        {!!search && type === 'Projects' && (
          <div className="search-bar">
            <input
              className=""
              type="text"
              placeholder="Search"
              value={searchQueryProject}
              onChange={(e) => {
                if (e.target.value) {
                  setActivePage(1);
                  setSearchQueryProject(e.target.value);
                  // searchProjectQueryChangeHandler(e.target.value, selectedIndexValueid, subType);
                } else if (e.target.value === '') {
                  setActivePage(1);
                  setSearchQueryProject('');
                  // searchProjectQueryChangeHandler('', selectedIndexValueid, subType);
                }
              }}
            />
            {/* <img
              src={searchimg}
              alt="search"
              onClick={() =>
                searchProjectQueryChangeHandler(
                  searchQueryProject,
                  selectedIndexValueid,
                  subType
                )
              }
            /> */}
            <SearchInputMdSvg primaryColor={primaryColor} onClick={() => searchProjectQueryChangeHandler(searchQueryProject, selectedIndexValueid, subType)} />
          </div>
        )}

        {!!search && type === 'IndActivities' && (
          <div className="search-bar">
            <input
              className=""
              type="text"
              placeholder="Search"
              value={searchQueryProject}
              onChange={(e) => {
                dispatch({
                  type: actionTypes.CLEAR_IND_ACTIVITIES,
                });
                dispatch({
                  type: actionTypes.CLEAR_ADMIN_EXPORTED_ACTIVITIES,
                });
                if (e.target.value) {
                  setActivePage(1);
                  setSearchQueryProject(e.target.value);
                  // searchProjectQueryChangeHandler(e.target.value, selectedIndexValueid, subType);
                } else if (e.target.value === '') {
                  setActivePage(1);
                  setSearchQueryProject('');
                  // searchProjectQueryChangeHandler('', selectedIndexValueid, subType);
                }
              }}
            />
            <SearchInputMdSvg primaryColor={primaryColor} onClick={() => searchProjectQueryChangeHandler(searchQueryProject, selectedIndexValueid, subType)} />
          </div>
        )}

        {!!search && type === 'Organization' && (
          <div className="search-bar">
            <input type="text" placeholder="Search" onChange={searchQueryChangeHandler} />
            <SearchInputMdSvg primaryColor={primaryColor} />
          </div>
        )}
        {!!search && type === 'Activities' && subType === 'Activity Types' && (
          <div className="search-bar">
            <input type="text" placeholder="Search by activity name" onChange={searchQueryChangeHandler} value={setSearchKey} />
            <SearchInputMdSvg primaryColor={primaryColor} />
          </div>
        )}
        {!!search && type === 'Activities' && subType === 'Activity Items' && (
          <div className="search-bar">
            <input type="text" placeholder="Search" onChange={searchQueryChangeHandler} value={setSearchKey} />
            <SearchInputMdSvg primaryColor={primaryColor} />
          </div>
        )}

        {!!search && type === 'Activities' && subType === 'Subjects' && (
          <div className="search-bar">
            <input className="" type="text" placeholder="Search" onChange={searchQueryChangeHandler} value={setSearchKey} />
            {/* <img src={searchimg} alt="search" /> */}
            <SearchInputMdSvg primaryColor={primaryColor} />
          </div>
        )}

        {!!search && type === 'Activities' && subType === 'Education Level' && (
          <div className="search-bar">
            <input className="" type="text" placeholder="Search" onChange={searchQueryChangeHandler} value={setSearchKey} />
            {/* <img src={searchimg} alt="search" /> */}
            <SearchInputMdSvg primaryColor={primaryColor} />
          </div>
        )}

        {!!search && type === 'Activities' && subType === 'Author Tags' && (
          <div className="search-bar">
            <input className="" type="text" placeholder="Search" onChange={searchQueryChangeHandler} value={setSearchKey} />
            {/* <img src={searchimg} alt="search" /> */}
            <SearchInputMdSvg primaryColor={primaryColor} />
          </div>
        )}

        {!!search && type === 'Activities' && subType === 'Activity Layouts' && (
          <div className="search-bar">
            <input type="text" placeholder="Search by activity layout name" onChange={searchQueryChangeHandler} value={setSearchKey} />
            {/* <img src={searchimg} alt="search" /> */}
            <SearchInputMdSvg primaryColor={primaryColor} />
          </div>
        )}
        {paginationCounter && (
          <div className="pagination-counter drop-counter ">
            Rows per page
            <span>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">{size}</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setSize(10);
                      setActivePage(1);
                    }}
                  >
                    10
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setSize(25);
                      setActivePage(1);
                    }}
                  >
                    25
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setSize(50);
                      setActivePage(1);
                    }}
                  >
                    50
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setSize(100);
                      setActivePage(1);
                    }}
                  >
                    100
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
        )}
        {/* Ind. activity Start */}
        {type === 'IndActivities' && subType === 'All independent activities' && (
          <Filter
            setProjectFilterObj={setProjectFilterObj}
            projectFilterObj={projectFilterObj}
            setLibraryReqSelected={setLibraryReqSelected}
            resetProjectFilter={resetProjectFilter}
            filterSearch={filterSearch}
          />
        )}

        {/* Ind. Activity End  */}
        {/* FILTER FOR PROJECT TABS */}
        {type === 'Projects' && subType === 'All Projects' && (
          <div className="filter-dropdown-project">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                {/* <img src={filterImg} alt="filter" /> */}
                <FilterMdSvg primaryColor={primaryColor} />
                Filter
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="authorName-project">
                  <label>Author</label>
                  <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} />
                  <img src={filterSearchIcon} alt="filterSearchIcon" className={authorName && authorsArray.length === 0 && 'close-circle'} onClick={searchUserProjectFilter} />
                  {authorName && authorName.length >= 2 && authorsArray.length > 0 && (
                    <div className="author-list">
                      {authorsArray?.length > 0
                        ? authorsArray?.map((author) => (
                            <div
                              className="single-author"
                              onClick={() => {
                                setProjectFilterObj({
                                  ...projectFilterObj,
                                  author_id: author.id,
                                });
                                setAuthorName(`${author.first_name} ${author.last_name}`);
                                setAuthorsArray([]);
                              }}
                            >
                              <div className="initial">{author.first_name[0] + author.last_name[0]}</div>
                              <div>
                                <div className="username-filter-project">{author.first_name}</div>
                                <div className="email-filter-project">{author.email}</div>
                              </div>
                            </div>
                          ))
                        : 'No user found.'}
                    </div>
                  )}
                </div>
                {loaderImgUser && <img src={loader} alt="loader" className="loader-img" />}
                {authorName && authorName.length < 2 && <div className="error">Enter at least 2 characters.</div>}
                <div className="createdFrom-project">
                  <label>Created</label>
                  <div className="row-project-filter">
                    <div className="from-project">
                      <span>From</span>
                      <input
                        type="text"
                        placeholder="MM/DD/YYYY"
                        onFocus={(e) => {
                          e.target.type = 'date';
                        }}
                        value={projectFilterObj.created_from}
                        onChange={(e) => {
                          setProjectFilterObj({
                            ...projectFilterObj,
                            created_from: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="to-project">
                      <span>To</span>
                      <input
                        type="text"
                        placeholder="MM/DD/YYYY"
                        onFocus={(e) => {
                          e.target.type = 'date';
                        }}
                        value={projectFilterObj.created_to}
                        onChange={(e) => {
                          setProjectFilterObj({
                            ...projectFilterObj,
                            created_to: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  {projectFilterObj.created_from > projectFilterObj.created_to && <div className="error">From date should be less than To date.</div>}
                </div>
                <div className="updatedOn-project">
                  <label>Updated</label>
                  <div className="row-project-filter">
                    <div className="from-project">
                      <span>From</span>
                      <input
                        type="text"
                        placeholder="MM/DD/YYYY"
                        onFocus={(e) => {
                          e.target.type = 'date';
                        }}
                        value={projectFilterObj.updated_from}
                        onChange={(e) => {
                          setProjectFilterObj({
                            ...projectFilterObj,
                            updated_from: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="to-project">
                      <span>To</span>
                      <input
                        type="text"
                        placeholder="MM/DD/YYYY"
                        onFocus={(e) => {
                          e.target.type = 'date';
                        }}
                        value={projectFilterObj.updated_to}
                        onChange={(e) => {
                          setProjectFilterObj({
                            ...projectFilterObj,
                            updated_to: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>
                  {projectFilterObj.updated_from > projectFilterObj.updated_to && <div className="error">From date should be less than To date.</div>}
                </div>
                <div className="status-project">
                  <div className="library-status">
                    <label>Library status</label>
                    <span>
                      <input
                        type="radio"
                        checked={projectFilterObj.indexing === 1 && true}
                        onChange={() => {
                          setLibraryReqSelected(true);
                          setProjectFilterObj({
                            ...projectFilterObj,
                            indexing: 1,
                          });
                        }}
                      />
                      Requested
                    </span>
                    <span>
                      <input
                        type="radio"
                        checked={projectFilterObj.indexing === 0 && true}
                        onChange={() => {
                          setLibraryReqSelected(false);
                          setProjectFilterObj({
                            ...projectFilterObj,
                            indexing: 0,
                          });
                        }}
                      />
                      Not Requested
                    </span>
                    <span>
                      <input
                        type="radio"
                        checked={projectFilterObj.indexing === 3 && true}
                        onChange={() => {
                          setLibraryReqSelected(false);
                          setProjectFilterObj({
                            ...projectFilterObj,
                            indexing: 3,
                          });
                        }}
                      />
                      Approved
                    </span>
                    <span>
                      <input
                        type="radio"
                        checked={projectFilterObj.indexing === 2 && true}
                        onChange={() => {
                          setLibraryReqSelected(false);
                          setProjectFilterObj({
                            ...projectFilterObj,
                            indexing: 2,
                          });
                        }}
                      />
                      Rejected
                    </span>
                  </div>
                  <div className="shared-status">
                    <label>Shared status</label>
                    <span>
                      <input
                        type="radio"
                        checked={projectFilterObj.shared === 1 && true}
                        onChange={() =>
                          setProjectFilterObj({
                            ...projectFilterObj,
                            shared: 1,
                          })
                        }
                      />
                      Enabled
                    </span>
                    <span>
                      <input
                        type="radio"
                        checked={projectFilterObj.shared === 0 && true}
                        onChange={() =>
                          setProjectFilterObj({
                            ...projectFilterObj,
                            shared: 0,
                          })
                        }
                      />
                      Disabled
                    </span>
                  </div>
                </div>
                <div className="filter-btn-project" onClick={() => filterSearch()}>
                  {/* <img src={filterImg} alt="filter" /> */}
                  <FilterMdSvg primaryColor={primaryColor} />
                  Apply Filters
                </div>
                <div
                  className="filter-btn-project"
                  onClick={() => {
                    setAuthorName('');
                    resetProjectFilter();
                  }}
                >
                  <FontAwesomeIcon icon="sync" />
                  Reset All
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {type === 'Projects' && subType === 'All Projects' && (
          <button
            className="switch-libreq"
            type="button"
            style={{ border: libraryReqSelected ? '1px solid #F8AF2C' : '0' }}
            onClick={() => {
              // setSubTypeState(libraryReqSelected ? 'All Projects' : 'Library requests');
              setLibraryReqSelected(!libraryReqSelected);
            }}
          >
            {/* <img src={eye} alt="eye" /> */}
            <PreviewSmSvg primaryColor={primaryColor} className="svg_mr_8" />
            Library request to review
          </button>
        )}
        {subType === 'All independent activities' && (
          <button
            className="switch-libreq"
            type="button"
            style={{ border: libraryReqSelected ? '1px solid #F8AF2C' : '0' }}
            onClick={() => {
              // setSubTypeState(libraryReqSelected ? 'All Projects' : 'Library requests');
              setLibraryReqSelected(!libraryReqSelected);
            }}
          >
            {/* <img src={eye} alt="eye" /> */}
            <PreviewSmSvg primaryColor={primaryColor} className="svg_mr_8" />
            Library request to review
          </button>
        )}
        {/* FILTER FOR ACTIVITY ITEMS */}
        {subType === 'Activity Items' && (
          <div className="filter-dropdown-activityItems">
            Filter by activity type
            <span>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">{selectedFilterItem?.title ? selectedFilterItem?.title : 'Select'}</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      filteredItems(null);
                      setSelectedFilterItem(null);
                    }}
                  >
                    Audio
                  </Dropdown.Item>
                  {activityTypes?.data.map((item) => (
                    <Dropdown.Item
                      onClick={() => {
                        filteredItems(item.id);
                        setSelectedFilterItem(item);
                      }}
                    >
                      {item.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
        )}
        {!!filter && subType === 'index' && (
          <div className="filter-dropdown drop-counter ">
            Index Value:
            <span>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">{selectedIndexValue}</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      updateIndexAction('ALL', 0);
                      setActivePage(1);
                    }}
                  >
                    ALL
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      updateIndexAction('REQUESTED', 1);
                      setActivePage(1);
                    }}
                  >
                    REQUESTED
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      updateIndexAction('REJECTED', 2);
                      setActivePage(1);
                    }}
                  >
                    REJECTED
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      updateIndexAction('APPROVED', 3);
                      setActivePage(1);
                    }}
                  >
                    APPROVED
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
        )}
        {roles?.length > 0 && type === 'Users' ? (
          <div className="filter-dropdown role-dropdown">
            {subTypeState === 'Manage Roles' ? 'Select role:' : 'Filter by role'}
            <span>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">{activeRoleInComponent}</Dropdown.Toggle>

                <Dropdown.Menu>
                  {roles?.map((head) => (
                    <div key={head} className="group">
                      <Dropdown.Item
                        onClick={() => {
                          setActiveRoleInComponent(head.display_name);
                          if (subTypeState === 'Manage Roles') dispatch(roleDetail(activeOrganization.id, head.id));
                          if (subTypeState === 'All Users' && activeRole !== head.id) {
                            setSearchQuery('');
                            setActiveRole(head.id);
                            setActivePage(1);
                          }
                        }}
                      >
                        {head.display_name}
                      </Dropdown.Item>
                    </div>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
        ) : null}
        {/* FILTER FOR ACTIVITY ITEMS */}
        {subType === 'LTI Tools' && (
          <div className="filter-dropdown-activityItems">
            Filter by type
            <span>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">{filterLtiSettings?.name ? filterLtiSettings?.name : 'All'}</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      filteredItems(null);
                      setSelectedFilterItem(null);
                      setfilterLtiSettings(null);
                    }}
                  >
                    All
                  </Dropdown.Item>
                  {/* {toolTypeArray?.map((t) => (
                    <Dropdown.Item
                      onClick={() => {
                        filteredItems(t.key);
                        setSelectedFilterItem(t);
                      }}
                    >
                      {t.value}
                    </Dropdown.Item>
                  ))} */}
                  {ltiToolTypes?.map((t) => {
                    return (
                      <Dropdown.Item
                        onClick={() => {
                          filteredItems(t.id);
                          setSelectedFilterItem(t);
                          setfilterLtiSettings(t);
                        }}
                      >
                        {t.name}
                      </Dropdown.Item>
                    );
                  })}
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
        )}

        {(type === 'DefaultSso' || subType === 'LMS settings') && (
          <div className="filter-dropdown-activityItems">
            Filter by type
            <span>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">{selectedFilterItem?.value ? selectedFilterItem?.value : 'All'}</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      filteredItems('');
                      setSelectedFilterItem(null);
                    }}
                  >
                    All
                  </Dropdown.Item>
                  {integratedLMS?.map((data) => (
                    <Dropdown.Item
                      onClick={() => {
                        filteredItems(data.value);
                        setSelectedFilterItem(data);
                      }}
                    >
                      {data.name}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
        )}

        {/* ROW PER PAGE */}
      </div>
      {/* RIGHT SIDE OF CONTROLLER GOES HERE */}
      <div className="controller-right-side">
        {!!importUser && type === 'Projects' && subType === 'All Projects' && permission?.Organization?.includes('organization:edit-project') && (
          <div
            className="import-user"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              importProject.current.click();
            }}
          >
            <FontAwesomeIcon icon="sign-in-alt" />
            <div>Import Project</div>
            <input
              type="file"
              ref={importProject}
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files.length === 0) {
                  return true;
                }
                if (!e.target.files[0].type.includes('zip')) {
                  Swal.fire({
                    title: 'Invalid File',
                    icon: 'error',
                    text: 'please select zip file',
                  });
                } else {
                  Swal.fire({
                    title: 'Importing Project',
                    icon: 'info',
                    text: 'please wait...',
                    allowOutsideClick: false,
                    onBeforeOpen: () => {
                      Swal.showLoading();
                    },
                    button: false,
                  });
                  const formData = new FormData();
                  formData.append('project', e.target.files[0]);
                  const response = adminService.importProject(activeOrganization.id, formData);
                  response.then((res) => {
                    Swal.fire({
                      icon: 'success',
                      html: res?.message,
                    });
                  });
                }
              }}
            />
          </div>
        )}

        {!!importUser && type === 'IndActivities' && subType === 'All independent activities' && permission['Independent Activity']?.includes('independent-activity:import') && (
          <div
            className="import-user"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              importProject.current.click();
            }}
          >
            <FontAwesomeIcon icon="sign-in-alt" />
            <div>Import activity</div>
            <input
              type="file"
              ref={importProject}
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files.length === 0) {
                  return true;
                }
                if (!e.target.files[0].type.includes('zip')) {
                  Swal.fire({
                    title: 'Invalid File',
                    icon: 'error',
                    text: 'please select zip file',
                  });
                } else {
                  Swal.fire({
                    title: 'Importing Project',
                    icon: 'info',
                    text: 'please wait...',
                    allowOutsideClick: false,
                    onBeforeOpen: () => {
                      Swal.showLoading();
                    },
                    button: false,
                  });
                  const formData = new FormData();
                  formData.append('independent_activity', e.target.files[0]);
                  const response = indActivityService.importIndAvtivity(activeOrganization.id, formData);
                  response.then((res) => {
                    Swal.fire({
                      icon: 'success',
                      html: res?.message,
                    });
                  });
                }
              }}
            />
          </div>
        )}

        {/* {!!print && (
        <div className="print-info">
          <div>print</div>
          <div className="img-section">
            <img src={csv} alt="csv" />
            <img src={pdf} alt="pdf" />
          </div>
        </div>
      )} */}
        {!!btnText && subType === 'Activity Types' && permission?.Organization.includes('organization:create-activity-type') && (
          <div className="btn-text">
            <button
              type="button"
              onClick={() => {
                if (btnAction === 'add_activity_type') {
                  dispatch(setActiveAdminForm('add_activity_type'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}
        {!!btnText && subType === 'Activity Items' && permission?.Organization.includes('organization:create-activity-item') && (
          <div className="btn-text">
            <button
              type="button"
              onClick={() => {
                if (btnAction === 'add_activity_item') {
                  dispatch(setActiveAdminForm('add_activity_item'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}

        {!!btnText && subType === 'Subjects' /* && permission?.Organization.includes('organization:create-activity-subject') */ && (
          <div className="btn-text">
            <button
              type="button"
              onClick={() => {
                if (btnAction === 'add_subject') {
                  dispatch(setActiveAdminForm('add_subject'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}

        {!!btnText && subType === 'Education Level' /* && permission?.Organization.includes('organization:create-activity-subject') */ && (
          <div className="btn-text">
            <button
              type="button"
              onClick={() => {
                if (btnAction === 'add_education_level') {
                  dispatch(setActiveAdminForm('add_education_level'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}

        {!!btnText && subType === 'Author Tags' /* && permission?.Organization.includes('organization:create-activity-subject') */ && (
          <div className="btn-text">
            <button
              type="button"
              onClick={() => {
                if (btnAction === 'add_author_tag') {
                  dispatch(setActiveAdminForm('add_author_tag'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}
        {!!btnText && subType === 'Activity Layouts' /* && permission?.Organization.includes('organization:create-activity-subject') */ && (
          <div className="btn-text">
            <button
              type="button"
              onClick={() => {
                if (btnAction === 'add_activity_layout') {
                  dispatch(setActiveAdminForm('add_activity_layout'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}

        {!!btnText && subType === 'Manage Roles' && permission?.Organization.includes('organization:add-role') && (
          <div className="btn-text">
            <button
              type="button"
              onClick={() => {
                if (btnAction === 'add_role') {
                  dispatch(setActiveAdminForm('add_role'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}
        {!!btnText && subType === 'All Users' && permission?.Organization.includes('organization:add-user') && (
          <div className="btn-text">
            <button
              type="button"
              onClick={() => {
                if (btnAction === 'create_user') {
                  dispatch(setActiveAdminForm('create_user'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}
        {!!btnText && type === 'Organization' && permission?.Organization.includes('organization:create') && (
          <div className="btn-text">
            <button
              type="button"
              onClick={() => {
                if (btnAction === 'add_org') {
                  dispatch(setActiveAdminForm('add_org'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}
        {!!btnText && type === 'LMS' && subType === 'LMS settings' && permission?.Organization.includes('organization:create-lms-setting') && (
          <div className="btn-text">
            <button
              type="button"
              onClick={() => {
                if (btnAction === 'add_lms') {
                  dispatch(setActiveAdminForm('add_lms'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}

        {!!btnText && type === 'LMS' && subType === 'LTI Tools' && permission?.Organization.includes('organization:create-all-setting') && (
          <div className="btn-text">
            <button
              type="button"
              onClick={() => {
                if (btnAction === 'add_lti_tool') {
                  dispatch(setActiveAdminForm('add_lti_tool'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}

        {!!btnText && type === 'LMS' && subType === 'BrightCove' && permission?.Organization.includes('organization:create-brightcove-setting') && (
          <div className="btn-text">
            <button
              type="button"
              onClick={() => {
                if (btnAction === 'add_brightcove') {
                  dispatch(setActiveAdminForm('add_brightcove'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}

        {!!btnText && type === 'DefaultSso' && (
          <div className="btn-text">
            <button
              type="button"
              onClick={() => {
                if (btnAction === 'add_default_sso') {
                  dispatch(setActiveAdminForm('add_default_sso'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
Controller.propTypes = {
  paginationCounter: PropTypes.bool,
  search: PropTypes.bool,
  btnText: PropTypes.string,
  btnAction: PropTypes.string,
  importUser: PropTypes.bool,
  filteredItems: PropTypes.object,

  subTypeState: PropTypes.string,
  filter: PropTypes.bool,
  activeRole: PropTypes.string,
  setActiveRole: PropTypes.func,
  setActivePage: PropTypes.func,
  type: PropTypes.string,

  searchQuery: PropTypes.string,
  searchQueryProject: PropTypes.string,
  setSearchQueryProject: PropTypes.func,
  setSearchQueryTeam: PropTypes.func,

  setSearchQuery: PropTypes.func,
  searchQueryChangeHandler: PropTypes.func,
  searchProjectQueryChangeHandler: PropTypes.func,

  size: PropTypes.number,
  setSize: PropTypes.func,
  roles: PropTypes.array,
  subType: PropTypes.string,
  setChangeIndexValue: PropTypes.func,

  libraryReqSelected: PropTypes.bool,
  setLibraryReqSelected: PropTypes.func,

  projectFilterObj: PropTypes.object,
  setProjectFilterObj: PropTypes.func,
  filterSearch: PropTypes.func,
  resetProjectFilter: PropTypes.func,
};

Controller.defaultProps = {
  paginationCounter: false,
  search: false,
  btnText: '',
  btnAction: '',
  importUser: false,

  subTypeState: '',
  filter: '',
  activeRole: '',
  setActiveRole: {},
  setActivePage: {},
  filteredItems: {},
  type: '',

  searchQuery: '',
  searchQueryProject: '',
  setSearchQueryProject: {},
  setSearchQueryTeam: {},

  setSearchQuery: {},
  searchQueryChangeHandler: {},
  searchProjectQueryChangeHandler: {},

  size: 10,
  setSize: {},
  roles: [],
  subType: '',
  setChangeIndexValue: {},

  libraryReqSelected: false,
  setLibraryReqSelected: {},

  projectFilterObj: {},
  setProjectFilterObj: {},
  filterSearch: {},
  resetProjectFilter: {},
};

export default Controller;
