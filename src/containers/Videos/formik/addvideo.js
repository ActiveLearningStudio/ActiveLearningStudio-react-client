/* eslint-disable react/button-has-type */
/* eslint-disable no-unused-vars */
/* eslint-disable  */
import React, { useEffect, useRef, useState } from "react";
import HeadingTwo from "utils/HeadingTwo/headingtwo";
import TabsHeading from "utils/Tabs/tabs";
import { Tabs, Tab, Alert } from "react-bootstrap";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AddVideoImage from "assets/images/svg/addvidobright.svg";
import AddVideoTube from "assets/images/svg/youtube.svg";
import AddKaltura from "assets/images/kaltura.jpg";
import AddVemeo from "assets/images/vemeo.PNG";
import Buttons from "utils/Buttons/buttons";
import videoService from "services/videos.services";
import UploadImg from "assets/images/upload1.png";
import Swal from "sweetalert2";
import "utils/uploadselectfile/uploadfile.scss";
import { getGlobalColor } from "containers/App/DynamicBrandingApply";
import { getMediaSources } from "store/actions/admin";
import BrightcoveModel from "../model/brightmodel";
import KomodoLogo from "../../../assets/images/svg/komodo.svg";
import KomodoGoToImg from "../../../assets/images/komodo-go-to-img.png";
import RecordLogo from "../../../assets/images/svg/record.svg";
import BackToSmSvg from "iconLibrary/mainContainer/BackToSmSvg";
import HeadingText from "utils/HeadingText/headingtext";

