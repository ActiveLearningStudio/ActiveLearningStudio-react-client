/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import adminService from 'services/admin.service';
import indActivityService from 'services/indActivities.service';
import projectService from 'services/project.service';

import './style.scss';
import {
  getAuthorTag,
  getDefaultSso,
  getEducationLevel,
  getLmsProject,
  getLtiTools,
  getSubjects,
  setActiveAdminForm,
  setCurrentUser,
  showRemoveUser,
  getActivityLayout,
  cloneLtiTool,
} from 'store/actions/admin';
import { deleteBrightCove } from 'store/actions/videos';

import { deleteOrganization, getOrganization, clearOrganizationState, getRoles } from 'store/actions/organization';
import { deleteActivityItem, deleteActivityType, loadResourceTypesAction, selectActivityItem, selectActivityType, loadResourceItemAction } from 'store/actions/resource';
import * as actionTypes from 'store/actionTypes';

import SharePreviewPopup from 'components/SharePreviewPopup';
import { deleteTeamAction, getTeamPermission } from 'store/actions/team';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import { deleteIndActivity } from 'store/actions/indActivities';
import MenuLgSvg from 'iconLibrary/dropDown/MenuLgSvg';
import EditDpDnMdSvg from 'iconLibrary/dropDown/EditDpDnMdSvg';
import ManageMdSvg from 'iconLibrary/dropDown/ManageMdSvg';
import DeleteSmSvg from 'iconLibrary/dropDown/DeleteSmSvg';
import ExportSmSvg from 'iconLibrary/dropDown/ExportSmSvg';
import ShareLinkSmSvg from 'iconLibrary/dropDown/ShareLinkSmSvg';
import RemoveSmSvg from 'iconLibrary/dropDown/RemoveSmSvg';
import CloneSmSvg from 'iconLibrary/dropDown/CloneSmSvg';
import PreviewSmSvg from 'iconLibrary/dropDown/PreviewSmSvg';

