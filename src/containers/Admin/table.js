/* eslint-disable */
import React from "react";
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
  clearUsersinOrganization,
  getOrgUsers,
} from "store/actions/organization";
import { Link, withRouter } from "react-router-dom";
import { simpleSearchAction } from "store/actions/search";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import {
  setActiveAdminForm,
  setActiveTab,
  setCurrentUser,
} from "store/actions/admin";

function Table(props) {
  const {
    tableHead,
    history,
    data,
    type,
    activePage,
    setActivePage,
    searchAlertToggler,
    subType,
    setCurrentTab,
  } = props;
  const organization = useSelector((state) => state.organization);
  const { activeOrganization, allSuborgList } = organization;
  const allState = useSelector((state) => state);
  const dispatch = useDispatch();
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
        const response = dispatch(deleteUserFromOrganization(user?.id));
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
      }
    });
  };
  //const history = useHistory();
  return (
    <div className="table-data">
      <table>
        <thead>
          {tableHead?.map((head) => (
            <th>{head}</th>
          ))}
        </thead>
        <tbody>
          {type === "Stats" &&
            data?.map((row) => (
              <tr>
                <td>{row.name}</td>
                <td>{row.email}</td>
                <td>{row.age}</td>
                <td>{row.project}</td>
                <td>{row.counter}</td>
                <td>{row.flow}</td>
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
                    <Link
                      style={{ float: "left" }}
                      onClick={() => {
                        dispatch(setCurrentUser(user));
                        dispatch(setActiveAdminForm("edit_user"));
                      }}
                    >
                      Edit
                    </Link>
                    <Link
                      style={{ float: "right" }}
                      onClick={() => handleDeleteUser(user)}
                    >
                      Delete
                    </Link>
                  </td>
                </tr>
              ))
            ) : searchAlertToggler === 0 ? (
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
            allSuborgList?.map((row) => (
              <tr className="org-rows">
                <td>
                  <img src={global.config.resourceUrl + row.image} alt="" />
                </td>
                <td>{row.name}</td>
                <td>{row.domain}</td>
                <td>
                  {row?.admins?.length || 0}
                  <Link
                    onClick={() => {
                      dispatch(setActiveTab('Users'));
                      dispatch(getOrgUsers(row.id, 1, 25, 1));
                    }}
                    className="view-all"
                  >
                    view all</Link>
                </td>
                <td>
                  {row.projects_count}
                  <div
                    className="view-all"
                    onClick={async () => {
                      await dispatch(getOrganization(row.id));
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
                    view all
                  </div>
                </td>
                <td>
                  {row.suborganization_count || 0}
                  {row.suborganization_count > 0 && (
                    <Link
                      className="view-all"
                      onClick={() => {
                        if(row.suborganization_count > 0) {
                          Swal.fire({
                            title: 'Organization',
                            icon: 'warning',
                            html: 'You are about to change the content of admin panel, Are you sure?',
                            showCancelButton: true,
                            confirmButtonColor: "#084892",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes",
                          }).then((result) => {
                            if (result.isConfirmed) {
                              dispatch(getOrganization(row.id));
                              dispatch(clearUsersinOrganization());
                            }
                          });
                        }
                      }}
                    >
                      view all
                    </Link>
                  )}
                </td>
                <td>
                  {row.users_count}
                  <Link
                    className="view-all"
                    onClick={() => {
                    dispatch(setActiveTab('Users'));
                  }}>
                  view all
                  </Link>
                </td>
                <td>
                  {row.groups_count}
                  <Link
                    to={`/org/${allState?.organization?.currentOrganization?.domain}/groups`}
                    className="view-all"
                  >
                    view all
                  </Link>
                </td>
                <td>
                  {row.teams_count}
                  <Link
                    to={`/org/${allState?.organization?.currentOrganization?.domain}/teams`}
                    className="view-all"
                  >
                    view all
                  </Link>
                </td>
                <td>
                  <Link
                    onClick={() => {
                      dispatch(setActiveAdminForm("edit_org"));
                      dispatch({
                        type: "SET_ACTIVE_EDIT",
                        payload: row,
                      });
                    }}
                    style={{ float: "left" }}
                  >
                    Edit
                  </Link>
                  <Link
                    style={{ float: "right" }}
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
                </td>
              </tr>
            ))}

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
                <td colspan="8">
                  <Alert variant="primary">Loaidng data ...</Alert>
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
                <td colspan="8">
                  <Alert variant="primary">Loaidng data ...</Alert>
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
                      <Link style={{ float: "left" }} onClick={() => {
						  adminService.updateIndex(row.id,3)
					  }}>
                        Approve
                      </Link>
                      <Link style={{ float: "right" }} onClick={() => {}}>
                        Reject
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colspan="8">
                  <Alert variant="primary">Loaidng data ...</Alert>
                </td>
              </tr>
            ))}
            {(type === 'Activities' && subType === 'Activity Types') && (
              <div>
                TADA
              </div>
            )}
            {(type === 'Activities' && subType === 'Activity Items') && (
              <div>
                TADA
              </div>
            )}
        </tbody>
      </table>
      <div className="pagination-top">
        <div className="pagination_state">
          Showing {data?.meta?.from} to {data?.meta?.to} of {data?.meta?.total}{" "}
          results
        </div>
        <div class="main-pagination">
          {
            type === "Users" && (
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
                pageRangeDisplayed={5}
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
        </div>
      </div>
    </div>
  );
}

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
};

export default withRouter(Table);
