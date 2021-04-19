/* eslint-disable */
import React, { useState } from 'react';
import { Tabs, Tab, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

import Starter from './starter';
import { columnData } from './column';
function Pills(props) {
  const {modules, type, subType} = props;
  const [subTypeState, setSubTypeState] = useState(subType)
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
  console.log(columnData)
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
                data={dummy}
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
