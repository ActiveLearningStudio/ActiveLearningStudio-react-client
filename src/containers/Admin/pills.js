/* eslint-disable */
import React, { useState, useMemo } from 'react';
import { Tabs, Tab, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import Starter from './starter';
import { columnData } from './column';
import { getOrgUsers } from 'store/actions/organization';
function Pills(props) {
  const {modules, type, subType} = props;
  const [subTypeState, setSubTypeState] = useState(subType)
  // All User Business Logic Start
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const [ activePage, setActivePage ] = useState(1);
  const [ meta, setMeta ] = useState(null);
  const { activeOrganization } = organization;
  const [user, setUsers] = useState([]);
  useMemo(() => {
    if (activeOrganization && type === 'Users' && subTypeState === 'All users') {
      const result = dispatch(getOrgUsers(activeOrganization?.id, activePage));
      result.then((data)=> {
        const allUsers = [];
        data.data?.map((user) => {
          if (user.organization_role !== 'Administrator') {
            const result = {
              firstName: user.first_name,
              lastName: user.last_name,
              email: user.email,
              organization: activeOrganization?.name,
              organization_role: user.organization_role,
              organization_type: user.organization_type,
            };
            allUsers.push(result);
          }
          return true;
        });
        setMeta(data.meta);
        setUsers(allUsers);
      });
    }
  }, [activeOrganization, activePage, type,subTypeState])
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
                data={user}
                activePage={activePage}
                setActivePage={setActivePage}
                meta={meta}
                type={type}
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
                roles={[1]}
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
