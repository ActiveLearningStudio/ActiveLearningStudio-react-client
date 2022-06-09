/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable  */
import React, { useEffect, useRef, useState } from 'react';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import TabsHeading from 'utils/Tabs/tabs';
import { Tabs, Tab, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import AddVideoImage from 'assets/images/svg/addvidobright.svg';
import AddVideoTube from 'assets/images/svg/youtube.svg';
import AddKaltura from 'assets/images/kaltura.jpg';
import AddVemeo from 'assets/images/vemeo.PNG';
import Buttons from 'utils/Buttons/buttons';
import videoService from 'services/videos.services';
import UploadImg from 'assets/images/upload1.png';
import Swal from 'sweetalert2';
import 'utils/uploadselectfile/uploadfile.scss';
import { getGlobalColor } from 'containers/App/DynamicBrandingApply';
import { getMediaSources } from 'store/actions/admin';
import BrightcoveModel from '../model/brightmodel';

const AddVideo = ({ setScreenStatus, showback, changeScreenHandler, hideallothers }) => {
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const [modalShow, setModalShow] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState('');
  const [selectedVideoIdKaltura, setSelectedVideoIdKaltura] = useState('');
  const [selectedVideoIdVimeo, setSelectedVideoIdVimeo] = useState('');
  const [selectedVideoIdUpload, setSelectedVideoIdUpload] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [platform, setplatform] = useState('Mydevice');
  const [mediaSources, setMediaSources] = useState([]);
  const [activeKey, setActiveKey] = useState(mediaSources[0]?.name);
  const { editVideo } = useSelector((state) => state.videos);

  useEffect(() => {
    if (editVideo?.source_type) {
      setActiveKey(editVideo?.source_type);
    }
  }, [editVideo]);

  useEffect(() => {
    if (mediaSources.length === 0) {
      const result = dispatch(getMediaSources(organization?.activeOrganization?.id));
      result.then((data) => {
        setMediaSources(data.mediaSources);
      });
    }
  }, [mediaSources]);
  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <>
      <BrightcoveModel
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        setSelectedVideoId={setSelectedVideoId}
        setSelectedVideoIdKaltura={setSelectedVideoIdKaltura}
        setSelectedVideoIdVimeo={setSelectedVideoIdVimeo}
        selectedVideoIdVimeo={selectedVideoIdVimeo}
        showSidebar={showSidebar}
        platform={platform}
      />
      <div className="add-video-form">
        <div className="add-video-tabs">
          <TabsHeading text="1. Add a video" tabActive />
          <TabsHeading text="2. Describe video" className="ml-10" />
          <TabsHeading text="3. Add interactions" className="ml-10" />
        </div>
        <div className="add-video-title-select upload-back-button">
          <div className="add-video-title">
            <HeadingTwo text="Add a video" color="#084892" />
          </div>
          {/* <div className="add-video-tour">
            <span>
              <FontAwesomeIcon icon={faClock} color="#084892" className="ml-9" />
              Tour
            </span>
          </div> */}
          {showback && !editVideo && (
            <div
              className=" back-button "
              id="back-button-none-bg"
              style={{
                display: 'flex',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => changeScreenHandler('layout')}
            >
              <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: '8px', marginTop: '4px' }}>
                <path d="M13 5L1 5" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 1L1 5L5 9" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

              <p style={{ margin: 0 }} className="">
                Back to options
              </p>
            </div>
          )}
        </div>
        {hideallothers && (
          <div className="add-video-form-tabs">
            <Tabs className="main-tabs" defaultActiveKey="Brightcove" id="uncontrolled-tab-example">
              {!editVideo ? (
                <Tab
                  eventKey="Brightcove"
                  title="BrightCove"
                  onClick={() => {
                    setplatform('Brightcove');
                    setShowSidebar(true);
                  }}
                >
                  <FormikVideo
                    Input
                    showback={showback}
                    changeScreenHandler={changeScreenHandler}
                    selectedVideoId={selectedVideoId}
                    type={AddVideoImage}
                    setScreenStatus={setScreenStatus}
                    showBrowse
                    setModalShow={setModalShow}
                    platform={platform}
                    placeholder="Enter a video Id"
                  />
                </Tab>
              ) : (
                editVideo.source_type === 'Brightcove' && (
                  <Tab
                    eventKey="Brightcove"
                    title="BrightCove"
                    onClick={() => {
                      setplatform('Brightcove');
                      setShowSidebar(true);
                    }}
                  >
                    <FormikVideo
                      Input
                      showback={showback}
                      changeScreenHandler={changeScreenHandler}
                      selectedVideoId={selectedVideoId}
                      type={AddVideoImage}
                      setScreenStatus={setScreenStatus}
                      showBrowse
                      setModalShow={setModalShow}
                      platform={platform}
                      editVideo={editVideo?.source_url}
                      placeholder="Enter a video Id"
                    />
                  </Tab>
                )
              )}

              {/* <Tab eventKey="Vimeo" title="Vimeo"></Tab>
    <Tab eventKey="Kaltura" title="Kaltura"></Tab> */}
            </Tabs>
            {editVideo && editVideo.source_type !== 'Brightcove' && <Alert variant="warning">This activity is not editable in new release, Please create a new one</Alert>}
          </div>
        )}
        {!hideallothers && (
          <div className="add-video-form-tabs">
            <Tabs
              className="main-tabs"
              activeKey={activeKey}
              onSelect={(k) => {
                setActiveKey(k);
              }}
              id="controlled-tab-example"
            >
              {!editVideo && mediaSources.some((obj) => obj.name === 'My device' && obj.media_type === 'Video') ? (
                <Tab
                  eventKey="Mydevice"
                  title="My device"
                  onClick={() => {
                    setplatform('Mydevice');
                  }}
                >
                  {/* <UploadFile metadata={formData} formRef={formRef} /> */}
                  <FormikVideo
                    setSelectedVideoId={setSelectedVideoIdUpload}
                    showback={showback}
                    setScreenStatus={setScreenStatus}
                    changeScreenHandler={changeScreenHandler}
                    uploadFile
                    platform={platform}
                  />
                </Tab>
              ) : (
                editVideo.source_type === 'Mydevice' && (
                  <Tab
                    eventKey="Mydevice"
                    title="My device"
                    onClick={() => {
                      setplatform('Mydevice');
                    }}
                    className={editVideo ? (editVideo.source_type !== 'Brightcove' ? 'hidevideotab' : 'showvideotab') : 'showvideotab'}
                  >
                    {/* <UploadFile metadata={formData} formRef={formRef} /> */}
                    <FormikVideo
                      showback={showback}
                      setScreenStatus={setScreenStatus}
                      changeScreenHandler={changeScreenHandler}
                      uploadFile
                      platform={platform}
                      editVideo={editVideo?.source_url}
                      setSelectedVideoId={setSelectedVideoIdUpload}
                    />
                  </Tab>
                )
              )}
              {!editVideo && mediaSources.some((obj) => obj.name === 'BrightCove') ? (
                <Tab
                  eventKey="Brightcove"
                  title="BrightCove"
                  onClick={() => {
                    setplatform('Brightcove');
                    setShowSidebar(true);
                  }}
                >
                  <FormikVideo
                    Input
                    showback={showback}
                    changeScreenHandler={changeScreenHandler}
                    selectedVideoId={selectedVideoId}
                    type={AddVideoImage}
                    setScreenStatus={setScreenStatus}
                    showBrowse
                    setModalShow={setModalShow}
                    platform={platform}
                    placeholder="Enter a video Id"
                  />
                </Tab>
              ) : (
                editVideo.source_type === 'Brightcove' && (
                  <Tab
                    eventKey="Brightcove"
                    title="BrightCove"
                    onClick={() => {
                      setplatform('Brightcove');
                      setShowSidebar(true);
                    }}
                  >
                    <FormikVideo
                      Input
                      showback={showback}
                      changeScreenHandler={changeScreenHandler}
                      selectedVideoId={selectedVideoId}
                      type={AddVideoImage}
                      setScreenStatus={setScreenStatus}
                      showBrowse
                      setModalShow={setModalShow}
                      platform={platform}
                      editVideo={editVideo?.source_url}
                      placeholder="Enter a video Id"
                    />
                  </Tab>
                )
              )}
              {!editVideo && mediaSources.some((obj) => obj.name === 'YouTube') ? (
                <Tab
                  eventKey="Youtube"
                  title="YouTube"
                  onClick={() => {
                    setplatform('Youtube');
                  }}
                >
                  <FormikVideo
                    Input
                    editVideo={editVideo?.brightcoveData?.videoId || ''}
                    platform={platform}
                    showback={showback}
                    changeScreenHandler={changeScreenHandler}
                    type={AddVideoTube}
                    setScreenStatus={setScreenStatus}
                    placeholder="Enter a video url"
                  />
                </Tab>
              ) : (
                editVideo.source_type === 'Youtube' && (
                  <Tab
                    eventKey="Youtube"
                    title="YouTube"
                    onClick={() => {
                      setplatform('Youtube');
                    }}
                  >
                    <FormikVideo
                      Input
                      platform={platform}
                      showback={showback}
                      changeScreenHandler={changeScreenHandler}
                      type={AddVideoTube}
                      setScreenStatus={setScreenStatus}
                      editVideo={editVideo?.source_url}
                      placeholder="Enter a video url"
                    />
                  </Tab>
                )
              )}
              {!editVideo && mediaSources.some((obj) => obj.name === 'Kaltura') ? (
                <Tab
                  eventKey="Kaltura"
                  title="Kaltura"
                  onClick={() => {
                    setplatform('Kaltura');
                    setShowSidebar(false);
                  }}
                >
                  <FormikVideo
                    Input
                    showBrowse
                    setModalShow={setModalShow}
                    showback={showback}
                    changeScreenHandler={changeScreenHandler}
                    type={AddKaltura}
                    setScreenStatus={setScreenStatus}
                    selectedVideoId={selectedVideoIdKaltura}
                    platform={platform}
                    placeholder="Enter a video url"
                  />
                </Tab>
              ) : (
                editVideo.source_type === 'Kaltura' && (
                  <Tab
                    eventKey="Kaltura"
                    title="Kaltura"
                    onClick={() => {
                      setplatform('Kaltura');
                      setShowSidebar(false);
                    }}
                  >
                    <FormikVideo
                      Input
                      showBrowse
                      setModalShow={setModalShow}
                      showback={showback}
                      changeScreenHandler={changeScreenHandler}
                      type={AddKaltura}
                      setScreenStatus={setScreenStatus}
                      selectedVideoId={selectedVideoIdKaltura}
                      platform={platform}
                      editVideo={editVideo?.source_url}
                      placeholder="Enter a video url"
                    />
                  </Tab>
                )
              )}

              {/* Vemo Video */}

              {!editVideo && mediaSources.some((obj) => obj.name === 'Vimeo') ? (
                <Tab
                  eventKey="Vimeo"
                  title="Vimeo"
                  onClick={() => {
                    setplatform('Vimeo');
                    setShowSidebar(false);
                  }}
                >
                  <FormikVideo
                    Input
                    showBrowse
                    setModalShow={setModalShow}
                    showback={showback}
                    changeScreenHandler={changeScreenHandler}
                    type={AddVemeo}
                    setScreenStatus={setScreenStatus}
                    selectedVideoId={selectedVideoIdVimeo}
                    platform={platform}
                    placeholder="Enter a video url"
                  />
                </Tab>
              ) : (
                editVideo.source_type === 'Vimeo' && (
                  <Tab
                    eventKey="Vimeo"
                    title="Vimeo"
                    onClick={() => {
                      setplatform('Vimeo');
                      setShowSidebar(false);
                    }}
                  >
                    <FormikVideo
                      Input
                      showBrowse
                      setModalShow={setModalShow}
                      showback={showback}
                      changeScreenHandler={changeScreenHandler}
                      type={AddVemeo}
                      setScreenStatus={setScreenStatus}
                      selectedVideoId={selectedVideoIdVimeo}
                      platform={platform}
                      editVideo={editVideo?.source_url}
                      placeholder="Enter a video url"
                    />
                  </Tab>
                )
              )}
              {/* <Tab eventKey="Vimeo" title="Vimeo"></Tab>
            <Tab eventKey="Kaltura" title="Kaltura"></Tab> */}
            </Tabs>
            {editVideo && !editVideo.source_type && <Alert variant="warning">This activity is not editable in new release, Please create a new one</Alert>}
          </div>
        )}
      </div>
    </>
  );
};

