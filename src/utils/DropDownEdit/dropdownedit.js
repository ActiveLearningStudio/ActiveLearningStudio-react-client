/*eslint-disable*/
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { faEllipsisV, faCopy, faTrash, faEdit, faEye, faLink, faBook, faLockOpen, faLock, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { deleteVideo, cloneh5pvideo } from 'store/actions/videos';
import { deleteIndActivity, editIndActivityItem, shareDisableLink, shareEnableLink } from 'store/actions/indActivities';
import intActivityServices from 'services/indActivities.service';
import './dropdownedit.scss';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import SharePreviewPopup from 'components/SharePreviewPopup';
import indActivityService from 'services/indActivities.service';
import { visibilityTypes } from 'store/actions/project';
import ActivityCard from 'components/ActivityCard';

const DropDownEdit = ({ iconColor, data, activities, isActivityCard = false, setModalShow, setCurrentActivity, setOpenVideo, setScreenStatus, permission }) => {
  const IconColor = iconColor ? iconColor : '#084892';
  const { activeOrganization } = useSelector((state) => state.organization);
  const project = useSelector((state) => state.project);
  const [visibilityTypeArray, setVisibilityTypeArray] = useState([]);
  const dispatch = useDispatch();
  // console.log("activities", data);
  const primaryColor = getGlobalColor('--main-primary-color');
  useEffect(() => {
    (async () => {
      if (project?.visibilityTypes.length === 0) {
        const { data } = await dispatch(visibilityTypes());
        setVisibilityTypeArray(data.data);
      } else {
        setVisibilityTypeArray(project?.visibilityTypes?.data);
      }
    })();
  }, [project?.visibilityTypes]);
  return (
    <div className="curriki-utility-activity-dropdown">
      <Dropdown className="activity-dropdown check ">
        <Dropdown.Toggle className="activity-dropdown-btn">
          <FontAwesomeIcon icon={faEllipsisV} style={{ fontSize: '13px', color: IconColor, marginLeft: '5px' }} />
          {/* <span>EditActivity</span> */}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {isActivityCard && (
            <>
              <Dropdown.Item
                className
                onClick={() => {
                  setCurrentActivity(data.id);
                  setModalShow(true);
                }}
              >
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                Preview
              </Dropdown.Item>
              {permission?.['Independent Activity']?.includes('independent-activity:edit-author') && (
                <Dropdown.Item
                  className
                  onClick={async () => {
                    toast.dismiss();
                    toast.info('Loading Activity ...', {
                      className: 'project-loading',
                      closeOnClick: false,
                      closeButton: false,
                      position: toast.POSITION.BOTTOM_RIGHT,
                      autoClose: 10000,
                      icon: '',
                    });
                    if (activities) {
                      const result = await intActivityServices.intActivityDetail(activeOrganization.id, data.id);
                      if (result?.['independent-activity']) {
                        toast.dismiss();
                        dispatch({
                          type: 'SET_ACTIVE_VIDEO_SCREEN',
                          payload: result['independent-activity'],
                        });
                        setOpenVideo(true);
                        setScreenStatus('DescribeVideo');
                      }
                    } else {
                      const result = await videoServices.videoh5pDetail(activeOrganization.id, data.id);
                      if (result.activity?.brightcoveData) {
                        dispatch({
                          type: 'EDIT_CMS_SCREEN',
                          payload: result.activity?.brightcoveData.accountId,
                        });
                        window.brightcoveAccountId = result.activity?.brightcoveData.accountId;
                      }

                      toast.dismiss();
                      dispatch({
                        type: 'ADD_VIDEO_URL',
                        platform: '',
                      });
                      dispatch({
                        type: 'SET_ACTIVE_VIDEO_SCREEN',
                        payload: result.activity,
                      });

                      setOpenVideo(true);
                      setScreenStatus('AddVideo');
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Edit
                </Dropdown.Item>
              )}
            </>
          )}
          {isActivityCard ? (
            permission?.['Independent Activity']?.includes('independent-activity:edit-author') && (
              <>
                <Dropdown.Item
                  onClick={async () => {
                    toast.info('Duplicating Activity...', {
                      className: 'project-loading',
                      closeOnClick: false,
                      closeButton: false,
                      position: toast.POSITION.BOTTOM_RIGHT,
                      autoClose: 10000,
                      icon: '',
                    });
                    const result = await intActivityServices.indActivityClone(activeOrganization.id, data.id);
                    toast.dismiss();
                    Swal.fire({
                      html: result.message,
                      icon: 'success',
                    });
                  }}
                >
                  <FontAwesomeIcon icon={faCopy} className="mr-2" />
                  Duplicate
                </Dropdown.Item>
              </>
            )
          ) : (
            <>
              <Dropdown.Item
                onClick={async () => {
                  toast.info('Duplicating project...', {
                    className: 'project-loading',
                    closeOnClick: false,
                    closeButton: false,
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 10000,
                    icon: '',
                  });
                  const result = await dispatch(cloneh5pvideo(data.id));
                  toast.dismiss();
                  Swal.fire({
                    html: result.message,
                    icon: 'success',
                  });
                }}
              >
                <FontAwesomeIcon icon={faCopy} className="mr-2" />
                Duplicate
              </Dropdown.Item>
            </>
          )}
          {/* For activity Card */}
          {isActivityCard && permission?.['Independent Activity']?.includes('independent-activity:edit-author') && (
            <>
              {/* <Dropdown.Item className onClick={() => {}}>
                <div className="dropdown-right-angle">
                  <div>
                    <FontAwesomeIcon icon={faLink} className="mr-2" />
                    Sharing
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
              </Dropdown.Item> */}
              {/*  */}
              <li className="dropdown-submenu send">
                <a tabIndex="-1">
                  <FontAwesomeIcon icon={faLink} className="mr-2" />
                  Sharing
                </a>
                <div className="faAngleRight-dropdown">
                  <FontAwesomeIcon icon={faAngleRight} color={primaryColor} />
                </div>

                <ul className="dropdown-menu check ">
                  {data.shared ? (
                    <>
                      <li
                        onClick={async () => {
                          //  if (activeShared) {
                          Swal.fire({
                            icon: 'warning',
                            title: `You are about to stop sharing <strong>"${data.title}"</strong>`,
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
                              dispatch(shareDisableLink(data.id));
                            }
                          });
                        }}
                        // }
                      >
                        <a>Disable</a>
                      </li>
                      <li
                        onClick={() => {
                          if (window.gapi && window.gapi.sharetoclassroom) {
                            window.gapi.sharetoclassroom.go('croom');
                          }
                          const protocol = `${window.location.href.split('/')[0]}//`;
                          const url = `${protocol}${window.location.host}/activity/${data.id}/shared?type=ind`;
                          return SharePreviewPopup(url, data.title);
                        }}
                      >
                        <a>Get shared link</a>
                      </li>
                    </>
                  ) : (
                    <li
                      onClick={() => {
                        dispatch(shareEnableLink(data.id));
                        // if (data.shared) {
                        //   if (window.gapi && window.gapi.sharetoclassroom) {
                        //     window.gapi.sharetoclassroom.go('croom');
                        //   }
                        //   const protocol = `${window.location.href.split('/')[0]}//`;
                        //   const url = `${protocol}${window.location.host}/project/${'Dummy'}/shared`;
                        //   return SharePreviewPopup(url, 'Dummy');
                        // }
                      }}
                    >
                      <a>Enable</a>
                    </li>
                  )}
                </ul>
              </li>

              <li className="dropdown-submenu send">
                <a
                  tabIndex="-1"
                  style={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  {/* <FontAwesomeIcon icon={faLink} className="mr-2" /> */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path
                      d="M1.33398 2H5.33398C6.04123 2 6.71951 2.28095 7.2196 2.78105C7.7197 3.28115 8.00065 3.95942 8.00065 4.66667V14C8.00065 13.4696 7.78994 12.9609 7.41486 12.5858C7.03979 12.2107 6.53108 12 6.00065 12H1.33398V2Z"
                      stroke="#084892"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M14.6667 2H10.6667C9.95942 2 9.28115 2.28095 8.78105 2.78105C8.28095 3.28115 8 3.95942 8 4.66667V14C8 13.4696 8.21071 12.9609 8.58579 12.5858C8.96086 12.2107 9.46957 12 10 12H14.6667V2Z"
                      stroke="#084892"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Library preference
                </a>
                <div className="faAngleRight-dropdown">
                  <FontAwesomeIcon icon={faAngleRight} color={primaryColor} />
                </div>

                <ul className="dropdown-menu check">
                  {visibilityTypeArray?.map((element) => (
                    <li
                      onClick={() => {
                        dispatch(
                          editIndActivityItem(data.id, {
                            ...data,
                            data: '',
                            organization_visibility_type_id: element.id,
                          })
                        );
                      }}
                    >
                      <a>{element.display_name}</a>
                    </li>
                  ))}
                  {/* <li>
                    <a>Private (Only me)</a>
                  </li>
                  <li>
                    <a>My organization </a>
                  </li>
                  <li>
                    <a>Public</a>
                  </li> */}
                </ul>
              </li>

              <li className="dropdown-submenu send">
                <a tabIndex="-1">
                  {/* <FontAwesomeIcon icon={faLink} className="mr-2" /> */}
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path
                      d="M5 13H2.33333C1.97971 13 1.64057 12.8595 1.39052 12.6095C1.14048 12.3594 1 12.0203 1 11.6667V2.33333C1 1.97971 1.14048 1.64057 1.39052 1.39052C1.64057 1.14048 1.97971 1 2.33333 1H5"
                      stroke="#084892"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M9.54492 10.4137L13.0018 6.95686L9.54492 3.5" stroke="#084892" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.0645 7H5.06445" stroke="#084892" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Export
                </a>
                <div className="faAngleRight-dropdown">
                  <FontAwesomeIcon icon={faAngleRight} color={primaryColor} />
                </div>

                <ul className="dropdown-menu check">
                  <li>
                    <a href={`${window.__RUNTIME_CONFIG__.REACT_APP_API_URL}/${config.apiVersion}/go/independent_activity/getxapifile/${data.id}`}>xAPI Download</a>
                  </li>
                  <li
                    onClick={() => {
                      Swal.fire({
                        title: 'Please Wait !',
                        html: 'Exporting Activity   ...',
                        allowOutsideClick: false,
                        onBeforeOpen: () => {
                          Swal.showLoading();
                        },
                      });
                      const result = indActivityService.exportIndAvtivity(activeOrganization.id, data.id);
                      result.then((data) => {
                        // console.log(data)
                        Swal.fire({
                          icon: 'success',
                          html: data?.message,
                        });
                      });
                    }}
                  >
                    <a>Independent Activity</a>
                  </li>
                </ul>
              </li>

              {/*  */}
              {/* <Dropdown.Item className onClick={() => {}}>
                <div className="dropdown-right-angle">
                  <div>
                    <FontAwesomeIcon icon={faBook} className="mr-2" />
                    Library preference
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
              </Dropdown.Item> */}
              {/* <Dropdown.Item className onClick={() => {}}>
                <div className="dropdown-right-angle">
                  <div>
                    <FontAwesomeIcon icon={faLock} className="mr-2" />
                    Export
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faAngleRight} />
                  </div>
                </div>
              </Dropdown.Item> */}
            </>
          )}
          {isActivityCard ? (
            permission?.['Independent Activity']?.includes('independent-activity:edit-author') && (
              <Dropdown.Item
                className
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure you want to delete this activity?',

                    showCancelButton: true,
                    confirmButtonText: 'Yes',
                    denyButtonText: 'No',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      dispatch(deleteIndActivity(data.id));
                    }
                  });
                }}
              >
                <FontAwesomeIcon icon={faTrash} className="mr-2" />
                Delete
              </Dropdown.Item>
            )
          ) : (
            <Dropdown.Item
              className
              onClick={() => {
                Swal.fire({
                  title: 'Are you sure you want to delete this activity?',

                  showCancelButton: true,
                  confirmButtonText: 'Yes',
                  denyButtonText: 'No',
                }).then((result) => {
                  if (result.isConfirmed) {
                    dispatch(deleteVideo(data.id));
                  }
                });
              }}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-2" />
              Delete
            </Dropdown.Item>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropDownEdit;
