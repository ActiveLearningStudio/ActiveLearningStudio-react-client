/*eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'react-bootstrap';
import './previewlayout.scss';
import Tabs from 'utils/Tabs/tabs';
import H5PEditor from 'components/ResourceCard/AddResource/Editors/H5PEditorV2';
import ExistingActivitySearchContainer from 'components/ExistingActivitySearchContainer';
import H5PImageUploadContainer from 'components/H5PImageUploadContainer';
import cross from 'assets/images/cross-icon.png';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';

const PreviewLayoutModel = (props) => {
  const { selectedLayout, layout, playlist, project, activity } = useSelector((state) => state.myactivities);
  const { platform, videoId } = useSelector((state) => state.videos);

  const {
    redirecttoactivity,
    fullWidth,
    type,
    title,
    video,
    editVideo,
    setOpenVideo,
    accountId,
    settingId,
    reverseType,
    onHide,
    formData,
    activityPreview,
    setisSubmitActivty,
  } = props;
  var counter = 0;
  const [edith5p, setEditH5p] = useState(editVideo?.h5p);
  const [showActivitySearch, setShowActivitySearch] = useState(false);
  const [insertActivityCallback, setInsertActivityCallback] = useState(null);
  const [insertActivityLibraries, setInsertActivityLibraries] = useState(null);
  const [showH5PImageUploadDialog, setShowH5PImageUploadDialog] = useState(false);
  const [H5PImageUploadDialogDetails, setH5PImageUploadDialogDetails] = useState(null);

  // useEffect(() => {
  //   if (type === "videoModal" && props.show) {
  //     dispatch(loadH5pSettingsActivity("H5P.InteractiveVideo 1.24"));
  //   }
  // }, []);
  const submitForm = useRef(null);

  useEffect(() => {
    var replaceH5p;
    if (editVideo) {
      if (type === 'videoModal' || editVideo?.h5p) {
        replaceH5p = JSON.parse(editVideo?.h5p);

        replaceH5p.metadata.title = formData?.title;
        if (platform === 'Brightcove') {
          replaceH5p.params.interactiveVideo.video.brightcoveVideoID = videoId;
        } else if (platform === 'Youtube') {
          replaceH5p.params.interactiveVideo.video.files = [
            {
              copyright: { license: 'U' },
              mime: 'video/YouTube',
              path: videoId,
            },
          ];
        } else if (platform === 'Kaltura' || platform === 'Komodo') {
          replaceH5p.params.interactiveVideo.video.files = [
            {
              copyright: { license: 'U' },
              mime: 'video/unknown',
              path: videoId,
            },
          ];
        } else if (platform === 'Vimeo') {
          replaceH5p.params.interactiveVideo.video.files = [
            {
              copyright: { license: 'U' },
              mime: 'video/unknown',
              path: videoId,
            },
          ];
        } else if (platform === 'Mydevice') {
          replaceH5p.params.interactiveVideo.video.files = [{ copyright: { license: 'U' }, mime: 'video/mp4', path: videoId }];
        }
      } else {
        replaceH5p = JSON.parse(editVideo?.h5p_content?.parameters);
        replaceH5p.metadata.title = formData.title;
        if (platform === 'Brightcove') {
          replaceH5p.interactiveVideo.video.brightcoveVideoID = videoId;
        } else if (platform === 'Youtube') {
          replaceH5p.interactiveVideo.video.files = [
            {
              copyright: { license: 'U' },
              mime: 'video/YouTube',
              path: videoId,
            },
          ];
        } else if (platform === 'Kaltura' || platform === 'Kaltura') {
          replaceH5p.interactiveVideo.video.files = [
            {
              copyright: { license: 'U' },
              mime: 'video/unknown',
              path: videoId,
            },
          ];
        } else if (platform === 'Vimeo') {
          replaceH5p.interactiveVideo.video.files = [
            {
              copyright: { license: 'U' },
              mime: 'video/unknown',
              path: videoId,
            },
          ];
        } else if (platform === 'Mydevice') {
          replaceH5p.interactiveVideo.video.files = [{ copyright: { license: 'U' }, mime: 'video/mp4', path: videoId }];
        }
      }

      setEditH5p(JSON.stringify(replaceH5p));
    } else {
      if (activity?.h5p) {
        replaceH5p = JSON.parse(activity?.h5p);
        replaceH5p.metadata.title = formData?.title;
        setEditH5p(JSON.stringify(replaceH5p));
      }
    }
  }, [platform, formData, editVideo]);

  const handleExistingActivitySearchEvent = (e) => {
    if (e === 'close') return setShowActivitySearch(false);

    setInsertActivityCallback(() => (data) => e.detail.callback(data));
    setInsertActivityLibraries(e.detail.libraries);
    setShowActivitySearch(true);
  };

  const handleH5PImageUploadDialogEvent = (e) => {
    if (e === 'close') return setShowH5PImageUploadDialog(false);

    setH5PImageUploadDialogDetails(e.detail);
    setShowH5PImageUploadDialog(true);
  };

  useEffect(() => {
    window.addEventListener('launchExistingActivitySearch', handleExistingActivitySearchEvent);
    return () => {
      window.removeEventListener('launchExistingActivitySearch', handleExistingActivitySearchEvent);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('launchH5PImageUploadDialog', handleH5PImageUploadDialogEvent);
    return () => {
      window.removeEventListener('launchH5PImageUploadDialog', handleH5PImageUploadDialogEvent);
    };
  }, []);

  return (
    <>
      <Modal {...props} backdrop="static" keyboard={false} size="xl" aria-labelledby="contained-modal-title-vcenter" centered className="preview-layout-model">
        <Modal.Header style={{ display: 'block !important' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              cursor: 'pointer',
              width: '100%',
            }}
          >
            <img
              style={{ width: '15px' }}
              src={cross}
              alt="cross"
              onClick={() => {
                Swal.fire({
                  title: 'Do you want to save your changes?',
                  text: 'All changes will be lost if you don’t save them',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#084892',
                  cancelButtonColor: '#d33',
                  cancelButtonText: 'Cancel',
                  confirmButtonText: 'Save',
                  denyButtonText: "Don't Save",
                  showDenyButton: true,
                  allowOutsideClick: true,
                  customClass: {
                    actions: 'my-actions',
                    cancelButton: 'order-1 right-gap',
                    confirmButton: 'order-2',
                    denyButton: 'order-3',
                  },
                }).then(async (result) => {
                  if (result.isConfirmed) {
                    submitForm.current();
                  } else if (result.isDenied) {
                    onHide();
                  } else {
                  }
                });
              }}
            />
          </div>
        </Modal.Header>

        <Modal.Body style={{ display: 'block !important' }}>
          <div className="interactive-video-H5P">
            {type === 'videoModal' ? (
              <>
                <div className="add-activity-form">
                  <div className="add-activity-tabs" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Tabs text={activityPreview ? '1. Add an activity' : '1. Add a video'} className="m-2" tabActive={true} />
                    <Tabs text={activityPreview ? '1. Describe activity' : '2. Describe video'} className="m-2" tabActive={true} />

                    <Tabs text="3. Add interaction" className="m-2" tabActive={true} />
                  </div>
                </div>
                {platform === 'Youtube' && !editVideo && (
                  <H5PEditor
                    h5pParams={
                      props.editVideo.h5p
                        ? props.editVideo.h5p
                        : `{"params":{"interactiveVideo":{ "video" : {"files": [{"path":"${video}","mime":"video/YouTube"}]}}},"metadata":{"title":"${title}"}}`
                    }
                    h5pLib="H5P.InteractiveVideo 1.24"
                    hide={props.onHide}
                    type={type}
                    formData={props?.formData}
                    editVideo={editVideo}
                    setOpenVideo={setOpenVideo}
                    reverseType={reverseType}
                    playlistId={playlist?.id || undefined}
                    submitForm={submitForm}
                    activityPreview={activityPreview}
                    setisSubmitActivty={setisSubmitActivty}
                    fullWidth={fullWidth}
                  />
                )}
                {platform === 'Brightcove' && !editVideo && (
                  <div>
                    <div id="activity-loader-alert" class="alert alert-primary" role="alert" style={{ display: 'none' }}></div>
                    <H5PEditor
                      h5pParams={
                        props.editVideo.h5p ? props.editVideo.h5p : `{"params":{"interactiveVideo":{ "video" :{"brightcoveVideoID": "${video}"}}},"metadata":{"title":"${title}"}}`
                      }
                      h5pLib="H5P.BrightcoveInteractiveVideo 1.1"
                      hide={props.onHide}
                      type={type}
                      formData={props?.formData}
                      editVideo={editVideo}
                      setOpenVideo={setOpenVideo}
                      accountId={accountId}
                      settingId={settingId}
                      reverseType={reverseType}
                      playlistId={playlist?.id || undefined}
                      submitForm={submitForm}
                      activityPreview={activityPreview}
                      setisSubmitActivty={setisSubmitActivty}
                      fullWidth={fullWidth}
                    />
                  </div>
                )}
                {platform === 'Kaltura' && !editVideo && (
                  <H5PEditor
                    h5pParams={
                      props.editVideo.h5p
                        ? props.editVideo.h5p
                        : `{"params":{"interactiveVideo":{ "video" : {"files": [{"path":"${video}","mime":"video/unknown"}]}}},"metadata":{"title":"${title}"}}`
                    }
                    h5pLib="H5P.CurrikiInteractiveVideo 1.1"
                    hide={props.onHide}
                    type={type}
                    formData={props?.formData}
                    editVideo={editVideo}
                    setOpenVideo={setOpenVideo}
                    reverseType={reverseType}
                    playlistId={playlist?.id || undefined}
                    submitForm={submitForm}
                    activityPreview={activityPreview}
                    setisSubmitActivty={setisSubmitActivty}
                    fullWidth={fullWidth}
                  />
                )}
                {platform === 'Komodo' && !editVideo && (
                  <H5PEditor
                    h5pParams={
                      props.editVideo.h5p
                        ? props.editVideo.h5p
                        : `{"params":{"interactiveVideo":{ "video" : {"files": [{"path":"${video}","mime":"video/unknown"}]}}},"metadata":{"title":"${title}"}}`
                    }
                    h5pLib="H5P.CurrikiInteractiveVideo 1.1"
                    hide={props.onHide}
                    type={type}
                    formData={props?.formData}
                    editVideo={editVideo}
                    setOpenVideo={setOpenVideo}
                    reverseType={reverseType}
                    playlistId={playlist?.id || undefined}
                    submitForm={submitForm}
                    activityPreview={activityPreview}
                    setisSubmitActivty={setisSubmitActivty}
                    redirecttoactivity={redirecttoactivity}
                    fullWidth={fullWidth}
                  />
                )}
                {/* Vimeo */}
                {platform === 'Vimeo' && !editVideo && (
                  <H5PEditor
                    h5pParams={
                      props.editVideo.h5p
                        ? props.editVideo.h5p
                        : `{"params":{"interactiveVideo":{ "video" : {"files": [{"path":"${video}","mime":"video/unknown"}]}}},"metadata":{"title":"${title}"}}`
                    }
                    h5pLib="H5P.CurrikiInteractiveVideo 1.1"
                    hide={props.onHide}
                    type={type}
                    formData={props?.formData}
                    editVideo={editVideo}
                    setOpenVideo={setOpenVideo}
                    reverseType={reverseType}
                    playlistId={playlist?.id || undefined}
                    submitForm={submitForm}
                    activityPreview={activityPreview}
                    setisSubmitActivty={setisSubmitActivty}
                    fullWidth={fullWidth}
                  />
                )}

                {platform === 'Mydevice' && !editVideo && (
                  <H5PEditor
                    h5pParams={
                      props.editVideo.h5p
                        ? props.editVideo.h5p
                        : `{"params":{"interactiveVideo":{ "video" : {"files": [{"path":"${video}","mime":"video/mp4"}]}}},"metadata":{"title":"${title}"}}`
                    }
                    h5pLib="H5P.InteractiveVideo 1.24"
                    hide={props.onHide}
                    type={type}
                    formData={props?.formData}
                    editVideo={editVideo}
                    setOpenVideo={setOpenVideo}
                    reverseType={reverseType}
                    playlistId={playlist?.id || undefined}
                    submitForm={submitForm}
                    activityPreview={activityPreview}
                    setisSubmitActivty={setisSubmitActivty}
                    fullWidth={fullWidth}
                  />
                )}
                {editVideo && (
                  <H5PEditor
                    h5pParams={edith5p}
                    h5pLib={editVideo.h5p_content.library.name + ' ' + editVideo.h5p_content.library.major_version + '.' + editVideo.h5p_content.library.minor_version}
                    hide={props.onHide}
                    type={type}
                    formData={props?.formData}
                    editVideo={editVideo}
                    setOpenVideo={setOpenVideo}
                    reverseType={reverseType}
                    playlistId={playlist?.id || undefined}
                    contentId={editVideo?.h5p_content?.id}
                    submitForm={submitForm}
                    activityPreview={activityPreview}
                    fullWidth={fullWidth}
                  />
                )}
              </>
            ) : (
              <>
                <div className="add-activity-form">
                  <div className="add-activity-tabs">
                    <Tabs text="1. Select  layout" tabActive={true} />
                    {
                      ((counter = 0),
                      layout?.map((data) => {
                        if (data.id === selectedLayout?.id && counter == 0) {
                          counter++;
                          return (
                            <>
                              <Tabs text="2. Describe and  create layout" className="ml-10" tabActive={true} />
                            </>
                          );
                        }
                      }))
                    }
                    {counter === 0 && (
                      <>
                        <Tabs text="2. Select activity" className="ml-10" tabActive={true} />
                        <Tabs text="3. Describe and  create activity" className="ml-10" tabActive={true} />
                      </>
                    )}
                  </div>
                </div>
                <H5PEditor
                  playlistId={playlist.id}
                  h5pLib={
                    activity
                      ? activity.h5p_content.library.name + ' ' + activity.h5p_content.library.major_version + '.' + activity.h5p_content.library.minor_version
                      : selectedLayout?.h5pLib
                  }
                  h5pLibType={activity?.type || selectedLayout?.type}
                  payload={''}
                  formData={props?.formData}
                  projectId={project}
                  h5pParams={edith5p ? edith5p : `{\"params\":{},\"metadata\":{"title":"${props?.formData?.title}"}}`}
                  hide={props.onHide}
                  editActivity={activity ? true : false}
                  activityId={activity?.id}
                  contentId={activity?.h5p_content?.id}
                  submitForm={submitForm}
                  activityPreview={activityPreview}
                  fullWidth={fullWidth}
                />
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
      {showActivitySearch && (
        <ExistingActivitySearchContainer
          insertActivityCallback={insertActivityCallback}
          layout={selectedLayout}
          libraries={insertActivityLibraries}
          closeModal={() => handleExistingActivitySearchEvent('close')}
        />
      )}
      {showH5PImageUploadDialog && (
        <H5PImageUploadContainer layout={selectedLayout} details={H5PImageUploadDialogDetails} closeModal={() => handleH5PImageUploadDialogEvent('close')} />
      )}
    </>
  );
};

PreviewLayoutModel.propTypes = {
  show: PropTypes.bool,
  onHide: PropTypes.func.isRequired,
};

PreviewLayoutModel.defaultProps = {
  show: false,
};

export default PreviewLayoutModel;
