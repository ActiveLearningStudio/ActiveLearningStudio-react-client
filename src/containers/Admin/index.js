/* eslint-disable */
import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { removeActiveAdminForm, setActiveTab } from 'store/actions/admin'

import CreateActivity from "./formik/createActivity"
import AddRole from './formik/addRole';
import CreateUser from './formik/createuser'
import Pills from './pills';
import './style.scss';

function AdminPanel() {
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const { activeForm, activeTab } = adminState;
  return (
    <div className="admin-panel">
      <div className="content-wrapper">
        <div className="inner-content">
          <Tabs defaultActiveKey={activeTab} id="uncontrolled-tab-example" onSelect={(key)=> dispatch(setActiveTab(key))}>
            <Tab eventKey="Stats" title="Stats">
              <div className="module-content">
                <h2>Stats</h2>
                <Pills
                  modules={['Report', 'Queues:Jobs', 'Queues:Logs']}
                  type="Stats"
                  subType="Report"
                />
              </div>
            </Tab>
            <Tab eventKey="Project" title="Project">
              <div className="module-content">
                <h2>Project</h2>
                <Pills
                  modules={['Report', 'Queues:Jobs', 'Queues:Logs']}
                  type="Project"
                />
              </div>
            </Tab>
            <Tab eventKey="Activities" title="Activities">
              <div className="module-content">
                <h2>Activities</h2>
                <Pills
                  modules={['Activity Types', 'Activity Items']}
                  type="Activities"
                />
              </div>
            </Tab>
            <Tab eventKey="Users" title="Users">
              <div className="module-content">
                <h2>Users</h2>
                <Pills
                  modules={['All users', 'Manage Roles']}
                  type="Users"
                  subType="All users"
                />
              </div>
            </Tab>
            <Tab eventKey="LMS" title="LMS">
              <div className="module-content">
                <h2>LMS</h2>
                <Pills
                  modules={['All settings']}
                  type="LMS"
                />
              </div>
            </Tab>
            <Tab eventKey="Settings" title="Settings">
              <div className="module-content">
                <h2>Settings</h2>
                <Pills
                  modules={['All settings']}
                  type="Settings"
                />
              </div>
            </Tab>
          </Tabs>
        </div>
      </div>
      {activeForm === 'add_activity_type' && (
        <div className="form-new-popup-admin">
          <FontAwesomeIcon
            icon="times"
            className="cross-all-pop"
            onClick={() => {
              dispatch(removeActiveAdminForm());
            }}
          />
          <div className="inner-form-content">
            <CreateActivity />
          </div>
        </div>
      )}
      {activeForm === 'add_role' && (
        <div className="form-new-popup-admin">
          <FontAwesomeIcon
            icon="times"
            className="cross-all-pop"
            onClick={() => {
              dispatch(removeActiveAdminForm());
            }}
          />
          <div className="inner-form-content">
            <AddRole />
          </div>
        </div>
      )}
      {activeForm === 'create_user' && (
        <div className="form-new-popup-admin">
          <FontAwesomeIcon
            icon="times"
            className="cross-all-pop"
            onClick={() => {
              dispatch(removeActiveAdminForm());
            }}
          />
          <div className="inner-form-content">
            <CreateUser />
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
