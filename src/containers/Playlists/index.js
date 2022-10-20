/* eslint-disable max-len */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*eslint-disable*/
import React, { useEffect, useState, useMemo, useRef } from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { connect, useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import computer from 'assets/images/svg/desktop.svg';
import pexel from 'assets/images/svg/pixel.svg';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { Alert, Modal, Dropdown } from 'react-bootstrap';
import { uploadThumb } from 'containers/Projects/CreateProjectPopup';
import Headings from 'curriki-design-system/dist/utils/Headings/headings';
import SelectImage from 'utils/SelectImage';
import PexelsAPI from 'components/models/pexels';
import GoogleModel from 'components/models/GoogleLoginModal';
import {
  createPlaylistAction,
  deletePlaylistAction,
  showCreatePlaylistModalAction,
  hideCreatePlaylistModalAction,
  loadProjectPlaylistsAction,
  reorderPlaylistsAction,
} from 'store/actions/playlist';
import MyActivity from 'containers/MyActivity';
import { showDeletePopupAction, hideDeletePopupAction } from 'store/actions/ui';
import {
  deleteResourceAction,
  createResourceAction,
  showCreateResourceModalAction,
  hideCreateResourceModalAction,
  hidePreviewResourceModalAction,
  createResourceByH5PUploadAction,
  editResourceAction,
  showCreateResourceActivityAction,
  onChangeActivityTypeAction,
  onChangeActivityAction,
  uploadResourceThumbnailAction,
  showDescribeActivityAction,
  showBuildActivityAction,
} from 'store/actions/resource';
import { shareToCanvas, googleShare } from 'store/actions/gapi';
import {
  showCreateProjectModalAction,
  loadProjectAction,
  loadLmsAction,
  // toggleProjectShareAction,
  // toggleProjectShareRemovedAction,
  visibilityTypes,
  updateProjectAction,
  clearSelectedProject,
} from 'store/actions/project';
import { closeSafariMontageToolAction } from 'store/actions/LMS/genericLMS';
// import Footer from 'components/Footer';
import DeletePopup from 'components/DeletePopup';
import Projectsharing from 'components/ProjectSharing/index';
import AddResource from 'components/ResourceCard/AddResource';
import { getTeamPermission } from 'store/actions/team';
import { getUserLmsSettingsAction } from 'store/actions/account';
import EditResource from 'components/ResourceCard/EditResource';
import Correct from 'assets/images/svg/Correct.svg';
import './style.scss';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import PlaylistCard from './PlaylistCard';
import PreviewResourcePage from './PreviewResourcePage';
import CreatePlaylistPopup from './CreatePlaylistPopup';
import SearchInterface from 'containers/Search';
import SelectActivity from './SelectActivity';
import { faCheckSquare, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import MyDeviceSmSvg from 'iconLibrary/mainContainer/MyDeviceSmSvg';
import EditSmSvg from 'iconLibrary/mainContainer/EditSmSvg';
import ApprovedSmSvg from 'iconLibrary/mainContainer/ApprovedSmSvg';
import PlusSmSvg from 'iconLibrary/mainContainer/PlusSmSvg';

function PlaylistsPage(props) {
  const dispatch = useDispatch();
  const [selectSearchModule, setSelectSearchModule] = useState(false);
  const [reloadPlaylist, setReloadPlaylist] = useState(false);
  const [playlistIdForSearchingTab, setPlaylistIdForSearchingTab] = useState();
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState(false);
  const [error, setError] = useState(null);
  const projectState = useSelector((state) => state.project);
  const [indexStatus, setIndexStatus] = useState(null);
  const organization = useSelector((state) => state.organization);
  const [activeShared, setActiveShared] = useState(true);
  const team = useSelector((state) => state.team);
  const { teamPermission } = team;
  const openFile = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef();
  const { permission, activeOrganization } = organization;
  const state = useSelector((s) => s.project.selectedProject);
  const [showPlaylistModal, setShowPlaylistModal] = useState(false);
  const [editName, setEditName] = useState(false);
  const [editDescription, setEditDescription] = useState(false);
  const [visibility, setVisibility] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(0);
  const [selectedProjectPlaylistId, setSelectedProjectPlaylistId] = useState(0);
  const [selectedProjectPlaylistName, setselectedProjectPlaylistName] = useState('');
  const [selectedPlaylistActivityName, setselectedPlaylistActivityName] = useState('');
  const [selectedProjectPlaylistActivityId, setSelectedProjectPlaylistActivityId] = useState(0);
  const [uploadImageStatus, setUploadImageStatus] = useState(false);
  const [projectPlaylistPublishtoCanvas, setprojectPlaylistPublishtoCanvas] = useState(false);
  const { screenState } = useSelector((s) => s.myactivities);

  const {
    match,
    history,
    showCreatePlaylistModal,
    showCreateResourceModal,
    hideCreatePlaylistModal,
    hideCreateResourceModal,
    openCreateResourcePopup,
    openEditResourcePopup,
    loadProject,
    loadProjectPlaylists,
    createPlaylist,
    createResource,
    createResourceByH5PUpload,
    editResource,
    reorderPlaylists,
    loadLms,
    project: { selectedProject },
    resource,
    playlist: { playlists },
    ui,
    getTeamPermissions,
    closeSafariMontageTool,
    safariMontagePublishTool,
    row,
    showFooter,
    getLmsSettings,
  } = props;
  const changeScreenHandler = (payload) => {
    dispatch({
      type: 'SET_ACTIVE_ACTIVITY_SCREEN',
      payload,
    });
  };
  const projectIdFilter = Number(match?.params?.projectId || row?.id);
  const [thumbUrl, setThumbUrl] = useState(selectedProject.thumbUrl);
  useEffect(() => {
    if (Object.keys(teamPermission).length === 0 && selectedProject.team_id && organization?.currentOrganization?.id && selectedProject.id === projectIdFilter) {
      getTeamPermissions(organization?.currentOrganization?.id, selectedProject?.team_id);
    }
  }, [teamPermission, organization?.currentOrganization, selectedProject, projectIdFilter, getTeamPermissions]);
  useEffect(() => {
    setThumbUrl(projectState.thumbUrl);
  }, [projectState.thumbUrl]);
  useEffect(() => {
    setActiveShared(projectState.selectedProject.shared);
    if (projectState.selectedProject.organization_visibility_type_id === 2) {
      setVisibility('My organization');
    } else if (projectState.selectedProject.organization_visibility_type_id === 3) {
      setVisibility('My Org + Parent and Child Org');
    } else if (projectState.selectedProject.organization_visibility_type_id === 1) {
      setVisibility('Private (only Me)');
    } else {
      setVisibility('All');
    }
  }, [projectState.selectedProject]);

  useMemo(() => {
    (async () => {
      dispatch(visibilityTypes());
    })();
  }, []);

  useEffect(() => {
    getLmsSettings();
    return () => {
      dispatch(clearSelectedProject());
    };
  }, []);

  useEffect(() => {
    loadLms();
    window.scrollTo(0, 0);
    const controller = new AbortController();
    const { signal } = controller;
    if (!showPlaylistModal && !openCreateResourcePopup && !openEditResourcePopup && activeOrganization) {
      toast.info('Loading Playlists ...', {
        className: 'project-loading',
        closeOnClick: false,
        closeButton: false,
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 10000,
        icon: '',
      });
      loadProject(projectIdFilter, signal);
      loadProjectPlaylists(projectIdFilter, true, signal);
    }
    return () => {
      controller.abort();
    };
  }, [activeOrganization, loadLms, loadProject, loadProjectPlaylists, openCreateResourcePopup, openEditResourcePopup, projectIdFilter, showPlaylistModal, reloadPlaylist]);
  useEffect(() => {
    if (state.status === 2) {
      setChecked(true);
    } else {
      setChecked(false);
    }

    setIndexStatus(state.indexing);
  }, [state]);

  const editVisibility = async (type) => {
    await dispatch(
      updateProjectAction(projectState.selectedProject.id, {
        ...projectState.selectedProject,
        organization_visibility_type_id: type,
      }),
    );
  };

  const handleShowCreatePlaylistModal = async (e) => {
    e.preventDefault();

    try {
      await showCreatePlaylistModal();
      setShowPlaylistModal(true);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleShowCreateResourceModal = (playlist) => {
    try {
      showCreateResourceModal(playlist.id);
      history.push(`/org/${organization.currentOrganization?.domain}/project/${projectIdFilter}/playlist/${playlist.id}/activity/create`);
    } catch (e) {
      // console.log(e.message);
    }
  };

  const handleHideCreatePlaylistModal = async () => {
    // e.preventDefault();

    try {
      await hideCreatePlaylistModal();
      setShowPlaylistModal(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleHideCreateResourceModal = async (e) => {
    e.preventDefault();

    if (!resource.saved) {
      Swal.fire({
        icon: 'warning',
        title: 'You are exiting without saving your data. Are you sure to exit?',
        showCloseButton: true,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Yes',
        confirmButtonAriaLabel: 'Yes',
        cancelButtonText: 'Cancel',
        cancelButtonAriaLabel: 'Cancel',
      }).then(async (resp) => {
        if (resp.isConfirmed) {
          await hideCreateResourceModal();
          history.push(`/org/${organization.currentOrganization?.domain}/project/${projectIdFilter}`);
        }
      });
    } else {
      try {
        await hideCreateResourceModal();
        history.push(`/org/${organization.currentOrganization?.domain}/project/${projectIdFilter}`);
      } catch (err) {
        // console.log(err.message);
      }
    }
  };

  const onPlaylistTitleChange = (e) => {
    setTitle(e.target.value);
    if (e.target.value) setError(null);
  };

  const handleCreatePlaylistSubmit = async () => {
    // e.preventDefault();
    if (!/^ *$/.test(title) && title) {
      try {
        await createPlaylist(projectIdFilter, title);
        // history.push(
        //   `/org/${organization.currentOrganization?.domain}/project/${projectIdFilter}`
        // );
        handleHideCreatePlaylistModal();
      } catch (err) {
        if (err.errors) {
          if (err.errors.title.length > 0) {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err.errors.title[0],
            });
          }
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err.message,
          });
        }
      }
    } else {
      setError('* Required');
    }
  };
  const handleRef = (e) => {
    if (e.target.name === 'projectname') {
      titleRef.current = e;
    } else if (e.target.name === 'projectdescription') {
      descriptionRef.current = e;
    }
  };
  const onBlur = (e) => {
    if (e.target.name === 'projectname') {
      titleRef.current.blur();
      setEditName(false);
      if (selectedProject.name !== e.target.value && e.target.value.length <= 80) {
        dispatch(
          updateProjectAction(selectedProject?.id, {
            name: e.target.value,
            description: selectedProject.description,
            thumb_url: thumbUrl,
            organization_visibility_type_id: selectedProject.organization_visibility_type_id || 1,
          }),
        );
      } else if (e.target.value.length > 80) {
        Swal.fire({
          icon: 'warning',
          title: 'Exceeding length',
          text: 'Cannot enter more than 80 character in project title.',
        });
      }
    } else if (e.target.name === 'projectdescription') {
      descriptionRef.current.blur();
      setEditDescription(false);
      if (selectedProject.description !== e.target.value && e.target.value.length <= 1000) {
        dispatch(
          updateProjectAction(selectedProject?.id, {
            name: selectedProject.name,
            description: e.target.value,
            thumb_url: thumbUrl,
            organization_visibility_type_id: selectedProject.organization_visibility_type_id || 1,
          }),
        );
      } else if (e.target.value.length > 1000) {
        Swal.fire({
          icon: 'warning',
          title: 'Exceeding length',
          text: 'Cannot enter more than 1000 character in project description.',
        });
      }
    }
  };
  const onEnterPress = (e) => {
    if (e.charCode === 13) {
      titleRef.current.blur();
      descriptionRef.current.blur();
    }
  };

  const handleCreateResourceSubmit = async (currentPlaylistId, editor, editorType, payload, metadata, projectId) => {
    try {
      if (payload.submitAction === 'upload') {
        payload.event.preventDefault();

        await createResourceByH5PUpload(currentPlaylistId, editor, editorType, payload, metadata, projectId);
      } else {
        await createResource(currentPlaylistId, editor, editorType, metadata, projectId);
      }

      history.push(`/org/${organization.currentOrganization?.domain}/project/${projectIdFilter}`);
    } catch (e) {
      // console.log(e.message);
    }
  };

  const handleEditResourceSubmit = async (currentPlaylistId, editor, editorType, activityId, metadata) => {
    try {
      await editResource(currentPlaylistId, editor, editorType, activityId, metadata);

      history.push(`/org/${organization.currentOrganization?.domain}/project/${projectIdFilter}`);
    } catch (e) {
      // console.log(e);
    }
  };

  const onDragEnd = (e) => {
    if (!e.destination || (e.destination.index === e.source.index && e.source.droppableId === e.destination.droppableId)) {
      return;
    }

    const orgPlaylists = Array.from(playlists);

    if (e.type === 'resource') {
      // resource dropped
      if (e.source.droppableId === e.destination.droppableId) {
        // Resource dropped within the same list
        const playlist = playlists.find((pl) => pl.id === parseInt(e.source.droppableId, 10));
        const activities = Array.from(playlist.activities);
        const [removed] = activities.splice(e.source.index, 1);
        activities.splice(e.destination.index, 0, removed);
        // update playlist with new activities
        playlist.activities = activities;
      } else {
        // Rsc dropped on a different list
        const sourceList = playlists.find((pl) => pl.id === parseInt(e.source.droppableId, 10));
        const destinationList = playlists.find((pl) => pl.id === parseInt(e.destination.droppableId, 10));
        const sourceActivities = Array.from(sourceList.activities);
        const destActivities = destinationList.activities ? Array.from(destinationList.activities) : [];
        const [removed] = sourceActivities.splice(e.source.index, 1);
        destActivities.splice(e.destination.index, 0, removed);
        // Update both playlists with new activities
        sourceList.activities = sourceActivities;
        destinationList.activities = destActivities;
      }

      // Previous block caused changes to playlists
      reorderPlaylists(projectIdFilter, orgPlaylists, playlists);
    } else {
      // playlist dropped
      const pLists = Array.from(playlists);
      const [removed] = pLists.splice(e.source.index, 1);
      pLists.splice(e.destination.index, 0, removed);
      reorderPlaylists(projectIdFilter, orgPlaylists, pLists);
    }
  };

  const { showDeletePlaylistPopup, pageLoading } = ui;
  useEffect(() => {
    if (playlists.length > 0) {
      toast.dismiss();
    }
  }, [playlists]);
  const setUploadImage = (data) => {
    console.log(data);
    dispatch(
      updateProjectAction(selectedProject?.id, {
        name: selectedProject.name,
        description: selectedProject.description,
        thumb_url: data,
        organization_visibility_type_id: selectedProject.organization_visibility_type_id || 1,
      }),
    );
  };

  const handleShow = () => {
    setShow(true); //! state.show
  };

  const handleClose = () => {
    dispatch(shareToCanvas(false));
    dispatch(googleShare(false));
    setShow(false);
    setprojectPlaylistPublishtoCanvas(false);
  };

  const setProjectId = (projectId) => {
    setSelectedProjectId(projectId);
  };

  const setProjectPlaylistId = (playlistId) => {
    setSelectedProjectPlaylistId(playlistId);
  };

  const setProjectPlaylistActivityId = (playlistActivityId) => {
    setSelectedProjectPlaylistActivityId(playlistActivityId);
  };
  const primaryColor = getGlobalColor('--main-primary-color');
  const secondaryColor = getGlobalColor('--main-secondary-color');
  const [visibilityTypeArray, setVisibilityTypeArray] = useState([]);
  useEffect(() => {
    setVisibilityTypeArray(activeOrganization?.allowed_visibility_type_id);
  }, [activeOrganization]);
  return (
    <>
      {selectSearchModule ? (
        <>
          {/* <SearchInterface
            showBackOption={true}
            setSelectSearchModule={setSelectSearchModule}
            playlistIdForSearchingTab={playlistIdForSearchingTab}
            setReloadPlaylist={setReloadPlaylist}
            reloadPlaylist={reloadPlaylist}
          /> */}
          <SelectActivity
            setSelectSearchModule={setSelectSearchModule}
            playlistIdForSearchingTab={playlistIdForSearchingTab}
            setReloadPlaylist={setReloadPlaylist}
            reloadPlaylist={reloadPlaylist}
          />
        </>
      ) : (
        <div className={row?.id ? 'content-wrapper editprojectmodal' : 'content-wrapper'}>
          <div className="inner-content">
            <div className="content" style={{ minHeight: '500px' }}>
              <PexelsAPI
                show={modalShow}
                project={selectedProject}
                onHide={() => {
                  setModalShow(false);
                }}
                searchName="abstract"
                setUploadImage={setUploadImage}
              />

              <div>
                {pageLoading !== false ? (
                  <></>
                ) : (
                  <>
                    <div>{selectedProject?.team?.name ? `Team Name: ${selectedProject?.team?.name}` : null}</div>
                    <Headings text={`${organization?.currentOrganization?.name}`} headingType="body2" color="#084892" style={{ lineHeight: '20px' }} className="mb-3" />
                    <div className="col playlist-page-project-title project-each-view">
                      <div className="flex-se project-headline-section">
                        <div style={{ width: '100%' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="project-images">
                              <label style={{ display: 'none' }}>
                                <input
                                  ref={openFile}
                                  type="file"
                                  accept="image/x-png,image/jpeg"
                                  onChange={(e) => {
                                    if (e.target.files.length === 0) {
                                      return true;
                                    }
                                    if (
                                      !(
                                        e.target.files[0].type.includes('png') ||
                                        e.target.files[0].type.includes('jpg') ||
                                        e.target.files[0].type.includes('gif') ||
                                        e.target.files[0].type.includes('jpeg')
                                      )
                                    ) {
                                      Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: 'Invalid file selected.',
                                      });
                                    } else if (e.target.files[0].size > 100000000) {
                                      Swal.fire({
                                        icon: 'error',
                                        title: 'Error',
                                        text: 'Selected file size should be less then 100MB.',
                                      });
                                    } else {
                                      const thumbImage = uploadThumb(e, permission, teamPermission, projectState?.selectedProject?.id, dispatch, true);
                                      thumbImage.then((data) => {
                                        dispatch(
                                          updateProjectAction(selectedProject?.id, {
                                            name: selectedProject.name,
                                            description: selectedProject.description,
                                            thumb_url: data,
                                            organization_visibility_type_id: selectedProject.organization_visibility_type_id || 1,
                                          }),
                                        );
                                      });
                                    }
                                  }}
                                />
                              </label>
                              <div
                                title="project-img"
                                style={{
                                  backgroundImage: !selectedProject.thumb_url?.includes('/storage/')
                                    ? `url(${global.config.resourceUrl}${selectedProject.thumb_url})`
                                    : `url(${selectedProject.thumb_url})`,
                                }}
                                className="project-image-playlistpage"
                              />
                              <div className="on-hover-project-image">
                                {(Object.keys(teamPermission).length
                                  ? teamPermission?.Team?.includes('team:edit-project')
                                  : permission?.Project?.includes('project:upload-thumb')) && (
                                  <SelectImage
                                    image={
                                      !selectedProject.thumb_url?.includes('/storage/')
                                        ? selectedProject.thumb_url
                                        : selectedProject.thumb_url ||
                                          'https://images.pexels.com/photos/593158/pexels-photo-593158.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=1&amp;fit=crop&amp;h=200&amp;w=280'
                                    }
                                    returnImage={(e) => uploadThumb(e, permission, teamPermission, projectState?.selectedProject?.id, dispatch)}
                                    returnImagePexel={(e) => setUploadImage(e)}
                                    containerType="Project"
                                  />
                                )}

                                {/* <div className="thumb-display">
                                  <div
                                    className="success"
                                    style={{
                                      color: '#515151',
                                      marginBottom: '4px',
                                      fontSize: '14px',
                                    }}
                                  >
                                    Upload Image:
                                  </div>

                                  <div
                                    style={{
                                      backgroundImage: `url(${
                                        selectedProject.thumb_url && selectedProject.thumb_url?.includes('/storage/')
                                          ? selectedProject.thumb_url
                                          : global.config.resourceUrl + selectedProject.thumb_url
                                      })`,
                                      backgroundPosition: 'center',
                                      backgroundRepeat: 'no-repeat',
                                      backgroundSize: 'cover',
                                    }}
                                    // alt="project-img"
                                    className="container-image"
                                    // src={
                                    //   selectedProject.thumb_url && selectedProject.thumb_url?.includes('/storage/')
                                    //     ? selectedProject.thumb_url
                                    //     : global.config.resourceUrl + selectedProject.thumb_url
                                    // }
                                  />
                                </div>
                                {(Object.keys(teamPermission).length
                                  ? teamPermission?.Team?.includes('team:edit-project')
                                  : permission?.Project?.includes('project:upload-thumb')) && (
                                  <div className="button-flex-project-images">
                                    <div
                                      className="gallery"
                                      onClick={() => {
                                        openFile.current.click();
                                      }}
                                    >
                                      <img src={computer} alt="" />
                                      <p>My device</p>
                                    </div>

                                    <div className="pexel" onClick={() => setModalShow(true)}>
                                      <img src={pexel} alt="pexel" />
                                      <p>Pexels</p>
                                    </div>
                                  </div>
                                )} */}
                              </div>
                            </div>
                            {!editName && <Headings text={selectedProject ? selectedProject.name : ''} headingType="h2" className="main-heading" color="#2E68BF" />}
                            <textarea
                              className="title"
                              name="projectname"
                              ref={titleRef}
                              defaultValue={selectedProject ? selectedProject.name : ''}
                              onBlur={onBlur}
                              onKeyPress={onEnterPress}
                              style={{ display: editName ? 'block' : 'none' }}
                            />
                            {!editName &&
                              (Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:edit-project') : permission?.Project?.includes('project:edit')) && (
                                <>
                                  {/* <img
                                  src={Edit}
                                  alt="hk"
                                  className="ml-3"
                                  onClick={() => {
                                    setEditName(true);
                                    console.log(titleRef);
                                    titleRef.current.focus();
                                  }}
                                /> */}
                                  <EditSmSvg
                                    primaryColor={primaryColor}
                                    className="ml-3"
                                    onClick={() => {
                                      setEditName(true);
                                      console.log(titleRef);
                                      titleRef.current.focus();
                                    }}
                                  />
                                </>
                              )}
                          </div>
                          <div className="paragraph">
                            {!editDescription && <Headings text={selectedProject.description} headingType="body" color="#515151" />}
                            <textarea
                              className="description"
                              ref={descriptionRef}
                              name="projectdescription"
                              defaultValue={selectedProject.description ? selectedProject.description : ''}
                              onBlur={onBlur}
                              onKeyPress={onEnterPress}
                              style={{
                                display: editDescription ? 'block' : 'none',
                              }}
                            />
                            {!editDescription &&
                              (Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:edit-project') : permission?.Project?.includes('project:edit')) && (
                                // <img
                                //   src={Edit}
                                //   alt="hk"
                                //   className="ml-4"
                                //   // className="ml-2"
                                //   onClick={() => {
                                //     setEditDescription(true);
                                //     descriptionRef.current.focus();
                                //   }}
                                // />
                                <>
                                  <EditSmSvg
                                    primaryColor={primaryColor}
                                    className="ml-4"
                                    onClick={() => {
                                      setEditDescription(true);
                                      descriptionRef.current.focus();
                                    }}
                                  />
                                </>
                              )}
                          </div>
                          <div className="new-playlist status-pref">
                            <div className="dropdown">
                              <Headings text="Library Preferences:" headingType="body2" color="#515151" />

                              <Dropdown className="d-inline mx-2" autoClose="outside">
                                <Dropdown.Toggle id="dropdown-autoclose-outside">{visibility}</Dropdown.Toggle>
                                <Dropdown.Menu>
                                  {visibilityTypeArray?.map((type) => (
                                    <Dropdown.Item>
                                      <div
                                        onClick={() => {
                                          editVisibility(type.id);
                                          setVisibility(type.display_name);
                                        }}
                                      >
                                        {type.display_name}
                                      </div>
                                    </Dropdown.Item>
                                  ))}
                                  {/* {projectState.visibilityTypes?.data?.map((type) => (
                                    <Dropdown.Item>
                                      <div
                                        onClick={() => {
                                          editVisibility(type.id);
                                          setVisibility(type.display_name);
                                        }}
                                      >
                                        {type.display_name}
                                      </div>
                                    </Dropdown.Item>
                                  ))} */}
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            {selectedProject?.indexing_text !== 'NOT REQUESTED' && (
                              <div className="library-status">
                                <div
                                  className={selectedProject?.indexing_text === 'REQUESTED' ? 'requested' : selectedProject?.indexing_text === 'APPROVED' ? 'approved' : 'rejected'}
                                >
                                  {selectedProject?.indexing_text === 'REQUESTED' ? (
                                    <FontAwesomeIcon icon="exclamation-circle" color={primaryColor} />
                                  ) : selectedProject?.indexing_text === 'APPROVED' ? (
                                    <>
                                      <ApprovedSmSvg primaryColor={primaryColor} />
                                    </>
                                  ) : (
                                    <FontAwesomeIcon icon="times-circle" color={primaryColor} />
                                  )}
                                  {selectedProject?.indexing_text}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="project-share-previews">
                          <div className="project-preview">
                            <Link className="dropdown-item" to={`/org/${organization.currentOrganization?.domain}/project/${projectIdFilter}/preview`}>
                              {/* <img src={Preview} alt="img" className="mr-2" /> */}
                              <FontAwesomeIcon icon="eye" className="mr-2" color={secondaryColor} />
                              Project Preview
                            </Link>
                          </div>
                          {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:share-project') : permission?.Project?.includes('project:share')) && (
                            <Projectsharing setActiveShared={setActiveShared} activeShared={activeShared} selectedProject={selectedProject} />
                          )}
                        </div>
                      </div>
                    </div>

                    <hr style={{ margin: '16px 0 24px' }} />
                    <div className="new-playlister">
                      {(Object.keys(teamPermission).length ? teamPermission?.Team?.includes('team:add-playlist') : permission?.Playlist?.includes('playlist:create')) && (
                        <button style={{ whiteSpace: 'nowrap' }} type="button" className="create-playlist-btn" onClick={handleShowCreatePlaylistModal}>
                          <PlusSmSvg primaryColor={primaryColor} className="mr-2" />
                          Create new playlist
                        </button>
                      )}
                    </div>
                    {!!playlists && playlists.length > 0 ? (
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="project-droppable-id" direction="horizontal" type="column">
                          {(provided) => (
                            <div id="board" className="board-custom" {...provided.droppableProps} ref={provided.innerRef}>
                              {permission?.Playlist?.includes('playlist:view') &&
                                playlists.map((playlist, index) => (
                                  <PlaylistCard
                                    key={playlist.id}
                                    index={index}
                                    playlist={playlist}
                                    projectId={parseInt(projectIdFilter, 10)}
                                    handleCreateResource={handleShowCreateResourceModal}
                                    teamPermission={teamPermission || {}}
                                    handleShow={handleShow}
                                    setProjectId={setProjectId}
                                    setProjectPlaylistId={setProjectPlaylistId}
                                    setProjectPlaylistActivityId={setProjectPlaylistActivityId}
                                    setSelectSearchModule={setSelectSearchModule}
                                    setPlaylistIdForSearchingTab={setPlaylistIdForSearchingTab}
                                    setselectedProjectPlaylistName={setselectedProjectPlaylistName}
                                    setprojectPlaylistPublishtoCanvas={setprojectPlaylistPublishtoCanvas}
                                    setselectedPlaylistActivityName={setselectedPlaylistActivityName}
                                  />
                                ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                      </DragDropContext>
                    ) : (
                      <Alert variant="success">No playlist available, kindly create your playlist.</Alert>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          {/* {screenState === 'addvideo' && (
          <div className="form-new-popup-myvideo ">
            <AddVideo showback={true} changeScreenHandler={changeScreenHandler} />
          </div>
        )}
        {screenState === 'describevideo' && (
          <div className="form-new-popup-myvideo ">
            <DescribeVideo reverseType showback={true} changeScreenHandler={changeScreenHandler} setUploadImageStatus={setUploadImageStatus} />
          </div>
        )} */}
        </div>
      )}

      {showPlaylistModal && (
        <CreatePlaylistPopup
          handleHideCreatePlaylistModal={handleHideCreatePlaylistModal}
          handleCreatePlaylistSubmit={handleCreatePlaylistSubmit}
          onPlaylistTitleChange={onPlaylistTitleChange}
          error={error}
        />
      )}

      {openCreateResourcePopup && (
        <AddResource
          {...props}
          handleHideCreateResourceModal={handleHideCreateResourceModal}
          handleCreateResourceSubmit={handleCreateResourceSubmit}
          handleEditResourceSubmit={handleEditResourceSubmit}
        />
      )}

      {openEditResourcePopup && (
        <EditResource
          {...props}
          handleHideCreateResourceModal={handleHideCreateResourceModal}
          handleCreateResourceSubmit={handleCreateResourceSubmit}
          handleEditResourceSubmit={handleEditResourceSubmit}
        />
      )}

      {resource.showPreviewResourcePopup && <PreviewResourcePage {...props} />}

      {showDeletePlaylistPopup && <DeletePopup {...props} deleteType="Playlist" selectedProject={selectedProject} />}
      <MyActivity playlistPreview />

      <Modal dialogClassName="safari-modal" show={safariMontagePublishTool} onHide={() => closeSafariMontageTool()} aria-labelledby="example-modal-sizes-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Safari Montage</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe title="Safari Montage" src={`data:text/html;charset=utf-8,${safariMontagePublishTool}`} />
        </Modal.Body>
      </Modal>
      {/* {!showFooter && <Footer />} */}

      <GoogleModel
        projectId={selectedProjectId}
        playlistId={selectedProjectPlaylistId}
        activityId={selectedProjectPlaylistActivityId}
        show={show} // {props.show}
        onHide={handleClose}
        selectedProjectPlaylistName={selectedProjectPlaylistName}
        setprojectPlaylistPublishtoCanvas={setprojectPlaylistPublishtoCanvas}
        projectPlaylistPublishtoCanvas={projectPlaylistPublishtoCanvas}
        selectedPlaylistActivityName={selectedPlaylistActivityName}
      />
    </>
  );
}

PlaylistsPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  openCreateResourcePopup: PropTypes.bool,
  openEditResourcePopup: PropTypes.bool,
  playlist: PropTypes.object.isRequired,
  resource: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  loadProject: PropTypes.func.isRequired,
  loadProjectPlaylists: PropTypes.func.isRequired,
  reorderPlaylists: PropTypes.func.isRequired,
  editResource: PropTypes.func.isRequired,
  createResource: PropTypes.func.isRequired,
  createResourceByH5PUpload: PropTypes.func.isRequired,
  createPlaylist: PropTypes.func.isRequired,
  showCreateResourceModal: PropTypes.func.isRequired,
  hideCreateResourceModal: PropTypes.func.isRequired,
  showCreatePlaylistModal: PropTypes.func.isRequired,
  hideCreatePlaylistModal: PropTypes.func.isRequired,
  showCreateResourceActivity: PropTypes.func.isRequired,
  showResourceDescribeActivity: PropTypes.func.isRequired,
  loadLms: PropTypes.func.isRequired,
  getIndexedData: PropTypes.func.isRequired,
  getElasticData: PropTypes.func.isRequired,
  getTeamPermissions: PropTypes.func.isRequired,
  closeSafariMontageTool: PropTypes.func.isRequired,
  safariMontagePublishTool: PropTypes.string.isRequired,
};

PlaylistsPage.defaultProps = {
  openCreateResourcePopup: false,
  openEditResourcePopup: false,
};

const mapDispatchToProps = (dispatch) => ({
  createPlaylist: (id, title) => dispatch(createPlaylistAction(id, title)),
  deletePlaylist: (projectId, id) => dispatch(deletePlaylistAction(projectId, id)),
  showCreatePlaylistModal: () => dispatch(showCreatePlaylistModalAction()),
  hideCreatePlaylistModal: () => dispatch(hideCreatePlaylistModalAction()),
  hideDeletePopup: () => dispatch(hideDeletePopupAction()),
  showCreateResourceModal: (id) => dispatch(showCreateResourceModalAction(id)),
  hideCreateResourceModal: () => dispatch(hideCreateResourceModalAction()),
  hidePreviewResourceModal: () => dispatch(hidePreviewResourceModalAction()),
  showCreateProjectModal: () => dispatch(showCreateProjectModalAction()),
  loadProjectPlaylists: (id, skipContent, signal) => dispatch(loadProjectPlaylistsAction(id, skipContent, signal)),
  createResource: (id, editor, editorType, metadata, playlistId) => dispatch(createResourceAction(id, editor, editorType, metadata, playlistId)),
  editResource: (id, editor, editorType, actId, metadata) => dispatch(editResourceAction(id, editor, editorType, actId, metadata)),
  createResourceByH5PUpload: (id, editor, editorType, payload, mdata, projId) => dispatch(createResourceByH5PUploadAction(id, editor, editorType, payload, mdata, projId)),
  loadProject: (id, signal) => dispatch(loadProjectAction(id, signal)),
  deleteResource: (activityId) => dispatch(deleteResourceAction(activityId)),
  showDeletePopup: (id, title, deleteType) => dispatch(showDeletePopupAction(id, title, deleteType)),
  showCreateResourceActivity: () => dispatch(showCreateResourceActivityAction()),
  showResourceDescribeActivity: (activity, id) => dispatch(showDescribeActivityAction(activity, id)),
  showBuildActivity: (editor, editorType, id) => dispatch(showBuildActivityAction(editor, editorType, id)),
  onChangeActivityType: (activityTypeId) => dispatch(onChangeActivityTypeAction(activityTypeId)),
  onChangeActivity: (e, activity) => dispatch(onChangeActivityAction(e, activity)),
  uploadResourceThumbnail: () => dispatch(uploadResourceThumbnailAction()),
  reorderPlaylists: (projectId, orgPlaylists, playlists) => dispatch(reorderPlaylistsAction(projectId, orgPlaylists, playlists)),
  loadLms: () => dispatch(loadLmsAction()),
  getTeamPermissions: (orgId, teamId) => dispatch(getTeamPermission(orgId, teamId)),
  closeSafariMontageTool: () => dispatch(closeSafariMontageToolAction()),
  getLmsSettings: () => dispatch(getUserLmsSettingsAction()),
});

const mapStateToProps = (state) => ({
  playlist: state.playlist,
  resource: state.resource,
  project: state.project,
  ui: state.ui,
  safariMontagePublishTool: state.genericLMS.safariMontagePublishTool,
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps, null, { forwardRef: true })(PlaylistsPage));