const AdminDropdown = (props) => {
  const {
    type,
    user,
    row,
    type1,
    subType,
    activePage,
    setLocalStateData,
    localStateData,
    setAllProjectTab,
    setrowData,
    setModalShow,
    setModalShowTeam,
    setActivePageNumber,
    setCurrentActivity,
    setModalShowh5p,
  } = props;

  // console.log("Type:" + type);
  // const ImgLoader = () => <img src={loader} alt="loader" />;
  const organization = useSelector((state) => state.organization);
  const { activeOrganization, allSuborgList, permission } = organization;
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const { paginations } = useSelector((state) => state.ui);
  // const AllLms = useSelector((state) => state.share);
  // const [allLms, setAllLms] = useState([]);
  // useEffect(() => {
  //   setAllLms(AllLms);
  // }, [AllLms]);

  const [projectID, setProjectID] = useState('');
  const primaryColor = getGlobalColor('--main-primary-color');

  return (
    <>
      <Dropdown drop="start" className="project-dropdown check d-flex  align-items-center text-added-project-dropdown">
        <Dropdown.Toggle className="project-dropdown-btn project d-flex justify-content-center align-items-center">
          {/* <FontAwesomeIcon
          icon="ellipsis-v"
          style={{
            fontSize: '13px',
            color: iconColor || '#084892',
            marginLeft: '5px',
          }}
        /> */}
          {/* <span>{text}</span> */}
          {/* <img src={MenuLogo} alt="menu" /> */}
          <MenuLgSvg primaryColor={primaryColor} />
        </Dropdown.Toggle>

        <Dropdown.Menu className="menu">
          {type === 'Organization' && (
            <>
              {' '}
              {permission?.Organization.includes('organization:edit') && (
                <Dropdown.Item
                  onClick={() => {
                    dispatch(setActiveAdminForm('edit_org'));
                    dispatch({
                      type: 'SET_ACTIVE_EDIT',
                      payload: row,
                    });
                  }}
                >
                  {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
                  <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
                  Edit
                </Dropdown.Item>
              )}
              {permission?.Organization.includes('organization:view') && (
                <>
                  <Dropdown.Item
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
                    <ManageMdSvg primaryColor={primaryColor} className="menue-img" />
                    Manage
                  </Dropdown.Item>
                </>
              )}
              {permission?.Organization.includes('organization:delete') && (
                <>
                  <Dropdown.Item
                    to="#"
                    onClick={() => {
                      Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#084892',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Delete it',
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          Swal.showLoading();
                          const resultDel = await dispatch(deleteOrganization(row));
                          if (resultDel) {
                            Swal.fire({
                              text: 'You have successfully deleted the organization',
                              icon: 'success',
                              showCancelButton: false,
                              confirmButtonText: 'Close',
                              customClass: {
                                confirmButton: 'confirmation-close-btn',
                              },
                            });
                          }
                        }
                      });
                    }}
                  >
                    <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
                    Delete
                  </Dropdown.Item>
                </>
              )}
            </>
          )}
          {type === 'Projects' && (
            <>
              {permission?.Organization.includes('organization:export-project') && (
                <Dropdown.Item
                  onClick={() => {
                    Swal.fire({
                      title: 'Please Wait !',
                      html: 'Exporting  Project ...',
                      allowOutsideClick: false,
                      onBeforeOpen: () => {
                        Swal.showLoading();
                      },
                    });
                    const result = adminService.exportProject(activeOrganization.id, row.id);
                    result.then((data) => {
                      // console.log(data)
                      Swal.fire({
                        icon: 'success',
                        html: data?.message,
                      });
                    });
                  }}
                >
                  {/* <img src={Export} alt="Preview" className="menue-img" /> */}
                  <ExportSmSvg primaryColor={primaryColor} className="menue-img" />
                  Export
                </Dropdown.Item>
              )}
              {row.shared ? (
                <Dropdown.Item
                  onClick={() => {
                    const protocol = `${window.location.href.split('/')[0]}//`;
                    const url = `${protocol + window.location.host}/project/${row.id}/shared`;
                    SharePreviewPopup(url, row.name);
                  }}
                >
                  <ShareLinkSmSvg primaryColor={primaryColor} className="menue-img" />
                  Get shared link
                </Dropdown.Item>
              ) : null}
              {permission?.Organization.includes('organization:edit-project') && (
                <Dropdown.Item
                  onClick={() => {
                    // dispatch(setActiveAdminForm("edit_project"));
                    // dispatch(setCurrentProject(row));
                    setModalShow(true);
                    setProjectID(row.id);
                    setrowData(row);
                    setActivePageNumber(activePage);
                  }}
                >
                  {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
                  <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
                  Edit
                </Dropdown.Item>
              )}
              {permission?.Organization.includes('organization:delete-project') && (
                <Dropdown.Item
                  to="#"
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#084892',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Delete it',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          icon: 'info',
                          text: 'Deleting Project...',
                          allowOutsideClick: false,
                          onBeforeOpen: () => {
                            Swal.showLoading();
                          },
                          button: false,
                        });
                        const response = projectService.remove(row.id, activeOrganization.id);
                        response
                          .then((res) => {
                            Swal.fire({
                              icon: 'success',
                              text: res?.message,
                              confirmButtonText: 'Close',
                              customClass: {
                                confirmButton: 'confirmation-close-btn',
                              },
                            });

                            const filterProject = localStateData.filter((each) => each.id != row.id);
                            console.log(filterProject);
                            setLocalStateData(filterProject);
                          })
                          .catch((err) => console.log(err));
                      }
                    });
                  }}
                >
                  <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
                  Delete
                </Dropdown.Item>
              )}
            </>
          )}
          {type === 'IndActivities' && (
            <>
              <Dropdown.Item
                onClick={() => {
                  setCurrentActivity(row.id), setModalShowh5p(true);
                }}
              >
                <PreviewSmSvg primaryColor={primaryColor} className="menue-img" />
                Preview
              </Dropdown.Item>
              {permission?.['Independent Activity']?.includes('independent-activity:export') && (
                <Dropdown.Item
                  onClick={() => {
                    Swal.fire({
                      title: 'Please Wait !',
                      html: 'Exporting  Activity ...',
                      allowOutsideClick: false,
                      onBeforeOpen: () => {
                        Swal.showLoading();
                      },
                    });
                    const result = indActivityService.exportIndAvtivity(activeOrganization.id, row.id);
                    result.then((data) => {
                      // console.log(data)
                      Swal.fire({
                        icon: 'success',
                        html: data?.message,
                      });
                    });
                  }}
                >
                  <ExportSmSvg primaryColor={primaryColor} className="menue-img" />
                  Export
                </Dropdown.Item>
              )}
              {row.shared && (
                <Dropdown.Item
                  onClick={() => {
                    if (window.gapi && window.gapi.sharetoclassroom) {
                      window.gapi.sharetoclassroom.go('croom');
                    }
                    const protocol = `${window.location.href.split('/')[0]}//`;
                    const url = `${protocol}${window.location.host}/activity/${row.id}/shared?type=ind`;
                    return SharePreviewPopup(url, row.title);
                  }}
                >
                  <ShareLinkSmSvg primaryColor={primaryColor} className="menue-img" />
                  Get Shared Link
                </Dropdown.Item>
              )}
              {permission?.['Independent Activity']?.includes('independent-activity:delete') && (
                <Dropdown.Item
                  to="#"
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#084892',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Delete it',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          icon: 'info',
                          text: 'Deleting Activity...',
                          allowOutsideClick: false,
                          onBeforeOpen: () => {
                            Swal.showLoading();
                          },
                          button: false,
                        });
                        dispatch(deleteIndActivity(row.id, 'admin'));
                      }
                    });
                  }}
                >
                  <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
                  Delete
                </Dropdown.Item>
              )}
            </>
          )}
          {type === 'Activities' && subType === 'Activity Items' && (
            <>
              {permission?.Organization.includes('organization:delete-activity-item') && (
                <Dropdown.Item
                  onClick={() => {
                    if (subType === 'Activity Items') {
                      selectActivityItem();
                      dispatch(selectActivityItem(type1));
                      dispatch(setActiveAdminForm('edit_activity_item'));
                    } else {
                      dispatch(selectActivityType(type1));
                      dispatch(setActiveAdminForm('edit_activity_type'));
                    }
                  }}
                >
                  {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
                  <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
                  Edit
                </Dropdown.Item>
              )}
              {permission?.Organization.includes('organization:edit-activity-item') && (
                <Dropdown.Item
                  to="#"
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#084892',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Delete it',
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        Swal.showLoading();
                        var resultDel;
                        if (subType === 'Activity Items') {
                          resultDel = await dispatch(deleteActivityItem(activeOrganization?.id, type1.id));
                          dispatch(loadResourceItemAction(type1.id));
                        } else {
                          resultDel = await dispatch(deleteActivityType(activeOrganization?.id, type1.id));

                          if (resultDel) {
                            Swal.fire({
                              text: 'You have successfully deleted the activity type',
                              icon: 'success',
                              showCancelButton: false,
                              confirmButtonText: 'Close',
                              customClass: {
                                confirmButton: 'confirmation-close-btn',
                              },
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch(loadResourceTypesAction('', 1));
                              }
                            });
                          }
                        }
                      }
                    });
                  }}
                >
                  <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
                  Delete
                </Dropdown.Item>
              )}
            </>
          )}
          {type === 'Activities' && subType === 'Activity Types' && (
            <>
              {permission?.Organization.includes('organization:edit-activity-type') && (
                <Dropdown.Item
                  onClick={() => {
                    if (subType === 'Activity Items') {
                      selectActivityItem();
                      dispatch(selectActivityItem(row));
                      dispatch(setActiveAdminForm('edit_activity_item'));
                    } else {
                      dispatch(selectActivityType(row));
                      dispatch(setActiveAdminForm('edit_activity_type'));
                    }
                  }}
                >
                  {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
                  <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
                  Edit
                </Dropdown.Item>
              )}
              {permission?.Organization.includes('organization:delete-activity-type') && (
                <Dropdown.Item
                  to="#"
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#084892',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Delete it',
                    }).then(async (result) => {
                      if (result.isConfirmed) {
                        Swal.showLoading();
                        var resultDel;
                        if (subType === 'Activity Items') {
                          resultDel = await dispatch(deleteActivityItem(activeOrganization?.id, row.id));
                          dispatch(loadResourceItemAction(row.id));
                        } else {
                          resultDel = await dispatch(deleteActivityType(activeOrganization?.id, row.id));

                          if (resultDel) {
                            Swal.fire({
                              text: 'You have successfully deleted the activity type',
                              icon: 'success',
                              showCancelButton: false,
                              confirmButtonText: 'Close',
                              customClass: {
                                confirmButton: 'confirmation-close-btn',
                              },
                            }).then((result) => {
                              if (result.isConfirmed) {
                                dispatch(loadResourceTypesAction('', 1));
                              }
                            });
                          }
                        }
                      }
                    });
                  }}
                >
                  <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
                  Delete
                </Dropdown.Item>
              )}
            </>
          )}

          {type === 'Activities' && subType === 'Subjects' && permission?.Organization.includes('organization:edit-subject') && (
            <>
              <Dropdown.Item
                onClick={() => {
                  dispatch({
                    type: 'SET_ACTIVE_EDIT',
                    payload: row,
                  });
                  dispatch(setActiveAdminForm('edit_subject'));
                }}
              >
                {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
                <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#084892',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Delete it',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: 'Subject',
                        icon: 'info',
                        text: 'Deleting Subject...',
                        allowOutsideClick: false,
                        onBeforeOpen: () => {
                          Swal.showLoading();
                        },
                        button: false,
                      });
                      const response = adminService.deleteSubject(activeOrganization?.id, row?.id);
                      response
                        .then((res) => {
                          Swal.fire({
                            icon: 'success',
                            text: 'Subject deleted successfully',
                            confirmButtonText: 'Close',
                            customClass: {
                              confirmButton: 'confirmation-close-btn',
                            },
                          });
                          dispatch(getSubjects(activeOrganization?.id, activePage || 1));
                        })
                        .catch((err) => console.log(err));
                    }
                  });
                }}
              >
                <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
                Delete
              </Dropdown.Item>
            </>
          )}

          {type === 'Activities' && subType === 'Education Level' && permission?.Organization.includes('organization:edit-education-level') && (
            <>
              <Dropdown.Item
                onClick={() => {
                  dispatch({
                    type: 'SET_ACTIVE_EDIT',
                    payload: row,
                  });
                  dispatch(setActiveAdminForm('edit_education_level'));
                }}
              >
                {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
                <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#084892',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Delete it',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: 'Education Level',
                        icon: 'info',
                        text: 'Deleting Education level...',
                        allowOutsideClick: false,
                        onBeforeOpen: () => {
                          Swal.showLoading();
                        },
                        button: false,
                      });
                      const response = adminService.deleteEducationLevel(activeOrganization?.id, row?.id);
                      response
                        .then((res) => {
                          Swal.fire({
                            icon: 'success',
                            text: 'Education level deleted successfully',
                            confirmButtonText: 'Close',
                            customClass: {
                              confirmButton: 'confirmation-close-btn',
                            },
                          });
                          dispatch(getEducationLevel(activeOrganization?.id, activePage || 1));
                        })
                        .catch((err) => console.log(err));
                    }
                  });
                }}
              >
                <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
                Delete
              </Dropdown.Item>
            </>
          )}

          {type === 'Activities' && subType === 'Author Tags' && permission?.Organization.includes('organization:edit-author-tag') && (
            <>
              <Dropdown.Item
                onClick={() => {
                  dispatch({
                    type: 'SET_ACTIVE_EDIT',
                    payload: row,
                  });
                  dispatch(setActiveAdminForm('edit_author_tag'));
                }}
              >
                {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
                <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#084892',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Delete it',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: 'Author Tag',
                        icon: 'info',
                        text: 'Deleting Author tag...',
                        allowOutsideClick: false,
                        onBeforeOpen: () => {
                          Swal.showLoading();
                        },
                        button: false,
                      });
                      const response = adminService.deleteAuthorTag(activeOrganization?.id, row?.id);
                      response
                        .then((res) => {
                          Swal.fire({
                            icon: 'success',
                            text: 'Author tag deleted successfully',
                            confirmButtonText: 'Close',
                            customClass: {
                              confirmButton: 'confirmation-close-btn',
                            },
                          });
                          dispatch(getAuthorTag(activeOrganization?.id, activePage || 1));
                        })
                        .catch((err) => console.log(err));
                    }
                  });
                }}
              >
                <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
                Delete
              </Dropdown.Item>
            </>
          )}

          {type === 'Activities' && subType === 'Activity Layouts' && permission?.Organization.includes('organization:edit-activity-layout') && (
            <>
              <Dropdown.Item
                onClick={() => {
                  dispatch({
                    type: 'SET_ACTIVE_EDIT',
                    payload: row,
                  });
                  dispatch(setActiveAdminForm('edit_activity_layout'));
                }}
              >
                <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#084892',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Delete it',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: 'Author Tag',
                        icon: 'info',
                        text: 'Deleting activity layout...',
                        allowOutsideClick: false,
                        onBeforeOpen: () => {
                          Swal.showLoading();
                        },
                        button: false,
                      });
                      const response = adminService.deleteActivityLayout(activeOrganization?.id, row?.id);
                      response
                        .then((res) => {
                          Swal.fire({
                            icon: 'success',
                            text: 'Activity layout deleted successfully',
                            confirmButtonText: 'Close',
                            customClass: {
                              confirmButton: 'confirmation-close-btn',
                            },
                          });
                          dispatch(getActivityLayout(activeOrganization?.id, activePage || 1));
                        })
                        .catch((err) => console.log(err));
                    }
                  });
                }}
              >
                <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
                Delete
              </Dropdown.Item>
            </>
          )}

          {type === 'Users' && (
            <>
              {' '}
              {permission?.Organization.includes('organization:update-user') && (
                <Dropdown.Item
                  onClick={() => {
                    dispatch(setCurrentUser(user));
                    dispatch(setActiveAdminForm('edit_user'));
                  }}
                >
                  <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
                  Edit
                </Dropdown.Item>
              )}
              {permission?.Organization.includes('organization:remove-user') && auth?.user?.id !== user.id && (
                <Dropdown.Item onClick={() => dispatch(showRemoveUser(user))}>
                  <RemoveSmSvg primaryColor={primaryColor} className="menue-img" />
                  Remove
                </Dropdown.Item>
              )}
            </>
          )}
          {type === 'LMS' && subType === 'LMS settings' && (
            <>
              {permission?.Organization.includes('organization:edit-lms-setting') && (
                <Dropdown.Item
                  to="#"
                  onClick={() => {
                    dispatch({
                      type: 'SET_ACTIVE_EDIT',
                      payload: row,
                    });
                    dispatch(setActiveAdminForm('edit_lms'));
                  }}
                >
                  <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
                  &nbsp;&nbsp;Edit&nbsp;&nbsp;
                </Dropdown.Item>
              )}
              {permission?.Organization.includes('organization:edit-lms-setting') && (
                <Dropdown.Item
                  to="#"
                  onClick={() => {
                    dispatch({
                      type: 'SET_ACTIVE_EDIT',
                      payload: row,
                    });
                    dispatch(setActiveAdminForm('clone_lms'));
                  }}
                >
                  <CloneSmSvg primaryColor={primaryColor} className="menue-img" />
                  &nbsp;&nbsp;Clone&nbsp;&nbsp;
                </Dropdown.Item>
              )}
              {permission?.Organization.includes('organization:delete-lms-setting') && (
                <Dropdown.Item
                  to="#"
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#084892',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Delete it',
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
                        const response = adminService.deleteLmsProject(activeOrganization?.id, row?.id);
                        response
                          .then((res) => {
                            Swal.fire({
                              icon: 'success',
                              text: res?.message,
                              confirmButtonText: 'Close',
                              customClass: {
                                confirmButton: 'confirmation-close-btn',
                              },
                            });
                            // dispatch(getLmsProject(activeOrganization?.id, activePage || 1));

                            const filterLMS = localStateData.filter((each) => each.id != row.id);

                            setLocalStateData(filterLMS);
                          })
                          .catch((err) => console.log(err));
                      }
                    });
                  }}
                >
                  <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
                  &nbsp;&nbsp;Delete&nbsp;&nbsp;
                </Dropdown.Item>
              )}
            </>
          )}

          {type === 'DefaultSso' && (
            <>
              {true && (
                <Dropdown.Item
                  onClick={() => {
                    dispatch({
                      type: 'SET_ACTIVE_EDIT',
                      payload: row,
                    });
                    dispatch(setActiveAdminForm('edit_default_sso'));
                  }}
                >
                  <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
                  Edit
                </Dropdown.Item>
              )}
              {true && (
                <>
                  <Dropdown.Item
                    onClick={() => {
                      Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#084892',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Delete it',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire({
                            title: 'Default SSO Integration',
                            icon: 'info',
                            text: 'Deleting Default SSO Integration...',
                            allowOutsideClick: false,
                            onBeforeOpen: () => {
                              Swal.showLoading();
                            },
                            button: false,
                          });
                          const response = adminService.deleteDefaultSso(activeOrganization?.id, row?.id);
                          response
                            .then((res) => {
                              Swal.fire({
                                icon: 'success',
                                text: res?.message.message,
                                confirmButtonText: 'Close',
                                customClass: {
                                  confirmButton: 'confirmation-close-btn',
                                },
                              });
                              dispatch(getDefaultSso(activeOrganization?.id, activePage || 1));
                            })
                            .catch((err) => console.log(err));
                        }
                      });
                    }}
                  >
                    <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
                    Delete
                  </Dropdown.Item>
                </>
              )}
            </>
          )}

          {type === 'LMS' && subType === 'LTI Tools' && (
            <>
              {permission?.Organization.includes('organization:edit-all-setting') && (
                <Dropdown.Item
                  onClick={() => {
                    dispatch({
                      type: 'SET_ACTIVE_EDIT',
                      payload: row,
                    });
                    dispatch(setActiveAdminForm('edit_lti_tool'));
                  }}
                >
                  <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
                  Edit
                </Dropdown.Item>
              )}
              {/* {permission?.Organization.includes('organization:edit-all-setting') && (
                <Dropdown.Item
                  to="#"
                  onClick={() => {
                    dispatch({
                      type: 'SET_ACTIVE_EDIT',
                      payload: row,
                    });
                    dispatch(setActiveAdminForm('clone_lti_tool'));
                    // dispatch(cloneLtiTool(activeOrganization?.id, row.id, auth?.user?.id));
                  }}
                >
                  <CloneSmSvg primaryColor={primaryColor} className="menue-img" />
                  Clone
                </Dropdown.Item>
              )} */}
              {permission?.Organization.includes('organization:delete-all-setting') && (
                <Dropdown.Item
                  onClick={() => {
                    Swal.fire({
                      title: 'Are you sure?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#084892',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Delete it',
                    }).then((result) => {
                      if (result.isConfirmed) {
                        Swal.fire({
                          title: 'LTI Tool',
                          icon: 'info',
                          text: 'Deleting LTI Tool...',
                          allowOutsideClick: false,
                          onBeforeOpen: () => {
                            Swal.showLoading();
                          },
                          button: false,
                        });
                        const response = adminService.deleteLtiTool(activeOrganization?.id, row?.id);
                        response
                          .then((res) => {
                            Swal.fire({
                              icon: 'success',
                              text: res?.message.message,
                              confirmButtonText: 'Close',
                              customClass: {
                                confirmButton: 'confirmation-close-btn',
                              },
                            });

                            const filterLMS = localStateData.filter((each) => each.id != row.id);

                            setLocalStateData(filterLMS);

                            dispatch({
                              type: actionTypes.LTI_TOOLS_PAGINATION_UPDATE,
                              payload: 'DECREMENT',
                              id: row.id,
                            });
                          })
                          .catch((err) => console.log(err));
                      }
                    });
                  }}
                >
                  <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
                  Delete
                </Dropdown.Item>
              )}
            </>
          )}
          {type === 'LMS' && subType === 'BrightCove' && permission?.Organization.includes('organization:edit-brightcove-setting') && (
            <>
              <Dropdown.Item
                onClick={() => {
                  dispatch({
                    type: 'SET_ACTIVE_EDIT',
                    payload: row,
                  });
                  dispatch(setActiveAdminForm('edit_bright_form'));
                }}
              >
                <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
                Edit
              </Dropdown.Item>

              <Dropdown.Item
                to="#"
                onClick={() => {
                  dispatch({
                    type: 'SET_ACTIVE_EDIT',
                    payload: row,
                  });
                  dispatch(setActiveAdminForm('clone_brightcove'));
                }}
              >
                <CloneSmSvg primaryColor={primaryColor} className="menue-img" />
                Clone
              </Dropdown.Item>

              <Dropdown.Item
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#084892',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Delete it',
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      Swal.fire({
                        title: 'BrightCove Setting',
                        icon: 'info',
                        text: 'Deleting BrightCove Setting...',
                        allowOutsideClick: false,
                        onBeforeOpen: () => {
                          Swal.showLoading();
                        },
                        button: false,
                      });
                      const result = await dispatch(deleteBrightCove(activeOrganization?.id, row?.id));
                      if (result.message) {
                        Swal.fire({
                          icon: 'success',
                          text: result.message?.message,
                          confirmButtonText: 'Close',
                          customClass: {
                            confirmButton: 'confirmation-close-btn',
                          },
                        });
                      }
                    }
                  });
                }}
              >
                <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
                Delete
              </Dropdown.Item>
            </>
          )}
          {type === 'Teams' && (
            <>
              <Dropdown.Item
                onClick={() => {
                  setModalShowTeam(true);
                  dispatch({
                    type: actionTypes.UPDATE_SELECTED_TEAM,
                    payload: row,
                  });
                  dispatch(getTeamPermission(activeOrganization?.id, row?.id));
                }}
              >
                <EditDpDnMdSvg primaryColor={primaryColor} className="menue-img" />
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure?',
                    icon: 'warning',
                    html: '<p>All Projects and associated data will be deleted. You won&apos;t be able to undo this.</p>',
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Delete it',
                    denyButtonText: 'No',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(deleteTeamAction(row?.id));
                    }
                  });
                }}
              >
                <DeleteSmSvg primaryColor={primaryColor} className="menue-img" />
                Delete
              </Dropdown.Item>
            </>
          )}
          {/* <Dropdown.Item>
          <img src={Edit} alt="Preview" className="menue-img" />
          Edit
        </Dropdown.Item>
        {(teamPermission && Object.keys(teamPermission).length
          ? teamPermission?.Team?.includes("team:remove-project")
          : permission?.Project?.includes("project:delete")) && (
          <Dropdown.Item
            to="#"
            onClick={() => showDeletePopup(project.id, project.name, "Project")}
          >
            <img src={Delete} alt="Preview" className="menue-img" />
            Delete
          </Dropdown.Item>
        )} */}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

AdminDropdown.propTypes = {
  project: PropTypes.object.isRequired,
  showDeletePopup: PropTypes.func.isRequired,
  // handleShow: PropTypes.func.isRequired,
  // setProjectId: PropTypes.func.isRequired,
  teamPermission: PropTypes.object.isRequired,
  // iconColor: PropTypes.string.isRequired,
  // text: propTypes.string,
};

// AdminDropdown.defaultProps = {
//   text: propTypes.string,
// };

export default AdminDropdown;
