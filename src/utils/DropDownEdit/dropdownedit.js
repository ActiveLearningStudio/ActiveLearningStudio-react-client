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
import { getProjectId, googleShare, shareToCanvas, msTeamShare } from 'store/actions/gapi';
import ShareLinkSmSvg from 'iconLibrary/dropDown/ShareLinkSmSvg';
import RightAngleSmSvg from 'iconLibrary/dropDown/RightAngleSmSvg';
import DuplicateSmSvg from 'iconLibrary/dropDown/DuplicateSmSvg';
import LibraryStatusSmSvg from 'iconLibrary/dropDown/LibraryStatusSmSvg';
import ExportSmSvg from 'iconLibrary/dropDown/ExportSmSvg';
import DeleteSmSvg from 'iconLibrary/dropDown/DeleteSmSvg';

const DropDownEdit = ({
  iconColor,
  data,
  activities,
  isActivityCard = false,
  setModalShow,
  setCurrentActivity,
  setOpenVideo,
  setScreenStatus,
  permission,
  handleShow,
  setSelectedActivityId,
}) => {
  const IconColor = iconColor ? iconColor : '#084892';
  const { activeOrganization } = useSelector((state) => state.organization);
  const project = useSelector((state) => state.project);
  const [visibilityTypeArray, setVisibilityTypeArray] = useState([]);
  const dispatch = useDispatch();
  // console.log("activities", data);
  const primaryColor = getGlobalColor('--main-primary-color');
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
              {/* <Dropdown.Item
                className
                onClick={() => {
                  setCurrentActivity(data.id);
                  setModalShow(true);
                }}
              >
                <FontAwesomeIcon icon={faEye} className="mr-2" />
                Preview
              </Dropdown.Item> */}
              {/* {permission?.["Independent Activity"]?.includes(
                "independent-activity:edit-author"
              ) && (
                <Dropdown.Item
                  className
                  onClick={async () => {
                    toast.dismiss();
                    toast.info("Loading Activity ...", {
                      className: "project-loading",
                      closeOnClick: false,
                      closeButton: false,
                      position: toast.POSITION.BOTTOM_RIGHT,
                      autoClose: 10000,
                      icon: "",
                    });
                    if (activities) {
                      const result = await intActivityServices.intActivityDetail(
                        activeOrganization.id,
                        data.id
                      );
                      if (result?.["independent-activity"]) {
                        toast.dismiss();
                        dispatch({
                          type: "SET_ACTIVE_VIDEO_SCREEN",
                          payload: result["independent-activity"],
                        });
                        setOpenVideo(true);
                        setScreenStatus("DescribeVideo");
                      }
                    } else {
                      const result = await videoServices.videoh5pDetail(
                        activeOrganization.id,
                        data.id
                      );
                      if (result.activity?.brightcoveData) {
                        dispatch({
                          type: "EDIT_CMS_SCREEN",
                          payload: result.activity?.brightcoveData.accountId,
                        });
                        window.brightcoveAccountId =
                          result.activity?.brightcoveData.accountId;
                      }

                      toast.dismiss();
                      dispatch({
                        type: "ADD_VIDEO_URL",
                        platform: "",
                      });
                      dispatch({
                        type: "SET_ACTIVE_VIDEO_SCREEN",
                        payload: result.activity,
                      });

                      setOpenVideo(true);
                      setScreenStatus("AddVideo");
                    }
                  }}
                >
                  <FontAwesomeIcon icon={faEdit} className="mr-2" />
                  Edit
                </Dropdown.Item>
              )} */}
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
                  <ShareLinkSmSvg primaryColor={primaryColor} className="mr-2" />
                  Sharing
                </a>
                <div className="faAngleRight-dropdown">
                  <RightAngleSmSvg primaryColor={primaryColor} />
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

              {/* Duplicate For Activity */}
              {permission?.['Independent Activity']?.includes('independent-activity:edit-author') && (
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
                    <DuplicateSmSvg primaryColor={primaryColor} className="mr-2" />
                    Duplicate
                  </Dropdown.Item>
                </>
              )}

              <li className="dropdown-submenu send">
                <a
                  tabIndex="-1"
                  style={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  <LibraryStatusSmSvg primaryColor={primaryColor} className="mr-2" />
                  Library preference
                </a>
                <div className="faAngleRight-dropdown">
                  <RightAngleSmSvg primaryColor={primaryColor} />
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
                          }),
                        );
                      }}
                    >
                      <a>{element.id === 4 ? 'Public' : element.display_name}</a>
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
                  <ExportSmSvg primaryColor={primaryColor} className="mr-2" />
                  Export
                </a>
                <div className="faAngleRight-dropdown">
                  <RightAngleSmSvg primaryColor={primaryColor} />
                </div>

                <ul className="dropdown-menu check">
                  <li>
                    <a
                      target="_blank"
                      onClick={() => {
                        dispatch(shareEnableLink(data.id));
                      }}
                      href={`${window.__RUNTIME_CONFIG__.REACT_APP_API_URL}/${config.apiVersion}/go/independent_activity/getxapifile/${data.id}`}
                    >
                      xAPI Format
                    </a>
                  </li>
                  {/* <li
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
                    <a>H5P Format</a>
                  </li> */}
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
          {/* {isActivityCard ? (
            permission?.["Independent Activity"]?.includes(
              "independent-activity:edit-author"
            ) && (
              <>
                <Dropdown.Item
                  onClick={async () => {
                    toast.info("Duplicating Activity...", {
                      className: "project-loading",
                      closeOnClick: false,
                      closeButton: false,
                      position: toast.POSITION.BOTTOM_RIGHT,
                      autoClose: 10000,
                      icon: "",
                    });
                    const result = await intActivityServices.indActivityClone(
                      activeOrganization.id,
                      data.id
                    );
                    toast.dismiss();
                    Swal.fire({
                      html: result.message,
                      icon: "success",
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
                  toast.info("Duplicating project...", {
                    className: "project-loading",
                    closeOnClick: false,
                    closeButton: false,
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 10000,
                    icon: "",
                  });
                  const result = await dispatch(cloneh5pvideo(data.id));
                  toast.dismiss();
                  Swal.fire({
                    html: result.message,
                    icon: "success",
                  });
                }}
              >
                <FontAwesomeIcon icon={faCopy} className="mr-2" />
                Duplicate
              </Dropdown.Item>
            </>
          )} */}

          {!isActivityCard && (
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
              <DuplicateSmSvg primaryColor={primaryColor} className="mr-2" />
              Duplicate
            </Dropdown.Item>
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
                <DeleteSmSvg primaryColor={primaryColor} className="mr-2" />
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
              <DeleteSmSvg primaryColor={primaryColor} className="mr-2" />
              Delete
            </Dropdown.Item>
          )}

          {isActivityCard && permission?.['Independent Activity']?.includes('independent-activity:edit-author') && (
            <li className="dropdown-submenu send">
              <a tabIndex="-1" className="dropdown-item">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="menue-img">
                  <path
                    d="M10.583 4.52941C11.5495 4.52941 12.333 3.73933 12.333 2.76471C12.333 1.79009 11.5495 1 10.583 1C9.61651 1 8.83301 1.79009 8.83301 2.76471C8.83301 3.73933 9.61651 4.52941 10.583 4.52941Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3.41602 8.5631C4.38251 8.5631 5.16602 7.77302 5.16602 6.7984C5.16602 5.82378 4.38251 5.03369 3.41602 5.03369C2.44952 5.03369 1.66602 5.82378 1.66602 6.7984C1.66602 7.77302 2.44952 8.5631 3.41602 8.5631Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M10.583 13.0001C11.5495 13.0001 12.333 12.21 12.333 11.2354C12.333 10.2608 11.5495 9.4707 10.583 9.4707C9.61651 9.4707 8.83301 10.2608 8.83301 11.2354C8.83301 12.21 9.61651 13.0001 10.583 13.0001Z"
                    stroke={primaryColor}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path d="M5.27148 7.96411L9.06593 10.3722" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M9.06037 3.72876L5.27148 6.13683" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                &nbsp; Publish
              </a>
              <ul className="dropdown-menu check">
                {activeOrganization?.gcr_activity_visibility && (
                  <li
                    onClick={() => {
                      handleShow();
                      setSelectedActivityId(data.id);
                      dispatch(googleShare(false));
                    }}
                  >
                    <a>Google Classroom</a>
                  </li>
                )}
                {activeOrganization?.msteam_activity_visibility && (
                  <li
                    onClick={() => {
                      handleShow();
                      setSelectedActivityId(data.id);
                      dispatch(msTeamShare(true));
                      dispatch(googleShare(true));
                      dispatch(shareToCanvas(false));
                    }}
                  >
                    <a>Microsoft Teams</a>
                  </li>
                )}
              </ul>
            </li>
          )}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default DropDownEdit;
