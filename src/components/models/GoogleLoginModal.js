/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { PublicClientApplication } from '@azure/msal-browser';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { Formik } from 'formik';
import { GoogleLogin } from 'react-google-login';
import logo from 'assets/images/GCLogo.png';
import btnLogo from 'assets/images/googleBtnLogo.png';
import msTeamLogo from 'assets/images/msTeamLogin.svg';
import {
  googleClassRoomLoginAction,
  googleClassRoomLoginFailureAction,
  googleClassRoomCourseTopicAction,
  fetchCanvasCourses,
  fetchCanvasAssignmentGroups,
  shareToCanvas,
  saveMicrosoftAccesstoken,
  getMSteamClasses,
  msTeamShare,
} from 'store/actions/gapi';
import {
  copyProject,
  publishPlaylist,
  publistActivity,
  publishIdependentActivity,
  publishToCanvas,
  createAssignmentGroup,
  createNewCoursetoCanvas,
  publishActivitytoMicrosoftTeam,
} from 'store/actions/share';
const domainName = window.__RUNTIME_CONFIG__.REACT_DOMAIN_URL;
const tenantId = window.__RUNTIME_CONFIG__.REACT_MS_TENANT_ID;
const config = {
  appId: window.__RUNTIME_CONFIG__.REACT_MS_APP_ID,
  redirectUri: `${domainName}org/currikistudio`,
  scopes: ['user.read'],
  authority: `https://login.microsoftonline.com/${tenantId}`,
};

