/* eslint-disable */
import React, { useState, useMemo, useEffect } from "react";
import { Tabs, Tab, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import adminService from "services/admin.service";
import Starter from './starter';
import { columnData } from './column';
import { getOrgUsers, searchUserInOrganization, getsubOrgList } from 'store/actions/organization';
function Pills(props) {
  const {modules, type, subType} = props;
  const [subTypeState, setSubTypeState] = useState(subType)
  // All User Business Logic Start
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const admin = useSelector((state) => state.admin);
  const { activeTab } = admin
  const [currentTab, setCurrentTab] =  useState("all");
  const [ activePage, setActivePage ] = useState(1);
  const [ size, setSize ] = useState(25);
  const [ activeRole,setActiveRole ] = useState('');
  const { activeOrganization, roles } = organization;
  const [users, setUsers] = useState(null);
  const [searchAlertToggler, setSearchAlertToggler] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [allProjectTab, setAllProjectTab] = useState(null);
  const [allProjectUserTab, setAllProjectUserTab] = useState(null);
  const [allProjectIndexTab, setAllProjectIndexTab] =  useState(null);
  const [changeIndexValue, setChangeIndexValue] =  useState('1');
  const searchUsers = async (query, page) => {
    const result = await dispatch(searchUserInOrganization(activeOrganization?.id, query, page));
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
      setSearchQuery('');
      const result = await dispatch(getOrgUsers(activeOrganization?.id, activePage, size));
      setUsers(result);
    }
  };
  useMemo(async () => {
    if (activeOrganization && type === 'Users' && subTypeState === 'All users' && activeTab === 'Users') {
      if (organization?.users?.data?.length > 0 && activePage === organization?.activePage && size === organization?.size && !activeRole) {
        setUsers(organization?.users);
      } else {
        const result = await dispatch(getOrgUsers(activeOrganization?.id, activePage, size, activeRole));
        setUsers(result);
      }
    }
    dispatch(getsubOrgList(activeOrganization?.id));
  }, [activeOrganization, activePage, type, subTypeState , activeTab, size, activeRole])
  // All Users Business Logic End
  
  useMemo(async () => {
	setAllProjectTab(null);
	setAllProjectUserTab(null);
	setAllProjectIndexTab(null);
    if (activeOrganization && type === "Project" && currentTab == "all") {
      const result = await adminService.getAllProject(activeOrganization?.id,(activePage || 1));
      setAllProjectTab(result);
    }
	else if (activeOrganization && type === "Project" && currentTab === "user") {
		const result = await adminService.getUserProject(activeOrganization?.id,(activePage || 1));
		setAllProjectUserTab(result);
	}
	else if (activeOrganization && type === "Project" && currentTab === "index") {
		const result = await adminService.getAllProjectIndex(activeOrganization?.id,(activePage || 1),changeIndexValue);
		setAllProjectIndexTab(result);
	}
	
  }, [type, activePage, changeIndexValue, currentTab]); 
  const dummy =  [
    {
      name:'qamar',
      email:'qamar111@gmail.com',
      age:'23',
      project:'34',
      counter:'56',
      flow:'67',
    },
    {
      name:'qamar',
      email:'qamar111@gmail.com',
      age:'23',
      project:'34',
      counter:'56',
      flow:'67',
    },
    {
      name:'qamar',
      email:'qamar111@gmail.com',
      age:'23',
      project:'34',
      counter:'56',
      flow:'67',
    },
  ]
  // console.log(columnData)
  return (
    <Tabs
      defaultActiveKey={modules && modules[0]}
      id="uncontrolled-tab-example"
      onSelect={(key) => {
		 
		  setSubTypeState(key)
		  if(key === 'All Projects') {
			setCurrentTab('all')
		  } else if(key === 'User Projects') {
			setCurrentTab('user')
		  }
		  else if(key === 'Indexing Queue') {
			setCurrentTab('index')
		  }
		}
	  }
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
            {type === "Project" && subTypeState === "All Projects" && (
              <Starter
                paginationCounter={false}
                search={true}
                tableHead={columnData.projectAll}
                data={allProjectTab}
                type={type}
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
              />
            )}
			{type === "Project" && subTypeState === "Indexing Queue" && (
              <Starter
                paginationCounter={false}
                search={true}
                tableHead={columnData.projectIndex}
                data={allProjectIndexTab}
                type={type}
				setActivePage={setActivePage}
				activePage={activePage}
				subType="index"
				setCurrentTab={setCurrentTab}
				filter={true}
				setChangeIndexValue={setChangeIndexValue}
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
  type:PropTypes.string.isRequired,
};

export default Pills;
