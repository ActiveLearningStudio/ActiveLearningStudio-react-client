/* eslint-disable */
import React, { useState, useMemo } from 'react';
import { Tabs, Tab, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Starter from './starter';
import { columnData } from './column';
import { getOrgUsers, searchUserInOrganization } from 'store/actions/organization';
function Pills(props) {
  const {modules, type, subType} = props;
  const [subTypeState, setSubTypeState] = useState(subType)
  // All User Business Logic Start
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const admin = useSelector((state) => state.admin);
  const { activeTab } = admin
  const [ activePage, setActivePage ] = useState(1);
  const [ size, setSize ] = useState(25);
  const { activeOrganization, roles } = organization;
  const [users, setUsers] = useState(null);
  const [searchAlertToggler, setSearchAlertToggler] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
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
      if (organization?.users?.data?.length > 0 && activePage === organization?.activePage && size === organization?.size) {
        setUsers(organization?.users);
      } else {
        const result = await dispatch(getOrgUsers(activeOrganization?.id, activePage, size));
        setUsers(result);
      }
    }
  }, [activeOrganization, activePage, type, subTypeState , activeTab, size])
  // All Users Business Logic End
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
      onSelect={(key) => setSubTypeState(key)}
    >
      {modules?.map((asset) => (
        <Tab eventKey={asset} title={asset}>
          <div className="module-content-inner">
            {(type === 'Stats' && subTypeState === 'Report') && (
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
            {(type === 'Stats' && subTypeState === 'Queues:Jobs') && (
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
             {(type === 'Stats' && subTypeState === 'Queues:Logs') && (
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
            {(type === 'Users' && subTypeState === 'All users') && (
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
                searchQuery={searchQuery}
                searchQueryChangeHandler={searchQueryChangeHandler}
                searchAlertToggler={searchAlertToggler}
                setActivePage={setActivePage}
                type={type}
                inviteUser={true}
              />
            )}
            {(type === 'Users' && subTypeState === 'Manage Roles') && (
              <Starter
                paginationCounter={false}
                search={false}
                print={false}
                btnText="Add Role"
                btnAction="add_role"
                importUser={false}
                filter={false}
                tableHead={[]}
                data={[]}
                type={type}
                roles={roles}
              />
            )}
            {(type === 'Organization') && (
              <Starter
                paginationCounter={true}
                search={true}
                print={false}
                btnText="Add Organization"
                btnAction="add_org"
                importUser={false}
                filter={false}
                tableHead={columnData.organization}
                data={activeOrganization}
                type={type}
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