export default AddVideo;

const FormikVideo = ({
  setSelectedVideoId,
  Input,
  platform,
  type,
  editVideo,
  showback,
  selectedVideoId,
  showBrowse,
  setScreenStatus,
  uploadFile,
  setModalShow,
  changeScreenHandler,
  placeholder,
}) => {
  const dispatch = useDispatch();
  const imgUpload = useRef();
  const [uploadedFile, setUploadedFile] = useState('');

  const formRef = useRef();
  useEffect(() => {
    if (editVideo && platform === 'Mydevice') {
      setUploadedFile(editVideo);
    }
  }, [editVideo, platform]);
  const primaryColor = getGlobalColor('--main-primary-color');
  return (
    <div className="add-video-layout-formik">
      <Formik
        initialValues={{
          videoUrl: selectedVideoId || editVideo,
        }}
        enableReinitialize
        innerRef={formRef}
        validate={(values) => {
          const errors = {};
          if (!values.videoUrl) {
            errors.videoUrl = 'Required';
          }
          return errors;
        }}
        onSubmit={(values) => {
          if (showback) {
            changeScreenHandler('describevideo');
          } else {
            setScreenStatus('DescribeVideo');
          }
          dispatch({
            type: 'ADD_VIDEO_URL',
            payload: values.videoUrl,
            platform,
          });
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          /* and other goodies */
        }) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="layout-title-formik-textField">
              {Input && (
                <>
                  <img src={type} alt="video" />
                  <input type="text" name="videoUrl" placeholder={placeholder} onChange={handleChange} onBlur={handleBlur} value={values.videoUrl} />
                </>
              )}
              {showBrowse && (
                <Buttons
                  type="button"
                  primary
                  text="Browse videos"
                  width="146px"
                  height="35px"
                  hover
                  className="ml-32"
                  onClick={() => {
                    setModalShow(true);
                  }}
                />
              )}
            </div>
            {uploadFile && (
              <div className="curriki-utility-uploadfile">
                <div className="uploadfile-box">
                  <div className="drop-area">
                    <button
                      onClick={() => {
                        imgUpload.current.click();
                        setUploadedFile();
                      }}
                      type="reset"
                    >
                      <svg width="15" height="12" className="mr-2" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          // eslint-disable-next-line max-len
                          d="M1.5 7V10.2C1.5 10.4122 1.65804 10.6157 1.93934 10.7657C2.22064 10.9157 2.60218 11 3 11H12C12.3978 11 12.7794 10.9157 13.0607 10.7657C13.342 10.6157 13.5 10.4122 13.5 10.2V7"
                          stroke={primaryColor}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path d="M10.1499 3.39999L7.5249 1L4.8999 3.39999" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M7.5 1V8.79997" stroke={primaryColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      Select File
                    </button>
                    <input
                      type="file"
                      name="h5p_file"
                      id="h5p-file"
                      className="laravel-h5p-upload form-control"
                      onChange={async (e) => {
                        e.preventDefault();

                        const h5pFile = e.target.files[0];
                        const fileArr = h5pFile.name.split('.');
                        const fileExtension = fileArr.length > 0 ? fileArr[fileArr.length - 1] : '';
                        if (fileExtension !== 'mp4') {
                          Swal.fire('Invalid file selected, kindly select mp4 file.');
                          return true;
                          // eslint-disable-next-line no-else-return
                        } else {
                          Swal.fire({
                            title: 'Please Wait !',
                            html: 'Uploading Video, This may took some time ...',
                            allowOutsideClick: false,
                            didOpen: () => {
                              Swal.showLoading();
                            },
                            showConfirmButton: false,
                          });
                          const formData = new FormData();
                          formData.append('file', h5pFile);
                          formData.append('contentId', 0);
                          formData.append(
                            'field',
                            `{"name":"files",
                            "type":"video",
                            "label":"Add a video",
                            "importance":"high",
                            "description":"Click below to add a video you wish to use in your interactive video.
                             You can add a video link or upload video files. It is possible to add several versions of the video with different qualities.
                              To ensure maximum support in browsers at least add a version in webm and mp4 formats.",
                            "extraAttributes":["metadata"],
                            "enableCustomQualityLabel":true}`
                          );
                          const result = await videoService.uploadvideoDirect(formData);
                          Swal.close();
                          if (result.success === false) {
                            Swal.fire({
                              title: result?.message,
                            });
                          } else {
                            setUploadedFile(h5pFile.name);
                            setSelectedVideoId(result.path);
                            setFieldValue('videoUrl', result.path);
                          }
                        }
                      }}
                      ref={imgUpload}
                      style={{
                        cursor: 'pointer',
                        background: '#F1F1F1',
                        padding: '160px 41px 0px 41px',
                        borderRadius: '8px',
                        border: 'none',
                      }}
                      onClick={(e) => {
                        e.target.value = '';
                      }}
                    />
                    <div
                      onClick={() => {
                        imgUpload.current.click();
                        setUploadedFile();
                      }}
                      className="upload-holder"
                      style={{ cursor: 'pointer' }}
                    >
                      <img style={{ cursor: 'pointer' }} src={UploadImg} alt="upload" className="mr-2" />
                      <p>
                        Drag & drop file or&nbsp;
                        <span style={{ color: '#2e8df5' }}>browse</span>
                        &nbsp; to upload
                      </p>
                    </div>
                  </div>
                  {uploadedFile && (
                    <div
                      style={{
                        color: '#1dca1d',
                        fontSize: '14px',
                        padding: '10px 0px',
                        fontWeight: 'bold',
                      }}
                    >
                      {uploadedFile}
                      is successfully uploaded.
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="error" style={{ color: 'red' }}>
              {errors.videoUrl && touched.videoUrl && errors.videoUrl}
            </div>

            <div className="describe-video">
              <Buttons type="submit" primary text="Describe Video" width="149px" height="35px" hover />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
