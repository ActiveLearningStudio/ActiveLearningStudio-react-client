/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { Formik } from 'formik';
import { GoogleLogin } from 'react-google-login';

import logo from 'assets/images/GCLogo.png';
import btnLogo from 'assets/images/googleBtnLogo.png';
import {
  googleClassRoomLoginAction,
  googleClassRoomLoginFailureAction,
  googleClassRoomCourseTopicAction,
} from 'store/actions/gapi';
import { copyProject, publishPlaylist, publishActivity, publistActivity, publishIdependentActivity } from 'store/actions/share';

const GoogleLoginModal = ({
  show,
  onHide,
  googleClassRoomLogin,
  googleClassRoomLoginFailure,
  googleClassRoomCourseTopics,
  projectId,
  playlistId,
  activityId,
}) => {
  const dataRedux = useSelector((state) => state);
  const [tokenTemp, setTokenTemp] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isShowPlaylistSelector, setIsShowPlaylistSelector] = useState(false);
  const [shareType, setShareType] = useState('Project');

  useEffect(() => {
    if (dataRedux.share.googleShare === true) {
      setShowForm(true);
    } else if (dataRedux.share.googleShare === false) {
      setShowForm(false);
    } else if (dataRedux.share.googleShare === 'close') {
      onHide();
    }
    if ((typeof playlistId == 'undefined') && (typeof activityId == 'undefined')) {
      setShareType('Project');
    }
    else if (playlistId != 0 && activityId != 0) {
      setShareType('Activity');
    }
    else if (playlistId != 0 && activityId == 0) {
      setShareType('Playlist');
    }
  }, [dataRedux, onHide]);

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
    googleClassRoomCourseTopics(e.target.value);
    setIsShowPlaylistSelector(true);
  };

  const callPublishingMethod = (params) => {
    if ((typeof params.playlistId == 'undefined' && typeof params.activityId == 'undefined') || 
      (params.playlistId === 0 && params.activityId === 0)) {
      if (params.values.course === 'Create a new class') {
        copyProject(params.projectId, null, params.tokenTemp);
      } else {
        copyProject(params.projectId, params.values.course, params.tokenTemp);
      }
    }
    else if (params.playlistId != 0 && params.activityId != 0){
      if(params.playlistId === 999999) {
        if (typeof params.values.course == 'undefined') {
          publishIdependentActivity(null, null, params.activityId, params.tokenTemp);
        } else if ((typeof params.values.course == 'undefined') && (typeof params.values.playlist == 'undefined')) {
          publishIdependentActivity(params.values.course, null, params.activityId, params.tokenTemp);
        } else {
          publishIdependentActivity(params.values.course, params.values.playlist, params.activityId, params.tokenTemp);
        }
      }
      else {
        if (typeof params.values.course == 'undefined') {
          publistActivity(params.projectId, null, null, params.playlistId, params.activityId, params.tokenTemp);
        } else if ((typeof params.values.course == 'undefined') && (typeof params.values.playlist == 'undefined')) {
          publistActivity(params.projectId, params.values.course, null, params.playlistId, params.activityId, params.tokenTemp);
        } else {
          publistActivity(params.projectId, params.values.course, params.values.playlist, params.playlistId, params.activityId, params.tokenTemp);
        }
      }
    }
    else if (params.playlistId != 0 && params.activityId == 0)
    {
      if (typeof params.values.course == 'undefined') {
        publishPlaylist(params.projectId, null, null, params.playlistId, params.tokenTemp);
      } else if ((typeof params.values.course == 'undefined') && (typeof params.values.playlist == 'undefined')) {
        publishPlaylist(params.projectId, params.values.course, null, params.playlistId, params.tokenTemp);
      } else {
        publishPlaylist(params.projectId, params.values.course, params.values.playlist, params.playlistId, params.tokenTemp);
      }
    }
  }

  return (
    <Modal
      open={show}
      onClose={onHide}
      center
      styles={{borderRadius:"8px", height:"310px", width:"640px"}}
    >
      <div className="model-box-google model-box-view">
        <div style={{textAlign: "center", margin: "32px 146.38px 0 146.38px"}}>
          <img src={logo} alt="" />
        </div>
        <div className="model-body" style={{ maxWidth: '500px' }}>
          <div className="sign-in-google">
            <br />
            {!showForm ? (
              <div className="content-authorization" style={{textAlign:"center"}}>
                <div className="alert alert-warning" style={{borderRadius:"8px"}}>
                  With CurrikiStudio you can publish your {shareType} as a new Google Classroom course.
                </div>
                <p>To start, please log into your Google account.</p>
                <div style={{marginBottom:"32px"}}>
                  <GoogleLogin
                    clientId={global.config.gapiClientId}
                    render={renderProps => (
                      <button onClick={renderProps.onClick} 
                       style={{width:"240px",height:"32px",borderRadius:"16px",background: "#FFFFFF", border: "1px solid #959595", boxShadow: "0px 2px 8px 1px rgba(81, 81, 81, 0.16)",padding:"6px 0"}}
                       disabled={renderProps.disabled}>
                        <img src={btnLogo} alt="" style={{padding: "0px 6px 2px 0px"}}/>
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
                  >
                  </GoogleLogin>
                </div>
              </div>
            ) : (
              <div className="classroom-form">
                <div>
                  <h1>Are you sure you want to share this {shareType} to Google Classroom?</h1>

                  {loading && (
                    <p className="loading-classes">Loading Classes....</p>
                  )}

                  <Formik
                    initialValues={{
                      course: undefined,
                      heading: 'test',
                      description: 'test',
                      room: 'test',
                    }}
                    onSubmit={(values) => {
                      callPublishingMethod({ tokenTemp, values, projectId, playlistId, activityId })
                      setLoading(false);
                      onHide();
                    }}
                  >
                    {({
                      values,
                      // errors,
                      // touched,
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
                          onChange={(e)=>{
                            handleChange(e);
                            onCourseChange(e);
                          }}
                          onBlur={handleBlur}
                        >
                          <option>Create a new class</option>
                          {!!courses && courses.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                          ))}
                        </select>
                        {isShowPlaylistSelector && playlistId > 0 && (
                          <select
                            className="form-control select-dropdown"
                            name="playlist"
                            value={values.playlist}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option>Create a new topic</option>
                            {!!topics && topics.map((topic) => (
                              <option key={topic.topicId} value={topic.topicId}>{topic.name}</option>
                            ))}
                          </select>
                        )}
                        
                        {/* <input
                          type="text"
                          name="course"
                          class="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.course}
                          placeholder="Course Name"
                        /> */}

                        {/* {errors.course && touched.course && (
                          <div className="form-error">{errors.course}</div>
                        )} */}

                        {/* <select
                          class="form-control"
                          name="room"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.room}
                          placeholder="Course Name"
                        >
                          <option>Select your room</option>
                          {rooms.map((data) => (
                            <option key={data.id}>{data}</option>
                          ))}
                        </select> */}

                        {/* {errors.room && touched.room && (
                          <div className="form-error">{errors.room}</div>
                        )} */}

                        {/* <input
                          type="text"
                          name="heading"
                          class="form-control"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.heading}
                          placeholder="Heading"
                        /> */}

                        {/* {errors.heading && touched.heading && (
                          <div className="form-error">{errors.heading}</div>
                        )} */}

                        {/* <textarea
                          class="form-control"
                          rows="5"
                          type="text"
                          name="description"
                          onChange={handleChange}
                          onBlur={handleBlur}
                          value={values.description}
                          placeholder="Description"
                        /> */}

                        {/* {errors.description && touched.description && (
                          <div className="form-error">{errors.description}</div>
                        )} */}

                        {/*
                        <p>
                          Are you sure you want to share this Project to Google Classroom?
                        </p>
                        */}
                        {!loading && (
                          <button type="submit">Confirm</button>
                        )}
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

export default withRouter(
  connect(null, mapDispatchToProps)(GoogleLoginModal),
);
