/* eslint-disable */
import React, { useState, useMemo, useEffect } from "react";
import { Tabs, Tab, Table } from "react-bootstrap";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import adminService from "services/admin.service";
import Starter from "./starter";
import { columnData } from "./column";


import { getOrgUsers, searchUserInOrganization, getsubOrgList } from 'store/actions/organization';
import { getActivityItems, loadResourceTypesAction } from "store/actions/resource";
export default function Pills(props) {
  const { modules, type, subType } = props;
  const [subTypeState, setSubTypeState] = useState(subType);
  // All User Business Logic Start
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const { activityTypes, activityItems } = useSelector ((state) => state.admin)
  const admin = useSelector((state) => state.admin);
  const [ activePage, setActivePage ] = useState(1);
  const [ size, setSize ] = useState(25);
  const [ activeRole,setActiveRole ] = useState('');
  const { activeTab, activityType } = admin
  const [currentTab, setCurrentTab] = useState("all");
  const { activeOrganization, roles } = organization;
  const [users, setUsers] = useState(null);
  const [searchAlertToggler, setSearchAlertToggler] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [allProjectTab, setAllProjectTab] = useState(null);
  const [allProjectUserTab, setAllProjectUserTab] = useState(null);
  const [allProjectIndexTab, setAllProjectIndexTab] = useState(null);
  const [lmsProject, setLmsProject] = useState(null);
  const [changeIndexValue, setChangeIndexValue] = useState("1");
  const searchUsers = async (query, page) => {
    const result = await dispatch(
      searchUserInOrganization(activeOrganization?.id, query, page)
    );
    if (result.data.length > 0) {
      setUsers(result);
      setSearchAlertToggler(1);
    } else {
      setSearchAlertToggler(0);
    }
  };
  const searchQueryChangeHandler = async ({ target }) => {
    if (target.value) {
      setSearchQuery(target.value);
      searchUsers(target.value, activePage);
      setUsers(null);
    } else {
      setSearchQuery("");
      const result = await dispatch(
        getOrgUsers(activeOrganization?.id, activePage, size)
      );
      setUsers(result);
    }
  };

  const searchProjectQueryChangeHandler = async ({ target }, index, subType) => {
    console.log(target.value, subType)

    if (subType === 'index') {
      if (!!target.value) {
        setAllProjectIndexTab(null);
        const searchapi = adminService.userSerchIndexs(activeOrganization?.id, 1, index, target.value)
        searchapi.then((data) => {
          // console.log(data)
          setAllProjectIndexTab(data)

        })
      } else {
        const searchapi = adminService.getAllProjectIndex(activeOrganization?.id, 1, index)
        searchapi.then((data) => {
          // console.log(data)
          setAllProjectIndexTab(data)

        })
      }
    } else if (subType === 'all') {
      if (!!target.value) {
        setAllProjectTab(null);
        const allproject = adminService.getAllProjectSearch(activeOrganization?.id, 1, target.value)
        // console.log(allproject)
        allproject.then((data) => {
          console.log(data)
          setAllProjectTab(data)
        })
      } else {
        const allproject = adminService.getAllProject(activeOrganization?.id, 1)
        allproject.then((data) => {
          // console.log(data)
          setAllProjectTab(data)
        })
      }
    } else if (subType === 'user') {
      if (!!target.value) {
        setAllProjectUserTab(null);
        const userproject = adminService.getUserProjectSearch(activeOrganization?.id, 1, target.value)
        userproject.then((data) => {
          setAllProjectUserTab(data)
        })
      } else {
        const userproject = adminService.getUserProject(activeOrganization?.id, 1)
        userproject.then((data) => {
          // console.log(data)
          setAllProjectUserTab(data)
        })
      }
    }
  };



  useMemo(async () => {
    if (
      activeOrganization &&
      type === "Users" &&
      subTypeState === "All users" &&
      activeTab === "Users"
    ) {
      if (
        organization?.users?.data?.length > 0 &&
        activePage === organization?.activePage &&
        size === organization?.size &&
        !activeRole
      ) {
        setUsers(organization?.users);
      } else {
        const result = await dispatch(
          getOrgUsers(activeOrganization?.id, activePage, size, activeRole)
        );
        setUsers(result);
      }
    }
    dispatch(getsubOrgList(activeOrganization?.id));
  }, [
    activeOrganization,
    activePage,
    type,
    subTypeState,
    activeTab,
    size,
    activeRole,
  ]);
  // All Users Business Logic End

  useMemo(async () => {
    setAllProjectTab(null);
    setAllProjectUserTab(null);
    setAllProjectIndexTab(null);
    if (activeOrganization && type === "Project" && currentTab == "all") {
      const result = await adminService.getAllProject(
        activeOrganization?.id,
        activePage || 1
      );
      setAllProjectTab(result);
    } else if (
      activeOrganization &&
      type === "Project" &&
      currentTab === "user"
    ) {
      const result = await adminService.getUserProject(
        activeOrganization?.id,
        activePage || 1
      );
      setAllProjectUserTab(result);
    } else if (
      activeOrganization &&
      type === "Project" &&
      currentTab === "index"
    ) {
      const result = await adminService.getAllProjectIndex(
        activeOrganization?.id,
        activePage || 1,
        changeIndexValue
      );
      setAllProjectIndexTab(result);
    }
  }, [type, activePage, changeIndexValue, currentTab]);
  // Activity Tab Business Logic
  useEffect(() => {
    if (type=== 'Activities' && subTypeState === 'Activity Items') {
      //pagination
      dispatch(getActivityItems('', activePage));
    } else if (type=== 'Activities' && subTypeState === 'Activity Items' && activePage === 1) {
      //on page 1
      dispatch (getActivityItems());
    }
  }, [type, subTypeState, activePage])
  useEffect(() => {
    if (type=== 'Activities' && subTypeState === 'Activity Types' && activePage !== organization?.activePage) {
      //pagination
      dispatch(loadResourceTypesAction('', activePage));
    } else if (type=== 'Activities' && subTypeState === 'Activity Types' && activePage === 1) {
      //on page 1
      dispatch (loadResourceTypesAction());
    }
  },[activePage, subTypeState, type])
  const searchActivitiesQueryHandler = async ({target}, subTypeRecieved) => {
    if (subTypeRecieved === 'Activity Types') {
      if (target.value) {
        await dispatch(loadResourceTypesAction(target.value, ''));
      } else {
        await dispatch(loadResourceTypesAction());
      }
    } else if (subTypeRecieved === 'Activity Items') {
      if (target.value) {
        await dispatch(getActivityItems(target.value, ''));
      } else {
        await dispatch(getActivityItems());
      }
    }
  }
  const dummy =  [
    {
      name: "qamar",
      email: "qamar111@gmail.com",
      age: "23",
      project: "34",
      counter: "56",
      flow: "67",
    },
    {
      name: "qamar",
      email: "qamar111@gmail.com",
      age: "23",
      project: "34",
      counter: "56",
      flow: "67",
    },
    {
      name: "qamar",
      email: "qamar111@gmail.com",
      age: "23",
      project: "34",
      counter: "56",
      flow: "67",
    },
  ];

  //LMS project ***************************************

  useMemo(async () => {
    setLmsProject(null);
    const result = await adminService.getLmsProject();
    setLmsProject(result);
    console.log(result);
  }, []);


  // console.log(columnData)
  return (
    <Tabs
      defaultActiveKey={modules && modules[0]}
      id="uncontrolled-tab-example"
      onSelect={(key) => {
        setSubTypeState(key);
        if (key === "All Projects") {
          setCurrentTab("all");
        } else if (key === "User Projects") {
          setCurrentTab("user");
        } else if (key === "Indexing Queue") {
          setCurrentTab("index");
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
                btnText=""
                btnAction=""
                importUser={false}
                filter={true}
                tableHead={columnData.statereport}
                type={type}
              />
            )}
            {type === "Stats" && subTypeState === "Queues:Jobs" && (
              <Starter
                paginationCounter={true}
                search={true}
                print={false}
                btnText=""
                btnAction=""
                importUser={false}
                filter={true}
                tableHead={columnData.statejobs}
                data={dummy}
                type={type}
              />
            )}
            {type === "Stats" && subTypeState === "Queues:Logs" && (
              <Starter
                paginationCounter={true}
                search={true}
                print={false}
                btnText=""
                btnAction=""
                importUser={false}
                filter={true}
                tableHead={columnData.statelogs}
                data={dummy}
                type={type}
              />
            )}
            {type === "Users" && subTypeState === "All users" && (
              <Starter
                paginationCounter={true}
                search={true}
                print={false}
                btnText="Add User"
                btnAction="create_user"
                importUser={true}
                filter={false}
                tableHead={columnData.userall}
                data={users}
                activePage={activePage}
                size={size}
                setSize={setSize}
                activeRole={activeRole}
                setActiveRole={setActiveRole}
                searchQuery={searchQuery}
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
              />
            )}
            {type === "Organization" && (
              <Starter
                paginationCounter={false}
                search={true}
                print={false}
                btnText="create Organization"
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
                btnText="create New LMS"
                btnAction="add_lms"
                importUser={false}
                filter={false}
                tableHead={columnData.lmssettings}
                data={lmsProject}
                type={type}
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
                // searchQuery={searchQuery}
                // searchProjectQueryChangeHandler={searchProjectQueryChangeHandle}
                // searchAlertToggler={searchAlertToggler}
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
                tableHead={columnData.projectAll}
                data={allProjectUserTab}
                type={type}
                setActivePage={setActivePage}
                activePage={activePage}
                subType="user"
                setCurrentTab={setCurrentTab}
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
                setCurrentTab={setCurrentTab}
                filter={true}
                setChangeIndexValue={setChangeIndexValue}
              />
            )}
            {type === 'Activities' && subTypeState === 'Activity Types' && (
              <Starter
                search={true}
                tableHead={columnData.ActivityTypes}
                subType={'Activity Types'}
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
                searchActivitiesQueryHandler={searchActivitiesQueryHandler}
                btnText="Add Activity Item"
                btnAction="add_activity_item"
                data={activityItems}
                type={type}
                setActivePage={setActivePage}
                activePage={activePage}
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
