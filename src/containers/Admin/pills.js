/* eslint-disable */
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { Tabs, Tab, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import adminService from 'services/admin.service';
import Starter from './starter';
import { columnData } from './column';

import { getOrgUsers, searchUserInOrganization, getsubOrgList, getRoles, clearSearchUserInOrganization, updatePageNumber, resetPageNumber } from 'store/actions/organization';
import { getActivityItems, loadResourceTypesAction } from 'store/actions/resource';
import { getJobListing, getLogsListing, getLtiTools, getLtiToolsOrderBy, getUserReport, getDefaultSso, getLmsProject } from 'store/actions/admin';
import { alphaNumeric } from 'utils';

export default function Pills(props) {
  const { modules, type, subType, allProjectTab, setAllProjectTab, setModalShow, setrowData, setActivePageNumber } = props;

  const [key, setKey] = useState(modules && modules[0]);

  const [subTypeState, setSubTypeState] = useState(subType);
  // All User Business Logic Start
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const { activityTypes, activityItems, usersReport } = useSelector((state) => state.admin);
  const [userReportsStats, setUserReportStats] = useState(null);
  const admin = useSelector((state) => state.admin);
  const [activePage, setActivePage] = useState(1);
  const [size, setSize] = useState(10);

  const [projectFilterObj, setProjectFilterObj] = useState({
    author_id: null,
    created_from: null,
    created_to: null,
    updated_from: null,
    updated_to: null,
    indexing: null,
    shared: null,
  });
  const [selectedActivityType, setSelectedActivityType] = useState(null);
  const { activeOrganization, roles, permission, searchUsers, allSuborgList } = organization;
  const [activeRole, setActiveRole] = useState('');
  const { activeTab, activityType } = admin;
  const [currentTab, setCurrentTab] = useState('all');
  const [users, setUsers] = useState(null);
  const [searchAlertToggler, setSearchAlertToggler] = useState(1);
  const [searchAlertTogglerStats, setSearchAlertTogglerStats] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryProject, setSearchQueryProject] = useState('');
  const [searchQueryStats, setSearchQueryStats] = useState('');
  const [searchQueryActivities, setSearchQueryActivities] = useState('');
  const [allProjectUserTab, setAllProjectUserTab] = useState(null);
  const [allProjectIndexTab, setAllProjectIndexTab] = useState(null);
  const [libraryReqSelected, setLibraryReqSelected] = useState(false);
  const [lmsProject, setLmsProject] = useState(null);
  const [defaultSso, setDefaultSso] = useState(null);
  const [ltiTool, setLtiTool] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [jobType, SetJobType] = useState({ value: 1, display_name: 'Pending' });
  const [logs, setLogs] = useState(null);
  const [logType, SetLogType] = useState({ value: 'all', display_name: 'All' });
  const [changeIndexValue, setChangeIndexValue] = useState('0');
  const [orderBy, setOrderBy] = useState('ASC');
  const dataRedux = useSelector((state) => state);
  useEffect(() => {
    setKey(modules?.[0]);
  }, [activeTab]);
  const searchUsersFromOrganization = async (query, page) => {
    if (query.length > 1) {
      const result = await dispatch(searchUserInOrganization(activeOrganization?.id, query, searchUsers ? activePage : 1, activeRole));
      if (result?.data?.length > 0) {
        setUsers(result);
        setSearchAlertToggler(1);
      } else {
        setSearchAlertToggler(0);
      }
    }
  };
  const searchQueryChangeHandler = async ({ target }) => {
    if (target.value.trim().length) {
      if (!!alphaNumeric(target.value)) {
        setSearchQuery(target.value);
      }
      searchUsersFromOrganization(target.value, activePage);
      setActivePage(searchUsers ? activePage : 1);
      if (target.value.trim().length > 1) setUsers(null);
    } else {
      dispatch(clearSearchUserInOrganization());
      setActivePage(1);
      setSearchQuery('');
      const result = await dispatch(getOrgUsers(activeOrganization?.id, 1, activeRole));
      setUsers(result);
    }
  };

  const searchProjectQueryChangeHandler = async (query, index, type) => {
    if (type === 'Library requests') {
      if (!!query) {
        setAllProjectIndexTab(null);
        const searchapi = adminService.userSerchIndexs(activeOrganization?.id, activePage, index, query);
        searchapi
          .then((data) => {
            setAllProjectIndexTab(data);
          })
          .catch((e) => setAllProjectIndexTab([]));
      } else {
        setActivePage(1);
        const searchapi = adminService.getAllProjectIndex(activeOrganization?.id, 1, index);
        searchapi.then((data) => {
          setAllProjectIndexTab(data);
        });
      }
    } else if (type === 'all') {
      if (!!query) {
        setAllProjectTab(null);
        const allproject = adminService.getAllProjectSearch(activeOrganization?.id, activePage, query);
        allproject
          .then((data) => {
            setAllProjectTab(data);
          })
          .catch((e) => setAllProjectTab([]));
      } else {
        setActivePage(1);
        const allproject = adminService.getAllProject(activeOrganization?.id, 1);
        allproject.then((data) => {
          setAllProjectTab(data);
        });
      }
    } else if (type === 'user') {
      if (!!query) {
        setAllProjectUserTab(null);
        const userproject = adminService.getUserProjectSearch(activeOrganization?.id, activePage, query);
        userproject
          .then((data) => {
            setAllProjectUserTab(data);
          })
          .catch((e) => setAllProjectUserTab([]));
      } else {
        setActivePage(1);
        const userproject = adminService.getUserProject(activeOrganization?.id, 1);
        userproject.then((data) => {
          setAllProjectUserTab(data);
        });
      }
    }
  };

  useMemo(() => {
    if (activeTab !== 'Users') setActiveRole(null);
  }, [activeTab]);

  useMemo(async () => {
    if (activeOrganization && type === 'Users' && subTypeState === 'All Users') {
      if (searchQuery.length > 1) {
        const result = await dispatch(searchUserInOrganization(activeOrganization?.id, searchQuery, activePage, activeRole));
        setUsers(result);
      } else if (organization?.users?.data?.length > 0 && activePage === organization?.activePage && !activeRole) {
        setUsers(organization?.users);
      } else if (activeRole) {
        const result = await dispatch(getOrgUsers(activeOrganization?.id, activePage, activeRole));
        setUsers(result);
      }
    }
    if (type === 'Organization') {
      dispatch(getsubOrgList(activeOrganization?.id, size, activePage));
    }
  }, [activeOrganization, activePage, type, subTypeState, activeTab, activeRole, organization?.users?.length, size]);
  // All Users Business Logic End

  useMemo(async () => {
    setAllProjectTab && setAllProjectTab(null);
    setAllProjectUserTab(null);
    setAllProjectIndexTab(null);
    if (activeOrganization && type === 'Project' && currentTab == 'Projects') {
      if (searchQueryProject) {
        const allproject = adminService.getAllProjectSearch(activeOrganization?.id, activePage, searchQueryProject, size);
        allproject
          .then((data) => {
            setAllProjectTab(data);
          })
          .catch((e) => setAllProjectTab([]));
      } else {
        const result = await adminService.getAllProject(
          activeOrganization?.id,
          activePage || 1,
          size,
          projectFilterObj.author_id || null,
          projectFilterObj.created_from || null,
          projectFilterObj.created_to || null,
          projectFilterObj.updated_from || null,
          projectFilterObj.updated_to || null,
          projectFilterObj.shared,
          projectFilterObj.indexing
        );
        setAllProjectTab(result);
      }
    } else if (activeOrganization && type === 'Project' && currentTab === 'Exported Projects') {
      if (searchQueryProject) {
        const userproject = adminService.getUserProjectSearch(activeOrganization?.id, activePage, searchQueryProject);
        userproject
          .then((data) => {
            setAllProjectUserTab(data);
          })
          .catch((e) => setAllProjectUserTab([]));
      } else {
        const result = await adminService.getAllExportedProject(activePage || 1);
        setAllProjectUserTab(result);
      }
    } else if (activeOrganization && type === 'Project' && currentTab === 'Library requests') {
      if (searchQueryProject) {
        const searchapi = adminService.userSerchIndexs(activeOrganization?.id, activePage, changeIndexValue, searchQueryProject, size);
        searchapi
          .then((data) => {
            setAllProjectIndexTab(data);
          })
          .catch((e) => setAllProjectIndexTab([]));
      } else {
        const result = await adminService.getAllProjectIndex(
          activeOrganization?.id,
          activePage || 1,
          changeIndexValue,
          size,
          projectFilterObj.author_id || undefined,
          projectFilterObj.created_from || undefined,
          projectFilterObj.created_to || undefined,
          projectFilterObj.updated_from || undefined,
          projectFilterObj.updated_to || undefined,
          projectFilterObj.shared
        );
        setAllProjectIndexTab(result);
      }
    }
  }, [activeOrganization?.id, type, activePage, changeIndexValue, currentTab, size, searchQueryProject]);
  // Activity Tab Business Logic
  useEffect(() => {
    if (type === 'Activities' && subTypeState === 'Activity Items') {
      //pagination
      dispatch(getActivityItems('', activePage));
      dispatch(updatePageNumber(activePage));
    } else if (type === 'Activities' && subTypeState === 'Activity Items' && activePage === 1) {
      //on page 1
      dispatch(getActivityItems());
      dispatch(updatePageNumber(activePage));
    }
  }, [type, subTypeState, activePage]);
  useEffect(() => {
    if (type === 'Activities' && subTypeState === 'Activity Types' && activePage !== organization?.activePage) {
      //pagination
      dispatch(loadResourceTypesAction('', activePage));
      dispatch(updatePageNumber(activePage));
    } else if (type === 'Activities' && subTypeState === 'Activity Types' && activePage === 1) {
      //on page 1
      dispatch(loadResourceTypesAction());
      dispatch(updatePageNumber(activePage));
    }
  }, [activePage, subTypeState, type]);
  const searchActivitiesQueryHandler = async (query, subTypeRecieved) => {
    if (subTypeRecieved === 'Activity Types') {
      if (query) {
        await dispatch(loadResourceTypesAction(query, ''));
      } else {
        await dispatch(loadResourceTypesAction());
      }
    } else if (subTypeRecieved === 'Activity Items') {
      if (query) {
        const encodeQuery = encodeURI(searchQueryActivities);
        await dispatch(getActivityItems(encodeQuery, ''));
      } else if (query === '') {
        await dispatch(getActivityItems());
      }
    }
  };
  // Stats User Report
  useEffect(() => {
    if (type === 'Stats' && subTypeState === 'Report' && searchQueryStats) {
      setUserReportStats(null);
      let result = dispatch(getUserReport('all', size, activePage, searchQueryStats));
      result.then((data) => {
        setUserReportStats(data);
      });
    } else if (type === 'Stats' && subTypeState === 'Report' && (activePage !== organization?.activePage || size !== organization?.size)) {
      //pagination
      setUserReportStats(null);
      let result = dispatch(getUserReport('all', size, activePage, ''));
      result.then((data) => {
        setUserReportStats(data);
      });
    } else if (type === 'Stats' && subTypeState === 'Report' && (activePage === 1 || size === 10)) {
      //on page 1
      setUserReportStats(null);
      let result = dispatch(getUserReport('all'));
      result.then((data) => {
        setUserReportStats(data);
      });
    }
    if (type === 'Stats' && subTypeState === 'Queues: Jobs' && searchQueryStats) {
      let result = dispatch(getJobListing(jobType.value, size, activePage, searchQueryStats));
      result.then((data) => setJobs(data.data));
    } else if (type === 'Stats' && subTypeState === 'Queues: Jobs' && (activePage !== organization?.activePage || size !== organization?.size) && jobType) {
      const result = dispatch(getJobListing(jobType.value, size, activePage));
      result.then((data) => {
        setJobs(data.data);
      });
    } else if (type === 'Stats' && subTypeState === 'Queues: Jobs' && (activePage === 1 || size === 10)) {
      const result = dispatch(getJobListing(jobType.value));
      result.then((data) => {
        setJobs(data.data);
      });
    }
    if (type === 'Stats' && subTypeState === 'Queues: Logs' && searchQueryStats) {
      let result = dispatch(getLogsListing(logType.value, size, activePage, searchQueryStats));
      result.then((data) => setLogs(data.data));
    } else if (type === 'Stats' && subTypeState === 'Queues: Logs' && (activePage !== organization?.activePage || size !== organization?.size) && logType) {
      const result = dispatch(getLogsListing(logType.value, size, activePage));
      result.then((data) => {
        setLogs(data.data);
      });
    } else if (type === 'Stats' && subTypeState === 'Queues: Logs' && (activePage === 1 || size === 10)) {
      const result = dispatch(getLogsListing(logType.value));
      result.then((data) => {
        setLogs(data.data);
      });
    }
  }, [activePage, subTypeState, type, size, jobType, logType]);
  const searchUserReportQueryHandler = async (query, subTypeRecieved) => {
    if (subTypeRecieved === 'Report') {
      if (query) {
        setUserReportStats(null);
        let result = await dispatch(getUserReport('all', size, undefined, query));
        setUserReportStats(result);
        if (result?.data?.length > 0) {
          setSearchAlertTogglerStats(1);
        } else {
          setSearchAlertTogglerStats(0);
        }
      } else {
        setUserReportStats(null);
        let result = await dispatch(getUserReport('all', size, 1));
        setUserReportStats(result);
        setActivePage(1);
      }
    }
    if (subTypeRecieved === 'Queues: Jobs') {
      if (query) {
        let result = dispatch(getJobListing(jobType.value, size, undefined, query));
        result.then((data) => {
          setJobs(data.data);
          if (data?.data?.length > 0) {
            setSearchAlertTogglerStats(1);
          } else {
            setSearchAlertTogglerStats(0);
          }
        });
      } else {
        let result = dispatch(getJobListing(jobType.value, size, activePage));
        result.then((data) => setJobs(data.data));
      }
    }
    if (subTypeRecieved === 'Queues: Logs') {
      if (query) {
        let result = dispatch(getLogsListing(logType.value, size, undefined, query));
        result.then((data) => {
          setLogs(data.data);
          if (data?.data?.length > 0) {
            setSearchAlertTogglerStats(1);
          } else {
            setSearchAlertTogglerStats(0);
          }
        });
      } else {
        let result = dispatch(getLogsListing(logType.value, size, activePage));
        result.then((data) => setLogs(data.data));
      }
    }
  };
  //LMS project ***************************************
  useMemo(async () => {
    if (type === 'LMS') {
      dispatch(getLmsProject(activeOrganization?.id, activePage || 1));
    }
    if (type === 'LMS') {
      dispatch(getLtiTools(activeOrganization?.id, activePage || 1));
    }
  }, [type, activePage, activeOrganization?.id]);

  useEffect(() => {
    if (dataRedux.admin.ltiTools) {
      setLtiTool(dataRedux.admin.ltiTools);
    }
  }, [dataRedux.admin.ltiTools]);

  useEffect(() => {
    if (dataRedux.admin.defaultSso) {
      setDefaultSso(dataRedux.admin.defaultSso);
    }
  }, [dataRedux.admin.defaultSso]);

  useEffect(() => {
    if (dataRedux.admin.lmsIntegration) {
      setLmsProject(dataRedux.admin.lmsIntegration);
    }
  }, [dataRedux.admin.lmsIntegration]);

  const searchQueryChangeHandlerLMS = (search) => {
    setLmsProject(null);
    const encodeQuery = encodeURI(search.target.value);
    const result = adminService.getLmsProjectSearch(activeOrganization?.id, encodeQuery, activePage || 1);
    result.then((data) => {
      setLmsProject(data);
    });
  };

  //Default SSO ***************************************
  useMemo(async () => {
    if (type === 'DefaultSso') {
      dispatch(getDefaultSso(activeOrganization?.id, activePage || 1));
    }
  }, [type, activePage, activeOrganization?.id]);

  const searchQueryChangeHandlerDefautSso = (search) => {
    setDefaultSso(null);
    const encodeQuery = encodeURI(search.target.value);
    const result = adminService.searchDefaultSso(activeOrganization?.id, encodeQuery, activePage || 1);
    result.then((data) => {
      setDefaultSso(data);
    });
  };

  const searchQueryChangeHandlerLtiTool = (search) => {
    setLtiTool(null);
    const encodeQuery = encodeURI(search.target.value);
    const result = adminService.searchLtiTool(activeOrganization?.id, encodeQuery, activePage || 1);
    result.then((data) => {
      setLtiTool(data);
    });
  };
  useEffect(() => {
    if (subTypeState === 'Library requests') {
      setActivePage(1);
      setCurrentTab('Library requests');
      setChangeIndexValue(0);
    } else if (subTypeState === 'Projects') {
      setActivePage(1);
      setCurrentTab('Projects');
      setKey('Projects');
    }
  }, [subTypeState]);
  useEffect(() => {
    if (activeTab === 'Project') {
      setSubTypeState('Projects');
      setCurrentTab('all');
    } else if (activeTab === 'Activities') {
      setSubTypeState('Activity Types');
    } else if (activeTab === 'Users') {
      setSubTypeState('All Users');
    }
    // else if (activeTab === 'Stats') {
    //   setSubTypeState('Report');
    // }
    else if (activeTab === 'Organization') {
      setSubTypeState('All Organizations');
    } else if (activeTab === 'LMS') {
      setSubTypeState('All Settings');
    }
  }, [activeTab]);
  const filterSearch = useCallback(() => {
    if (subTypeState === 'Library requests') {
      const libraryrequest = adminService.getAllProjectIndex(
        activeOrganization?.id,
        activePage,
        projectFilterObj.indexing || 0,
        size,
        projectFilterObj.author_id || undefined,
        projectFilterObj.created_from || undefined,
        projectFilterObj.created_to || undefined,
        projectFilterObj.updated_from || undefined,
        projectFilterObj.updated_to || undefined,
        projectFilterObj.shared
      );
      libraryrequest
        .then((data) => {
          setAllProjectIndexTab(data);
        })
        .catch((e) => setAllProjectIndexTab([]));
    } else {
      const allproject = adminService.getAllProject(
        activeOrganization?.id,
        activePage,
        size,
        projectFilterObj.author_id || null,
        projectFilterObj.created_from || null,
        projectFilterObj.created_to || null,
        projectFilterObj.updated_from || null,
        projectFilterObj.updated_to || null,
        projectFilterObj.shared,
        projectFilterObj.indexing
      );
      allproject
        .then((data) => {
          setAllProjectTab(data);
        })
        .catch((e) => setAllProjectTab([]));
    }
  }, [projectFilterObj]);

  const handleSort = (column, subType) => {
    if (subType == 'LTI Tools') {
      //mapping column with db column for making it dynamic
      let col = '';
      switch (column) {
        case 'Name':
          col = 'tool_name';
          break;
        default:
          col = 'tool_name';
      }
      dispatch(getLtiToolsOrderBy(activeOrganization?.id, col, orderBy, activePage || 1));
      let order = orderBy == 'ASC' ? 'DESC' : 'ASC';
      setOrderBy(order);
    }
  };
  const resetProjectFilter = () => {
    setProjectFilterObj({
      author_id: null,
      created_from: null,
      created_to: null,
      updated_from: null,
      updated_to: null,
      shared: null,
      indexing: null,
    });
    if (subTypeState === 'Library requests') {
      const libraryrequest = adminService.getAllProjectIndex(activeOrganization?.id, activePage, changeIndexValue, size);
      libraryrequest
        .then((data) => {
          setAllProjectIndexTab(data);
        })
        .catch((e) => setAllProjectIndexTab([]));
    } else {
      const allproject = adminService.getAllProject(activeOrganization?.id, activePage, size);
      allproject
        .then((data) => {
          setAllProjectTab(data);
        })
        .catch((e) => setAllProjectTab([]));
    }
  };
  return (
    <Tabs
      defaultActiveKey={modules && modules[0]}
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(key) => {
        setSubTypeState(key);
        setKey(key);
        setActivePage(1);
        setSearchQueryProject('');
        setSearchAlertTogglerStats(1);
        dispatch(resetPageNumber());
        setSearchQueryStats('');
        if (key === 'Projects') {
          setCurrentTab('all');
        } else if (key === 'Exported Projects') {
          setCurrentTab('Exported Projects');
        }
        // else if (key === 'Library requests') {
        //   setCurrentTab('Library requests');
        //   setChangeIndexValue(0);
        // }
      }}
    >
      {modules?.map((asset) => (
        <Tab key={asset} eventKey={asset} title={asset}>
          <div key={asset} className="module-content-inner">
            {type === 'Stats' && subTypeState === 'Report' && (
              <Starter
                paginationCounter={true}
                search={true}
                print={true}
                data={userReportsStats}
                searchUserReportQueryHandler={searchUserReportQueryHandler}
                btnText=""
                btnAction=""
                searchQueryStats={searchQueryStats}
                setSearchQueryStats={setSearchQueryStats}
                searchAlertTogglerStats={searchAlertTogglerStats}
                subTypeState={subTypeState}
                importUser={false}
                filter={true}
                size={size}
                setSize={setSize}
                activePage={activePage}
                setActivePage={setActivePage}
                tableHead={columnData.statereport}
                sortCol={[]}
                handleSort={handleSort}
                type={type}
              />
            )}
            {type === 'Stats' && subTypeState === 'Queues: Jobs' && (
              <Starter
                paginationCounter={true}
                search={true}
                print={false}
                data={jobs}
                btnText=""
                subTypeState={subTypeState}
                searchUserReportQueryHandler={searchUserReportQueryHandler}
                size={size}
                jobType={jobType}
                SetJobType={SetJobType}
                setSize={setSize}
                activePage={activePage}
                btnAction=""
                searchQueryStats={searchQueryStats}
                setSearchQueryStats={setSearchQueryStats}
                searchAlertTogglerStats={searchAlertTogglerStats}
                importUser={false}
                filter={true}
                setActivePage={setActivePage}
                tableHead={columnData.statejobs}
                sortCol={[]}
                handleSort={handleSort}
                type={type}
              />
            )}
            {type === 'Stats' && subTypeState === 'Queues: Logs' && (
              <Starter
                paginationCounter={true}
                search={true}
                print={false}
                data={logs}
                btnText=""
                subTypeState={subTypeState}
                searchUserReportQueryHandler={searchUserReportQueryHandler}
                size={size}
                logType={logType}
                SetLogType={SetLogType}
                setSize={setSize}
                btnAction=""
                searchQueryStats={searchQueryStats}
                setSearchQueryStats={setSearchQueryStats}
                searchAlertTogglerStats={searchAlertTogglerStats}
                importUser={false}
                filter={true}
                activePage={activePage}
                setActivePage={setActivePage}
                tableHead={columnData.statelogs}
                sortCol={[]}
                handleSort={handleSort}
                type={type}
              />
            )}
            {type === 'Users' && subTypeState === 'All Users' && (
              <Starter
                paginationCounter={true}
                search={true}
                print={false}
                btnText="Add user"
                btnAction="create_user"
                importUser={true}
                filter={false}
                tableHead={columnData.userall}
                sortCol={[]}
                handleSort={handleSort}
                data={users}
                activePage={activePage}
                size={size}
                setSize={setSize}
                activeRole={activeRole}
                setActiveRole={setActiveRole}
                subTypeState={'All Users'}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                searchQueryChangeHandler={searchQueryChangeHandler}
                searchAlertToggler={searchAlertToggler}
                setActivePage={setActivePage}
                type={type}
                roles={roles}
                inviteUser={true}
              />
            )}
            {type === 'Users' && subTypeState === 'Manage Roles' && (
              <Starter
                paginationCounter={false}
                search={false}
                print={false}
                btnText="Add Role"
                btnAction="add_role"
                importUser={false}
                filter={false}
                subTypeState={subTypeState}
                tableHead={[]}
                sortCol={[]}
                handleSort={handleSort}
                data={[]}
                activeRole={activeRole}
                setActiveRole={setActiveRole}
                type={type}
                roles={roles}
                permissionRender={permission?.Organization?.includes('organization:view-role')}
              />
            )}
            {type === 'Organization' && (
              <Starter
                search={true}
                print={false}
                btnText="Add Organization"
                btnAction="add_org"
                importUser={false}
                filter={false}
                tableHead={columnData.organization}
                sortCol={[]}
                handleSort={handleSort}
                paginationCounter={true}
                size={size}
                setSize={setSize}
                data={allSuborgList}
                type={type}
                activePage={activePage}
                setActivePage={setActivePage}
              />
            )}

            {type === 'LMS' && subTypeState === 'All Settings' && (
              <Starter
                paginationCounter={true}
                size={size}
                setSize={setSize}
                subType={'All Settings'}
                search={true}
                print={false}
                btnText="Create New LMS"
                btnAction="add_lms"
                importUser={false}
                filter={false}
                tableHead={columnData.lmssettings}
                sortCol={[]}
                handleSort={handleSort}
                data={lmsProject}
                type={type}
                setActivePage={setActivePage}
                activePage={activePage}
                searchQueryChangeHandler={searchQueryChangeHandlerLMS}
              />
            )}

            {type === 'Project' && subTypeState === 'Projects' && !libraryReqSelected && (
              <Starter
                paginationCounter={true}
                size={size}
                setSize={setSize}
                search={true}
                tableHead={columnData.projectAll}
                sortCol={[]}
                handleSort={handleSort}
                data={allProjectTab}
                searchProjectQueryChangeHandler={searchProjectQueryChangeHandler}
                type={type}
                importUser={true}
                searchQueryProject={searchQueryProject}
                setSearchQueryProject={setSearchQueryProject}
                setActivePage={setActivePage}
                activePage={activePage}
                subType={'all'}
                setSubTypeState={setSubTypeState}
                projectFilterObj={projectFilterObj}
                setProjectFilterObj={setProjectFilterObj}
                filterSearch={filterSearch}
                libraryReqSelected={libraryReqSelected}
                setLibraryReqSelected={setLibraryReqSelected}
                setCurrentTab={setCurrentTab}
                setAllProjectTab={setAllProjectTab}
                resetProjectFilter={resetProjectFilter}
                setModalShow={setModalShow}
                setrowData={setrowData}
                setActivePageNumber={setActivePageNumber}
              />
            )}
            {type === 'Project' && subTypeState === 'Exported Projects' && (
              <Starter
                paginationCounter={false}
                search={false}
                tableHead={columnData.projectUser}
                sortCol={[]}
                handleSort={handleSort}
                data={allProjectUserTab}
                type={type}
                setActivePage={setActivePage}
                activePage={activePage}
                subType="Exported Projects"
                setCurrentTab={setCurrentTab}
                searchQueryProject={searchQueryProject}
                setSearchQueryProject={setSearchQueryProject}
                searchProjectQueryChangeHandler={searchProjectQueryChangeHandler}
              />
            )}
            {type === 'Project' && subTypeState === 'Library requests' && libraryReqSelected && (
              <Starter
                paginationCounter={true}
                size={size}
                setSize={setSize}
                search={true}
                tableHead={columnData.projectIndex}
                sortCol={[]}
                handleSort={handleSort}
                data={allProjectIndexTab}
                type={type}
                searchQuery={searchQuery}
                setSubTypeState={setSubTypeState}
                searchProjectQueryChangeHandler={searchProjectQueryChangeHandler}
                searchAlertToggler={searchAlertToggler}
                setActivePage={setActivePage}
                activePage={activePage}
                subType="Library requests"
                setAllProjectIndexTab={setAllProjectIndexTab}
                setCurrentTab={setCurrentTab}
                filter={true}
                searchQueryProject={searchQueryProject}
                setSearchQueryProject={setSearchQueryProject}
                changeIndexValue={changeIndexValue}
                setChangeIndexValue={setChangeIndexValue}
                libraryReqSelected={libraryReqSelected}
                setLibraryReqSelected={setLibraryReqSelected}
                resetProjectFilter={resetProjectFilter}
                projectFilterObj={projectFilterObj}
                setProjectFilterObj={setProjectFilterObj}
                filterSearch={filterSearch}
              />
            )}
            {type === 'Activities' && subTypeState === 'Activity Types' && (
              <Starter
                search={true}
                tableHead={columnData.ActivityTypes}
                sortCol={[]}
                handleSort={handleSort}
                subType={'Activity Types'}
                searchQueryActivities={searchQueryActivities}
                setSearchQueryActivities={setSearchQueryActivities}
                searchActivitiesQueryHandler={searchActivitiesQueryHandler}
                btnText="Add Activity Type"
                btnAction="add_activity_type"
                data={activityTypes}
                type={type}
                setActivePage={setActivePage}
                activePage={activePage}
              />
            )}
            {type === 'Activities' && subTypeState === 'Activity Items' && (
              <Starter
                search={true}
                tableHead={columnData.ActivityItems}
                sortCol={[]}
                handleSort={handleSort}
                subType={'Activity Items'}
                searchQueryActivities={searchQueryActivities}
                setSearchQueryActivities={setSearchQueryActivities}
                searchActivitiesQueryHandler={searchActivitiesQueryHandler}
                btnText="Add Activity Item"
                btnAction="add_activity_item"
                data={activityItems}
                type={type}
                setActivePage={setActivePage}
                activePage={activePage}
                paginationCounter={true}
                size={size}
                setSize={setSize}
                selectedActivityType={selectedActivityType}
                setSelectedActivityType={setSelectedActivityType}
              />
            )}
            {type === 'Settings' && subTypeState === 'All settings' && <Starter type={type} subType={'All settings'} subTypeState={subTypeState} />}
            {type === 'DefaultSso' && (
              <Starter
                paginationCounter={true}
                size={size}
                setSize={setSize}
                search={true}
                print={false}
                btnText="Create New Default SSO"
                btnAction="add_default_sso"
                importUser={false}
                filter={false}
                tableHead={columnData.defaultsso}
                sortCol={[]}
                handleSort={handleSort}
                data={defaultSso}
                type={type}
                setActivePage={setActivePage}
                activePage={activePage}
                searchQueryChangeHandler={searchQueryChangeHandlerDefautSso}
              />
            )}
            {type === 'LMS' && subTypeState === 'LTI Tools' && (
              <Starter
                paginationCounter={true}
                size={size}
                setSize={setSize}
                subType={'LTI Tools'}
                search={true}
                print={false}
                btnText="Create New LTI Tool"
                btnAction="add_lti_tool"
                importUser={false}
                filter={false}
                tableHead={columnData.ltitool}
                sortCol={columnData.ltitoolSortCol}
                handleSort={handleSort}
                handleSort={handleSort}
                data={ltiTool}
                type={type}
                setActivePage={setActivePage}
                activePage={activePage}
                searchQueryChangeHandler={searchQueryChangeHandlerLtiTool}
              />
            )}
          </div>
        </Tab>
      ))}
    </Tabs>
  );
}

Pills.propTypes = {
  manage: PropTypes.object,
  type: PropTypes.string.isRequired,
};
