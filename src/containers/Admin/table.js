/* eslint-disable */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

import adminService from 'services/admin.service';

import * as actionTypes from 'store/actionTypes';
import { toggleProjectShareAction, toggleProjectShareRemovedAction, visibilityTypes, updateProjectAction } from 'store/actions/project';
import { deleteUserFromOrganization, getOrganization, clearOrganizationState, removeUserFromOrganization, getRoles, updatePageNumber } from 'store/actions/organization';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, withRouter } from 'react-router-dom';

import Swal from 'sweetalert2';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Dropdown } from 'react-bootstrap';
import { forgetSpecificFailedJob, retrySpecificFailedJob, setActiveAdminForm, setActiveTab, setCurrentProject, setCurrentUser } from 'store/actions/admin';
// import { deleteActivityItem, deleteActivityType, getActivityItems, loadResourceTypesAction, selectActivityItem, selectActivityType } from 'store/actions/resource';
import { toolTypeArray } from 'utils';
import AdminDropdown from './adminDropdown';
import AdminPagination from './pagination';
import { faCheckCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import { shareDisableLink, shareEnableLink, editIndActivityItem, getIndex } from 'store/actions/indActivities';
function Table(props) {
  const {
    tableHead,
    sortCol,
    handleSort,
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
    setAllProjectTab,
    setModalShow,
    setModalShowTeam,
    setrowData,
    setActivePageNumber,
    setCurrentActivity,
    setModalShowh5p,
    filterLtiSettings,
  } = props;

  const organization = useSelector((state) => state.organization);
  const auth = useSelector((state) => state.auth);
  const [visibilityTypeArray, setVisibilityTypeArray] = useState([]);
  const { newlyCreated, newlyEdit } = useSelector((state) => state.admin);
  const project = useSelector((state) => state.project);
  const { paginations } = useSelector((state) => state.ui);
  const { activeOrganization, allSuborgList, permission } = organization;
  const allState = useSelector((state) => state);
  const dispatch = useDispatch();
  const [localStateData, setLocalStateData] = useState([]);
  const [localOrganizationList, setLocalOrganizationList] = useState(null);
  const [localstatePagination, setLocalStatePagination] = useState();

  const indexingArray = [
    { indexing: 0, indexing_text: 'NOT REQUESTED' },
    { indexing: 1, indexing_text: 'Requested' },
    { indexing: 3, indexing_text: 'Approved' },
    { indexing: 2, indexing_text: 'Rejected' },
  ];
  // useEffect(() => {
  //   (async () => {
  //     if (project?.visibilityTypes.length === 0) {
  //       const { data } = await dispatch(visibilityTypes());
  //       setVisibilityTypeArray(data.data);
  //     } else {
  //       setVisibilityTypeArray(project?.visibilityTypes?.data);
  //     }
  //   })();
  // }, [project?.visibilityTypes]);
  useEffect(() => {
    setVisibilityTypeArray(activeOrganization?.allowed_visibility_type_id);
  }, [activeOrganization]);
  useEffect(() => {
    if (allSuborgList?.data) {
      setLocalOrganizationList(allSuborgList);
    }
  }, [allSuborgList]);
  //update table after crud
  useEffect(() => {
    setLocalStateData(data?.data);
  }, [data?.data]);

  // useEffect(() => {
  //   if (type === 'LMS') {
  //     if (newlyCreated) {
  //       setLocalStateData([newlyCreated, ...data?.data]);
  //     } else if (newlyEdit) {
  //       console.log('newlyEdit');
  //       setLocalStateData(
  //         data?.data.map((lms) => {
  //           console.log('lms', lms);
  //           if (lms.id === newlyEdit?.id) {
  //             return newlyEdit;
  //           } else {
  //             return lms;
  //           }
  //         }),
  //       );
  //     }
  //   }
  //   // dispatch({
  //   //   type: actionTypes.NEWLY_EDIT_RESOURCE,
  //   //   payload: null,
  //   // });
  //   // dispatch({
  //   //   type: actionTypes.NEWLY_CREATED_RESOURCE,
  //   //   payload: null,
  //   // });
  // }, [newlyCreated, newlyEdit]);

  //update table after search and first time
  useEffect(() => {
    if (type === 'LMS' || type === 'Projects' || type === 'DefaultSso' || 'Activities') {
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
      title: 'Are you sure you want to delete this User?',
      text: 'This action is Irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#084892',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Do you want to preserve user data?',
          showCancelButton: true,
          confirmButtonColor: '#084892',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        }).then((result) => {
          const response = dispatch(deleteUserFromOrganization(user?.id, result.isConfirmed ? true : false));
          response
            .then(() => {
              // dispatch(getOrgUsers(organization?.activeOrganization?.id, organization?.activePage, organization?.size, organization?.activeRole));
            })
            .catch((e) => {
              console.log(e);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'User Deletion failed, kindly try again.',
              });
            });
        });
      }
    });
  };
  const handleRemoveUser = (user) => {
    Swal.fire({
      title: 'Are you sure you want to remove this User?',
      text: 'This action is Irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#084892',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Remove it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Do you want to preserve user data?',
          showCancelButton: true,
          confirmButtonColor: '#084892',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes',
        }).then((result) => {
          const response = dispatch(removeUserFromOrganization(user?.id, result.isConfirmed ? true : false));
          response
            .then(() => {
              //     dispatch(getOrgUsers(organization?.activeOrganization?.id, organization?.activePage, organization?.size, organization?.activeRole));
            })
            .catch((e) => {
              console.log(e);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'User Remove failed, kindly try again.',
              });
            });
        });
      }
    });
  };
  //const history = useHistory();
  const [ltiToolTypes, setLtiToolTypes] = useState([]);
  const { ltiToolsTypes } = useSelector((state) => state.admin);
  useEffect(() => {
    setLtiToolTypes(ltiToolsTypes);
  }, [ltiToolsTypes]);
  return (
    <div className="table-data">
      {((data?.data?.length > 0 && data?.meta) || (localOrganizationList?.data?.length > 0 && localOrganizationList?.meta && type !== 'LMS')) && (
        <AdminPagination
          setCurrentTab={setCurrentTab}
          subType={subType}
          subTypeState={subTypeState}
          type={type}
          data={data}
          activePage={activePage}
          setActivePage={setActivePage}
          updatePageNumber={updatePageNumber}
          localstatePagination={localstatePagination}
        />
      )}
      <div className="responsive-table">
        <table>
          <thead>
            <tr>
              {tableHead?.map((head, keyid) => {
                let checkSolCol = sortCol !== '' && sortCol?.includes(head) ? true : false;
                return head === 'Users' && permission?.Organization?.includes('organization:view-user') ? (
                  <th key={keyid}> {head} </th>
                ) : head !== 'Users' ? (
                  <th onClick={checkSolCol ? () => handleSort(head, typeof subType != 'undefined' ? subType : type) : ''} className={checkSolCol ? 'sorting-icon' : ''}>
                    {head}
                  </th>
                ) : null;
              })}
            </tr>
          </thead>
          <tbody>
            {type === 'LMS' &&
              subType === 'LMS settings' &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData?.map((row, counter) => (
                    <tr key={counter} className="admin-panel-rows">
                      <td>{row.lms_url}</td>
                      <td>{row.lms_name}</td>
                      <td>{row.user?.first_name + ' ' + row.user?.last_name}</td>
                      <td>{row?.user?.email}</td>
                      <td>{row?.site_name}</td>
                      <td>
                        <div className="admin-panel-dropdown">
                          {row?.description}
                          <div>
                            <AdminDropdown
                              type={type}
                              subType="LMS settings"
                              row={row}
                              activePage={activePage}
                              localStateData={localStateData}
                              setLocalStateData={setLocalStateData}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">
                      <Alert variant="warning">No integration found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="11">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
            {type === 'LMS' &&
              subType === 'BrightCove' &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData?.map((row, counter) => (
                    <tr key={(row, counter)} className="admin-panel-rows">
                      <td>{row.organization?.id}</td>
                      <td>{row.account_id}</td>
                      <td>{row.account_email}</td>
                      <td>{row.account_name}</td>
                      <td>{row.description}</td>
                      <td>{row.client_id}</td>
                      <td>{row.client_secret}</td>
                      <td>
                        <div className="admin-panel-dropdown">
                          {row.css_path ? (
                            <a download href={global.config.resourceUrl + row.css_path} target="_blank">
                              download
                            </a>
                          ) : (
                            'Not Available'
                          )}
                          <div>
                            <AdminDropdown type={type} subType="BrightCove" row={row} activePage={activePage} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">
                      <Alert variant="warning">No integration found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="11">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
            {type === 'Users' &&
              (data?.data?.length > 0 ? (
                data?.data.map((user, counter) => (
                  <tr key={(user, counter)} className="admin-panel-rows">
                    <td>{user.organization_joined_at ? user.organization_joined_at : 'NA'}</td>
                    <td>{user.first_name ? user.first_name : 'NA'}</td>
                    <td>{user.last_name ? user.last_name : 'NA'}</td>
                    <td>{user.email ? user.email : 'NA'}</td>
                    <td>{activeOrganization?.name ? activeOrganization?.name : 'NA'}</td>
                    <td>{user.organization_type ? user.organization_type : 'NA'}</td>
                    <td>
                      <div className="admin-panel-dropdown">
                        {user.organization_role ? user.organization_role : 'NA'}
                        <div>
                          <AdminDropdown type={type} user={user} />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : searchAlertToggler === 0 || data?.data?.length === 0 ? (
                <tr>
                  <td colSpan="8">
                    <Alert variant="warning">No User Found</Alert>
                  </td>
                </tr>
              ) : (
                <tr>
                  <td colSpan="8">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
            {type === 'Organization' &&
              (localOrganizationList ? (
                localOrganizationList?.data?.length > 0 ? (
                  localOrganizationList?.data?.map((row, counter) => (
                    <tr key={counter} className="admin-panel-rows">
                      <td>
                        <div className="admin-name-img">
                          <div
                            style={{
                              backgroundImage: row.image?.includes('dev.currikistudio') ? `url(${row.image})` : `url(${global.config.resourceUrl}${row.image})`,
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: 'cover',
                            }}
                            className="admin-img"
                          >
                            {/* <img src={global.config.resourceUrl + row.image} alt="" /> */}
                          </div>

                          <Link
                            className="admin-name"
                            to="#"
                            onClick={async () => {
                              Swal.fire({
                                title: 'Please Wait !',
                                html: 'Updating View ...',
                                allowOutsideClick: false,
                                onBeforeOpen: () => {
                                  Swal.showLoading();
                                },
                              });
                              if (permission?.Organization?.includes('organization:view')) await dispatch(getOrganization(row.id));
                              Swal.close();
                              dispatch({
                                type: actionTypes.UPDATE_PAGINATION,
                                payload: [...paginations, row],
                              });
                              if (row.projects_count > 0) {
                                if (permission?.Organization?.includes('organization:view')) await dispatch(getOrganization(row.id));
                                dispatch(clearOrganizationState());
                                dispatch(getRoles());
                              }
                            }}
                          >
                            {row.name}
                          </Link>
                        </div>
                      </td>
                      <td>{row.domain}</td>
                      <td>
                        {row.projects_count > 0 ? (
                          <div
                            className="view-all"
                            onClick={async () => {
                              Swal.fire({
                                title: 'Please Wait !',
                                html: 'Updating View ...',
                                allowOutsideClick: false,
                                onBeforeOpen: () => {
                                  Swal.showLoading();
                                },
                              });
                              if (permission?.Organization?.includes('organization:view')) await dispatch(getOrganization(row.id));
                              Swal.close();
                              dispatch({
                                type: actionTypes.UPDATE_PAGINATION,
                                payload: [...paginations, row],
                              });
                              if (row.projects_count > 0) {
                                if (permission?.Organization?.includes('organization:view')) await dispatch(getOrganization(row.id));
                                dispatch(clearOrganizationState());
                                dispatch(getRoles());
                                dispatch(setActiveTab('Projects'));
                              }
                            }}
                          >
                            {row.projects_count}
                          </div>
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td>
                        {row.suborganization_count > 0 ? (
                          <Link
                            className="view-all"
                            onClick={async () => {
                              if (row.suborganization_count > 0) {
                                Swal.fire({
                                  title: 'Please Wait !',
                                  html: 'Updating View ...',
                                  allowOutsideClick: false,
                                  onBeforeOpen: () => {
                                    Swal.showLoading();
                                  },
                                });

                                if (permission?.Organization?.includes('organization:view')) await dispatch(getOrganization(row.id));
                                Swal.close();
                                dispatch({
                                  type: actionTypes.UPDATE_PAGINATION,
                                  payload: [...paginations, row],
                                });
                                dispatch(clearOrganizationState());
                                dispatch(getRoles());
                              }
                            }}
                          >
                            {row.suborganization_count || 0}
                          </Link>
                        ) : (
                          'N/A'
                        )}
                      </td>
                      {permission?.Organization?.includes('organization:view-user') && (
                        <td>
                          {row.users_count > 0 ? (
                            <Link
                              className="view-all"
                              onClick={async () => {
                                if (row.users_count > 0) {
                                  Swal.fire({
                                    title: 'Please Wait !',
                                    html: 'Updating View ...',
                                    allowOutsideClick: false,
                                    onBeforeOpen: () => {
                                      Swal.showLoading();
                                    },
                                  });
                                  if (permission?.Organization?.includes('organization:view')) await dispatch(getOrganization(row.id));
                                  Swal.close();
                                  dispatch({
                                    type: actionTypes.UPDATE_PAGINATION,
                                    payload: [...paginations, row],
                                  });
                                  dispatch(clearOrganizationState());
                                  dispatch(getRoles());
                                  dispatch(setActiveTab('Users'));
                                }
                              }}
                            >
                              {row.users_count}
                            </Link>
                          ) : (
                            'N/A'
                          )}
                        </td>
                      )}

                      <td>
                        <div className="admin-panel-dropdown">
                          {row.teams_count > 0 ? (
                            <Link
                              to={`/org/${allState?.organization?.currentOrganization?.domain}/teams`}
                              className="view-all"
                              onClick={async () => {
                                if (permission?.Organization?.includes('organization:view')) await dispatch(getOrganization(row.id));
                                dispatch(clearOrganizationState());
                                dispatch(getRoles());
                              }}
                            >
                              {row.teams_count}
                            </Link>
                          ) : (
                            'N/A'
                          )}
                          <div>
                            <AdminDropdown type={type} row={row} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" style={{ textAlign: 'center' }}>
                      <Alert variant="warning"> No sub-organization available</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="9">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
            {type === 'Projects' &&
              subType === 'All Projects' &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData.map((row, counter) => {
                    const createNew = new Date(row.created_at);
                    const updateNew = new Date(row.updated_at);
                    return (
                      <tr key={counter} className="admin-panel-rows">
                        <td>
                          <div className="admin-name-img">
                            <div
                              style={{
                                backgroundImage: !row.thumb_url?.includes('/storage/') ? `url(${row.thumb_url})` : `url(${global.config.resourceUrl}${row.thumb_url})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                              }}
                              className="admin-img"
                            ></div>

                            <Link className="admin-name" to={`/org/${organization?.currentOrganization?.domain}/project/${row.id}/preview`}>
                              {row.name}
                            </Link>
                          </div>
                        </td>
                        <td>{new Date(createNew.toDateString()).toLocaleDateString('en-US')}</td>

                        <td>
                          <div className="admin-description">{row.description}</div>
                        </td>

                        <td>{row.id}</td>
                        <td>{row.team?.name ? `(T)${row.team?.name}` : row.users?.[0]?.name}</td>
                        <td>
                          {permission?.Organization?.includes('organization:edit-project') ? (
                            <div className="filter-dropdown-table" id="filter-dropdown-table-id">
                              <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                  {row.indexing_text}
                                  <FontAwesomeIcon icon="chevron-down" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {indexingArray.map(
                                    (element) =>
                                      element.indexing_text !== 'NOT REQUESTED' && (
                                        <Dropdown.Item
                                          onClick={async () => {
                                            const result = await adminService.updateIndex(row.id, element.indexing);
                                            if (result?.message) {
                                              const editRow = {
                                                ...row,
                                                indexing: element.indexing,
                                                indexing_text: element.indexing_text,
                                              };
                                              setLocalStateData(localStateData.map((indexing) => (indexing.id === row.id ? editRow : indexing)));
                                              Swal.fire({
                                                icon: 'success',
                                                text: result.message,
                                              });
                                            } else {
                                              Swal.fire({
                                                icon: 'error',
                                                text: 'Error',
                                              });
                                            }
                                          }}
                                        >
                                          {element.indexing_text}
                                        </Dropdown.Item>
                                      ),
                                  )}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          ) : (
                            row.indexing_text
                          )}
                        </td>
                        <td>
                          {permission?.Organization?.includes('organization:edit-project') ? (
                            <div className="filter-dropdown-table" id="filter-dropdown-table-id">
                              <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                  {/* {visibilityTypeArray?.filter((element) => element.id === row.organization_visibility_type_id)[0]?.display_name} */}
                                  {visibilityTypeArray?.filter((element) => element.id === row.organization_visibility_type_id)[0]?.display_name === 'All'
                                    ? 'Public'
                                    : visibilityTypeArray?.filter((element) => element.id === row.organization_visibility_type_id)[0]?.display_name}
                                  <FontAwesomeIcon icon="chevron-down" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {visibilityTypeArray?.map((element) => {
                                    if (element.display_name !== 'My Org + Parent and Child Org') {
                                      return (
                                        <Dropdown.Item
                                          onClick={async () => {
                                            Swal.showLoading();
                                            const result = await dispatch(
                                              updateProjectAction(row.id, {
                                                ...row,
                                                organization_visibility_type_id: element.id,
                                              }),
                                            );
                                            if (result) {
                                              setLocalStateData(localStateData.map((element1) => (element1.id === row.id ? result : element1)));
                                            }
                                            Swal.close();
                                          }}
                                        >
                                          {element.display_name === 'All' ? 'Public' : element.display_name}
                                        </Dropdown.Item>
                                      );
                                    }

                                    // (
                                    //   <Dropdown.Item
                                    //     onClick={async () => {
                                    //       Swal.showLoading();
                                    //       const result = await dispatch(
                                    //         updateProjectAction(row.id, {
                                    //           ...row,
                                    //           organization_visibility_type_id: element.id,
                                    //         }),
                                    //       );
                                    //       if (result) {
                                    //         setLocalStateData(localStateData.map((element1) => (element1.id === row.id ? result : element1)));
                                    //       }
                                    //       Swal.close();
                                    //     }}
                                    //   >
                                    //     {element.display_name}
                                    //   </Dropdown.Item>
                                    // )
                                  })}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          ) : (
                            visibilityTypeArray?.filter((element) => element.id === row.organization_visibility_type_id)[0]?.display_name
                          )}
                        </td>
                        <td>
                          {permission?.Organization?.includes('organization:edit-project') ? (
                            <div className="filter-dropdown-table" id="filter-dropdown-table-id">
                              <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                  {row.shared ? 'Enabled' : 'Disabled'}
                                  <FontAwesomeIcon icon="chevron-down" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={async () => {
                                      if (!row.shared) {
                                        const result = await dispatch(toggleProjectShareAction(row.id, row.name, true));
                                        if (result) {
                                          setLocalStateData(localStateData.map((element) => (element.id === row.id ? result : element)));
                                        }
                                      }
                                    }}
                                  >
                                    Enable
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={async () => {
                                      if (row.shared) {
                                        const result = await dispatch(toggleProjectShareRemovedAction(row.id, row.name, true));
                                        if (result) {
                                          setLocalStateData(localStateData.map((element) => (element.id === row.id ? result : element)));
                                        }
                                      }
                                    }}
                                  >
                                    Disable
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          ) : row.shared ? (
                            'Enabled'
                          ) : (
                            'Disabled'
                          )}
                        </td>
                        {/* <td>{String(row.starter_project)}</td> */}
                        {/* <td>{row.status_text}</td> */}
                        <td>
                          <div className="admin-panel-dropdown">
                            {new Date(updateNew.toDateString()).toLocaleDateString('en-US')}
                            <div>
                              <AdminDropdown
                                activePage={activePage}
                                setAllProjectTab={setAllProjectTab}
                                setLocalStateData={setLocalStateData}
                                localStateData={localStateData}
                                type={type}
                                row={row}
                                setModalShow={setModalShow}
                                setrowData={setrowData}
                                setActivePageNumber={setActivePageNumber}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="11">
                      <Alert variant="warning">No result found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="13">
                    <Alert variant="primary">Loading data...</Alert>
                  </td>
                </tr>
              ))}

            {type === 'Projects' &&
              subType === 'Exported Projects' &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData?.map((row, counter) => {
                    // console.log(row);
                    return (
                      <tr key={counter} className="org-rows">
                        <td>{row.project}</td>
                        <td>{row.created_at}</td>
                        <td>{row.will_expire_on}</td>
                        {permission?.Organization?.includes('organization:download-project') ? (
                          <td>
                            <a href={row.link} target="_blank">
                              Download
                            </a>
                          </td>
                        ) : (
                          <td>Not Authorized</td>
                        )}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="11">
                      <Alert variant="warning">No result found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="13">
                    <Alert variant="primary">Loading data...</Alert>
                  </td>
                </tr>
              ))}

            {/* Ind. Activity Start */}
            {type === 'IndActivities' &&
              subType === 'All independent activities' &&
              (data ? (
                data?.data?.length > 0 ? (
                  data.data.map((row, counter) => {
                    const createNew = new Date(row.created_at);
                    const updateNew = new Date(row.updated_at);
                    return (
                      <tr key={counter} className="admin-panel-rows">
                        <td
                          onClick={() => {
                            setCurrentActivity(row.id), setModalShowh5p(true);
                          }}
                        >
                          <div className="admin-name-img">
                            <div
                              style={{
                                backgroundImage: !row.thumb_url?.includes('/storage/') ? `url(${row.thumb_url})` : `url(${global.config.resourceUrl}${row.thumb_url})`,
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'center',
                              }}
                              className="admin-img"
                            ></div>

                            <Link className="admin-name">{row.title}</Link>
                          </div>
                        </td>
                        <td>{new Date(createNew.toDateString()).toLocaleDateString('en-US')}</td>

                        <td>{row.id}</td>
                        <td>{row.user?.name}</td>

                        <td>
                          {permission?.['Independent Activity']?.includes('independent-activity:edit') ? (
                            <div className="filter-dropdown-table" id="filter-dropdown-table-id">
                              <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                  {row.indexing_text}
                                  <FontAwesomeIcon icon="chevron-down" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {indexingArray.map(
                                    (element) =>
                                      element.indexing_text !== 'NOT REQUESTED' && (
                                        <Dropdown.Item
                                          onClick={() => {
                                            dispatch(getIndex(row.id, element, 'admin'));
                                          }}
                                        >
                                          {element.indexing_text}
                                        </Dropdown.Item>
                                      ),
                                  )}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          ) : (
                            row.indexing_text
                          )}
                        </td>
                        <td>
                          {permission?.['Independent Activity']?.includes('independent-activity:edit') ? (
                            <div className="filter-dropdown-table" id="filter-dropdown-table-id">
                              <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                  {/* {visibilityTypeArray?.filter((element) => element.id === row.organization_visibility_type_id)[0]?.display_name} */}
                                  {visibilityTypeArray?.filter((element) => element.id === row.organization_visibility_type_id)[0]?.display_name === 'All'
                                    ? 'Public'
                                    : visibilityTypeArray?.filter((element) => element.id === row.organization_visibility_type_id)[0]?.display_name}
                                  <FontAwesomeIcon icon="chevron-down" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {visibilityTypeArray?.map((element) => {
                                    if (element?.display_name !== 'My Org + Parent and Child Org') {
                                      return (
                                        <Dropdown.Item
                                          onClick={() => {
                                            dispatch(
                                              editIndActivityItem(
                                                row.id,
                                                {
                                                  ...row,
                                                  data: '',
                                                  organization_visibility_type_id: element.id,
                                                },
                                                'admin',
                                              ),
                                            );
                                          }}
                                        >
                                          {element.display_name === 'All' ? 'Public' : element.display_name}
                                        </Dropdown.Item>
                                      );
                                    }

                                    // (
                                    //   <Dropdown.Item
                                    //     onClick={() => {
                                    //       dispatch(
                                    //         editIndActivityItem(
                                    //           row.id,
                                    //           {
                                    //             ...row,
                                    //             data: '',
                                    //             organization_visibility_type_id: element.id,
                                    //           },
                                    //           'admin',
                                    //         ),
                                    //       );
                                    //     }}
                                    //   >
                                    //     {element.display_name}
                                    //   </Dropdown.Item>
                                    // )
                                  })}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          ) : (
                            visibilityTypeArray?.filter((element) => element.id === row.organization_visibility_type_id)[0]?.display_name
                          )}
                        </td>
                        <td>
                          {permission?.['Independent Activity']?.includes('independent-activity:edit') ? (
                            <div className="filter-dropdown-table" id="filter-dropdown-table-id">
                              <Dropdown>
                                <Dropdown.Toggle id="dropdown-basic">
                                  {row.shared ? 'Enabled' : 'Disabled'}
                                  <FontAwesomeIcon icon="chevron-down" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item
                                    onClick={async () => {
                                      dispatch(shareEnableLink(row.id, 'admin'));
                                    }}
                                  >
                                    Enable
                                  </Dropdown.Item>
                                  <Dropdown.Item
                                    onClick={() => {
                                      Swal.fire({
                                        icon: 'warning',
                                        title: `You are about to stop sharing <strong>"${row.title}"</strong>`,
                                        html: `Please remember that anyone you have shared this project
                                                              with will no longer have access its contents. Do you want to continue?`,
                                        showCloseButton: true,
                                        showCancelButton: true,
                                        focusConfirm: false,
                                        confirmButtonText: 'Stop Sharing!',
                                        confirmButtonAriaLabel: 'Stop Sharing!',
                                        cancelButtonText: 'Cancel',
                                        cancelButtonAriaLabel: 'Cancel',
                                      }).then((resp) => {
                                        if (resp.isConfirmed) {
                                          dispatch(shareDisableLink(row.id, 'admin'));
                                        }
                                      });
                                    }}
                                  >
                                    Disable
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          ) : row.shared ? (
                            'Enabled'
                          ) : (
                            'Disabled'
                          )}
                        </td>
                        {/* <td>{String(row.starter_project)}</td> */}
                        {/* <td>{row.status_text}</td> */}
                        <td>
                          <div className="admin-panel-dropdown">
                            {new Date(updateNew.toDateString()).toLocaleDateString('en-US')}
                            <div>
                              <AdminDropdown
                                activePage={activePage}
                                type={type}
                                row={row}
                                setModalShow={setModalShow}
                                setrowData={setrowData}
                                setActivePageNumber={setActivePageNumber}
                                setCurrentActivity={setCurrentActivity}
                                setModalShowh5p={setModalShowh5p}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="11">
                      <Alert variant="warning">No result found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="13">
                    <Alert variant="primary">Loading data...</Alert>
                  </td>
                </tr>
              ))}
            {type === 'IndActivities' &&
              subType === 'Exported activities' &&
              (data ? (
                data?.data?.length > 0 ? (
                  data.data.map((row, counter) => {
                    const createNew = new Date(row?.created_at);
                    const expireNew = new Date(row.will_expire_on);
                    return (
                      <tr key={counter} className="admin-panel-rows">
                        <td>
                          <div className="admin-name-img">
                            <Link className="admin-name">{row.project}</Link>
                          </div>
                        </td>
                        <td>{new Date(createNew.toDateString()).toLocaleDateString('en-US')}</td>
                        <td>{new Date(expireNew.toDateString()).toLocaleDateString('en-US')}</td>
                        <td>
                          <a href={row.link} target="_blank">
                            Download
                          </a>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="11">
                      <Alert variant="warning">No result found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="13">
                    <Alert variant="primary">Loading data...</Alert>
                  </td>
                </tr>
              ))}
            {/* Ind. Activity End*/}

            {type === 'Activities' &&
              subType === 'Activity Types' &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData?.map((row) => (
                    <tr key={'act-type-' + row.id} className="admin-panel-rows">
                      <td>
                        <div className="admin-name-img">
                          <div
                            style={{
                              backgroundImage: `url(${global.config.resourceUrl + row.image})`,
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: 'contain',
                            }}
                            className="image-size"
                          ></div>
                          <Link className="admin-name">{row.title}</Link>
                        </div>
                      </td>
                      <td>{row.order}</td>
                      <td>
                        <div className="admin-panel-dropdown">
                          <div className="admin-description-main">
                            <div className="admin-description2">
                              {row.activityItems.map((item, i) => (
                                <div>{row.activityItems.length === i + 1 ? item.title : item.title + ','}</div>
                              ))}
                            </div>
                            <div className="admin-description2-hover">
                              {row.activityItems.map((item, i) => (
                                <>{row.activityItems.length === i + 1 ? item.title : item.title + ','}</>
                              ))}
                            </div>
                          </div>
                          <div>
                            <AdminDropdown type={type} subType={subType} row={row} activePage={activePage} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">
                      <Alert variant="warning">No activity type found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="11">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
            {type === 'Activities' &&
              subType === 'Activity Items' &&
              (data?.data ? (
                data?.data?.length > 0 ? (
                  data?.data.map((item, counter) => (
                    <tr key={counter} className="admin-panel-rows">
                      <td>
                        <div className="admin-name-img">
                          <div
                            style={{
                              backgroundImage: `url(${global.config.resourceUrl + item.image})`,
                              backgroundPosition: 'center',
                              backgroundRepeat: 'no-repeat',
                              backgroundSize: 'contain',
                            }}
                            className="image-size"
                          ></div>

                          <Link className="admin-name"> {item.title}</Link>
                        </div>
                      </td>
                      <td>{item.order}</td>
                      <td>
                        <div className="admin-panel-dropdown">
                          <div className="">
                            <div className="d-flex" id="meta-style-td-id">
                              <h6 className="m-0 admin-mata-heading">Activity Type:</h6>
                              <span>{item?.activityType?.title}</span>
                            </div>
                            <div className="d-flex" id="meta-style-td-id">
                              <h6 className="m-0 admin-mata-heading">Item Type:</h6>
                              <span>{item.type}</span>
                            </div>
                            <div className="d-flex" id="meta-style-td-id">
                              <h6 className="m-0 admin-mata-heading">Activity Item Value:</h6>
                              <span>{item.h5pLib}</span>
                            </div>
                          </div>

                          <div>
                            <AdminDropdown type1={item} type={type} subType={subType} />
                          </div>
                        </div>
                      </td>
                      {/* <td>
                        <div className="links">
                          <Link
                            onClick={() => {
                              dispatch(selectActivityItem(item));
                              dispatch(setActiveAdminForm('edit_activity_item'));
                            }}
                          >
                            &nbsp;&nbsp;Edit&nbsp;&nbsp;
                          </Link>
                          <Link
                            onClick={() => {
                              Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#084892',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!',
                              }).then(async (result) => {
                                if (result.isConfirmed) {
                                  Swal.showLoading();
                                  const resultDel = await dispatch(deleteActivityItem(item.id));
                                  if (resultDel) {
                                    Swal.fire({
                                      text: 'You have successfully deleted the activity item',
                                      icon: 'success',
                                      showCancelButton: false,
                                      confirmButtonColor: '#084892',
                                      cancelButtonColor: '#d33',
                                      confirmButtonText: 'OK',
                                    }).then((result) => {
                                      if (result.isConfirmed) {
                                        dispatch(getActivityItems('', 1));
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
                      </td> */}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <Alert variant="warning"> No activity item found</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="5">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}

            {type === 'Activities' &&
              subType === 'Subjects' &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData?.map((row) => (
                    <tr key={'subject-' + row.id} className="admin-panel-rows">
                      <td>{row.name}</td>
                      <td>{row.order}</td>
                      <td>
                        <div className="admin-panel-dropdown">
                          <div>
                            <AdminDropdown type={type} subType="Subjects" row={row} activePage={activePage} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">
                      <Alert variant="warning">No subject found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="11">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}

            {type === 'Activities' &&
              subType === 'Education Level' &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData?.map((row) => (
                    <tr key={'edu-lvl-' + row.id} className="admin-panel-rows">
                      <td>{row.name}</td>
                      <td>{row.order}</td>
                      <td>
                        <div className="admin-panel-dropdown">
                          <div>
                            <AdminDropdown type={type} subType="Education Level" row={row} activePage={activePage} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">
                      <Alert variant="warning">No Education level found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="11">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}

            {type === 'Activities' &&
              subType === 'Author Tags' &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData?.map((row) => (
                    <tr key={'auth-tag-' + row.id} className="admin-panel-rows">
                      <td>{row.name}</td>
                      <td>{row.order}</td>
                      <td>
                        <div className="admin-panel-dropdown">
                          <div>
                            <AdminDropdown type={type} subType="Author Tags" row={row} activePage={activePage} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">
                      <Alert variant="warning">No Author tag found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="11">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}

            {type === 'Activities' &&
              subType === 'Activity Layouts' &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData?.map((row) => (
                    <tr key={'act-lay-' + row.id} className="admin-panel-rows">
                      <td>{row.title}</td>
                      <td>{row.order}</td>
                      <td>
                        <div className="admin-panel-dropdown">
                          --
                          <div>
                            <AdminDropdown type={type} subType="Activity Layouts" row={row} activePage={activePage} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">
                      <Alert variant="warning">No Activity layout found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="11">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}

            {type === 'DefaultSso' &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData?.map((row, counter) => (
                    <tr key={counter} className="admin-panel-rows">
                      <td>{row?.site_name}</td>
                      <td>{row.lms_url}</td>
                      <td>{row.lms_name}</td>
                      <td>{row.lti_client_id}</td>
                      <td>
                        <div className="admin-panel-dropdown">
                          <div>{row?.description}</div>
                          <div>
                            <AdminDropdown type={type} row={row} activePage={activePage} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">
                      <Alert variant="warning">No Default SSO integration found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="11">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
            {type === 'LMS' &&
              subType === 'LTI Tools' &&
              (localStateData ? (
                localStateData?.length > 0 ? (
                  localStateData
                    ?.filter((item) => {
                      if (filterLtiSettings) {
                        if (item?.media_sources?.name === filterLtiSettings?.name) {
                          return item;
                        }
                      } else {
                        return item;
                      }
                    })
                    ?.map((row, counter) => (
                      <tr key={counter} className="admin-panel-rows">
                        <td>{row.tool_name}</td>
                        <td>{row.tool_url}</td>
                        {/* <td>{toolTypeArray.filter((type) => type.key === row.tool_type)[0]?.value}</td> */}
                        {!filterLtiSettings ? <td>{row?.media_sources?.name}</td> : <td>{ltiToolTypes?.filter((type) => type.id == row.media_source_id)[0]?.name}</td>}

                        {/* <td>{`${row.user.first_name} ${row.user.last_name}`}</td> */}
                        <td>{row.tool_description}</td>
                        <td>
                          <div className="admin-panel-dropdown">
                            {row.lti_version}
                            <div>
                              <AdminDropdown
                                type={type}
                                subType="LTI Tools"
                                row={row}
                                activePage={activePage}
                                localStateData={localStateData}
                                setLocalStateData={setLocalStateData}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="11">
                      <Alert variant="warning">No LTI Tool found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="11">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
            {type === 'Teams' &&
              (Object.keys(data).length > 0 ? (
                data?.data?.length > 0 ? (
                  data?.data.map((row, counter) => (
                    <tr key={counter} className="admin-panel-rows">
                      <td>{row.name.length > 30 ? row.name.substring(0, 30).concat('...') : row.name}</td>
                      <td>{row.created_at?.split('T')[0]}</td>
                      <td>{row.description.length > 30 ? row.description.substring(0, 30).concat('...') : row.description}</td>
                      <td>{row?.users?.length}</td>
                      <td>{row?.projects?.length}</td>
                      <td>
                        <div className="admin-panel-dropdown">
                          {row?.updated_at?.split('T')[0]}
                          <div>
                            <AdminDropdown type={type} row={row} setModalShowTeam={setModalShowTeam} />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11">
                      <Alert variant="warning">No team found.</Alert>
                    </td>
                  </tr>
                )
              ) : (
                <tr>
                  <td colSpan="11">
                    <Alert variant="primary">Loading...</Alert>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {((data?.data?.length > 0 && data?.meta) || (localOrganizationList?.data?.length > 0 && localOrganizationList?.meta && type !== 'LMS')) && (
        <AdminPagination
          setCurrentTab={setCurrentTab}
          subType={subType}
          subTypeState={subTypeState}
          type={type}
          data={data}
          activePage={activePage}
          setActivePage={setActivePage}
          updatePageNumber={updatePageNumber}
          localstatePagination={localstatePagination}
        />
      )}
    </div>
  );
}

Table.propTypes = {
  headers: PropTypes.array,
  data: PropTypes.object,
};

export default withRouter(Table);
