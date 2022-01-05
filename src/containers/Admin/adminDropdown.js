/*eslint-disable*/

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import adminService from 'services/admin.service';
import projectService from 'services/project.service';

import './style.scss';

import Delete from '../../assets/images/menu-dele.svg';
import Clone from '../../assets/images/menu-dupli.svg';
import Edit from '../../assets/images/menu-edit.svg';
import Export from '../../assets/images/export-img.svg';
import MenuLogo from '../../assets/images/menu-logo.svg';
import Remove from '../../assets/images/close.svg';
import { getDefaultSso, getLmsProject, getLtiTools, setActiveAdminForm, setCurrentUser, showRemoveUser } from 'store/actions/admin';

import { deleteOrganization, getOrganization, clearOrganizationState, getRoles } from 'store/actions/organization';
import { deleteActivityItem, deleteActivityType, loadResourceTypesAction, selectActivityItem, selectActivityType, loadResourceItemAction } from 'store/actions/resource';
import * as actionTypes from 'store/actionTypes';

import SharePreviewPopup from 'components/SharePreviewPopup';

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
    setActivePageNumber,
    // text,
    // iconColor,
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
  return (
    <>
      <Dropdown className="project-dropdown check d-flex  align-items-center text-added-project-dropdown">
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
          <img src={MenuLogo} alt="menu" />
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
                  <img src={Edit} alt="Preview" className="menue-img" />
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
                    <img src={Export} alt="Preview" className="menue-img" />
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
                        confirmButtonText: 'Yes, delete it!',
                      }).then(async (result) => {
                        if (result.isConfirmed) {
                          Swal.showLoading();
                          const resultDel = await dispatch(deleteOrganization(row));
                          if (resultDel) {
                            Swal.fire({
                              text: 'You have successfully deleted the organization',
                              icon: 'success',
                              showCancelButton: false,
                              confirmButtonColor: '#084892',
                              cancelButtonColor: '#d33',
                              confirmButtonText: 'OK',
                            });
                          }
                        }
                      });
                    }}
                  >
                    <img src={Delete} alt="Preview" className="menue-img" />
                    Delete
                  </Dropdown.Item>
                </>
              )}
              {/* {(teamPermission && Object.keys(teamPermission).length
              ? teamPermission?.Team?.includes("team:remove-project")
              : permission?.Project?.includes("project:delete")) && (
              <Dropdown.Item
                to="#"
                onClick={() =>
                  showDeletePopup(project.id, project.name, "Project")
                }
              >
                <img src={Delete} alt="Preview" className="menue-img" />
                Delete
              </Dropdown.Item>
            )} */}
            </>
          )}
          {type === 'Projects' && (
            <>
              {' '}
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
                <img src={Export} alt="Preview" className="menue-img" />
                Export
              </Dropdown.Item>
              {row.shared ? (
                <Dropdown.Item
                  onClick={() => {
                    const protocol = `${window.location.href.split('/')[0]}//`;
                    const url = `${protocol + window.location.host}/project/${row.id}/shared`;
                    SharePreviewPopup(url, row.name);
                    // confirmAlert({
                    //   customUI: ({ onClose }) => (
                    //     <div className="share-project-preview-url project-share-check">
                    //       <br />
                    //       <h3>
                    //         You can now share project <strong>{row.title}</strong>
                    //         <br />
                    //         Anyone with the link below can access your project:
                    //       </h3>

                    //       <a target="_blank" href={`/${row.id}/shared`} rel="noopener noreferrer">
                    //         <input id="urllink_clip" value={`${protocol + window.location.host}/${row.id}/shared`} />
                    //       </a>

                    //       <span
                    //         title="copy to clipboard"
                    //         aria-hidden="true"
                    //         onClick={() => {
                    //           /* Get the text field */
                    //           const copyText = document.getElementById('urllink_clip');

                    //           /* Select the text field */
                    //           copyText.focus();
                    //           copyText.select();

                    //           document.execCommand('copy');

                    //           /* Alert the copied text */
                    //           Swal.fire({
                    //             title: 'Link Copied',
                    //             showCancelButton: false,
                    //             showConfirmButton: false,
                    //             timer: 1500,
                    //             allowOutsideClick: false,
                    //           });
                    //         }}
                    //       >
                    //         <FontAwesomeIcon icon="clipboard" />
                    //       </span>
                    //       <br />

                    //       <div className="close-btn flex-center">
                    //         <button className="curriki-btn-extra" type="button" onClick={onClose}>
                    //           Ok
                    //         </button>
                    //       </div>
                    //     </div>
                    //   ),
                    // });
                  }}
                >
                  <img src={Export} alt="Preview" className="menue-img" />
                  Get shared link
                </Dropdown.Item>
              ) : null}
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
                <img src={Edit} alt="Preview" className="menue-img" />
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                to="#"
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure you want to delete this Project?',
                    text: 'This action is Irreversible',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#084892',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
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
                <img src={Delete} alt="Preview" className="menue-img" />
                Delete
              </Dropdown.Item>
            </>
          )}
          {type === 'Activities' && (
            <>
              {' '}
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
                <img src={Edit} alt="Preview" className="menue-img" />
                Edit
              </Dropdown.Item>
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
                    confirmButtonText: 'Yes, delete it!',
                  }).then(async (result) => {
                    if (result.isConfirmed) {
                      Swal.showLoading();
                      var resultDel;
                      if (subType === 'Activity Items') {
                        resultDel = await dispatch(deleteActivityItem(type1.id));
                        dispatch(loadResourceItemAction(type1.id));
                      } else {
                        resultDel = await dispatch(deleteActivityType(type1.id));

                        if (resultDel) {
                          Swal.fire({
                            text: 'You have successfully deleted the activity type',
                            icon: 'success',
                            showCancelButton: false,
                            confirmButtonColor: '#084892',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'OK',
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
                <img src={Delete} alt="Preview" className="menue-img" />
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
                  <img src={Edit} alt="Preview" className="menue-img" />
                  Edit
                </Dropdown.Item>
              )}
              {permission?.Organization.includes('organization:remove-user') && auth?.user?.id !== user.id && (
                <Dropdown.Item onClick={() => dispatch(showRemoveUser(user))}>
                  <img src={Remove} alt="Preview" className="menue-img" />
                  Remove
                </Dropdown.Item>
              )}
            </>
          )}
          {type === 'LMS' && subType === 'All settings' && (
            <>
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
                <img src={Edit} alt="Preview" className="menue-img" />
                &nbsp;&nbsp;Edit&nbsp;&nbsp;
              </Dropdown.Item>
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
                <img src={Clone} alt="Preview" className="menue-img" />
                &nbsp;&nbsp;Clone&nbsp;&nbsp;
              </Dropdown.Item>
              <Dropdown.Item
                to="#"
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure you want to delete this User LMS settings?',
                    text: 'This action is Irreversible',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#084892',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
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
                          });
                          dispatch(getLmsProject(activeOrganization?.id, activePage || 1));
                          const filterLMS = localStateData.filter((each) => each.id != row.id);
                          console.log(filterLMS);
                          setLocalStateData(filterLMS);
                        })
                        .catch((err) => console.log(err));
                    }
                  });
                }}
              >
                <img src={Delete} alt="Preview" className="menue-img" />
                &nbsp;&nbsp;Delete&nbsp;&nbsp;
              </Dropdown.Item>
            </>
          )}

          {type === 'DefaultSso' && (
            <>
              {permission?.Organization.includes('organization:update-default-sso') && (
                <Dropdown.Item
                  onClick={() => {
                    dispatch({
                      type: 'SET_ACTIVE_EDIT',
                      payload: row,
                    });
                    dispatch(setActiveAdminForm('edit_default_sso'));
                  }}
                >
                  <img src={Edit} alt="Preview" className="menue-img" />
                  Edit
                </Dropdown.Item>
              )}
              {permission?.Organization.includes('organization:delete-default-sso') && (
                <>
                  <Dropdown.Item
                    onClick={() => {
                      Swal.fire({
                        title: 'Are you sure you want to delete this SSO Integration?',
                        text: 'This action is Irreversible',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#084892',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!',
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
                                text: res?.message,
                              });
                              dispatch(getDefaultSso(activeOrganization?.id, activePage || 1));
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
            </>
          )}

          {type === 'LMS' && subType === 'LTI Tools' && (
            <>
              <Dropdown.Item
                onClick={() => {
                  dispatch({
                    type: 'SET_ACTIVE_EDIT',
                    payload: row,
                  });
                  dispatch(setActiveAdminForm('edit_lti_tool'));
                }}
              >
                <img src={Edit} alt="Preview" className="menue-img" />
                Edit
              </Dropdown.Item>
              <Dropdown.Item
                to="#"
                onClick={() => {
                  Swal.showLoading();
                  adminService.cloneLtiTool(activeOrganization?.id, row?.id);
                }}
              >
                <img src={Clone} alt="Preview" className="menue-img" />
                Clone
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => {
                  Swal.fire({
                    title: 'Are you sure you want to delete this LTI Tool?',
                    text: 'This action is Irreversible',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#084892',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!',
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
                          });
                          dispatch(getLtiTools(activeOrganization?.id, activePage || 1));
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
