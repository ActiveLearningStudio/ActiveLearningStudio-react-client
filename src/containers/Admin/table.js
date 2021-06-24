/* eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";
import adminService from "services/admin.service";
//import { useHistory } from 'react-router-dom';
import {
  deleteUserFromOrganization,
  updateFeedbackScreen,
  updateOrganizationScreen,
  updatePreviousScreen,
  deleteOrganization,
  getOrganization,
  clearOrganizationState,
  getOrgUsers,
  removeUserFromOrganization,
  getRoles,
} from "store/actions/organization";
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
  setCurrentUser,
} from "store/actions/admin";
import { deleteActivityItem, deleteActivityType, selectActivityItem, selectActivityType } from "store/actions/resource";

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
    subType,
    setCurrentTab,
  } = props;
  const organization = useSelector((state) => state.organization);
  const { activeOrganization, allSuborgList, permission } = organization;
  const allState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [localStateData, setLocalStateData] =  useState([]);
  useEffect(() => {
    if(type === "LMS") {
      setLocalStateData(data?.data)
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
          title: 'Do you want to preserve user data?',
          showCancelButton: true,
          confirmButtonColor: "#084892",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          const response = dispatch(deleteUserFromOrganization(user?.id, result.isConfirmed ? true : false));
          response
            .then(() => {
              dispatch(
                updateFeedbackScreen({
                  action: "user:delete",
                  name: `${user?.first_name} ${user?.last_name}`,
                })
              );
              dispatch(updateOrganizationScreen("feedback"));
              dispatch(updatePreviousScreen("Users"));
            })
            .catch((e) => {
              console.log(e);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "User Deletion failed, kindly try again.",
              });
            });
        })
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
          title: 'Do you want to preserve user data?',
          showCancelButton: true,
          confirmButtonColor: "#084892",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        }).then((result) => {
          const response = dispatch(removeUserFromOrganization(user?.id, result.isConfirmed ? true : false));
          response
            .then(() => {
              dispatch(
                updateFeedbackScreen({
                  action: "user:remove",
                  name: `${user?.first_name} ${user?.last_name}`,
                })
              );
              dispatch(updateOrganizationScreen("feedback"));
              dispatch(updatePreviousScreen("Users"));
            })
            .catch((e) => {
              console.log(e);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "User Remove failed, kindly try again.",
              });
            });
        })
      }
    });
  };
  //const history = useHistory();
  return (
    <div className="table-data">
      <div className="responsive-table">
      <table>
        <thead>
          {tableHead?.map((head) => (
            <th>{head}</th>
          ))}
        </thead>
        <tbody>
          {type === "Stats" && subTypeState === 'Report' &&
            data ? data?.data?.map((row) => (
              <tr>
                <td>{row.first_name}</td>
                <td>{row.last_name}</td>
                <td>{row.email}</td>
                <td>{row.projects_count}</td>
                <td>{row.playlists_count}</td>
                <td>{row.activities_count}</td>
              </tr>
            )) :
            null }
            {type === 'Stats' && subTypeState === 'Queues:Jobs' && (
              data ? ( data?.data.map((job) => (
                <tr>
                  <td>{job.id}</td>
                  <td>{job.queue}</td>
                  <td>{job.payload}</td>
                  <td>{job.exception}</td>
                  <td>{job.time}</td>
                  {jobType.value === 2 ? (
                    <td>
                      <div className="links">
                        <Link onClick={() => {
                          dispatch(retrySpecificFailedJob(job.id));
                        }}
                        >
                          Retry
                        </Link>
                        <Link
                          onClick={() => {
                            dispatch(forgetSpecificFailedJob(job.id))
                          }}
                        >
                          Forget
                        </Link>
                      </div>
                    </td>
                  ) : (
                    <td>
                      {job.action ? job.action : 'N/A'}
                    </td>
                  )}
                </tr>
              )))
              : (
                <tr colSpan="6">
                  No data available in table
                </tr>
              )
            )}
            {type === 'Stats' && subTypeState === 'Queues:Logs' && (

              data ? data?.data.map((job) => (
                <tr>
                  <td>{job.name}</td>
                  <td>
                    <Alert variant={job.failed ? 'danger' : 'success'}> {job.failed ? 'Failed' : 'Success'}</Alert>
                  </td>
                  <td>{job.started_at}</td>
                  <td>Queue: {job.queue} Attempt: {job.attempt}</td>
                  <td>{job.time_elapsed}</td>
                  <td>{job.exception_message}</td>
                </tr>
              ))
              :
              null
              )
            }
           {type === "LMS" && (
           localStateData ?
           localStateData?.map((row) => (
              <tr>
                <td>{row.lms_url}</td>
                <td>{row.lms_name}</td>
                <td>{row.user?.name}</td>
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
                          clone
                        </Link>
                      )}
                      {true && (
                        <Link
                          onClick={() =>{
                            Swal.fire({
                              title: "Are you sure you want to delete this User LMS settings?",
                              text: "This action is Irreversible",
                              icon: "warning",
                              showCancelButton: true,
                              confirmButtonColor: "#084892",
                              cancelButtonColor: "#d33",
                              confirmButtonText: "Yes, delete it!",
                            }).then((result) => {
                              if (result.isConfirmed) {
                                Swal.fire({
                                  title: 'LMS Srttings',
                                  icon: 'info',
                                  text: 'Deleting User LMS Settings...',
                                  allowOutsideClick: false,
                                  onBeforeOpen: () => {
                                    Swal.showLoading();
                                  },
                                  button: false,
                                });
                                  const response = adminService.deleteLmsProject(row?.id);
                                  response
                                    .then((res) => {


                                     Swal.fire({
                                      icon: "success",
                                      text: res?.message,

                                    });
                                    const filterLMS = localStateData.filter(each => each.id != row.id);
                                    console.log(filterLMS)
                                    setLocalStateData(filterLMS)

                                    }).catch(err => console.log(err))
                              }
                            });
                          }}
                        >
                          delete
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
                          edit
                        </Link>
                      )}
                    </div>
                </td>
              </tr>
            )): (
              <tr>
                <td colspan="11">
                  <Alert variant="primary">Loading data...</Alert>
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
                    {activeOrganization?.name ? activeOrganization?.name : "NA"}
                  </td>
                  <td>
                    {user.organization_type ? user.organization_type : "NA"}
                  </td>
                  <td>
                    {user.organization_role ? user.organization_role : "NA"}
                  </td>
                  <td>
                    <div className="links">
                      {permission?.Organization.includes('organization:update-user') && (
                        <Link
                          onClick={() => {
                            dispatch(setCurrentUser(user));
                            dispatch(setActiveAdminForm("edit_user"));
                          }}
                        >
                          Edit
                        </Link>
                      )}
                      {permission?.Organization.includes('organization:remove-user') && (
                        <Link
                          onClick={() => handleRemoveUser(user)}
                        >
                          &nbsp;&nbsp;Remove&nbsp;&nbsp;
                        </Link>
                      )}
                      {permission?.Organization.includes('organization:delete-user') && (
                        <Link
                          onClick={() => handleDeleteUser(user)}
                        >
                          Delete
                        </Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (searchAlertToggler === 0 || data?.data?.length === 0) ? (
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
          {type === "Organization" && (
            allSuborgList.length > 0 ? allSuborgList?.map((row) => (
              <tr className="org-rows">
                <td>
                  <img src={global.config.resourceUrl + row.image} alt="" />
                </td>
                <td>{row.name}</td>
                <td>{row.domain}</td>
                <td>
                  {row.projects_count > 0 ? (
                    <div
                      className="view-all"
                      onClick={async () => {
                        await dispatch(getOrganization(row.id));
                        dispatch(clearOrganizationState());
                        dispatch(getRoles());
                        Swal.fire({
                          html: "Searching...",
                          allowOutsideClick: false,
                          onBeforeOpen: () => {
                            Swal.showLoading();
                          },
                        });
                        await dispatch(
                          simpleSearchAction({
                            from: 0,
                            size: 20,
                            type: "orgSearch",
                          })
                        );
                        Swal.close();
                        history.push(`/org/${row?.domain}/search?type=orgSearch`);
                      }}
                    >
                      {row.projects_count}
                    </div>
                  ) : 'N/A' }
                </td>
                <td>
                  {row.suborganization_count > 0 ? (
                    <Link
                      className="view-all"
                      onClick={() => {
                        if (row.suborganization_count > 0) {
                          Swal.fire({
                            title: 'Organization',
                            icon: 'warning',
                            html: 'You are about to change the content of admin panel, Are you sure?',
                            showCancelButton: true,
                            confirmButtonColor: "#084892",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              await dispatch(getOrganization(row.id));
                              dispatch(clearOrganizationState());
                              dispatch(getRoles());
                            }
                          });
                        }
                      }}
                    >
                      {row.suborganization_count || 0}
                    </Link>
                  ) : 'N/A' }
                </td>
                <td>
                  {row.users_count > 0 ? (
                    <Link
                      className="view-all"
                      onClick={() => {
                        if (row.users_count > 0) {
                          Swal.fire({
                            title: 'Organization',
                            icon: 'warning',
                            html: 'You are about to change the content of admin panel, Are you sure?',
                            showCancelButton: true,
                            confirmButtonColor: "#084892",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes",
                          }).then(async (result) => {
                            if (result.isConfirmed) {
                              await dispatch(getOrganization(row.id));
                              dispatch(clearOrganizationState());
                              dispatch(getRoles());
                              dispatch(setActiveTab('Users'));
                            }
                          });
                        }
                      }}>
                      {row.users_count}
                    </Link>
                  ) : 'N/A' }
                </td>
                <td>
                  {row.groups_count > 0 ? (
                    <Link
                      to={`/org/${allState?.organization?.currentOrganization?.domain}/groups`}
                      className="view-all"
                      onClick={
                       async () => {
                          await dispatch(getOrganization(row.id));
                          dispatch(clearOrganizationState());
                          dispatch(getRoles());
                        }
                      }
                    >
                      {row.groups_count}
                    </Link>
                  ) : 'N/A'}
                </td>
                <td>
                  {row.teams_count > 0 ? (
                    <Link
                      to={`/org/${allState?.organization?.currentOrganization?.domain}/teams`}
                      className="view-all"
                      onClick={
                       async () => {
                          await dispatch(getOrganization(row.id));
                          dispatch(clearOrganizationState());
                          dispatch(getRoles());
                        }
                      }
                    >
                      {row.teams_count}
                    </Link>
                  ) : 'N/A' }
                </td>
                <td>
                  <div className="links">
                    <Link
                      onClick={() => {
                        dispatch(setActiveAdminForm("edit_org"));
                        dispatch({
                          type: "SET_ACTIVE_EDIT",
                          payload: row,
                        });
                      }}
                    >
                      Edit
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
                              deleteOrganization(row)
                            );
                            if (resultDel) {
                              Swal.fire({
                                text: "You have successfully deleted the organization",
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
                      Delete
                    </Link>
                  </div>
                </td>
              </tr>
            )) :
              <tr>
                <td colSpan="9" style={{ textAlign: 'center' }}>
                  No sub-organization available
                </td>
              </tr>
          )}
          {type === "Project" &&
            subType === "all" &&
            (data ? (
              data?.data?.map((row) => {
                const createNew = new Date(row.created_at);
                const updateNew = new Date(row.updated_at);
                return (
                  <tr className="org-rows">
                    <td>
                      <img
                        src={global.config.resourceUrl + row.thumb_url}
                        alt=""
                      />
                    </td>
                    <td>{row.name}</td>
                    <td>{createNew.toDateString()}</td>

                    <td>{row.description}</td>

                    <td>{row.id}</td>
                    <td>{row.indexing_text}</td>

                    <td>{row.organization_id}</td>

                    <td>{String(row.shared)}</td>
                    <td>{String(row.starter_project)}</td>

                    <td>{row.status_text}</td>
                    <td>{updateNew.toDateString()}</td>
                    <td>

                    <Link
                      onClick={()=>{
                        Swal.fire({
                          title: 'Please Wait !',
                          html: 'Exporting  Project ...',
                          allowOutsideClick: false,
                          onBeforeOpen: () => {
                            Swal.showLoading();
                          },
                        });
                        const result = adminService.exportProject(activeOrganization.id, row.id)
                        result.then((data) => {
                          // console.log(data)
                          Swal.fire({
                            icon: 'success',
                            text: data?.message,
                          });
                        })
                      }}
                    >
                      Export
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colspan="11">
                  <Alert variant="primary">Loading data...</Alert>
                </td>
              </tr>
            ))}

          {type === "Project" &&
            subType === "user" &&
            (data ? (
              data?.data?.map((row) => {
                const createNew = new Date(row.created_at);
                const updateNew = new Date(row.updated_at);
                return (
                  <tr className="org-rows">
                    <td>
                      <img
                        src={global.config.resourceUrl + row.thumb_url}
                        alt=""
                      />
                    </td>
                    <td>{row.name}</td>
                    <td>{createNew.toDateString()}</td>

                    {/* <td>{row.description}</td> */}

                    <td>{row.id}</td>
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
                  <Alert variant="primary">Loading data...</Alert>
                </td>
              </tr>
            ))}

          {type === "Project" &&
            subType === "index" &&
            (data ? (
              data?.data?.map((row) => {
                const createNew = new Date(row.created_at);
                const updateNew = new Date(row.updated_at);
                return (
                  <tr className="org-rows">
                    <td>
                      <img
                        src={global.config.resourceUrl + row.thumb_url}
                        alt=""
                      />
                    </td>
                    <td>{row.name}</td>
                    <td>{createNew.toDateString()}</td>

                    {/* <td>{row.description}</td> */}

                    <td>{row.id}</td>
                    <td>{row.indexing_text}</td>

                    <td>{row.organization_id}</td>

                    <td>{String(row.shared)}</td>
                    <td>{String(row.starter_project)}</td>

                    <td>{row.status_text}</td>
                    <td>{updateNew.toDateString()}</td>
                    <td>
                      <div className="links">
                        {(row.indexing === 1 || row.indexing === 2) && (
                          <Link onClick={() => {
                            Swal.fire({
                              title: 'Please Wait !',
                              html: 'Approving Project ...',
                              allowOutsideClick: false,
                              onBeforeOpen: () => {
                                Swal.showLoading();
                              },
                            });
                            const result = adminService.updateIndex(row.id, 3)
                            result.then((data) => {
                              // console.log(data)
                              Swal.fire({
                                icon: 'success',
                                text: data.message,
                              });
                            }).catch((err) => {
                              Swal.fire({
                                icon: 'error',
                                text: 'Error',
                              });
                            })
                          }}>
                            Approve&nbsp;&nbsp;
                          </Link>
                        )}
                        {(row.indexing === 1 || row.indexing === 3) && (
                          <Link onClick={() => {
                            Swal.fire({
                              title: 'Please Wait !',
                              html: 'Reject Project ...',
                              allowOutsideClick: false,
                              onBeforeOpen: () => {
                                Swal.showLoading();
                              },
                            });
                            const result = adminService.updateIndex(row.id, 2)
                            result.then((data) => {
                              // console.log(data)
                              Swal.fire({
                                icon: 'success',
                                text: data.message,
                              })
                            }).catch((err) => {
                              Swal.fire({
                                icon: 'error',
                                text: 'Error',
                              });
                            })
                          }}>
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
                  <Alert variant="primary">Loading data...</Alert>
                </td>
              </tr>
            ))}
          {(type === 'Activities' && subType === 'Activity Types') && (
            data ? data?.map((type) => (
              <tr className="org-rows">
                <td>{type.title}</td>
                <td><img className="image-size" src={global.config.resourceUrl + type.image} alt="activity-type-image" /></td>
                <td>{type.order}</td>
                <td>
                  {type.activityItems.map((item) => (
                    <div>
                      {item.title}
                    </div>
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
                      Edit
                      </Link>
                    <Link
                      onClick={
                        () => {
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
                              const resultDel = await dispatch(deleteActivityType(type.id));
                              if (resultDel) {
                                Swal.fire({
                                  text: "You have successfully deleted the activity type",
                                  icon: "success",
                                  showCancelButton: false,
                                  confirmButtonColor: "#084892",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "OK",
                                });
                              }
                            }
                          });
                        }
                      }
                    >
                      Delete
                      </Link>
                  </div>
                </td>
              </tr>
            )) : null
          )}
          {(type === 'Activities' && subType === 'Activity Items') && (
            data?.data ? data?.data.map((item) => (
              <tr>
                <td>{item.title}</td>
                <td><img className="image-size" src={global.config.resourceUrl + item.image} alt="activity-item-image" /></td>
                <td>{item.order}</td>
                <td>
                  <b>Activity Type:</b>
                  <span>
                    {item?.activityType?.title}
                  </span>
                  <b>Item Type:</b>
                  <span>
                    {item.type}
                  </span>
                  <b>Activity Item Value:</b>
                  <span>
                    {item.h5pLib}
                  </span>
                </td>
                <td>
                  <div className="links">
                    <Link
                      onClick={() => {
                        dispatch(selectActivityItem(item));
                        dispatch(setActiveAdminForm("edit_activity_item"));
                      }}
                    >
                      Edit
                        </Link>
                    <Link
                      onClick={
                        () => {
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
                              const resultDel = await dispatch(deleteActivityItem(item.id));
                              if (resultDel) {
                                Swal.fire({
                                  text: "You have successfully deleted the activity item",
                                  icon: "success",
                                  showCancelButton: false,
                                  confirmButtonColor: "#084892",
                                  cancelButtonColor: "#d33",
                                  confirmButtonText: "OK",
                                });
                              }
                            }
                          });
                        }
                      }
                    >
                      Delete
                        </Link>
                  </div>
                </td>
              </tr>
            )) : null
          )}
        </tbody>
      </table>
      </div>
      {data?.meta &&
      <div className="pagination-top">
        <div className="pagination_state">
          Showing {data?.meta?.from} to {data?.meta?.to} of {data?.meta?.total}{" "}
          results
        </div>
        <div class="main-pagination">
          {type === 'Stats' && subTypeState === 'Report' && (
            <Pagination
              activePage={activePage}
              pageRangeDisplayed={5}
              itemsCountPerPage={data?.meta?.per_page}
              totalItemsCount={data?.meta?.total}
              onChange={(e) => {
                // setCurrentTab("index");
                setActivePage(e);
              }}
            />
          )}
          {type === 'Stats' && subTypeState === 'Queues:Logs' && (
            <Pagination
              activePage={activePage}
              pageRangeDisplayed={5}
              itemsCountPerPage={data?.meta?.per_page}
              totalItemsCount={data?.meta?.total}
              onChange={(e) => {
                // setCurrentTab("index");
                setActivePage(e);
              }}
            />
          )}
          {type === 'Stats' && subTypeState === 'Queues:Jobs' && (
            <Pagination
              activePage={activePage}
              pageRangeDisplayed={5}
              itemsCountPerPage={data?.meta?.per_page}
              totalItemsCount={data?.meta?.total}
              onChange={(e) => {
                // setCurrentTab("index");
                setActivePage(e);
              }}
            />
          )}
          {
            type === "Users" && (
              <Pagination
                activePage={activePage}
                pageRangeDisplayed={5}
                itemsCountPerPage={data?.meta?.per_page}
                totalItemsCount={data?.meta?.total}
                onChange={(e) => {
                  // setCurrentTab("all");
                  setActivePage(e);
                }}
              />
            )
          }
          {
            type === "Project" && subType === "all" && (
              <Pagination
                activePage={activePage}
                pageRangeDisplayed={5}
                itemsCountPerPage={data?.meta?.per_page}
                totalItemsCount={data?.meta?.total}
                onChange={(e) => {
                  setCurrentTab("all");
                  setActivePage(e);
                }}
              />
            )
          }
          {
            type === "Project" && subType === "user" && (
              <Pagination
                activePage={activePage}
                pageRangeDisplayed={3}
                itemsCountPerPage={data?.meta?.per_page}
                totalItemsCount={data?.meta?.total}
                onChange={(e) => {
                  setCurrentTab("user");
                  setActivePage(e);
                }}
              />
            )
          }
          {
            type === "Project" && subType === "index" && (
              <Pagination
                activePage={activePage}
                pageRangeDisplayed={5}
                itemsCountPerPage={data?.meta?.per_page}
                totalItemsCount={data?.meta?.total}
                onChange={(e) => {
                  setCurrentTab("index");
                  setActivePage(e);
                }}
              />
            )
          }
          {type === 'Activities' && subType === 'Activity Types' && (
            <Pagination
              activePage={activePage}
              pageRangeDisplayed={5}
              itemsCountPerPage={data?.meta?.per_page}
              totalItemsCount={data?.meta?.total}
              onChange={(e) => {
                // setCurrentTab("index");
                setActivePage(e);
              }}
            />
          )}
          {type === 'Activities' && subType === 'Activity Items' && (
            <Pagination
              activePage={activePage}
              pageRangeDisplayed={5}
              itemsCountPerPage={data?.meta?.per_page}
              totalItemsCount={data?.meta?.total}
              onChange={(e) => {
                // setCurrentTab("index");
                setActivePage(e);
              }}
            />
          )}
          {type === 'LMS' &&  (
            <Pagination
              activePage={activePage}
              pageRangeDisplayed={5}
              itemsCountPerPage={data?.meta?.per_page}
              totalItemsCount={data?.meta?.total}
              onChange={(e) => {
                // setCurrentTab("index");
                setActivePage(e);
              }}
            />
          )}
        </div>
      </div>
}
    </div>
  );
}

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};

export default withRouter(Table);
