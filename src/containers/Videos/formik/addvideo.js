/*eslint-disable*/
import React, { useEffect, useRef, useState } from 'react';
import HeadingTwo from 'utils/HeadingTwo/headingtwo';
import TabsHeading from 'utils/Tabs/tabs';
import { Tabs, Tab, Alert } from 'react-bootstrap';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux';
import AddVideoImage from 'assets/images/svg/addvidobright.svg';
import AddVideoTube from 'assets/images/svg/youtube.svg';
import AddKaltura from 'assets/images/kaltura.jpg';
import BackButton from '../../../assets/images/left-arrow.svg';
import Buttons from 'utils/Buttons/buttons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import videoService from 'services/videos.services';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import BrightcoveModel from '../model/brightmodel';
import { useSelector } from 'react-redux';
import UploadImg from 'assets/images/upload1.png';
import Swal from 'sweetalert2';
import 'utils/uploadselectfile/uploadfile.scss';
const AddVideo = ({ setScreenStatus, showback, changeScreenHandler }) => {
  const [modalShow, setModalShow] = useState(false);
  const [activeKey, setActiveKey] = useState('Mydevice');
  const [selectedVideoId, setSelectedVideoId] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [platform, setplatform] = useState('Mydevice');

  const { editVideo } = useSelector((state) => state.videos);

  useEffect(() => {
    if (editVideo?.source_type) {
      setActiveKey(editVideo?.source_type);
    }
  }, [editVideo]);

  return (
    <>
      <BrightcoveModel
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        setSelectedVideoId={setSelectedVideoId}
        showSidebar={showSidebar}
        platform={platform}
      />
      <div className="add-video-form">
        <div className="add-video-tabs">
          <TabsHeading text="1. Add a video" tabActive={true} />
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
            <div className="back-button" style={{ display: 'flex', justifyContent: 'center', cursor: 'pointer' }} onClick={() => changeScreenHandler('layout')}>
              <img style={{ marginRight: '8px' }} src={BackButton} alt="back button " />
              <p style={{ margin: 0 }} className="">
                Back to options
              </p>
            </div>
          )}
        </div>
        <div className="add-video-form-tabs">
          <Tabs className="main-tabs" activeKey={activeKey} onSelect={(k) => setActiveKey(k)} id="controlled-tab-example">
            {!editVideo ? (
              <Tab
                eventKey="Mydevice"
                title="My device"
                onClick={() => {
                  setplatform('Mydevice');
                }}
              >
                {/* <UploadFile metadata={formData} formRef={formRef} /> */}
                <FormikVideo
                  setSelectedVideoId={setSelectedVideoId}
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
                    editVideo={editVideo?.brightcoveData?.videoId || ''}
                    editVideo={editVideo?.source_url}
                    setSelectedVideoId={setSelectedVideoId}
                  />
                </Tab>
              )
            )}
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
                  />
                </Tab>
              )
            )}
            {!editVideo ? (
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
                    editVideo={editVideo?.brightcoveData?.videoId || ''}
                    platform={platform}
                    showback={showback}
                    changeScreenHandler={changeScreenHandler}
                    type={AddVideoTube}
                    setScreenStatus={setScreenStatus}
                    editVideo={editVideo?.source_url}
                  />
                </Tab>
              )
            )}
            {!editVideo ? (
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
                  selectedVideoId={selectedVideoId}
                  platform={platform}
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
                    selectedVideoId={selectedVideoId}
                    platform={platform}
                    editVideo={editVideo?.source_url}
                  />
                </Tab>
              )
            )}
            {/* <Tab eventKey="Vimeo" title="Vimeo"></Tab>
            <Tab eventKey="Kaltura" title="Kaltura"></Tab> */}
          </Tabs>
          {editVideo && !editVideo.source_type && <Alert variant="warning">This activity is not editable in new release, Please create a new one</Alert>}
        </div>
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
}) => {
  const dispatch = useDispatch();
  const imgUpload = useRef();
  const [uploadedFile, setUploadedFile] = useState('');
  const formRef = useRef();
  useEffect(() => {
    if (editVideo && platform == 'Mydevice') {
      setUploadedFile(editVideo);
    }
  }, [editVideo, platform]);
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
            platform: platform,
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
                  <img src={type} />
                  <input type="text" name="videoUrl" placeholder="Enter video ID" onChange={handleChange} onBlur={handleBlur} value={values.videoUrl} />
                </>
              )}
              {showBrowse && (
                <Buttons
                  type="button"
                  primary={true}
                  text="Browse videos"
                  width="146px"
                  height="35px"
                  hover={true}
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
                      <FontAwesomeIcon icon={faUpload} className="curriki_btn-mr-2" />
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
                            `{"name":"files","type":"video","label":"Add a video","importance":"high","description":"Click below to add a video you wish to use in your interactive video. You can add a video link or upload video files. It is possible to add several versions of the video with different qualities. To ensure maximum support in browsers at least add a version in webm and mp4 formats.","extraAttributes":["metadata"],"enableCustomQualityLabel":true}`
                          );
                          const result = await videoService.uploadvideoDirect(formData);
                          Swal.close();
                          if (result.success == false) {
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
                        background: 'transparent',
                        padding: '125px 41px 0px 41px',
                        border: '3px dashed #ddd',
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
                      <p> click to upload</p>
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
                      {uploadedFile} is successfully uploaded.
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="error" style={{ color: 'red' }}>
              {errors.videoUrl && touched.videoUrl && errors.videoUrl}
            </div>

            <div className="describe-video">
              <Buttons type="submit" primary={true} text="Describe Video" width="149px" height="35px" hover={true} />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
