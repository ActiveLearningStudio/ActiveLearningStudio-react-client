/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";
import adminService from "services/admin.service";
import projectService from "services/project.service";
import * as actionTypes from "store/actionTypes";
import {
  deleteUserFromOrganization,
  deleteOrganization,
  getOrganization,
  clearOrganizationState,
  removeUserFromOrganization,
  getRoles,
  updatePageNumber,
} from "store/actions/organization";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, withRouter } from "react-router-dom";
import { simpleSearchAction } from "store/actions/search";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import {
  forgetSpecificFailedJob,
  retrySpecificFailedJob,
  setActiveAdminForm,
  setActiveTab,
  setCurrentProject,
  setCurrentUser,
} from "store/actions/admin";
import {
  deleteActivityItem,
  deleteActivityType,
  getActivityItems,
  loadResourceTypesAction,
  selectActivityItem,
  selectActivityType,
} from "store/actions/resource";

function Table(props) {
  const {
    tableHead,
    history,
    data,
    type,
    jobType,
    subTypeState,
    activePage,
    setActivePage,
    searchAlertToggler,
    searchAlertTogglerStats,
    subType,
    setCurrentTab,
    setChangeIndexValue,
    changeIndexValue,
    setAllProjectIndexTab,
    changeProjectFromorg,
  } = props;
  const organization = useSelector((state) => state.organization);
  const auth = useSelector((state) => state.auth);
  const { newlyCreated, newlyEdit } = useSelector((state) => state.admin);
  const { paginations } = useSelector((state) => state.ui);
  const { activeOrganization, allSuborgList, permission } = organization;
  const allState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [localStateData, setLocalStateData] = useState([]);
  const [localstatePagination, setLocalStatePagination] = useState();
  //update table after crud
  useEffect(() => {
    if (type === "LMS") {
      if (newlyCreated) {
        setLocalStateData([newlyCreated, ...data?.data]);
      } else if (newlyEdit) {
        setLocalStateData(
          data?.data.map((lms) => {
            if (lms.id === newlyEdit?.id) {
              return newlyEdit;
            } else {
              return lms;
            }
          })
        );
      }
    }
    dispatch({
      type: actionTypes.NEWLY_EDIT_RESOURCE,
      payload: null,
    });
    dispatch({
      type: actionTypes.NEWLY_CREATED_RESOURCE,
      payload: null,
    });
  }, [newlyCreated, newlyEdit]);

  //update table after search and first time
  useEffect(() => {
    if (type === "LMS" || type === "Project") {
      if (data?.data) {
        setLocalStateData(data?.data);
      } else {
        setLocalStateData(data);
      }
      setLocalStatePagination(data);
    }
  }, [data]);
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure you want to delete this User?",
      text: "This action is Irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#084892",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Do you want to preserve user data?",
          showCancelButton: true,
          confirmButtonColor: "#084892",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          const response = dispatch(
            deleteUserFromOrganization(
              user?.id,
              result.isConfirmed ? true : false
            )
          );
          response
            .then(() => {
              // dispatch(getOrgUsers(organization?.activeOrganization?.id, organization?.activePage, organization?.size, organization?.activeRole));
            })
            .catch((e) => {
              console.log(e);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "User Deletion failed, kindly try again.",
              });
            });
        });
      }
    });
  };
  const handleRemoveUser = (user) => {
    Swal.fire({
      title: "Are you sure you want to remove this User?",
      text: "This action is Irreversible",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#084892",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Do you want to preserve user data?",
          showCancelButton: true,
          confirmButtonColor: "#084892",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          const response = dispatch(
            removeUserFromOrganization(
              user?.id,
              result.isConfirmed ? true : false
            )
          );
          response
            .then(() => {
              //     dispatch(getOrgUsers(organization?.activeOrganization?.id, organization?.activePage, organization?.size, organization?.activeRole));
            })
            .catch((e) => {
              console.log(e);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "User Remove failed, kindly try again.",
              });
            });
        });
      }
    });
  };
  //const history = useHistory();
  return (
    <div className="table-data">
      <div className="responsive-table">
        <table>
          <thead>
            {tableHead?.map((head) =>
              head === "Users" &&
              permission?.Organization?.includes("organization:view-user") ? (
                <th> {head} </th>
              ) : head !== "Users" ? (
                <th>{head}</th>
              ) : null
            )}
          </thead>
          <tbody>
            {type === "Stats" &&
              subTypeState === "Report" &&
              (data?.data?.length > 0 ? (
                data?.data?.map((row) => (
                  <tr>
                    <td>{row.first_name}</td>
                    <td>{row.last_name}</td>
                    <td>{row.email}</td>
                    <td>{row.projects_count}</td>
                    <td>{row.playlists_count}</td>
                    <td>{row.activities_count}</td>
                  </tr>
                ))
              ) : data?.data?.length === 0 || searchAlertTogglerStats === 0 ? (
                <tr>
                  <td colspan="6">
                    <Alert variant="warning">No Reports Found</Alert>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colspan="6">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
            {type === "Stats" &&
              subTypeState === "Queues: Jobs" &&
              (data?.data?.length > 0 ? (
                data?.data.map((job) => (
                  <tr>
                    <td>{job.id}</td>
                    <td>{job.queue}</td>
                    <td>{job.payload}</td>
                    <td>{job.exception}</td>
                    <td>{job.time}</td>
                    {jobType.value === 2 ? (
                      <td>
                        <div className="links">
                          <Link
                            onClick={() => {
                              dispatch(retrySpecificFailedJob(job.id));
                            }}
                          >
                            Retry
                          </Link>
                          <Link
                            onClick={() => {
                              dispatch(forgetSpecificFailedJob(job.id));
                            }}
                          >
                            Forget
                          </Link>
                        </div>
                      </td>
                    ) : (
                      <td>{job.action ? job.action : "N/A"}</td>
                    )}
                  </tr>
                ))
              ) : data?.data?.length === 0 || searchAlertTogglerStats === 0 ? (
                <tr>
                  <td colspan="6">
                    <Alert variant="warning">No Queue: Jobs Found</Alert>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colspan="6">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
            {type === "Stats" &&
              subTypeState === "Queues: Logs" &&
              (data?.data?.length > 0 ? (
                data?.data.map((job) => (
                  <tr>
                    <td>{job.name}</td>
                    <td>
                      {job.is_finished && job.failed && (
                        <Alert variant="danger">Failed</Alert>
                      )}
                      {!job.is_finished && !job.failed && (
                        <Alert variant="primary">Running</Alert>
                      )}
                      {job.is_finished && !job.failed && (
                        <Alert variant="success">Success</Alert>
                      )}
                    </td>
                    <td>{job.started_at}</td>
                    <td>
                      Queue: {job.queue} Attempt: {job.attempt}
                    </td>
                    <td>{job.time_elapsed}</td>
                    <td>{job.exception_message}</td>
                  </tr>
                ))
              ) : data?.data?.length === 0 || searchAlertTogglerStats === 0 ? (
                <tr>
                  <td colspan="6">
                    <Alert variant="warning">No Queue: Logs Found</Alert>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colspan="6">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
            {type === "LMS" &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData?.map((row) => (
                    <tr>
                      <td>{row.lms_url}</td>
                      <td>{row.lms_name}</td>
                      <td>
                        {row.user?.first_name + " " + row.user?.last_name}
                      </td>
                      <td>{row?.user?.email}</td>
                      <td>{row?.site_name}</td>
                      <td>{row?.description}</td>
                      <td>
                        <div className="links">
                          {true && (
                            <Link
                              onClick={() => {
                                dispatch({
                                  type: "SET_ACTIVE_EDIT",
                                  payload: row,
                                });
                                dispatch(setActiveAdminForm("clone_lms"));
                              }}
                            >
                              &nbsp;&nbsp;Clone&nbsp;&nbsp;
                            </Link>
                          )}
                          {true && (
                            <Link
                              onClick={() => {
                                Swal.fire({
                                  title:
                                    "Are you sure you want to delete this User LMS settings?",
                                  text: "This action is Irreversible",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#084892",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Yes, delete it!",
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    Swal.fire({
                                      title: "LMS Srttings",
                                      icon: "info",
                                      text: "Deleting User LMS Settings...",
                                      allowOutsideClick: false,
                                      onBeforeOpen: () => {
                                        Swal.showLoading();
                                      },
                                      button: false,
                                    });
                                    const response = adminService.deleteLmsProject(
                                      activeOrganization?.id,
                                      row?.id
                                    );
                                    response
                                      .then((res) => {
                                        Swal.fire({
                                          icon: "success",
                                          text: res?.message,
                                        });
                                        const filterLMS = localStateData.filter(
                                          (each) => each.id != row.id
                                        );
                                        console.log(filterLMS);
                                        setLocalStateData(filterLMS);
                                      })
                                      .catch((err) => console.log(err));
                                  }
                                });
                              }}
                            >
                              &nbsp;&nbsp;Delete&nbsp;&nbsp;
                            </Link>
                          )}
                          {true && (
                            <Link
                              onClick={() => {
                                dispatch({
                                  type: "SET_ACTIVE_EDIT",
                                  payload: row,
                                });
                                dispatch(setActiveAdminForm("edit_lms"));
                              }}
                            >
                              &nbsp;&nbsp;Edit&nbsp;&nbsp;
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colspan="11">
                      <Alert variant="warning">No integration found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colspan="11">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
            {type === "Users" &&
              (data?.data?.length > 0 ? (
                data?.data.map((user) => (
                  <tr>
                    <td>
                      {user.organization_joined_at
                        ? user.organization_joined_at
                        : "NA"}
                    </td>
                    <td>{user.first_name ? user.first_name : "NA"}</td>
                    <td>{user.last_name ? user.last_name : "NA"}</td>
                    <td>{user.email ? user.email : "NA"}</td>
                    <td>
                      {activeOrganization?.name
                        ? activeOrganization?.name
                        : "NA"}
                    </td>
                    <td>
                      {user.organization_type ? user.organization_type : "NA"}
                    </td>
                    <td>
                      {user.organization_role ? user.organization_role : "NA"}
                    </td>
                    <td>
                      <div className="links">
                        {permission?.Organization.includes(
                          "organization:update-user"
                        ) && (
                          <Link
                            onClick={() => {
                              dispatch(setCurrentUser(user));
                              dispatch(setActiveAdminForm("edit_user"));
                            }}
                          >
                            Edit
                          </Link>
                        )}
                        {permission?.Organization.includes(
                          "organization:remove-user"
                        ) &&
                          auth?.user?.id !== user.id && (
                            <Link onClick={() => handleRemoveUser(user)}>
                              &nbsp;&nbsp;Remove&nbsp;&nbsp;
                            </Link>
                          )}
                        {permission?.Organization.includes(
                          "organization:delete-user"
                        ) &&
                          auth?.user?.id !== user.id && (
                            <Link onClick={() => handleDeleteUser(user)}>
                              Delete
                            </Link>
                          )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : searchAlertToggler === 0 || data?.data?.length === 0 ? (
                <tr>
                  <td colspan="8">
                    <Alert variant="warning">No User Found</Alert>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colspan="8">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
            {type === "Organization" &&
              (allSuborgList ? (
                allSuborgList.length > 0 ? (
                  allSuborgList?.map((row) => (
                    <tr className="org-rows">
                      <td>
                        <img
                          src={global.config.resourceUrl + row.image}
                          alt=""
                        />
                      </td>
                      <td>
                        <Link
                          onClick={async () => {
                            Swal.fire({
                              title: "Please Wait !",
                              html: "Updating View ...",
                              allowOutsideClick: false,
                              onBeforeOpen: () => {
                                Swal.showLoading();
                              },
                            });
                            if (
                              permission?.Organization?.includes(
                                "organization:view"
                              )
                            )
                              await dispatch(getOrganization(row.id));
                            Swal.close();
                            dispatch({
                              type: actionTypes.UPDATE_PAGINATION,
                              payload: [...paginations, row],
                            });
                            if (row.projects_count > 0) {
                              if (
                                permission?.Organization?.includes(
                                  "organization:view"
                                )
                              )
                                await dispatch(getOrganization(row.id));
                              dispatch(clearOrganizationState());
                              dispatch(getRoles());
                              // dispatch(setActiveTab('Project'));
                              // dispatch(clearOrganizationState());
                              // dispatch(getRoles());
                            }
                          }}
                        >
                          {row.name}
                        </Link>
                      </td>
                      <td>{row.domain}</td>
                      <td>
                        {row.projects_count > 0 ? (
                          <div
                            className="view-all"
                            onClick={async () => {
                              Swal.fire({
                                title: "Please Wait !",
                                html: "Updating View ...",
                                allowOutsideClick: false,
                                onBeforeOpen: () => {
                                  Swal.showLoading();
                                },
                              });
                              if (
                                permission?.Organization?.includes(
                                  "organization:view"
                                )
                              )
                                await dispatch(getOrganization(row.id));
                              Swal.close();
                              if (row.projects_count > 0) {
                                if (
                                  permission?.Organization?.includes(
                                    "organization:view"
                                  )
                                )
                                  await dispatch(getOrganization(row.id));
                                dispatch(clearOrganizationState());
                                dispatch(getRoles());
                                dispatch(setActiveTab("Project"));
                              }
                            }}
                          >
                            {row.projects_count}
                          </div>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      <td>
                        {row.suborganization_count > 0 ? (
                          <Link
                            className="view-all"
                            onClick={async () => {
                              if (row.suborganization_count > 0) {
                                Swal.fire({
                                  title: "Please Wait !",
                                  html: "Updating View ...",
                                  allowOutsideClick: false,
                                  onBeforeOpen: () => {
                                    Swal.showLoading();
                                  },
                                });

                                if (
                                  permission?.Organization?.includes(
                                    "organization:view"
                                  )
                                )
                                  await dispatch(getOrganization(row.id));
                                Swal.close();
                                dispatch(clearOrganizationState());
                                dispatch(getRoles());
                              }
                            }}
                          >
                            {row.suborganization_count || 0}
                          </Link>
                        ) : (
                          "N/A"
                        )}
                      </td>
                      {permission?.Organization?.includes(
                        "organization:view-user"
                      ) && (
                        <td>
                          {row.users_count > 0 ? (
                            <Link
                              className="view-all"
                              onClick={async () => {
                                if (row.users_count > 0) {
                                  Swal.fire({
                                    title: "Please Wait !",
                                    html: "Updating View ...",
                                    allowOutsideClick: false,
                                    onBeforeOpen: () => {
                                      Swal.showLoading();
                                    },
                                  });
                                  if (
                                    permission?.Organization?.includes(
                                      "organization:view"
                                    )
                                  )
                                    await dispatch(getOrganization(row.id));
                                  Swal.close();
                                  dispatch({
                                    type: actionTypes.UPDATE_PAGINATION,
                                    payload: [...paginations, row],
                                  });
                                  dispatch(clearOrganizationState());
                                  dispatch(getRoles());
                                  dispatch(setActiveTab("Users"));
                                }
                              }}
                            >
                              {row.users_count}
                            </Link>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      )}
                      {/* <td>
                    {row.groups_count > 0 ? (
                      <Link
                        to={`/studio/org/${allState?.organization?.currentOrganization?.domain}/groups`}
                        className="view-all"
                        onClick={
                          async () => {
                            if (permission?.Organization?.includes('organization:view')) await dispatch(getOrganization(row.id));
                            dispatch(clearOrganizationState());
                            dispatch(getRoles());
                          }
                        }
                      >
                        {row.groups_count}
                      </Link>
                    ) : 'N/A'}
                  </td> */}
                      <td>
                        {row.teams_count > 0 ? (
                          <Link
                            to={`/studio/org/${allState?.organization?.currentOrganization?.domain}/teams`}
                            className="view-all"
                            onClick={async () => {
                              if (
                                permission?.Organization?.includes(
                                  "organization:view"
                                )
                              )
                                await dispatch(getOrganization(row.id));
                              dispatch(clearOrganizationState());
                              dispatch(getRoles());
                            }}
                          >
                            {row.teams_count}
                          </Link>
                        ) : (
                          "N/A"
                        )}
                      </td>

                      <td>
                        <div className="links">
                          {permission?.Organization.includes(
                            "organization:edit"
                          ) && (
                            <Link
                              onClick={() => {
                                dispatch(setActiveAdminForm("edit_org"));
                                dispatch({
                                  type: "SET_ACTIVE_EDIT",
                                  payload: row,
                                });
                              }}
                            >
                              &nbsp;&nbsp; Edit &nbsp;&nbsp;
                            </Link>
                          )}

                          {permission?.Organization.includes(
                            "organization:edit"
                          ) && (
                            <Link
                              onClick={async () => {
                                Swal.fire({
                                  title: "Please Wait !",
                                  html: "Updating View ...",
                                  allowOutsideClick: false,
                                  onBeforeOpen: () => {
                                    Swal.showLoading();
                                  },
                                });
                                if (
                                  permission?.Organization?.includes(
                                    "organization:view"
                                  )
                                )
                                  await dispatch(getOrganization(row.id));
                                Swal.close();
                                dispatch({
                                  type: actionTypes.UPDATE_PAGINATION,
                                  payload: [...paginations, row],
                                });
                                if (row.projects_count > 0) {
                                  if (
                                    permission?.Organization?.includes(
                                      "organization:view"
                                    )
                                  )
                                    await dispatch(getOrganization(row.id));
                                  dispatch(clearOrganizationState());
                                  dispatch(getRoles());

                                  // dispatch(setActiveTab('Project'));
                                  // dispatch(clearOrganizationState());
                                  // dispatch(getRoles());
                                }
                              }}
                            >
                              &nbsp;&nbsp; Manage &nbsp;&nbsp;
                            </Link>
                          )}

                          {permission?.Organization.includes(
                            "organization:delete"
                          ) && (
                            <Link
                              onClick={() => {
                                Swal.fire({
                                  title: "Are you sure?",
                                  text: "You won't be able to revert this!",
                                  icon: "warning",
                                  showCancelButton: true,
                                  confirmButtonColor: "#084892",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "Yes, delete it!",
                                }).then(async (result) => {
                                  if (result.isConfirmed) {
                                    Swal.showLoading();
                                    const resultDel = await dispatch(
                                      deleteOrganization(row)
                                    );
                                    if (resultDel) {
                                      Swal.fire({
                                        text:
                                          "You have successfully deleted the organization",
                                        icon: "success",
                                        showCancelButton: false,
                                        confirmButtonColor: "#084892",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "OK",
                                      });
                                    }
                                  }
                                });
                              }}
                            >
                              &nbsp;&nbsp; Delete &nbsp;&nbsp;
                            </Link>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: "center" }}>
                      <Alert variant="warning">
                        {" "}
                        No sub-organization available
                      </Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colspan="9">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
            {type === "Project" &&
              subType === "all" &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData.map((row) => {
                    const createNew = new Date(row.created_at);
                    const updateNew = new Date(row.updated_at);
                    return (
                      <tr className="org-rows">
                        <td>
                          <div
                            style={{
                              backgroundImage: row.thumb_url.includes(
                                "pexels.com"
                              )
                                ? `url(${row.thumb_url})`
                                : `url(${global.config.resourceUrl}${row.thumb_url})`,
                              backgroundSize: "cover",
                              height: "100px",
                              backgroundPosition: "center",
                              width: "100px",
                            }}
                          ></div>
                        </td>
                        <td>
                          <Link
                            to={`/studio/org/${organization?.currentOrganization?.domain}/project/${row.id}/preview`}
                          >
                            {row.name}
                          </Link>
                        </td>
                        <td>{createNew.toDateString()}</td>

                        <td>{row.description}</td>

                        <td>{row.id}</td>
                        <td>{row.users?.[0]?.email}</td>
                        <td>{row.indexing_text}</td>
                        {/* <td>{row.organization_id}</td> */}
                        <td>
                          {row.shared ? (
                            <Link
                              className="shared-link"
                              target="_blank"
                              to={`/studio/project/${row.id}/shared`}
                            >
                              <FontAwesomeIcon
                                icon="external-link-alt"
                                className="mr-2"
                              />
                              Open Shared Link
                            </Link>
                          ) : (
                            <>{String(row.shared)}</>
                          )}
                        </td>
                        {/* <td>{String(row.starter_project)}</td> */}
                        <td>{row.status_text}</td>
                        <td>{updateNew.toDateString()}</td>
                        <td>
                          <Link
                            onClick={() => {
                              Swal.fire({
                                title: "Please Wait !",
                                html: "Exporting  Project ...",
                                allowOutsideClick: false,
                                onBeforeOpen: () => {
                                  Swal.showLoading();
                                },
                              });
                              const result = adminService.exportProject(
                                activeOrganization.id,
                                row.id
                              );
                              result.then((data) => {
                                // console.log(data)
                                Swal.fire({
                                  icon: "success",
                                  text: data?.message,
                                });
                              });
                            }}
                          >
                            Export
                          </Link>
                          <Link
                            onClick={() => {
                              dispatch(setActiveAdminForm("edit_project"));
                              dispatch(setCurrentProject(row));
                            }}
                          >
                            &nbsp;&nbsp;Edit&nbsp;&nbsp;
                          </Link>
                          <Link
                            onClick={() => {
                              Swal.fire({
                                title:
                                  "Are you sure you want to delete this Project?",
                                text: "This action is Irreversible",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#084892",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  Swal.fire({
                                    icon: "info",
                                    text: "Deleting Project...",
                                    allowOutsideClick: false,
                                    onBeforeOpen: () => {
                                      Swal.showLoading();
                                    },
                                    button: false,
                                  });
                                  const response = projectService.remove(
                                    row.id,
                                    activeOrganization.id
                                  );
                                  response
                                    .then((res) => {
                                      Swal.fire({
                                        icon: "success",
                                        text: res?.message,
                                      });
                                      const filterProject = localStateData.filter(
                                        (each) => each.id != row.id
                                      );
                                      setLocalStateData(filterProject);
                                    })
                                    .catch((err) => console.log(err));
                                }
                              });
                            }}
                          >
                            &nbsp;&nbsp;Delete&nbsp;&nbsp;
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colspan="11">
                      <Alert variant="warning">No result found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colspan="13">
                    <Alert variant="primary">Loading data...</Alert>
                  </td>
                </tr>
              ))}

            {type === "Project" &&
              subType === "user" &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData?.map((row) => {
                    const createNew = new Date(row.created_at);
                    const updateNew = new Date(row.updated_at);
                    return (
                      <tr className="org-rows">
                        <td>
                          <div
                            style={{
                              backgroundImage: row.thumb_url.includes(
                                "pexels.com"
                              )
                                ? `url(${row.thumb_url})`
                                : `url(${global.config.resourceUrl}${row.thumb_url})`,
                              backgroundSize: "cover",
                              height: "100px",
                              backgroundPosition: "center",
                              width: "100px",
                            }}
                          ></div>
                        </td>
                        <td>{row.name}</td>
                        <td>{createNew.toDateString()}</td>

                        {/* <td>{row.description}</td> */}

                        <td>{row.id}</td>
                        <td>{row.users?.[0]?.email}</td>
                        <td>{row.indexing_text}</td>

                        <td>{row.organization_id}</td>

                        <td>{String(row.shared)}</td>
                        <td>{String(row.starter_project)}</td>

                        <td>{row.status_text}</td>
                        <td>{updateNew.toDateString()}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colspan="11">
                      <Alert variant="warning">No result found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colspan="13">
                    <Alert variant="primary">Loading data...</Alert>
                  </td>
                </tr>
              ))}

            {type === "Project" &&
              subType === "index" &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData.map((row) => {
                    const createNew = new Date(row.created_at);
                    const updateNew = new Date(row.updated_at);
                    return (
                      <tr className="org-rows">
                        <td>
                          <div
                            style={{
                              backgroundImage: row.thumb_url.includes(
                                "pexels.com"
                              )
                                ? `url(${row.thumb_url})`
                                : `url(${global.config.resourceUrl}${row.thumb_url})`,
                              backgroundSize: "cover",
                              height: "100px",
                              backgroundPosition: "center",
                              width: "100px",
                            }}
                          ></div>
                        </td>
                        <td>
                          <Link
                            target="_blank"
                            to={`/studio/org/${organization?.currentOrganization?.domain}/project/${row.id}/preview`}
                          >
                            {row.name}
                          </Link>
                        </td>
                        <td>{createNew.toDateString()}</td>

                        {/* <td>{row.description}</td> */}

                        <td>{row.id}</td>
                        <td>{row.users?.[0]?.email}</td>
                        <td>{row.indexing_text}</td>

                        {/* <td>{row.organization_id}</td> */}

                        <td>{String(row.shared)}</td>
                        {/* <td>{String(row.starter_project)}</td> */}

                        {/* <td>{row.status_text}</td> */}
                        <td>{updateNew.toDateString()}</td>
                        <td>
                          <div className="links">
                            {(row.indexing === 1 || row.indexing === 2) && (
                              <Link
                                onClick={async () => {
                                  Swal.fire({
                                    title: "Please Wait !",
                                    html: "Approving Project ...",
                                    allowOutsideClick: false,
                                    onBeforeOpen: () => {
                                      Swal.showLoading();
                                    },
                                  });
                                  const result = await adminService.updateIndex(
                                    row.id,
                                    3
                                  );
                                  if (result?.message) {
                                    if (changeIndexValue !== 0) {
                                      setLocalStateData(
                                        localStateData.filter(
                                          (indexing) => indexing.id !== row.id
                                        )
                                      );
                                    } else {
                                      const editRow = {
                                        ...row,
                                        indexing: 3,
                                        indexing_text: "APPROVED",
                                      };
                                      setLocalStateData(
                                        localStateData.map((indexing) =>
                                          indexing.id == row.id
                                            ? editRow
                                            : indexing
                                        )
                                      );
                                    }
                                    Swal.fire({
                                      icon: "success",
                                      text: result.message,
                                    });
                                  } else {
                                    Swal.fire({
                                      icon: "error",
                                      text: "Error",
                                    });
                                  }
                                  // result.then((data) => {
                                  //   // console.log(data)
                                  //   if(changeIndexValue !== 0) {
                                  //     setLocalStateData(localStateData.filter(indexing => indexing.id !== row.id));
                                  //   }
                                  //   Swal.fire({
                                  //     icon: 'success',
                                  //     text: data.message,
                                  //   });
                                  // }).catch((err) => {
                                  //   Swal.fire({
                                  //     icon: 'error',
                                  //     text: 'Error',
                                  //   });
                                  // });
                                  // if (result) {
                                  //   const response = adminService.getAllProjectIndex(
                                  //     activeOrganization?.id,
                                  //     activePage || 1,
                                  //     changeIndexValue
                                  //   );
                                  //   response
                                  //     .then((data) => {
                                  //       setAllProjectIndexTab(data);
                                  //     })
                                  //     .catch((e) => setAllProjectIndexTab([]));
                                  // }
                                }}
                              >
                                Approve&nbsp;&nbsp;
                              </Link>
                            )}
                            {(row.indexing === 1 || row.indexing === 3) && (
                              <Link
                                onClick={async () => {
                                  Swal.fire({
                                    title: "Please Wait !",
                                    html: "Rejecting Project ...",
                                    allowOutsideClick: false,
                                    onBeforeOpen: () => {
                                      Swal.showLoading();
                                    },
                                  });
                                  const result = await adminService.updateIndex(
                                    row.id,
                                    2
                                  );
                                  if (result?.message) {
                                    if (changeIndexValue !== 0) {
                                      setLocalStateData(
                                        localStateData.filter(
                                          (indexing) => indexing.id !== row.id
                                        )
                                      );
                                    } else {
                                      const editRow = {
                                        ...row,
                                        indexing: 2,
                                        indexing_text: "REJECT",
                                      };
                                      setLocalStateData(
                                        localStateData.map((indexing) =>
                                          indexing.id == row.id
                                            ? editRow
                                            : indexing
                                        )
                                      );
                                    }
                                    Swal.fire({
                                      icon: "success",
                                      text: result.message,
                                    });
                                  } else {
                                    Swal.fire({
                                      icon: "error",
                                      text: "Error",
                                    });
                                  }
                                  // result.then((data) => {
                                  //   // console.log(data)
                                  //   // console.log({...localStatePagination,meta:{...localStatePagination.meta,total:localStatePagination.meta.total-1}})
                                  //   if (changeIndexValue) {
                                  //     setLocalStateData(localStateData.filter(indexing => indexing.id !== row.id));
                                  //   }
                                  //   // setLocalStatePagination({...localStatePagination,meta:{...localStatePagination.meta,total:localStatePagination.meta.total-1}})
                                  //   Swal.fire({
                                  //     icon: 'success',
                                  //     text: data.message,
                                  //   })
                                  // }).catch((err) => {
                                  //   Swal.fire({
                                  //     icon: 'error',
                                  //     text: 'Error',
                                  //   });
                                  // });
                                  // if (result?.message) {
                                  //   const response = adminService.getAllProjectIndex(
                                  //     activeOrganization?.id,
                                  //     activePage || 1,
                                  //     changeIndexValue,
                                  //   );
                                  //   response.then((data) => {
                                  //     setAllProjectIndexTab(data);
                                  //   }).catch(e=>setAllProjectIndexTab([]));
                                  // }
                                }}
                              >
                                Reject
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colspan="11">
                      <Alert variant="warning">No result found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colspan="13">
                    <Alert variant="primary">Loading data...</Alert>
                  </td>
                </tr>
              ))}
            {type === "Activities" &&
              subType === "Activity Types" &&
              (data ? (
                data?.map((type) => (
                  <tr className="org-rows">
                    <td>{type.title}</td>
                    <td>
                      <img
                        className="image-size"
                        src={global.config.resourceUrl + type.image}
                        alt="activity-type-image"
                      />
                    </td>
                    <td>{type.order}</td>
                    <td>
                      {type.activityItems.map((item) => (
                        <div>{item.title}</div>
                      ))}
                    </td>
                    <td>
                      <div className="links">
                        <Link
                          onClick={() => {
                            dispatch(selectActivityType(type));
                            dispatch(setActiveAdminForm("edit_activity_type"));
                          }}
                        >
                          &nbsp;&nbsp;Edit&nbsp;&nbsp;
                        </Link>
                        <Link
                          onClick={() => {
                            Swal.fire({
                              title: "Are you sure?",
                              text: "You won't be able to revert this!",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#084892",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then(async (result) => {
                              if (result.isConfirmed) {
                                Swal.showLoading();
                                const resultDel = await dispatch(
                                  deleteActivityType(type.id)
                                );
                                if (resultDel) {
                                  Swal.fire({
                                    text:
                                      "You have successfully deleted the activity type",
                                    icon: "success",
                                    showCancelButton: false,
                                    confirmButtonColor: "#084892",
                                    cancelButtonColor: "#d33",
                                    confirmButtonText: "OK",
                                  }).then((result) => {
                                    if (result.isConfirmed) {
                                      dispatch(loadResourceTypesAction("", 1));
                                    }
                                  });
                                }
                              }
                            });
                          }}
                        >
                          Delete
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <Alert variant="warning">No activity type found</Alert>
              ))}
            {type === "Activities" &&
              subType === "Activity Items" &&
              (data?.data ? (
                data?.data?.length > 0 ? (
                  data?.data.map((item) => (
                    <tr>
                      <td>{item.title}</td>
                      <td>
                        <img
                          className="image-size"
                          src={global.config.resourceUrl + item.image}
                          alt="activity-item-image"
                        />
                      </td>
                      <td>{item.order}</td>
                      <td>
                        <b>Activity Type:</b>
                        <span>{item?.activityType?.title}</span>
                        <b>Item Type:</b>
                        <span>{item.type}</span>
                        <b>Activity Item Value:</b>
                        <span>{item.h5pLib}</span>
                      </td>
                      <td>
                        <div className="links">
                          <Link
                            onClick={() => {
                              dispatch(selectActivityItem(item));
                              dispatch(
                                setActiveAdminForm("edit_activity_item")
                              );
                            }}
                          >
                            &nbsp;&nbsp;Edit&nbsp;&nbsp;
                          </Link>
                          <Link
                            onClick={() => {
                              Swal.fire({
                                title: "Are you sure?",
                                text: "You won't be able to revert this!",
                                icon: "warning",
                                showCancelButton: true,
                                confirmButtonColor: "#084892",
                                cancelButtonColor: "#d33",
                                confirmButtonText: "Yes, delete it!",
                              }).then(async (result) => {
                                if (result.isConfirmed) {
                                  Swal.showLoading();
                                  const resultDel = await dispatch(
                                    deleteActivityItem(item.id)
                                  );
                                  if (resultDel) {
                                    Swal.fire({
                                      text:
                                        "You have successfully deleted the activity item",
                                      icon: "success",
                                      showCancelButton: false,
                                      confirmButtonColor: "#084892",
                                      cancelButtonColor: "#d33",
                                      confirmButtonText: "OK",
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        dispatch(getActivityItems("", 1));
                                      }
                                    });
                                  }
                                }
                              });
                            }}
                          >
                            Delete
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colspan="5">
                      <Alert variant="warning"> No activity item found</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colspan="5">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {data?.data?.length > 0 && data?.meta && (
        <div className="pagination-top">
          <div className="pagination_state">
            Showing {data?.meta?.from} to {data?.meta?.to} of{" "}
            {data?.meta?.total} results
          </div>
          <div class="main-pagination">
            {type === "Stats" && subTypeState === "Report" && (
              <Pagination
                activePage={activePage}
                pageRangeDisplayed={5}
                itemsCountPerPage={data?.meta?.per_page}
                totalItemsCount={data?.meta?.total}
                onChange={(e) => {
                  // setCurrentTab("index");
                  window.scrollTo(0, 0);
                  setActivePage(e);
                }}
              />
            )}
            {type === "Stats" && subTypeState === "Queues: Logs" && (
              <Pagination
                activePage={activePage}
                pageRangeDisplayed={5}
                itemsCountPerPage={data?.meta?.per_page}
                totalItemsCount={data?.meta?.total}
                onChange={(e) => {
                  // setCurrentTab("index");
                  window.scrollTo(0, 0);
                  setActivePage(e);
                }}
              />
            )}
            {type === "Stats" && subTypeState === "Queues: Jobs" && (
              <Pagination
                activePage={activePage}
                pageRangeDisplayed={5}
                itemsCountPerPage={data?.meta?.per_page}
                totalItemsCount={data?.meta?.total}
                onChange={(e) => {
                  // setCurrentTab("index");
                  window.scrollTo(0, 0);
                  setActivePage(e);
                }}
              />
            )}
            {type === "Users" && (
              <Pagination
                activePage={activePage}
                pageRangeDisplayed={5}
                itemsCountPerPage={data?.meta?.per_page}
                totalItemsCount={data?.meta?.total}
                onChange={(e) => {
                  // setCurrentTab("all");
                  window.scrollTo(0, 0);
                  setActivePage(e);
                }}
              />
            )}
            {type === "Project" && subType === "all" && (
              <Pagination
                activePage={activePage}
                pageRangeDisplayed={5}
                itemsCountPerPage={data?.meta?.per_page}
                totalItemsCount={data?.meta?.total}
                onChange={(e) => {
                  window.scrollTo(0, 0);
                  setCurrentTab("all");
                  setActivePage(e);
                  dispatch(updatePageNumber(e));
                }}
              />
            )}
            {type === "Project" && subType === "user" && (
              <Pagination
                activePage={activePage}
                pageRangeDisplayed={5}
                itemsCountPerPage={data?.meta?.per_page}
                totalItemsCount={data?.meta?.total}
                onChange={(e) => {
                  window.scrollTo(0, 0);
                  setCurrentTab("user");
                  setActivePage(e);
                }}
              />
            )}
            {type === "Project" && subType === "index" && (
              <Pagination
                activePage={activePage}
                pageRangeDisplayed={5}
                itemsCountPerPage={localstatePagination?.meta?.per_page}
                totalItemsCount={localstatePagination?.meta?.total}
                onChange={(e) => {
                  window.scrollTo(0, 0);
                  setCurrentTab("index");
                  setActivePage(e);
                  dispatch(updatePageNumber(e));
                }}
              />
            )}
            {type === "Activities" && subType === "Activity Types" && (
              <Pagination
                activePage={activePage}
                pageRangeDisplayed={5}
                itemsCountPerPage={data?.meta?.per_page}
                totalItemsCount={data?.meta?.total}
                onChange={(e) => {
                  // setCurrentTab("index");
                  window.scrollTo(0, 0);
                  setActivePage(e);
                }}
              />
            )}
            {type === "Activities" && subType === "Activity Items" && (
              <Pagination
                activePage={activePage}
                pageRangeDisplayed={5}
                itemsCountPerPage={data?.meta?.per_page}
                totalItemsCount={data?.meta?.total}
                onChange={(e) => {
                  // setCurrentTab("index");
                  window.scrollTo(0, 0);
                  setActivePage(e);
                }}
              />
            )}
            {type === "LMS" && (
              <Pagination
                activePage={activePage}
                pageRangeDisplayed={5}
                itemsCountPerPage={data?.meta?.per_page}
                totalItemsCount={data?.meta?.total}
                onChange={(e) => {
                  // setCurrentTab("index");
                  window.scrollTo(0, 0);
                  setActivePage(e);
                }}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};

export default withRouter(Table);