const AddVideo = ({
  setScreenStatus,
  showback,
  changeScreenHandler,
  hideallothers,
  setisbackHide,
}) => {
  const dispatch = useDispatch();
  const organization = useSelector((state) => state.organization);
  const [modalShow, setModalShow] = useState(false);
  const [selectedVideoId, setSelectedVideoId] = useState("");
  const [
    selectedVideoIdKaltura,
    setSelectedVideoIdKaltura,
  ] = useState("");
  const [selectedVideoIdKomodo, setSelectedVideoIdKomodo] = useState(
    ""
  );
  const [selectedVideoIdVimeo, setSelectedVideoIdVimeo] = useState(
    ""
  );
  const [selectedVideoIdUpload, setSelectedVideoIdUpload] = useState(
    ""
  );
  const [showSidebar, setShowSidebar] = useState(true);
  const [platformName, setplatformName] = useState("Mydevice");
  const [mediaSources, setMediaSources] = useState([]);
  const { editVideo, videoId, platform, videoFile } = useSelector(
    (state) => state.videos
  );
  const [activeKey, setActiveKey] = useState(
    platform ? platform : mediaSources[0]?.name
  );
  useEffect(() => {
    if (editVideo?.source_type) {
      setActiveKey(editVideo?.source_type);
    }
  }, [editVideo]);

  useEffect(() => {
    const result = dispatch(
      getMediaSources(organization?.activeOrganization?.id)
    );
    result.then((data) => {
      console.log("dta", data);
      setMediaSources(
        data.mediaSources.filter(
          (source) =>
            source.pivot.media_sources_show_status === true &&
            source.media_type === "Video"
        )
      );
    });
  }, []);
  const primaryColor = getGlobalColor("--main-primary-color");
  return (
    <>
      <BrightcoveModel
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        setSelectedVideoId={setSelectedVideoId}
        selectedVideoId={selectedVideoId}
        setSelectedVideoIdKaltura={setSelectedVideoIdKaltura}
        selectedVideoIdKaltura={selectedVideoIdKaltura}
        setSelectedVideoIdVimeo={setSelectedVideoIdVimeo}
        selectedVideoIdVimeo={selectedVideoIdVimeo}
        showSidebar={showSidebar}
        platformName={platformName}
        setSelectedVideoIdKomodo={setSelectedVideoIdKomodo}
        selectedVideoIdKomodo={selectedVideoIdKomodo}
      />
      <div className="add-video-form">
        <div className="add-video-tabs">
          <TabsHeading
            text={`1. ${editVideo ? "Edit" : "Add"} a video`}
            tabActive
          />
          <TabsHeading text="2. Describe video" className="ml-10" />
          <TabsHeading text="3. Add interactions" className="ml-10" />
        </div>
        <div className="add-video-title-select upload-back-button">
          <div className="add-video-title">
            <HeadingTwo
              text={`${editVideo ? "Edit" : "Add"} a video`}
              color="#084892"
            />
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
                display: "flex",
                justifyContent: "center",
                cursor: "pointer",
              }}
              onClick={() => changeScreenHandler("layout")}
            >
              <BackToSmSvg primaryColor={primaryColor} />
              <p
                style={{ margin: 0, marginLeft: "8px" }}
                className=""
              >
                Back to options
              </p>
            </div>
          )}
        </div>
        {hideallothers && (
          <div className="add-video-form-tabs">
            <Tabs
              className="main-tabs"
              defaultActiveKey="Brightcove"
              id="uncontrolled-tab-example"
            >
              {!editVideo ? (
                <Tab
                  eventKey="Brightcove"
                  title="BrightCove"
                  onClick={() => {
                    setplatformName("Brightcove");
                    setShowSidebar(true);
                  }}
                >
                  <FormikVideo
                    Input
                    showback={showback}
                    changeScreenHandler={changeScreenHandler}
                    selectedVideoId={
                      videoId && platform === "Brightcove"
                        ? videoId
                        : selectedVideoId
                    }
                    type={AddVideoImage}
                    setScreenStatus={setScreenStatus}
                    showBrowse
                    setModalShow={setModalShow}
                    platformName="Brightcove"
                    placeholder="Enter a video Id"
                    setisbackHide={setisbackHide}
                  />
                </Tab>
              ) : (
                editVideo.source_type === "Brightcove" && (
                  <Tab
                    eventKey="Brightcove"
                    title="BrightCove"
                    onClick={() => {
                      setplatformName("Brightcove");
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
                      platformName="Brightcove"
                      editVideo={editVideo?.source_url}
                      placeholder="Enter a video Id"
                      setisbackHide={setisbackHide}
                    />
                  </Tab>
                )
              )}

              {/* <Tab eventKey="Vimeo" title="Vimeo"></Tab>
    <Tab eventKey="Kaltura" title="Kaltura"></Tab> */}
            </Tabs>
            {editVideo && editVideo.source_type !== "Brightcove" && (
              <Alert variant="warning">
                This activity is not editable in new release, Please
                create a new one
              </Alert>
            )}
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
              {!editVideo &&
              mediaSources.some(
                (obj) =>
                  obj.name === "My device" &&
                  obj.media_type === "Video"
              ) ? (
                <Tab
                  eventKey="Mydevice"
                  title="My device"
                  onClick={() => {
                    setplatformName("Mydevice");
                  }}
                >
                  {/* <UploadFile metadata={formData} formRef={formRef} /> */}
                  <FormikVideo
                    setSelectedVideoId={setSelectedVideoIdUpload}
                    showback={showback}
                    setScreenStatus={setScreenStatus}
                    changeScreenHandler={changeScreenHandler}
                    uploadFile
                    platformName="Mydevice"
                    setisbackHide={setisbackHide}
                    selectedVideoId={
                      videoId && platform === "Mydevice"
                        ? videoId
                        : ""
                    }
                    selectedVideoFile={
                      videoFile && platform === "Mydevice"
                        ? videoFile
                        : ""
                    }
                  />
                </Tab>
              ) : (
                editVideo.source_type === "Mydevice" && (
                  <Tab
                    eventKey="Mydevice"
                    title="My device"
                    onClick={() => {
                      setplatformName("Mydevice");
                    }}
                    className={
                      editVideo
                        ? editVideo.source_type !== "Brightcove"
                          ? "hidevideotab"
                          : "showvideotab"
                        : "showvideotab"
                    }
                  >
                    {/* <UploadFile metadata={formData} formRef={formRef} /> */}
                    <FormikVideo
                      showback={showback}
                      setScreenStatus={setScreenStatus}
                      changeScreenHandler={changeScreenHandler}
                      uploadFile
                      platformName="Mydevice"
                      editVideo={editVideo?.source_url}
                      setSelectedVideoId={setSelectedVideoIdUpload}
                      setisbackHide={setisbackHide}
                    />
                  </Tab>
                )
              )}
              {!editVideo &&
              mediaSources.some(
                (obj) => obj.name === "BrightCove"
              ) ? (
                <Tab
                  eventKey="Brightcove"
                  title="BrightCove"
                  onClick={() => {
                    setplatformName("Brightcove");
                    setShowSidebar(true);
                  }}
                >
                  <FormikVideo
                    Input
                    showback={showback}
                    changeScreenHandler={changeScreenHandler}
                    selectedVideoId={
                      videoId && platform === "Brightcove"
                        ? videoId
                        : selectedVideoId
                    }
                    type={AddVideoImage}
                    setScreenStatus={setScreenStatus}
                    showBrowse
                    setModalShow={setModalShow}
                    platformName="Brightcove"
                    placeholder="Enter a video Id"
                    setisbackHide={setisbackHide}
                  />
                </Tab>
              ) : (
                editVideo.source_type === "Brightcove" && (
                  <Tab
                    eventKey="Brightcove"
                    title="BrightCove"
                    onClick={() => {
                      setplatformName("Brightcove");
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
                      platformName="Brightcove"
                      editVideo={editVideo?.source_url}
                      placeholder="Enter a video Id"
                      setisbackHide={setisbackHide}
                    />
                  </Tab>
                )
              )}
              {!editVideo &&
              mediaSources.some((obj) => obj.name === "YouTube") ? (
                <Tab
                  eventKey="Youtube"
                  title="YouTube"
                  onClick={() => {
                    setplatformName("Youtube");
                  }}
                >
                  <FormikVideo
                    Input
                    editVideo={
                      editVideo?.brightcoveData?.videoId ||
                      (videoId && platform === "Youtube")
                        ? videoId
                        : ""
                    }
                    platformName={platformName}
                    showback={showback}
                    changeScreenHandler={changeScreenHandler}
                    type={AddVideoTube}
                    setScreenStatus={setScreenStatus}
                    placeholder="Enter a video url"
                    setisbackHide={setisbackHide}
                  />
                </Tab>
              ) : (
                editVideo.source_type === "Youtube" && (
                  <Tab
                    eventKey="Youtube"
                    title="YouTube"
                    onClick={() => {
                      setplatformName("Youtube");
                    }}
                  >
                    <FormikVideo
                      Input
                      platformName="Youtube"
                      showback={showback}
                      changeScreenHandler={changeScreenHandler}
                      type={AddVideoTube}
                      setScreenStatus={setScreenStatus}
                      editVideo={editVideo?.source_url}
                      placeholder="Enter a video url"
                      setisbackHide={setisbackHide}
                    />
                  </Tab>
                )
              )}
              {!editVideo &&
              mediaSources.some((obj) => obj.name === "Kaltura") ? (
                <Tab
                  eventKey="Kaltura"
                  title="Kaltura"
                  onClick={() => {
                    setplatformName("Kaltura");
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
                    selectedVideoId={
                      videoId && platform === "Kaltura"
                        ? videoId
                        : selectedVideoIdKaltura
                    }
                    platformName="Youtube"
                    placeholder="Enter a video url"
                    setisbackHide={setisbackHide}
                  />
                </Tab>
              ) : (
                editVideo.source_type === "Kaltura" && (
                  <Tab
                    eventKey="Kaltura"
                    title="Kaltura"
                    onClick={() => {
                      setplatformName("Kaltura");
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
                      platformName="Kaltura"
                      editVideo={editVideo?.source_url}
                      placeholder="Enter a video url"
                      setisbackHide={setisbackHide}
                    />
                  </Tab>
                )
              )}

              {/* Vemo Video */}

              {!editVideo &&
              mediaSources.some((obj) => obj.name === "Vimeo") ? (
                <Tab
                  eventKey="Vimeo"
                  title="Vimeo"
                  onClick={() => {
                    setplatformName("Vimeo");
                    setShowSidebar(false);
                  }}
                >
                  <FormikVideo
                    Input
                    // showBrowse
                    setModalShow={setModalShow}
                    showback={showback}
                    changeScreenHandler={changeScreenHandler}
                    type={AddVemeo}
                    setScreenStatus={setScreenStatus}
                    selectedVideoId={
                      videoId && platform === "Vimeo"
                        ? videoId
                        : selectedVideoIdVimeo
                    }
                    platformName="Vimeo"
                    placeholder="Enter a video url"
                    setisbackHide={setisbackHide}
                  />
                </Tab>
              ) : (
                editVideo.source_type === "Vimeo" && (
                  <Tab
                    eventKey="Vimeo"
                    title="Vimeo"
                    onClick={() => {
                      setplatformName("Vimeo");
                      setShowSidebar(false);
                    }}
                  >
                    <FormikVideo
                      Input
                      // showBrowse
                      setModalShow={setModalShow}
                      showback={showback}
                      changeScreenHandler={changeScreenHandler}
                      type={AddVemeo}
                      setScreenStatus={setScreenStatus}
                      selectedVideoId={selectedVideoIdVimeo}
                      platformName="Vimeo"
                      editVideo={editVideo?.source_url}
                      placeholder="Enter a video url"
                      setisbackHide={setisbackHide}
                    />
                  </Tab>
                )
              )}
              {/* Vemo Video */}
              {/* Komodo Start */}
              {!editVideo &&
              mediaSources.some((obj) => obj.name === "Komodo") ? (
                <Tab
                  eventKey="Komodo"
                  title="Komodo"
                  onClick={() => {
                    setplatformName("Komodo");
                    setShowSidebar(false);
                  }}
                >
                  <FormikVideo
                    // Input
                    // showBrowse
                    setModalShow={setModalShow}
                    showback={showback}
                    changeScreenHandler={changeScreenHandler}
                    type={AddVemeo}
                    setScreenStatus={setScreenStatus}
                    selectedVideoId={
                      videoId && platform === "Komodo"
                        ? videoId
                        : selectedVideoIdKomodo
                    }
                    platformName="Komodo"
                    placeholder="Enter here your Komodo link"
                    setisbackHide={setisbackHide}
                    komodo
                  />
                </Tab>
              ) : (
                editVideo.source_type === "Komodo" && (
                  <Tab
                    eventKey="Komodo"
                    title="Komodo"
                    onClick={() => {
                      setplatformName("Komodo");
                      setShowSidebar(false);
                    }}
                  >
                    <FormikVideo
                      // Input
                      // showBrowse
                      setModalShow={setModalShow}
                      showback={showback}
                      changeScreenHandler={changeScreenHandler}
                      type={AddVemeo}
                      setScreenStatus={setScreenStatus}
                      selectedVideoId={selectedVideoIdVimeo}
                      platformName="Komodo"
                      editVideo={editVideo?.source_url}
                      placeholder="Enter here your Komodo link"
                      setisbackHide={setisbackHide}
                      komodo
                    />
                  </Tab>
                )
              )}
              {/* Komodo End */}
              {/* <Tab eventKey="Vimeo" title="Vimeo"></Tab>
            <Tab eventKey="Kaltura" title="Kaltura"></Tab> */}
            </Tabs>
            {editVideo && !editVideo.source_type && (
              <Alert variant="warning">
                This activity is not editable in new release, Please
                create a new one
              </Alert>
            )}
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
  platformName,
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
  komodo,
  setisbackHide,
  selectedVideoFile,
}) => {
  const dispatch = useDispatch();
  const imgUpload = useRef();
  const [uploadedFile, setUploadedFile] = useState("");
  const [record, setRecord] = useState(false);
  const [selectTab, setSelectTab] = useState("enterscreen");
  const [play, setPlay] = useState(false);
  const [startRecord, setStartRecord] = useState(false);
  const [videoUrlId, setvideoUrlId] = useState("");
  const allState = useSelector((state) => state);
  const formRef = useRef();
  useEffect(() => {
    if (editVideo && platformName === "Mydevice") {
      setUploadedFile(editVideo);
    } else {
      setUploadedFile(selectedVideoFile);
    }
  }, [editVideo, platformName, selectedVideoId]);

  useEffect(() => {
    if (editVideo) {
      formRef?.current.setValues({ videoUrl: editVideo });
    } else {
      if (selectedVideoId) {
        formRef?.current.setValues({ videoUrl: selectedVideoId });
      } else {
        formRef?.current.setValues({ videoUrl: "" });
      }
    }
  }, [selectedVideoId]);

  const primaryColor = getGlobalColor("--main-primary-color");
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
          let youtubeLinkformat = /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
          let vimeoLinkformat = /^(http\:\/\/|https\:\/\/)?(www\.)?(player\.vimeo\.com\/video\/)([0-9]+\?h=[A-Za-z0-9]+)$/;
          let komodoLinkformat = /^(http\:\/\/|https\:\/\/)?(www\.)?(komododecks\.com\/recordings\/)([A-Za-z0-9]+)$/;
          let kalturaformat = /^[0-9]+$/;
          if (!values.videoUrl) {
            errors.videoUrl = "Required";
          }
          if (
            values.videoUrl &&
            platformName === "Brightcove" &&
            !values.videoUrl?.match(kalturaformat)
          ) {
            errors.videoUrl = "Invalid Video Id";
          }
          if (
            values.videoUrl &&
            platformName === "Youtube" &&
            !values.videoUrl?.match(youtubeLinkformat)
          ) {
            errors.videoUrl = "Invalid Video Url";
          }
          if (
            values.videoUrl &&
            platformName === "Vimeo" &&
            !values.videoUrl?.match(vimeoLinkformat)
          ) {
            errors.videoUrl = "Invalid Video Url";
          }
          if (
            values.videoUrl &&
            platformName === "Komodo" &&
            !values.videoUrl?.match(komodoLinkformat)
          ) {
            errors.videoUrl = "Invalid Video Url";
          }
          if (
            values.videoUrl &&
            platformName === "Kaltura" &&
            !values.videoUrl?.includes("kaltura.com")
          ) {
            errors.videoUrl = "Invalid Video Url";
          }
          return errors;
        }}
        onSubmit={(values) => {
          if (showback) {
            changeScreenHandler("describevideo");
          } else {
            setScreenStatus("DescribeVideo");
          }
          dispatch({
            type: "ADD_VIDEO_URL",
            payload: values.videoUrl,
            platformName,
          });
          if (uploadedFile) {
            dispatch({
              type: "ADD_VIDEO_FILE",
              payload: uploadedFile,
              platformName,
            });
          }
          setisbackHide(true);
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
            {komodo && (
              <>
                <div className="layout-title-formik-textField">
                  <img
                    src={KomodoLogo}
                    alt="komodo"
                    className="komodo-img"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <input
                      type="text"
                      name="videoUrl"
                      placeholder={placeholder}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.videoUrl}
                    />

                    <div
                      className="error mt-1"
                      style={{ color: "red" }}
                    >
                      {errors.videoUrl &&
                        touched.videoUrl &&
                        errors.videoUrl}
                    </div>
                  </div>

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
                </div>

                <div className="komodo-go-to-about">
                  <img
                    src={KomodoGoToImg}
                    alt="komode-img"
                    className="komodo-go-to-img"
                  />
                  <div className="komodo-go-to-details">
                    <h5 className="detais-heading">
                      Create your videos
                    </h5>

                    <p className="detail-text">
                      You can create your videos with Komodo by using
                      our integration. Go to:
                    </p>

                    <div className="record-box">
                      <Link
                        onClick={() => {
                          changeScreenHandler("");
                          dispatch({
                            type: "ADD_VIDEO_URL",
                            payload: "",
                          });
                        }}
                        to={`/org/${allState.organization.currentOrganization?.domain}/record-video`}
                      >
                        <img
                          src={RecordLogo}
                          alt="record"
                          className="record-img"
                        />
                        <p className="record-text">
                          Record a <br />
                          video
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="layout-title-formik-textField">
              {Input && (
                <>
                  <img src={type} alt="video" />
                  <input
                    type="text"
                    name="videoUrl"
                    placeholder={placeholder}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.videoUrl}
                  />
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
            {platformName === "Vimeo" && (
              <div className="mt-5">
                <div className="d-flex align-items-baseline">
                  <div className="supported-vimeo-video-format">
                    Supported Vimeo Format:
                  </div>

                  <p>Embed Src</p>
                </div>
                <div className="d-flex align-items-baseline">
                  <div className="supported-vimeo-video-format">
                    Example:
                  </div>
                  <p>
                    https://player.vimeo.com/video/696854597?h=8ddb73adca
                  </p>
                </div>
              </div>
            )}

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
                      <svg
                        width="15"
                        height="12"
                        className="mr-2"
                        viewBox="0 0 15 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          // eslint-disable-next-line max-len
                          d="M1.5 7V10.2C1.5 10.4122 1.65804 10.6157 1.93934 10.7657C2.22064 10.9157 2.60218 11 3 11H12C12.3978 11 12.7794 10.9157 13.0607 10.7657C13.342 10.6157 13.5 10.4122 13.5 10.2V7"
                          stroke={primaryColor}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.1499 3.39999L7.5249 1L4.8999 3.39999"
                          stroke={primaryColor}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M7.5 1V8.79997"
                          stroke={primaryColor}
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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
                        const fileArr = h5pFile.name.split(".");
                        const fileExtension =
                          fileArr.length > 0
                            ? fileArr[fileArr.length - 1]
                            : "";
                        if (fileExtension !== "mp4") {
                          Swal.fire(
                            "Invalid file selected, kindly select mp4 file."
                          );
                          return true;
                          // eslint-disable-next-line no-else-return
                        } else {
                          Swal.fire({
                            title: "Please Wait !",
                            html:
                              "Uploading video may take some time.",
                            allowOutsideClick: false,
                            didOpen: () => {
                              Swal.showLoading();
                            },
                            showConfirmButton: false,
                          });
                          const formData = new FormData();
                          formData.append("file", h5pFile);
                          formData.append("contentId", 0);
                          formData.append(
                            "field",
                            `{"name":"files","type":"video","label":"Add a video","importance":"high","description":"Click below to add a video you wish to use in your interactive video. You can add a video link or upload video files. It is possible to add several versions of the video with different qualities. To ensure maximum support in browsers at least add a version in webm and mp4 formats.","extraAttributes":["metadata"],"enableCustomQualityLabel":true}`
                          );
                          const result = await videoService.uploadvideoDirect(
                            formData
                          );
                          Swal.close();
                          if (result.success === false) {
                            Swal.fire({
                              title: result?.message,
                            });
                          } else {
                            setUploadedFile(h5pFile.name);
                            setSelectedVideoId(result.path);
                            setFieldValue("videoUrl", result.path);
                          }
                        }
                      }}
                      ref={imgUpload}
                      style={{
                        cursor: "pointer",
                        background: "#F1F1F1",
                        padding: "160px 41px 0px 41px",
                        borderRadius: "8px",
                        border: "none",
                      }}
                      onClick={(e) => {
                        e.target.value = "";
                      }}
                    />
                    <div
                      onClick={() => {
                        imgUpload.current.click();
                        setUploadedFile();
                      }}
                      className="upload-holder"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        style={{ cursor: "pointer" }}
                        src={UploadImg}
                        alt="upload"
                        className="mr-2"
                      />
                      <p>
                        Drag & drop file or&nbsp;
                        <span style={{ color: "#2e8df5" }}>
                          browse
                        </span>
                        &nbsp; to upload
                      </p>
                    </div>
                  </div>
                  {uploadedFile && (
                    <div
                      style={{
                        color: "#1dca1d",
                        fontSize: "14px",
                        padding: "10px 0px",
                        fontWeight: "bold",
                      }}
                    >
                      {uploadedFile}&nbsp;is successfully uploaded.
                    </div>
                  )}
                </div>
              </div>
            )}
            {!komodo && (
              <div className="error mt-1" style={{ color: "red" }}>
                {errors.videoUrl &&
                  touched.videoUrl &&
                  errors.videoUrl}
              </div>
            )}

            <div className="describe-video">
              <Buttons
                className="describe-btn"
                type="submit"
                primary
                text="Describe Video"
                width="149px"
                height="35px"
                hover
              />
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};
