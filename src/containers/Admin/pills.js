/* eslint-disable */
import React, { useState, useMemo, useEffect } from "react";
import { Tabs, Tab, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import adminService from "services/admin.service";
import Starter from "./starter";
import { columnData } from "./column";


import { getOrgUsers, searchUserInOrganization, getsubOrgList, getRoles, clearSearchUserInOrganization, updatePageNumber, resetPageNumber } from 'store/actions/organization';
import { getActivityItems, loadResourceTypesAction } from "store/actions/resource";
import { getJobListing, getLogsListing, getUserReport } from "store/actions/admin";
import { alphaNumeric } from "utils";

export default function Pills(props) {
  const { modules, type, subType, allProjectTab,setAllProjectTab } = props;

  const [key, setKey] = useState(modules && modules[0]);

  const [subTypeState, setSubTypeState] = useState(subType);
  // All User Business Logic Start
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const { activityTypes, activityItems, usersReport } = useSelector ((state) => state.admin)
  const [userReportsStats, setUserReportStats] = useState(null);
  const admin = useSelector((state) => state.admin);
  const [ activePage, setActivePage ] = useState(1);
  const [ size, setSize ] = useState(10);
  const { activeOrganization, roles, permission, searchUsers } = organization;
  const [ activeRole,setActiveRole ] = useState('');
  const { activeTab, activityType } = admin
  const [currentTab, setCurrentTab] = useState("all");
  const [users, setUsers] = useState(null);
  const [searchAlertToggler, setSearchAlertToggler] = useState(1);
  const [searchAlertTogglerStats, setSearchAlertTogglerStats] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryProject, setSearchQueryProject] = useState("");
  const [searchQueryStats, setSearchQueryStats] = useState("");
  const [searchQueryActivities, setSearchQueryActivities ] = useState("");
  const [allProjectUserTab, setAllProjectUserTab] = useState(null);
  const [allProjectIndexTab, setAllProjectIndexTab] = useState(null);
  const [lmsProject, setLmsProject] = useState(null);
  const [jobs, setJobs ] = useState(null);
  const [jobType, SetJobType] = useState({ value: 1 , display_name: 'Pending'});
  const [logs, setLogs ] = useState(null);
  const [logType, SetLogType] = useState({ value: 'all' , display_name: 'All'});
  const [changeIndexValue, setChangeIndexValue] = useState("0");
  useEffect(()=>{
    setKey(modules?.[0])

  },[activeTab])
  const searchUsersFromOrganization = async (query, page) => {
    if (query.length > 1) {
      const result = await dispatch(
        searchUserInOrganization(activeOrganization?.id, query, searchUsers ? activePage : 1, activeRole)
      );
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
      if(!!alphaNumeric(target.value)) {
        setSearchQuery(target.value);
      }
      searchUsersFromOrganization(target.value, activePage);
      setActivePage(searchUsers ? activePage : 1);
      if (target.value.trim().length> 1 ) setUsers(null);
    } else {
      dispatch(clearSearchUserInOrganization());
      setActivePage(1);
      setSearchQuery("");
      const result = await dispatch(
        getOrgUsers(activeOrganization?.id, 1, activeRole)
      );
      setUsers(result);
    }
  };



  const searchProjectQueryChangeHandler = async (query, index, subType) => {
    if (subType === 'index') {
      if (!!query) {
        setAllProjectIndexTab(null);
        const searchapi = adminService.userSerchIndexs(activeOrganization?.id, activePage, index, query)
        searchapi.then((data) => {
          setAllProjectIndexTab(data)

        }).catch(e=>setAllProjectIndexTab([]))
      } else {
        setActivePage(1);
        const searchapi = adminService.getAllProjectIndex(activeOrganization?.id, 1, index)
        searchapi.then((data) => {
          setAllProjectIndexTab(data)
        })
      }
    } else if (subType === 'all') {
      if (!!query) {
        setAllProjectTab(null);
        const allproject = adminService.getAllProjectSearch(activeOrganization?.id, activePage, query)
        allproject.then((data) => {
          console.log(data)
          setAllProjectTab(data)
        }).catch(e=>setAllProjectTab([]))
      } else {
        setActivePage(1);
        const allproject = adminService.getAllProject(activeOrganization?.id, 1)
        allproject.then((data) => {
          setAllProjectTab(data)
        })
      }
    } else if (subType === 'user') {
      if (!!query) {
        setAllProjectUserTab(null);
        const userproject = adminService.getUserProjectSearch(activeOrganization?.id, activePage, query)
        userproject.then((data) => {
          setAllProjectUserTab(data)
        }).catch(e=>setAllProjectUserTab([]))
      } else {
        setActivePage(1);
        const userproject = adminService.getUserProject(activeOrganization?.id, 1)
        userproject.then((data) => {
          setAllProjectUserTab(data)
        })
      }
    }
  };

  useMemo(() => {
    if (activeTab !== 'Users') setActiveRole(null);
  }, [activeTab])

  useMemo(async () => {

    if (
      activeOrganization &&
      type === "Users" &&
      subTypeState === "All Users"
    ) {
      if (searchQuery.length > 1) {
        const result = await dispatch(searchUserInOrganization(activeOrganization?.id, searchQuery, activePage, activeRole));
        setUsers(result);
      }
      else if (
        organization?.users?.data?.length > 0 &&
        activePage === organization?.activePage &&
        !activeRole
      ) {
        setUsers(organization?.users);
      } else if (activeRole) {
        const result = await dispatch(
          getOrgUsers(activeOrganization?.id, activePage, activeRole)
        );
        setUsers(result);
      }
    }
    if (type === 'Organization' ) {
       dispatch(getsubOrgList(activeOrganization?.id));
    }
  }, [
    activeOrganization,
    activePage,
    type,
    subTypeState,
    activeTab,
    activeRole,
    organization?.users?.length
  ]);
  // All Users Business Logic End

  useMemo(async () => {
    setAllProjectTab && setAllProjectTab(null);
    setAllProjectUserTab(null);
    setAllProjectIndexTab(null);
    if (activeOrganization && type === "Project" && currentTab == "all") {
      if (searchQueryProject) {
        const allproject = adminService.getAllProjectSearch(activeOrganization?.id, activePage, searchQueryProject)
        allproject.then((data) => {
          console.log(data)
          setAllProjectTab(data)
        }).catch(e=>setAllProjectTab([]))
      } else {
        const result = await adminService.getAllProject(
          activeOrganization?.id,
          activePage || 1
        );
        setAllProjectTab(result);
      }
    } else if (
      activeOrganization &&
      type === "Project" &&
      currentTab === "user"
    ) {
      if (searchQueryProject) {
        const userproject = adminService.getUserProjectSearch(activeOrganization?.id, activePage,searchQueryProject)
        userproject.then((data) => {
          setAllProjectUserTab(data)
        }).catch(e=>setAllProjectUserTab([]))
      } else {
        const result = await adminService.getUserProject(
          activeOrganization?.id,
          activePage || 1
        );
        setAllProjectUserTab(result);
      }
    } else if (
      activeOrganization &&
      type === "Project" &&
      currentTab === "index"
    ) {
      if (searchQueryProject) {
        const searchapi = adminService.userSerchIndexs(activeOrganization?.id, activePage, changeIndexValue, searchQueryProject)
        searchapi.then((data) => {
          setAllProjectIndexTab(data)

        }).catch(e=>setAllProjectIndexTab([]))
      } else {
        const result = await adminService.getAllProjectIndex(
          activeOrganization?.id,
          activePage || 1,
          changeIndexValue,
        );
        setAllProjectIndexTab(result);
      }
    }
  }, [activeOrganization?.id, type, activePage, changeIndexValue, currentTab]);
  // Activity Tab Business Logic
  useEffect(() => {
    if (type=== 'Activities' && subTypeState === 'Activity Items') {
      //pagination
      dispatch(getActivityItems('', activePage));
      dispatch(updatePageNumber(activePage));
    } else if (type=== 'Activities' && subTypeState === 'Activity Items' && activePage === 1) {
      //on page 1
      dispatch (getActivityItems());
      dispatch(updatePageNumber(activePage));
    }
  }, [type, subTypeState, activePage])
  useEffect(() => {
    if (type=== 'Activities' && subTypeState === 'Activity Types' && activePage !== organization?.activePage) {
      //pagination
      dispatch(loadResourceTypesAction('', activePage));
      dispatch(updatePageNumber(activePage));
    } else if (type=== 'Activities' && subTypeState === 'Activity Types' && activePage === 1) {
      //on page 1
      dispatch (loadResourceTypesAction());
      dispatch(updatePageNumber(activePage));
    }
  },[activePage, subTypeState, type])
  const searchActivitiesQueryHandler = async (query, subTypeRecieved) => {
    if (subTypeRecieved === 'Activity Types') {
      if (query) {
        await dispatch(loadResourceTypesAction(query, ''));
      } else {
        await dispatch(loadResourceTypesAction());
      }
    } else if (subTypeRecieved === 'Activity Items') {
      if (query) {
        await dispatch(getActivityItems(query, ''));
      } else if (query === '') {
        await dispatch(getActivityItems());
      }
    }
  }
  // Stats User Report
  useEffect(() => {
    if (type=== 'Stats' && subTypeState === 'Report' && searchQueryStats) {
      setUserReportStats(null);
      let result = dispatch(getUserReport('all', size, activePage, searchQueryStats));
      result.then((data) =>{
        setUserReportStats(data);
      });
    }
    else if (type=== 'Stats' && subTypeState === 'Report' && (activePage !== organization?.activePage || size !== organization?.size)) {
      //pagination
      setUserReportStats(null);
      let result = dispatch(getUserReport('all',size,activePage,''));
      result.then((data) =>{
        setUserReportStats(data);
      });
    } else if (type=== 'Stats' && subTypeState === 'Report' && (activePage === 1 || size === 10)) {
      //on page 1
      setUserReportStats(null);
      let result = dispatch (getUserReport('all'));
      result.then((data) =>{
        setUserReportStats(data);
      });
    }
    if (type === 'Stats' && subTypeState === 'Queues: Jobs' && searchQueryStats) {
      let result = dispatch(getJobListing(jobType.value, size, activePage ,searchQueryStats));
      result.then((data) => setJobs(data.data));
    }
    else if (type === 'Stats' && subTypeState === 'Queues: Jobs' && (activePage !== organization?.activePage || size !== organization?.size) && jobType) {
      const result = dispatch(getJobListing(jobType.value, size, activePage))
      result.then((data) => {
        setJobs(data.data);
      });
    } else if (type === 'Stats' && subTypeState === 'Queues: Jobs' && (activePage === 1 || size === 10)) {
      const result = dispatch(getJobListing(jobType.value))
      result.then((data) => {
        setJobs(data.data);
      });
    }
    if (type === 'Stats' && subTypeState === 'Queues: Logs' && searchQueryStats) {
      let result = dispatch(getLogsListing(logType.value, size, activePage , searchQueryStats));
      result.then((data) => setLogs(data.data));
    }
    else if (type === 'Stats' && subTypeState === 'Queues: Logs' && (activePage !== organization?.activePage || size !== organization?.size) && logType) {
      const result = dispatch(getLogsListing(logType.value, size, activePage))
      console.log(result);
      result.then((data) => {
        setLogs(data.data);
      });
    } else if (type === 'Stats' && subTypeState === 'Queues: Logs' && (activePage === 1 || size === 10)) {
      const result = dispatch(getLogsListing(logType.value))
      result.then((data) => {
        setLogs(data.data);
      });
    }
  },[activePage, subTypeState, type, size, jobType, logType])
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
        let result = dispatch(getJobListing(jobType.value, size, undefined ,query));
        result.then((data) => {
          setJobs(data.data)
          if (data?.data?.length > 0) {
            console.log(data?.data);
            setSearchAlertTogglerStats(1);
          } else {
            console.log(data?.data);
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
        let result = dispatch(getLogsListing(logType.value, size, undefined , query));
        result.then((data) => {
          setLogs(data.data)
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
  }
  //LMS project ***************************************
  useMemo(async () => {
    if(type==="LMS") {
    // setLmsProject(null);
    const result =  adminService.getLmsProject(activeOrganization?.id, activePage|| 1);
    result.then((data) => {
      setLmsProject(data)
    })
    }
  }, [type, activePage, activeOrganization?.id,]);

  const searchQueryChangeHandlerLMS = (search) => {
    setLmsProject(null);
    const encodeQuery = encodeURI(search.target.value);
    const result =  adminService.getLmsProjectSearch(activeOrganization?.id, encodeQuery,(activePage|| 1));
    result.then((data) => {
      setLmsProject(data)
    })
  }

  useEffect(() => {
    if (activeTab === 'Project') {
      setSubTypeState('All Projects');
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
    }
  },[activeTab]);
  // console.log(columnData)
  return (
    <Tabs
      defaultActiveKey={modules && modules[0]}
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(key) => {
        setSubTypeState(key);
        setKey(key);
        setActivePage(1)
        setSearchQueryProject('');
        setSearchAlertTogglerStats(1);
        dispatch(resetPageNumber());
        setSearchQueryStats('');
        if (key === "All Projects") {
          setCurrentTab("all");
        } else if (key === "User Projects") {
          setCurrentTab("user");
        } else if (key === "Indexing Queue") {
          setCurrentTab("index");
          setChangeIndexValue(0);
        }
      }}
    >
      {modules?.map((asset) => (
        <Tab eventKey={asset} title={asset}>
          <div className="module-content-inner">
            {type === "Stats" && subTypeState === "Report" && (
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
                type={type}
              />
            )}
            {type === "Stats" && subTypeState === "Queues: Jobs" && (
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
                type={type}
              />
            )}
            {type === "Stats" && subTypeState === "Queues: Logs" && (
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
                type={type}
              />
            )}
            {type === "Users" && subTypeState === "All Users" && (
              <Starter
                // paginationCounter={true}
                search={true}
                print={false}
                btnText="Create new user"
                btnAction="create_user"
                importUser={true}
                filter={false}
                tableHead={columnData.userall}
                data={users}
                activePage={activePage}
                // size={size}
                // setSize={setSize}
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
            {type === "Users" && subTypeState === "Manage Roles" && (
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
                data={[]}
                activeRole={activeRole}
                setActiveRole={setActiveRole}
                type={type}
                roles={roles}
                permissionRender={permission?.Organization?.includes('organization:view-role')}
              />
            )}
            {type === "Organization" && (
              <Starter
                paginationCounter={false}
                search={true}
                print={false}
                btnText="Create Organization"
                btnAction="add_org"
                importUser={false}
                filter={false}
                tableHead={columnData.organization}
                data={[]}
                type={type}

              />
            )}

            {type === "LMS" && (
              <Starter
                paginationCounter={false}
                search={true}
                print={false}
                btnText="Create New LMS"
                btnAction="add_lms"
                importUser={false}
                filter={false}
                tableHead={columnData.lmssettings}
                data={lmsProject}
                type={type}
                setActivePage={setActivePage}
                activePage={activePage}
                searchQueryChangeHandler={searchQueryChangeHandlerLMS}
              />
            )}

            {type === "Project" && subTypeState === "All Projects" && (
              <Starter
                paginationCounter={false}
                search={true}
                tableHead={columnData.projectAll}
                data={allProjectTab}
                searchProjectQueryChangeHandler={searchProjectQueryChangeHandler}
                type={type}
                importUser={true}
                searchQueryProject={searchQueryProject}
                setSearchQueryProject={setSearchQueryProject}
                setActivePage={setActivePage}
                activePage={activePage}
                subType="all"
                setCurrentTab={setCurrentTab}
              />
            )}
            {type === "Project" && subTypeState === "User Projects" && (
              <Starter
                paginationCounter={false}
                search={true}
                tableHead={columnData.projectUser}
                data={allProjectUserTab}
                type={type}
                setActivePage={setActivePage}
                activePage={activePage}
                subType="user"
                setCurrentTab={setCurrentTab}
                searchQueryProject={searchQueryProject}
                setSearchQueryProject={setSearchQueryProject}
                searchProjectQueryChangeHandler={searchProjectQueryChangeHandler}
              />
            )}
            {type === "Project" && subTypeState === "Indexing Queue" && (
              <Starter
                paginationCounter={false}
                search={true}
                tableHead={columnData.projectIndex}
                data={allProjectIndexTab}
                type={type}
                searchQuery={searchQuery}
                searchProjectQueryChangeHandler={searchProjectQueryChangeHandler}
                searchAlertToggler={searchAlertToggler}
                setActivePage={setActivePage}
                activePage={activePage}
                subType="index"
                setAllProjectIndexTab={setAllProjectIndexTab}
                setCurrentTab={setCurrentTab}
                filter={true}
                searchQueryProject={searchQueryProject}
                setSearchQueryProject={setSearchQueryProject}
                changeIndexValue={changeIndexValue}
                setChangeIndexValue={setChangeIndexValue}
              />
            )}
            {type === 'Activities' && subTypeState === 'Activity Types' && (
              <Starter
                search={true}
                tableHead={columnData.ActivityTypes}
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
            {(type === 'Activities' && subTypeState === 'Activity Items') && (
              <Starter
                search={true}
                tableHead={columnData.ActivityItems}
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
              />
            )}
            {(type === 'Settings' && subTypeState === 'All settings') && (
              <Starter
                type={type}
                subType={'All settings'}
                subTypeState={subTypeState}
              />
            )}
          </div>
        </Tab>
      ))}
    </Tabs>
  );
}

Pills.propTypes = {
  manage: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
}
