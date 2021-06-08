/* eslint-disable */
import React, { useEffect } from 'react';
import { Tabs, Tab, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import { removeActiveAdminForm, setActiveTab } from 'store/actions/admin'
import CreateActivityItem from './formik/createActivityItem';
import CreateActivityType from "./formik/createActivity"
import CreateOrg from "./formik/createOrg"
import AddRole from './formik/addRole';
import CreateUser from './formik/createuser'
import Pills from './pills';
import Heading from './heading';
import Bradecrumd from './bradecrumd';
import CreateLms from './formik/createLms'
import './style.scss';

function AdminPanel() {
  const dispatch = useDispatch();
  const adminState = useSelector((state) => state.admin);
  const organization = useSelector((state) => state.organization);
  const { permission } = organization;
  const { activeForm, activeTab } = adminState;
  useEffect(() => {
  }, [activeTab])
  return (
    <div className="admin-panel">
      {permission?.activeRole?.includes("admin") ? (
        <>
          <div className="content-wrapper">
            <div className="inner-content">
              <Bradecrumd />
              <Heading />
              <Tabs
                defaultActiveKey={activeTab}
                id="uncontrolled-tab-example"
                onSelect={(key) => dispatch(setActiveTab(key))}
              >
                <Tab eventKey="Stats" title="Stats">
                  <div className="module-content">
                    <h2>Stats</h2>
                    <Pills
                      modules={["Report", "Queues:Jobs", "Queues:Logs"]}
                      type="Stats"
                      subType="Report"
                    />
                  </div>
                </Tab>
                <Tab eventKey="Organization" title="Organization">
                  <div className="module-content">
                    <h2>Organizations</h2>
                    <Pills modules={["All Orgnizations"]} type="Organization" />
                  </div>
                </Tab>
                <Tab eventKey="Project" title="Project">
                  <div className="module-content">
                    <h2>Project</h2>
                    <Pills
                      modules={[
                        "Indexing Queue",
                        "User Projects",
                        "All Projects",
                      ]}
                      type="Project"
                    />
                  </div>
                </Tab>
                <Tab eventKey="Activities" title="Activities">
                  <div className="module-content">
                    <h2>Activities</h2>
                    <Pills
                      modules={["Activity Types", "Activity Items"]}
                      type="Activities"
                    />
                  </div>
                </Tab>
                <Tab eventKey="Users" title="Users">
                  <div className="module-content">
                    <h2>Users</h2>
                    <Pills
                      modules={["All users", "Manage Roles"]}
                      type="Users"
                      subType="All users"
                    />
                  </div>
                </Tab>
                <Tab eventKey="LMS" title="LMS">
                  <div className="module-content">
                    <h2>LMS</h2>
                    <Pills modules={["All settings"]} type="LMS" />
                  </div>
                </Tab>
                <Tab eventKey="Settings" title="Settings">
                  <div className="module-content">
                    <h2>Settings</h2>
                    <Pills modules={["All settings"]} type="Settings" />
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
          {(activeForm === "add_activity_type" || activeForm === "edit_activity_type") && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">
                {activeForm === "add_activity_type" ? (
                    <CreateActivityType />
                )
                : (
                  <CreateActivityType editMode/>
                )}
              </div>
            </div>
          )}
          {(activeForm === "add_activity_item" || activeForm === "edit_activity_item") && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">
                {activeForm === "add_activity_item" ? (
                    <CreateActivityItem />
                )
                : (
                  <CreateActivityItem editMode/>
                )}
              </div>
            </div>
          )}
          {(activeForm === "add_org" || activeForm === "edit_org") && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">
                {activeForm === "add_org" ? (
                  <CreateOrg />
                ) : (
                  <CreateOrg editMode />
                )}
              </div>
            </div>
          )}
          {activeForm === "add_role" && (
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
          {activeForm === "add_lms" && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">
                <CreateLms method="create" />
              </div>
            </div>
          )}
          {activeForm === "edit_lms" && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">
                <CreateLms editMode />
              </div>
            </div>
          )}
          {activeForm === "clone_lms" && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">
                <CreateLms editMode clone />
              </div>
            </div>
          )}



          {(activeForm === "create_user" || activeForm === "edit_user") && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">
                {activeForm === "create_user" ? (
                  <CreateUser />
                ) : (
                  <CreateUser editMode />
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="content-wrapper" style={{ padding: "20px" }}>
          <Alert variant="danger">
            You are not authorized to view this page.
          </Alert>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
