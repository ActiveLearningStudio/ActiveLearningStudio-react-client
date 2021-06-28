/* eslint-disable */
import React, { useState, useMemo, useEffect, useRef } from "react";
// import PropTypes from "prop-types";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { forgetAllFailedJobs, retryAllFailedJobs, setActiveAdminForm } from "store/actions/admin";
import searchimg from "assets/images/search-icon.png";
// import csv from "assets/images/csv.png";
// import pdf from "assets/images/pdf.png";
import bulk from "assets/images/bulk.png";
import InviteUser from "containers/ManageOrganization/inviteAdmin";
import AddUser from "containers/ManageOrganization/addUser";
import adminService from "services/admin.service";
import {
  clearOrganizationState,
  getOrganization,
  getRoles,
  roleDetail,
} from "store/actions/organization";

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
    searchQuery,
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
  } = props;
  const importProject = useRef();
  const dispatch = useDispatch();
  const [allUsersAdded, setAllUsersAdded] = useState([]);
  const adminState = useSelector((state) => state.admin);
  const [activeRoleInComponent, setActiveRoleInComponent] = useState("");
  const organization = useSelector((state) => state.organization);
  const { permission, activeOrganization, currentOrganization } = organization;
  const { activeForm } = adminState;
  const [selectedIndexValue, setSelectedIndexValue] = useState("REQUESTED");
  const [selectedIndexValueid, setSelectedIndexValueid] = useState(1);
  useMemo(() => {
    if (type === "Users") {
      dispatch(getRoles());
    }
  }, []);

  useEffect(() => {
    if (roles?.length > 0 && subTypeState !== "Manage Roles" && adminState?.activeTab === 'Users') {
      // if(!activeRoleInComponent) setActiveRoleInComponent(roles[0]?.display_name);
      if (!activeRole) {
        setActiveRole(roles[0]?.id) ;
        setActiveRoleInComponent(roles[0]?.display_name);
      }
      else if (activeRole) {
        setActiveRoleInComponent(roles.filter(role => role.id === activeRole)[0].display_name);
      };
    } else if (roles?.length > 0 && subTypeState === "Manage Roles") {
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
    setSelectedIndexValueid(id)
  };
  return (
    <div className="controller">
      {paginationCounter && (
        <div className="pagination-counter drop-counter ">
          show:
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
          entries
        </div>
      )}
      {currentOrganization?.id !== activeOrganization?.id && (
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
      )}
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
      {!!filter && subType === "index" && (
        <div className="filter-dropdown drop-counter ">
          Index Value:
          <span>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                {selectedIndexValue}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() => {
                    updateIndexAction("REQUESTED", 1);
                  }}
                >
                  REQUESTED
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    updateIndexAction("REJECTED", 2);
                  }}
                >
                  REJECTED
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => {
                    updateIndexAction("APPROVED", 3);
                  }}
                >
                  APPROVED
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </span>
        </div>
      )}
      {(roles?.length > 0 && type === "Users") ? (
        <div className="filter-dropdown drop-counter ">
          {subTypeState === 'Manage Roles' ? "Select role:" : "Filter by role:"}
          <span>
            <Dropdown>
              <Dropdown.Toggle id="dropdown-basic">
                {activeRoleInComponent}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {roles?.map((head) => (
                  <div className="group">
                    <Dropdown.Item
                      onClick={() => {
                        setActiveRoleInComponent(head.display_name);
                        if (subTypeState === 'Manage Roles')
                          dispatch(roleDetail(activeOrganization.id, head.id));
                        if (subTypeState === 'All users') {
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
      {type === 'Stats' && subTypeState === 'Queues:Jobs' &&
        <Dropdown name="jobType" id="jobType">
          <Dropdown.Toggle id="dropdown-basic">
            {jobType.display_name}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item value='1' name='Pending' onClick={() => SetJobType({ value: 1, display_name: 'Pending' })}>Pending</Dropdown.Item>
            <Dropdown.Item value='2' name='Failed' onClick={() => SetJobType({ value: 2, display_name: 'Failed' })}>Failed</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      }
      {type === 'Stats' && subTypeState === 'Queues:Logs' &&
        <Dropdown name="logType" id="logType">
          <Dropdown.Toggle id="dropdown-basic">
            {logType.display_name}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item value='all' name='All' onClick={() => SetLogType({ value: 'all', display_name: 'All' })}>All</Dropdown.Item>
            <Dropdown.Item value='1' name='Running' onClick={() => SetLogType({ value: 1, display_name: 'Running' })}>Running</Dropdown.Item>
            <Dropdown.Item value='2' name='Failed' onClick={() => SetLogType({ value: 2, display_name: 'Failed' })}>Failed</Dropdown.Item>
            <Dropdown.Item value='3' name='Completed' onClick={() => SetLogType({ value: 3, display_name: 'Completed' })}>Completed</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      }
      {type === 'Stats' && subTypeState === 'Queues:Jobs' && jobType.value === 2 && (
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
      {!!search && type === "Users" && (
        <div className="search-bar">
          <input
            className=""
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={searchQueryChangeHandler}
          />
          <img src={searchimg} alt="search" />
        </div>
      )}
      {!!search && type === "LMS" && (
        <div className="search-bar">
          <input
            className=""
            type="text"
            placeholder="Search by URL"
            value={searchQuery}
            onChange={searchQueryChangeHandler}
          />
          <img src={searchimg} alt="search" />
        </div>
      )}
      {!!search && type === "Stats" && (
        <div className="search-bar">
          <input
            className=""
            type="text"
            placeholder="Search"
            onChange={(e) => searchUserReportQueryHandler(e, subTypeState)}
          />
          <img src={searchimg} alt="search" />
        </div>
      )}

      {!!search && type === "Project" && (
        <div className="search-bar">
          <input
            className=""
            type="text"
            placeholder="Search"

            onChange={(e) => searchProjectQueryChangeHandler(e, selectedIndexValueid, subType)}
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
          <input type="text" placeholder="Search" onChange={(e) => searchActivitiesQueryHandler(e, subType)} />
          <img src={searchimg} alt="search" />
        </div>
      )}
      {!!importUser && type === 'Project' && subType === 'all' && (
        <div className="import-user"
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
              if (!(e.target.files[0].type.includes('zip'))) {
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
                formData.append("project", e.target.files[0]);
                const response = adminService.importProject(activeOrganization.id, formData);
                response.then((res) => {

                  Swal.fire({
                    icon: "success",
                    text: res?.message,

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
              if (btnAction === "add_activity_type") {
                dispatch(setActiveAdminForm("add_activity_type"));
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
              if (btnAction === "add_activity_item") {
                dispatch(setActiveAdminForm("add_activity_item"))
              }
            }}
          >
            <FontAwesomeIcon icon="plus" />
            {btnText}
          </button>
        </div>
      )}
      {!!btnText && subTypeState === 'Manage Roles' && (
        <div className="btn-text">
          <button
            onClick={() => {
              if (btnAction === "add_role") {
                dispatch(setActiveAdminForm("add_role"));
              }
            }}
          >
            <FontAwesomeIcon icon="plus" />
            {btnText}
          </button>
        </div>
      )}
      {!!btnText && subTypeState === 'All users' && permission?.Organization.includes('organization:add-user')  && (
        <div className="btn-text">
          <button
            onClick={() => {
              if (btnAction === "create_user") {
                dispatch(setActiveAdminForm("create_user"));
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
              if (btnAction === "add_org") {
                dispatch(setActiveAdminForm("add_org"));
              }
            }}
          >
            <FontAwesomeIcon icon="plus" />
            {btnText}
          </button>
        </div>
      )}
      {!!btnText && type === 'LMS' && (
        <div className="btn-text">
          <button
            onClick={() => {
             if (btnAction === "add_lms") {
                dispatch(setActiveAdminForm("add_lms"));
              }
            }}
          >
            <FontAwesomeIcon icon="plus" />
            {btnText}
          </button>
        </div>
      )}
      {inviteUser && permission?.Organization?.includes('organization:invite-members') && (
        <div className="btn-text">
          <div className="add-user-btn">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Invite external user
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <InviteUser />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      )}
      {permission?.Organization?.includes('organization:view-user') && type === "Users" && subTypeState === 'All users' && (
        <div className="btn-text">
          <div className="add-user-btn">
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Add internal user
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <AddUser
                  setAllUsersAdded={setAllUsersAdded}
                  allUsersAdded={allUsersAdded}
                  method="create"
                />
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      )}
    </div>
  );
}

// Pills.propTypes = {
//   manage: PropTypes.object.isRequired,
//   type:PropTypes.string.isRequired,
// };

export default Controller;
