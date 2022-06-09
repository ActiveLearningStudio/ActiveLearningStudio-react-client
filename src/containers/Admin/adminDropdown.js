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

import Delete from '../../assets/images/menu-dele.svg';
import Clone from '../../assets/images/menu-dupli.svg';
import Edit from '../../assets/images/menu-edit.svg';
import Export from '../../assets/images/export-img.svg';
import MenuLogo from '../../assets/images/menu-logo.svg';
import Remove from '../../assets/images/close.svg';
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
} from 'store/actions/admin';
import { deleteBrightCove } from 'store/actions/videos';

import { deleteOrganization, getOrganization, clearOrganizationState, getRoles } from 'store/actions/organization';
import { deleteActivityItem, deleteActivityType, loadResourceTypesAction, selectActivityItem, selectActivityType, loadResourceItemAction } from 'store/actions/resource';
import * as actionTypes from 'store/actionTypes';

import SharePreviewPopup from 'components/SharePreviewPopup';
import { deleteTeamAction, getTeamPermission } from 'store/actions/team';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import { deleteIndActivity } from 'store/actions/indActivities';

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
          <svg width="6" height="20" viewBox="0 0 6 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.00001 11.125C3.62133 11.125 4.12501 10.6213 4.12501 10C4.12501 9.37868 3.62133 8.875 3.00001 8.875C2.37868 8.875 1.875 9.37868 1.875 10C1.875 10.6213 2.37868 11.125 3.00001 11.125Z"
              stroke={primaryColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.00001 3.25001C3.62133 3.25001 4.12501 2.74633 4.12501 2.12501C4.12501 1.50368 3.62133 1 3.00001 1C2.37868 1 1.875 1.50368 1.875 2.12501C1.875 2.74633 2.37868 3.25001 3.00001 3.25001Z"
              stroke={primaryColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.00001 19C3.62133 19 4.12501 18.4963 4.12501 17.875C4.12501 17.2537 3.62133 16.75 3.00001 16.75C2.37868 16.75 1.875 17.2537 1.875 17.875C1.875 18.4963 2.37868 19 3.00001 19Z"
              stroke={primaryColor}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
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
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path
                      d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                    {/* <img src={Export} alt="Preview" className="menue-img" /> */}
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                      <path
                        d="M9.00037 1.17188H11.667C12.0207 1.17188 12.3598 1.31235 12.6098 1.5624C12.8599 1.81245 13.0004 2.15159 13.0004 2.50521V11.8385C13.0004 12.1922 12.8599 12.5313 12.6098 12.7814C12.3598 13.0314 12.0207 13.1719 11.667 13.1719H9.00037"
                        stroke={primaryColor}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M5.66687 10.5065L9.0002 7.17318L5.66687 3.83984" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M8.99963 7.17188H0.999634" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
                    {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                      <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                        stroke={primaryColor}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path
                      d="M9.00037 1.17188H11.667C12.0207 1.17188 12.3598 1.31235 12.6098 1.5624C12.8599 1.81245 13.0004 2.15159 13.0004 2.50521V11.8385C13.0004 12.1922 12.8599 12.5313 12.6098 12.7814C12.3598 13.0314 12.0207 13.1719 11.667 13.1719H9.00037"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M5.66687 10.5065L9.0002 7.17318L5.66687 3.83984" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.99963 7.17188H0.999634" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                  {/* <img src={Export} alt="Preview" className="menue-img" /> */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path
                      d="M9.00037 1.17188H11.667C12.0207 1.17188 12.3598 1.31235 12.6098 1.5624C12.8599 1.81245 13.0004 2.15159 13.0004 2.50521V11.8385C13.0004 12.1922 12.8599 12.5313 12.6098 12.7814C12.3598 13.0314 12.0207 13.1719 11.667 13.1719H9.00037"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M5.66687 10.5065L9.0002 7.17318L5.66687 3.83984" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.99963 7.17188H0.999634" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path
                      d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                  {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                <svg className="menue-img" width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M1.125 6.17188C1.125 6.17188 3.625 1.17188 8 1.17188C12.375 1.17188 14.875 6.17188 14.875 6.17188C14.875 6.17188 12.375 11.1719 8 11.1719C3.625 11.1719 1.125 6.17188 1.125 6.17188Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 8.04688C9.03553 8.04688 9.875 7.20741 9.875 6.17188C9.875 5.13634 9.03553 4.29688 8 4.29688C6.96447 4.29688 6.125 5.13634 6.125 6.17188C6.125 7.20741 6.96447 8.04688 8 8.04688Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                  {/* <img src={Export} alt="Preview" className="menue-img" /> */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path
                      d="M9.00037 1.17188H11.667C12.0207 1.17188 12.3598 1.31235 12.6098 1.5624C12.8599 1.81245 13.0004 2.15159 13.0004 2.50521V11.8385C13.0004 12.1922 12.8599 12.5313 12.6098 12.7814C12.3598 13.0314 12.0207 13.1719 11.667 13.1719H9.00037"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M5.66687 10.5065L9.0002 7.17318L5.66687 3.83984" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.99963 7.17188H0.999634" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                  <svg className="menue-img" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M6.69336 8.82625C6.97409 9.20193 7.33225 9.51278 7.74355 9.73772C8.15484 9.96266 8.60966 10.0964 9.07714 10.1299C9.54462 10.1634 10.0138 10.0959 10.453 9.93196C10.8921 9.76799 11.2908 9.5114 11.6222 9.1796L13.5833 7.21655C14.1786 6.59949 14.5081 5.77304 14.5006 4.9152C14.4932 4.05735 14.1494 3.23676 13.5434 2.63015C12.9374 2.02354 12.1177 1.67945 11.2607 1.672C10.4037 1.66454 9.5781 1.99432 8.96167 2.59029L7.83732 3.70923"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.3074 7.51907C9.02667 7.14339 8.66851 6.83254 8.25721 6.6076C7.84591 6.38267 7.3911 6.2489 6.92361 6.21539C6.45613 6.18188 5.98692 6.24939 5.54779 6.41337C5.10867 6.57734 4.70991 6.83392 4.37857 7.16572L2.41749 9.12878C1.82212 9.74583 1.49268 10.5723 1.50012 11.4301C1.50757 12.288 1.85131 13.1086 2.45731 13.7152C3.06331 14.3218 3.88308 14.6659 4.74005 14.6733C5.59703 14.6808 6.42265 14.351 7.03909 13.755L8.1569 12.6361"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                  {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path
                      d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                  {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path
                      d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                  {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Delete
                </Dropdown.Item>
              )}
            </>
          )}

          {type === 'Activities' && subType === 'Subjects' && (
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
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                  <path
                    d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                  <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Delete
              </Dropdown.Item>
            </>
          )}

          {type === 'Activities' && subType === 'Education Level' && (
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
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                  <path
                    d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                  <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Delete
              </Dropdown.Item>
            </>
          )}

          {type === 'Activities' && subType === 'Author Tags' && (
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
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                  <path
                    d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                <img src={Delete} alt="Preview" className="menue-img" />
                Delete
              </Dropdown.Item>
            </>
          )}

          {type === 'Activities' && subType === 'Activity Layouts' && (
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
                <img src={Edit} alt="Preview" className="menue-img" />
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
                {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                  <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
                  {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path
                      d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Edit
                </Dropdown.Item>
              )}
              {permission?.Organization.includes('organization:remove-user') && auth?.user?.id !== user.id && (
                <Dropdown.Item onClick={() => dispatch(showRemoveUser(user))}>
                  {/* <img src={Remove} alt="Preview" className="menue-img" /> */}
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path d="M19 5L5 19" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M5 5L19 19" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                  {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path
                      d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                  {/* <img src={Clone} alt="Preview" className="menue-img" /> */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path
                      d="M11.6667 1H2.33333C1.59695 1 1 1.59695 1 2.33333V11.6667C1 12.403 1.59695 13 2.33333 13H11.6667C12.403 13 13 12.403 13 11.6667V2.33333C13 1.59695 12.403 1 11.6667 1Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M7 4.33325V9.66659" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.33301 7H9.66634" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                  {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                  {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path
                      d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
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
                    {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                      <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path
                        d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                        stroke={primaryColor}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
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
                  {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path
                      d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Edit
                </Dropdown.Item>
              )}
              {permission?.Organization.includes('organization:edit-all-setting') && (
                <Dropdown.Item
                  to="#"
                  onClick={() => {
                    dispatch({
                      type: 'SET_ACTIVE_EDIT',
                      payload: row,
                    });
                    dispatch(setActiveAdminForm('clone_lti_tool'));
                  }}
                >
                  {/* <img src={Clone} alt="Preview" className="menue-img" /> */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path
                      d="M11.6667 1H2.33333C1.59695 1 1 1.59695 1 2.33333V11.6667C1 12.403 1.59695 13 2.33333 13H11.6667C12.403 13 13 12.403 13 11.6667V2.33333C13 1.59695 12.403 1 11.6667 1Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M7 4.33325V9.66659" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4.33301 7H9.66634" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Clone
                </Dropdown.Item>
              )}
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
                          })
                          .catch((err) => console.log(err));
                      }
                    });
                  }}
                >
                  {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                    <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path
                      d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                      stroke={primaryColor}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
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
                {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                  <path
                    d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                  <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
                {/* <img src={Edit} alt="Preview" className="menue-img" /> */}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                  <path
                    d="M6.36745 2.26514H2.19277C1.87642 2.26514 1.57304 2.3908 1.34935 2.61449C1.12567 2.83818 1 3.14156 1 3.4579V11.8073C1 12.1236 1.12567 12.427 1.34935 12.6507C1.57304 12.8744 1.87642 13 2.19277 13H10.5421C10.8585 13 11.1619 12.8744 11.3855 12.6507C11.6092 12.427 11.7349 12.1236 11.7349 11.8073V7.63258"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.8392 1.37054C11.0764 1.13329 11.3982 1 11.7337 1C12.0693 1 12.3911 1.13329 12.6283 1.37054C12.8656 1.6078 12.9989 1.92959 12.9989 2.26512C12.9989 2.60065 12.8656 2.92244 12.6283 3.15969L6.96268 8.82533L4.57715 9.42172L5.17353 7.03618L10.8392 1.37054Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
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
                {/* <img src={Delete} alt="Preview" className="menue-img" /> */}
                <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                  <path d="M0.75 3.39966H1.91667H11.25" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path
                    d="M3.66699 3.4V2.2C3.66699 1.88174 3.78991 1.57652 4.0087 1.35147C4.22749 1.12643 4.52424 1 4.83366 1H7.16699C7.47641 1 7.77316 1.12643 7.99195 1.35147C8.21074 1.57652 8.33366 1.88174 8.33366 2.2V3.4M10.0837 3.4V11.8C10.0837 12.1183 9.96074 12.4235 9.74195 12.6485C9.52316 12.8736 9.22641 13 8.91699 13H3.08366C2.77424 13 2.47749 12.8736 2.2587 12.6485C2.03991 12.4235 1.91699 12.1183 1.91699 11.8V3.4H10.0837Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M4.83301 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7.16699 6.39966V9.99966" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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
