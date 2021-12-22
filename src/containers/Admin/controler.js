/* eslint-disable */
import React, { useState, useMemo, useEffect, useRef } from 'react';
// import PropTypes from "prop-types";
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { forgetAllFailedJobs, retryAllFailedJobs, setActiveAdminForm } from 'store/actions/admin';
import searchimg from 'assets/images/svg/search-icon-admin-panel.svg';
import filterImg from 'assets/images/svg/filter.svg';
import filterSearchIcon from 'assets/images/svg/filter-placeholder.svg';
// import csv from "assets/images/csv.png";
// import pdf from "assets/images/pdf.png";
import bulk from 'assets/images/bulk.png';
import InviteUser from 'containers/ManageOrganization/inviteAdmin';
import AddUser from 'containers/ManageOrganization/addUser';
import adminService from 'services/admin.service';
import { clearOrganizationState, getOrganization, getRoles, roleDetail, getAllOrganizationSearch, getsubOrgList } from 'store/actions/organization';
import { alphaNumeric } from 'utils';

function Controller(props) {
  const {
    paginationCounter,
    search,
    print,
    btnText,
    btnAction,
    importUser,
    jobType,
    SetJobType,
    logType,
    SetLogType,
    subTypeState,
    filter,
    activeRole,
    setActiveRole,
    setActivePage,
    type,
    searchQueryActivities,
    setSearchQueryActivities,
    searchQuery,
    searchQueryProject,
    setSearchQueryProject,
    searchQueryStats,
    setSearchQueryStats,
    setSearchQuery,
    searchQueryChangeHandler,
    searchProjectQueryChangeHandler,
    searchActivitiesQueryHandler,
    searchUserReportQueryHandler,
    size,
    setSize,
    tableHead,
    roles,
    inviteUser,
    subType,
    setChangeIndexValue,
    selectedActivityType,
    setSelectedActivityType,
  } = props;
  const importProject = useRef();
  const dispatch = useDispatch();
  const [allUsersAdded, setAllUsersAdded] = useState([]);
  const adminState = useSelector((state) => state.admin);
  const [activeRoleInComponent, setActiveRoleInComponent] = useState('');
  const organization = useSelector((state) => state.organization);
  const { permission, activeOrganization, currentOrganization } = organization;
  const { activityTypes } = useSelector((state) => state.admin);
  const { activeForm } = adminState;
  const [selectedIndexValue, setSelectedIndexValue] = useState('ALL');
  const [selectedIndexValueid, setSelectedIndexValueid] = useState(0);
  useMemo(() => {
    if (type === 'Users') {
      dispatch(getRoles());
    }
  }, []);

  useEffect(() => {
    if (roles?.length > 0 && subTypeState !== 'Manage Roles' && adminState?.activeTab === 'Users') {
      // if(!activeRoleInComponent) setActiveRoleInComponent(roles[0]?.display_name);
      if (!activeRole) {
        setActiveRole(roles[0]?.id);
        setActiveRoleInComponent(roles[0]?.display_name);
      } else if (activeRole) {
        setActiveRoleInComponent(roles.filter((role) => role.id === activeRole)[0]?.display_name);
      }
    } else if (roles?.length > 0 && subTypeState === 'Manage Roles') {
      setActiveRoleInComponent(roles[0]?.display_name);
    }
  }, [roles, adminState?.activeTab]);
  // sabtype
  // const sab = subType;
  // console.log(subTypeState);
  // console.log(subType);

  const updateIndexAction = (value, id) => {
    setSelectedIndexValue(value);
    setChangeIndexValue(id);
    setSelectedIndexValueid(id);
  };
  return (
    <div className="controller">
      {/* {(currentOrganization?.id !== activeOrganization?.id && type !== 'Users' ) && (
        <div className="btn-text">
          <button
            onClick={async () => {
              await dispatch(getOrganization(currentOrganization?.id));
              dispatch(clearOrganizationState());
              dispatch(getRoles());
            }}
          >
            Go to root organization
          </button>
        </div>
      )} */}

      {/* {!!filter && (
        <div className="filter-dropdown drop-counter ">
          Fillter by:
          <span>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                Select value
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <form className="radio-filter">
                  {tableHead?.map((head) => (
                    <div className="group">
                      <label>{head}</label>
                      <input type="checkbox" name="filter-table" />
                    </div>
                  ))}
                </form>
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </div>
      )} */}
      {/* LEFT SIDE OF CONTROLLER GOES HERE */}
      <div className="controller-left-side">
        {!!search && type === 'Users' && (
          <>
            <div className="search-bar" style={{ display: 'flex', flexDirection: 'column' }}>
              <input
                className=""
                type="text"
                // title="Enter at least 2 characters"
                placeholder="Search by email"
                value={searchQuery}
                onChange={searchQueryChangeHandler}
              />
              <img src={searchimg} alt="search" />
              {searchQuery.trim().length > 0 && searchQuery.trim().length < 2 && (
                <label className="flex" style={{ color: 'red' }}>
                  Enter at least 2 characters
                </label>
              )}
            </div>
          </>
        )}
        {!!search && type === 'LMS' && subType === 'All Settings' && (
          <div className="search-bar">
            <input className="" type="text" placeholder="Search by URL or Email" value={searchQuery} onChange={searchQueryChangeHandler} />
            <img src={searchimg} alt="search" />
          </div>
        )}

        {!!search && type === "LMS" && subType === 'LTI Tools' && (
          <div className="search-bar">
            <input
              className=""
              type="text"
              placeholder="Search by URL or User Email"
              value={searchQuery}
              onChange={searchQueryChangeHandler}
            />
            <img src={searchimg} alt="search" />
          </div>
        )}

        {!!search && type === 'DefaultSso' && (
          <div className="search-bar">
            <input className="" type="text" placeholder="Search by URL or Client Id" value={searchQuery} onChange={searchQueryChangeHandler} />
            <img src={searchimg} alt="search" />
          </div>
        )}
        {!!search && type === 'Stats' && (
          <div className="search-bar">
            <input
              className=""
              type="text"
              placeholder="Search"
              value={searchQueryStats}
              onChange={(e) => {
                if (e.target.value && alphaNumeric(e.target.value)) {
                  setSearchQueryStats(e.target.value);
                } else if (e.target.value === '') {
                  setSearchQueryStats('');
                  searchUserReportQueryHandler('', subTypeState);
                }
              }}
            />
            <img src={searchimg} alt="search" onClick={() => searchUserReportQueryHandler(searchQueryStats, subTypeState)} />
          </div>
        )}

        {!!search && type === 'Project' && (
          <div className="search-bar">
            <input
              className=""
              type="text"
              placeholder="Search"
              value={searchQueryProject}
              onChange={(e) => {
                if (e.target.value) {
                  setActivePage(1);
                  setSearchQueryProject(e.target.value);
                  searchProjectQueryChangeHandler(e.target.value, selectedIndexValueid, subType);
                } else if (e.target.value === '') {
                  setActivePage(1);
                  setSearchQueryProject('');
                  searchProjectQueryChangeHandler('', selectedIndexValueid, subType);
                }
              }}
            />
            <img src={searchimg} alt="search" onClick={() => searchProjectQueryChangeHandler(searchQueryProject, selectedIndexValueid, subType)} />
          </div>
        )}

        {!!search && type === 'Organization' && (
          <div className="search-bar">
            <input
              className=""
              type="text"
              placeholder="Search Organization"
              value={searchQueryProject}
              onChange={(e) => {
                if (e.target.value?.trim()) {
                  dispatch(getAllOrganizationSearch(activeOrganization.id, e.target.value?.trim()));
                } else if (e.target.value === '') {
                  dispatch(getsubOrgList(activeOrganization?.id));
                }
              }}
            />
            <img src={searchimg} alt="search" />
          </div>
        )}
        {/* {!!search && type === 'Activities' && subType === 'Activity Types' && (
        <div className="search-bar">
          <input type="text" placeholder="Search" onChange={(e) => searchActivitiesQueryHandler(e, subType)} />
          <img src={searchimg} alt="search" />
        </div>
      )} */}
        {!!search && type === 'Activities' && subType === 'Activity Items' && (
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search by activity name"
              onChange={(e) => {
                if (e.target.value) {
                  setSearchQueryActivities(e.target.value);
                } else if (e.target.value === '') {
                  setSearchQueryActivities('');
                  searchActivitiesQueryHandler('', subType);
                }
              }}
            />
            <img src={searchimg} alt="search" onClick={() => searchActivitiesQueryHandler(searchQueryActivities, subType)} />
          </div>
        )}
        {paginationCounter && (
          <div className="pagination-counter drop-counter ">
            Row per page
            <span>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">{size}</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setSize(10);
                    }}
                  >
                    10
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setSize(25);
                    }}
                  >
                    25
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setSize(50);
                    }}
                  >
                    50
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      setSize(100);
                    }}
                  >
                    100
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
        )}
        {/* FILTER FOR PROJECT TABS */}
        {type === 'Project' && (subType === 'all' || subType === 'Library requests') && (
          <div className="filter-dropdown-project">
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                <img src={filterImg} alt="filter" />
                Filter
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <div className="authorName-project">
                  <label>Author</label>
                  <input type="text" />
                  <img src={filterSearchIcon} alt="filterSearchIcon" />
                </div>
                <div className="createdFrom-project">
                  <label>Created</label>
                  <div className="row-project-filter">
                    <div className="from-project">
                      <span>From</span>
                      <input
                        type="text"
                        placeholder="MM/DD/YYYY"
                        onFocus={(e) => {
                          e.target.type = 'date';
                        }}
                      />
                    </div>
                    <div className="to-project">
                      <span>To</span>
                      <input
                        type="text"
                        placeholder="MM/DD/YYYY"
                        onFocus={(e) => {
                          e.target.type = 'date';
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="updatedOn-project">
                  <label>Updated</label>
                  <div className="row-project-filter">
                    <div className="from-project">
                      <span>From</span>
                      <input
                        type="text"
                        placeholder="MM/DD/YYYY"
                        onFocus={(e) => {
                          e.target.type = 'date';
                        }}
                      />
                    </div>
                    <div className="to-project">
                      <span>To</span>
                      <input
                        type="text"
                        placeholder="MM/DD/YYYY"
                        onFocus={(e) => {
                          e.target.type = 'date';
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="status-project">
                  <div className="library-status">
                    <label>Library status</label>
                    <span>
                      <input type="radio" />
                      Requested
                    </span>
                    <span>
                      <input type="radio" />
                      Not Requested
                    </span>
                    {subType === 'Library requests' && (
                      <>
                        <span>
                          <input type="radio" />
                          Approved
                        </span>
                        <span>
                          <input type="radio" />
                          Rejected
                        </span>
                      </>
                    )}
                  </div>
                  <div className="shared-status">
                    <label>Shared status</label>
                    <span>
                      <input type="radio" />
                      Enabled
                    </span>
                    <span>
                      <input type="radio" />
                      Not Enabled
                    </span>
                  </div>
                </div>
                <div type="button" className="filter-btn-project">
                  <img src={filterImg} alt="filter" />
                  Apply Filters
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        )}
        {/* FILTER FOR ACTIVITY ITEMS */}
        {subType === 'Activity Items' && (
          <div className="filter-dropdown-activityItems">
            Filter by activity type
            <span>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">{selectedActivityType?.title || 'Select'}</Dropdown.Toggle>

                <Dropdown.Menu>
                  {selectedActivityType && (
                    <Dropdown.Item onClick={() => setSelectedActivityType(null)}>
                      Select
                    </Dropdown.Item>
                  )}
                  {activityTypes?.map((item) => (
                    <Dropdown.Item onClick={() => setSelectedActivityType(item)}>
                      {item.title}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>)}
        {!!filter && subType === 'index' && (
          <div className="filter-dropdown drop-counter ">
            Index Value:
            <span>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">{selectedIndexValue}</Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      updateIndexAction('ALL', 0);
                      setActivePage(1);
                    }}
                  >
                    ALL
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      updateIndexAction('REQUESTED', 1);
                      setActivePage(1);
                    }}
                  >
                    REQUESTED
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      updateIndexAction('REJECTED', 2);
                      setActivePage(1);
                    }}
                  >
                    REJECTED
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => {
                      updateIndexAction('APPROVED', 3);
                      setActivePage(1);
                    }}
                  >
                    APPROVED
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
        )}
        {roles?.length > 0 && type === 'Users' ? (
          <div className="filter-dropdown role-dropdown">
            {subTypeState === 'Manage Roles' ? 'Select role:' : 'Filter by role'}
            <span>
              <Dropdown>
                <Dropdown.Toggle id="dropdown-basic">{activeRoleInComponent}</Dropdown.Toggle>

                <Dropdown.Menu>
                  {roles?.map((head) => (
                    <div key={head} className="group">
                      <Dropdown.Item
                        onClick={() => {
                          setActiveRoleInComponent(head.display_name);
                          if (subTypeState === 'Manage Roles') dispatch(roleDetail(activeOrganization.id, head.id));
                          if (subTypeState === 'All Users' && activeRole != head.id) {
                            setSearchQuery('');
                            setActiveRole(head.id);
                            setActivePage(1);
                          }
                        }}
                      >
                        {head.display_name}
                      </Dropdown.Item>
                    </div>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </span>
          </div>
        ) : null}
        {type === 'Stats' && subTypeState === 'Queues: Jobs' && (
          <Dropdown name="jobType" id="jobType">
            <Dropdown.Toggle id="dropdown-basic">{jobType.display_name}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item value="1" name="Pending" onClick={() => SetJobType({ value: 1, display_name: 'Pending' })}>
                Pending
              </Dropdown.Item>
              <Dropdown.Item value="2" name="Failed" onClick={() => SetJobType({ value: 2, display_name: 'Failed' })}>
                Failed
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {type === 'Stats' && subTypeState === 'Queues: Logs' && (
          <Dropdown name="logType" id="logType">
            <Dropdown.Toggle id="dropdown-basic">{logType.display_name}</Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item value="all" name="All" onClick={() => SetLogType({ value: 'all', display_name: 'All' })}>
                All
              </Dropdown.Item>
              <Dropdown.Item value="1" name="Running" onClick={() => SetLogType({ value: 1, display_name: 'Running' })}>
                Running
              </Dropdown.Item>
              <Dropdown.Item value="2" name="Failed" onClick={() => SetLogType({ value: 2, display_name: 'Failed' })}>
                Failed
              </Dropdown.Item>
              <Dropdown.Item value="3" name="Completed" onClick={() => SetLogType({ value: 3, display_name: 'Completed' })}>
                Completed
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        {type === 'Stats' && subTypeState === 'Queues: Jobs' && jobType.value === 2 && (
          <div className="retryandforget">
            <button
              className="retry"
              onClick={() => {
                dispatch(retryAllFailedJobs());
              }}
            >
              Retry All
            </button>
            <button
              className="forget"
              onClick={() => {
                dispatch(forgetAllFailedJobs());
              }}
            >
              Forget All
            </button>
          </div>
        )}

        {/* ROW PER PAGE */}

      </div>
      {/* RIGHT SIDE OF CONTROLLER GOES HERE */}
      <div className="controller-right-side">
        {!!importUser && type === 'Project' && subType === 'all' && (
          <div
            className="import-user"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              importProject.current.click();
            }}
          >
            <div className="img-section">
              <img src={bulk} alt="upload" />
            </div>
            <div>Import Project</div>
            <input
              type="file"
              ref={importProject}
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files.length === 0) {
                  return true;
                }
                if (!e.target.files[0].type.includes('zip')) {
                  Swal.fire({
                    title: 'Invalid File',
                    icon: 'error',
                    text: 'please select zip file',
                  });
                } else {
                  Swal.fire({
                    title: 'Importing Project',
                    icon: 'info',
                    text: 'please wait...',
                    allowOutsideClick: false,
                    onBeforeOpen: () => {
                      Swal.showLoading();
                    },
                    button: false,
                  });
                  let formData = new FormData();
                  formData.append('project', e.target.files[0]);
                  const response = adminService.importProject(activeOrganization.id, formData);
                  response.then((res) => {
                    Swal.fire({
                      icon: 'success',
                      html: res?.message,
                    });
                  });
                }
              }}
            />
          </div>
        )}

        {/* {!!print && (
        <div className="print-info">
          <div>print</div>
          <div className="img-section">
            <img src={csv} alt="csv" />
            <img src={pdf} alt="pdf" />
          </div>
        </div>
      )} */}
        {!!btnText && subType === 'Activity Types' && (
          <div className="btn-text">
            <button
              onClick={() => {
                if (btnAction === 'add_activity_type') {
                  dispatch(setActiveAdminForm('add_activity_type'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}
        {!!btnText && subType === 'Activity Items' && (
          <div className="btn-text">
            <button
              onClick={() => {
                if (btnAction === 'add_activity_item') {
                  dispatch(setActiveAdminForm('add_activity_item'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}
        {!!btnText && subTypeState === 'Manage Roles' && permission?.Organization.includes('organization:add-role') && (
          <div className="btn-text">
            <button
              onClick={() => {
                if (btnAction === 'add_role') {
                  dispatch(setActiveAdminForm('add_role'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}
        {!!btnText && subTypeState === 'All Users' && permission?.Organization.includes('organization:add-user') && (
          <div className="btn-text">
            <button
              onClick={() => {
                if (btnAction === 'create_user') {
                  dispatch(setActiveAdminForm('create_user'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}
        {!!btnText && type === 'Organization' && permission?.Organization.includes('organization:create') && (
          <div className="btn-text">
            <button
              onClick={() => {
                if (btnAction === 'add_org') {
                  dispatch(setActiveAdminForm('add_org'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}
        {!!btnText && type === 'LMS' && subType === 'All Settings' && (
          <div className="btn-text">
            <button
              onClick={() => {
                if (btnAction === 'add_lms') {
                  dispatch(setActiveAdminForm('add_lms'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}

        {!!btnText && type === 'LMS' && subType === 'LTI Tools' && (
          <div className="btn-text">
            <button
              onClick={() => {
                if (btnAction === 'add_lti_tool') {
                  dispatch(setActiveAdminForm('add_lti_tool'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}

        {!!btnText && type === 'DefaultSso' && permission?.Organization.includes('organization:create-default-sso') && (
          <div className="btn-text">
            <button
              onClick={() => {
                if (btnAction === 'add_default_sso') {
                  dispatch(setActiveAdminForm('add_default_sso'));
                }
              }}
            >
              <FontAwesomeIcon icon="plus" />
              {btnText}
            </button>
          </div>
        )}
        {/* {inviteUser && permission?.Organization?.includes('organization:invite-members') && (
          <div className="btn-text">
            <div className="add-user-btn">
              <Dropdown drop="down" id="dropdown-button-drop-down">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Invite external user
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <InviteUser />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        )} */}

        {/* {permission?.Organization?.includes('organization:view-user') && type === 'Users' && subTypeState === 'All Users' && (
          <div className="btn-text">
            <div className="add-user-btn">
              <Dropdown drop="down" id="dropdown-button-drop-down">
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Add internal user
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <AddUser setAllUsersAdded={setAllUsersAdded} allUsersAdded={allUsersAdded} method="create" />
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        )} */}
      </div>

      {/* {(currentOrganization?.id !== activeOrganization?.id && type !== 'Users' ) && (
        <div className="btn-text">
          <button
            onClick={async () => {
              await dispatch(getOrganization(currentOrganization?.id));
              dispatch(clearOrganizationState());
              dispatch(getRoles());
            }}
          >
            Go to root organization
          </button>
        </div>
      )} */}



    </div>
  );
}

// Pills.propTypes = {
//   manage: PropTypes.object.isRequired,
//   type:PropTypes.string.isRequired,
// };

export default Controller;
