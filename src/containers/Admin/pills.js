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
import {
  getJobListing,
  getLogsListing,
  getLtiTools,
  getLtiToolsOrderBy,
  getUserReport,
  getDefaultSso,
  getLmsProject,
  getSubjects,
  getEducationLevel,
  getAuthorTag,
  getActivityTypes,
  getActivityLayout,
  teamsActionAdminPanel,
} from 'store/actions/admin';
import { allBrightCove, allBrightCoveSearch } from 'store/actions/videos';
import { alphaNumeric } from 'utils';
import { educationLevels } from 'components/ResourceCard/AddResource/dropdownData';

export default function Pills(props) {
  const { modules, type, subType, allProjectTab, setAllProjectTab, setModalShow, setModalShowTeam, setrowData, setActivePageNumber, users, setUsers } = props;

  const [key, setKey] = useState(modules?.filter((data) => !!data)[0]);

  const [subTypeState, setSubTypeState] = useState(subType);
  // All User Business Logic Start
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const { activityTypes, activityItems, usersReport, allbrightCove, teams } = useSelector((state) => state.admin);
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
  const [currentTab, setCurrentTab] = useState('All Projects');

  const [searchAlertToggler, setSearchAlertToggler] = useState(1);
  const [searchAlertTogglerStats, setSearchAlertTogglerStats] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchQueryProject, setSearchQueryProject] = useState('');
  const [searchQueryStats, setSearchQueryStats] = useState('');
  const [searchQueryActivities, setSearchQueryActivities] = useState('');
  const [searchQueryTeam, setSearchQueryTeam] = useState('');
  const [allProjectUserTab, setAllProjectUserTab] = useState(null);
  const [allProjectIndexTab, setAllProjectIndexTab] = useState(null);
  const [libraryReqSelected, setLibraryReqSelected] = useState(false);
  const [lmsProject, setLmsProject] = useState(null);
  const [lmsBrightCove, setlmsBrightCove] = useState(null);
  const [defaultSso, setDefaultSso] = useState(null);
  const [ltiTool, setLtiTool] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [jobType, SetJobType] = useState({ value: 1, display_name: 'Pending' });
  const [logs, setLogs] = useState(null);
  const [logType, SetLogType] = useState({ value: 'all', display_name: 'All' });
  const [changeIndexValue, setChangeIndexValue] = useState('0');
  const [orderBy, setOrderBy] = useState('asc');
  const dataRedux = useSelector((state) => state);
  const [subjects, setSubjects] = useState(null);
  const [educationLevel, setEducationLevel] = useState(null);
  const [authorTag, setAuthorTag] = useState(null);
  const [activityLayout, setActivityLayout] = useState(null);
  useEffect(() => {
    setKey(modules?.filter((data) => !!data)[0]);
  }, [activeTab]);
  useEffect(() => {
    setlmsBrightCove(allbrightCove);
  }, [allbrightCove]);
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
    // if (type === 'Library requests') {
    //   if (!!query) {
    //     setAllProjectIndexTab(null);
    //     const searchapi = adminService.userSerchIndexs(activeOrganization?.id, activePage, index, query);
    //     searchapi
    //       .then((data) => {
    //         setAllProjectIndexTab(data);
    //       })
    //       .catch((e) => setAllProjectIndexTab([]));
    //   } else {
    //     setActivePage(1);
    //     const searchapi = adminService.getAllProjectIndex(activeOrganization?.id, 1, index);
    //     searchapi.then((data) => {
    //       setAllProjectIndexTab(data);
    //     });
    //   }
    // } else
    if (type === 'All Projects') {
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
        const result = await dispatch(getOrgUsers(activeOrganization?.id, activePage, activeRole, size));
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
    if (activeOrganization && type === 'Projects' && currentTab == 'All Projects') {
      if (libraryReqSelected) {
        if (searchQueryProject) {
          const allproject = adminService.userSerchIndexs(activeOrganization?.id, activePage, 1, searchQueryProject, size);
          allproject
            .then((data) => {
              setAllProjectTab(data);
            })
            .catch((e) => setAllProjectTab([]));
        } else {
          const result = await adminService.getAllProjectIndex(
            activeOrganization?.id,
            activePage || 1,
            1,
            size,
            projectFilterObj.author_id || undefined,
            projectFilterObj.created_from || undefined,
            projectFilterObj.created_to || undefined,
            projectFilterObj.updated_from || undefined,
            projectFilterObj.updated_to || undefined,
            projectFilterObj.shared
          );
          setAllProjectTab(result);
        }
      } else {
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
      }
    } else if (activeOrganization && type === 'Projects' && currentTab === 'Exported Projects') {
      if (searchQueryProject) {
        const userproject = adminService.getAllExportedProject(activePage, size, searchQueryProject);
        userproject
          .then((data) => {
            setAllProjectUserTab(data);
          })
          .catch((e) => setAllProjectUserTab([]));
      } else {
        const result = await adminService.getAllExportedProject(activePage || 1, size);
        setAllProjectUserTab(result);
      }
    }
    //  if (activeOrganization && type === 'Projects' && currentTab === 'Library requests') {
    //   if (searchQueryProject) {
    //     const searchapi = adminService.userSerchIndexs(activeOrganization?.id, activePage, changeIndexValue, searchQueryProject, size);
    //     searchapi
    //       .then((data) => {
    //         setAllProjectIndexTab(data);
    //       })
    //       .catch((e) => setAllProjectIndexTab([]));
    //   } else {
    //     const result = await adminService.getAllProjectIndex(
    //       activeOrganization?.id,
    //       activePage || 1,
    //       changeIndexValue,
    //       size,
    //       projectFilterObj.author_id || undefined,
    //       projectFilterObj.created_from || undefined,
    //       projectFilterObj.created_to || undefined,
    //       projectFilterObj.updated_from || undefined,
    //       projectFilterObj.updated_to || undefined,
    //       projectFilterObj.shared
    //     );
    //     setAllProjectIndexTab(result);
    //   }
    // }
  }, [activeOrganization?.id, type, activePage, changeIndexValue, currentTab, size, searchQueryProject, libraryReqSelected]);
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
    if (type === 'Activities' && activePage) {
      //pagination
      dispatch(getActivityTypes(activePage));
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
    if (type === 'LMS') {
      dispatch(allBrightCove(activeOrganization?.id, size, activePage || 1));
    }
  }, [type, size, activePage, activeOrganization?.id]);

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

  useMemo(async () => {
    if (subTypeState === 'Subjects') {
      dispatch(getSubjects(activeOrganization?.id, activePage || 1));
    }
    if (subTypeState === 'Education Level') {
      dispatch(getEducationLevel(activeOrganization?.id, activePage || 1));
    }
    if (subTypeState === 'Author Tags') {
      dispatch(getAuthorTag(activeOrganization?.id, activePage || 1));
    }
    if (type === 'Activities') {
      dispatch(getActivityLayout(activeOrganization?.id, activePage || 1));
    }
  }, [type, subTypeState, activePage, activeOrganization?.id]);

  useEffect(() => {
    if (dataRedux.admin.subjects) {
      setSubjects(dataRedux.admin.subjects);
    }
  }, [dataRedux.admin.subjects]);

  useEffect(() => {
    if (dataRedux.admin.education_level) {
      setEducationLevel(dataRedux.admin.education_level);
    }
  }, [dataRedux.admin.education_level]);

  useEffect(() => {
    if (dataRedux.admin.author_tags) {
      setAuthorTag(dataRedux.admin.author_tags);
    }
  }, [dataRedux.admin.author_tags]);
  
  useEffect(() => {
    if (dataRedux.admin.activity_layouts) {
      setActivityLayout(dataRedux.admin.activity_layouts);
    }
  }, [dataRedux.admin.activity_layouts]);

  const searchQueryChangeHandlerLMS = (search) => {
    setLmsProject(null);
    const encodeQuery = encodeURI(search.target.value);
    const result = adminService.getLmsProjectSearch(activeOrganization?.id, encodeQuery, activePage || 1);
    result.then((data) => {
      setLmsProject(data);
    });
  };

  const searchQueryChangeHandlerLMSBrightCove = (search) => {
    setlmsBrightCove(null);
    const encodeQuery = encodeURI(search.target.value);
    dispatch(allBrightCoveSearch(activeOrganization?.id, encodeQuery, size, activePage || 1));
  };

  const searchQueryChangeHandlerActivityItems = (search) => {
    // setlmsBrightCove(null);
    const encodeQuery = encodeURI(search.target.value);
    dispatch(getActivityItems(encodeQuery, activePage || 1));
  };
  
  const searchQueryChangeHandlerActivityLayouts = (search) => {
    // setlmsBrightCove(null);
    const encodeQuery = encodeURI(search.target.value);
    dispatch(getActivityLayout(activePage || 1, 10, encodeQuery));
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
  
  const filterLtiTool = (item) => {
    setLtiTool(null);
    const result = adminService.searchLtiTool(activeOrganization?.id, item, activePage || 1);
    result.then((data) => {
      setLtiTool(data);
    });
  };
  useEffect(() => {
    // if (subTypeState === 'Library requests') {
    //   setActivePage(1);
    //   setCurrentTab('Library requests');
    //   setChangeIndexValue(0);
    // } else
    if (subTypeState === 'All Projects') {
      setActivePage(1);
      setCurrentTab('All Projects');
      setKey('All Projects');
    }
  }, [subTypeState]);
  useEffect(() => {
    if (activeTab === 'Projects') {
      setSubTypeState(key);
      setCurrentTab(key);
      setLibraryReqSelected(false);
    } else {
      setSubTypeState(key);
    }
  }, [activeTab, key]);

  useEffect(() => {
    if (activeOrganization && type === 'Teams') {
      dispatch(teamsActionAdminPanel(activeOrganization?.id, searchQueryTeam, activePage, size, undefined, undefined))
    }
  }, [size, activePage, activeOrganization, searchQueryTeam]);

  const filterSearch = useCallback(() => {
    setAllProjectTab(null);
    if (libraryReqSelected) {
      const libraryrequest = adminService.getAllProjectIndex(
        activeOrganization?.id,
        activePage,
        1,
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
          setAllProjectTab(data);
        })
        .catch((e) => setAllProjectTab([]));
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

  const handleSort = async (column, subType) => {
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
      let order = orderBy == 'asc' ? 'desc' : 'asc';
      setOrderBy(order);
    } else if (subType == 'Activity Types') {
      //mapping column with db column for making it dynamic
      let col = '';
      switch (column) {
        case 'Order':
          col = 'order';
          break;
        default:
          col = 'order';
      }
      dispatch(getActivityTypes(activePage || 1, col, orderBy));
      let order = orderBy == 'asc' ? 'desc' : 'asc';
      setOrderBy(order);
    } else if (subType == 'Activity Items') {
      //mapping column with db column for making it dynamic
      let col = '';
      switch (column) {
        case 'Order':
          col = 'order';
          break;
        default:
          col = 'order';
      }
      dispatch(getActivityItems('', activePage || 1, col, orderBy,));
      let order = orderBy == 'asc' ? 'desc' : 'asc';
      setOrderBy(order);
    } else if (subType == 'Activity Layouts') {
      //mapping column with db column for making it dynamic
      let col = '';
      switch (column) {
        case 'Order':
          col = 'order';
          break;
        default:
          col = 'order';
      }
      dispatch(getActivityLayout(activeOrganization?.id, activePage || 1, '', '', col, orderBy));
      let order = orderBy == 'asc' ? 'desc' : 'asc';
      setOrderBy(order);
    } else if (subType == 'Subjects') {
      //mapping column with db column for making it dynamic
      let col = '';
      switch (column) {
        case 'Order':
          col = 'order';
          break;
        default:
          col = 'order';
      }
      dispatch(getSubjects(activeOrganization?.id, activePage || 1, '', '', col, orderBy,));
      let order = orderBy == 'asc' ? 'desc' : 'asc';
      setOrderBy(order);
    } else if (subType == 'Education Level') {
      //mapping column with db column for making it dynamic
      let col = '';
      switch (column) {
        case 'Order':
          col = 'order';
          break;
        default:
          col = 'order';
      }
      dispatch(getEducationLevel(activeOrganization?.id, activePage || 1, '', '', col, orderBy));
      let order = orderBy == 'asc' ? 'desc' : 'asc';
      setOrderBy(order);
    } else if (subType == 'Author Tags') {
      //mapping column with db column for making it dynamic
      let col = '';
      switch (column) {
        case 'Order':
          col = 'order';
          break;
        default:
          col = 'order';
      }
      dispatch(getAuthorTag(activeOrganization?.id, activePage || 1, '', '', col, orderBy));
      let order = orderBy == 'asc' ? 'desc' : 'asc';
      setOrderBy(order);
    } else if (subType == 'Organization') {
      //mapping column with db column for making it dynamic
      let col = '';
      switch (column) {
        case 'Name':
          col = 'name';
          break;
        default:
          col = 'name';
      }
      dispatch(getsubOrgList(activeOrganization?.id, size, activePage || 1, '', col, orderBy));
      let order = orderBy == 'asc' ? 'desc' : 'asc';
      setOrderBy(order);
    } else if (subType == 'DefaultSso') {
      //mapping column with db column for making it dynamic
      let col = '';
      switch (column) {
        case 'Site Name':
          col = 'site_name';
          break;
        default:
          col = 'site_name';
      }
      dispatch(getDefaultSso(activeOrganization?.id, activePage || 1, 10, '', col, orderBy));
      let order = orderBy == 'asc' ? 'desc' : 'asc';
      setOrderBy(order);
    } else if (subType == 'All settings') {
      //mapping column with db column for making it dynamic
      let col = '';
      switch (column) {
        case 'Type':
          col = 'lms_name';
          break;
        default:
          col = 'lms_name';
      }
      dispatch(getLmsProject(activeOrganization?.id, activePage || 1, 10, '', col, orderBy));
      let order = orderBy == 'asc' ? 'desc' : 'asc';
      setOrderBy(order);
    } else if (subType == 'All Users') {
      //mapping column with db column for making it dynamic
      let col = '';
      switch (column) {
        case 'First Name':
          col = 'first_name';
          break;
        default:
          col = 'first_name';
      }
      const result = await dispatch(getOrgUsers(activeOrganization?.id, activePage, activeRole, 10, '', col, orderBy));
      setUsers(result)
      let order = orderBy == 'asc' ? 'desc' : 'asc';
      setOrderBy(order);
    } else if (subType == 'All Projects') {
      //mapping column with db column for making it dynamic
      let col = '';
      switch (column) {
        case 'Created':
          col = 'created_at';
          break;
        default:
          col = 'created_at';
      }
      const result = await adminService.getAllProjectSearch(activeOrganization?.id, activePage, '', 10, col, orderBy);
      setAllProjectTab(result);
      let order = orderBy == 'asc' ? 'desc' : 'asc';
      setOrderBy(order);
    } else if (subType == 'Exported Projects') {
      //mapping column with db column for making it dynamic
      let col = '';
      switch (column) {
        case 'Created Date':
          col = 'created_at';
          break;
        default:
          col = 'created_at';
      }
      const result = await adminService.getAllExportedProject(activePage || 1, 10, '', col, orderBy);
      setAllProjectUserTab(result);
      let order = orderBy == 'asc' ? 'desc' : 'asc';
      setOrderBy(order);
    } else if (subType == 'All teams') {
      dispatch(teamsActionAdminPanel(activeOrganization?.id, '', activePage, size, 'created_at', orderBy));
      let order = orderBy == 'ASC' ? 'DESC' : 'ASC';
      setOrderBy(order);
    }
  };
  const resetProjectFilter = () => {
    setAllProjectTab(null);
    setProjectFilterObj({
      author_id: null,
      created_from: null,
      created_to: null,
      updated_from: null,
      updated_to: null,
      shared: null,
      indexing: null,
    });
    if (libraryReqSelected) {
      const libraryrequest = adminService.getAllProjectIndex(activeOrganization?.id, activePage, 1, size);
      libraryrequest
        .then((data) => {
          setAllProjectTab(data);
        })
        .catch((e) => setAllProjectTab([]));
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
      defaultActiveKey={modules?.filter((data) => !!data)[0]}
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
        if (key === 'Exported Projects') {
          setCurrentTab('Exported Projects');
          setLibraryReqSelected(false);
        } else if (key === 'All Projects' || libraryReqSelected) {
          setCurrentTab('All Projects');
          setLibraryReqSelected(false);
        }
      }}
    >
      {modules
        ?.filter((data) => !!data)
        ?.map((asset) => (
          <Tab key={asset} eventKey={asset} title={asset}>
            <div key={asset} className="module-content-inner">
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
                  sortCol={columnData.userallSortCol}
                  handleSort={handleSort}
                  data={users}
                  activePage={activePage}
                  size={size}
                  setSize={setSize}
                  activeRole={activeRole}
                  setActiveRole={setActiveRole}
                  subTypeState={'All Users'}
                  subType={'All Users'}
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
                  subType="Manage Roles"
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
                  sortCol={columnData.organizationSortCol}
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

              {type === 'LMS' && subTypeState === 'All settings' && (
                <Starter
                  paginationCounter={true}
                  size={size}
                  setSize={setSize}
                  subType={'All settings'}
                  search={true}
                  print={false}
                  btnText="Add LMS settings"
                  btnAction="add_lms"
                  importUser={false}
                  filter={false}
                  tableHead={columnData.lmssettings}
                  sortCol={columnData.lmssettingsSortCol}
                  handleSort={handleSort}
                  data={lmsProject}
                  type={type}
                  setActivePage={setActivePage}
                  activePage={activePage}
                  searchQueryChangeHandler={searchQueryChangeHandlerLMS}
                />
              )}
              {type === 'LMS' && subTypeState === 'BrightCove' && (
                <Starter
                  paginationCounter={true}
                  size={size}
                  setSize={setSize}
                  subType={'BrightCove'}
                  search={true}
                  print={false}
                  btnText="Add New Entry"
                  btnAction="add_brightcove"
                  importUser={false}
                  filter={false}
                  tableHead={columnData.IntegrationBrightCove}
                  sortCol={[]}
                  handleSort={handleSort}
                  data={lmsBrightCove}
                  type={type}
                  searchQuery={searchQuery}
                  setActivePage={setActivePage}
                  activePage={activePage}
                  searchQueryChangeHandler={searchQueryChangeHandlerLMSBrightCove}
                />
              )}

              {type === 'Projects' && subTypeState === 'All Projects' && (
                <Starter
                  paginationCounter={true}
                  size={size}
                  setSize={setSize}
                  search={true}
                  tableHead={columnData.projectAll}
                  sortCol={columnData.projectAllSortCol}
                  handleSort={handleSort}
                  data={allProjectTab}
                  searchProjectQueryChangeHandler={searchProjectQueryChangeHandler}
                  type={type}
                  importUser={true}
                  searchQueryProject={searchQueryProject}
                  setSearchQueryProject={setSearchQueryProject}
                  setActivePage={setActivePage}
                  activePage={activePage}
                  subType={'All Projects'}
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
              {type === 'Projects' && subTypeState === 'Exported Projects' && (
                <Starter
                  paginationCounter={true}
                  size={size}
                  setSize={setSize}
                  search={false}
                  tableHead={columnData.projectUser}
                  sortCol={columnData.projectUserSortCol}
                  search={true}
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
              {/* {type === 'Projects' && subTypeState === 'Library requests' && (
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
            )} */}

              {type === 'Activities' && subTypeState === 'Activity Types' && (
                <Starter
                  search={true}
                  tableHead={columnData.ActivityTypes}
                  sortCol={columnData.ActivityTypesSortCol}
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
                  sortCol={columnData.ActivityItemsSortCol}
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
                  searchQueryChangeHandler={searchQueryChangeHandlerActivityItems}
                />
              )}

              {type === 'Activities' && subTypeState === 'Subjects' && (
                <Starter
                  search={false}
                  tableHead={columnData.subjects}
                  sortCol={columnData.subjectsSortCol}
                  handleSort={handleSort}
                  subType={'Subjects'}
                  searchQueryActivities={searchQueryActivities}
                  setSearchQueryActivities={setSearchQueryActivities}
                  searchActivitiesQueryHandler={searchActivitiesQueryHandler}
                  btnText="Add a new subject"
                  btnAction="add_subject"
                  data={subjects}
                  type={type}
                  setActivePage={setActivePage}
                  activePage={activePage}
                  paginationCounter={false}
                  size={size}
                  setSize={setSize}
                  selectedActivityType={selectedActivityType}
                  setSelectedActivityType={setSelectedActivityType}
                />
              )}

              {type === 'Activities' && subTypeState === 'Education Level' && (
                <Starter
                  search={false}
                  tableHead={columnData.educationLevel}
                  sortCol={columnData.educationLevelSortCol}
                  handleSort={handleSort}
                  subType={'Education Level'}
                  searchQueryActivities={searchQueryActivities}
                  setSearchQueryActivities={setSearchQueryActivities}
                  searchActivitiesQueryHandler={searchActivitiesQueryHandler}
                  btnText="Add a new education level"
                  btnAction="add_education_level"
                  data={educationLevel}
                  type={type}
                  setActivePage={setActivePage}
                  activePage={activePage}
                  paginationCounter={false}
                  size={size}
                  setSize={setSize}
                  selectedActivityType={selectedActivityType}
                  setSelectedActivityType={setSelectedActivityType}
                />
              )}

              {type === 'Activities' && subTypeState === 'Author Tags' && (
                <Starter
                  search={false}
                  tableHead={columnData.authorTags}
                  sortCol={columnData.authorTagsSortCol}
                  handleSort={handleSort}
                  subType={'Author Tags'}
                  searchQueryActivities={searchQueryActivities}
                  setSearchQueryActivities={setSearchQueryActivities}
                  searchActivitiesQueryHandler={searchActivitiesQueryHandler}
                  btnText="Add a new author tag"
                  btnAction="add_author_tag"
                  data={authorTag}
                  type={type}
                  setActivePage={setActivePage}
                  activePage={activePage}
                  paginationCounter={false}
                  size={size}
                  setSize={setSize}
                  selectedActivityType={selectedActivityType}
                  setSelectedActivityType={setSelectedActivityType}
                />
              )}
              
              {type === 'Activities' && subTypeState === 'Activity Layouts' && (
                <Starter
                  search={true}
                  tableHead={columnData.activityLayouts}
                  sortCol={columnData.activityLayoutsSortCol}
                  handleSort={handleSort}
                  subType={'Activity Layouts'}
                  // searchQueryActivities={searchQueryActivities}
                  // setSearchQueryActivities={setSearchQueryActivities}
                  // searchActivitiesQueryHandler={searchActivitiesQueryHandler}
                  btnText="Add activity layout"
                  btnAction="add_activity_layout"
                  data={activityLayout}
                  type={type}
                  setActivePage={setActivePage}
                  activePage={activePage}
                  paginationCounter={false}
                  size={size}
                  setSize={setSize}
                  searchQueryChangeHandler={searchQueryChangeHandlerActivityLayouts}
                  // selectedActivityType={selectedActivityType}
                  // setSelectedActivityType={setSelectedActivityType}
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
                  sortCol={columnData.defaultssoSortCol}
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
                  data={ltiTool}
                  type={type}
                  setActivePage={setActivePage}
                  activePage={activePage}
                  searchQueryChangeHandler={searchQueryChangeHandlerLtiTool}
                  filteredItems={filterLtiTool}
                />
              )}
              {type === 'Teams' && (
                <Starter
                  paginationCounter={true}
                  size={size}
                  subType={'All teams'}
                  setSize={setSize}
                  search={true}
                  type={type}
                  tableHead={columnData.teams}
                  sortCol={columnData.teamsSortCol}
                  data={teams}
                  activePage={activePage}
                  setActivePage={setActivePage}
                  handleSort={handleSort}
                  setSearchQueryTeam={setSearchQueryTeam}
                  setModalShowTeam={setModalShowTeam}
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