const GoogleLoginModal = ({
  show,
  onHide,
  googleClassRoomLogin,
  googleClassRoomLoginFailure,
  googleClassRoomCourseTopics,
  projectId,
  playlistId,
  activityId,
  selectedProjectPlaylistName,
  setprojectPlaylistPublishtoCanvas,
  projectPlaylistPublishtoCanvas,
  setcanvasProjectName,
  canvasProjectName,
  selectedPlaylistActivityName,
}) => {
  const dataRedux = useSelector((state) => state);
  const [tokenTemp, setTokenTemp] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isCanvas, setisCanvas] = useState(false);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sharetoMS, setsharetoMS] = useState(false);
  const [canvasSettingId, setcanvasSettingId] = useState('');
  const [isShowPlaylistSelector, setIsShowPlaylistSelector] = useState(false);
  const [shareType, setShareType] = useState('Project');
  const [selectedAssignmentId, setselectedAssignmentId] = useState();
  const [userId, setuserId] = useState('');
  const dispatch = useDispatch();

  const publicClientApplication = new PublicClientApplication({
    auth: {
      clientId: config.appId,
      redirectUri: config.redirectUri,
      authority: config.authority,
    },
    cache: {
      cacheLocation: 'sessionStorage',
      storeAuthStateInCookie: true,
    },
  });
  useEffect(() => {
    if (dataRedux.share.isCanvas === true) {
      setShowForm(true);
      setsharetoMS(false);
    } else if (dataRedux.share.msTeamShare === true && dataRedux.share.googleShare === true) {
      setsharetoMS(true);
      setuserId(dataRedux?.auth?.user?.id);
    } else if (dataRedux.share.googleShare === true) {
      setShowForm(true);
    } else if (dataRedux.share.googleShare === false) {
      setsharetoMS(false);
      setShowForm(false);
    } else if (dataRedux.share.googleShare === 'close') {
      onHide();
    }
    if (typeof playlistId == 'undefined' && typeof activityId == 'undefined') {
      setShareType('Project');
    } else if (playlistId != 0 && activityId != 0) {
      setShareType('Activity');
    } else if (playlistId != 0 && activityId == 0) {
      setShareType('Playlist');
    }
  }, [dataRedux, onHide]);

  useEffect(() => {
    if (dataRedux?.share.isCanvas) {
      setisCanvas(true);
      setShowForm(true);
      setcanvasSettingId(dataRedux?.share?.shareVendors[0]);
    } else {
      setisCanvas(false);
    }
  }, [dataRedux?.share.isCanvas]);
  useEffect(() => {
    if (dataRedux.share.courses) {
      setCourses(dataRedux.share.courses);
      setLoading(false);
    }
  }, [dataRedux.share.courses]);

  useEffect(() => {
    if (dataRedux.share.topics) {
      setTopics(dataRedux.share.topics);
      setLoading(false);
    }
  }, [dataRedux.share.topics]);

  const onCourseChange = (e) => {
    if (!!isCanvas) {
      if (e.target.value !== 'Create a new Course') {
        dispatch(fetchCanvasAssignmentGroups(e.target.value, canvasSettingId?.id));
      } else {
        return false;
      }
    } else {
      setIsShowPlaylistSelector(true);
    }
    setLoading(true);
    setIsShowPlaylistSelector(true);
  };
  const onTopicChange = (e) => {
    if (isCanvas) {
      setselectedAssignmentId(e.target.value);
    }
  };
  useEffect(() => {
    if (isCanvas && show) {
      setShowForm(true);
      setLoading(true);
      setCourses([]);
      setTopics([]);
      setIsShowPlaylistSelector(false);
      dispatch(fetchCanvasCourses(canvasSettingId?.id));
    }
  }, [show, isCanvas]);
  const callPublishingMethod = (params) => {
    console.log('raja', params.playlistId);
    if ((typeof params.playlistId == 'undefined' && typeof params.activityId == 'undefined') || (params.playlistId === 0 && params.activityId === 0)) {
      if (params.values.course === 'Create a new class') {
        copyProject(params.projectId, null, params.tokenTemp);
      } else {
        copyProject(params.projectId, params.values.course, params.tokenTemp);
      }
    } else if (params.playlistId != 0 && params.activityId != 0) {
      if (params.playlistId === 999999) {
        if (typeof params.values.course == 'undefined') {
          publishIdependentActivity(null, null, params.activityId, params.tokenTemp);
        } else if (typeof params.values.course == 'undefined' && typeof params.values.playlist == 'undefined') {
          publishIdependentActivity(params.values.course, null, params.activityId, params.tokenTemp);
        } else {
          publishIdependentActivity(params.values.course, params.values.playlist, params.activityId, params.tokenTemp);
        }
      } else {
        if (typeof params.values.course == 'undefined') {
          publistActivity(params.projectId, null, null, params.playlistId.id, params.activityId, params.tokenTemp);
        } else if (typeof params.values.course == 'undefined' && typeof params.values.playlist == 'undefined') {
          publistActivity(params.projectId, params.values.course, null, params.playlistId.id, params.activityId, params.tokenTemp);
        } else {
          publistActivity(params.projectId, params.values.course, params.values.playlist, params.playlistId.id, params.activityId, params.tokenTemp);
        }
      }
    } else if (params.playlistId != 0 && params.activityId == 0) {
      if (typeof params.values.course == 'undefined') {
        publishPlaylist(params.projectId, null, null, params.playlistId, params.tokenTemp);
      } else if (typeof params.values.course == 'undefined' && typeof params.values.playlist == 'undefined') {
        publishPlaylist(params.projectId, params.values.course, null, params.playlistId, params.tokenTemp);
      } else {
        publishPlaylist(params.projectId, params.values.course, params.values.playlist, params.playlistId, params.tokenTemp);
      }
    }
  };
  const callPublishToCanvas = (params) => {
    if ((typeof params.values.course === 'undefined' && !projectPlaylistPublishtoCanvas) || (params.values.course === 'Create a new Course' && !projectPlaylistPublishtoCanvas)) {
      dispatch(
        createNewCoursetoCanvas(
          canvasProjectName,
          params.values.course,
          params.projectId,
          canvasSettingId,
          selectedProjectPlaylistName,
          selectedAssignmentId || params.playlistId,
          params.activityId,
          projectPlaylistPublishtoCanvas,
          selectedPlaylistActivityName,
        ),
      );
    } else if (
      (typeof params.values.playlist == 'undefined' && params.values.course !== 'Create a new Course' && !projectPlaylistPublishtoCanvas) ||
      (params.values.playlist == 'Create a new topic' && params.values.course !== 'Create a new Course' && !projectPlaylistPublishtoCanvas)
    ) {
      dispatch(createAssignmentGroup(params.values.course, canvasSettingId, selectedProjectPlaylistName, params.activityId, selectedPlaylistActivityName));
    } else if (
      (typeof params.values.course === 'undefined' && projectPlaylistPublishtoCanvas) ||
      (params.values.course === 'Create a new Course' && projectPlaylistPublishtoCanvas) ||
      (params.values.course && projectPlaylistPublishtoCanvas)
    ) {
      dispatch(
        createNewCoursetoCanvas(
          canvasProjectName,
          params.values.course,
          params.projectId,
          canvasSettingId,
          selectedProjectPlaylistName,
          selectedAssignmentId || params.playlistId,
          params.activityId,
          projectPlaylistPublishtoCanvas,
          selectedPlaylistActivityName,
        ),
      );
    } else {
      dispatch(publishToCanvas(params.values.course, canvasSettingId, selectedPlaylistActivityName, selectedAssignmentId, params.activityId));
    }
    setprojectPlaylistPublishtoCanvas(false);
  };
  const callPublishToMicorsoftTeam = (params) => {
    console.log('params', params);
    if (params.values.course === 'Create a new Course' || params.values.course === 'Create a new class' || typeof params.values.course === 'undefined') {
      dispatch(publishActivitytoMicrosoftTeam(params.projectId));
    } else if (params.values.course !== 'Create a new Course' && params.projectId) {
      dispatch(publishActivitytoMicrosoftTeam(params.projectId, params.values.course));
    }
  };

  const openMicrsoftTeamLogin = async () => {
    try {
      await publicClientApplication
        .loginPopup({
          scopes: config.scopes,
          prompt: 'select_account',
        })
        .then((data) => {
          setShowForm(true);
          setLoading(true);
          (async () => {
            await dispatch(saveMicrosoftAccesstoken(data.accessToken));
            await dispatch(getMSteamClasses());
          })();
        });
    } catch (err) {
      setShowForm(false);
      console.log('err'.err);
    }
  };
  return (
    <Modal open={show} onClose={onHide} center styles={{ borderRadius: '8px', height: '310px', width: '640px' }}>
      <div className="model-box-google model-box-view">
        <div style={{ textAlign: 'center', margin: '32px 146.38px 0 146.38px' }}>
          <img src={logo} alt="" />
        </div>
        <div className="model-body" style={{ maxWidth: '500px' }}>
          <div className="sign-in-google">
            <br />
            {!showForm ? (
              sharetoMS ? (
                <div className="content-authorization" style={{ textAlign: 'center' }}>
                  <div className="alert alert-warning" style={{ borderRadius: '8px' }}>
                    With CurrikiStudio you can publish your {shareType} as a new Microsoft Team's Assignment.
                  </div>
                  <p>To start, please log into your Microsoft Account.</p>
                  <div style={{ marginBottom: '32px' }}>
                    <button
                      style={{ border: 'none', background: 'none' }}
                      onClick={() => {
                        openMicrsoftTeamLogin();
                      }}
                    >
                      <img src={msTeamLogo} alt="Microsoft team login Icon" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="content-authorization" style={{ textAlign: 'center' }}>
                  <div className="alert alert-warning" style={{ borderRadius: '8px' }}>
                    With CurrikiStudio you can publish your {shareType} as a new Google Classroom course.
                  </div>
                  <p>To start, please log into your Google account.</p>
                  <div style={{ marginBottom: '32px' }}>
                    <GoogleLogin
                      clientId={global.config.gapiClientId}
                      render={(renderProps) => (
                        <button
                          onClick={renderProps.onClick}
                          style={{
                            width: '240px',
                            height: '32px',
                            borderRadius: '16px',
                            background: '#FFFFFF',
                            border: '1px solid #959595',
                            boxShadow: '0px 2px 8px 1px rgba(81, 81, 81, 0.16)',
                            padding: '6px 0',
                          }}
                          disabled={renderProps.disabled}
                        >
                          <img src={btnLogo} alt="" style={{ padding: '0px 6px 2px 0px' }} />
                          Login with Google
                        </button>
                      )}
                      onSuccess={(data) => {
                        googleClassRoomLogin(data);
                        setTokenTemp(JSON.stringify(data.tokenObj));
                      }}
                      // onFailure={googleClassRoomLoginFailure}
                      scope="https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.coursework.students"
                      cookiePolicy="single_host_origin"
                    ></GoogleLogin>
                  </div>
                </div>
              )
            ) : (
              <div className="classroom-form">
                <div>
                  {isCanvas ? (
                    <h1>Are you sure you want to Publish this {shareType} to Canvas?</h1>
                  ) : (
                    <h1>
                      Are you sure you want to share this {shareType} to {!!sharetoMS ? 'Microsoft Team' : 'Google Classroom'}?
                    </h1>
                  )}
                  {!isShowPlaylistSelector && loading ? (
                    isCanvas ? (
                      <p className="loading-classes">Loading Courses....</p>
                    ) : (
                      <p className="loading-classes">Loading Classes....</p>
                    )
                  ) : null}
                  {/* {loading && isCanvas && !isShowPlaylistSelector && <p className="loading-classes">{isCanvas ? 'Loading Courses....' : 'Loading Classes....'}</p>} */}
                  {loading && isShowPlaylistSelector && <p className="loading-classes">{isCanvas ? 'Loading Assignment Groups...' : 'Loading Topics...'}</p>}
                  <Formik
                    initialValues={{
                      course: undefined,
                      playlist: undefined,
                      heading: 'test',
                      description: 'test',
                      room: 'test',
                    }}
                    onSubmit={(values) => {
                      if (isCanvas) {
                        callPublishToCanvas({ tokenTemp, values, projectId, playlistId, activityId });
                      } else if (sharetoMS) {
                        callPublishToMicorsoftTeam({ values, projectId, playlistId, activityId });
                      } else {
                        callPublishingMethod({ tokenTemp, values, projectId, playlistId, activityId });
                      }

                      setLoading(false);
                      onHide();
                    }}
                    // validate={(values) => {
                    //   const errors = {};
                    //   if (!values.course) {
                    //     errors.course = 'Please select a course from a dropdown or create a new one manually.';
                    //   }

                    //   return errors;
                    // }}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      // isSubmitting,
                      /* and other goodies */
                    }) => (
                      <form onSubmit={handleSubmit}>
                        <select
                          className="form-control select-dropdown"
                          name="course"
                          value={values.course}
                          onChange={(e) => {
                            handleChange(e);
                            if (!sharetoMS && !projectPlaylistPublishtoCanvas) {
                              onCourseChange(e);
                            }
                          }}
                          onBlur={handleBlur}
                        >
                          {isCanvas ? <option>Create a new Course</option> : <option>Create a new class</option>}
                          {!!courses &&
                            courses.map((item) =>
                              !isCanvas ? (
                                <option key={item.id} value={item.id}>
                                  {item.displayName}
                                </option>
                              ) : (
                                <option key={item.id} value={item.id}>
                                  {item.name}
                                </option>
                              ),
                            )}
                        </select>
                        {isShowPlaylistSelector && playlistId > 0 && !projectPlaylistPublishtoCanvas && (
                          <select
                            className="form-control select-dropdown"
                            name="playlist"
                            value={values.playlist}
                            onChange={(e) => {
                              handleChange(e);
                              onTopicChange(e);
                            }}
                            onBlur={handleBlur}
                          >
                            <option>Create a new topic</option>
                            {!!topics &&
                              topics.map((topic) => {
                                if (isCanvas) {
                                  return (
                                    <option key={topic.id} value={topic.id}>
                                      {topic.name}
                                    </option>
                                  );
                                } else {
                                  return (
                                    <option key={topic.topicId} value={topic.topicId}>
                                      {topic.name}
                                    </option>
                                  );
                                }
                              })}
                          </select>
                        )}

                        {<button type="submit">Confirm</button>}
                      </form>
                    )}
                  </Formik>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

GoogleLoginModal.propTypes = {
  show: PropTypes.bool.isRequired,
  projectId: PropTypes.number.isRequired,
  onHide: PropTypes.func.isRequired,
  googleClassRoomLogin: PropTypes.func.isRequired,
  googleClassRoomLoginFailure: PropTypes.func.isRequired,
  googleClassRoomCourseTopics: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  googleClassRoomLogin: (data) => dispatch(googleClassRoomLoginAction(data)),
  googleClassRoomLoginFailure: (data) => dispatch(googleClassRoomLoginFailureAction(data)),
  googleClassRoomCourseTopics: (courseId) => dispatch(googleClassRoomCourseTopicAction(courseId)),
});

export default withRouter(connect(null, mapDispatchToProps)(GoogleLoginModal));
