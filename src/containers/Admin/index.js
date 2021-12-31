/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveAdminForm } from 'store/actions/admin';
import EditProjectModel from './model/editprojectmodel';
import { removeActiveAdminForm, setActiveTab } from 'store/actions/admin';
import CreateActivityItem from './formik/createActivityItem';
import CreateActivityType from './formik/createActivity';
import CreateOrg from './formik/createOrg';
import AddRole from './formik/addRole';
import CreateUser from './CreateUser';
import CreateUserForm from 'containers/Admin/formik/createuser';
import Pills from './pills';
import Heading from './heading';
import Breadcrump from 'utils/BreadCrump/breadcrump';
import * as actionTypes from 'store/actionTypes';
import CreateLms from './formik/createLms';
import CreateDefaultSso from './formik/createDefaultSso';
import CreateLtiTool from './formik/createLtiTool';
import RemoveUser from './RemoveUser';
import './style.scss';
import { getRoles } from 'store/actions/organization';
import EditProject from './formik/editProject';
import { useHistory } from 'react-router-dom';
import editicon from 'assets/images/edit-icon.png';

function AdminPanel({ showSSO }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [allProjectTab, setAllProjectTab] = useState(null);
  const adminState = useSelector((state) => state.admin);
  const { paginations } = useSelector((state) => state.ui);
  const organization = useSelector((state) => state.organization);
  const { permission, roles, currentOrganization, activeOrganization } = organization;
  const { activeForm, activeTab, removeUser } = adminState;
  const [modalShow, setModalShow] = useState(false);
  const [rowData, setrowData] = useState(false);
  const [activePageNumber, setActivePageNumber] = useState(false);
  useEffect(() => {
    if ((roles?.length === 0 && activeOrganization?.id) || activeOrganization?.id !== currentOrganization?.id) {
      dispatch(getRoles());
    }
  }, [activeOrganization]);
  useEffect(() => { }, [activeTab]);
  useEffect(() => {
    const tab = localStorage.getItem('activeTab');
    if (tab) {
      dispatch(setActiveTab(tab));
    }
  }, []);
  useEffect(() => {
    if (paginations?.length <= 1 || !paginations) {
      dispatch({
        type: actionTypes.UPDATE_PAGINATION,
        payload: [currentOrganization || []],
      });
    }
  }, [currentOrganization]);
  return (
    <div className="admin-panel">
      {permission?.Organization?.includes('organization:view') ? (
        <>
          <div className="content-wrapper">
            <div className="inner-content">
              <Breadcrump />
              <Heading />
              {!showSSO ? (
                <Tabs
                  defaultActiveKey={activeTab}
                  activeKey={activeTab}
                  id="uncontrolled-tab-example"
                  onSelect={(key) => {
                    dispatch(setActiveTab(key));
                    localStorage.setItem('activeTab', key);
                  }}
                >
                  <Tab eventKey="Organization" title="Organizations">
                    <div className="parent-organization-detail">
                      <div className="detailer">
                        <h3>Main organization: {currentOrganization.name}</h3>
                        <p>{currentOrganization.description}</p>
                      </div>
                      <button
                        onClick={() => {
                          dispatch(setActiveAdminForm('edit_org'));
                          dispatch({
                            type: 'SET_ACTIVE_EDIT',
                            payload: activeOrganization,
                          });
                        }}
                      >
                        <img src={editicon} alt="" />
                        Edit organization
                      </button>
                    </div>
                    <div className="module-content">
                      <Pills modules={['All Organizations']} type="Organization" subType="All Organizations" />
                    </div>
                  </Tab>
                  {permission?.Project?.includes('project:view') && (
                    <Tab eventKey="Projects" title="Projects">
                      <div className="module-content">
                        <Pills
                          setModalShow={setModalShow}
                          modules={['All Projects', 'Exported Projects']}
                          allProjectTab={allProjectTab}
                          setAllProjectTab={setAllProjectTab}
                          type="Projects"
                          setrowData={setrowData}
                          setActivePageNumber={setActivePageNumber}
                        />
                      </div>
                    </Tab>
                  )}
                  <Tab eventKey="Activities" title="Activities">
                    <div className="module-content">
                      <Pills modules={['Activity Types', 'Activity Items']} type="Activities" />
                    </div>
                  </Tab>
                  {permission?.Organization?.includes('organization:view-user') && (
                    <Tab eventKey="Users" title="Users">
                      <div className="module-content">
                        <Pills
                          modules={[
                            'All Users',
                            permission?.Organization?.includes('organization:add-role') || permission?.Organization?.includes('organization:edit-role') ? 'Manage Roles' : null,
                          ]}
                          type="Users"
                          subType="All Users"
                        />
                      </div>
                    </Tab>
                  )}
                  <Tab eventKey="LMS" title="Integrations">
                    <div className="module-content">
                      <Pills modules={['All settings', 'LTI Tools']} type="LMS" />
                    </div>
                  </Tab>
                  {/* <Tab eventKey="Settings" title="Settings">
                  <div className="module-content">
                    <h2>Settings</h2>
                    <Pills modules={["All settings"]} type="Settings" />
                  </div>
                </Tab> */}
                </Tabs>
              ) : (
                <Tabs
                  defaultActiveKey={'DefaultSso'}
                  activeKey={'DefaultSso'}
                  id="uncontrolled-tab-example"
                  onSelect={(key) => {
                    dispatch(setActiveTab(key));
                    localStorage.setItem('activeTab', key);
                  }}
                >
                  {permission?.Organization?.includes('organization:view-default-sso') && (
                    <Tab eventKey="DefaultSso" title="Default SSO Integrations">
                      <div className="module-content">
                        <Pills modules={['All Default SSO Settings']} type="DefaultSso" />
                      </div>
                    </Tab>
                  )}
                </Tabs>
              )}
            </div>
          </div>
          {(activeForm === 'add_activity_type' || activeForm === 'edit_activity_type') && (
            <div className="form-new-popup-admin">
              <div className="inner-form-content">{activeForm === 'add_activity_type' ? <CreateActivityType /> : <CreateActivityType editMode />}</div>
            </div>
          )}
          {(activeForm === 'add_activity_item' || activeForm === 'edit_activity_item') && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">{activeForm === 'add_activity_item' ? <CreateActivityItem /> : <CreateActivityItem editMode />}</div>
            </div>
          )}
          {(activeForm === 'add_org' || activeForm === 'edit_org') && (
            <div className="form-new-popup-admin">
              <div className="inner-form-content">{activeForm === 'add_org' ? <CreateOrg /> : <CreateOrg editMode />}</div>
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
          {activeForm === 'add_lms' && (
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
          {activeForm === 'edit_lms' && (
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
          {activeForm === 'clone_lms' && (
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
          {activeForm === 'edit_project' && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">
                <EditProject editMode allProjectTab={allProjectTab} setAllProjectTab={setAllProjectTab} />
              </div>
            </div>
          )}
          {activeForm === 'create_user' && <CreateUser mode={activeForm} />}
          {activeForm === 'edit_user' && (
            <div className="form-new-popup-admin">
              <div className="inner-form-content">
                <CreateUserForm mode={activeForm} editMode />
              </div>
            </div>
          )}
          {activeForm === 'add_default_sso' && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">
                <CreateDefaultSso method="create" />
              </div>
            </div>
          )}
          {activeForm === 'edit_default_sso' && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">
                <CreateDefaultSso editMode />
              </div>
            </div>
          )}

          {(activeForm === 'add_lti_tool' || activeForm === 'edit_lti_tool') && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">{activeForm === 'add_lti_tool' ? <CreateLtiTool /> : <CreateLtiTool editMode />}</div>
            </div>
          )}
          {removeUser && <RemoveUser />}

          <EditProjectModel
            show={modalShow}
            onHide={(type) => setModalShow(type)}
            row={rowData}
            showFooter={true}
            activePage={activePageNumber}
            setAllProjectTab={setAllProjectTab}
            activeOrganization={activeOrganization}
          />
        </>
      ) : (
        <div className="content-wrapper" style={{ padding: '20px' }}>
          <Alert variant="danger">You are not authorized to view this page.</Alert>
        </div>
      )}
    </div>
  );
}

export default AdminPanel;
