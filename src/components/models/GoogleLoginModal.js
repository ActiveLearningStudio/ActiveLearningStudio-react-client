/* eslint-disable */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';

import { Formik } from 'formik';
import { GoogleLogin } from 'react-google-login';

import logo from 'assets/images/loginlogo.png';
import {
  googleClassRoomLoginAction,
  googleClassRoomLoginFailureAction,
} from 'store/actions/gapi';
import { copyProject } from 'store/actions/share';

const GoogleLoginModal = ({
  show,
  onHide,
  googleClassRoomLogin,
  googleClassRoomLoginFailure,
  projectId,
}) => {
  const dataRedux = useSelector((state) => state);
  const [tokenTemp, setTokenTemp] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataRedux.share.googleShare === true) {
      setShowForm(true);
    } else if (dataRedux.share.googleShare === false) {
      setShowForm(false);
    } else if (dataRedux.share.googleShare === 'close') {
      onHide();
    }
  }, [dataRedux, onHide]);

  useEffect(() => {
    if (dataRedux.share.courses) {
      setCourses(dataRedux.share.courses);
      setLoading(false);
    }
  }, [dataRedux.share.courses]);

  return (
    <Modal
      open={show}
      onClose={onHide}
      center
    >
      <div className="model-box-google model-box-view">
        <div className="modal-header">
          <img src={logo} alt="" />
        </div>
        <div className="model-body" style={{ maxWidth: '500px' }}>
          <div className="sign-in-google">
            <br />
            {!showForm ? (
              <div className="content-authorization">
                <p>
                  With CurrikiStudio you can publish your Project as a new Google Classroom course.
                </p>
                <p>To start, please log into your Google account.</p>
                <div>
                  <GoogleLogin
                    clientId={global.config.gapiClientId}
                    onSuccess={(data) => {
                      googleClassRoomLogin(data);
                      setTokenTemp(JSON.stringify(data.tokenObj));
                    }}
                    // onFailure={googleClassRoomLoginFailure}
                    scope="https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.courses https://www.googleapis.com/auth/classroom.topics https://www.googleapis.com/auth/classroom.coursework.me https://www.googleapis.com/auth/classroom.coursework.students"
                    cookiePolicy="single_host_origin"
                  >
                    <span>Login with Google</span>
                  </GoogleLogin>
                </div>
              </div>
            ) : (
              <div className="classroom-form">
                <div>
                  <h1>Are you sure you want to share this Project to Google Classroom?</h1>

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
                      onHide();
                      if (values.course === 'Create a new class') {
                        copyProject(projectId, null, tokenTemp);
                      } else {
                        copyProject(projectId, values.course, tokenTemp);
                      }
                      setLoading(false);
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
                          onChange={handleChange}
                          onBlur={handleBlur}
                        >
                          <option>Create a new class</option>
                          {!!courses && courses.map((item) => (
                            <option key={item.id} value={item.id}>{item.name}</option>
                          ))}
                        </select>
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
};

const mapDispatchToProps = (dispatch) => ({
  googleClassRoomLogin: (data) => dispatch(googleClassRoomLoginAction(data)),
  googleClassRoomLoginFailure: (data) => dispatch(googleClassRoomLoginFailureAction(data)),
});

export default withRouter(
  connect(null, mapDispatchToProps)(GoogleLoginModal),
);
