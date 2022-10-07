/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { ltiToolType, setActiveAdminForm } from 'store/actions/admin';
import EditProjectModel from './model/editprojectmodel';
import { removeActiveAdminForm, setActiveTab } from 'store/actions/admin';
import CreateActivityItem from './formik/createActivityItem';
import CreateActivityType from './formik/createActivity';
import CreateOrg from './formik/createOrg';
import AddRole from './formik/addRole';
import CreateUser from './CreateUser';
import CreateUserForm from 'containers/Admin/formik/createuser';
import BrightCove from './formik/createBrightCove';
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
// import editicon from 'assets/images/edit2.svg';
import CreateSubject from './formik/createSubject';
import CreateEducationLevel from './formik/createEducationLevel';
import CreateAuthorTag from './formik/createAuthorTag';
import CreateActivityLayout from './formik/createActivityLayout';
import EditTeamModel from './model/EditTeamModel';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import MyVerticallyCenteredModal from 'components/models/videoH5pmodal';
import { getAllMediaSources, getOrganizationMedaiSource } from 'store/actions/admin';
import { getAllIV } from 'store/actions/resource';

import EditSmSvg from 'iconLibrary/mainContainer/EditSmSvg';

function AdminPanel({ showSSO }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [allProjectTab, setAllProjectTab] = useState(null);
  const adminState = useSelector((state) => state.admin);
  const [users, setUsers] = useState(null);
  const { paginations } = useSelector((state) => state.ui);
  const organization = useSelector((state) => state.organization);
  const [modalShowh5p, setModalShowh5p] = useState(false);
  const { permission, roles, currentOrganization, activeOrganization } = organization;
  const { activeForm, activeTab, removeUser } = adminState;
  const [modalShow, setModalShow] = useState(false);
  const [modalShowTeam, setModalShowTeam] = useState(false);
  const [rowData, setrowData] = useState(false);
  const [activePageNumber, setActivePageNumber] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(null);
  useEffect(() => {
    if ((roles?.length === 0 && activeOrganization?.id) || activeOrganization?.id !== currentOrganization?.id) {
      dispatch(getRoles());
    }
  }, [activeOrganization]);
  useEffect(() => {}, [activeTab]);
  useEffect(() => {
    const tab = localStorage.getItem('activeTab');
    if (tab) {
      dispatch(setActiveTab(tab));
    }
    dispatch(getAllIV());
  }, []);
  useEffect(() => {
    if (paginations?.length <= 1 || !paginations) {
      dispatch({
        type: actionTypes.UPDATE_PAGINATION,
        payload: [currentOrganization || []],
      });
    }
    dispatch(getAllMediaSources());
    if (activeOrganization?.id) {
      dispatch(getOrganizationMedaiSource(activeOrganization?.id));
    }
  }, [activeOrganization]);

  const paragraphColor = getGlobalColor('--main-paragraph-text-color');
  // ltiToolType calling
  useEffect(() => {
    if (activeOrganization?.id) {
      dispatch(ltiToolType(activeOrganization?.id || currentOrganization?.id));
    }
  }, [activeOrganization, currentOrganization]);
  return (
    <div className="admin-panel">
      {true ? (
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
                  {permission?.Organization?.includes('organization:view') && (
                    <Tab eventKey="Organization" title="Organizations">
                      <div className="parent-organization-detail">
                        <div className="detailer">
                          <h3>Main organization: {currentOrganization?.name}</h3>
                          <p>{currentOrganization?.description}</p>
                        </div>
                        {permission?.Organization?.includes('organization:edit') && (
                          <button
                            onClick={() => {
                              dispatch(setActiveAdminForm('edit_org'));
                              dispatch({
                                type: 'SET_ACTIVE_EDIT',
                                payload: currentOrganization,
                              });
                            }}
                          >
                            <EditSmSvg primaryColor={paragraphColor} className="mr-2" />
                            Edit organization
                          </button>
                        )}
                      </div>
                      <div className="module-content">
                        <Pills modules={['Organizations']} type="Organization" subType="All Organizations" />
                      </div>
                    </Tab>
                  )}
                  {(permission?.Organization?.includes('organization:view-all-project') || permission?.Organization?.includes('organization:view-exported-project')) && (
                    <Tab eventKey="Projects" title="Projects">
                      <div className="module-content">
                        <Pills
                          setModalShow={setModalShow}
                          modules={[
                            permission?.Organization?.includes('organization:view-all-project') && 'All Projects',
                            permission?.Organization?.includes('organization:view-exported-project') && 'Exported Projects',
                          ]}
                          allProjectTab={allProjectTab}
                          setAllProjectTab={setAllProjectTab}
                          type="Projects"
                          setrowData={setrowData}
                          setActivePageNumber={setActivePageNumber}
                        />
                      </div>
                    </Tab>
                  )}
                  {/* Ind.Activity Start */}
                  {(permission?.['Independent Activity']?.includes('independent-activity:view') ||
                    permission?.['Independent Activity']?.includes('independent-activity:view-export')) && (
                    <Tab eventKey="IndActivities" title="Ind. activities">
                      <div className="module-content">
                        <Pills
                          setCurrentActivity={setCurrentActivity}
                          setModalShowh5p={setModalShowh5p}
                          modules={[
                            permission?.['Independent Activity']?.includes('independent-activity:view') && 'All independent activities',
                            permission?.['Independent Activity']?.includes('independent-activity:view-export') && 'Exported activities',
                          ]}
                          type="IndActivities"
                        />
                      </div>
                    </Tab>
                  )}
                  {/* Ind.Activity End*/}
                  {(permission?.Organization?.includes('organization:view-activity-item') ||
                    permission?.Organization?.includes('organization:view-activity-type') ||
                    permission?.Organization?.includes('organization:view-activity-layout') ||
                    permission?.Organization?.includes('organization:view-subject') ||
                    permission?.Organization?.includes('organization:view-education-level') ||
                    permission?.Organization?.includes('organization:view-author-tag')) && (
                    <Tab eventKey="Activities" title="Ref. tables">
                      <div className="module-content">
                        <Pills
                          modules={[
                            permission?.Organization?.includes('organization:view-activity-layout') && 'Activity Layouts',
                            permission?.Organization?.includes('organization:view-activity-type') && 'Activity Types',
                            permission?.Organization?.includes('organization:view-activity-item') && 'Activity Items',
                            permission?.Organization?.includes('organization:view-subject') && 'Subjects',
                            permission?.Organization?.includes('organization:view-education-level') && 'Education Level',
                            permission?.Organization?.includes('organization:view-author-tag') && 'Author Tags',
                          ]}
                          type="Activities"
                        />
                      </div>
                    </Tab>
                  )}
                  {(permission?.Organization?.includes('organization:view-user') || permission?.Organization?.includes('organization:view-role')) && (
                    <Tab eventKey="Users" title="Users">
                      <div className="module-content">
                        <Pills
                          type="Users"
                          modules={[
                            permission?.Organization?.includes('organization:view-user') && 'All Users',
                            permission?.Organization?.includes('organization:view-role') && 'Manage Roles',
                          ]}
                          subType="All Users"
                          users={users}
                          setUsers={setUsers}
                        />
                      </div>
                    </Tab>
                  )}
                  {permission?.Organization?.includes('organization:view-user') && (
                    <Tab eventKey="Teams" title="Teams">
                      <div className="module-content">
                        <Pills type="Teams" modules={['All teams']} subType="All teams" setModalShowTeam={setModalShowTeam} />
                      </div>
                    </Tab>
                  )}
                  {(permission?.Organization?.includes('organization:view-lms-setting') ||
                    permission?.Organization?.includes('organization:view-all-setting') ||
                    permission?.Organization?.includes('organization:view-media')) && (
                    <Tab eventKey="LMS" title="Integrations">
                      <div className="module-content">
                        <Pills
                          modules={[
                            permission?.Organization?.includes('organization:view-lms-setting') && 'LMS settings',
                            permission?.Organization?.includes('organization:view-all-setting') && 'LTI Tools',
                            permission?.Organization?.includes('organization:view-brightcove-setting') && 'BrightCove',
                            permission?.Organization?.includes('organization:view-media') && 'Media',
                            // 'Google Classroom',
                            // 'Microsoft Teams',
                          ]}
                          type="LMS"
                        />
                      </div>
                    </Tab>
                  )}
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
                  {permission.activeRole?.includes('admin') && !currentOrganization?.parent && (
                    <Tab eventKey="DefaultSso" title="Default SSO settings">
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
          {(activeForm === 'add_subject' || activeForm === 'edit_subject') && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">{activeForm === 'add_subject' ? <CreateSubject /> : <CreateSubject editMode />}</div>
            </div>
          )}
          {(activeForm === 'add_education_level' || activeForm === 'edit_education_level') && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">{activeForm === 'add_education_level' ? <CreateEducationLevel /> : <CreateEducationLevel editMode />}</div>
            </div>
          )}
          {(activeForm === 'add_author_tag' || activeForm === 'edit_author_tag') && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">{activeForm === 'add_author_tag' ? <CreateAuthorTag /> : <CreateAuthorTag editMode />}</div>
            </div>
          )}
          {(activeForm === 'add_activity_layout' || activeForm === 'edit_activity_layout') && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">{activeForm === 'add_activity_layout' ? <CreateActivityLayout /> : <CreateActivityLayout editMode />}</div>
            </div>
          )}
          {(activeForm === 'add_org' || activeForm === 'edit_org') && (
            <div className="form-new-popup-admin">
              <div className="inner-form-content" style={{ width: '944px' }}>
                {activeForm === 'add_org' ? <CreateOrg /> : <CreateOrg editMode />}
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
          {activeForm === 'add_brightcove' && (
            <div className="form-new-popup-admin">
              <div className="inner-form-content">
                <BrightCove mode={activeForm} />
              </div>
            </div>
          )}
          {activeForm === 'clone_brightcove' && (
            <div className="form-new-popup-admin">
              <div className="inner-form-content">
                <BrightCove mode={activeForm} clone />
              </div>
            </div>
          )}
          {activeForm === 'edit_bright_form' && (
            <div className="form-new-popup-admin">
              <div className="inner-form-content">
                <BrightCove mode={activeForm} editMode />
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

          {activeForm === 'clone_lti_tool' && (
            <div className="form-new-popup-admin">
              <FontAwesomeIcon
                icon="times"
                className="cross-all-pop"
                onClick={() => {
                  dispatch(removeActiveAdminForm());
                }}
              />
              <div className="inner-form-content">
                <CreateLtiTool editMode clone />
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
          {removeUser && <RemoveUser users={users} setUsers={setUsers} />}

          <EditProjectModel
            show={modalShow}
            onHide={() => setModalShow(false)}
            row={rowData}
            showFooter={true}
            activePage={activePageNumber}
            setAllProjectTab={setAllProjectTab}
            activeOrganization={activeOrganization}
          />
          <EditTeamModel show={modalShowTeam} onHide={() => setModalShowTeam(false)} activePage={activePageNumber} activeOrganization={activeOrganization} showFooter={true} />
        </>
      ) : (
        <div className="content-wrapper" style={{ padding: '20px' }}>
          <Alert variant="danger">You are not authorized to view this page.</Alert>
        </div>
      )}
      <MyVerticallyCenteredModal show={modalShowh5p} onHide={() => setModalShowh5p(false)} activity={currentActivity} showvideoH5p={true} activeType={'demo'} activities={true} />
    </div>
  );
}

export default AdminPanel;
